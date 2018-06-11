angular.module('service.files',[])

.service('files', function($http) {

    function recursiveSearch(files, search_param) {
        return files.filter(function(e, i) {
            if ( e.name != undefined && e.name.toLowerCase().indexOf(search_param.toLowerCase()) > -1 ) {
                return true
            }
            if ( e.type != undefined && e.type.toLowerCase().indexOf(search_param.toLowerCase()) > -1 ) {
                return true
            }
            if ( e.files != undefined ) {
                e.files = recursiveSearch(e.files, search_param)
                if (e.files.length > 0) {
                    e.expanded = true
                    return true
                }
            }
            return false
        })
    }

    this.get = function() {
        return $http.get("files.json").then(function(response) {
            return {
                name: "/",
                type: "folder",
                expanded: true,
                files: response.data
            }
        })
    }

    this.filter = function(search) {
        return $http.get("files.json").then(function(response) {
            return {
                name: "/",
                type: "folder",
                expanded: true,
                files: recursiveSearch(response.data, search)
            }
        })
    }

    return this;
})