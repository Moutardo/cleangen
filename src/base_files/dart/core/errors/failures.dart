import 'package:equatable/equatable.dart';

abstract class Failure extends Equatable {
  final int code;
  final String message;

  const Failure({required this.code, required this.message});

  @override
  List<Object> get props => [code, message];
}

class ServerFailure extends Failure {
  const ServerFailure({required super.code, required super.message});
}

class CacheFailure extends Failure {
  const CacheFailure({required super.code, required super.message});
}
