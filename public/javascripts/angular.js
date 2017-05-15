angular.module('todoAp', [])
  .controller('CtrlSkills', function($scope, $http) {
  $scope.skills = [];

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

  $http.get("/users/me")
    .then(function(user){
      $scope.skills = user.data.skills;
  });

});
