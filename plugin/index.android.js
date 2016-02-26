var frameModule = require("ui/frame");
var application = require("application");
var zen = require("./zenmodel-common");

var account = zen.account;
var user = zen.user;

exports.init = function(appId, url, clientId, enableLogging){
    account.appId = appId;
    account.url = url;
    account.clientId = clientId;
    account.initialized = true;
    account.ticketSubject = "App ticket: Android"

    if(enableLogging){
        account.loggingEnabled = enableLogging;
    }
    
    return this;
}

exports.identifyUser = function (id, name, email){
    user.id=id;
    user.name=name;
    user.email=email;
}

exports.account = function (){
    return account;
}

exports.logging = function(loggingEnabled){
	account.loggingEnabled = loggingEnabled;
}

exports.openHelpCenter = function (style){
    if(account.initialized){
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
      notInitialized();
    }
}

exports.openContact = function(){
   if(account.initialized){
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
    notInitialized();
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

function notInitialized(){
    throw "Zendesk account info not initalized, please call the init function on the module";
}

function loadAnonUser(){
  if(user.isInitalized()){
    var identity = new com.zendesk.sdk.model.access.AnonymousIdentity.Builder()
    .withNameIdentifier(user.name)
    .withExternalIdentifier(user.id)
    .withEmailIdentifier(user.email)
    .build();
    com.zendesk.sdk.network.impl.ZendeskConfig.INSTANCE.setIdentity(identity);
  }
  else{
    var anonymousIdentity = new com.zendesk.sdk.model.access.AnonymousIdentity.Builder().build();
    com.zendesk.sdk.network.impl.ZendeskConfig.INSTANCE.setIdentity(anonymousIdentity);
  }
}

function getConfig() {
  var SampleFeedbackConfiguration = com.zendesk.sdk.feedback.impl.BaseZendeskFeedbackConfiguration.extend({
      getRequestSubject: function() {
          return account.ticketSubject;
      }
  });

  return new SampleFeedbackConfiguration();
}
