import { Command } from "commander";
import { nodejs } from "./nodejs";
import { dart } from "./dart";

export function loadCommands(program: Command) {
    program.addCommand(nodejs);
    program.addCommand(dart);
}