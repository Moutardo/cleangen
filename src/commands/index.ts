import { Command } from "commander";
import { init } from "./init";
import { nodejs } from "./nodejs";
import { dart } from "./dart";

export function loadCommands(program: Command) {
    program.addCommand(init);
    program.addCommand(nodejs);
    program.addCommand(dart);
}