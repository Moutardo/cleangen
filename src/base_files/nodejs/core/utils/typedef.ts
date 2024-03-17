import { Failure } from "../errors/failures";

type Result<Type> = Failure | Type;
export type ResultFuture<Type> = Promise<Result<Type>>;
export type ResultFutureVoid = ResultFuture<void>;

export type DataMap = {
    [key: string]: any;
};

export type ApiResponse<Type> = {
    data?: Type,
    total?: number,
    pages?: number,
    page?: number,
    perPage?: number
    message?: string
};
export interface ApiParams {
    limit?: number,
    page?: number,
    offset?: number,
    perPage?: number,
    search?: string,
}
