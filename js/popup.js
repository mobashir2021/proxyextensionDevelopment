$(function(){

    //console.log('each click called');

      

      
    chrome.storage.local.get(['getuseragent'], function(result){
        console.log(result.getuseragent);
        if(result.getuseragent === undefined){
            GetUserAgentData();
        }else{
            $("#actualuseragent").text(result.getuseragent.toString());
        }
        return false;
    });
    //uagent.then(setUseragentChoice, onErrorKeyUseragent); 

    chrome.storage.local.get(['getcityvalue'], function(result){
        console.log(result.getcityvalue);
        if(result.getcityvalue === undefined){
            
        }else{
            $("#current_city_by_ip").text(result.getcityvalue.toString());
        }
        return false;
    });

    /* chrome.storage.local.get(['gethost'], function(result){
        console.log(result.gethost);
        if(result.gethost === undefined){
            
        }else{
            //$("#current_city_by_ip").text(result.getcityvalue.toString());
        }
        return false;
    }); */
    //uagentcity.then(setCityChoice, onError);

    chrome.storage.local.get(['getipvalue'], function(result){
        console.log(result.getipvalue);
        if(result.getipvalue === undefined){
            
        }else{
            $("#current_ip").text(result.getipvalue.toString());
        }
        return false;
    });
    //uagentip.then(setIpChoice, onError);

    chrome.storage.local.get(['countryvalue'], function(result){
        console.log(result.countryvalue);
        if(result.countryvalue === undefined){
            
        }else{
            $("#country_id").val(result.countryvalue.toString());
        }
    });
    //uagentcountryvalue.then(setcountryvalueChoice, onError);  

    chrome.storage.local.get(['tempusername'], function(result){
        if(result.tempusername === undefined){
            $('#divlogin').css("display", "block");
            $('#main').css("display", "none");
            $('#signout').css("display", "none");
          }else{
            //document.querySelector("#color").value = result.color || "blue";
            $('#divlogin').css("display", "none");
            $('#main').css("display", "block");
            $('#signout').css("display", "block");
          }
    
          return false;
    });
    //getting.then(setCurrentChoice, onErrorKey);


    $("#btnlogin").click(function(e){
        
        LoginData(e);
        return false;
    });	
    
    $("#btnsignout").click(function(){
        
        signoutuser();
        return false;
    });

    $("#clear_proxy_using").click(function(){
        clearProxy();
        return false;
        });

    $('#refreshproxy').click(function(){
        // $(this).prop('disabled', true);
        RefreshProxy();

        /* setTimeout(function(){
            $(this).prop('disabled', false);
        }, 5000); */
        return false;
    });
    
    $('#country_id').change(function() {
        
        countryChange();
        return false;
      });

      $('#getnewagent').click(function(){
        
          GetUserAgentData();
          return false;
      });

});//End of DOM Ready function


function RefreshProxy(){
    /* var millisecondsPerWeek = 1000 * 60 * 60 * 1;
    var oneWeekAgo = (new Date()).getTime() - millisecondsPerWeek;
    chrome.browsingData.remove({
    "since": oneWeekAgo,
    "originTypes": {
        "protectedWeb": true,
        "unprotectedWeb": true
    }
    }, {
    "appcache": true,
    "cache": true,
    "cacheStorage": true,
    "cookies": true,
    "downloads": true,
    "fileSystems": true,
    "formData": true,
    "history": true,
    "indexedDB": true,
    "localStorage": true,
    "passwords": true,
    "serviceWorkers": true,
    "webSQL": true,
    "pluginData": true,
    "serverBoundCertificates": true
    }, countryChange()); */


    //countryChange('servercountry-CN.zproxy.lum-superproxy.io');
    countryChange('');
}

function setUseragentChoice(result) {
    console.log(result.getuseragent);
    if(result.getuseragent === undefined){
        GetUserAgentData();
    }else{
        $("#actualuseragent").text(result.getuseragent.toString());
    }
    return false;
  }

  function setIpChoice(result) {
    console.log(result.getipvalue);
    if(result.getipvalue === undefined){
        
    }else{
        $("#current_ip").text(result.getipvalue.toString());
    }
    return false;
  }

  function setCityChoice(result) {
    console.log(result.getcityvalue);
    if(result.getcityvalue === undefined){
        
    }else{
        $("#current_city_by_ip").text(result.getcityvalue.toString());
    }
    return false;
  }

  function setcountryvalueChoice(result) {
    console.log(result.countryvalue);
    if(result.countryvalue === undefined){
        
    }else{
        $("#country_id").val(result.countryvalue.toString());
    }

    return false;
  }
  
  function onErrorKeyUseragent(e) {
    //GetUserAgentData();
  }

function onCleared() {
    //console.log("OK");
  }
  
  function onError(e) {
    //console.log(e);
  }

function onErrorKey(error) {
    //console.log(`Error: ${error}`);
    $('#divlogin').css("display", "block");
    $('#main').css("display", "none");
    $('#signout').css("display", "none");
  }

  function setCurrentChoice(result) {
      //console.log('aaa');
      //console.log(result.tempusername);
      if(result.tempusername === undefined){
        $('#divlogin').css("display", "block");
        $('#main').css("display", "none");
        $('#signout').css("display", "none");
      }else{
        //document.querySelector("#color").value = result.color || "blue";
        $('#divlogin').css("display", "none");
        $('#main').css("display", "block");
        $('#signout').css("display", "block");
      }

      return false;
    
  }

