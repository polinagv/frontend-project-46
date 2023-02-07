import { test, expect } from "@jest/globals";
import { load } from "js-yaml";
import { gendiff, readFile } from "../src/utils.js";

test("generateDifferencesJson", () => {
  const file1 = JSON.parse(readFile("file1.json"));
  const file2 = JSON.parse(readFile("file2.json"));

  expect(gendiff(file1, file2)).toMatch(`{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`);
});

test("generateDifferencesYaml", () => {
  const file1 = load(readFile("file1.yml"));
  const file2 = load(readFile("file2.yml"));

  expect(gendiff(file1, file2)).toMatch(`{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`);
});
