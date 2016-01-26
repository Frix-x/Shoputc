/* global Router*/
/* global sAlert */

String.prototype.capitalizeFirstLetter = function() {
	return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
};

Template.login.events({
	"click #go_register": function(e, t) {

		var email = $('input[name="nu_email"]').val();
		var password = $('input[name="nu_password"]').val();
		var profile = {
			name: $('input[name="nu_name"]').val().capitalizeFirstLetter(),
			lastname: $('input[name="nu_lastname"]').val().capitalizeFirstLetter(),
			coloc: '',
			debt: 0
		};

		var user = {
			email: email,
			password: password,
			profile: profile
		};

		Accounts.createUser(user, function(err) {
			if (err) {
				sAlert.error(err.reason, {
					effect: 'bouncyflip',
					position: 'top-right',
					onRouteClose: false
				});
			}
			else {
				Router.go('home');
			}
		});
	}
});

Template.login.events({
	"click #go_connect": function(e, t) {

		var user = $("input[name='login_email']").val();
		var password = $("input[name='login_password']").val();

		Meteor.loginWithPassword({
			email: user
		}, password, function(err) {
			if (err) {
				sAlert.error(err.reason, {
					effect: 'bouncyflip',
					position: 'top-right',
					onRouteClose: false
				});
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