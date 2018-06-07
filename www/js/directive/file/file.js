angular.module('dir.file',[])

.directive('dirFile', function() {
    return {
        replace: true,
        restrict: 'E',
        scope: {
            file: '=',
            parentpath: '=',
            order: '=',
            reverse: '='
        },
        templateUrl: "js/directive/file/file.html",
        controller: function($scope) {

            $scope.click = function() {
                if ( $scope.file.files && Array.isArray($scope.file.files) ) {
                    $scope.file.expanded = !$scope.file.expanded
                    return;
                }
                switch ( $scope.file.ext ) {
                    default: alert($scope.file.name)
                }
            }

            $scope.getClass = function() {
                if ( $scope.file.files && Array.isArray($scope.file.files) ) {
                    return $scope.file.expanded ? "fa-folder-open" : "fa-folder";
                }
                switch ( $scope.file.ext ) {
                    default: return "fa-file";
                }
            }

            $scope.$on('dir.upload.start', function(event, file, id) {
                console.debug(file)
            })
            $scope.$on('dir.upload.success', function(event, file_upload_result, id) {
                console.debug(file_upload_result)
            })
        }
    }
})