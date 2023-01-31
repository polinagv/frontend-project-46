import { test, expect } from '@jest/globals';
import gendiff from '../src/utils.js';

test('generateDifferences', () => {
  expect(
    gendiff(
      {
        host: 'hexlet.io',
        timeout: 50,
        proxy: '123.234.53.22',
        follow: false,
      },
      {
        timeout: 20,
        verbose: true,
        host: 'hexlet.io',
      },
    ),
  ).toMatch(`{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`);
});
