#!/usr/bin/env node

import { Command } from "commander";
import sharp from "sharp";

const program = new Command();

program
  .name("batch-paper")
  .description("CLI tool for batch image processing")
  .version("1.0.0");

program
  .command("hello")
  .description("Display a hello message and sharp version")
  .action(() => {
    console.log("Hello from batch-paper!");
    console.log(`Sharp version: ${sharp.versions.sharp}`);
  });

program.parse();
