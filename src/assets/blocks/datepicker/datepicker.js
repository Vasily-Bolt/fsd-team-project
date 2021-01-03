$(()=> {

	let trigger = 'open';
	
	let commonDateRangePickerFieldSetup = {
		language: 'ru',
		singleMonth: true,
		showShortcuts: false,
		autoClose: false,
	};

	let singleFieldDateRangePickerSetup = Object.assign({}, commonDateRangePickerFieldSetup, {
		format: 'DD MMM',
		separator: ' - ',
	});

	let multipleFieldDateRangePickerSetup = Object.assign({}, commonDateRangePickerFieldSetup, {
		format: 'DD.MM.YYYY',
		separator : ' to ',
		getValue: function()
			{
				let datepickerIdWeWorkWith = this.id.slice( 0, this.id.indexOf('multiple') + 9 );
				// console.log(datepickerIdWeWorkWith);

				let firstInputValue = $('#' + datepickerIdWeWorkWith + 'firstInputField').val();
				let secondInputValue = $('#' + datepickerIdWeWorkWith + 'secondInputField').val()

				if ( firstInputValue && secondInputValue )
					return firstInputValue + ' to ' + secondInputValue;
				else
					return '';
			},
		setValue: function(s,s1,s2)
			{
				let datepickerIdWeWorkWith = this.id.slice( 0, this.id.indexOf('multiple') + 9 );

				$('#' + datepickerIdWeWorkWith + 'firstInputField').val(s1);
				$('#' + datepickerIdWeWorkWith + 'secondInputField').val(s2);
			}
	});

	$( 'div[id^="datepicker"]' ).each( function() {
		let DateRangePickerSetup = '';	
		let datepickerIdString = $(this).attr('id');
		if ( datepickerIdString.endsWith('multiple') ) DateRangePickerSetup = multipleFieldDateRangePickerSetup;
		if ( datepickerIdString.indexOf('single')  != -1 ) DateRangePickerSetup = singleFieldDateRangePickerSetup;
		if ( DateRangePickerSetup != '' ) {
			// console.log('made -  ' + datepickerIdString);
			$(this).find('input[id$="InputField"]')
				.dateRangePicker( DateRangePickerSetup )
				.bind('datepicker-closed', function(){
					trigger = 'open';
				})
				.bind('datepicker-opened', function(){
					trigger = 'close';
				});
		}
	});

//Сделай если закрывается кнопкой (из самого пикера), то надо менять триггер! В плагине есть такая функция

	$( 'div[id^="datepicker"]' ).on('click', function(event) {
		// Тут глюк - при клике на поле инпут два раза вызываются функции get.. setValue (штатная и моя настройка)
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