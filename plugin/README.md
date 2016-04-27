# Zendesk Plugin for the NativeScript framework

## Setup
- Create your Mobile SDK account in zendesk
- https://domain.zendesk.com/agent/admin/mobile_sdk
- Note your appid, url, and clientid for later
- Make sure to activate your help center (if you want it) in your MobileSDK->Customization screen

Add the plugin
```js
var zendeskModule = require("nativescript-zendesk");
var zendesk = null; // Place to store the activated object

//Somewhere on load
zendesk = zendeskModule.init({
    appId: "", //required
    url: "", //required
    clientId: "", //required
	additionalInfo: "Some extra details", //(optional)
	ticketSubject: "Special Ticket Subject", //(optional: Only works on android)
    enableLogging: true, //(optional), bool
    locale: "en-us" //(optional), string
});
```

Open the Help Center
```js
//Loads the main all category view
zendesk.openHelpCenter();

//Loads up a specific category
zendesk.openHelpCenter({
        type: "Category",
        id: 202551987,//CategoryID: Must be a number, not a string
        name: "My Sample Category" //(Optional, sets the titlebar), only used on iOS
    });
    
//Loads up a specific section
zendesk.openHelpCenter({
        type: "Section",
        id: 203791988, //SectionID: Must be a number, not a string
        name: "Some Section" //(Optional, sets the titlebar), only used on iOS
    });
```

Open the Request Contact List, shows previous conversations and ability to create new
```js
zendesk.openContactList();
```

Open the Create new Request screen
```js
zendesk.createContactRequest();
```

## Options
Set identify a user
```js
    zendesk.identifyUser("users id", "some user name", "fake@thisuser.com"); //Optional, defaults to anon if not set
        
    zendesk.createContactRequest();
```

### iOS Theme
[Docs](https://developer.zendesk.com/embeddables/docs/ios/customization)
```

//Create the theme
//All of these properties are optional...and it's all grey, so dont use colors verbatim :)
var myTheme = {
	ZDKSupportView: {
		viewBackgroundColor: "#E0E0E0",
		tableBackgroundColor: "#E0E0E0",
		separatorColor: "#E0E0E0",
	
		//0 = light, 1=dark
		searchBarStyle: 0,
		
		noResults: {
			foundLabelColor: "#E0E0E0",
			foundLabelBackground: "#E0E0E0",
			contactButtonBackground: "#E0E0E0",
			contactButtonTitleColorNormal: "#E0E0E0",
			contactButtonTitleColorHighlighted: "#E0E0E0",
			contactButtonTitleColorDisabled: "#E0E0E0",
			contactButtonBorderColor: "#E0E0E0",	
			foundLabelFont: UIFont.fontWithNameSize("Lato", 16),
			contactButtonBorderWidth: 1.0,
			contactButtonCornerRadius: 4.0
		} 
	},
	ZDKSupportTableViewCell: {
		viewBackgroundColor: "#E0E0E0",
		titleLabelBackground: "#E0E0E0",
		titleLabelColor: "#E0E0E0",
		titleLabelFont: UIFont.fontWithNameSize("Lato", 16)
	},
	ZDKSupportArticleTableViewCell: {
		viewBackgroundColor: "#E0E0E0",
		parentsLabelColor: "#E0E0E0",
		parnetsLabelBackground: "#E0E0E0",
		titleLabelColor: "#E0E0E0",
		labelBackground: "#E0E0E0",
		titleLabelFont: UIFont.fontWithNameSize("Lato", 16),
		articleParentsLabelFont: UIFont.fontWithNameSize("Lato", 16)
	},
	ZDKSupportAttachmentCell: {
		backgroundColor: "#E0E0E0",
		titleLabelBackground: "#E0E0E0",
		titleLabelColor: "#E0E0E0",
		fileSizeLabelBackground: "#E0E0E0",
		fileSizeLabelColor: "#E0E0E0",
		titleLabelFont: UIFont.fontWithNameSize("Lato", 16),
		fileSizeLabelFont: UIFont.fontWithNameSize("Lato", 16)
	},
	ZDKNavigationBar: {
			tintColor: "#E0E0E0",
			barTintColor: "#E0E0E0",
			titleColor: "#E0E0E0",
	}
};
	
//Load the theme
zendesk.setTheme(myTheme);

```

### Android Theme
None of the iOS methods work for android, styling is done in the Manifest/Style file (see the one in the plugin directory)

Example:
By default Zendesk activities are using Theme.AppCompact.Light. If you want to customize this you have to change the android:theme="@style/Theme.AppCompat.Light" for some other style:

```xml
<activity android:name="com.zendesk.sdk.support.SupportActivity" android:theme="@style/@style/ZendeskTheme"/>
```

And add your custom theme to the App_resources/Android/values/styles.xml

```xml
<style name="ZendeskTheme" parent="Theme.AppCompat.Light">
	<!-- THIS is where you can set the accent color -->
	<item name="colorAccent">@color/ns_accent</item>
	<item name="actionBarTheme">@style/MyApp.ActionBarTheme</item>
</style>

<style name="MyApp.ActionBarTheme" parent="@style/ThemeOverlay.AppCompat.ActionBar">       
    <!-- THIS is where you can color the back arrow! -->
    <item name="colorControlNormal">@color/ns_accent</item>
</style>

```

Zendesk documentation is: 

[Docs](https://developer.zendesk.com/embeddables/docs/android/customization)


### Other Notes ###
* [Android SDK Docs](https://zdmobilesdkdocdev.herokuapp.com/android-sdk/)