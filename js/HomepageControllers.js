angular.module('starter.homepagecontrollers', [])

.controller('PersonalHomepageCtrl', function($window,$http, $scope,$state,$ionicLoading,PersonalHomepageService,Format) {
    var passPara = {};
    var user_own_id = $window.sessionStorage['user_id'];

    $ionicLoading.show({
        template:'<i class = "ion-load-c"><br></i>Loading...'
    });

    $scope.title = "相册";
    $scope.gobackbutton = "朋友圈";

    $scope.userBasicInfo = PersonalHomepageService.getUserInfo();

    passPara.contactId = $scope.userBasicInfo.user_id;

    PersonalHomepageService.getContentInfo(user_own_id).success(function(data) {
        $scope.userContentInfo = data;
        console.log($scope.userContentInfo);
    }).then(function(){
        $ionicLoading.hide();
    });

     $scope.getdate = function(ts){
        var timearray = Format.formattimefriendcircle(ts);
        if(timearray.date<10){
            timearray.date = '0'+timearray.date;

        }
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
    // console.log($stateParams.contact);
    var num = $stateParams.contact;
    console.log(num);
    // var num = $stateParams.contact;


    // var num = contactPath.id;
    // var urlPara = contactPath.path;

    $scope.urlPath = {};
    $scope.urlPath.id = num;
    // $scope.urlPath.path = contactPath.path;

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

    PersonalHomepageService.getContentInfo(num).success(function(data) {
        $scope.userContentInfo = data;
        console.log(data);
    }).then(function(){
        $ionicLoading.hide();
    });

    $scope.getdate = function(ts){
        var timearray = Format.formattimefriendcircle(ts);
         if(timearray.date<10){
            timearray.date = '0'+timearray.date;

        }
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


    $scope.goback = function(){
        // var contactPathstr = JSON.stringify(contactPath);
        // $state.go($scope.urlPath.path,{'contact':contactPathstr});
        history.go(-1);
    };
})


.controller('PersonalHomepageDetailCtrl', function($scope,$stateParams,$state,$ionicLoading,PersonalHomepageService,$window,Format,IdSearch) {

    
    var Paraarray = $stateParams.infoId;
    var ParaObj = JSON.parse(Paraarray);

    $scope.showchat = false;

    $scope.showremark = false;

    $scope.clickfun = function(){
        $scope.showchat = !$scope.showchat;
    }

    $scope.clickremark = function(){
        $scope.showremark = !$scope.showremark;
        $scope.showchat = !$scope.showchat;
    }

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

    

    PersonalHomepageService.getContentInfo(contactId).success(function(data) {

        $scope.InfoItem = data.b[num];
        var idreplylist = new Array();
        var idlikelist = $scope.InfoItem.like;

        for(var i =0; i<$scope.InfoItem.reply.length;i++){
            idreplylist[i] = $scope.InfoItem.reply[i][0];
        }

        // 处理like相关的东西
        IdSearch.getMainInfo(idlikelist).success(function(data) {
            $scope.InfoItem.fullarray = data.b;
            // console.log($scope.InfoItem.fullarray);
            $scope.InfoItem.likelist = IdSearch.getIdUsername($scope.InfoItem.like,$scope.InfoItem.fullarray);
        });

        //处理reply相关的东西
        IdSearch.getMainInfo(idreplylist).success(function(data) {
            $scope.InfoItem.fullarray = data.b;
            $scope.InfoItem.replylist = IdSearch.getIdUsernameReply($scope.InfoItem.reply,$scope.InfoItem.fullarray);
        });


    }).then(function(){
        $ionicLoading.hide();
    });



    $scope.getstandardtime = function(ts){
        var timearray = Format.formattimefriendcircle(ts);
        return timearray.timestandard;
    }

    $scope.goback = function(){
        history.back();
    }


var user = $window.sessionStorage['user_id'];
console.log(user);


     //发送评论 和zixia调
        $scope.sendremark = function(){
            // var username = $window.sessionStorage['user_name'];
            // var user = $window.sessionStorage['user_id'];
            // var remark_content = $scope.inputContent;
            // var remark_json = [user,remark_content];
            // var serial = $scope.serial_num;//整个数据流中的第几个数据
            
            // contact_id = $scope.infos[serial].p[0];
            // item_id = $scope.infos[serial].id;      

            // PersonalHomepageService.sendremark(contact_id,item_id,remark_content).success(function(data){

            //     if(data.h.r == 0){

            //         console.log('success!!');
            //         console.log($scope.infos[serial].reply);
            //         $scope.infos[serial].reply.push(remark_json);
            //         console.log($scope.infos[serial].reply);


            //         IdSearch.getMainInfo($scope.infos[serial].reply[2]).success(function(data) {


            //         var fullarray = data.b;
            //         var list = {'username':username};

            //         $scope.infos[serial].replylist[user]=list;
            //         console.log($scope.infos[serial]);                   
            //         });  

            //     }
            //     else{
            //         alert("评论失败"+data.h.ret);
            //     }
                
            // }); 
            
        }

        //点赞 和zixia调
        $scope.sendheart = function(){
            $scope.showchat = !$scope.showchat;

            PersonalHomepageService.sendlike($scope.InfoItem.id).success(function(data){
                if(data.h.ret == 0){
                    console.log('success!!');
          
                    console.log($scope.InfoItem);
                    if($scope.InfoItem.like.indexOf(user)>-1){
                        var reply_heart_index = $scope.InfoItem.like.indexOf(user);
                        $scope.InfoItem.like.splice(reply_heart_index, 1);
                    }
                    else{
                        console.log($scope.InfoItem);
                        $scope.InfoItem.like.push(user);
                    }
                    IdSearch.getMainInfo($scope.InfoItem.like).success(function(data) {
                    var fullarray = data.b;
                    console.log(fullarray);
                    console.log(fullarray.username);
                    $scope.InfoItem.likelist = fullarray[user].username;
                    });  
                }
                else{
                    alert("点赞失败"+data.h.r);
                }
                
                
             }); 
            
             
        }

})
