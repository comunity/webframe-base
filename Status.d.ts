declare class Status {
    public statusCode: number;
    public method: string;
    public url: string;
    public headers: {};
    public code: string;
    public message: string;
    public lang: string;
    public innererror: string;
    constructor(statusCode: number, method: string, url: string, headers: {}, code?: string, message?: string, lang?: string, innererror?: string);
    public success(): boolean;
    public error(errFun: (message: string) => any): {};
    public check(errFun: (message: string) => any): void;
    public toString(): string;
    static fromResponse(statusCode: number, method: string, url: string, headers: {}, o: {}): Status;
}
export = Status;
