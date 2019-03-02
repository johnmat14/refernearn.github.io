// JavaScript Document
$(document).on('click', '.getreferralId', function (ev) {
	"use strict";
	ev.preventDefault();
	if (validateRegEmail($('#email').val())) {
		makeHttpCall();
	}
});

$(document).on('keypress', '#email', function () {
	"use strict";
	validateRegEmail($(this).val());
});

function validateRegEmail(email) {
	"use strict";
	var emailregex = new RegExp('^[a-z][a-zA-Z0-9_]*(\.[a-zA-Z][a-zA-Z0-9_]*)?@[a-z0-9][a-zA-Z-0-9]*\.[a-z]+(\.[a-z]+)$');
	if (emailregex.test(email) === true) {
		$('.emailError').text('');
		return true;
	} else {
		$('.emailError').text('Please Enter Valid Email Id');
		return false;
	}
}

function makeHttpCall() {
	"use strict";
	$('.emailError').text('');
	$('.EmailNotExists').text('');
	var xhrReq = $.post(base_url+'/home/getReferal', {'email': $('#email').val()}, function (success) {
		if (success.status === 'fail' && success.action === 'stop') {
			$('.emailError').text('');
			$('.EmailNotExists').html(success.message);
		} else if (success.status === 'success' && success.action === 'proceed') {
			$('#referalForm').submit();
		}
	}, 'json');
	xhrReq.fail(function () {
		$('.EmailNotExists').text('');
		$('.emailError').text('Oops..! Some Error Occurred Please try after sometime.');
	});
}