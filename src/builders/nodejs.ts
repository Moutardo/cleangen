import inquirer from "inquirer";
import * as file from "../utils/files";
import { buildDataSource, buildModel, buildRepository, buildRepositoryImplentation, buildUsecases } from '../templates/nodejs';

function getAttribsStr(content: string, className: string) {
    let contentSplited: any = content.replace(/ /g, '');
    contentSplited = contentSplited.replace(/\r?\n|\r/g, '');
    contentSplited = contentSplited.split(`${className}{`);
    let attribsStr = "";
    if (contentSplited.length == 2) {
        contentSplited = contentSplited[1].split("}");
    }
    if (contentSplited.length == 2) {
        attribsStr = contentSplited[0];
    }
    return attribsStr;
}

function attribsStrToList(attribsStr: string) {
    return attribsStr.split(";").filter(attrib => attrib != "");
}

export async function nodejs_builder(directory: string, entity: string, type: string) {
    if (file.exist(directory, "domain/entities", entity, "ts")) {
        console.log("getting entity content");
        const className = file.buildClassName(entity);
        const attribsStr = getAttribsStr(file.getFileContent(directory, entity, "ts"), className);
        const attribsList = attribsStrToList(attribsStr);

        const answers = await inquirer.prompt([
            {
                type: 'checkbox',
                name: 'fileTypes',
                message: 'Select file types :',
                choices: ['model', 'repository', 'repository implementation', 'data source', 'usecases']
            }
        ]);

        console.log("generating files");

        if (answers.fileTypes.includes("model")) {
            const model = buildModel(className, attribsList);
            file.saveFile(directory, "data/models", `${entity}_model`, "ts", model);
            console.log("model generated");
        }

        if (answers.fileTypes.includes("repository")) {
            const repository = buildRepository(className, type);
            file.saveFile(directory, "domain/repositories", `${directory}_repository`, "ts", repository);
            console.log("repository generated");
        }

        if (answers.fileTypes.includes("repository implementation")) {
            const repositoryImplementation = buildRepositoryImplentation(className, type);
            file.saveFile(directory, "data/repositories", `${directory}_repository_implementation`, "ts", repositoryImplementation);
            console.log("repository_implementation generated");
        }

        if (answers.fileTypes.includes("data source")) {
            if (type == "prisma") {
                const data_source = buildDataSource.buildDataSourceForPrisma(className);
                file.saveFile(directory, "data/data_sources", `${directory}_data_source`, "ts", data_source);
                console.log("data_source with prisma generated");
            }
            else if (type == "firebase") {
                const data_source = buildDataSource.buildDataSourceForFirebase(className);
                file.saveFile(directory, "data/data_sources", `${directory}_data_source`, "ts", data_source);
                console.log("data_source with firebase generated");
            }
        }

        if (answers.fileTypes.includes("usecases")) {
            const getCase = buildUsecases.buildUsecasesGet(className, type);
            file.saveFile(directory, "domain/usecases", `get_${entity}s`, "ts", getCase);
            const getByIdCase = buildUsecases.buildUsecasesGetById(className, type);
            file.saveFile(directory, "domain/usecases", `get_${entity}_by_id`, "ts", getByIdCase);
            const addCase = buildUsecases.buildUsecasesAdd(className, type);
            file.saveFile(directory, "domain/usecases", `add_${entity}`, "ts", addCase);
            const updateCase = buildUsecases.buildUsecasesUpdateById(className, type);
            file.saveFile(directory, "domain/usecases", `update_${entity}_by_id`, "ts", updateCase);
            const deleteByIdCase = buildUsecases.buildUsecasesDeleteById(className, type);
            file.saveFile(directory, "domain/usecases", `delete_${entity}_by_id`, "ts", deleteByIdCase);
            console.log("usecases generated");
        }

        console.log("files generated");

    } else {
        console.log(`file not found (${directory}/domain/entities/${entity})`);
    }
}