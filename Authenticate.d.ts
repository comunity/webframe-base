/// <reference path="../typed/q/Q.d.ts" />
interface Authenicate {
    check(user: string, password: string, track: string): Q.Promise<boolean>;
}
export = Authenicate;
