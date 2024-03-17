function buildDataSourceForPrismaFromTemplate(className: string) {
    return `export interface ${className}sDataSource {
    get${className}s(params?: ApiParams): Promise<ApiResponse<${className}Model[]>>;
    get${className}ById(id: number): Promise<ApiResponse<${className}Model | null>>;
    add${className}(add${className}Dto: Add${className}Dto): Promise<ApiResponse<${className}Model>>;
    update${className}ById(dto: UpdateDto<Partial<${className}Model>>): Promise<ApiResponse<${className}Model>>;
    delete${className}ById(id: number): Promise<ApiResponse<${className}Model>>;
}

@injectable()
export class ${className}sDataSourceImplementation implements ${className}sDataSource {
    private prima: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>;

    constructor(@inject("DatabaseService") prima: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>) {
        this.prima = prima;
    }
    async get${className}s(params?: ApiParams): Promise<ApiResponse<${className}Model[]>> {
        try {
            const count = await this.prima.${className}s.count({});
            let dPerPage = params?.perPage ?? 50;
            if (params?.perPage == -1) {
                dPerPage = count
            }

            const data = await this.prima.${className}s.findMany({
                skip: ((params?.page ?? 1) - 1) * (params?.perPage ?? 50),
                take: dPerPage,
                include: {
                    role: true
                }
            });
            return { data, total: count, page: params?.page ?? 1, perPage: params?.perPage ?? 50, pages: Math.ceil((count / (params?.perPage ?? 50))) };
        } catch (e) {
            throw new ServiceError(500, "Erreur de recuperation d");
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
            throw new ServiceError(500, "Erreur de recuperation d");
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
            throw new ServiceError(500, ""Erreur d'ajout d");
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

            if (data === null) throw new ServiceError(404, "Erreur de suppression d");

            return { data };
        } catch (e) {
            throw new ServiceError(500, "Erreur de suppression d");
        }
    }
}
`;
}
function buildDataSourceForPrisma(className: string) {
    return buildDataSourceForPrismaFromTemplate(className);
}

function lowercaseFirstLetter(str: string) {
    return str.charAt(0).toLowerCase() + str.slice(1);
}
function buildDataSourceForFirebaseFromTemplate(className: string) {
    return `export interface ${className}sDataSource {
    get${className}s(params?: ApiParams): Promise<ApiResponse<${className}Model[]>>;
    get${className}ById(id: string): Promise<ApiResponse<${className}Model | null>>;
    add${className}(add${className}Dto: Add${className}Dto): Promise<ApiResponse<${className}Model>>;
    update${className}ById(dto: UpdateDto<Partial<${className}Model>>): Promise<ApiResponse<${className}Model>>;
    delete${className}ById(id: string): Promise<ApiResponse<${className}Model>>;
}

const path = "${lowercaseFirstLetter(className)}s";

@injectable()
export class ${className}sDataSourceImplementation implements ${className}sDataSource {
    private firestore: Firestore;

    constructor(@inject("DatabaseService") firestore: Firestore) {
        this.firestore = firestore;
    }
    async get${className}s(params?: ApiParams): Promise<ApiResponse<${className}Model[]>> {
        try {
            const count = (await this.firestore.collection(path).count().get()).data().count;

            let dPerPage = params?.perPage ?? 50;
            if (params?.perPage == -1) {
                dPerPage = count;
            }

            const res = await this.firestore.collection(path).limit(dPerPage).orderBy("createdAt", "desc").get();
            const data = res.docs.map(one => ({...one.data(), id: one.id} as ${className}Model));

            return { data, total: count, page: params?.page ?? 1, perPage: params?.perPage ?? 50, pages: Math.ceil((count / (params?.perPage ?? 50))) };
        } catch (e) {
            throw new ServiceError(500, "Erreur de recuperation des");
        }
    }
    async get${className}ById(id: string): Promise<ApiResponse<${className}Model | null>> {
        try {
            const res = await this.firestore.collection(path).doc(id).get();
            const data = res.exists ? { ...res.data(), id: res.id } as ${className}Model : null;
            return { data };
        } catch (e) {
            throw new ServiceError(500, "Erreur de recuperation d");
        }
    }
    async add${className}(add${className}Dto: Add${className}Dto): Promise<ApiResponse<${className}Model>> {
        try {
            const res = await this.firestore.collection(path).add(add${className}Dto);
            const data = { ...(await res.get()).data(), id: res.id } as ${className}Model;
            return { data };
        } catch (e) {
            throw new ServiceError(500, "Erreur d'ajout d");
        }
    }
    async update${className}ById(dto: UpdateDto<Partial<${className}Model>>): Promise<ApiResponse<${className}Model>> {
        try {
            await this.firestore.collection(path).doc(dto.id).update(dto.data);
            const res = await this.firestore.collection(path).doc(dto.id).get();
            const data = { ...res.data(), id: res.id } as ${className}Model;
            return { data };
        } catch (e) {
            throw new ServiceError(500, "Erreur de la mise a jour d");
        }
    }
    async delete${className}ById(id: string): Promise<ApiResponse<${className}Model>> {
        try {
            const data = (await this.get${className}ById(id)).data;
            if (data === null) throw new ServiceError(404, "Erreur de suppression d");

            await this.firestore.collection(path).doc(id).delete();

            return { data };
        } catch (e) {
            throw new ServiceError(500, "Erreur de suppression d");
        }
    }
}`;
}
function buildDataSourceForFirebase(className: string) {
    return buildDataSourceForFirebaseFromTemplate(className);
}

export const buildDataSource = { buildDataSourceForPrisma, buildDataSourceForFirebase };