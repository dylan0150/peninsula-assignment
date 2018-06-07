angular.module('ctrl.nav',['filter.state'])

.controller('navCtrl', function($scope, $state) {

    $scope.$on('transition.end', function(event, transition) {
        refresh(transition.to())
    })
    refresh()

    function refresh(to) {
        $scope.states = $state.get().filter(function(state) {
            var sub_states = state.name.split('.')
            return sub_states[0] == "main" && sub_states.length == 2
        }).map(function(state) {
            return {
                name    : state.name,
                active  : to == undefined ? state.name == $state.current.name : state.name == to.name,
                abstract: state.abstract
            }
        })
    }
})