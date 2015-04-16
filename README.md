# generator-konode
Knockout.js and Node.js(express) template for Yeoman Generator.

this template is for Simple Page Application.

built-in

・jquery

・bootstrap

・knockout

## Preparation
### Install Node.js

https://nodejs.org/

### Install git client

https://msysgit.github.io/

### Install bower, grunt, yeoman

`npm install -g  bower grunt-cli yo`

### Install generator

`npm install -g generator-konode`

## Create New Project

if you wanto to create new Project, path(C:\project\test)

````
mkdir C:\project\test
cd C:\project\test
yo konode
````

## Start Node

`node-dev app.js`

## Access App

`http://[hostname]:3000`

## Development
### Implement these files

#### Client Side
````
public/src/index.html
public/src/assets/js/script.ts
````

#### Server Side
````
app.ts
````

### Manual Compile Typescript

`grunt compile`

### Auto Compile Typescript on File Edited

`grunt watch`

### Add Library

````
bower install [package-name] --save
copy [css file to public/src/assets/css/] or [js file to public/src/assets/js/] //manually step
grunt addlib
````