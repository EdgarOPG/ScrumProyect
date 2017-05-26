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
      .then(function(){
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
  $scope.project = {};
  $scope.users = [];
  $scope.collaborators = [];

  function getIds(){
    let collaborators = [];
    for(let i in $scope.collaborators){
      collaborators.push($scope.collaborators[i]._id);
    }
    return collaborators;
  };

  //Esta funcion compara los dos arrays en busca de usuarios ya colaborando en este proyecto
//y de ser asi los remueve para evitar duplicidad
  function  removeColFromUsers(){

    for (var i = $scope.collaborators.length - 1; i >= 0; i--) {
      for (var j = $scope.users.length - 1; j >= 0; j--) {
          if ($scope.collaborators[i]._id==$scope.users[j]._id) {
            $scope.users.splice(j, 1);
          }
        }  
    } 


  };

  $scope.addCollaborator = function(user, index) {
     $scope.collaborators.push(user);
    $scope.users.splice(index, 1);
    $scope.postCollaborators();
  }

  $scope.removeCollaborator = function(collaborator, index){
    $scope.collaborators.splice(index, 1);
    $scope.users.push(collaborator);
    $scope.postCollaborators();
  }

  $scope.postCollaborators = function() {
    let collaborators = [];
    collaborators = getIds();
    $http.post('/projects/collaborators', {collaborators: collaborators})
      .then(function(){
    });
  }

  $http.get('/api/users')
    .then(function(users){
      $scope.users = users.data;
      console.log($scope.users);
  });

  $http.get('/api/projects/current')
    .then(function(project){
      $scope.project = project.data;
      $scope.collaborators = $scope.project.equipoDesarrollo;
      removeColFromUsers();
     console.log($scope.project);
     
  });

    removeColFromUsers();

});

app.controller('CtrlProjects', function($scope, $http){

  $scope.userStories = [];

  $http.get('/api/userStories/current')
    .then(function(userStories){
      $scope.userStories = userStories.data;
     console.log($scope.userStories);
  });

  $http.get('/api/projects/current')
    .then(function(project){
      $scope.project = project.data;
      $scope.collaborators = $scope.project.equipoDesarrollo;
     console.log($scope.project);
     removeColFromUsers();
  });

  $scope.deleteUserStory = function(Id) {
    let url = '/userStories/' + Id;
    $http.delete(url)
      .then(function(){
    });
  }

});
