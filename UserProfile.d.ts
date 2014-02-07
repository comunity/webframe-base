declare class UserProfile {
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
export = UserProfile;
