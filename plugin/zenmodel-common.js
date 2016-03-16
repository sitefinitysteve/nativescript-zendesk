

exports.account = {
	appId: "",
	url: "",
	clientId: "",
    ticketSubject: "",
    loggingEnabled: false,
    initialized: false,
    anonymous: true,
    locale: null
}

exports.user = {
  id: "",
  name: "",
  email: "",
  isInitalized: function(){
      return (this.id !== "" && this.name !== "" && this.email !== "") ? true : false;
  }
}