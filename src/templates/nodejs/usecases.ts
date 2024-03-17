function buildUsecasesGetFromTemplate(className: string, type: string) {
    return `@singleton()
export class Get${className}s implements UsecaseWithParams<${className}[], ApiParams | undefined> {
    private repsitory: ${className}sRepository;

    constructor(@inject("${className}sRepository") repsitory: ${className}sRepository) {
        this.repsitory = repsitory;
    }

    async call(params?: ApiParams): ResultFuture<ApiResponse<${className}[]>> {
        return await this.repsitory.get${className}s(params);
    }
}`;
}
function buildUsecasesGet(className: string, type: string) {
    return buildUsecasesGetFromTemplate(className, type);
}

function buildUsecasesGetByIdFromTemplate(className: string, type: string) {
    return `@singleton()
export class Get${className}ById implements UsecaseWithParams<${className} | null, ${type == "firebase" ? "string" : "number"}> {
    private repsitory: ${className}sRepository;

    constructor(@inject("${className}sRepository") repsitory: ${className}sRepository) {
        this.repsitory = repsitory;
    }

    async call(id: ${type == "firebase" ? "string" : "number"}): ResultFuture<ApiResponse<${className} | null>> {
        return await this.repsitory.get${className}ById(id);
    }
}`;
}
function buildUsecasesGetById(className: string, type: string) {
    return buildUsecasesGetByIdFromTemplate(className, type);
}

function buildUsecasesAddFromTemplate(className: string, type: string) {
    return `@singleton()
export class Add${className} implements UsecaseWithParams<${className}, Add${className}Dto> {
    private repsitory: ${className}sRepository;

    constructor(@inject("${className}sRepository") repsitory: ${className}sRepository) {
        this.repsitory = repsitory;
    }

    async call(add${className}Dto: Add${className}Dto): ResultFuture<ApiResponse<${className}>> {
        return await this.repsitory.add${className}(add${className}Dto);
    }
}`;
}
function buildUsecasesAdd(className: string, type: string) {
    return buildUsecasesAddFromTemplate(className, type);
}

function buildUsecasesUpdateByIdFromTemplate(className: string, type: string) {
    return `@singleton()
export class Update${className}ById implements UsecaseWithParams<${className}, UpdateDto<Partial<${className}>>> {
    private repsitory: ${className}sRepository;

    constructor(@inject("${className}sRepository") repsitory: ${className}sRepository) {
        this.repsitory = repsitory;
    }

    async call(dto: UpdateDto<Partial<${className}>>): ResultFuture<ApiResponse<${className}>> {
        return await this.repsitory.update${className}ById(dto);
    }
}`;
}
function buildUsecasesUpdateById(className: string, type: string) {
    return buildUsecasesUpdateByIdFromTemplate(className, type);
}

function buildUsecasesDeleteByIdFromTemplate(className: string, type: string) {
    return `@singleton()
export class Delete${className}ById implements UsecaseWithParams<${className}, ${type == "firebase" ? "string" : "number"}> {
    private repsitory: ${className}sRepository;

    constructor(@inject("${className}sRepository") repsitory: ${className}sRepository) {
        this.repsitory = repsitory;
    }

    async call(id: ${type == "firebase" ? "string" : "number"}): ResultFuture<ApiResponse<${className}>> {
        return await this.repsitory.delete${className}ById(id);
    }
}`;
}
function buildUsecasesDeleteById(className: string, type: string) {
    return buildUsecasesDeleteByIdFromTemplate(className, type);
}

export const buildUsecases = { buildUsecasesGet, buildUsecasesGetById, buildUsecasesAdd, buildUsecasesUpdateById, buildUsecasesDeleteById };