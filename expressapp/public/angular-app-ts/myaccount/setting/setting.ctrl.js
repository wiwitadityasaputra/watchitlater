var angularApp;
(function (angularApp) {
    "use strict";
    var SettingCtrl = (function () {
        function SettingCtrl($state, myAccountSrvc) {
            var _this = this;
            this.$state = $state;
            this.myAccountSrvc = myAccountSrvc;
            this.activate = function () {
                _this.loggedUser = _this.myAccountSrvc.getLoggedUser();
            };
            myAccountSrvc.hasLoggedUser()
                .then(this.activate)
                .catch(function () {
                $state.go('home');
            });
        }
        SettingCtrl.$inject = ['$state', 'myAccountSrvc'];
        return SettingCtrl;
    }());
    angular
        .module('app')
        .controller('SettingCtrl', SettingCtrl);
})(angularApp || (angularApp = {}));