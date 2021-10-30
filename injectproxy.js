(function() {
    "use strict";
    var username = document.currentScript.dataset.username; 
    console.log(username);
    var config = {
        mode: "fixed_servers",
        rules: {
            singleProxy: {
            scheme: "http",
            host: 'zproxy.lum-superproxy.io',
            //host: request.randomip,
            port: 22225
            },
            bypassList: []
        }
        };
    
        chrome.proxy.settings.set(
        {value: config, scope: 'regular'},
        function() {
            
            chrome.webRequest.onAuthRequired.addListener(
            function (details) {
                
                
            return authCredentials(username, 'a46ycwhmowbr');
            }
            , {urls: ['<all_urls>']}, ['blocking']);
        
                
            
    
        });
        
        
        
      
    
    
})();
    
    
     
    
      
      