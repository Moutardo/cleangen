function lowercaseFirstLetter(str: string) {
    return str.charAt(0).toLowerCase() + str.slice(1);
}
function buildRepositoryImplentationFromTemplate(className: string, type: string) {
    return `@injectable()
export class ${className}sRepositoryImplementation implements ${className}sRepository {
    ${lowercaseFirstLetter(className)}sDataSource: ${className}sDataSource;

    constructor(@inject("${className}sDataSource") ${lowercaseFirstLetter(className)}sDataSource: ${className}sDataSource) {
        this.${lowercaseFirstLetter(className)}sDataSource = ${lowercaseFirstLetter(className)}sDataSource;
    }

    async get${className}s(params?: ApiParams): ResultFuture<ApiResponse<${className}[]>> {
        try {
            return await this.${lowercaseFirstLetter(className)}sDataSource.get${className}s(params);
        } catch (e) {
            let code = 500;
            let message = "Unknown error";
            if (e instanceof ServiceError) {
                code = e.code;
                message = e.message;
            }
            return new ServiceFailure(code, message);
        }
    }
    async get${className}ById(id: ${type == "firebase" ? "string" : "number"}): ResultFuture<ApiResponse<${className} | null>> {
        try {
            return await this.${lowercaseFirstLetter(className)}sDataSource.get${className}ById(id);
        } catch (e) {
            let code = 500;
            let message = "Unknown error";
            if (e instanceof ServiceError) {
                code = e.code;
                message = e.message;
            }
            return new ServiceFailure(code, message);
        }
    }
    async add${className}(add${className}Dto: Add${className}Dto): ResultFuture<ApiResponse<${className}>> {
        try {
            return await this.${lowercaseFirstLetter(className)}sDataSource.add${className}(add${className}Dto);
        } catch (e) {
            let code = 500;
            let message = "Unknown error";
            if (e instanceof ServiceError) {
                code = e.code;
                message = e.message;
            }
            return new ServiceFailure(code, message);
        }
    }
    async update${className}ById(dto: UpdateDto<Partial<${className}>>): ResultFuture<ApiResponse<${className}>> {
        try {
            return await this.${lowercaseFirstLetter(className)}sDataSource.update${className}ById(dto);
        } catch (e) {
            let code = 500;
            let message = "Unknown error";
            if (e instanceof ServiceError) {
                code = e.code;
                message = e.message;
            }
            return new ServiceFailure(code, message);
        }
    }
    async delete${className}ById(id: ${type == "firebase" ? "string" : "number"}): ResultFuture<ApiResponse<${className}>> {
        try {
            return await this.${lowercaseFirstLetter(className)}sDataSource.delete${className}ById(id);
        } catch (e) {
            let code = 500;
            let message = "Unknown error";
            if (e instanceof ServiceError) {
                code = e.code;
                message = e.message;
            }
            return new ServiceFailure(code, message);
        }
    }
}`;
}

export function buildRepositoryImplentation(className: string, type: string) {
    return buildRepositoryImplentationFromTemplate(className, type);
}