# Models

The model is a blueprint on how Daux will represent your app's data.

## Create a model

```javascript
// src/models/user.js
import { Model } from 'daux';

export default class User extends Model {
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
      }
    };
  }

  deserialize(record) {
    const newRecord = { ...record, name: record.display_name };

    delete newRecord.display_name;

    return newRecord;
  }
}
```

In the example above, our `User` model has:
  - `name` as an attribute
  - `country` as a belongs-to relationship to `Country` model
  - `groups` as a has-many relationship to `Group` model
  - a `deserialize` hook, more on this below

### Deserialization

The [`Store`](../api/store.md) expects to receive a flat data. If you have a model like the example above, the data to be fed to the `Store` should be:

```json
{
  "id": "user_1",
  "name": "John Doe",
  "country": "country_1",
  "groups": ["group_1", "group_2"]
}
```

You can also embed relationships by using an object rather than IDs:

```json
{
  "id": "user_1",
  "name": "John Doe",
  "country": {
    "id": "country_1",
    "name": "USA"
  },
  "groups": [
    {
      "id": "group_1",
      "name": "Group 1",
      "members": ["user_1", "user_2", "user_3"]
    },
    {
      "id": "group_2",
      "name": "Group 2",
      "members": ["user_1", "user_4", "user_5"]
    }
  ]
}
```

Now let's pretend that our API response for fetching a user is this:

```json
{
  "id": "user_1",
  "display_name": "John Doe",
  "country": "country_1",
  "groups": ["group_1", "group_2"]
}
```

Our model has a `name` attribute, not `display_name`. To map the properties correctly, you can use the [`deserialize`](../api/model.md#deserialize) hook to format it to what the `Store` expects.

[Next: Store »](02-store.md)
