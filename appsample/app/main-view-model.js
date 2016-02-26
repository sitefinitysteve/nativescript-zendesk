var viewModel;
var observable = require('data/observable').Observable;

viewModel = new observable({
    id: "",
    name: "",
    email: "",
    hasAuthSet: function(){
        return (this.id !== "" && this.name !== "" && this.email !== "") ? true : false;
    }
});

module.exports = viewModel;