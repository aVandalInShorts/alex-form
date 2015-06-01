/**
 * @author Deux Huit Huit
 * 
 * Module Site Menu
 */

(function ($, undefined) {
	
	'use strict';
	var win = $(window);
	var site = $('#site');
	var containerClass = '.alex-form-field-ctn';
	
	var dropsdownOptions = {
		ctn: '.alex-form-dropdown',
		btn: 'button.alex-form-select',
		panel: '.alex-form-dropdown-popup',
		items: 'button',
		selectedClass: 'selected',
		showClass: 'show',
		openClass: 'open',
		closeDelay: 500,
		selected: $.noop,
		slide: false
	};
	
	/* all */
	var focusInput = function (e) {
		var t = $(this);
		var inputs = t.find('input:not([type="hidden"]), button, textarea');
		if (!!inputs.filter(e.target).length) {
			return;
		}
		inputs.eq(0).focus();
	};
	
	/* dropdown */
	var dropdownPositionPanel = function (ctn) {
		var position = 0;
		var panel = $(dropsdownOptions.panel, ctn);
		var selection = $(panel, ctn)
		.find(dropsdownOptions.items + '.' + dropsdownOptions.selectedClass);
		if (!!selection.length) {
			position = selection.position().top;
		}
		panel.css(window.CSS3.prefix('transform', 
				window.CSS3.translate(0, -position)));
	};
	
	var dropdownShowPanel = function (ctn) {
		var panel = $(dropsdownOptions.panel, ctn);
		
		if (!!dropsdownOptions.slide) {
			dropdownPositionPanel(ctn);
		}
		panel.addClass(dropsdownOptions.showClass);
		ctn.addClass(dropsdownOptions.openClass);
	};
	
	var dropdownHidePanel = function (panel) {
		panel.removeClass(dropsdownOptions.showClass);
		panel.closest(dropsdownOptions.ctn).removeClass(dropsdownOptions.openClass);
	};
	
	var dropdownSelect = function (e) {
		var t = $(this);
		var panel = t.closest(dropsdownOptions.panel);
		var ctn = t.closest(dropsdownOptions.ctn);
		var btn = ctn.find(dropsdownOptions.btn);
		var selectedValue = null;
		
		panel.find(dropsdownOptions.items).not(t).removeClass(dropsdownOptions.selectedClass);
		t.addClass(dropsdownOptions.selectedClass);
		
		selectedValue = t.attr('data-value') || null;
		btn.find('>span').text(t.text());
		btn.siblings('input[type=hidden]').attr('value', selectedValue);
		
		panel.addClass('quit');
		if (!!dropsdownOptions.slide) {
			dropdownPositionPanel();
		}
		
		dropsdownOptions.selected(ctn);
		
		dropdownHidePanel(panel);
		
		panel.height();
		panel.removeClass('quit');
		
		ctn.trigger('selected', [selectedValue]);
		
		return window.pd(e);
	};
	
	var dropdownClick = function (e) {
		var ctn = $(this).closest(dropsdownOptions.ctn);
		
		dropdownShowPanel(ctn);
		return window.pd(e);
	};
	
	var dropdownBlur = function (e) {
		var target = $(e.target);
		if (!target.closest(panel).length) {
			dropdownHidePanel();
		}
	};
	
	var dropdownClose = function (e) {
		var t = $(e.target);
		if (!t.closest(containerClass).length) {
			site.find(dropsdownOptions.panel).each(function () {
				dropdownHidePanel($(this));
			});
		}
	};
	
	/* input et radio */
	
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
		site.on($.click, 'form ' + containerClass, focusInput);
		site.on($.click, dropdownClose);
		
		site.on('focus', 'form input, form textarea', onFocusIn);
		site.on('blur', 'form input, form textarea', onFocusOut);
		site.on('keyup', 'form input, form textarea', checkIfChar);
		
		site.on($.click, 'form ' + dropsdownOptions.btn, dropdownClick);
		$(dropsdownOptions.ctn)
			.find(dropsdownOptions.panel)
			.find(dropsdownOptions.items).on($.click, dropdownSelect);
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
