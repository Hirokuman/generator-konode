'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');

var KoNodeGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.spawnCommand('grunt', ['resolve']);
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
    }];

    this.prompt(prompts, function (props) {
      this.props = props;
      done();
    }.bind(this));
  },

  app: function () {
    this.copy('app.ts');
    this.copy('bower.json');
    this.copy('Gruntfile.js');
    this.template('package.json', 'package.json', this.name);
    this.copy('tsconfig.json');
    this.directory('public');
    this.directory('typings');
  },
  
  install: function () {
    if (!this.options['skip-install']) {
      this.npmInstall();
    }
  }
});

module.exports = KoNodeGenerator;