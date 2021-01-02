$(()=> {

	let trigger = 'open';




	$( 'div[id^="datepicker"]' ).each( function() {
		$(this).find('input[id$="InputField"]').dateRangePicker(
			{
				format: 'DD MMM',
				language: 'ru',
				singleMonth: true,
				separator: ' - ',
				showShortcuts: false,
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

// moment.updateLocale('ru', {
// 	monthsShort : String['янв','фев','мар','апр','май','июн','июл','авг','сен','окт','ноя','дек']
// });