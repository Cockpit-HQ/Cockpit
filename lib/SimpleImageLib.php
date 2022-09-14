<?php

/**
 * Workaround until SimpleImage supports Avif image type
 */

use claviska\SimpleImage;

class SimpleImageLib extends SimpleImage {

    protected const ERR_AVIF_NOT_ENABLED = 12;

    /**
     * Loads an image from a data URI.
     *
     * @param string $uri A data URI.
     * @throws \Exception Thrown if URI or image data is invalid.
     * @return \claviska\SimpleImage
     */
    public function fromDataUri($uri)
    {
        // Basic formatting check
        preg_match('/^data:(.*?);/', $uri, $matches);
        if (!count($matches)) {
            throw new \Exception('Invalid data URI.', self::ERR_INVALID_DATA_URI);
        }

        // Determine mime type
        $this->mimeType = $matches[1];
        if (!preg_match('/^image\/(avif|gif|jpeg|png|webp)$/', $this->mimeType)) {
            throw new \Exception(
                'Unsupported format: ' . $this->mimeType,
                self::ERR_UNSUPPORTED_FORMAT
            );
        }

        // Get image data
        $uri = base64_decode(preg_replace('/^data:(.*?);base64,/', '', $uri));
        $this->image = imagecreatefromstring($uri);
        if (!$this->image) {
            throw new \Exception("Invalid image data.", self::ERR_INVALID_IMAGE);
        }

        return $this;
    }

    /**
     * Loads an image from a file.
     *
     * @param string $file The image file to load.
     * @throws \Exception Thrown if file or image data is invalid.
     * @return \claviska\SimpleImage
     */
    public function fromFile($file)
    {
        // Check if the file exists and is readable. We're using fopen() instead of file_exists()
        // because not all URL wrappers support the latter.
        $handle = @fopen($file, 'r');
        if ($handle === false) {
            throw new \Exception("File not found: $file", self::ERR_FILE_NOT_FOUND);
        }
        fclose($handle);

        // Get image info
        $info = @getimagesize($file);
        if ($info === false) {
            throw new \Exception("Invalid image file: $file", self::ERR_INVALID_IMAGE);
        }
        $this->mimeType = $info['mime'];

        // Create image object from file
        switch ($this->mimeType) {
            case 'image/gif':
                // Load the gif
                $gif = imagecreatefromgif($file);
                if ($gif) {
                    // Copy the gif over to a true color image to preserve its transparency. This is a
                    // workaround to prevent imagepalettetruecolor() from borking transparency.
                    $width = imagesx($gif);
                    $height = imagesy($gif);
                    $this->image = imagecreatetruecolor((int) $width, (int) $height);
                    $transparentColor = imagecolorallocatealpha($this->image, 0, 0, 0, 127);
                    imagecolortransparent($this->image, $transparentColor);
                    imagefill($this->image, 0, 0, $transparentColor);
                    imagecopy($this->image, $gif, 0, 0, 0, 0, $width, $height);
                    imagedestroy($gif);
                }
                break;
            case 'image/jpeg':
                $this->image = imagecreatefromjpeg($file);
                break;
            case 'image/png':
                $this->image = imagecreatefrompng($file);
                break;
            case 'image/webp':
                $this->image = imagecreatefromwebp($file);
                break;
            case 'image/avif':
                $this->image = imagecreatefromavif($file);
                break;
            case 'image/bmp':
            case 'image/x-ms-bmp':
            case 'image/x-windows-bmp':
                $this->image = imagecreatefrombmp($file);
                break;
        }
        if (!$this->image) {
            throw new \Exception("Unsupported format: " . $this->mimeType, self::ERR_UNSUPPORTED_FORMAT);
        }

        // Convert pallete images to true color images
        imagepalettetotruecolor($this->image);

        // Load exif data from JPEG images
        if ($this->mimeType === 'image/jpeg' && function_exists('exif_read_data')) {
            $this->exif = @exif_read_data($file);
        }

        return $this;
    }


    //////////////////////////////////////////////////////////////////////////////////////////////////
    // Savers
    //////////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * Generates an image.
     *
     * @param string $mimeType The image format to output as a mime type (defaults to the original mime type).
     * @param integer $quality Image quality as a percentage (default 100).
     * @throws \Exception Thrown when WEBP support is not enabled or unsupported format.
     * @return array Returns an array containing the image data and mime type ['data' => '', 'mimeType' => ''].
     */
    protected function generate($mimeType = null, $quality = 100)
    {
        // Format defaults to the original mime type
        $mimeType = $mimeType ?: $this->mimeType;

        // Ensure quality is a valid integer
        if ($quality === null) $quality = 100;
        $quality = self::keepWithin((int) $quality, 0, 100);

        // Capture output
        ob_start();

        // Generate the image
        switch ($mimeType) {

            case 'image/gif':
                imagesavealpha($this->image, true);
                imagegif($this->image, null);
                break;
            case 'image/jpeg':
                imageinterlace($this->image, true);
                imagejpeg($this->image, null, $quality);
                break;
            case 'image/png':
                imagesavealpha($this->image, true);
                imagepng($this->image);
                break;
            case 'image/webp':
                // Not all versions of PHP will have webp support enabled
                if (!function_exists('imagewebp')) {
                    throw new \Exception(
                        'WEBP support is not enabled in your version of PHP.',
                        self::ERR_WEBP_NOT_ENABLED
                    );
                }
                imagesavealpha($this->image, true);
                imagewebp($this->image, null, $quality);
                break;
            case 'image/avif':
                // Not all versions of PHP will have webp support enabled
                if (!function_exists('imageavif')) {
                    throw new \Exception(
                        'AVIF support is not enabled in your version of PHP.',
                        self::ERR_AVIF_NOT_ENABLED
                    );
                }
                imagesavealpha($this->image, true);
                imageavif($this->image, null, $quality);
                break;
            case 'image/bmp':
            case 'image/x-ms-bmp':
            case 'image/x-windows-bmp':
                // Not all versions of PHP support bmp
                if (!function_exists('imagebmp')) {
                    throw new \Exception(
                        'BMP support is not available in your version of PHP.',
                        self::ERR_UNSUPPORTED_FORMAT
                    );
                }
                imageinterlace($this->image, true);
                imagebmp($this->image, null, $quality);
                break;
            default:
                throw new \Exception('Unsupported format: ' . $mimeType, self::ERR_UNSUPPORTED_FORMAT);
        }

        // Stop capturing
        $data = ob_get_contents();
        ob_end_clean();

        return [
            'data' => $data,
            'mimeType' => $mimeType
        ];
    }

}
