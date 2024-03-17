class Failure {
    code: number;
    message: string;

    constructor(code: number, message: string) {
        this.code = code;
        this.message = message;
    }
}
class ServiceFailure extends Failure {
    code: number;
    message: string;

    constructor(code: number, message: string) {
        super(code, message);

        this.code = code;
        this.message = message;
    }
}

export { Failure, ServiceFailure };