
chrome.webRequest.MAX_HANDLER_BEHAVIOR_CHANGED_CALLS_PER_10_MINUTES = 10000;
var usernamevalue = 'lum-customer-c_1f034242-zone-zonesanjib';
var passwordvalue = 'a46ycwhmowbr';
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    asyncFunctionWithAwait(request, sender, sendResponse);
    
    
    
    
    return true;
  });

  const asyncFunctionWithAwait = async (request, sender, sendResponse) => {

    usernamevalue = request.username;
    passwordvalue = request.passwordpass;
    var authCredentials = function (proxyUsername, proxyPassword) {
        return {
            
            authCredentials: {
                username: request.username,
                password: request.passwordpass
            }
        }
    };
    if (request.valuedata == "proxy"){
        
        /* chrome.webRequest.handlerBehaviorChanged(
            function() {
                
                console.log('this called');
        
                
            }); */

            
        
        console.log('happened');
        console.log(request);
        var config = {
            mode: "fixed_servers",
            rules: {
              singleProxy: {
                scheme: "http",
                host: request.hostname,
                //host: request.randomip,
                port: request.portpass// request.randomport
              },
              bypassList: []
            }
          };

          

         /*  var options = {};
          options.origins = [];
          options.origins.push("http://zproxy.lum-superproxy.io");
          options.origins.push("https://zproxy.lum-superproxy.io");
          var types = { "cookies": true};
          await chrome.browsingData.remove(options, types, function(){
             chrome.proxy.settings.set(
                {value: config, scope: 'regular'},
                function() {
                    
                    
                        
                        chrome.runtime.reload();
                     
                  chrome.webRequest.onAuthRequired.addListener(
                    function (details) {
                        console.log("onAuthRequired!");
                        
                    return authCredentials(request.username.toString(), request.passwordpass.toString());
                    }
                 , {urls: ['<all_urls>']}, ['blocking','asyncBlocking']);
              
                      
                  
          
                });
                sendResponse({statusvalue: "correct"});
          }); */

          await chrome.proxy.settings.set(
            {value: config, scope: 'regular'},
            function() {
              
              chrome.webRequest.onAuthRequired.addListener(
                function (details) {
                    
                    
                return authCredentials(request.username.toString(), request.passwordpass.toString());
                }
             , {urls: ['<all_urls>']}, ['blocking']);
          
                  
              
      
            });
            sendResponse({statusvalue: "correct"});
    

    
    }

    if (request.valuedata == "proxyClear"){

        
        chrome.webRequest.onAuthRequired.removeListener(authCredentials);
        var config1 = {
            mode: "direct"
          };

         await chrome.proxy.settings.set(
            {value: config1, scope: 'regular'},
            function() {
                chrome.webRequest.handlerBehaviorChanged();
            });
            
        sendResponse({statusvalue: "correct"});
    }
  }

  var filter = {urls: ["<all_urls>"]};

  chrome.proxy.onProxyError.addListener(function(details) {
    console.log(details.error);
});


  

 /*  chrome.webRequest.onBeforeRequest.addListener((details) => {
    console.log('before request called');
    if(chrome.webRequest.onAuthRequired.hasListener(checkauth)){
        chrome.webRequest.onAuthRequired.removeListener(checkauth);
    }
    
    chrome.webRequest.handlerBehaviorChanged();
}, filter); */


chrome.webRequest.onBeforeRequest.addListener((details) => {
    
          chrome.storage.local.get(['userauth'], function(result){
            chrome.webRequest.onAuthRequired.addListener(
                function (details) {
                    
                    console.log('interceptor');
                    console.log(usernamevalue);
                return {
                
                    authCredentials: {
                        username: usernamevalue,
                        password: 'a46ycwhmowbr'
                    }
                }
                }
             , {urls: ['<all_urls>']}, ['asyncBlocking']);
        });

          
    
}, filter); 

  chrome.webRequest.onBeforeSendHeaders.addListener(
    function(details) {
        chrome.storage.local.get(['getuseragent'], function(result){
            
            if(result.getuseragent === undefined){
                
            }else{
                for (var i = 0; i < details.requestHeaders.length; ++i) {
                    if (details.requestHeaders[i].name === 'User-Agent') {
                        details.requestHeaders[i].value = result.getuseragent;
                        
                        break;
                    }
                }
                /* console.log('useragent');
                console.log(result.getuseragent); */
                return {requestHeaders: details.requestHeaders};
            }
            
        });

        
    }, {urls: ['<all_urls>']}, ['blocking', 'requestHeaders']);


    function checkauth (details) {
        console.log("onAuthRequired!");
        
    return authCredentials(request.username.toString(), request.passwordpass.toString());
} 
    