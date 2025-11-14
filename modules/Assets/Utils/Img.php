<?php

namespace Assets\Utils;

class Img {

    protected $image;

    public function __construct($img) {

        $this->image = new \SimpleImageLib($img);
    }

    /**
     * Invert the image colors.
     *
     * @return $this
     */
    public function negative() {
        $this->image->invert();
        return $this;
    }

    /**
     * Convert the image to grayscale.
     *
     * @return $this
     */
    public function grayscale() {
        $this->image->desaturate();
        return $this;
    }

    /**
     * Get the image as a base64 data URI.
     *
     * @param string|null $format The image format.
     * @param int $quality The image quality.
     * @return string The base64 data URI.
     */
    public function base64data($format = null, $quality = 100) {
        return $this->image->toDataUri($format, $quality);
    }

    /**
     * Output image
     *
     * @param string|null $format The image format.
     * @param int $quality The image quality.
     * @return void
     */
    public function show($format = null, $quality = 100) {
        $this->image->toScreen($format, $quality);
    }

    /**
     * Blur the image.
     *
     * @param int $passes The number of blur passes.
     * @param string $type The blur type.
     * @return $this
     */
    public function blur($passes = 1, $type = 'gaussian') {
        return $this->image->blur($type, $passes);
    }

    /**
     * Create a thumbnail of the image.
     *
     * @param int $width The thumbnail width.
     * @param int $height The thumbnail height.
     * @param string $anchor The anchor point for the thumbnail.
     * @return $this
     */
    public function thumbnail($width, $height, $anchor = 'center') {

        if (\preg_match('/\d \d/', $anchor)) {

            // Determine aspect ratios
            $currentRatio = $this->image->getHeight() / $this->image->getWidth();
            $targetRatio = $height / $width;

            // Fit to height/width
            if ($targetRatio > $currentRatio) {
                $this->image->resize(null, $height);
            } else {
                $this->image->resize($width, null);
            }

            $anchor = \explode(' ', $anchor);

            $x1 = \floor(($this->image->getWidth() * $anchor[0]) - ($width * $anchor[0]));
            $x2 = $width + $x1;
            $y1 = \floor(($this->image->getHeight() * $anchor[1]) - ($height * $anchor[1]));
            $y2 = $height + $y1;

            return $this->image->crop($x1, $y1, $x2, $y2);
        }

        return $this->image->thumbnail($width, $height, $anchor);
    }

    public function fitToHeight(int $height) {
        return $this->image->resize(null, $height);
    }

    public function __call($method, $args) {

        $ret = \call_user_func_array([$this->image, $method], $args);

        if ($ret !== $this->image) {
            return $ret;
        }

        return $this;
    }
}
