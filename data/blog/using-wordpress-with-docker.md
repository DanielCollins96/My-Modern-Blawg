---
title: Using WordPress with Docker
date: 2022-03-02
summary: 'Setting up a WordPress site with Docker'
tags: ['docker', 'wordpress', 'webdev']
---

WordPress can be deployed and hosted in many ways. One traditional way to host Wordpress is with a cloud provider using a Linux Virtual Machine image that has WordPress and MySQL Database configured. This can be fairly cheap with but will require a server to run constantly and it's scaling would be limited.

_Note_ - I think a small VM is provided in the free tier of most major cloud providers.

By using Containers and Container Orchestration some lower level linux and Wordpress can be avoided. Docker in itself allows for different deployment techniques in the cloud. Managed services like AWS Fargate and GCP Cloud Run manage most of the issues with containers related to their ephemeral nature, but docker can also be ran manually on a VM that has storage/filesystems available.

## Running a WordPress site Using Docker

Using containers a WordPress site can be hosted for pennies and still be able to 'Scale to INFINITY'. I will cover some basics of how to use a Wordpress Docker Image and what it means to manage it in a Container Registry.

### About Docker

Docker, and container orchestration tools in general, have helped improve software/cloud development by helping to avoid dependency issues and the 'Well it runs on my machine' rhetoric. Docker provides tools like a CLI and Docker Desktop app to help manage Docker containers.

WordPress is the other technology here thats been running much of the web for a while now, and it's still getting bigger.

### The Docker Image

The following docker-compose.yml file will set up a WordPress site with a MySql database.

```yaml
# this is the docker-compose.yml file

version: '3.1'

services:
  db:
    platform: linux/amd64
    image: mysql:5.7
    restart: always
    environment:
      MYSQL_DATABASE: exampledb
      MYSQL_USER: exampleuser
      MYSQL_PASSWORD: examplepass
      MYSQL_ROOT_PASSWORD: mysqlroot
    volumes:
      - db_data:/var/lib/mysql
    ports:
      - '3306:3306'

  wordpress:
    depends_on:
      - db
    image: wordpress:latest
    restart: always
    ports:
      - 8080:80
    environment:
      WORDPRESS_DB_HOST: db
      WORDPRESS_DB_USER: exampleuser
      WORDPRESS_DB_PASSWORD: examplepass
      WORDPRESS_DB_NAME: exampledb
    volumes:
      - wordpress_data:/var/www/html

volumes:
  db_data: {}
  wordpress_data: {}
```

Note the two required services 'db' and 'wordpress', but other images like 'phpMyAdmin' can be added. Also note the usernames/passwords for connecting with your local machine since the ports are being forwarded.

## Editing Your WordPress Container With Vim

1. Get the name of the wordpress docker container: docker ps
2. Attach shell to the container: docker exec -it $container_name /bin/bash
3. Inside the container, install vim: apt-get update && apt-get -y install vim

Use vi/vim to edit whichever WordPress configuration file you want to change, like /etc/apache2/ports.conf or wp-config.php.

## Next Steps

- Add PhpMyAdmin image for easier DB management
