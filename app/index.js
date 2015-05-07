'use strict';

var generators = require('yeoman-generator'),
    mkdirp = require('mkdirp'),
    yosay = require('yosay'),
    chalk = require('chalk');

module.exports = generators.Base.extend({
    _createProjectFileSystem: function () {
        var destRoot = this.destinationRoot(),
            sourceRoot = this.sourceRoot(),
            appDir = destRoot + '/app',
            dirs = ['scripts', 'img', 'sass'],
            generator = this,
            sassfileExtension = (generator.options.sass) ? '.sass' : '.scss',
            templateContext = {
                appname: generator.appname,
                appdescription: generator.appdescription,
                appversion: generator.appversion,
                appauthor: generator.appauthor,
                appemail: generator.appemail,
                applicense: generator.applicense
            };

        dirs.forEach(function (dir) {
            mkdirp(appDir + '/' + dir);
        });

        generator.fs.copy(sourceRoot + '/.bowerrc', destRoot + '/.bowerrc');
        generator.fs.copyTpl(sourceRoot + '/bower.json', destRoot + '/bower.json', templateContext);
        generator.fs.copy(sourceRoot + '/.editorconfig', destRoot + '/.editorconfig');
        generator.fs.copy(sourceRoot + '/.jshintrc', destRoot + '/.jshintrc');
        generator.fs.copyTpl(sourceRoot + '/CONTRIBUTING.md', destRoot + '/CONTRIBUTING.md', templateContext);
        generator.fs.copyTpl(sourceRoot + '/README.md', destRoot + '/README.md', templateContext);
        generator.fs.copyTpl(sourceRoot + '/package.json', destRoot + '/package.json', templateContext);

        generator.fs.copy(sourceRoot + '/humans.txt', appDir + '/humans.txt');
        generator.fs.copy(sourceRoot + '/robots.txt', appDir + '/robots.txt');

        generator.fs.copyTpl(sourceRoot + '/sass/_vars' + sassfileExtension, appDir + '/sass/_vars' + sassfileExtension, templateContext);
        generator.fs.copy(sourceRoot + '/sass/host' + sassfileExtension, appDir + '/sass/host' + sassfileExtension);
        generator.fs.copy(sourceRoot + '/sass/_name-space' + sassfileExtension, appDir + '/sass/_name-space' + sassfileExtension);

        generator.fs.copy(sourceRoot + '/config.js', appDir + '/config.js');
        generator.fs.copyTpl(sourceRoot + '/module.js', appDir + '/scripts/module.js', templateContext);
        generator.fs.copyTpl(sourceRoot + '/main.js', appDir + '/main.js', templateContext);
        generator.fs.copyTpl(sourceRoot + '/index.html', destRoot + '/index.html', templateContext);

        generator.fs.copy(sourceRoot + '/test/test-main.js', destRoot + '/test/test-main.js');
        generator.fs.copyTpl(sourceRoot + '/test/module-Spec.js', destRoot + '/test/spec/module-Spec.js', templateContext);
        generator.fs.copy(sourceRoot + '/test/patterns.txt', destRoot + '/test/patterns.txt');
    },
    _getPrompts: function () {
        var prompts = [{
            name: 'name',
            message: 'What is the name of your project?',
            default: this.appname
        }, {
            name: 'description',
            message: 'What is a description of your project'
        }, {
            name: 'version',
            message: 'What version is your project? (hint: use semver)',
            default: '0.0.0'
        }, {
            name: 'license',
            message: 'How is your project licensed?',
            default: 'MIT'
        }, {
            name: 'yourname',
            message: 'What is your name?',
        }, {
            name: 'email',
            message: 'What is your email?',
        }];
        return prompts;
    },
    _saveAnswers: function (answers, callback) {
        this.appname = answers.name;
        this.appdescription = answers.description;
        this.appversion = answers.version;
        this.applicense = answers.license;
        this.appauthor = answers.yourname;
        this.appemail = answers.email;
        callback();
    },
    _createGruntfile: function () {
        var sassfileExtension = (this.options.sass) ? '.sass' : '.scss',
            appDir = this.destinationRoot() + '/app/',
            sassOutFile = appDir + '/styles/host.css',
            sassInFile = appDir + '/sass/host' + sassfileExtension,
            sassConfig = {
                options: {
                    outputStyle: 'compressed'
                },
                dist: {
                    files: {}
                }
            };
        sassConfig.dist.files[sassOutFile] = sassInFile;

        this.gruntfile.insertConfig('clean', '{ files: ["dist"] }');
        this.gruntfile.insertConfig('jshint', '{ all: ["Gruntfile.js", "app/scripts/**/*.js", "test/spec/**/*.js"] }');
        this.gruntfile.insertConfig('sass', JSON.stringify(sassConfig));

        this.gruntfile.loadNpmTasks('grunt-contrib-clean');
        this.gruntfile.loadNpmTasks('grunt-contrib-jshint');
        this.gruntfile.loadNpmTasks('grunt-sass');

        this.gruntfile.registerTask('default', ['clean', 'jshint', 'sass']);
    },

    constructor: function () {
        generators.Base.apply(this, arguments);
        this.option('sass', {
            desc: 'Use classic Sass syntax instead of SCSS',
        });
    },

    initializing: function () {
        var message = chalk.yellow.bold('Welcome to jStack ')
            + chalk.yellow('A solid JS Stack to develop with');

        this.log(yosay(message, { maxLength: 17 }));
    },
    prompting: function () {
        var done = this.async();

        this.prompt(this._getPrompts(), function (answers) {
            this._saveAnswers(answers, done);
        }.bind(this));
    },
    configuring: function () {
        this.config.save();
    },
    writing: function () {
        this._createProjectFileSystem();
        this._createGruntfile();

        this.composeWith('karma', {
            options: {
                'base-path': '../',
                'frameworks': 'jasmine,requirejs,sinon',
                'gruntfile-path': '.',
                'app-files': 'app/config.js,test/test-main.js'
            }
        }, {
            local: require.resolve('generator-karma/app')
        });

    },
    install: function () {
        this.bowerInstall();
        this.npmInstall();
    }
});
