var viewModel = require("./main-view-model");
var zendeskModule = require("nativescript-zendesk");
var zendesk = null;
var page = null; 

var appID = "2cae45724539d7d7c8561aabfa133d39801e98a4ce1440a6";
var url = "https://nativescript.zendesk.com";
var clientId = "mobile_sdk_client_f86398df9a1b3f165f56";


exports.pageLoaded = function(args) {
    page = args.object;
    page.bindingContext = viewModel;
    zendesk = zendeskModule.init(appID, url, clientId);
}


exports.onLoadHelpCenter = function(args){
    if(viewModel.hasAuthSet())
        zendesk.identifyUser(viewModel.id, viewModel.name, viewModel.email);
        
    zendesk.openHelpCenter();
}

exports.onLoadContact = function(args){
    if(viewModel.hasAuthSet())
        zendesk.identifyUser(viewModel.id, viewModel.name, viewModel.email);
        
    zendesk.openContact();
}

