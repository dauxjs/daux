# Subscribing to State Changes

In Daux, you can register listeners that'll fire when any model state changes. To do that, you need to use [`Daux.Core.Store.subscribe()`](../api/store.md#subscribe):

```javascript
store.subscribe(() => console.log('state changed'));
```

You can also provide a unique ID in order to prevent setting up duplicate listeners:

```javascript
store.subscribe(() => console.log('state changed'), 'unique_id');
```

`subscribe()` also returns a function for unregistering the listener

```javascript
const unsubscribe = store.subscribe(() => console.log('state changed'));

// Stop listening to state changes
unsubscribe();
```

[Next: Batching Operations »](05-batching-operations.md)
