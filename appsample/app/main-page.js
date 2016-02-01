var viewModel = require("./main-view-model");
var zendesk = require("nativescript-zendesk");

function pageLoaded(args) {

}


exports.onLoadHelpCenter = function(args){
    init();
    zendesk.openHelpCenter();
}

exports.onLoadContact = function(args){
    init();
    zendesk.openContact();
}

function init(){
    var appID = "";
    var url = "";
    var clientId = "";
    var isAnon = true; //Only true supported atm
    zendesk.init(appID, url, clientId, isAnon);
}