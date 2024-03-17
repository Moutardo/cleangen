import '../utils/typedef.dart';

abstract class UsecaseWithOptionalParams<Type, Params> {
  const UsecaseWithOptionalParams();

  ResultFuture<Type> call({Params params});
}
