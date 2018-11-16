# CRUD Records

For the examples below, we'll be using the same `Store` from the previous guide.

## Creating a record

```javascript
store.set('user', {
  id: 'user_1',
  name: 'John Doe'
});
```

The [`deserialize`](../api/model.md#deserialize) hook won't fire when we create records so you should just pass-in the flat data that the `Store` expects.

## Reading records

### Single record

```javascript
store.get('user', 'user_1').then(user => console.log(user));
```

Since we've created the record previously, the `get` above will return:

```javascript
{
  id: 'user_1',
  name: 'John Doe',
  country: null,
  groups: []
}
```

If you haven't created the record yet, you can fetch it from your API:

```javascript
store.get('user', 'user_1', {
  fetch() {
    // We're using the browser native Fetch API here
    return fetch('example.com/api/users/user_1').then((response) => {
      return response.json();
    });
  }
}).then(user => console.log(user));
```

You can also sideload your relationships if it's not yet embedded in your API response:

```javascript
store.get('user', 'user_1', {
  fetch() {
    // We're using the browser native Fetch API here
    return fetch('example.com/api/users/user_1').then((response) => {
      return response.json();
    });
  },

  include: {
    country(record) {
      // We're using the browser native Fetch API here
      return fetch(`example.com/api/countries/${record.country}`).then((response) => {
        return response.json();
      });
    }
  }
}).then(user => console.log(user));
```

Notes:
  - If the record is already cached, `get` will ignore the fetch and resolve with the cached record
  - If a belongs-to record is already cached, `get` will ignore the sideloads and resolve with the cached record
  - For has-many records, they'll always run their requests as we're never really sure if **all** has-many records are already cached

### All records

```javascript
store.getAll('user').then(users => console.log(users));
```

Since we've created the record previously, the `getAll` above will return:

```javascript
[
  {
    id: 'user_1',
    name: 'John Doe',
    country: null,
    groups: []
  }
]
```

Similarly with [`get`](#single-record), we can also fetch it from our API:

```javascript
store.getAll('user' {
  fetch() {
    // We're using the browser native Fetch API here
    return fetch('example.com/api/users').then((response) => {
      return response.json();
    });
  },

  include: {
    country(record) {
      // We're using the browser native Fetch API here
      return fetch(`example.com/api/countries/${record.country}`).then((response) => {
        return response.json();
      });
    }
  }
}).then(users => console.log(users));
```

Notes:
  - When making a `getAll` with a network request, this will mark all records for that model as cached. This means that the next time you make another `getAll`, it'll resolve with the cached records.
  - If a belongs-to record is already cached, `getAll` will ignore the sideloads for that specific record and resolve with the cached record
  - For has-many records, they'll always run their requests as we're never really sure if **all** has-many records for a specific record are already cached

### Multiple records (query)

```javascript
store.query('user' {
  fetch() {
    // We're using the browser native Fetch API here
    return fetch('example.com/api/users').then((response) => {
      return response.json();
    });
  },

  include: {
    country(record) {
      // We're using the browser native Fetch API here
      return fetch(`example.com/api/countries/${record.country}`).then((response) => {
        return response.json();
      });
    }
  }
}).then(users => console.log(users));
```

Notes:
  - Unlike `getAll` this will never resolve to the cached records.
  - If a belongs-to record is already cached, `query` will ignore the sideloads for that specific record and resolve with the cached record
  - For has-many records, they'll always run their requests as we're never really sure if **all** has-many records for a specific record are already cached

## Updating a record

```javascript
store.update('user', 'user_1', {
  name: 'John Cena'
});
```

The [`deserialize`](../api/model.md#deserialize) hook won't fire when we update records so you should just pass-in the flat data that the `Store` expects.

## Deleting a record

```javascript
store.delete('user', 'user_1');
```

[Next: Subscribing to State Changes »](04-subscribing-to-state-changes.md)
