import { module, test } from 'qunit';

import getDefaultRecord from '.';
import model from '../test-helpers/model';

module('Unit | Util | get-default-record', () => {
  module('function: getDefaultRecord', () => {
    test('should return the default record for a model', (assert) => {
      assert.expect(1);

      // Act
      const result = getDefaultRecord(model.user);

      // Assert
      assert.deepEqual(result, {
        isAdmin: null,
        name: null,
        blockedUsers: [],
        country: null,
        groups: [],
        posts: [],
        username: null,
      });
    });
  });
});
