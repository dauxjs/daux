# API

## Table of Contents

- [Daux.Core.Batch](#dauxcorebatch)
  - [Functions](#functions)
    - [commit](#commit)
    - [delete](#delete)
    - [set](#set)
    - [update](#update)
- [Daux.Core.Model](#dauxcoremodel)
  - [Static Properties](#static-properties)
    - [attributes](#attributes)
    - [relationship](#relationship)
  - [Static Functions](#static-functions)
    - [deserialize](#deserialize)
- [Daux.Core.Store](#dauxcorestore)
  - [Functions](#functions-1)
    - [batch](#batch)
    - [delete](#delete-1)
    - [getAll](#getall)
    - [get](#get)
    - [query](#query)
    - [set](#set-1)
    - [subscribe](#subscribe)
    - [update](#update-1)

## Daux.Core.Batch

Batch is used for performing multiple state operations in one go. This means that the subscription callbacks will only get triggered once when batching operations.

```javascript
import { Store } from 'daux';

import User from './models/user';

const store = new Store({ user: User });
const batch = store.batch();

batch.set('user', { id: 'user_a', name: 'User A' });
batch.set('user', { id: 'user_b', name: 'User B' });
batch.commit();
```

### Functions

#### commit

Commits the batched operations

This accepts the following option:

- `isBackgroundOperation` - When true, this won't execute the listeners for the subscribed callbacks.

##### Params:

| Name   | Type   | Attributes | Description |
| -------| -------| ---------- | ----------- |
| option | Object | optional   |             |

### delete

Batch a delete operation

##### Params:

| Name   | Type   | Attributes | Description |
| -------| -------| ---------- | ----------- |
| type   | string |            |             |
| id     | string |            |             |

### set

Batch a set operation

##### Params:

| Name    | Type   | Attributes | Description |
| --------| ------ | ---------- | ----------- |
| type    | string |            |             |
| record  | Object |            |             |

### update

Batch an update operation

##### Params:

| Name   | Type   | Attributes | Description |
| -------| -------| ---------- | ----------- |
| type   | string |            |             |
| id     | string |            |             |
| record | Object |            |             |

## Daux.Core.Model

The model is a blueprint on how Daux will represent the your app's underlying data.

### Static Properties

#### attributes

Override this and return the attribute (non-relationship) names for a model

##### Returns:

Array of attribute names

Type: Array

#### relationship

Override this and return the relationship descriptor for a model

e.g.

```javascript
static get relationship() {
  return {
    country: {
      type: 'country',
      kind: 'belongsTo',
      inverse: null,
    },
    posts: {
      type: 'post',
      kind: 'hasMany',
      inverse: 'author',
    }
  };
}
```

##### Returns:

Object containing the relationship descriptors

Type: Object

### Static Functions

#### deserialize

Override this hook to deserialize your response if necessary

##### Params:

| Name   | Type   | Attributes | Description |
| -------| -------| ---------- | ----------- |
| record | Object |            |             |

##### Returns:

Deserialized record

Type: Object

## Daux.Core.Store

The store is used for:

- Holding your app's states as well as doing CRUD operations against them
- Register listeners that gets fired whenever a state changes

### Functions

#### batch

Returns a `Daux.Core.Batch` class used for batching operations.

This is for the case where you want to update the state multiple times sequentially while just triggering the listeners for the subscribed callbacks **once**.

e.g.

```javascript
const batch = store.batch();

batch.update('user', 'user_a', { name: 'Foo' });
batch.delete('user', 'user_b');
batch.commit();
```

##### Returns:

Instance of the `Daux.Core.Batch`

Type: `Daux.Core.Batch`

#### delete

Deletes a record for a type.

This accepts the following option:

- `isBackgroundOperation` - When true, this won't execute the listeners for the subscribed callbacks.

##### Params:

| Name   | Type   | Attributes | Description |
| -------| -------| ---------- | ----------- |
| type   | string |            |             |
| id     | string |            |             |
| option | Object | optional   |             |

#### getAll

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

##### Params:

| Name   | Type     | Attributes | Description                                             |
| -----  | -------- | ---------- | ------------------------------------------------------- |
| type   | string   |            |                                                         |
| fetch  | callback | optional   | Must return a promise that resolves to the fetched data |

##### Returns:

All the records for a type

Type: Array | Promise

#### get

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

##### Params:

| Name   | Type   | Attributes | Description |
| ------ | -------| ---------- | ----------- |
| type   | string |            |             |
| id     | string |            |             |
| option | Object | optional   |             |

##### Returns:

Record for the type and ID

Type: Promise

#### query

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

##### Params:

| Name  | Type     | Attributes | Description                                             |
| ------| -------- | ---------- | ------------------------------------------------------- |
| type  | string   |            |                                                         |
| fetch | callback |            | Must return a promise that resolves to the fetched data |

##### Returns:

Queried records

Type: Promise

#### set

Sets a record for a type.

This accepts the following option:

- `isBackgroundOperation` - When true, this won't execute the listeners for the subscribed callbacks.

##### Params:

| Name    | Type   | Attributes | Description |
| --------| ------ | ---------- | ----------- |
| type    | string |            |             |
| record  | Object |            |             |
| option  | Object | optional   |             |

#### subscribe

Subscribes for any changes in the state.

To avoid having duplicate subscriptions, you can pass-in a unique ID of your choosing.

Note that when a subscription callback fails, it would be removed.

##### Params:

| Name     | Type        | Attributes | Description |
| -------- | ----------- | ---------- | ----------- |
| callback | callback    |            |             |
| id       | string      | optional   |             |

##### Returns:

Function that you can call to unsubscribe from changes.

Type: Function

#### update

Updates a record for a type.

This accepts the following option:

- `isBackgroundOperation` - When true, this won't execute the listeners for the subscribed callbacks.

##### Params:

| Name   | Type   | Attributes | Description |
| -------| -------| ---------- | ----------- |
| type   | string |            |             |
| id     | string |            |             |
| record | Object |            |             |
| option | Object | optional   |             |
