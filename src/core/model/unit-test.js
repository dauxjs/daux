import { module, test } from 'qunit';

import Model from '.';

module('Unit | Core | model', () => {
  test('should initialize attributes as an empty array', (assert) => {
    assert.expect(1);

    // Act
    const result = Model.attributes;

    // Assert
    assert.deepEqual(result, []);
  });

  test('should initialize relationship as an empty object', (assert) => {
    assert.expect(1);

    // Act
    const result = Model.relationship;

    // Assert
    assert.deepEqual(result, {});
  });
});
