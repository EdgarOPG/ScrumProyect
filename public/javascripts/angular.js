angular.module('todoAp', [])
  .controller('ControladorTareas', ['$scope',
function($scope) {
  $scope.var = 'ASD';
  $scope.tareas = [{texto: 'Ser Super Heroico con AngularJS', hecho: true},
                   {texto: 'Crear una ap con angular', hecho: true}];

  $scope.addSkill = function() {
    console.log('asadsa')
    $scope.tareas.push({texto: $scope.skillDescription, hecho: false});
    $scope.skillDescription = '';
  }
}]);
