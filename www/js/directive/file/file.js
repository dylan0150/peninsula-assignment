angular.module('dir.file',[])
/**
 * Recursive File-Tree Directive
 * 
 * @fires $emit#modals.file.show
 */
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
                $scope.$emit('modals.file.show', $scope.file)
            }

            $scope.getClass = function() {
                if ( $scope.file.files && Array.isArray($scope.file.files) ) {
                    return $scope.file.expanded ? "fa-folder-open" : "fa-folder";
                }
                switch ( $scope.file.type ) {
                    case 'pdf': return 'fa-file-pdf';
                    case 'doc': return 'fa-file-word';
                    case 'csv': return 'fa-file-alt';
                    case 'mov': return 'fa-file-video';
                    default: return "fa-file";
                }
            }
        }
    }
})