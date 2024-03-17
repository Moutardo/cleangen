function buildUsecasesGetFromTemplate(className: string, type: string) {
    return `class Get${className}s extends UsecaseWithOptionalParams<RemoteServiceResponse<List<${className}>>, RemoteServiceParams?> {
    final ${className}sRepository _repository;

    const Get${className}s(this._repository);
    
    @override
    ResultFuture<RemoteServiceResponse<List<${className}>>> call({RemoteServiceParams? params}) {
        return _repository.get${className}s(remoteServiceParams: params);
    }
}`;
}
function buildUsecasesGet(className: string, type: string) {
    return buildUsecasesGetFromTemplate(className, type);
}

function buildUsecasesGetByIdFromTemplate(className: string, type: string) {
    return `class Get${className}ById extends UsecaseWithParams<${className}, ${type == "firebase" ? "String" : "int"}> {
    final ${className}sRepository _repository;

    const Get${className}ById(this._repository);

    @override
    ResultFuture<${className}> call(${type == "firebase" ? "String" : "int"} id) {
        return _repository.get${className}ById(id);
    }
}`;
}
function buildUsecasesGetById(className: string, type: string) {
    return buildUsecasesGetByIdFromTemplate(className, type);
}

function buildUsecasesAddFromTemplate(className: string, type: string) {
    return `class Add${className} extends UsecaseWithParams<${className}, Add${className}Dto> {
    final ${className}sRepository _repository;

    const Add${className}(this._repository);

    @override
    ResultFuture<${className}> call(Add${className}Dto dto) {
        return _repository.add${className}(dto);
    }
}`;
}
function buildUsecasesAdd(className: string, type: string) {
    return buildUsecasesAddFromTemplate(className, type);
}

function buildUsecasesUpdateByIdFromTemplate(className: string, type: string) {
    return `class Update${className}ById extends UsecaseWithParams<${className}, UpdateDto> {
    final ${className}sRepository _repository;

    const Update${className}ById(this._repository);

    @override
    ResultFuture<${className}> call(UpdateDto dto) {
        return _repository.update${className}ById(dto);
    }
}`;
}
function buildUsecasesUpdateById(className: string, type: string) {
    return buildUsecasesUpdateByIdFromTemplate(className, type);
}

function buildUsecasesDeleteByIdFromTemplate(className: string, type: string) {
    return `class Delete${className}ById extends UsecaseWithParams<${className}, ${type == "firebase" ? "String" : "int"}> {
    final ${className}sRepository _repository;

    const Delete${className}ById(this._repository);

    @override
    ResultFuture<${className}> call(${type == "firebase" ? "String" : "int"} id) {
        return _repository.delete${className}ById(id);
    }
}`;
}
function buildUsecasesDeleteById(className: string, type: string) {
    return buildUsecasesDeleteByIdFromTemplate(className, type);
}

export const buildUsecases = { buildUsecasesGet, buildUsecasesGetById, buildUsecasesAdd, buildUsecasesUpdateById, buildUsecasesDeleteById };