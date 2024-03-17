import { ApiResponse, ResultFuture } from "../utils/typedef";

export interface UsecaseWithoutParams<Type> {
    call(): ResultFuture<ApiResponse<Type>>;
}