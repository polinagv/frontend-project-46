import { test, expect } from '@jest/globals';
import { gendiff, readFile } from '../src/utils.js';

const file1 = JSON.parse(readFile('file1.json'));
const file2 = JSON.parse(readFile('file2.json'));

test('generateDifferences', () => {
  expect(gendiff(file1, file2)).toMatch(`{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`);
});
