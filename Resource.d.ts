/// <reference path="../typed/q/Q.d.ts" />
import Msg = require('./Msg');
declare class Resource {
    public read(track: string, accept: string): Q.Promise<Msg>;
    public remove(track: string, accept: string): Q.Promise<Msg>;
    public replace(track: string, rep: Msg, accept?: string): Q.Promise<Msg>;
    public update(track: string, rep: Msg, accept?: string): Q.Promise<Msg>;
    public exec(track: string, rep: Msg, accept?: string): Q.Promise<Msg>;
    public methodNotAllowed(): Q.Promise<Msg>;
}
export = Resource;
