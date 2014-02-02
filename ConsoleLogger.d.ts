/// <reference path="../typed/underscore.string/underscore.string.d.ts" />
import Logger = require('./Logger');
declare class ConsoleLogger implements Logger {
    public id(): string;
    public log(type: string, id: string, ctx: any): string;
}
export = ConsoleLogger;
