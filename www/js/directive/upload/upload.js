angular.module('dir.upload',['angular-plupload'])

.directive('dirUpload', function(){
    return {
        restrict: 'E',
        templateUrl: "/js/directive/upload/upload.html",
        link: function(scope, element, attributes, controller) {
            if ( attributes.completedLabel ) {
                scope.completedLabel = attributes.completedLabel
            }
            if ( attributes.label ) {
                scope.label = attributes.label
            }
            if ( attributes.uploadId ) {
                scope.uploadId = attributes.uploadId
            }
        },
        controller: function($scope) {

            $scope.loading = false
            $scope.url = '/api/upload';
            $scope.upload = {}

            $scope.options = {
                runtimes : 'html5',
                multi_selection: false,
                max_file_size: '500mb',
                chunk_size: '512k',
                filters:[] //TODO scope variable req to select externsions allowed?
            }

            $scope.callbacks = {
                filesAdded: function(uploader, files) {
                    $scope.loading = true
                    $scope.upload = files[0]
                    uploader.start();
                    $scope.$emit("dir.upload.start", files[0], $scope.uploadId)
                },
                uploadProgress: function(uploader, file) {
                    $scope.upload.percent = file.percent
                    $scope.$emit("dir.upload.progress", file, $scope.uploadId)
                },
                fileUploaded: function(uploader, file, response) {
                    $scope.upload.complete = true
                    $scope.loading = false
                    $scope.$emit("dir.upload.success", JSON.parse(response.response), $scope.uploadId)
                    $scope.$emit("dir.upload.complete", file, $scope.uploadId)
                },
                error: function(uploader, error) {
                    alert(error.message+" "+error.status)
                    $scope.upload.error = true
                    $scope.loading = false
                    $scope.$emit("dir.upload.error", error, $scope.uploadId)
                    $scope.$emit("dir.upload.complete", error.file, $scope.uploadId)
                }
            }

        }
    }
})