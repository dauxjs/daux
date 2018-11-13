# Daux.Core.Store

The store is used for:

- Holding your app's states as well as doing CRUD operations against them
- Register listeners that gets fired whenever a state changes

## Functions

- [batch](#batch)
- [delete](#delete)
- [getAll](#getall)
- [get](#get)
- [query](#query)
- [set](#set)
- [subscribe](#subscribe)
- [update](#update)

### batch

Returns a [`Daux.Core.Batch`](batch.md) class used for batching operations.

This is for the case where you want to update the state multiple times sequentially while just triggering the listeners for the subscribed callbacks **once**.

e.g.

```javascript
const batch = store.batch();

batch.update('user', 'user_a', { name: 'Foo' });
batch.delete('user', 'user_b');
batch.commit();
```

#### Returns:

Instance of the [`Daux.Core.Batch`](batch.md)

Type: [`Daux.Core.Batch`](batch.md)

### delete

Deletes a record for a type.

This accepts the following option:

- `isBackgroundOperation` - When true, this won't execute the listeners for the subscribed callbacks.

#### Params:

| Name   | Type   | Attributes | Description |
| -------| -------| ---------- | ----------- |
| type   | string |            |             |
| id     | string |            |             |
| option | Object | optional   |             |

### getAll

Gets all the records for a type.

This accepts the following option:

- `fetch()` - Function that'll be use the fetch the resource
- `include` - Object containing relationship keys as functions that'll be used to sideload them

e.g.

```javascript
this.store.getAll('user', {
  fetch() {
    return fetch('example.com/api/users').then((response) => {
      return response.json();
    });
  },

  include: {
    posts(record) {
      return fetch(`example.com/api/users/${record.id}/posts`).then((response) => {
        return response.json();
      });
    }
  }
})
```

When `option.fetch()` is unavailable, this'll resolve with the cached records in the store. Otherwise, this'll resolves to whatever gets resolved in `option.fetch()`.

`option.fetch()` and all `belongsTo` includes will be skipped even when passed-in if the record has already been cached.

#### Params:

| Name   | Type     | Attributes | Description                                             |
| -----  | -------- | ---------- | ------------------------------------------------------- |
| type   | string   |            |                                                         |
| fetch  | callback | optional   | Must return a promise that resolves to the fetched data |

#### Returns:

All the records for a type

Type: Array | Promise

### get

Gets the record for a type and ID.

This accepts the following option:

- `fetch()` - Function that'll be use the fetch the resource
- `include` - Object containing relationship keys as functions that'll be used to sideload them

e.g.

```javascript
this.store.get('user', 'user_a', {
  fetch() {
    return fetch('example.com/api/users/user_a').then((response) => {
      return response.json();
    });
  },

  include: {
    posts() {
      return fetch('example.com/api/users/user_a/posts').then((response) => {
        return response.json();
      });
    }
  }
})
```

When `option.fetch()` is unavailable, this'll resolve with the cached records in the store. Otherwise, this'll resolves to whatever gets resolved in `option.fetch()`.

`option.fetch()` and all `belongsTo` includes will be skipped even when passed-in if the record has already been cached.

#### Params:

| Name   | Type   | Attributes | Description |
| ------ | -------| ---------- | ----------- |
| type   | string |            |             |
| id     | string |            |             |
| option | Object | optional   |             |

#### Returns:

Record for the type and ID

Type: Promise

### query

Queries records for a type.

This accepts the following option:

- `fetch()` - Function that'll be use the fetch the resource
- `include` - Object containing relationship keys as functions that'll be used to sideload them

e.g.

```javascript
this.store.query('user', {
  fetch() {
    return fetch('example.com/api/users?age=50').then((response) => {
      return response.json();
    });
  },

  include: {
    posts(record) {
      return fetch(`example.com/api/users/${record.id}/posts`).then((response) => {
        return response.json();
      });
    }
  }
})
```

All `belongsTo` includes will be skipped even when passed-in if the record has already been cached.

#### Params:

| Name  | Type     | Attributes | Description                                             |
| ------| -------- | ---------- | ------------------------------------------------------- |
| type  | string   |            |                                                         |
| fetch | callback |            | Must return a promise that resolves to the fetched data |

#### Returns:

Queried records

Type: Promise

### set

Sets a record for a type.

This accepts the following option:

- `isBackgroundOperation` - When true, this won't execute the listeners for the subscribed callbacks.

#### Params:

| Name    | Type   | Attributes | Description |
| --------| ------ | ---------- | ----------- |
| type    | string |            |             |
| record  | Object |            |             |
| option  | Object | optional   |             |

### subscribe

Subscribes for any changes in the state.

To avoid having duplicate subscriptions, you can pass-in a unique ID of your choosing.

Note that when a subscription callback fails, it would be removed.

#### Params:

| Name     | Type        | Attributes | Description |
| -------- | ----------- | ---------- | ----------- |
| callback | callback    |            |             |
| id       | string      | optional   |             |

#### Returns:

Function that you can call to unsubscribe from changes.

Type: Function

### update

Updates a record for a type.

This accepts the following option:

- `isBackgroundOperation` - When true, this won't execute the listeners for the subscribed callbacks.

#### Params:

| Name   | Type   | Attributes | Description |
| -------| -------| ---------- | ----------- |
| type   | string |            |             |
| id     | string |            |             |
| record | Object |            |             |
| option | Object | optional   |             |
