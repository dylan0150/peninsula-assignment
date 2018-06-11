angular.module('ctrl.nav',['filter.state','dir.file'])
/**
 * @listens $scope#modals.file.show
 */
.controller('navCtrl', function($scope, $state) {

    $scope.modals = {}

    $scope.$on('transition.end', function(event, transition) {
        refresh(transition.to())
    })
    refresh()

    $scope.$on('modals.file.show', function(event, file) {
        $scope.modals.file = file
        $('#file.modal').modal('show')
    })
    $scope.closeModal = function(id) {
        $('#'+id+'.modal').modal('hide')
    }

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