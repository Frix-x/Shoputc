/* global Router*/

Template.login.events({
    "click #go_register": function(e, t) {

		var email = $('input[name="nu_email"]').val();
		var password = $('input[name="nu_password"]').val();
		var profile = {
            name: $('input[name="nu_name"]').val(),
            lastname: $('input[name="nu_lastname"]').val()
		};

		var user = {
			email: email,
			password: password,
			profile: profile
		};

		Accounts.createUser(user, function(err) {
			if (err) {
				alert(err.reason)
			} else {
				Router.go('home');
			}
		});
	}
});

Template.login.events({
    "click #go_connect": function(e, t) {

		var user = $("input[name='login_email']").val();
		var password = $("input[name='login_password']").val();

		Meteor.loginWithPassword({email: user}, password, function(err) {
			if (err) {
				alert(err.reason)
			}
		});
	}
});

Template.login.events({
	"click #inscription": function(e, t) {
        $('#register').removeClass('hidden');
        $('#login').addClass('hidden');
	}
});

Template.login.events({
	"click #dejauser": function(e, t) {
        $('#login').removeClass('hidden');
        $('#register').addClass('hidden');
	}
});