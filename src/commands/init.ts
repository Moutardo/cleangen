import { Command } from "commander";
import inquirer from "inquirer";
import { init_core } from "../builders/init";

// Consts
const targets = ['dart', 'nodejs'];
// Confirm
async function askForTargetConfirmation(target: string) {
    if (target === null || target === "") console.log("can't confirm, please provide all options");
    else return (await inquirer.prompt({
        type: 'confirm',
        name: 'confirm',
        message: `The clean architecture core will be create`,
    })).confirm;
}
// Options
async function askTargetOption(options: { target: string }): Promise<{ target: string }> {
    let { target } = options;
    let nTarget;
    if (!target || !targets.includes(target)) {
        nTarget = await inquirer.prompt({
            type: 'list',
            name: 'target',
            message: 'Choose your target:',
            choices: targets,
        });
    }
    return {
        "target": target ?? nTarget!.target,
    };
}

export const init = new Command("init")
    .description('Init the clean architecture core')
    .option('-t, --target <target>', 'Target')
    .action(async (options: { target: string }) => {
        if (Object.keys(options).length === 1) {
            var { target } = options;
            if (!targets.includes(target)) var { target } = await askTargetOption(options);
            if (await askForTargetConfirmation(target)) init_core(target);
        } else {
            const { target } = await askTargetOption(options);
            if (await askForTargetConfirmation(target)) init_core(target);
        }
    });