function buildRepositoryFromTemplate(className: string, type: string) {
    return `abstract class ${className}sRepository {
    ResultFuture<RemoteServiceResponse<List<${className}>>> get${className}s({RemoteServiceParams? remoteServiceParams});
    ResultFuture<${className}> get${className}ById(${type == "firebase" ? "String" : "int"} id);
    ResultFuture<${className}> add${className}(Add${className}Dto add${className}Dto);
    ResultFuture<${className}> update${className}ById(UpdateDto dto);
    ResultFuture<${className}> delete${className}ById(${type == "firebase" ? "String" : "int"} id);
}`;
}

export function buildRepository(className: string, type: string) {
    return buildRepositoryFromTemplate(className, type);
}