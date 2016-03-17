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

    zendesk = zendeskModule.init({
        appId: appID, //required
        url: url, //required
        clientId: clientId, //required
        enableLogging: true
    });
}


exports.onLoadHelpCenter = function(args){
    if(viewModel.hasAuthSet())
        zendesk.identifyUser(viewModel.id, viewModel.name, viewModel.email);
        
    zendesk.openHelpCenter();
}

exports.onLoadHelpCenterCategory = function (args) {
   if(viewModel.hasAuthSet())
        zendesk.identifyUser(viewModel.id, viewModel.name, viewModel.email);
        
    zendesk.openHelpCenter({
        type: "Category",
        id: 202551987,
        name: "My Sample Category"
    });
}

exports.onLoadHelpCenterSection = function (args) {
   if(viewModel.hasAuthSet())
        zendesk.identifyUser(viewModel.id, viewModel.name, viewModel.email);
        
    zendesk.openHelpCenter({
        type: "Section",
        id: 203791988,
        name: "Some Section"
    });
}

exports.onCreateContact = function(args){
    if(viewModel.hasAuthSet())
        zendesk.identifyUser(viewModel.id, viewModel.name, viewModel.email);
        
    zendesk.createContactRequest();
}

exports.onLoadContact = function(args){
    if(viewModel.hasAuthSet())
        zendesk.identifyUser(viewModel.id, viewModel.name, viewModel.email);
 
    zendesk.openContactList();
}

