# Zendesk Plugin for the NativeScript framework

## Setup
- Create your Mobile SDK account in zendesk
- https://<domain>.zendesk.com/agent/admin/mobile_sdk
- Note your appid, url, and clientid for later

## iOS
In your app.js for iOS add in the delegate code
```
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};

var appDelegate = (function (_super) {
    __extends(appDelegate, _super);
    function appDelegate() {
        _super.apply(this, arguments);
    }
    
    appDelegate.prototype.applicationDidFinishLaunchingWithOptions = function (application, launchOptions) {
        global.a0lock = new A0Lock();
        
    };
    
    appDelegate.ObjCProtocols = [UIApplicationDelegate];
    return appDelegate;
})(UIResponder);
application.ios.delegate = appDelegate;
```

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

## Android
NOT FUNCTIONAL YET

## Options
Set locale
```
zendesk.setLocale("fr_CA");
```