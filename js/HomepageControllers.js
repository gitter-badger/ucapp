angular.module('starter.homepagecontrollers', [])

.controller('PersonalHomepageCtrl', function($http, $scope,$state,$ionicLoading,PersonalHomepageService,Format) {
    var passPara = {};

    $ionicLoading.show({
        template:'<i class = "ion-load-c"><br></i>Loading...'
    });

    $scope.title = "相册";
    $scope.gobackbutton = "朋友圈";

    $scope.userBasicInfo = PersonalHomepageService.getUserInfo();

    passPara.contactId = $scope.userBasicInfo.user_id;

    PersonalHomepageService.getContentInfo().success(function(data) {
        $scope.userContentInfo = data;
    }).then(function(){
        $ionicLoading.hide();
    });


    $scope.Parafun = function(index){
        passPara.infoId = index;
        return passPara;
    }

    $scope.formatcell = function(num){
         if(num == 1){
            return 1;
          }
          if(num == 2){
            return 2;
          }
          else{
            return 3;
          }
    };

    $scope.infoshowpic = function(type){
        if(type == "img"){
            return true;
        }
        else{
            return false;
        }
    }

    $scope.infoshowword = function(type){
        if(type == "txt"){
            return true;
        }
        else{
            return false;
        }
    }

     $scope.gofriendcircle = function(){
        $state.go("friendcircle");
    }

    $scope.goback = function(contactId){
        $state.go("friendcircle");
    };
})

.controller('PersonalContactHomepageCtrl', function($http, $scope,$state,$ionicLoading,$stateParams,PersonalHomepageService,Format) {
    var num = $stateParams.contactId;

    var passPara = {};


    $scope.gobackbutton = "详细资料";

    $ionicLoading.show({
        template:'<i class = "ion-load-c"><br></i>Loading...'
    });

    PersonalHomepageService.getContactUserInfo(num).success(function(data) {
        $scope.userBasicInfo = data;
        $scope.title = $scope.userBasicInfo.user_name;
        passPara.contactId = $scope.userBasicInfo.user_id;
    });

    PersonalHomepageService.getContentInfo().success(function(data) {
        $scope.userContentInfo = data;
    }).then(function(){
        $ionicLoading.hide();
    });

    $scope.getdate = function(ts){
        var timearray = Format.formattimefriendcircle(ts);
        return timearray.date;
    }

    $scope.getmonth = function(ts){
        var timearray = Format.formattimefriendcircle(ts);
        return timearray.month;
    }

    $scope.Parafun = function(index){
        passPara.infoId = index;
        return passPara;
    }

    $scope.formatcell = function(num){
         if(num == 1){
            return 1;
          }
          if(num == 2){
            return 2;
          }
          else{
            return 3;
          }
    };

    $scope.infoshowpic = function(type){
        if(type == "img"){
            return true;
        }
        else{
            return false;
        }
    };

    $scope.infoshowword = function(type){
        if(type == "txt"){
            return true;
        }
        else{
            return false;
        }
    };

     $scope.gofriendcircle = function(){
        $state.go("friendcircle");
    };

    $scope.goback = function(contactId){
        $state.go("contact-detail",{'contactId':contactId});
    };
})


.controller('PersonalHomepageDetailCtrl', function($scope,$stateParams,$state,$ionicLoading,PersonalHomepageService,$window,Format,IdSearch) {

    var Paraarray = $stateParams.infoId;
    var ParaObj = JSON.parse(Paraarray);

    var num = ParaObj.infoId;
    var contactId = ParaObj.contactId;

    $ionicLoading.show({
        template:'<i class = "ion-load-c"><br></i>Loading...'
    });

    if (contactId == $window.sessionStorage['user_id']) {
        $scope.userBasic = PersonalHomepageService.getUserInfo();
    }
    else{
        PersonalHomepageService.getContactUserInfo(contactId).success(function(data) {
        $scope.userBasic = data;
        });
    }

    

    PersonalHomepageService.getContentInfo().success(function(data) {
        $scope.InfoItem = data.b[num];


        // 处理like相关的东西
        IdSearch.getMainInfo().success(function(data) {
            $scope.InfoItem.fullarray = data;
            $scope.InfoItem.likelist = IdSearch.getIdUsername($scope.InfoItem.like,$scope.InfoItem.fullarray);
        });

        //处理reply相关的东西
        IdSearch.getMainInfo().success(function(data) {
            $scope.InfoItem.fullarray = data;
            $scope.InfoItem.replylist = IdSearch.getIdUsernameReply($scope.InfoItem.reply,$scope.InfoItem.fullarray);
        });


    }).then(function(){
        $ionicLoading.hide();
    });



    $scope.getstandardtime = function(ts){
        var timearray = Format.formattimefriendcircle(ts);
        return timearray.timestandard;
    }

    $scope.goaccount = function(){
        $state.go("personalHomepage");
    }
    

})
