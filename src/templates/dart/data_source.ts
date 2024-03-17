function buildDataSourceForHttpFromTemplate(className: string) {
    return `export interface ${className}sDataSource {
    get${className}s(params?: ApiParams): Promise<ApiResponse<${className}Model[]>>;
    get${className}ById(id: number): Promise<ApiResponse<${className}Model | null>>;
    add${className}(add${className}Dto: Add${className}Dto): Promise<ApiResponse<${className}Model>>;
    delete${className}ById(id: number): Promise<ApiResponse<${className}Model>>;
}

@injectable()
export class ${className}sDataSourceImplementation implements ${className}sDataSource {
    private prima: HttpClient<Http.HttpClientOptions, never, DefaultArgs>;

    constructor(@inject("DatabaseService") prima: HttpClient<Http.HttpClientOptions, never, DefaultArgs>) {
        this.prima = prima;
    }
    async get${className}s(params?: ApiParams): Promise<ApiResponse<${className}Model[]>> {
        try {
            const count = await this.prima.${className}s.count({});
            let d_per_page = params?.per_page ?? 50;
            if (params?.per_page == -1) {
                d_per_page = count
            }

            const data = await this.prima.${className}s.findMany({
                skip: ((params?.page ?? 1) - 1) * (params?.per_page ?? 50),
                take: d_per_page,
                include: {
                    role: true
                }
            });
            return { data, total: count, page: params?.page ?? 1, per_page: params?.per_page ?? 50, pages: Math.ceil((count / (params?.per_page ?? 50))) };
        } catch (e) {
            throw new ServiceError(500, "${className}s not found");
        }
    }
    async get${className}ById(id: number): Promise<ApiResponse<${className}Model | null>> {
        try {
            const data = await this.prima.${className}s.findUnique({
                where: { id },
                include: {
                    role: true
                }
            });
            return { data };
        } catch (e) {
            throw new ServiceError(500, "${className} not found");
        }
    }
    async add${className}(add${className}Dto: Add${className}Dto): Promise<ApiResponse<${className}Model>> {
        try {
            const data = await this.prima.${className}s.create({
                data: add${className}Dto,
                include: {
                    role: true
                }
            });
            return { data };
        } catch (e) {
            throw new ServiceError(500, "${className} not added");
        }
    }
    async delete${className}ById(id: number): Promise<ApiResponse<${className}Model>> {
        try {
            const data = await this.prima.${className}s.delete({
                where: { id },
                include: {
                    role: true
                }
            });

            if (data === null) throw new ServiceError(404, "${className} not deleted");

            return { data };
        } catch (e) {
            throw new ServiceError(500, "${className} not deleted");
        }
    }
}
`;
}
function buildDataSourceForHttp(className: string) {
    return buildDataSourceForHttpFromTemplate(className);
}

function lowercaseFirstLetter(str: string) {
    return str.charAt(0).toLowerCase() + str.slice(1);
}
function buildDataSourceForFirebaseFromTemplate(className: string) {
    return `abstract class ${className}sRemoteDataSource {
    Future<RemoteServiceResponse<List<${className}Model>>> get${className}s({RemoteServiceParams? remoteServiceParams});
    Future<${className}Model> get${className}ById(String id);
    Future<${className}Model> add${className}(Add${className}Dto add${className}Dto);
    Future<${className}Model> update${className}ById(UpdateDto dto);
    Future<${className}Model> delete${className}ById(String id);
}

const get${className}sFunctionName = "get${className}s";
const path = "${lowercaseFirstLetter(className)}s";

class ${className}sRemoteDataSourceImplementation implements ${className}sRemoteDataSource {
    final RemoteDataService remoteDataService;
    final FirebaseCloudFunctionService firebaseCloudFunctionService;

    ${className}sRemoteDataSourceImplementation({required this.remoteDataService, required this.firebaseCloudFunctionService});

    @override
    Future<RemoteServiceResponse<List<${className}Model>>> get${className}s({RemoteServiceParams? remoteServiceParams}) async {
        try {
            final dynamic res = jsonDecode(await firebaseCloudFunctionService
                .httpsCallable(get${className}sFunctionName, remoteServiceParams?.toJson()));
      
            if (res["data"] != null) {
              return RemoteServiceResponse
                .fromJson(res, (res["data"] as List).map((one) => ${className}Model.fromJson(one as DataMap)).toList());
            }
            throw const ServerException(code: 500, message: "Erreur de recuperation des");
        } on ServerException {
            rethrow;
        }
    }
    @override
    Future<${className}Model> get${className}ById(String id) async {
        try {
            final res = await remoteDataService.get("$path/$id");
            return ${className}Model.fromJson(res);
        } catch (e) {
            throw const ServerException(code: 500, message: "Erreur de recuperation d");
        }
    }
    @override
    Future<${className}Model> add${className}(Add${className}Dto add${className}Dto) async {
        try {
            final res = await remoteDataService.post(path, body: add${className}Dto.toJson());
            return ${className}Model.fromJson(res);
        } catch (e) {
            throw const ServerException(code: 500, message: "Erreur d'ajout d");
        }
    }
    @override
    Future<${className}Model> update${className}ById(UpdateDto dto) async {
        try {
            final res = await remoteDataService.put("$path/\${dto.id}", body: dto.data);
            return ${className}Model.fromJson(res);
        } catch (e) {
            throw const ServerException(code: 500, message: "Erreur de mise a jour d");
        }
    }
    @override
    Future<${className}Model> delete${className}ById(String id) async {
        try {
            final res = await remoteDataService.delete("$path/$id");
            return ${className}Model.fromJson(res);
        } catch (e) {
            throw const ServerException(code: 500, message: "Erreur de suppression d");
        }
    }
}`;
}
function buildDataSourceForFirebase(className: string) {
    return buildDataSourceForFirebaseFromTemplate(className);
}

export const buildDataSource = { buildDataSourceForHttp, buildDataSourceForFirebase };