# Zendesk Plugin for the NativeScript framework

## Setup
- Create your Mobile SDK account in zendesk
- https://<domain>.zendesk.com/agent/admin/mobile_sdk
- Note your appid, url, and clientid for later

Add the plugin
```
var zendesk = require("nativescript-zendesk");
```
Initalize the plugin
```
zendesk.init(<appid>,<url>,<clientid>, true);
```

Open the Help Center
```
zendesk.openHelpCenter();
```

## Options
Set locale
```
zendesk.setLocale("fr_CA");
```

## Styling iOS
```
//Example
zendesk.themeSeparatorColor("#666666");

//Now open your helpcenter
zendesk.openHelpCenter();     
```

### iOS Theme
[Docs](https://developer.zendesk.com/embeddables/docs/ios/customization)
```
var color = "#666666";

var app = require("application");

if(app.ios){
	//Create the theme
	//All of these propertoes are optional...
	var myTheme = {
			ZDKSupportView: {
				viewBackgroundColor: "#E0E0E0",
				tableBackgroundColor: "#E0E0E0",
				separatorColor: "#E0E0E0",
				noResultsFoundLabelColor: "#E0E0E0",
				noResultsFoundLabelBackground: ""#E0E0E0,
				noResultsContactButtonBackground: "#E0E0E0",
				noResultsContactButtonTitleColorNormal: "#E0E0E0",
				noResultsContactButtonTitleColorHighlighted: "#E0E0E0",
				noResultsContactButtonTitleColorDisabled: "#E0E0E0",
				noResultsContactButtonBorderColor: "#E0E0E0"
			},
			ZDKSupportTableViewCell: {
				viewBackgroundColor: "#E0E0E0",
				titleLabelBackground: "#E0E0E0",
				titleLabelColor: "#E0E0E0"
			},
			ZDKSupportArticleTableViewCell: {
				viewBackgroundColor: "#E0E0E0",
				parentsLabelColor: "#E0E0E0",
				parnetsLabelBackground: "#E0E0E0",
				titleLabelColor: "#E0E0E0",
				labelBackground: "#E0E0E0"
			},
			ZDKSupportAttachmentCell: {
				backgroundColor: "#E0E0E0",
				titleLabelBackground: "#E0E0E0",
				titleLabelColor: "#E0E0E0",
				fileSizeLabelBackground: "#E0E0E0",
				fileSizeLabelColor: "#E0E0E0"
			}
		};
		
	//Load the theme
	zendesk.theme(myTheme);
}
```

### Android Theme
None of the iOS methods work for android, styling is done in the Manifest

[Docs](https://developer.zendesk.com/embeddables/docs/android/customization)