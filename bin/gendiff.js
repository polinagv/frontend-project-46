#!/usr/bin/env node
import { Command } from 'commander';
import { readFileSync } from 'fs';
import { extname, resolve } from 'path';
import { cwd } from 'process';
import gendiff from '../src/utils.js';

const program = new Command();

const getFullPath = (filepath) => resolve(cwd(), filepath);
// console.log(`Current directory: ${cwd()}`);
// возвращает абсолютный путь текущей директории (например, bin)
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

    console.log(gendiff(file1, file2));
  });

program.parse();
