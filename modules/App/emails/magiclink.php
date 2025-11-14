<p>
    Dear <?=ucfirst($user['name'] ? $user['name'] : $user['user'])?>,
</p>

<p>
    You recently requested a magic link to log in to your account on <a href="<?=$this->getSiteUrl(true)?>"><?=$this->retrieve('app.name')?></a>.
</p>

<p>To complete the login process, simply click the following link:</p>

<br>

<div>
    <a class="button" href="<?=$this->getSiteUrl(true)?>/auth/magiclink?token=<?=$token?>">Login</a>
</div>

<br>

<p>
    This magic link is valid for the next 15 minutes. After that, it will expire, and you'll need to request a new one.
</p>

<p>
    If you didn't request this magic link, please ignore this email, and your account will remain secure.
</p>

<br>

<p><strong>Important Security Note:</strong></p>

<p><i>Never</i> share this magic link with anyone else, as it grants access to your account.</p>
