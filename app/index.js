'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');

module.exports = yeoman.generators.Base.extend({
  init: function () {
    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.spawnCommand('grunt', ['init']);
      }
    });
  },
  
  askFor: function () {
    var done = this.async();

    this.log(yosay('Hello! Knockout and Node project generator!'));

    var prompts = [{
      type: 'input',
      name: 'name',
      message: 'What is your app name?',
      default: 'KO-NODE'
    }, {
      type: 'input',
      name: 'description',
      message: 'description',
      default: 'Knockout.js and node.js Project'
    }, {
      type: 'input',
      name: 'author',
      message: 'Author name'
    }, {
      name: 'useSocketIO',
      type: 'confirm',
      message: 'Using a Socket.IO?'
    }];

    this.prompt(prompts, function (props) {
      this.props = props;
      done();
    }.bind(this));
  },

  app: function () {
    this.copy('app.ts');
    this.copy('bower.json');
    this.copy('README.md');
    this.template('Gruntfile.js', 'Gruntfile.js');
    this.template('package.json', 'package.json');
    this.copy('tsconfig.json');
    this.template('public/src/index.html', 'public/src/index.html');
    this.template('public/src/assets/css/style.css', 'public/src/assets/css/style.css');
    this.template('public/src/assets/js/script.ts', 'public/src/assets/js/script.ts');
    this.directory('typings/express');
    this.directory('typings/jquery');
    this.directory('typings/knockout');
    this.directory('typings/node');
    if (this.props.useSocketIO) {
      this.directory('typings/socketio');
      this.directory('typings/socketio-client');
    }
  },
  
  install: function () {
    if (!this.options['skip-install']) {
      this.npmInstall();
    }
  }
});
