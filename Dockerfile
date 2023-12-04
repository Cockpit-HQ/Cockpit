FROM php:8.2-apache

RUN apt-get update \
    && apt-get install -y \
    wget zip unzip nano \
    libfreetype6-dev \
    libjpeg62-turbo-dev \
    libpng-dev \
    libwebp-dev \
    sqlite3 libsqlite3-dev \
    libssl-dev \
    libzip-dev \
    && pecl install mongodb redis \
    && docker-php-ext-configure gd --with-freetype --with-webp --with-jpeg  \
    && docker-php-ext-install -j$(nproc) iconv gd pdo zip opcache pdo_sqlite \
    && a2enmod rewrite expires

RUN echo "extension=mongodb.so" > /usr/local/etc/php/conf.d/mongodb.ini
RUN echo "extension=redis.so" > /usr/local/etc/php/conf.d/redis.ini

COPY --from=composer:2 /usr/bin/composer /usr/local/bin/composer

# Give www-data UID=1000 and GID=1000 to be compatible with the docker host user on linux (often 1000:1000)
RUN usermod --uid 1000 www-data && groupmod --gid 1000 www-data && chown -R www-data:www-data /var/www/html

CMD ["apache2-foreground"]
