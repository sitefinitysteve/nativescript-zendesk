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
	zendesk.themeViewBackgroundColor(color);
	zendesk.themeTableBackgroundColor(color);
	zendesk.themeSeparatorColor(color);
	zendesk.themeNoResultsFoundLabelColor(color);
	zendesk.themeNoResultsFoundLabelBackground(color);
	zendesk.themeNoResultsContactButtonBackground(color);
	zendesk.themeNoResultsContactButtonTitleColorNormal(color);
	zendesk.themeNoResultsContactButtonTitleColorHighlighted(color);
	zendesk.themeNoResultsContactButtonTitleColorDisabled(color);
	zendesk.themeNoResultsContactButtonBorderColor(color);
	zendesk.themeSearchBackgroundColor(color);
	zendesk.themeSearchTitleLabelBackground(color);
	zendesk.themeSearchTitleLabelColor(color);
	zendesk.themeArticleViewBackgroundColor(color);
	zendesk.themeArticleParentsLabelColor(color);
	zendesk.themeArticleParnetsLabelBackground(color);
	zendesk.themeArticleTitleLabelColor(color);
	zendesk.themeArticleLabelBackground(color);
	zendesk.themeAttachmentBackgroundColor(color);
	zendesk.themeAttachmentTitleLabelBackground(color);
	zendesk.themeAttachmentTitleLabelColor(color);
	zendesk.themeAttachmentFileSizeLabelBackground(color);
	zendesk.themeAttachmentFileSizeLabelColor(color);
}
```

### Android Theme
None of the iOS methods work for android, styling is done in the Manifest

[Docs](https://developer.zendesk.com/embeddables/docs/android/customization)