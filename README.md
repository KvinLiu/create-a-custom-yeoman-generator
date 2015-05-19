# [Create a Custom Yeoman Generator][published url]
## Instructor: [Dan Wellman][instructor url]


In this course you'll learn how to create a custom generator for the web app scaffolding tool, Yeoman. A good scaffold is like a kick starter for new development projects, ensuring the source code is organized using best practices and cutting-edge tooling. Yeoman has a scaffolding generator ecosystem with packages for a huge number of possible technology stacks, but sometimes there's just not quite the configuration your looking for.

We'll start by looking at how to use Yeoman with community-built generators, and then we'll move on to implementing a custom generator that scaffolds my favorite stack for web application development.


## Source Files Description

jstack is a basic Yeoman generator that installs RequireJS, KnockoutJS, Sass, Jasmine, Sinon and Karma. This generator is used as the example application in the Tuts+ course Creating a Yeoman Generator

## Usage

Requires Yo and Bower be installed.

Install globally with `npm install -g generator-jstack`.

CD into a new directory and run the generator with `yo jstack`.

Has `jshint`, `sass` and `test` grunt tasks configured.

Ensure the contents of the file `patterns.txt` is copied into the files array in `karma.conf.js`.

----------------------------

#### 3rd-Party Content

#### [NodeJS logo](https://nodejs.org/logos/)
Permitted per [Node.js Trademark Policy](https://nodejs.org/trademark-policy.pdf)

#### [Grunt logo](https://github.com/gruntjs/gruntjs.com/tree/master/src/img)

#### [Bower logo](http://bower.io/docs/about/#logo)
Licensed under [CC-BY-2.0](https://creativecommons.org/licenses/by/2.0/)

#### [Yeoman logo](https://github.com/yeoman/media)
Licensed under [CC-BY-2.0](https://creativecommons.org/licenses/by/2.0/)

------

These are source files for the Tuts+ course: [Create a Custom Yeoman Generator][published url]

Available on [Tuts+](https://tutsplus.com). Teaching skills to millions worldwide.

[published url]: https://code.tutsplus.com/courses/create-a-custom-yeoman-generator
[instructor url]: https://tutsplus.com/authors/dan-wellman
