import inquirer from "inquirer";
import * as file from "../utils/files";
import { buildDataSource, buildModel, buildRepository, buildRepositoryImplentation, buildUsecases } from '../templates/dart';

function getAttribsStr(content: string, className: string) {
    let contentSplited: any = content.replace(/\r?\n|\r/g, '');
    contentSplited = contentSplited.split(`${className} extends Equatable {`);
    if (contentSplited.length == 2) {
        contentSplited = contentSplited[1].split(`const ${className}`);
    }
    let attribsStr = "";
    if (contentSplited.length == 2) {
        attribsStr = contentSplited[0];
    }
    return attribsStr;
}

function attribsStrToList(attribsStr: string) {
    return attribsStr.split(";").map(attrib => attrib.replace("  ", "")).filter(attrib => attrib != "");
}

function attribsListToVarible(attribsList: string[]) {
    return attribsList.map(attrib => attrib.split(" ")[2]);
}

export async function dart_builder(directory: string, entity: string, type: string) {
    if (file.exist(directory, "domain/entities", entity, "dart")) {
        console.log("getting entity content");
        const className = file.buildClassName(entity);
        const attribsStr = getAttribsStr(file.getFileContent(directory, entity, "dart"), className);
        const attribsList = attribsStrToList(attribsStr);
        const attribsVariableList = attribsListToVarible(attribsList);

        const answers = await inquirer.prompt([
            {
                type: 'checkbox',
                name: 'fileTypes',
                message: 'Select file types : ',
                choices: ['model', 'repository', 'repository implementation', 'data source', 'usecases']
            }
        ]);

        console.log("generating files");

        if (answers.fileTypes.includes("model")) {
            const model = buildModel(className, attribsList, attribsVariableList);
            file.saveFile(directory, "data/models", `${entity}_model`, "dart", model);
            console.log("model generated");
        }

        if (answers.fileTypes.includes("repository")) {
            const repository = buildRepository(className, type);
            file.saveFile(directory, "domain/repositories", `${directory}_repository`, "dart", repository);
            console.log("repository generated");
        }

        if (answers.fileTypes.includes("repository implementation")) {
            const repositoryImplementation = buildRepositoryImplentation(className, type);
            file.saveFile(directory, "data/repositories", `${directory}_repository_implementation`, "dart", repositoryImplementation);
            console.log("repository_implementation generated");
        }

        if (answers.fileTypes.includes("data source")) {
            if (type == "http") {
                const data_source = buildDataSource.buildDataSourceForHttp(className);
                file.saveFile(directory, "data/data_sources", `${directory}_data_source`, "dart", data_source);
                console.log("data_source with http generated");
            } else if (type == "firebase") {
                const data_source = buildDataSource.buildDataSourceForFirebase(className);
                file.saveFile(directory, "data/data_sources", `${directory}_remote_data_source`, "dart", data_source);
                console.log("data_source with firebase generated");
            }
        }

        if (answers.fileTypes.includes("usecases")) {
            const getCase = buildUsecases.buildUsecasesGet(className, type);
            file.saveFile(directory, "domain/usecases", `get_${entity}s`, "dart", getCase);
            const getByIdCase = buildUsecases.buildUsecasesGetById(className, type);
            file.saveFile(directory, "domain/usecases", `get_${entity}_by_id`, "dart", getByIdCase);
            const addCase = buildUsecases.buildUsecasesAdd(className, type);
            file.saveFile(directory, "domain/usecases", `add_${entity}`, "dart", addCase);
            const updateCase = buildUsecases.buildUsecasesUpdateById(className, type);
            file.saveFile(directory, "domain/usecases", `update_${entity}_by_id`, "dart", updateCase);
            const deleteByIdCase = buildUsecases.buildUsecasesDeleteById(className, type);
            file.saveFile(directory, "domain/usecases", `delete_${entity}_by_id`, "dart", deleteByIdCase);
            console.log("usecases generated");
        }

        console.log("files generated");

    } else {
        console.log(`file not found (${directory}/domain/entities/${entity})`);
    }
}