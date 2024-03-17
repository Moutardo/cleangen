function buildModelFromTemplate(className: string, attribsList: string[], attribsVariableList: string[]) {
    return `class ${className}Model extends ${className} {
    ${attribsList.join(";\n\t")};

    const ${className}Model({${attribsVariableList.map(attrib => `required this.${attrib}`).join(",\n\t")}}):\tsuper(\n\t\t${attribsVariableList.map(attrib => `${attrib}: ${attrib}`).join(",\n\t\t")});

    ${className}Model.fromJson(DataMap json)
    : this(
        ${attribsVariableList.map(attrib => `${attrib}: json["${attrib}"]`).join(",\n\t\t")});

    DataMap toJson() => {
        ${attribsVariableList.map(attrib => `"${attrib}": ${attrib}`).join(",\n\t\t")}
    }..removeWhere((key, value) => value == null);

    @override
    List<Object?> get props => [${attribsVariableList.join(", ")}];
}`;
}

export function buildModel(className: string, attribsList: string[], attribsVariableList: string[]) {
    return buildModelFromTemplate(className, attribsList, attribsVariableList);
}