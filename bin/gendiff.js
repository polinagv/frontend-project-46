#!/usr/bin/env node
import { Command } from 'commander';
import { readFileSync } from 'fs';
import { extname, resolve } from 'path';
import { cwd } from 'process';
import _ from 'lodash';

const program = new Command();

const getFullPath = (filepath) => resolve(cwd(), filepath);
// console.log(`Current directory: ${cwd()}`); //возвращает абсолютный путь текущей директории (например, bin)
// /home/yandere_sr/frontend-project-46/bin

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.8.0')
  .option('-f, --format <type>', 'output format')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .action((filepath1, filepath2) => {
    let file1 = readFileSync(getFullPath(filepath1)).toString();
    let file2 = readFileSync(getFullPath(filepath2)).toString();

    if (extname(filepath1) === '.json') {
      file1 = JSON.parse(file1);
    }

    if (extname(filepath2) === '.json') {
      file2 = JSON.parse(file2);
    }
    // console.log(file1, file2);

    const arrOfKeyFile1 = Object.keys(file1);
    const arrOfKeyFile2 = Object.keys(file2);

    const arrOfKeysFile1AndFile2 = _.union(arrOfKeyFile1, arrOfKeyFile2); // ['host', 'timeout', 'follow', 'proxy', 'verbose'];
    // console.log(arrOfKeyFile1, arrOfKeyFile2);

    const sortedArrOfKeys = _.sortBy(arrOfKeysFile1AndFile2);

    let result = '';

    for (let key of sortedArrOfKeys) {
      if (file1[key] === file2[key]) {
        result = result + `\n    ${key}: ${file1[key]}`;
      } else if (file1.hasOwnProperty(key) && file2.hasOwnProperty(key)) {
        result = result + `\n  - ${key}: ${file1[key]} \n  + ${key}: ${file2[key]}`;
      } else if (file1.hasOwnProperty(key)) {
        result = result + `\n  - ${key}: ${file1[key]}`;
      } else if (file2.hasOwnProperty(key)) {
        result = result + `\n  + ${key}: ${file2[key]}`;
      }
    }
    console.log(`{${result}\n}`);

    // return `{\n${result}\n}`;
  });

program.parse();



