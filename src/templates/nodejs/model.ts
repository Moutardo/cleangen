function buildModelFromTemplateConstructor(attribsList: string[]) {
    return attribsList.map(attrib => attrib.split(":")[0])
        .map((attrib, i) => {
            if (i == attribsList.length - 1) return `this.${attrib} = ${attrib};`;
            return `this.${attrib} = ${attrib};\n\t\t`;
        }).join("");
}
function buildModelFromTemplate(className: string, attribsList: string[]) {
    return `export class ${className}Model implements ${className} {
    ${attribsList.join(";\n\t")};

    constructor(${attribsList.join(", ")}) {
        ${buildModelFromTemplateConstructor(attribsList)}
    }
}`;
}

export function buildModel(className: string, attribsList: string[]) {
    return buildModelFromTemplate(className, attribsList);
}