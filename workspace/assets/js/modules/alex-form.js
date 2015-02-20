/**
 * @author Deux Huit Huit
 * 
 * Module Site Menu
 */

(function ($, undefined) {
	
	'use strict';
	var win = $(window);
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
	
	var checkOnClickRadio = function (e) {
		var t = $(this);
		var ctn = t.closest('.alex-form-radio-ctn');
		var localRadioBox = $('input[type=radio]', ctn);
		
		var localName = localRadioBox.attr('name');
		var foreignRadio = $('input[type=radio][name='+localName+']');
		
		foreignRadio
			.removeAttr('checked')
			.closest('.alex-form-radio-ctn')
			.removeClass('checked');
		
		localRadioBox.prop('checked', true).attr('checked', 'checked');
		
		ctn.addClass('checked');
		App.mediator.notifyCurrentPage('alexForm.radioClicked');
		
	};
	
	var checkOnClickCheckbox = function (e) {
		var t = $(this);
		var ctn = t.closest('.alex-form-checkbox-ctn');
		var chkBox = $('input[type=checkbox]', ctn);
		var fx = ctn.hasClass('checked') ? 'removeClass' : 'addClass';
		var fx2 = ctn.hasClass('checked') ? 'removeAttr' : 'attr';
		
		ctn[fx]('checked');
		chkBox[fx2]('checked', 'checked');
	};
	
	var checkChar = function (key, data) {
		if (data.element) {
			checkIfChar.call(data.element);
		}
	};
	
	/*********************** INIT */
	var init = function () {
		site.on($.click, 'form .alex-form-checkbox-micro', checkOnClickCheckbox);
		site.on($.click, 'form .alex-form-checkbox-text', checkOnClickCheckbox);
		site.on($.click, 'form .alex-form-radio-ctn', checkOnClickRadio);
		
		site.on('focus', 'form input, form textarea', onFocusIn);
		site.on('blur', 'form input, form textarea', onFocusOut);
		site.on('keyup', 'form input, form textarea', checkIfChar);
	};
	
	var actions = function () {
		return {
			tpltForm : {
				checkChar : checkChar
			}
		};
	};
	
	App.modules.exports('tpltForm', {
		init: init,
		actions: actions
	});
	
})(jQuery);
