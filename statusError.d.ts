declare function statusError(statusCode: number, errFun: () => Error, method?: string, url?: string): Error;
export = statusError;
