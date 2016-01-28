var frameModule = require("ui/frame");
var application = require("application");

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
                if(isAnonymous){
                    loadAnonUser();
                }

                var sampleConfig = getConfig();

                com.zendesk.sdk.network.impl.ZendeskConfig.INSTANCE.setContactConfiguration(sampleConfig);
                
                new com.zendesk.sdk.support.SupportActivity.Builder().listCategories().show(activity);
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

//NOT WORKING
exports.openContactZendesk = function(){
    console.log("Not Implimented yet")
    /*
   if(isInitalized){
	   var activity = frameModule.topmost().android.activity;
    
    
        var MyZendeskCallback = com.zendesk.service.ZendeskCallback.extend({
            onSuccess: function(args){
                if(isAnonymous){
                    loadAnonUser();
                }

                var sampleConfig = getConfig();

                com.zendesk.sdk.network.impl.ZendeskConfig.INSTANCE.setContactConfiguration(sampleConfig);
                
                var intent = new android.content.Intent(com.zendesk.sdk.feedback.ui.ContactZendeskActivity.class);
                application.android.startActivity(intent); 
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
    */
}

exports.setLocale = function(locale) {
    com.zendesk.sdk.network.impl.ZendeskConfig.INSTANCE.setDeviceLocale(locale); 
}

exports.setTheme = function(args){
    console.log("nativescript-zendesk setTheme Not available on Android, use the readme to see how to theme via the manifest")
}

// #####################################################
// ## METHODS
// #####################################################
function loadAnonUser(){
    var anonymousIdentity = new com.zendesk.sdk.model.access.AnonymousIdentity.Builder().build();
    com.zendesk.sdk.network.impl.ZendeskConfig.INSTANCE.setIdentity(anonymousIdentity);
}

function getConfig() {
    var SampleFeedbackConfiguration = com.zendesk.sdk.feedback.impl.BaseZendeskFeedbackConfiguration.extend({
        getRequestSubject: function() {
            return "Feedback from our App";
        }
    });
    
    return new SampleFeedbackConfiguration();
}