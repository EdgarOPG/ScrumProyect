angular.module('todoAp', [])
  .controller('CtrlSkills', function($scope, $http) {
  $scope.skills = [{description: 'Ser Super Heroico con AngularJS', ranking: 'Junior'},
                   {description: 'Crear una ap con angular', ranking: 'Master'}];

  $scope.addSkill = function() {
    console.log('asadsa')
    $scope.skills.push({description: $scope.skillDescription, ranking: 'Junior'});
    $scope.skillDescription = '';
  }

  $scope.postSkills = function() {
    alert("Called");
    $http.post('/users/', {params: {name: $scope.skills}})
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
