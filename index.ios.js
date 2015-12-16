var frameModule = require("ui/frame");
var colorModule = require("color");
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
					if(isAnonymous){
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

// #####################################################
// ## THEME ZONE, WHERE THE THEME GOES TO PARTY
// #####################################################
exports.theme = function(args){
	debugger;
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
			if(args.ZDKSupportView.noResultsFoundLabelColor){
				ZDKSupportView.appearance().noResultsFoundLabelColor = getColor(args.ZDKSupportView.noResultsFoundLabelColor);	
			}
			if(args.ZDKSupportView.noResultsFoundLabelBackground){
				ZDKSupportView.appearance().noResultsFoundLabelBackground = getColor(args.ZDKSupportView.noResultsFoundLabelBackground);	
			}
			if(args.ZDKSupportView.noResultsContactButtonBackground){
				ZDKSupportView.appearance().noResultsContactButtonBackground = getColor(args.ZDKSupportView.noResultsContactButtonBackground);	
			}
			if(args.ZDKSupportView.noResultsContactButtonTitleColorNormal){
				ZDKSupportView.appearance().noResultsContactButtonTitleColorNormal = getColor(args.ZDKSupportView.noResultsContactButtonTitleColorNormal);	
			}
			if(args.ZDKSupportView.noResultsContactButtonTitleColorHighlighted){
				ZDKSupportView.appearance().noResultsContactButtonTitleColorHighlighted = getColor(args.ZDKSupportView.noResultsContactButtonTitleColorHighlighted);	
			}
			if(args.ZDKSupportView.noResultsContactButtonTitleColorDisabled){
				ZDKSupportView.appearance().noResultsContactButtonTitleColorDisabled = getColor(args.ZDKSupportView.noResultsContactButtonTitleColorDisabled);	
			}
			if(args.ZDKSupportView.noResultsContactButtonBorderColor){
				ZDKSupportView.appearance().noResultsContactButtonBorderColor = getColor(args.ZDKSupportView.noResultsContactButtonBorderColor);	
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
		}
	}
}

// #####################################################
// ## METHODS
// #####################################################
function loadAnonUser(){
	var anonymousIdentity = new ZDKAnonymousIdentity();
	ZDKConfig.instance().setUserIdentity(anonymousIdentity);
}

function getColor(color){
	return new colorModule.Color(color).ios;
}



//To Impliment
/*
// style the help center
UIActivityIndicatorView *hcSpinner = [[UIActivityIndicatorView alloc] initWithFrame:CGRectMake(0, 0, 20, 20)];
spinner.activityIndicatorViewStyle = UIActivityIndicatorViewStyleWhite;
[[ZDKSupportView appearance] setSpinner:(id<ZDKSpinnerDelegate>)hcSpinner];

[[ZDKSupportView appearance] setSearchBarStyle:@(UIBarStyleBlack)];
[[ZDKSupportView appearance] setNoResultsFoundLabelFont:[UIFont systemFontOfSize:14.0f]];
[[ZDKSupportView appearance] setNoResultsContactButtonBorderWidth:@1.0f];
[[ZDKSupportView appearance] setNoResultsContactButtonCornerRadius:@4.0f];
[[ZDKSupportView appearance] setNoResultsFoundLabelFont:[UIFont systemFontOfSize:14.0f]];
[[ZDKSupportView appearance] setNoResultsContactButtonEdgeInsets:[NSValue valueWithUIEdgeInsets:UIEdgeInsetsMake(12, 22, 12, 22)]];

//HC search cell
[[ZDKSupportTableViewCell appearance] setTitleLabelFont:[UIFont systemFontOfSize:18.0f]];

[[ZDKSupportArticleTableViewCell appearance] setTitleLabelFont:[UIFont systemFontOfSize:18.0f]];
[[ZDKSupportArticleTableViewCell appearance] setArticleParentsLabelFont:[UIFont systemFontOfSize:12.0f]];



[[ZDKSupportAttachmentCell appearance] setTitleLabelFont:[UIFont systemFontOfSize:12.0f]];

[[ZDKSupportAttachmentCell appearance] setFileSizeLabelFont:[UIFont systemFontOfSize:12.0f]];
*/
