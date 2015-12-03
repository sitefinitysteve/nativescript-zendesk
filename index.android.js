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

exports.openHelpCenter = function (style){
	if(isInitalized){
		    var activity = frameModule.topmost().android.activity;
    
    debugger;
    var callback = new com.zendesk.service.ZendeskCallback({
                        onSuccess: function(args){
                            console.log("SUCCESS");
                            debugger;
                        },
                        onError: function(error){
                            console.log("FAILED");
                            debugger;
                        }
                    });
    debugger;
    com.zendesk.sdk.network.impl.ZendeskConfig.INSTANCE.init(activity, 
                                                            account.appId,  
                                                            account.url, 
                                                            account.clientId, 
                                                            callback
                                                         );

	} else{
		console.log("Zendesk account info not initalized, please call the init function on the module");	
	}
}

exports.setLocale = function(locale) {

}

function loadAnonUser(){

}