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
                try{ 
                    if(isAnonymous){
                        loadAnonUser();
                    }

                    // 1) Sets the configuration used by the Contact Zendesk component
                    //com.zendesk.sdk.network.impl.ZendeskConfig.INSTANCE.setContactConfiguration(new SampleFeedbackConfiguration());
            
                    new com.zendesk.sdk.support.SupportActivity.Builder().listCategories().show(activity);
                } catch(args){
                    console.log(args);
                }
            },
            onError: function(error){
                console.log(error);
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
    //No supported yet
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