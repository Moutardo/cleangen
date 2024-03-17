function buildRepositoryFromTemplate(className: string, type: string) {
    return `export interface ${className}sRepository {
    get${className}s(params?: ApiParams): ResultFuture<ApiResponse<${className}[]>>;
    get${className}ById(id: ${type == "firebase" ? "string" : "number"}): ResultFuture<ApiResponse<${className} | null>>;
    add${className}(add${className}Dto: Add${className}Dto): ResultFuture<ApiResponse<${className}>>;
    update${className}ById(dto: UpdateDto<Partial<${className}>>): ResultFuture<ApiResponse<${className}>>;
    delete${className}ById(id: ${type == "firebase" ? "string" : "number"}): ResultFuture<ApiResponse<${className}>>;
}`;
}

export function buildRepository(className: string, type: string) {
    return buildRepositoryFromTemplate(className, type);
}