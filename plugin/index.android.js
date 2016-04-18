var frameModule = require("ui/frame");
var application = require("application");
var zen = require("./zenmodel-common");

var account = zen.account;
var user = zen.user;

exports.init = function(config){
    account.appId = config.appId;
    account.url = config.url;
    account.clientId = config.clientId;
    account.initialized = true;
    account.ticketSubject = (config.ticketSubject) ? config.ticketSubject : "App ticket: Android";
    account.additionalInfo = (config.additionalInfo) ? config.additionalInfo : "";
    account.tags = (config.tags) ? config.tags : [];

    if(config.enableLogging){
        account.loggingEnabled = config.enableLogging;
    }
    
    if(config.locale){
        account.locale = config.locale;
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

exports.openHelpCenter = function (options){
    if(account.initialized){
        var activity = frameModule.topmost().android.activity;

        if(account.locale !== "" && account.locale !== null){
            //var locale = new java.util.Locale(account.locale);
            //com.zendesk.sdk.network.impl.ZendeskConfig.INSTANCE.setDeviceLocale(locale);
        }
        
        var MyZendeskCallback = com.zendesk.service.ZendeskCallback.extend({
            onSuccess: function(args){
                if(account.anonymous){
                    loadAnonUser();
                }

                var builder = new com.zendesk.sdk.support.SupportActivity.Builder();
                builder.showContactUsButton(true);
                
                if(options === null){
                    builder.listCategories();
                }else{
                    var name = (options.name) ? options.name : null;
                    
                    switch(options.type){
                        case "Category":
                            builder.listSections(options.id);
                        break;
                        case "Section":
                            builder.listArticles(options.id);
                        break;
                        default:
                            builder.listCategories();
                        break;   
                    }
                }
                
                builder.show(activity);
                
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

exports.openContactList = function(){
   if(account.initialized){
	 	var activity = frameModule.topmost().android.activity;
         
        if(account.locale !== "" && account.locale !== null){
            //var locale = new java.util.Locale(account.locale);
            //com.zendesk.sdk.network.impl.ZendeskConfig.INSTANCE.setDeviceLocale(locale);
        }
        
        var MyZendeskCallback = com.zendesk.service.ZendeskCallback.extend({
            onSuccess: function(args){
                if(account.anonymous){
                    loadAnonUser();
                }
                
                var intent = new android.content.Intent(activity, com.zendesk.sdk.requests.RequestActivity.class);
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

exports.createContactRequest = function(){
   if(account.initialized){
	 	var activity = frameModule.topmost().android.activity;
         
        if(account.locale !== "" && account.locale !== null){
           // var locale = new java.util.Locale(account.locale);
            //com.zendesk.sdk.network.impl.ZendeskConfig.INSTANCE.setDeviceLocale(locale);
        }
        
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
        getAdditionalInfo: function() {
            return account.additionalInfo;
        },
        
        getTags: function() {
            var arrayList = new java.util.ArrayList();
            
            
            for(var i = 0; i < account.tags.length; i++){
                var tag = new java.lang.String(account.tags[i])
                arrayList.add(tag);
            }

            return arrayList;
        },

        getRequestSubject: function() {
            return account.ticketSubject;
        }
  });

  return new SampleFeedbackConfiguration();
}
