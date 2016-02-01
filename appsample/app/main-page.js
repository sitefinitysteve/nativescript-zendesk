var viewModel = require("./main-view-model");
//var zendesk = require("nativescript-zendesk");

function pageLoaded(args) {
    var appID = "";
    var url = "";
    var clientId = "";
    var isAnon = true; //Only true supported atm
    //zendesk.init(appID, url, clientId, isAnon);
}


exports.onLoadHelpCenter = function(args){
    //zendesk.openHelpCenter();
}

exports.onLoadContact = function(args){
    //zendesk.openContact();
}