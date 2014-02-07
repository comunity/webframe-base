declare class UserProfile {
    public login: string;
    public password: string;
    public detail: any;
    constructor(login: string, password: string, detail: any);
    static make(login: string, password: string): UserProfile;
}
export = UserProfile;
