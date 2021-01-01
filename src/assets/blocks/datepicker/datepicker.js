$(()=> {

	let trigger = 'open';
	$( 'div[id^="datepicker"]' ).each( function() {
		$(this).find('input[id$="InputField"]').dateRangePicker(
			{
				format: 'DD.MMM',
				singleMonth: true,
				language: 'ru',
				singleDate : false,
				showShortcuts: false,
				showTopbar: true,
				autoClose: false,
			});
	});

//Сделай если закрывается кнопкой (из самого пикера), то надо менять триггер! В плагине есть такая функция

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