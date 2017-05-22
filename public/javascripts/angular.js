angular.module('todoAp', [])
  .controller('CtrlSkills', function($scope, $http) {

  $scope.skills = [];

  $scope.rankings = [{value: 'Junior'},
                    {value: 'Master'},
                    {value: 'Senior'}];

  $scope.addSkill = function() {
    $scope.skills.push({description: $scope.skillDescription, ranking: $scope.rankingSelected.value});
    $scope.skillDescription = '';
    $scope.postSkills();
  }

  $scope.removeSkill = function(index){
    $scope.skills.splice(index, 1);
    $scope.postSkills();
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

  // Esta funcion obtiene los datos del usuario en forma de JSON del endpoint
  //api/users/me, extrae el arreglo de skills y lo asigna a su variable scope

  $http.get("/api/users/me")
    .then(function(user){
      $scope.skills = user.data.skills;
      console.log($scope.skills);
  });

});
