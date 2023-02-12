FROM php:8.0-apache as base

RUN apt-get update \
    && apt-get install -y \
		wget zip unzip \
        libzip-dev \
        libfreetype6-dev \
        libjpeg62-turbo-dev \
        libpng-dev \
        sqlite3 libsqlite3-dev \
        libssl-dev \
    && docker-php-ext-configure gd --with-freetype=/usr/include/ --with-jpeg=/usr/include/ \
    && docker-php-ext-install -j$(nproc) iconv gd pdo zip opcache pdo_sqlite \
    && pecl install mongodb \
    && a2enmod rewrite expires

RUN echo "extension=mongodb.so" > /usr/local/etc/php/conf.d/mongodb.ini

# Give www-data UID=1000 and GID=1000 to be compatible with the docker host user on linux (often 1000:1000)
RUN usermod --uid 1000 www-data && groupmod --gid 1000 www-data && chown -R www-data:www-data /var/www/html

COPY --from=composer:2 /usr/bin/composer /usr/local/bin/composer

CMD ["apache2-foreground"]
