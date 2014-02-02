interface Logger {
    log(type: string, id: string, ctx: any): string;
    id(): string;
}
export = Logger;