function GetUserAgentData(){
  
    $("#actualuseragent").text("Loading.......");
    var url = "http://www.fjfgroups.com/api/LeadApi/GetUserAgent";
    
    
    var settings = {
        type : "GET",
        dataType : "json",
        //contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        url : url,
        //data : {username: usernamevalue,password: passwordvalue},
        success : function(result){
            
            //$('#messageboxspan').html(JSON.stringify(result));
            var obj = JSON.stringify(result);
            if(obj.toString() != ''){
                chrome.storage.local.set({
                    getuseragent: obj.toString()
                  }, function(){

                  });
                $("#actualuseragent").text(obj.toString());
                chrome.runtime.sendMessage({
                    action: obj.toString()
                });
                
            }else{
                
                $('#messageboxspan').html("No user agent found");
            }
            
            
            
        },
        error : function(err){
            //$('#divlogin').css("display", "none");
            
            $('#messageboxspan').html(JSON.stringify(err));
            //alert(JSON.stringify(err));	
            //$('#signout').css("display", "block");				
        }
    };
    
    $.ajax(settings);
    return false;
}

function signoutuser(){
    $('#messageboxspan').html("");
    $('#current_ip').html("");
    $('#current_country_by_ip').html("");
    $('#current_city_by_ip').html("");
    $('#divlogin').css("display", "block");
    $('#main').css("display", "none");
    $('#signout').css("display", "none");
    chrome.runtime.sendMessage({
        valuedata: "proxyClear"
    });
    chrome.storage.local.remove(["getcityvalue","getipvalue", "countryvalue", "getuseragent", "tempusername"],function(){
        var error = chrome.runtime.lastError;
           if (error) {
               console.error(error);
           }
       })

    
}

function clearProxy(){
    $('#messageboxspan').html("");
    $('#current_ip').html("");
    $('#current_country_by_ip').html("");
    $('#current_city_by_ip').html("");
    
    chrome.runtime.sendMessage({
        valuedata: "proxyClear"
    });
      

    chrome.storage.local.remove(["getcityvalue","getipvalue", "countryvalue"],function(){
        var error = chrome.runtime.lastError;
           if (error) {
               console.error(error);
           }
       });
}

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }


 function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}



function countryChange(hostnamedata = ''){
    
    
    //var sessionidvalue = makeid(8);
    $('#current_ip').html("Loading......");
    $('#current_country_by_ip').html("Loading......");
    $('#current_city_by_ip').html("Loading......");
    var countriesid = $('#country_id').val();
    var temphostname = hostnamedata;
    if(temphostname == ''){
        temphostname = 'zproxy.lum-superproxy.io'
    }
    var ijRandom = Math.floor(Math.random() * 10000) + 100;  
    var tempusernamedata = 'lum-customer-c_1f034242-zone-zonesanjib-country-' + countriesid + '-session-' + ijRandom;

    var url = "http://www.fjfgroups.com/api/LeadApi/GetCurrentIp";
    var settings = {
        type : "GET",
        dataType : "json",
        //contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        url : url,
        data : {country: $('#country_id').val().toString(), sessionid: ijRandom},
        success : function(result){
            
            var arrObj = JSON.parse(result);
            console.log(arrObj);
            
           var portdata = getRandomInt(10000, 50000);
            chrome.storage.local.set({
                userauth: tempusernamedata
            },function(){
                chrome.runtime.sendMessage({
                    valuedata: "proxy",
                    username: tempusernamedata,
                    passwordpass: 'a46ycwhmowbr',
                    portpass : 22225,
                    //hostname: arrObj.ip
                   hostname : temphostname
                }, function(response) {
                    
                    chrome.storage.local.set({
                    getipvalue: arrObj.ip
                    }, function(){
                    $.ajax({
                        type: "GET",
                        dataType : "json",
                        url: "https://ipapi.co/"+arrObj.ip+"/json/",
                        success: function(successdata){
    
                            var getTimezonedata = moment().utcOffset(successdata.utc_offset).utcOffset();
                            var getLanguagedata = successdata.languages;
    
                            
                            chrome.storage.local.set({
                                getTimezonedata: moment().utcOffset(successdata.utc_offset).utcOffset()
                                }, function(){
            
                                });
                                chrome.storage.local.set({
                                getLanguagedata: successdata.languages
                                }, function(){
            
                                });
                        },
                        error: function(errordata){
                            $('#messageboxspan').html(JSON.stringify(errordata));
                        }
                    });
                    chrome.storage.local.set({
                        getcityvalue: arrObj.geo.city
                        }, function(){
                        chrome.storage.local.set({
                            countryvalue: $('#country_id').val().toString()
                            }, function(){
                            //window.location.reload(true);
                        });
        
                        });
                    });
            
                                  
                    
                           
                  });
            });
            
            
        },
        error : function(err){
            //$('#divlogin').css("display", "none");
            
            $('#messageboxspan').html(JSON.stringify(err));
            			
        }
    };
    
    $.ajax(settings);

}



function LoginData(e){
    var url = "https://digimarkon.com/login/getuserinfo";
    var usernamevalue = $("#username").val();
    var passwordvalue = $("#password").val();
    
    var settings = {
        type : "POST",
        dataType : "json",
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        url : url,
        data : {username: usernamevalue,password: passwordvalue},
        success : function(result){
            
            //$('#messageboxspan').html(JSON.stringify(result));
            var obj = result;
            if(obj.Result.Username.toString() != ''){
                chrome.storage.local.set({
                    tempusername: usernamevalue
                  }, function(){
                  
                });
                $('#divlogin').css("display", "none");
                $('#main').css("display", "block");
                $('#signout').css("display", "block");
            }else{
                
                $('#messageboxspan').html("Kindly enter correct Username/Password");
            }
            

            
        },
        error : function(err){
            //$('#divlogin').css("display", "none");
            
            
            $('#messageboxspan').html(JSON.stringify(err));
            //alert(JSON.stringify(err));	
            //$('#signout').css("display", "block");				
        }
    };
    
    $.ajax(settings);
    e.preventDefault();
    
}//LoadData


