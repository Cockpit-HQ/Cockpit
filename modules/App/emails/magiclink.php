
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
    If you didn't request this magic link, please ignore this email, and your account will remain secure.
</p>

<br>

<p><strong>Important Security Note:</strong></p>

<p><i>Never</i> share this magic link with anyone else, as it grants access to your account.</p>
