#!/bin/bash
composer install
symfony server:stop
symfony server:start