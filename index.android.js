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
    
    
        var MyZendeskCallback = com.zendesk.service.ZendeskCallback.extend({
            onSuccess: function(args){
                console.log("SUCCESS");
                debugger;
                if(isAnonymous){
                    loadAnonUser();
                }
                

                
                // 1) Sets the configuration used by the Contact Zendesk component
                //com.zendesk.sdk.network.impl.ZendeskConfig.INSTANCE.setContactConfiguration(new SampleFeedbackConfiguration());
        
                // 2) Starts the Help Center component
                new com.zendesk.sdk.support.SupportActivity.Builder().listCategories().show(activity);
            },
            onError: function(error){
                console.log("FAILED");
                debugger;
            }
        });
        
        var callback = new MyZendeskCallback();
        
        com.zendesk.sdk.network.impl.ZendeskConfig.INSTANCE.init(activity, 
                                                                account.url,  
                                                                account.appId, 
                                                                account.clientId, 
                                                                callback
                                                            );
                                                            

        
	} else{
		console.log("Zendesk account info not initalized, please call the init function on the module");	
	}
}

exports.setLocale = function(locale) {

}

// #####################################################
// ## METHODS
// #####################################################
function loadAnonUser(){
    var anonymousIdentity = new com.zendesk.sdk.model.access.AnonymousIdentity.Builder().build();
    com.zendesk.sdk.network.impl.ZendeskConfig.INSTANCE.setIdentity(anonymousIdentity);
}

function getColor(color){
	return new colorModule.Color(color).android;
}