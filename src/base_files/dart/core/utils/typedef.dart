import 'package:dartz/dartz.dart';

import '../errors/failures.dart';

typedef Result<Type> = Either<Failure, Type>;
typedef ResultFuture<Type> = Future<Result<Type>>;
typedef ResultFutureVoid = ResultFuture<void>;

typedef DataMap = Map<String, dynamic>;

class RemoteServiceResponse<Type> {
  Type data;
  int? total;
  int? pages;
  int? page;
  int? perPage;
  String? message;

  RemoteServiceResponse(
      {required this.data,
      this.total,
      this.pages,
      this.page,
      this.perPage,
      this.message});

  RemoteServiceResponse.fromJson(DataMap json, Type data)
      : this(
          data: data,
          total: json["total"],
          pages: json["pages"],
          page: json["page"],
          perPage: json["perPage"],
          message: json["message"],
        );

  DataMap toJson() => {
        "data": data,
        "total": total,
        "pages": pages,
        "page": page,
        "perPage": perPage,
        "message": message,
      };
}

class RemoteServiceParams {
  int? limit;
  int? page;
  int? offset;
  int? perPage;
  String? search;

  RemoteServiceParams(
      {this.limit, this.page, this.offset, this.perPage, this.search});

  DataMap toJson() => {
        "limit": limit,
        "page": page,
        "offset": offset,
        "perPage": perPage,
        "search": search
      };
}
