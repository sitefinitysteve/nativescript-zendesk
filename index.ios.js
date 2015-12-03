var frameModule = require("ui/frame");

var isAnonymous = true;
var isInitalized = false;

var account = {
	appId: "",
    url: "",
    clientId: "",
}

exports.init = function(appId, url, clientId, isAnonymous){
	account.appId = appId;
	account.url = url;
	account.clientId = clientId;
	isInitalized = true;
	isAnonymous = isAnonymous;
}

/// Style from https://developer.apple.com/library/ios/documentation/UIKit/Reference/UIViewController_Class/#//apple_ref/c/tdef/UIModalPresentationStyle
exports.openHelpCenter = function (style){
	if(isInitalized){
    	ZDKConfig.instance().initializeWithAppIdZendeskUrlClientIdOnSuccessOnError(account.appId, account.url, account.clientId,
            //SUCCESS 
            function(){
                try{ 
					if(isAnon){
						loadAnonUser();
					}
					
					var controller = frameModule.topmost().ios.controller;
					
					if(style === undefined){
						controller.modalPresentationStyle = UIModalPresentationFormSheet;
					} else{
						controller.modalPresentationStyle = style;
					}
					
                    ZDKHelpCenter.presentHelpCenterWithNavController(controller);
                    
                } catch(args){
                    console.log(args);
                }
            }, 
            //ERROR 
            function zenDeskError(args){
                 console.log(args);
            });
	} else{
		console.log("Zendesk account info not initalized, please call the init function on the module");	
	}
}

exports.setLocale = function(locale) {
	ZDKConfig.instance().userLocale = locale;
}

function loadAnonUser(){
	var anonymousIdentity = new ZDKAnonymousIdentity();
	ZDKConfig.instance().setUserIdentity(anonymousIdentity);
}