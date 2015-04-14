# generator-konode
Knockout.js and Node.js(express) template for Yeoman Generator

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
### Manual Compile Typescript

`grunt compile`

### Auto Compile Typescript on File Edited

`grunt watch`
