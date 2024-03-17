function buildRepositoryImplentationFromTemplate(className: string, type: string) {
    return `class ${className}sRepositoryImplementation extends ${className}sRepository {
    final NetworkInfoService networkInfoService;
    final ${className}sRemoteDataSource remoteDataSource;
    final LocalDataService localDataService;

    ${className}sRepositoryImplementation({required this.networkInfoService, required this.remoteDataSource, required this.localDataService});

    @override
    ResultFuture<RemoteServiceResponse<List<${className}>>> get${className}s({RemoteServiceParams? remoteServiceParams}) async {
        try {
            if (await networkInfoService.isConnected()) {
                final res = await remoteDataSource.get${className}s(remoteServiceParams: remoteServiceParams);
                await localDataService.saveData(path, {"data": res.toJson()});
                return Right(res);
              } else {
                final res = await localDataService.getData(path);
                if(res == null) return const Left(ServerFailure(code: 404, message: "Erreur de recuperation des"));
                return Right(RemoteServiceResponse.fromJson(
                    res["data"],
                    (res["data"]["data"] as List).map((one) => ${className}Model.fromJson(one as DataMap)).toList())
                );
            }
        } on ServerException catch (e) {
            return Left(ServerFailure(code: e.code, message: e.message));
        }
    }
    @override
    ResultFuture<${className}> get${className}ById(${type == "firebase" ? "String" : "int"} id) async {
        try {
            final res = await remoteDataSource.get${className}ById(id);
            return Right(res);
        } on ServerException catch (e) {
            return Left(ServerFailure(code: e.code, message: e.message));
        }
    }
    @override
    ResultFuture<${className}> add${className}(Add${className}Dto add${className}Dto) async {
        try {
            final res = await remoteDataSource.add${className}(add${className}Dto);
            return Right(res);
        } on ServerException catch (e) {
            return Left(ServerFailure(code: e.code, message: e.message));
        }
    }
    @override
    ResultFuture<${className}> update${className}ById(UpdateDto dto) async {
        try {
            final res = await remoteDataSource.update${className}ById(dto);
            return Right(res);
        } on ServerException catch (e) {
            return Left(ServerFailure(code: e.code, message: e.message));
        }
    }
    @override
    ResultFuture<${className}> delete${className}ById(${type == "firebase" ? "String" : "int"} id) async {
        try {
            final res = await remoteDataSource.delete${className}ById(id);
            return Right(res);
        } on ServerException catch (e) {
            return Left(ServerFailure(code: e.code, message: e.message));
        }
    }
}`;
}

export function buildRepositoryImplentation(className: string, type: string) {
    return buildRepositoryImplentationFromTemplate(className, type);
}