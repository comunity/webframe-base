class UserProfile {
    constructor(public login: string, public password: string, public detail) {
    }
    static make(login: string, password: string): UserProfile {
        return new UserProfile(login, password, null)
    }
}

export = UserProfile 