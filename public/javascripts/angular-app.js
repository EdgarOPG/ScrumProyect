const app = angular.module('scrumApp', []);

app.config(function($locationProvider) {
  $locationProvider.html5Mode({
                                enabled: true,
                                requireBase: false
                              });
});

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

app.controller('CtrlCollaborators', function($scope, $http, $location){
  let path = $location.path();
  let id = path.split('/')[2]

  $scope.project = {};
  $scope.users = [];
  $scope.collaboratorss = [];

  function getIds(){
    let collaborators = [];
    for(let i in $scope.collaboratorss){
      collaborators.push($scope.collaboratorss[i]._id);
    }
    return collaborators;
  };

  $scope.addCollaborator = function(user) {
    $scope.collaboratorss.push(user);
    $scope.postCollaborators();
  }

  $scope.removeCollaborator = function(index){
    $scope.collaboratorss.splice(index, 1);
    $scope.postCollaborators();
  }

  $scope.postCollaborators = function() {
    let collaborators = [];
    collaborators = getIds();
    $http.post('/projects/collaborators', {collaborators: collaborators})
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

  $http.get("/api/projects/" + id)
    .then(function(project){
      $scope.projects = project.data;
      $scope.collaborators = $scope.project.equipoDesarrollo;
     console.log($scope.project);
  });

});

app.controller('CtrlProjects', function($scope, $http, $location){

  let path = $location.path();
  let id = path.split('/')[2]

  $scope.project = {};
  $scope.users = [];
  $scope.collaborators = [];

  $http.get("/api/projects/" + id)
    .then(function(project){
      $scope.project = project.data;
      $scope.collaborators = $scope.project.equipoDesarrollo;
     console.log($scope.project);
  });
});

