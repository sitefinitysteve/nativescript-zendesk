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