# Daux

Daux is an immutable model-based state management solution for your JavaScript apps. It's built by combining some of the concepts of [Ember Data](https://github.com/emberjs/data) and [Redux](https://github.com/reduxjs/redux).

In our apps, we usually have models that represent critical states. For example, in a social network app, they may be users, groups, posts, comments, etc. The non-critical states are the likes of "is this dialog open?". For the former, we'll be using Daux to manage those states.

## Installation

Assuming that you're using [npm](https://www.npmjs.com/) as your package manager:

```
npm install --save daux
```

If you're not using any module bundler, you can use the precompiled production and development [UMD](https://github.com/umdjs/umd) builds in the `dist` folder. For this build, `Daux` would be available as a `window.Daux` global variable. You can download the files at [unpkg](https://unpkg.com/daux/).

## Usage

Check out the [docs](docs/README.md)

## Contributing

### Installation

* `git clone <repository-url>`
* `cd daux`
* `npm install`

### Running tests

* `npm test`

## License

This project is licensed under the [MIT License](LICENSE.md).
