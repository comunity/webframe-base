declare module 'webframe-base' {
    import stream = require('stream')
    import url = require('url');
    import http = require('http');
    export interface Authenticate {
        check(user: string, password: string, req: http.ServerRequest, track: string): Q.Promise<boolean>;
    }
    export class BaseMsg implements Msg {
        public statusCode: number;
        public headers: any;
        constructor(statusCode: number, headers?: any);
        public respond(res: Response): void;
        public setHeaders(res: Response): void;
        public setHeader(res: Response, header: string): boolean;
        public success(): boolean;
        public contentLength(): number;
        public contentType(): string;
        public getBuffer(): Q.Promise<NodeBuffer>;
        public getString(): Q.Promise<string>;
        public getObject(): Q.Promise<any>;
        public check(o: any, errFun: (message: string) => any): void;
    }
    export class BufferMsg extends BaseMsg {
        private _buffer;
        constructor(statusCode: number, headers: any, _buffer: NodeBuffer);
        public respond(res: Response): void;
        public getBuffer(): Q.Promise<NodeBuffer>;
    }
    export class ConsoleLogger implements Logger {
        public id(): string;
        public log(type: string, id: string, ctx: any): string;
    }
    export function error(detail: {}, errFun: () => Error): Error;
    export class Handler {
        public identified(uri: url.Url): any;
        public acceptable(accept: any): boolean;
        public read(uri: url.Url, up: UserProfile, reqId: string, headers: any, maxAge: number): Q.Promise<Msg>;
        public readConditional(uri: url.Url, up: UserProfile, reqId: string, headers: any, maxAge: number): Q.Promise<Msg>;
        public remove(uri: url.Url, up: UserProfile, reqId: string, headers: any): Q.Promise<Msg>;
        public replace(uri: url.Url, up: UserProfile, reqId: string, headers: any, message: Msg): Q.Promise<Msg>;
        public update(uri: url.Url, up: UserProfile, reqId: string, headers: any, message: Msg): Q.Promise<Msg>;
        public exec(uri: url.Url, up: UserProfile, reqId: string, headers: any, message: Msg): Q.Promise<Msg>;
        public methodNotAllowed(): Q.Promise<Msg>;
    }
    export interface Logger {
        log(type: string, requestId: string, start: number[], req, statusCode: number, user: string, headers, err, reqBody, resBody): string;
        id(): string;
    }
    export interface Msg {
        statusCode: number;
        headers: any;
        respond(res: Response): void;
        setHeaders(res: Response): void;
        setHeader(res: Response, header: string): boolean;
        success(): boolean;
        contentLength(): number;
        contentType(): string;
        getBuffer(): Q.Promise<NodeBuffer>;
        getString(): Q.Promise<string>;
        getObject(): Q.Promise<any>;
        check(o: any, errFun: (message: string) => any): void;
    }
    export class ObjectMsg extends BaseMsg {
        private _obj;
        constructor(statusCode: number, headers: any, _obj: any);
        public respond(res: Response): void;
        public getBuffer(): Q.Promise<NodeBuffer>;
        public getString(): Q.Promise<string>;
        public getObject(): Q.Promise<any>;
    }
    export function privatiseHeaders(headers: any): any;
    export class Resource {
        public read(track: string, accept: string): Q.Promise<Msg>;
        public remove(track: string, accept: string): Q.Promise<Msg>;
        public replace(track: string, rep: Msg, accept?: string): Q.Promise<Msg>;
        public update(track: string, rep: Msg, accept?: string): Q.Promise<Msg>;
        public exec(track: string, rep: Msg, accept?: string): Q.Promise<Msg>;
        public methodNotAllowed(): Q.Promise<Msg>;
    }
    export interface ResourceFactory {
        create(url: string, up: UserProfile): Resource;
    }
    export interface Response {
        writeHead(statusCode: number, reasonPhrase?: string, headers?: any): void;
        setHeader(name: string, value: string): void;
        end(data?: any, encoding?: string): void;
        pipefrom<T extends stream.Readable>(source: T): void;
    }
    export class Status {
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
    export function statusError(statusCode: number, errFun: () => Error, method?: string, url?: string): Error;
    export class StringMsg extends BaseMsg {
        private _content;
        constructor(statusCode: number, headers: any, _content: string);
        public respond(res: Response): void;
        public getBuffer(): Q.Promise<NodeBuffer>;
        public getString(): Q.Promise<string>;
        public getObject(): Q.Promise<any>;
    }
    export class UserProfile {
        public login: string;
        public password: string;
        public phoneNational: string;
        public phoneCountry: string;
        public email: string;
        public accountName: string;
        public detail: any;
        constructor(login: string, password: string, phoneNational: string, phoneCountry: string, email: string, accountName: string, detail: any);
        static make(login: string, password: string): UserProfile;
    }
}
