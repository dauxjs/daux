# Daux

An immutable model-based state management solution for your JavaScript apps.

## Design

The library was built by combining some of the concepts of [Ember Data](https://github.com/emberjs/data) and [Redux](https://github.com/reduxjs/redux).

Most apps have a model-based state that might look like this:

```json
{
  "user": {
    "user_a": {
      "name": "John Doe",
      "country": "country_a",
      "groups": [
        "group_a"
      ],
      "posts": [
        "post_a"
      ]
    }
  },
  "country": {
    "country_a": {
      "name": "United States of America"
    }
  },
  "group": {
    "group_a": {
      "name": "Hikers Club",
      "members": [
        "user_a"
      ]
    }
  },
  "post": {
    "post_a": {
      "title": "When is the next hike?",
      "author": "user_a"
    }
  }
}
```

In Daux, these kind of states are managed by the `Store`. With it, you'll be able to create, read, update, and delete model records.

## Installation

Assuming that you're using [npm](https://www.npmjs.com/) as your package manager:

```
npm install daux
```

If you're not using any module bundler, you can use the precompiled production and development [UMD](https://github.com/umdjs/umd) builds in the `dist` folder. For this build, `Daux` would be available as a `window.Daux` global variable. You can download the files at [unpkg](https://unpkg.com/daux/).

## Usage

Check out the [API reference](API.md)

### Setup your models

Create your models

```javascript
import { Model, Store } from 'daux';

class User extends Model {
  static get attributes() {
    return ['name'];
  }

  static get relationship() {
    return {
      country: {
        type: 'country',
        kind: 'belongsTo',
        inverse: null,
      },
      groups: {
        type: 'group',
        kind: 'hasMany',
        inverse: 'members',
      },
      posts: {
        type: 'post',
        kind: 'hasMany',
        inverse: 'author',
      },
    };
  }

  /**
   * Optional hook to deserialize a record
   */
  static deserialize(record) {
    const deserializedRecord = {};

    Object.keys(record).forEach((key) => {
      // Use name instead of display_name to match the model attributes
      if (key === 'display_name') {
        deserializedRecord['name'] = record[key];
      }
    });

    return deserializedRecord;
  }
}
```

Next, we pass-in those models to the `Store`:

```javascript
const store = new Store({
  user: User
});
```

### Fetching states

```javascript
async function fetchUsers() {
  return store.getAll('user', {
    fetch() {
      return fetch('example.com/api/users').then((response) => {
        return response.json();
      });
    }
  });
}
```

### Changing states

```javascript
async function createUser(newUser) {
  await fetch('example.com/api/users', {
    method: 'POST',
    body: JSON.stringify(newUser)
  });
  store.set('user', newUser);
}
```

### Subscribing to state changes

```javascript
// Log "Foo" everytime a state changes
const unsubscribe = store.subscribe(() => console.log('Foo'));

// Stop listening to state changes
unsubscribe();
```

## Contributing

### Installation

* `git clone <repository-url>`
* `cd daux`
* `npm install`

### Running tests

* `npm test`

## License

This project is licensed under the [MIT License](LICENSE.md).
