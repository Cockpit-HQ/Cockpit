<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

class Mailer {

    protected array $accounts = [
        'default' => [
            'transport' => 'mail',
            'options' => []
        ]
    ];

    public function __construct(array $accounts = []) {

        $this->accounts = array_merge($this->accounts, $accounts);
    }

    public function getAccounts(): array {
        return array_keys($this->accounts);
    }

    public function getTransport(string $account = 'default'): string {
        return $this->accounts[$account]['transport'] ?? 'mail';
    }

    public function mail(mixed $to, string $subject, string $message, array $options = []) {

        $options = array_replace_recursive($this->accounts[$options['account'] ?? 'default'], $options);
        $message = $this->createMessage($to, $subject, $message, $options);

        if (isset($options['from'])) {
            $message->setFrom($options['from'], $options['from_name'] ?? '');
        }

        if (isset($options['reply_to'])) {
            $message->addReplyTo($options['reply_to']);
        }

        return $message->send();
    }

    public function createMailer(array $options = []): PHPMailer {

        $options = array_replace_recursive($this->accounts[$options['account'] ?? 'default'], $options);

        $mail = new PHPMailer(true);

        if (($options['transport'] ?? 'mail') == 'smtp') {

            $mail->isSMTP();

            if (isset($options['host']) && $options['host'])      {
                $mail->Host = $options['host']; // Specify main and backup server
            }

            if (isset($options['auth']) && $options['auth']) {
                $mail->SMTPAuth = $options['auth']; // Enable SMTP authentication
            }

            if (isset($options['user']) && $options['user']) {
                $mail->Username = $options['user']; // SMTP username
            }

            if (isset($options['password']) && $options['password']) {
                $mail->Password = $options['password']; // SMTP password
            }

            if (isset($options['port']) && $options['port']) {
                $mail->Port = $options['port']; // smtp port
            }

            if (isset($options['encryption']) && $options['encryption']) {
                $mail->SMTPSecure = $options['encryption']; // Enable encryption: 'ssl' , 'tls' accepted
            }

            // Extra smtp options
            if (isset($options['smtp']) && is_array($options['smtp'])) {
                $mail->SMTPOptions = $options['smtp'];
            }
        }

        return $mail;
    }

    public function createMessage(mixed $to, string $subject, string $message, array $options=[]) {

        $mail = $this->createMailer($options);

        $mail->Subject = $subject;
        $mail->Body    = $message;
        $mail->CharSet = 'utf-8';

        $mail->IsHTML($message !=  strip_tags($message)); // auto-set email format to HTML

        if (is_string($to)) {
            $to_array = explode(',', $to);
        } else {
            $to_array = $to ?? [];
        }

        foreach ($to_array as $to_single) {
            $mail->addAddress($to_single);
        }

        if (isset($options['altMessage']) && $options['altMessage']) {
            $mail->AltBody = $options['altMessage'];
        }

        if (isset($options['embedded'])) {
            foreach ($options['embedded'] as $id => $file) {
                $mail->AddEmbeddedImage($file, $id);
            }
        }

        if (isset($options['attachments'])) {

            foreach ($options['attachments'] as $id => $file) {

                if (is_string($id)) {
                    $mail->addStringAttachment($file, $id);
                } else {
                    $mail->addAttachment($file);
                }
            }
        }

        if (isset($options['cc'])) {
            foreach ($options['cc'] as $email) {
                $mail->AddCC($email);
            }
        }

        if (isset($options['bcc'])) {
            foreach ($options['bcc'] as $email) {
                $mail->addBCC($email);
            }
        }

        if (isset($options['headers']) && is_array($options['headers'])) {
            foreach ($options['headers'] as $name => $value) {
                $mail->addCustomHeader($name, $value);
            }
        }

        $msg = new Mailer_Message($mail);

        return $msg;
    }

}

class Mailer_Message {

    public $mail;

    public function __construct(PHPMailer $mail) {
        $this->mail = $mail;
    }

    public function setCharset(string $charset): void {
        $this->mail->CharSet = $charset;
    }

    public function setSubject(string $subject): void {
        $this->mail->Subject = $subject;
    }

    public function setFrom(string $email, ?string $name = null): void {
        $this->mail->From = $email;
        $this->mail->FromName = $name ?: $email;
    }

    public function addReplyTo(string $email, string $name = ''): void {
        $this->mail->addReplyTo($email, $name);
    }

    public function addTo(string $email, string $name = ''): void {
        $this->mail->AddAddress($email, $name);
    }

    public function addCC(string $email, string $name = ''): void {
        $this->mail->AddCC($email, $name);
    }

    public function send(): mixed {
        return $this->mail->Send();
    }

    public function attach(mixed $file, string $alias = ''): mixed {
        return $this->mail->AddAttachment($file, $alias);
    }

    public function addCustomHeader(string $name, ?string $value = null): bool {
        return $this->mail->addCustomHeader($name, $value);
    }
}
