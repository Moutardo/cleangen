#!/usr/bin/env node

import { program } from "commander";
import { loadCommands } from "../commands";

program
  .version('1.0.0')
  .description('CLEAN ARCHITECTURE GENERATOR');

loadCommands(program);

//// Program parser
program.parse(process.argv);