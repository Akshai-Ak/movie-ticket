var routerApp = angular.module("routerApp", ['ui.router']);
routerApp.config(['$stateProvider','$urlRouterProvider',function($stateProvider,  $urlRouterProvider) {
    $urlRouterProvider.otherwise('/login');
    $stateProvider
    .state('login', {
        url: '/login',
        templateUrl:'login.html ',
        controller:'loginController'      
    })
    .state('signup', {
        url: '/signup',
        templateUrl:'signup.html ',
        controller:'signinController' 
    })
    .state('dashboard', {
        url: '/dashboard',
        templateUrl:'dashboard.html ',
        controller:'dashboardController'
    })
    .state('final', {
        url: '/booked',
        templateUrl:'booked.html ',
        controller:'bookedController'
    })

}]);

routerApp.service('cineService',function(){
    this.name=""
    this.loginCred=[
        {
            names:"arjun",
            amount:"5000",
            password:"123",
            email:"arjun123@gmail.com"
        },
        {
            names:"aravind",
            amount:"6000",
            password:"456",
            email:"aravind123@gmail.com"
        },
        {
            names:"suresh",
            amount:"10000",
            password:"789",
            email:"suresh123@gmail.com"
        }
    ]
    this.movie=[
        {
            movieName:"Avengers",
            time:"12.30 pm",
            ticketsAvaible:"5"
        },
        {
            movieName:"Master",
            time:"4.00 am",
            ticketsAvaible:"2"
        },
        {
            movieName:"Doctor",
            time:"10.00 pm",
            ticketsAvaible:"10"
        }
    ]
    this.tickets=[]
    this.watched=[]
    this.time=[]
   
})

routerApp.controller('loginController',['$scope','cineService','$state',function($scope,cineService,$state){
        $scope.login=cineService;
        $scope.submit=function(){
            $scope.loginvalidate=  $scope.login.loginCred.filter((value,index)=>{
                return value.names== $scope.login.name && value.password== $scope.login.password
              })
              if( $scope.loginvalidate.length===0){
                $scope.error = "Incorrect username/password !"; 
              }
              else{
                $state.go("dashboard");
              }
        }
}])
routerApp.controller('signinController',['$scope','cineService', '$state',function($scope,cineService, $state){
    $scope.signin=cineService
    $scope.signinlist={}
    $scope.click=function(){
        $scope.signin.loginCred.push($scope.signinlist)
        $scope.signinlist={}
        $state.go("dashboard");
    }
}])
routerApp.controller('dashboardController',['$scope','cineService','$state',function($scope,cineService,$state){
    // let h=document.getElementById("c")
    $("#moviehide").removeClass("moviehide")
    $scope.cinemaTicket=cineService
    $scope.name=cineService.name;
  
    $scope.cinema=function(){
        $("#moviehide").removeClass("moviehide")
        $("#snack").addClass("moviehide")
        console.log("hi dashboard");
        $scope.valid={check:true}
        $scope.movieList=cineService.movie
    }
    $scope.bevarage=function(){
        $("#snack").removeClass("moviehide")
        $("#moviehide").addClass("moviehide")
        $scope.valids={check:true}
    }
    $scope.clicks=function(value){
        $scope.moviename=value.movieName
        $scope.movieavail=value.ticketsAvaible
        $scope.cinemaTicket.watched=[]
        $scope.fare={checked:true}
    
    }
    $scope.book=function(){
        // $state.go("booked");
        window.location.href="#!/booked"
    }

    $scope.coke=0
    $scope.water=0
    $scope.popcorn=0
    $scope.puff=0
    $scope.q=0

    
}])
routerApp.controller('bookedController',['$scope','$timeout','$state',function ($scope,$timeout,$state) {

    $timeout(function () {
   $state.go("login");
    }, 3000);
    
}])