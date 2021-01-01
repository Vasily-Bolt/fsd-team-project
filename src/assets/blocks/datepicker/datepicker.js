$(()=> {
	$( 'div[id^="datepicker"]' ).each( function() {
		$(this).find('input[id$="InputField"]').dateRangePicker(
			{
				autoClose: false,
				singleDate : true,
				showShortcuts: false,
			});
			$(this).find('input[id$="InputField"]').data('dateRangePicker').open()
	});

	$( 'div[id^="datepicker"]' ).find('.field-template__icon-field').click( function() {
		$(this).siblings('input[id$="InputField"]').data('dateRangePicker').open();
	});
});