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
exports.themeViewBackgroundColor = function(color){
	ZDKSupportView.appearance().viewBackgroundColor = getColor(color);
}

exports.themeTableBackgroundColor = function(color){
	ZDKSupportView.appearance().tableBackgroundColor = getColor(color);
}

exports.themeSeparatorColor = function(color){
	ZDKSupportView.appearance().separatorColor = getColor(color);
}

exports.themeNoResultsFoundLabelColor = function(color){
	ZDKSupportView.appearance().noResultsFoundLabelColor = getColor(color);
}

exports.themeNoResultsFoundLabelBackground = function(color){
	ZDKSupportView.appearance().noResultsFoundLabelBackground = getColor(color);
}

exports.themeNoResultsContactButtonBackground = function(color){
	ZDKSupportView.appearance().noResultsContactButtonBackground = getColor(color);
}

exports.themeNoResultsContactButtonTitleColorNormal = function(color){
	ZDKSupportView.appearance().noResultsContactButtonTitleColorNormal = getColor(color);
}

exports.themeNoResultsContactButtonTitleColorHighlighted = function(color){
	ZDKSupportView.appearance().noResultsContactButtonTitleColorHighlighted = getColor(color);
}

exports.themeNoResultsContactButtonTitleColorDisabled = function(color){
	ZDKSupportView.appearance().noResultsContactButtonTitleColorDisabled = getColor(color);
}

exports.themeNoResultsContactButtonBorderColor = function(color){
	ZDKSupportView.appearance().noResultsContactButtonBorderColor = getColor(color);
}

exports.themeSearchBackgroundColor = function(color){
	ZDKSupportTableViewCell.appearance().viewBackgroundColor = getColor(color);
}

exports.themeSearchTitleLabelBackground = function(color){
	ZDKSupportTableViewCell.appearance().titleLabelBackground = getColor(color);
}

exports.themeSearchTitleLabelColor = function(color){
	ZDKSupportTableViewCell.appearance().titleLabelColor = getColor(color);
}

exports.themeArticleViewBackgroundColor = function(color){
	ZDKSupportArticleTableViewCell.appearance().viewBackgroundColor = getColor(color);
}

exports.themeArticleParentsLabelColor = function(color){
	ZDKSupportArticleTableViewCell.appearance().parentsLabelColor = getColor(color);
}

// Typo in the zen api, or docs?
exports.themeArticleParnetsLabelBackground = function(color){
	ZDKSupportArticleTableViewCell.appearance().parnetsLabelBackground = getColor(color);
}

exports.themeArticleTitleLabelColor = function(color){
	ZDKSupportArticleTableViewCell.appearance().titleLabelColor = getColor(color);
}

exports.themeArticleLabelBackground = function(color){
	ZDKSupportArticleTableViewCell.appearance().labelBackground = getColor(color);
}

exports.themeAttachmentBackgroundColor = function(color){
	ZDKSupportAttachmentCell.appearance().backgroundColor = getColor(color);
}

exports.themeAttachmentTitleLabelBackground = function(color){
	ZDKSupportAttachmentCell.appearance().titleLabelBackground = getColor(color);
}

exports.themeAttachmentTitleLabelColor = function(color){
	ZDKSupportAttachmentCell.appearance().titleLabelColor = getColor(color);
}

exports.themeAttachmentFileSizeLabelBackground = function(color){
	ZDKSupportAttachmentCell.appearance().fileSizeLabelBackground = getColor(color);
}

exports.themeAttachmentFileSizeLabelColor = function(color){
	ZDKSupportAttachmentCell.appearance().fileSizeLabelColor = getColor(color);
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
