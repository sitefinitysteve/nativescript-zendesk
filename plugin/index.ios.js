var frameModule = require("ui/frame");
var colorModule = require("color");
var zen = require("./zenmodel-common");

var account = zen.account;
var user = zen.user;

exports.init = function(config){
    account.appId = config.appId;
    account.url = config.url;
    account.clientId = config.clientId;
    account.initialized = true;

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

// Public Methods
exports.openHelpCenter = function () {
    openZendesk().then(function(controller) {
         ZDKHelpCenter.presentHelpCenterWithNavController(controller);
    });
}

exports.openContactList = function(){
    openZendesk().then(function(controller) {
         ZDKRequests.presentRequestListWithNavController(controller);
    });
}

exports.createContactRequest = function(style){
    openZendesk().then(function(controller) {
         ZDKRequests.showRequestCreationWithNavController(controller);
    });
}

//All code thats common
function openZendesk(){
    return new Promise(function(resolve, reject) {
        if(account.initialized){
            ZDKLogger.enable(account.loggingEnabled);

            if(account.locale !== "" && account.locale !== null){
                var iOSlocale = NSString.alloc().initWithString(account.locale);
                ZDKConfig.instance().userLocale = iOSlocale;
            }
            
            ZDKConfig.instance().initializeWithAppIdZendeskUrlClientIdOnSuccessOnError(account.appId, account.url, account.clientId,
                //SUCCESS
                function(){
                    try{
                        if(account.anonymous){
                            loadAnonUser();
                        }

                        var controller = frameModule.topmost().ios.controller;

                        controller.modalPresentationStyle = UIModalPresentationFormSheet;
                        resolve(controller);

                    } catch(args){
                        console.log(args);
                        reject(args);
                    }
                },
                //ERROR
                function zenDeskError(args){
                    reject(args);;
                });
        } else{
            notInitialized();
            reject("Not Initialized");
        }
    });
}






// #####################################################
// ## THEME ZONE, WHERE THE THEME GOES TO PARTY
// #####################################################
exports.setTheme = function(args){
	if(args != null && args != "undefined"){
		if(args.ZDKSupportView){
			if(args.ZDKSupportView.viewBackgroundColor){
				ZDKSupportView.appearance().viewBackgroundColor = getColor(args.ZDKSupportView.viewBackgroundColor);
			}
			if(args.ZDKSupportView.tableBackgroundColor){
				ZDKSupportView.appearance().tableBackgroundColor = getColor(args.ZDKSupportView.tableBackgroundColor);
			}
			if(args.ZDKSupportView.separatorColor){
				ZDKSupportView.appearance().separatorColor = getColor(args.ZDKSupportView.separatorColor);
			}

			//SearchBar
			if(args.ZDKSupportView.searchBarStyle){
				ZDKSupportView.appearance().searchBarStyle = args.ZDKSupportView.searchBarStyle;
			}

			if(args.ZDKSupportView.noResults){
				if(args.ZDKSupportView.noResults.foundLabelColor){
					ZDKSupportView.appearance().noResultsFoundLabelColor = getColor(args.ZDKSupportView.noResults.foundLabelColor);
				}
				if(args.ZDKSupportView.noResults.foundLabelBackground){
					ZDKSupportView.appearance().noResultsFoundLabelBackground = getColor(args.ZDKSupportView.noResults.foundLabelBackground);
				}
				if(args.ZDKSupportView.noResults.contactButtonBackground){
					ZDKSupportView.appearance().noResultsContactButtonBackground = getColor(args.ZDKSupportView.noResults.contactButtonBackground);
				}
				if(args.ZDKSupportView.noResults.contactButtonTitleColorNormal){
					ZDKSupportView.appearance().noResultsContactButtonTitleColorNormal = getColor(args.ZDKSupportView.noResults.contactButtonTitleColorNormal);
				}
				if(args.ZDKSupportView.noResults.contactButtonTitleColorHighlighted){
					ZDKSupportView.appearance().noResultsContactButtonTitleColorHighlighted = getColor(args.ZDKSupportView.noResults.contactButtonTitleColorHighlighted);
				}
				if(args.ZDKSupportView.noResults.contactButtonTitleColorDisabled){
					ZDKSupportView.appearance().noResultsContactButtonTitleColorDisabled = getColor(args.ZDKSupportView.noResults.contactButtonTitleColorDisabled);
				}
				if(args.ZDKSupportView.noResults.contactButtonBorderColor){
					ZDKSupportView.appearance().noResultsContactButtonBorderColor = getColor(args.ZDKSupportView.noResults.contactButtonBorderColor);
				}

				if(args.ZDKSupportView.noResults.contactButtonBorderWidth){
					ZDKSupportView.appearance().setNoResultsContactButtonBorderWidth = args.ZDKSupportView.noResults.contactButtonBorderWidth;
				}

				if(args.ZDKSupportView.noResults.contactButtonCornerRadius){
					ZDKSupportView.appearance().setNoResultsContactButtonCornerRadius = args.ZDKSupportView.noResults.contactButtonCornerRadius;
				}

				//Font
				if(args.ZDKSupportView.noResults.foundLabelFont){
					ZDKSupportView.appearance().setNoResultsFoundLabelFont = args.ZDKSupportView.noResults.foundLabelFont;
				}
			}
		}

		if(args.ZDKSupportTableViewCell){
			if(args.ZDKSupportTableViewCell.viewBackgroundColor){
				ZDKSupportTableViewCell.appearance().viewBackgroundColor = getColor(args.ZDKSupportTableViewCell.viewBackgroundColor);
			}
			if(args.ZDKSupportTableViewCell.titleLabelBackground){
				ZDKSupportTableViewCell.appearance().titleLabelBackground = getColor(args.ZDKSupportTableViewCell.titleLabelBackground);
			}
			if(args.ZDKSupportTableViewCell.titleLabelColor){
				ZDKSupportTableViewCell.appearance().titleLabelColor = getColor(args.ZDKSupportTableViewCell.titleLabelColor);
			}

			//Font
			if(args.ZDKSupportTableViewCell.titleLabelFont){
				ZDKSupportTableViewCell.appearance().titleLabelFont = args.ZDKSupportTableViewCell.titleLabelFont;
			}
		}

		if(args.ZDKSupportArticleTableViewCell){
			if(args.ZDKSupportArticleTableViewCell.viewBackgroundColor){
				ZDKSupportArticleTableViewCell.appearance().viewBackgroundColor = getColor(args.ZDKSupportArticleTableViewCell.viewBackgroundColor);
			}
			if(args.ZDKSupportArticleTableViewCell.parentsLabelColor){
				ZDKSupportArticleTableViewCell.appearance().parentsLabelColor = getColor(args.ZDKSupportArticleTableViewCell.parentsLabelColor);
			}
			if(args.ZDKSupportArticleTableViewCell.parnetsLabelBackground){
				ZDKSupportArticleTableViewCell.appearance().parnetsLabelBackground = getColor(args.ZDKSupportArticleTableViewCell.parnetsLabelBackground);
			}
			if(args.ZDKSupportArticleTableViewCell.titleLabelColor){
				ZDKSupportArticleTableViewCell.appearance().titleLabelColor = getColor(args.ZDKSupportArticleTableViewCell.titleLabelColor);
			}
			if(args.ZDKSupportArticleTableViewCell.labelBackground){
				ZDKSupportArticleTableViewCell.appearance().labelBackground = getColor(args.ZDKSupportArticleTableViewCell.labelBackground);
			}

			//Font
			if(args.ZDKSupportArticleTableViewCell.titleLabelFont){
				ZDKSupportArticleTableViewCell.appearance().titleLabelFont = args.ZDKSupportArticleTableViewCell.titleLabelFont;
			}

			if(args.ZDKSupportArticleTableViewCell.articleParentsLabelFont){
				ZDKSupportArticleTableViewCell.appearance().articleParentsLabelFont = args.ZDKSupportArticleTableViewCell.articleParentsLabelFont;
			}
		}

		if(args.ZDKSupportAttachmentCell){
			if(args.ZDKSupportAttachmentCell.backgroundColor){
				ZDKSupportAttachmentCell.appearance().backgroundColor = getColor(args.ZDKSupportAttachmentCell.backgroundColor);
			}
			if(args.ZDKSupportAttachmentCell.titleLabelBackground){
				ZDKSupportAttachmentCell.appearance().titleLabelBackground = getColor(args.ZDKSupportAttachmentCell.titleLabelBackground);
			}
			if(args.ZDKSupportAttachmentCell.titleLabelColor){
				ZDKSupportAttachmentCell.appearance().titleLabelColor = getColor(args.ZDKSupportAttachmentCell.titleLabelColor);
			}
			if(args.ZDKSupportAttachmentCell.fileSizeLabelBackground){
				ZDKSupportAttachmentCell.appearance().fileSizeLabelBackground = getColor(args.ZDKSupportAttachmentCell.fileSizeLabelBackground);
			}
			if(args.ZDKSupportAttachmentCell.fileSizeLabelColor){
				ZDKSupportAttachmentCell.appearance().fileSizeLabelColor = getColor(args.ZDKSupportAttachmentCell.fileSizeLabelColor);
			}

			//Font
			if(args.ZDKSupportAttachmentCell.titleLabelFont){
				ZDKSupportAttachmentCell.appearance().titleLabelFont = args.ZDKSupportAttachmentCell.titleLabelFont;
			}
			if(args.ZDKSupportAttachmentCell.fileSizeLabelFont){
				ZDKSupportAttachmentCell.appearance().fileSizeLabelFont = args.ZDKSupportAttachmentCell.fileSizeLabelFont;
			}
		}
	}
}

// #####################################################
// ## METHODS
// #####################################################
function loadAnonUser(){
    var anonymousIdentity = new ZDKAnonymousIdentity()

	if(user.isInitalized()){
	  	anonymousIdentity.name = user.name;
	  	anonymousIdentity.externalId = user.id;
	  	anonymousIdentity.email = user.email;
	}

	ZDKConfig.instance().setUserIdentity(anonymousIdentity);
}

function getColor(color){
	return new colorModule.Color(color).ios;
}

function notInitialized(){
    throw "Zendesk account info not initialized, please call the init function on the module";
}


//To Impliment
/*
// style the help center
UIActivityIndicatorView *hcSpinner = [[UIActivityIndicatorView alloc] initWithFrame:CGRectMake(0, 0, 20, 20)];
spinner.activityIndicatorViewStyle = UIActivityIndicatorViewStyleWhite;
[[ZDKSupportView appearance] setSpinner:(id<ZDKSpinnerDelegate>)hcSpinner];


[[ZDKSupportView appearance] setNoResultsContactButtonEdgeInsets:[NSValue valueWithUIEdgeInsets:UIEdgeInsetsMake(12, 22, 12, 22)]];







*/
