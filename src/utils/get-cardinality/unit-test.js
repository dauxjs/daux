import { module, test } from 'qunit';

import getCardinality from '.';
import model from '../test-helpers/model';

module('Unit | Core | get-cardinality', () => {
  module('function: getCardinality', () => {
    test('should return oneToMany when relationship is belongsTo-hasMany', (assert) => {
      assert.expect(1);

      // Act
      const result = getCardinality(model, 'user', 'posts');

      // Assert
      assert.equal(result, 'oneToMany');
    });

    test('should return oneToOne when relationship is belongsTo-belongsTo', (assert) => {
      assert.expect(1);

      // Act
      const result = getCardinality(model, 'user', 'username');

      // Assert
      assert.equal(result, 'oneToOne');
    });

    test('should return oneToNone when relationship is belongsTo-null', (assert) => {
      assert.expect(1);

      // Act
      const result = getCardinality(model, 'user', 'country');

      // Assert
      assert.equal(result, 'oneToNone');
    });

    test('should return manyToMany when relationship is hasMany-hasMany', (assert) => {
      assert.expect(1);

      // Act
      const result = getCardinality(model, 'user', 'groups');

      // Assert
      assert.equal(result, 'manyToMany');
    });

    test('should return manyToNone when relationship is hasMany-null', (assert) => {
      assert.expect(1);

      // Act
      const result = getCardinality(model, 'user', 'blockedUsers');

      // Assert
      assert.equal(result, 'manyToNone');
    });
  });
});
