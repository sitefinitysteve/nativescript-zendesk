var frameModule = require("ui/frame");
var application = require("application");

var isAnonymous = true;
var isInitalized = false;
var isLoggingEnabled = false;

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

exports.logging = function(loggingEnabled){
	isLoggingEnabled = loggingEnabled;
}

exports.openHelpCenter = function (style){
	if(isInitalized){
        var activity = frameModule.topmost().android.activity;

        var MyZendeskCallback = com.zendesk.service.ZendeskCallback.extend({
            onSuccess: function(args){
                if(isAnonymous){
                    loadAnonUser();
                }
                new com.zendesk.sdk.support.SupportActivity.Builder().listCategories().show(activity);
            },
            onError: function(error){
                console.log(error);
            }
      });
      initSdk(activity, new MyZendeskCallback())

	} else{
		console.log("Zendesk account info not initalized, please call the init function on the module");
	}
}

exports.openContact = function(){
	if(isInitalized){
	 	var activity = frameModule.topmost().android.activity;

        var MyZendeskCallback = com.zendesk.service.ZendeskCallback.extend({
            onSuccess: function(args){
                if(isAnonymous){
                    loadAnonUser();
                }
                
                var intent = new android.content.Intent(activity, com.zendesk.sdk.feedback.ui.ContactZendeskActivity.class);
                activity.startActivity(intent);
            },
            onError: function(error){
                console.log(error);
            }
        });
		initSdk(activity, new MyZendeskCallback())

	} else{
		console.log("Zendesk account info not initalized, please call the init function on the module");
	}
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
function initSdk(activity, callback){
	com.zendesk.sdk.network.impl.ZendeskConfig.INSTANCE.setContactConfiguration(getConfig());
	com.zendesk.logger.Logger.setLoggable(isLoggingEnabled);
	com.zendesk.sdk.network.impl.ZendeskConfig.INSTANCE.init(activity,
                                                            account.url,
                                                            account.appId,
                                                            account.clientId,
                                                            callback);
}

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
