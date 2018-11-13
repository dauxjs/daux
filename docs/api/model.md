# Daux.Core.Model

The model is a blueprint on how Daux will represent your app's data.

## Static Properties

- [attributes](#attributes)
- [relationship](#relationship)

### attributes

Override this and return the attribute (non-relationship) names for a model

#### Returns:

Array of attribute names

Type: Array

### relationship

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
    groups: {
      type: 'group',
      kind: 'hasMany',
      inverse: 'members',
    }
  };
}
```

#### Returns:

Object containing the relationship descriptors

Type: Object

## Static Functions

- [deserialize](#deserialize)

### deserialize

Override this hook to deserialize your API response if necessary

e.g.

The API returns `display_name` but we want the property to be called `name`:

```json
{
  "id": "1",
  "display_name": "John Doe"
}
```

In our `deserialize` hook, we'll assign the value of `display_name` to `name`:

```javascript
import { Model } from 'daux';

class User extends Model {
  static get attributes() {
    return ['name'];
  }

  deserialize(record) {
    return { name: record.display_name };
  }
}
```

#### Params:

| Name   | Type   | Attributes | Description |
| -------| -------| ---------- | ----------- |
| record | Object |            |             |

#### Returns:

Deserialized record

Type: Object
