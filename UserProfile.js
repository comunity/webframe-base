var UserProfile = (function () {
    function UserProfile(login, password, detail) {
        this.login = login;
        this.password = password;
        this.detail = detail;
    }
    UserProfile.make = function (login, password) {
        return new UserProfile(login, password, null);
    };
    return UserProfile;
})();

module.exports = UserProfile;
