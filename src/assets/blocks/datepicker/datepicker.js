$(()=> {

	let trigger = 'open';
	
	let commonDateRangePickerFieldSetup = {
		language: 'ru',
		showTopbar: false,
		singleMonth: true,
		showShortcuts: false,
		hoveringTooltip: false,
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
	
	$( 'div[id^="datepickerHead"]' ).each( function() {
		// $(this).attr('data-days','')
		let DateRangePickerSetup = '';	
		let datepickerIdString = $(this).attr('id');
		if ( datepickerIdString.endsWith('multiple') ) DateRangePickerSetup = multipleFieldDateRangePickerSetup;
		if ( datepickerIdString.indexOf('single')  != -1 ) DateRangePickerSetup = singleFieldDateRangePickerSetup;
		if ( DateRangePickerSetup != '' ) {
			$(this).find('input[id$="InputField"]')
				.dateRangePicker( DateRangePickerSetup )
				.bind('datepicker-closed', function(){
					trigger = 'open';
				})
				.bind('datepicker-opened', function(){
					trigger = 'close';
				})
				.bind('datepicker-change',function(event,obj){
					//Можно сделать этот слушатель только по условию (это съэкономит ресурсы... или нет) и триггер за которым будет следить
					//обработчик событий в нужном родительском блоке
					let divToChangeValue = $(this).parents('div[id^="datepickerHead"]');
					let daysPicked = $(this).data('dateRangePicker').getDaysPicked()-1;
					if ( divToChangeValue.attr('data-days') != daysPicked ) {
						divToChangeValue.attr('data-days', daysPicked );
						divToChangeValue.trigger('datepicker-date-changed');
					}
				});
		}
	});

//Сделай если закрывается кнопкой (из самого пикера), то надо менять триггер! В плагине есть такая функция

	$( 'div[id^="datepickerHead"]' ).on('click', function(event) {
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