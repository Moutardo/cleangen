import { Command } from "commander";
import inquirer from "inquirer";
import { dart_builder } from "../builders/dart";


// Consts
const dartTypeChoices = ['http', 'firebase'];
// Confirm
async function askForDartConfirmation(directory: string, entity: string, type: string) {
    if (directory === null || entity === null || type === null) console.log("can't confirm, please provide all options");
    else if (directory === "" || entity === "" || type === "") console.log("can't confirm, please provide all options");
    else return (await inquirer.prompt({
        type: 'confirm',
        name: 'confirm',
        message: `directory : ${directory}, entity : ${entity}, type : ${type} ... is everything correct ? `,
    })).confirm;
}
// Options
async function askForDartOption(options: { directory: string, entity: string, type: string }): Promise<{ directory: string, entity: string, type: string }> {
    let { directory, entity, type } = options;
    let nDirectory, nEntity, nType;
    if (!directory) {
        nDirectory = await inquirer.prompt({
            type: 'input',
            name: 'directory',
            message: 'What is your directory ?',
        });
    }
    if (!entity) {
        nEntity = await inquirer.prompt({
            type: 'input',
            name: 'entity',
            message: 'What is your entity ?',
        });
    }
    if (!type || !dartTypeChoices.includes(type)) {
        nType = await inquirer.prompt({
            type: 'list',
            name: 'type',
            message: 'Choose your database type:',
            choices: dartTypeChoices,
        });
    }
    return {
        "directory": directory ?? nDirectory!.directory,
        "entity": entity ?? nEntity!.entity,
        "type": dartTypeChoices.includes(type) ? type : nType.type,
    };
}

export const dart = new Command("dart")
    .description('Generate files for dart')
    .option('-d, --directory <directory>', 'Directory')
    .option('-e, --entity <entity>', 'Entity')
    .option('-t, --type <type>', 'Datasource type')
    .action(async (options: { directory: string, entity: string, type: string }) => {
        if (Object.keys(options).length === 3) {
            var { directory, entity, type } = options;
            if (!dartTypeChoices.includes(type)) var { directory, entity, type } = await askForDartOption(options);
            if (await askForDartConfirmation(directory, entity, type)) dart_builder(options.directory, options.entity, options.type);
        } else {
            const { directory, entity, type } = await askForDartOption(options);
            if (await askForDartConfirmation(directory, entity, type)) dart_builder(directory, entity, type);
        }
    });;