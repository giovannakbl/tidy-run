FROM php:7.4-fpm-bullseye

RUN curl -1sLf 'https://dl.cloudsmith.io/public/symfony/stable/setup.deb.sh' | bash

RUN apt-get update && apt-get upgrade -y && apt-get install -y \
    git zip unzip symfony-cli && \
    rm -rf /var/lib/apt/lists/*

RUN docker-php-ext-install mysqli pdo pdo_mysql && docker-php-ext-enable pdo_mysql

RUN curl -sS https://getcomposer.org/installer | php && mv composer.phar /usr/local/bin/composer

COPY . /var/www/symfony

WORKDIR /var/www/symfony

RUN composer install

CMD ["symfony", "server:start"]
