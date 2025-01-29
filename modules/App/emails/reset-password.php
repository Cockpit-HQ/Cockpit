<p>
    Dear <?=ucfirst($user['name'] ? $user['name'] : $user['user'])?>,
</p>

<p>
    We received a request to reset the password for your account. If you made this request, please click the button below to create a new password:
</p>

<br>

<div>
    <a class="button" href="<?=$this->getSiteUrl(true)?>/auth/reset?token=<?=$token?>">Reset Password</a>
</div>

<br>

<p>
    This link will expire in 15 minutes for security purposes.
</p>

<p>
    If you didn't request a password reset, you can safely ignore this email and your password will remain unchanged.
</p>

<p>
    <strong>For security reasons, we recommend:</strong>
</p>

<ul>
    <li>Creating a strong, unique password</li>
    <li>Not sharing your password with others</li>
    <li>Enabling two-factor authentication if available</li>
</ul>

<br>

<p><strong>Important Security Note:</strong></p>

<p><i>Never</i> share this link with anyone else, as it grants access to your account.</p>
