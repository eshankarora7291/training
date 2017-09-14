

var ViewModel = function () {
    var self = this;
    self.users = ko.observableArray();
    self.error = ko.observable();
    self.team = ko.observable();

    self.teams = ['MI', 'FE', 'Asset Answers', 'Foundation', 'Reliability'];

    var baseUri = '/api/users/';
    function ajaxHelper(uri, method, data)
    {
        self.error('');
        return $.ajax(
            {
                type: method,
                url: uri,
                dataType: 'json',
                contentType: 'application/json',
                data: data ? JSON.stringify(data) : null

            }).fail(function(jqXHR, textStatus, errorThrown)
            {
                self.error(errorThrown);
            });
    }

    function onError(error) {
        self.error('Error: ' + error.status + ' ' + error.statusText);
    }
    //fetch a list of users by teams and update the view model
    self.getByTeam = function (team) {
        self.team(team);
        ajaxHelper(baseUri + team, 'GET', team).done(function (data) { self.users(data); });
    };
   // self.getByTeam(self.teams[1]);

}
ko.applyBindings(new ViewModel());