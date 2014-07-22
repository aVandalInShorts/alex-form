/**
 * @author Deux Huit Huit
 * 
 * Module Site Menu
 */

(function ($, undefined) {
	
	'use strict';
	var win = $(window);
	var form;
	var formFields; 
	var chkCtn;
	var site = $('#site');
	
	var onFocusOut = function (e) {
		var t = $(this);
		
		t.closest('.alex-form-field').removeClass('gotFocus');
	};
	
	var onFocusIn = function (e) {
		var t = $(this);
		
		t.closest('.alex-form-field').addClass('gotFocus');
	};
	
	var checkIfChar = function (e) {
		var t = $(this);
		var fx = t.val() !== '' ? 'addClass' : 'removeClass';
			
		t.closest('.alex-form-field')[fx]('hasChar');
	};
	
	var checkOnClick = function (e) {
		var t = $(this);
		var ctn = t.closest('.alex-form-checkbox-ctn');
		var chkBox = $('input[type=checkbox]', ctn);
		var fx = ctn.hasClass('checked') ? 'removeClass' : 'addClass';
		var fx2 = ctn.hasClass('checked') ? 'removeAttr' : 'attr';
		
		ctn[fx]('checked');
		chkBox[fx2]('checked', 'checked');
	};
	
	/*********************** INIT */
	var init = function () {
		
		site.on($.click, 'form .alex-form-checkbox-micro', checkOnClick);
		site.on($.click, 'form .alex-form-checkbox-text', checkOnClick);
		
		site.on('focus', 'form input, form textarea', onFocusIn);
		site.on('blur', 'form input, form textarea', onFocusOut);
		site.on('keyup', 'form input, form textarea', checkIfChar);
	};
	
	App.modules.exports('alexForm', {
		init: init
	});
	
})(jQuery);
