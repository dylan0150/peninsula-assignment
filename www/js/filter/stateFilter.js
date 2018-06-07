angular.module('filter.state',[])

.filter('custom_state', function() {

    function toTitleCase(str) {
        return str.replace(/\w\S*/g, function(txt){
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }

    return function(state) {
        switch (state.name) {
            case 'main.browse': return "File Browser";
            case 'main.upload': return "File Upload";

            default: return toTitleCase(state.name.split('.').join(' '))
        }
    }
})