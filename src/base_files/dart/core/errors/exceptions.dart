import 'package:equatable/equatable.dart';

abstract class CustomException extends Equatable implements Exception {
  final int code;
  final String message;

  const CustomException({required this.code, required this.message});

  @override
  List<Object> get props => [code, message];
}

class ServerException extends CustomException {
  const ServerException({required super.code, required super.message});
}

class CacheException extends CustomException {
  const CacheException({required super.code, required super.message});
}
