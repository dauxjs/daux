# Batching Operations

Doing multiple consecutive operations will cause subscription listeners to fire multiple times too:

```javascript
store.subscribe(() => console.log('state changed'));

store.set('user', { id: 'user_a', name: 'John Doe' });
store.update('user', 'user_b', { name: 'LeBron James' });
```

In the example above, the listener will fire twice. This may not be what you want. To solve this, we can batch our operations:

```javascript
store.subscribe(() => console.log('state changed'));

const batch = store.batch();

batch.set('user', { id: 'user_a', name: 'John Doe' });
batch.update('user', 'user_b', { name: 'LeBron James' });
batch.commit();
```

`batch.commit()` will execute the pending operations and will only trigger the listener once.
