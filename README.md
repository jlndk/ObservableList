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
yarn add @jlndk/ObservableList
```

**NPM**
```
npm install @jlndk/ObservableList
```

## Usage
See [Wiki](https://github.com/jlndk/ObservableList/wiki/Usage).

**TL;DR:**
```js
import {list} from '@jlndk/observable-list';
const list = list(); // or list(["initial", "values"]);
const unsubscribe = list.subscribe(updatedList => {
    //Do what you want with updated list...
    console.log(updatedList[0]); //new value
});
list.push("new value");
```
**Notice: Make sure to call the `unsubscribe` method when your component is destroyed to prevent memory leaks.**

## Contributing
1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request

## Tests
@TODO
