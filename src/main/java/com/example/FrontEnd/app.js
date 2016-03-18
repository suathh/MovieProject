/**
 * Created by suat on 12.03.2016.
 */
var myApp=angular.module('myApp',[]);

//filmEkle sayfası controller'ı
//todo Dynamic url for angular
myApp.controller('addMovieController',function($scope,$http,$log){
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
})
//filmListele sayfası controller'ı
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
    //moviePage sayfasına yönlendirirken satırdan film bilgilerini aktarıyor
    $scope.editData = {};
    $scope.store=function(data){

            localStorage.setItem("movieName", data.name);
            localStorage.setItem("movieType", data.type);
            localStorage.setItem("movieYear", data.year);
            console.log("Depolandı");

    }
    $scope.getMovie=function(){
        console.log("Yüklendi");
        $scope.name=localStorage.getItem("movieName");
        $scope.mType=localStorage.getItem("movieType");
        $scope.mYear=localStorage.getItem("movieYear");
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

    $scope.dislike=function(value){
        var name = value.name;

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
    $scope.getLike=function(value){
        var name = value.name;
        console.log(name);
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
                url: 'http://localhost:8080/likes/get-likes/movieId='+$scope.mId+''
            }).then(function successCallback(response) {
                //console.log("Your like successfuly saved.")
                $scope.likes=response;
            }, function errorCallback(response) {
                console.log(response);
            });
        }, function errorCallback(response) {
            console.log(response);
        });
    }

})