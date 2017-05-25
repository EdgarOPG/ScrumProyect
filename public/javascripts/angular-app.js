const app = angular.module('scrumApp', []);

//configuracion para obtener el path del url como string
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

//Funcion que añade un skill a un usuario
  $scope.addSkill = function() {
    $scope.skills.push({description: $scope.skillDescription, ranking: $scope.rankingSelected.value});
    $scope.skillDescription = '';
    $scope.postSkills();
  }

//Funcion que remueve un skill a un usuario
  $scope.removeSkill = function(index){
    $scope.skills.splice(index, 1);
    $scope.postSkills();
  }

//funcion para dar actualizacion a la base de datos del usuario
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

//Controlador para agregar o quitar colaboradores al proyecto
app.controller('CtrlCollaborators', function($scope, $http, $location){
  let path = $location.path();
  let id = path.split('/')[2]

  $scope.project = {};
  $scope.users = [];
  $scope.collaboratorss = [];
  $scope.me = {};


//obtiene los ids de los colaboradores ya apuntados al proyecto
  function getIds(){
    let collaborators = [];
    for(let i in $scope.collaboratorss){
      collaborators.push($scope.collaboratorss[i]._id);
    }
    return collaborators;
  };

//Esta funcion compara los dos arrays en busca de usuarios ya colaborando en este proyecto
//y de ser asi los remueve para evitar duplicidad
  function  removeColFromUsers(){

    for (var i = $scope.collaboratorss.length - 1; i >= 0; i--) {
      for (var j = $scope.users.length - 1; j >= 0; j--) {
          if ($scope.collaboratorss[i]._id==$scope.users[j]._id) {
            $scope.users.splice(j, 1);
          }
          else if ($scope.me._id==$scope.users[j]._id) {
             $scope.users.splice(j, 1);
          }
        }  
    } 


  };

//quita un usuario del array user y lo añade a colaboradores
  $scope.addCollaborator = function(user, index) {

    $scope.collaboratorss.push(user);
    $scope.users.splice(index, 1);
    $scope.postCollaborators();
  }

//quita un usuario del array colaboradores y lo añade a users
  $scope.removeCollaborator = function(collaborator, index){
    $scope.collaboratorss.splice(index, 1);
    $scope.users.push(collaborator);
    $scope.postCollaborators();
  }

//post para agregar colaboradores a la base de datos
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

    $http.get("/api/users/me")
    .then(function(user){
      $scope.me = user.data;
      console.log($scope.me);
  });



  $http.get("/api/projects/" + id)
    .then(function(project){
      $scope.project = project.data;
      $scope.collaboratorss = $scope.project.equipoDesarrollo;
     console.log($scope.project);
      removeColFromUsers();
  });

  

});

//Controlador para obtener los colaboradores para el view del proyecto
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
     console.log($scope.project.equipoDesarrollo);
  });
});



