angular.module('service.files',[])

.service('files', function($http) {

    this.get = function() {
        return $http.get('/api/files').then(function(response) {
            return response.data
        })
    }

    this.filter = function(form, headers) {
        return $http.post('/api/files',form,headers).then(function(response) {
            return response.data
        }).catch(function(err) {
            if ( err.data == null ) { console.debug("Safely cancelled request") }
        })
    }

    return this;
})