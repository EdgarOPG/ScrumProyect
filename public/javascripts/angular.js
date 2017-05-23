const app = angular.module('scrumApp', []);

app.controller('CtrlSkills', function($scope, $http) {

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

app.controller('CtrlCollaborators', function($scope, $http){

  $scope.users = [];
  $scope.collaborators = [];

  $scope.addCollaborator = function(user) {
    $scope.collaborators.push(user);
    $scope.postCollaborators();
  }

  $scope.removeCollaborator = function(index){
    $scope.collaborators.splice(index, 1);
    $scope.postCollaborators();
  }

  $scope.postCollaborators = function() {
    $http.post('/projects/collaborators', {collaborators: $scope.collaborators})
      .success(
          function(success){
              console.log(success)
          })
      .error(
          function(error){
              console.log(error)
          });
  }

  $http.get("/api/users")
    .then(function(users){
      $scope.users = users.data;
      console.log($scope.users);
  });

});
