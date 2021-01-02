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
			})
			.bind('datepicker-closed', function(){
				trigger = 'open';
			})
			.bind('datepicker-opened', function(){
				trigger = 'close';
			});
	});

//Сделай если закрывается кнопкой (из самого пикера), то надо менять триггер! В плагине есть такая функция

	$( 'div[id^="datepicker"]' ).click( function(event) {
		event.stopPropagation();
		if (trigger == 'open') {
			$(this).find('input[id$="InputField"]').data('dateRangePicker').open();
		} else {
			$(this).find('input[id$="InputField"]').data('dateRangePicker').close();
		}
	});

});

// moment.updateLocale('ru', {
// 	monthsShort : String['янв','фев','мар','апр','май','июн','июл','авг','сен','окт','ноя','дек']
// });