var frameModule = require("ui/frame");
var application = require("application");

var account = {
	appId: "",
	url: "",
	clientId: "",
    loggingEnabled: false,
    initalized: false,
    anonymous: true
}

exports.init = function(appId, url, clientId, isAnonymous, enableLogging){
    return new Promise(function(resolve, reject){
        try{
            account.appId = appId;
            account.url = url;
            account.clientId = clientId;
            account.initalized = true;

            if(enableLogging){
                account.loggingEnabled = enableLogging;
            }
            
            resolve(account);
        }
        catch(args){
            reject(args);
        }
    });
}

exports.account = function (){
    return account;
}

exports.logging = function(loggingEnabled){
	account.loggingEnabled = loggingEnabled;
}

exports.openHelpCenter = function (style){
	if(account.initalized){
        var activity = frameModule.topmost().android.activity;

        var MyZendeskCallback = com.zendesk.service.ZendeskCallback.extend({
            onSuccess: function(args){
                if(account.anonymous){
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
		notInitalized();
	}
}

exports.openContact = function(){
	if(account.initalized){
	 	var activity = frameModule.topmost().android.activity;

        var MyZendeskCallback = com.zendesk.service.ZendeskCallback.extend({
            onSuccess: function(args){
                if(account.anonymous){
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
		notInitalized();
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
	com.zendesk.logger.Logger.setLoggable(account.loggingEnabled);
	com.zendesk.sdk.network.impl.ZendeskConfig.INSTANCE.init(activity,
                                                            account.url,
                                                            account.appId,
                                                            account.clientId,
                                                            callback);
}

function notInitalized(){
    throw "Zendesk account info not initalized, please call the init function on the module";
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
