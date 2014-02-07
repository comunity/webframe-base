var UserProfile = (function () {
    function UserProfile(login, password, phoneNational, phoneCountry, email, accountName, detail) {
        this.login = login;
        this.password = password;
        this.phoneNational = phoneNational;
        this.phoneCountry = phoneCountry;
        this.email = email;
        this.accountName = accountName;
        this.detail = detail;
    }
    UserProfile.make = function (login, password) {
        return new UserProfile(login, password, null, null, null, null, null);
    };
    return UserProfile;
})();

module.exports = UserProfile;
