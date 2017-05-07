angular.module('todoAp', [])
  .controller('ControladorTareas', function($scope, $http) {
  $scope.tareas = [{texto: 'Ser Super Heroico con AngularJS', ranking: 'Junior'},
                   {texto: 'Crear una ap con angular', ranking: 'Master'}];

  $scope.addSkill = function() {
    console.log('asadsa')
    $scope.tareas.push({texto: $scope.skillDescription, ranking: 'Junior'});
    $scope.skillDescription = '';
  }

  $scope.postSkills = function() {
    $http.post('/users/', {params: {name: 'ABCXYZ'}})
      .success(
          function(success){
              console.log(success)
          })
      .error(
          function(error){
              console.log(error)
          });

  }
});
