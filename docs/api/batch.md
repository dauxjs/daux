# Daux.Core.Batch

Batch is used for performing multiple state operations in one go. This means that the subscription callbacks will only get triggered once when batching operations.

This class isn't something you'll import yourself. Instead, it'll be exposed through the [`Daux.Core.Store.batch()`](store.md#batch) API.

## Functions

- [commit](#commit)
- [delete](#delete)
- [set](#set)
- [update](#update)

### commit

Commits the batched operations

This accepts the following option:

- `isBackgroundOperation` - When true, this won't execute the listeners for the subscribed callbacks.

#### Params:

| Name   | Type   | Attributes | Description |
| -------| -------| ---------- | ----------- |
| option | Object | optional   |             |

## delete

Batch a delete operation

#### Params:

| Name   | Type   | Attributes | Description |
| -------| -------| ---------- | ----------- |
| type   | string |            |             |
| id     | string |            |             |

## set

Batch a set operation

#### Params:

| Name    | Type   | Attributes | Description |
| --------| ------ | ---------- | ----------- |
| type    | string |            |             |
| record  | Object |            |             |

## update

Batch an update operation

#### Params:

| Name   | Type   | Attributes | Description |
| -------| -------| ---------- | ----------- |
| type   | string |            |             |
| id     | string |            |             |
| record | Object |            |             |
