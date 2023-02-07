#!/usr/bin/env node
import { Command } from "commander";
import { gendiff } from "../src/utils.js";
import parse from "../src/parsers.js";

const program = new Command();

program
  .name("gendiff")
  .description("Compares two configuration files and shows a difference.")
  .version("0.8.0")
  .option("-f, --format <type>", "output format")
  .argument("<filepath1>")
  .argument("<filepath2>")
  .action((filepath1, filepath2) => {
    const [file1, file2] = parse(filepath1, filepath2);

    console.log(gendiff(file1, file2));
  });

program.parse();
