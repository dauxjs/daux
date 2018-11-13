# Store

The store is used for:

- Holding your app's states as well as doing CRUD operations against them
- Register listeners that gets fired whenever a state changes

## Setup

Using the models from the previous guide:

```javascript
import { Store } from 'daux';

import Country from 'src/models/country';
import Group from 'src/models/group';
import User from 'src/models/user';

const store = new Store({
  country: Country,
  group: Group,
  user: User
});
```

Notice the object keys being passed to the `Store`. These will be used for referencing the model type when doing CRUD operations. More on that in the next guide.

[Next: CRUD Records »](04-crud-records.md)
