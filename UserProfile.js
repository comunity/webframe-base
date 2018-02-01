var UserProfile = (function () {
    function UserProfile(login, password, pin, phoneNational, phoneCountry, email, accountName, detail, roles) {
        this.login = login;
        this.password = password;
        this.pin = pin;
        this.phoneNational = phoneNational;
        this.phoneCountry = phoneCountry;
        this.email = email;
        this.accountName = accountName;
        this.detail = detail;
        this.roles = roles;
    }
    UserProfile.make = function (login, password, pin) {
        return new UserProfile(login, password, pin, null, null, null, null, null, null);
    };
    return UserProfile;
})();

module.exports = UserProfile;
