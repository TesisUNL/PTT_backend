<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://bosquesecoturismo.com/x/cdn/?https://storage.googleapis.com/wzukusers/user-27851147/images/592d8afd6eb35vdTPKVi/nuevo-logo_d200.png" width="320" alt="LOGO DE la mancomunidad bosque Seco" /></a>
</p>
change
  
  <p align="center">Backend para la aplicación de la Ruta Turśitica de la <a href="http://www.mancomunidadbosqueseco.gob.ec/" target="_blank">Mancomunidad Bosque Seco </a> Con el fin de incentivar el turismo</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/badge/npm-8.3.1-green" alt="NPM Version" /></a>




</p>

## Descripción

Este repositorio esta construido bajo [Nest](https://github.com/nestjs/nest) framework de TypeScript. Como parte del proyecto para la ruta turística de la MBS  

## Pre-requisitos
### 1.-Instalar node version manager (NVM)
Se recomienda emplear <a href="https://github.com/nvm-sh/nvm">nvm</a>

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
```

### 2.-Instalar Node v16.15.0
```bash
nvm install 16.15.0
```

### 3.-Instalar dependencias
```bash
npm install
```


## Corriendo la app

```bash
# development
$ npm start
```


## Base de Datos Local

### Pre-requisitos

### 1 Instalar mysql 
* Linux
```bash
# ubuntu
$ sudo apt install mysql-server
```
* windows

Ir a la página oficial y descargar <a href="https://dev.mysql.com/downloads/mysql/">mysql</a>

### 2 Crear BD 

Genere una Base de datos con el nombre <span>RTMBS</span> para crear la bd se accede a la terminal de mysql con su usuario y contraseña.
```mysql
$ mysql -u <userDB> -p
```
Posteriormente en la terminal de mysql se crea la base de datos:
```mysql
mysql> create database RTMBS;
```
### 3 Setter la variable de entorno
Para generar la BD genere un archivo`.env` en la ruta principal del proyecto y sete la variable `ORM_SYNC` a `true`. Dentro del archivo defina la configuración para la BD  

```bash
ORM_SYNC=true
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=<my-bd-username>
DB_PASSWORD=<my-bd-password>
DB_DATABASE_NAME=RTMBS
```
<i>**NOTE**</i>.- Una vez generada la BD defina la variable `ORM_SYNC=false` o eliminela de su archivo `.env`, caso contrario se generará nuevamente una BD eliminando sus datos locales.

### Debug

Para observar las querys generadas por Type-ORM agregue en el archivo `.env` la variable `DB_DEBUG` y asignele un valor de `true`

```bash
...
DB_DATABASE_NAME=RTMBS
DB_DEBUG=true
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```





