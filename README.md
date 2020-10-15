# Class Modify
A tiny package to manage and modify HTML classes

# Install

```sh
npm i class-modify
```

# Usage

## Add, remove and toggle classes

```js
import { modifyClass } from 'class-modify';

const classes = modifyClass('test one two');
console.log(classes.add('three').toString()); // --> test one two three
console.log(classes.remove('two').toString()); // --> test one three
console.log(classes.toggle('three').toString()); // --> test one
console.log(classes.toggle('three').toString()); // --> test one three
```

## Subscribe to changes

```js
import { modifyClass } from 'class-modify';

const classes = modify('test one two');
const subscription = classes.subscribe((classes) => {
    console.log(classes); // --> "test one two three" // Called after an operation
});

classes.add('three'); // --> This will call the subscribed callbacks

subscription.unsubscribe(); // Removes the callback
```

## Reset and reset all

```js
classes.reset(); // Clears all the classes (subscriptions stay intact)
classes.resetAll(); // Clears all the classes and subscriptions
```

