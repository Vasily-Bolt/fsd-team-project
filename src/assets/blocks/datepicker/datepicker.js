$(()=> {
	let trigger = 'open';
	$( 'div[id^="datepicker"]' ).each( function() {
		$(this).find('input[id$="InputField"]').dateRangePicker(
			{
				format: 'DD.MM.YYYY',
				autoClose: false,
				singleDate : true,
				showShortcuts: false,
			});
	});
	$( 'div[id^="datepicker"]' ).click( function(event) {
		event.stopPropagation();
		if (trigger == 'open') {
			trigger = 'close';
			$(this).find('input[id$="InputField"]').data('dateRangePicker').open();
		} else {
			trigger = 'open';
			$(this).find('input[id$="InputField"]').data('dateRangePicker').close();
		}
	});
});