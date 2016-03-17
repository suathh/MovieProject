/**
 * Created by suat on 12.03.2016.
 */
var myApp=angular.module('myApp',[]);


myApp.controller('addMovieController',function($scope,$http,$log){//todo Dynamic url for angular
    $scope.filmEkle=function(){
//http://localhost:8080/movies/create?name=[Fight%20Club]&type=[Drama]&year=[1999]
        $http({
            method: 'GET',
            header:'Access-Control-Allow-Origin',
            url: 'http://localhost:8080/movies/create?name='+$scope.name+'&type='+$scope.type+'&year='+$scope.year+''
        }).then(function successCallback(response) {
           console.log("Film ekleme başarılı")
        }, function errorCallback(response) {
           console.log(response);
        });

    }
})

myApp.controller('listMoviesController',function($scope,$http,$log){

    $scope.listMovies=function(){
        $http({
            method: 'GET',
            header:'Access-Control-Allow-Origin: *',
            url: 'http://localhost:8080/movies/getAll'
        }).then(function successCallback(response) {
            $scope.movieList=response.data
        }, function errorCallback(response) {
            console.log(response);
        });

    }
    $scope.editData = {};
    $scope.deneme="asd";
    $scope.store=function(){
        localStorage.setItem("movieName",editData.movie.name);
        localStorage.setItem("movieType",editData.movie.type);
        localStorage.setItem("movieYear",editData.movie.year);
        alert("asd");
    }
    $scope.getMovie=function(){
        $scope.name=localStorage.getItem("movieName");
        $scope.type=localStorage.getItem("movieType");
        $scope.year=localStorage.getItem("movieYear");
    }

})