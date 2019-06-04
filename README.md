# ObservableList
> Lightweight, powerful & framework-agnostic JavaScript state management in less than 1.5KB!

`ObservableList` is a simple, but flexible way of storing data in Single Page Applications, based on the paradigm of *stores*, presented by [Svelte](https://svelte.dev/docs#svelte_store).
The goal is to make it as simple to work with arrays as with primitive data-types, such as integers, booleans and strings, while still offering reactivity, persistance and sharability between application components.

Also includes helper for syncronising data with LocalStorage.

## Demo
@TODO

## Installing

The package can be installed with NPM or Yarn.

**Yarn**
```
yarn install @jlndk/ObservableList
```

**NPM**
```
npm install @jlndk/ObservableList
```

## Usage
See [Wiki](https://github.com/jlndk/ObservableList/wiki/Usage).

**TL;DR:**
```js
import {list} from '@jlndk/ObservableList';
const list = list();
// Can also be initialized with initial values like:
// const list = list(["initial", "values"]);
list.subscribe(updatedList => {
    //Do what you want with updated list...
});

//Since ObservableList inherits from Array, all of those methods, such as filter, reduce and push are available.
```

## Contributing
1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request

## Tests
@TODO
