const fs = require('fs');
const path = require('path');

function buildPath(directory: string, subPath: string, file: string, extension: string) {
    return path.resolve(directory, subPath, `${file}.${extension}`);
}

function exist(directory: string, subPath: string, file: string, extension: string) {
    return fs.existsSync(buildPath(directory, subPath, file, extension));
}
function createDir(directory: string, subPath: string) {
    const dirPath = path.resolve(directory, subPath);
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
}

function capitalizeFirstLetter(str: string) {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
}
function buildClassName(entity: string) {
    return entity.split("_").map(e => capitalizeFirstLetter(e)).join("");
}
function getFileContent(directory: string, entity: string, extension: string) {
    return fs.readFileSync(buildPath(directory, "domain/entities", entity, extension), 'utf8');
}

function saveFile(directory: string, subPath: string, file: string, extension: string, content: string) {
    createDir(directory, subPath);
    return fs.writeFileSync(buildPath(directory, subPath, file, extension), content, 'utf8');
}

export { exist, getFileContent, buildClassName, saveFile };