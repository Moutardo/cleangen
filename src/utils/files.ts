import { existsSync, mkdirSync, readFileSync, writeFileSync, cpSync } from "fs";
import { resolve } from "path";

function resolvePath(directory: string, subPath: string, file: string, extension: string) {
    return resolve(directory, subPath, `${file}.${extension}`);
}

function buildPath(paths: string[]) {
    return resolve(...paths);
}

function exist(directory: string, subPath: string, file: string, extension: string) {
    return existsSync(resolvePath(directory, subPath, file, extension));
}
function createDir(directory: string, subPath: string) {
    const dirPath = resolve(directory, subPath);
    if (!existsSync(dirPath)) {
        mkdirSync(dirPath, { recursive: true });
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
    return readFileSync(resolvePath(directory, "domain/entities", entity, extension), 'utf8');
}

function saveFile(directory: string, subPath: string, file: string, extension: string, content: string) {
    createDir(directory, subPath);
    return writeFileSync(resolvePath(directory, subPath, file, extension), content, 'utf8');
}

function copyDir(src: string, dest: string, recursive: boolean = false) {
    return cpSync(src, dest, { recursive: recursive });
}

export { buildPath, exist, getFileContent, buildClassName, saveFile, copyDir };