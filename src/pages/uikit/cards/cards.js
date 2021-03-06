$(()=> {
  	//Только для шаблона
	let inlineDateRangePickerSetup = {
		language: 'ru',
		showTopbar: true,
		autoclose: false,
		singleMonth: true,
		showShortcuts: false,
		hoveringTooltip: false,
		startOfWeek: 'monday',
    container: '#datepicker-container',
		inline: true,
		alwaysOpen:true,
		format: 'DD.MM.YYYY',
		separator: ' - ',
		beforeShowDay: function(day){

			let arr = [true, '', ''];
			
			// Это не добавлять в основной блок
			if ( day.getMonth() == 7 && day.getDate() == 8 ){
				arr = [true, 'elongated-button elongated-button--hovered elongated-button__text--white', ''];
			};
			// Конец игнора
			return arr;
		},
		customArrowPrevSymbol: '<div class="datepicker__arrow-container datepicker__arrow-container--left"><button class="elongated-button elongated-button--no-border" type="" value="#"><span class="header3 elongated-button__text elongated-button__text--white"></span><span class="elongated-button__arrow-block"><span class="arrow arrow--to-left arrow--purple"></span></span></button></div>',
		customArrowNextSymbol: '<div class="datepicker__arrow-container datepicker__arrow-container--right"><button class="elongated-button elongated-button--no-border" type="" value="#"><span class="header3 elongated-button__text elongated-button__text--white"></span><span class="elongated-button__arrow-block"><span class="arrow arrow--to-right arrow--purple"></span></span></button></div>',
	};
	
	const clearSign = 'очистить';
	const appendSign = 'применить';
	const clearBlockHTML = `<div style="height: 1.75rem "><button class="elongated-button elongated-button--no-border" type=""><span class="header3 elongated-button__text elongated-button__text--purple">${clearSign}</span></button></div>`;
	const appendBlockHTML = `<div style="height: 1.75rem"><button class="elongated-button elongated-button--no-border" type=""><span class="header3 elongated-button__text elongated-button__text--purple">${appendSign}</span></button></div>`;
	const buttonBlockHTML = `${clearBlockHTML} ${appendBlockHTML}`;
	$( '#inline-datepickerForTemplate' ).find('input[id$="InputField"]').dateRangePicker( inlineDateRangePickerSetup );
	// $( '#inline-datepickerForTemplate' ).find('table.month1').find('div:contains("8")').first().addClass('real-today')
	$( 'div[id$="datepicker-container"]' ).find('.footer' ).append(buttonBlockHTML);

	// $('div.day').hover(function() {
	// 	if ( !$(this).hasClass('checked') && !$(this).hasClass('hovering') )
	// 		$(this).addClass('elongated-button');
	// }, function() {
	// 	$(this).removeClass('elongated-button');
	// });

})