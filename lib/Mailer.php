<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

class Mailer {

    protected string $transport;
    protected array $options;

    public function __construct(string $transport = 'mail', array $options = []) {

        $this->transport = $transport;
        $this->options = $options;
    }

    public function mail(mixed $to, string $subject, string $message, array $options = []) {

        $options = array_merge($this->options, is_array($options) ? $options: []);

        $message = $this->createMessage($to, $subject, $message, $options);

        if (isset($options['from'])) {
            $message->setFrom($options['from'], $options['from_name'] ?? '');
        }

        if (isset($options['reply_to'])) {
            $message->addReplyTo($options['reply_to']);
        }

        return $message->send();
    }

    public function createMessage(mixed $to, string $subject, string $message, array $options=[]) {

        $mail = new PHPMailer(true);

        if ($this->transport == 'smtp') {

            $mail->isSMTP();

            if (isset($this->options['host']) && $this->options['host'])      {
                $mail->Host = $this->options['host']; // Specify main and backup server
            }

            if (isset($this->options['auth']) && $this->options['auth']) {
                $mail->SMTPAuth = $this->options['auth']; // Enable SMTP authentication
            }

            if (isset($this->options['user']) && $this->options['user']) {
                $mail->Username = $this->options['user']; // SMTP username
            }

            if (isset($this->options['password']) && $this->options['password']) {
                $mail->Password = $this->options['password']; // SMTP password
            }

            if (isset($this->options['port']) && $this->options['port']) {
                $mail->Port = $this->options['port']; // smtp port
            }

            if (isset($this->options['encryption']) && $this->options['encryption']) {
                $mail->SMTPSecure = $this->options['encryption']; // Enable encryption: 'ssl' , 'tls' accepted
            }

            // Extra smtp options
            if (isset($this->options['smtp']) && is_array($this->options['smtp'])) {
                $mail->SMTPOptions = $this->options['smtp'];
            }
        }

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
        $this->mail->FromName = $name ? $name : $email;
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
}
