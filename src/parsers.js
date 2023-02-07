import { load } from "js-yaml";
import { readFileSync } from "fs";
import { extname, resolve } from "path";
import { cwd } from "process";

const getFullPath = (filepath) => resolve(cwd(), filepath);
// console.log(`Current directory: ${cwd()}`);
// возвращает абсолютный путь текущей директории (например, bin)
// /home/yandere_sr/frontend-project-46/bin

const parse = (filepath1, filepath2) => {
  let file1 = readFileSync(getFullPath(filepath1), "utf-8");
  let file2 = readFileSync(getFullPath(filepath2), "utf-8");

  if (extname(filepath1) === ".json") {
    file1 = JSON.parse(file1);
  }

  if (extname(filepath2) === ".json") {
    file2 = JSON.parse(file2);
  }

  if (extname(filepath1) === ".yaml" || extname(filepath1) === ".yml") {
    file1 = load(file1);
  }

  if (extname(filepath2) === ".yaml" || extname(filepath2) === ".yml") {
    file2 = load(file2);
  }

  return [file1, file2];
};

export default parse;
