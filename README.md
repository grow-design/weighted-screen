# weighted screen
[![Build Status](https://travis-ci.org/grow-design/weighted-screen.svg?branch=master)](https://travis-ci.org/grow-design/weighted-screen)
[![npm version](https://badge.fury.io/js/weighted-screen.svg)](http://badge.fury.io/js/weighted-screen)
[![devDependency Status](https://david-dm.org/grow-design/weighted-screen/dev-status.svg)](https://david-dm.org/grow-design/weighted-screen#info=devDependencies)
[![GitHub issues](https://img.shields.io/github/issues/grow-design/weighted-screen.svg)](https://github.com/grow-design/weighted-screen/issues)
[![GitHub stars](https://img.shields.io/github/stars/grow-design/weighted-screen.svg)](https://github.com/grow-design/weighted-screen/stargazers)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/grow-design/weighted-screen/master/LICENSE)

## Demo
https://grow-design.github.io/weighted-screen/demo/

## Table of contents

- [About](#about)
- [Installation](#installation)
- [Documentation](#documentation)
- [Development](#development)
- [License](#licence)

## About



## Installation

Install through npm:
```
npm install --save weighted-screen
```

Then use it in your app like so:

```typescript
import {Component} from '@angular/core';
import {WeightedScreen} from 'weighted-screen';

@Component({
  selector: 'demo-app',
  directives: [WeightedScreen],
  template: '<weighted-screen></weighted-screen>'
})
export class DemoApp {}
```

You may also find it useful to view the [demo source](https://github.com/grow-design/weighted-screen/blob/master/demo/demo.ts).

### Usage without a module bundler
```
<script src="node_modules/dist/umd/weighted-screen/weighted-screen.js"></script>
<script>
    // everything is exported weightedScreen namespace
</script>
```

## Documentation
All documentation is auto-generated from the source via typedoc and can be viewed here:
https://grow-design.github.io/weighted-screen/docs/

## Development

### Prepare your environment
* Install [Node.js](http://nodejs.org/) and NPM (should come with)
* Install local dev dependencies: `npm install` while current directory is this repo

### Development server
Run `npm start` to start a development server on port 8000 with auto reload + tests.

### Testing
Run `npm test` to run tests once or `npm run test:watch` to continually run tests.

### Release
* Bump the version in package.json (once the module hits 1.0 this will become automatic)
```bash
npm run release
```

## License

MIT
