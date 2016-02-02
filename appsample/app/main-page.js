var viewModel = require("./main-view-model");
var zendesk = require("nativescript-zendesk");

var appID = "2cae45724539d7d7c8561aabfa133d39801e98a4ce1440a6";
var url = "https://nativescript.zendesk.com";
var clientId = "mobile_sdk_client_f86398df9a1b3f165f56";

function pageLoaded(args) {

}


exports.onLoadHelpCenter = function(args){
    zendesk.init(appID, url, clientId).openHelpCenter();
    //zendesk;
}

exports.onLoadContact = function(args){
    zendesk.init(appID, url, clientId).openContact();
    //zendesk;
}

function init(){

    
}