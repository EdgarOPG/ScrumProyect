angular.module('todoAp', [])
  .controller('CtrlSkills', function($scope, $http) {
  $scope.skills = [{description: 'Ser Super Heroico con AngularJS', ranking: 'Junior'},
                   {description: 'Crear una ap con angular', ranking: 'Master'}];

  $scope.addSkill = function() {
    $scope.skills.push({description: $scope.skillDescription, ranking: 'Junior'});
    $scope.skillDescription = '';
  }

  $scope.postSkills = function() {
    $http.post('/users/skills', {skills: $scope.skills})
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
