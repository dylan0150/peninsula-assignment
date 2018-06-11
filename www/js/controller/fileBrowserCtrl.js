angular.module('ctrl.fileBrowser',['dir.file'])

.controller('fileBrowserCtrl', function($scope, $q, root_file, files) {

    $scope.root    = root_file
    $scope.order   = "type"
    $scope.reverse = false

    $scope.filter = function() {
        if ( !validateForm($scope.form.filter) ) { return; }
        load()
        files.filter($scope.formdata.filter.search).then(function(response) {
            $scope.root = response
            load(true)
        })
    }
    $scope.filterIcon = function(type) {
        if ( type == $scope.order ) {
            return "fa-caret-square-" + ($scope.reverse ? "up" : "down")
        }
        return "fa-minus-square"
    }
    $scope.sort = function(type) {
        if ( $scope.order == type ) {
            $scope.reverse = !$scope.reverse
        }
        $scope.order = type
    }

    function validateForm(form) {
        if ( form.$invalid ) {
            for ( var errtype in form.$error ) {
                for (var i = 0; i < form.$error[errtype].length; i++) {
                    var field = form.$error[errtype][i];
                    field.$setDirty();
                    field.$setTouched();
                }
            }
            if ( field.$$element[0].scrollIntoView instanceof Function ) { field.$$element[0].scrollIntoView() }
            if ( field.$$element[0].focus          instanceof Function ) { field.$$element[0].focus() }
            return false;
        }
        return true
    }
    function load(done) {
        $scope.loading = !done
    }
})