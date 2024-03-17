import { ApiResponse, ResultFuture } from "../utils/typedef";

export interface UsecaseWithParams<Type, Params> {
    call(params: Params): ResultFuture<ApiResponse<Type>>;
}