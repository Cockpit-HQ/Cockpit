<?php

namespace Lokalize\Controller;

use App\Controller\App;

class Utils extends App {

    /**
     * Get text translations via deepl
     */
    public function translate() {

        \session_write_close();

        $text = $this->param('text');
        $to = $this->param('to');
        $apiKey = $this->app->retrieve('lokalize/translation/apiKey');

        if (!$apiKey) {
            return ['translation' => ''];
        }

        if (!$text || !$to) {
            return false;
        }

        $ch = curl_init();

        $data = [
            'auth_key' => $apiKey,
            'text' => $text,
            'target_lang' => $to
        ];

        curl_setopt($ch, CURLOPT_URL, 'https://api-free.deepl.com/v2/translate');
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));

        $error = null;
        $headers = [];
        $headers[] = 'Content-Type: application/x-www-form-urlencoded';

        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

        $result = curl_exec($ch);

        if (curl_errno($ch)) {
            $error = ['error' => curl_error($ch)];
        }

        curl_close($ch);

        if ($error) {
            return $error;
        }

        $json = \json_decode($result, true);
        $translation = '';

        if (isset($json['translations'][0]['text'])) {
            $translation = $json['translations'][0]['text'];
        }

        return compact('translation');

    }
}