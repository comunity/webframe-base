class UserProfile {
    constructor(public login: string, public password: string, public phoneNational: string, public phoneCountry: string, public email: string, public accountName: string, public detail) {
    }
    static make(login: string, password: string): UserProfile {
        return new UserProfile(login, password, null, null, null, null, null)
    }
}

export = UserProfile 