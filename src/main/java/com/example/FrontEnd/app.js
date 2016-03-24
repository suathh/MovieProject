/**
 * Created by suat on 12.03.2016.
 */
var myApp=angular.module('myApp',['ngRoute']);

myApp.config(function($routeProvider){

    $routeProvider


        .when('/iptal', {
            templateUrl : 'asd/index.html',
            controller  : 'generalController'
        })

        .when('/home', {
            templateUrl : 'home.html',
            controller  : 'generalController'
        })

        .when('/filmEkle', {
            templateUrl : 'filmEkle.html',
            controller  : 'generalController'
        })


        .when('/filmListele', {
            templateUrl : 'filmListele.html',
            controller  : 'generalController'
        })

        .when('/moviePage', {
            templateUrl : 'moviePage.html',
            controller  : 'generalController'
        });

});

//filmEkle sayfası controller'ı
//todo Dynamic url for angular
myApp.controller('generalController',function($scope,$http,$log){
    $scope.filmEkle=function(){
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
//filmListele sayfası controller'ı
    $scope.visible=false;
    $scope.listMovies=function(){
        $http({
            method: 'GET',
            header:'Access-Control-Allow-Origin: *',
            url: 'http://localhost:8080/movies/getAll'
        }).then(function successCallback(response) {
            $scope.movieList=response.data;
            $scope.visible=true;
        }, function errorCallback(response) {
            console.log(response);
        });

    }
    //moviePage sayfasına yönlendirirken satırdan film bilgilerini aktarıyor
    $scope.editData = {};
    $scope.store=function(data){
            localStorage.setItem("movieId",data.id);
            localStorage.setItem("movieName", data.name);
            localStorage.setItem("movieType", data.type);
            localStorage.setItem("movieYear", data.year);
            console.log("Depolandı");

    }
    $scope.editButton=true;
    $scope.saveButton=false;
    $scope.getMovie=function(){
        console.log("Yüklendi");
        $scope.movieId=localStorage.getItem("movieId");
        $scope.name=localStorage.getItem("movieName");
        $scope.mType=localStorage.getItem("movieType");
        $scope.mYear=localStorage.getItem("movieYear");
    }
    $scope.edit=function(){
        $scope.editButton=false;
        $scope.saveButton=true;
    }
    $scope.save=function(){
        $scope.editButton=true;
        $scope.saveButton=false;
        var name=$scope.name.replace(" ","%20");
        $http({
            method: 'GET',
            header:'Access-Control-Allow-Origin: *',
            url: 'http://localhost:8080/movies/update?id='+$scope.movieId+'&name='+name+'&type='+$scope.mType+'&year='+$scope.mYear
        }).then(function successCallback(response) {
            alert("Film başarıyla güncellendi");
        }, function errorCallback(response) {
            console.log(response);
        });
    }
    $scope.delete=function(){
        $http({
            method: 'GET',
            header:'Access-Control-Allow-Origin',
            url: 'http://localhost:8080/movies/delete?id='+$scope.movieId
        }).then(function successCallback(response) {
            alert("Film başarı ile silindi");
        }, function errorCallback(response) {
            console.log(response);
        });
    }
    $scope.topTen=function(){
        $http({
            method: 'GET',
            header:'Access-Control-Allow-Origin: *',
            url: 'http://localhost:8080/movies/get10'
        }).then(function successCallback(response) {
            $scope.topMovies=response.data;
        }, function errorCallback(response) {
            console.log(response);
        });
    }
    $scope.getMovieWithId=function(value){
        console.log(value);
        $http({
            method: 'GET',
            header:'Access-Control-Allow-Origin: *',
            url: 'http://localhost:8080/movies/get-by-id?id='+value
        }).then(function successCallback(response) {
            $scope.movieInfo=response.data;
        }, function errorCallback(response) {
            console.log(response);
        });
    }

    $scope.like=function(value){
        var name = value.name;
    //todo kullanıcı kontrolü eklendikten sonra her kullanıcınını sadece bir kez like'laması sağlanacak.

        $scope.mName=name.replace(" ","%20");
        $http({
            method: 'GET',
            header:'Access-Control-Allow-Origin: *',
            ContentType:'application/text',
            url: 'http://localhost:8080/movies/get-by-name?name='+$scope.mName+''
        }).then(function successCallback(response) {
            $scope.mId=response.data;
            console.log(response.data);
            $http({
                method: 'GET',
                header:'Access-Control-Allow-Origin: *',
                url: 'http://localhost:8080/likes/add?type=up&value=1&movieId='+$scope.mId+'&userId=0'
            }).then(function successCallback(response) {
                console.log("Your like successfuly saved.")
            }, function errorCallback(response) {
                console.log(response);
            });
        }, function errorCallback(response) {
            console.log(response);
        });

    }
//ilk http'e gerek yok üsttekide aynı , alttaki gibi yapılacak
    $scope.dislike=function(value){
        var name = value.name;

        $scope.mName=name.replace(" ","%20");
        $http({
            method: 'GET',
            header:'Access-Control-Allow-Origin: *',
            url: 'http://localhost:8080/movies/get-by-name?name='+$scope.mName+''
        }).then(function successCallback(response) {
            $scope.mId=response.data;
            console.log(response.data);
            $http({
                method: 'GET',
                header:'Access-Control-Allow-Origin: *',
                url: 'http://localhost:8080/likes/add?type=down&value=1&movieId='+$scope.mId+'&userId=0'
            }).then(function successCallback(response) {
                console.log("Your like successfuly saved.")
            }, function errorCallback(response) {
                console.log(response);
            });
        }, function errorCallback(response) {
            console.log(response);
        });
    }
    $scope.likes=[];
    $scope.getLike=function(value){
//todo like'tan sonra auto-refresh eklenecek
        /* var name = value.name;
        $scope.mName=name.replace(/ /g,"%20");
        console.log($scope.mName);
       $http({
            method: 'GET',
            header:'Access-Control-Allow-Origin: *',
            url: 'http://localhost:8080/movies/get-by-name?name='+$scope.mName+''
        }).then(function successCallback(response) {
            $scope.movieId=response.data;

        }, function errorCallback(response) {
            console.log(response);
        });*/
        $http({
            method: 'GET',
            header:'Access-Control-Allow-Origin: *',
            url: 'http://localhost:8080/movies/get-likes?movieId='+value+''
        }).then(function successCallback(response) {
            $scope.likes[value]=response.data;
            console.log($scope.likes);
        }, function errorCallback(response) {
            console.log(response);
        });
    }

})