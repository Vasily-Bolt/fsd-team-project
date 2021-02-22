	const mobileDeviceWidth = 768;
	let trigger = 'open';
	
	let commonDateRangePickerFieldSetup = {
		language: 'ru',
		showTopbar: true,
		autoclose: false,
		singleMonth: true,
		showShortcuts: false,
		hoveringTooltip: false,
		startOfWeek: 'monday',
		customArrowPrevSymbol: '<div class="datepicker__arrow-container datepicker__arrow-container--left"><div class="elongated-button elongated-button--no-border"><span class="header3 elongated-button__text elongated-button__text--white"></span><span class="elongated-button__arrow-block"><span class="arrow arrow--to-left arrow--purple"></span></span></button></div>',
		customArrowNextSymbol: '<div class="datepicker__arrow-container datepicker__arrow-container--right"><div class="elongated-button elongated-button--no-border"><span class="header3 elongated-button__text elongated-button__text--white"></span><span class="elongated-button__arrow-block"><span class="arrow arrow--to-right arrow--purple"></span></span></button></div>',
		
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
				// console.log( $(this).find('input[id$="InputField"]').attr('id') );
				
				let datepickerIdWeWorkWith = this.id.slice( 15, this.id.indexOf('multiple') + 9 );

				let firstInputValue = $(`#datepicker-${datepickerIdWeWorkWith}-firstInputField`).val();
				let secondInputValue = $(`#datepicker-${datepickerIdWeWorkWith}-secondInputField`).val()
				// let firstInputValue = $('#datepicker' + datepickerIdWeWorkWith + '-firstInputField').val();
				// let secondInputValue = $('#datepicker-' + datepickerIdWeWorkWith + '-secondInputField').val()

				if ( firstInputValue && secondInputValue )
					return firstInputValue + ' to ' + secondInputValue;
				else
					return '';
			},
		setValue: function(s,s1,s2)
			{
				let datepickerIdWeWorkWith = this.id.slice( 15, this.id.indexOf('multiple') + 9 );
				$(`#datepicker-${datepickerIdWeWorkWith}-firstInputField`).val(s1);
				$(`#datepicker-${datepickerIdWeWorkWith}-secondInputField`).val(s2);
				// $('#datepicker-' + datepickerIdWeWorkWith + '-firstInputField').val(s1);
				// $('#datepicker-' + datepickerIdWeWorkWith + '-secondInputField').val(s2);
			}
	});

$(()=> {

	const isMobile = $( window ).width() <= mobileDeviceWidth;
	if (isMobile) { 
		singleFieldDateRangePickerSetup.format = 'YYYY-MM-DD';
		multipleFieldDateRangePickerSetup.format = 'YYYY-MM-DD'
	}
		$( 'div[id^="datepickerHead"]' ).each( function() {
			let DateRangePickerSetup = '';	
			let datepickerIdString = $(this).attr('id');
			if ( datepickerIdString.endsWith('multiple') ) DateRangePickerSetup = multipleFieldDateRangePickerSetup;
			if ( datepickerIdString.endsWith('single') ) DateRangePickerSetup = singleFieldDateRangePickerSetup;
			if ( DateRangePickerSetup != '' ) {
	
				const calendarContainer = $(this).find('div[id$="-container"]').attr('id');

				Object.assign( DateRangePickerSetup, { container: `#${calendarContainer}` } );
				$(this)
					// .find('input[id$="InputField"]')
					.dateRangePicker( DateRangePickerSetup )
					.bind('datepicker-closed', function(){
						trigger = 'open';
					})
					.bind('datepicker-opened', function(event){
						trigger = 'close';
					})
					.bind('datepicker-open', function() {
						// reCalcZindex();
						// $(this).parent().removeClass('border-corners--all');
						// $(this).parent().addClass('border-corners--top');
					})
					.bind('datepicker-close', function() {
						// $(this).parent().removeClass('border-corners--top');
						// $(this).parent().addClass('border-corners--all');
					})
					.bind('datepicker-change',function(event,obj){
						//Можно сделать этот слушатель только по условию (это сэкономит ресурсы... или нет) и триггер за которым будет следить
						//обработчик событий в нужном родительском блоке
						// let divToChangeValue = $(this).parents('div[id^="datepickerHead"]');
						let divToChangeValue = $(this);
						let daysPicked = $(this).data('dateRangePicker').getDaysPicked()-1;
						if ( divToChangeValue.attr('data-days') != daysPicked ) {
							divToChangeValue.attr('data-days', daysPicked );
							divToChangeValue.trigger('datepicker-date-changed');
						}
					});
			}
			if ( isMobile ) {
				$(`#${datepickerIdString}`).find( '.datepicker__calendar-wrapper' ).css('display','none');
				$('input[id*="datepicker"]' ).each(function(){
					inputFieldValue = $(this).attr('value');
					
					if ( datepickerIdString.endsWith('multiple') ) 
						nemInputValue = `${inputFieldValue.substr(6,4)}-${inputFieldValue.substr(3,2)}-${inputFieldValue.substr(0,2)}`;
					// if ( datepickerIdString.endsWith('single') )
					// 	nemInputValue = `2021-05-${inputFieldValue.substr(0,2)}`; //have to setup this
					
					$(this)
					.attr({
						type: 'date',
						value: nemInputValue,
					})
					.css('width','100%')
					.removeAttr('readonly')
					.siblings('div[class*="icon"]').css('display','none');
				});
				
			}
		});
		// if ( isMobile ) {
		// 	inputFieldValue = $('input[id*="datepicker"]' ).attr('value');
		// 	$( 'input[id*="datepicker"]' ).attr({
		// 		type: 'date',
		// 		value: '',
		// 	})
		// 	.css('width','100%')
		// 	.removeAttr('readonly')
		// 	.siblings('div[class*="icon"]').css('display','none');
		// }
		const clearSign = 'очистить';
		const appendSign = 'применить';
		// html кнопок "очистить" и "применить". onclick="return false" отменяет submit формы, в которой эти кнопки валяются
		const clearBlockHTML = `<div style="height: 1.75rem "><button type="button" class="elongated-button elongated-button--no-border" onclick="return false"><span class="header3 elongated-button__text elongated-button__text--purple">${clearSign}</span></button></div>`;
		const appendBlockHTML = `<div style="height: 1.75rem"><button class="elongated-button elongated-button--no-border" onclick="return false"><span class="header3 elongated-button__text elongated-button__text--purple" >${appendSign}</span></button></div>`;
		const buttonBlockHTML = `${clearBlockHTML} ${appendBlockHTML}`;
		const datepickerCalendarFooter = $('.date-picker-wrapper').find('.footer' );
		datepickerCalendarFooter.append(buttonBlockHTML);	
	
		//Обработка событий при нажатии кнопок
		datepickerCalendarFooter.find('button').on('click', function(event) {
			event.stopPropagation();
			const buttonContent= $(this).text();
			const fieldsToClear = $(this).closest( 'div[id^="datepickerHead"]' );

			if ( buttonContent == clearSign ) {
				fieldsToClear.data('dateRangePicker').clear();
				fieldsToClear.data('dateRangePicker').close();
				fieldsToClear.find('input[id$="InputField"]').val('ДД.ММ.ГГГ');
			}
			if ( buttonContent == appendSign ) {
				fieldsToClear.data('dateRangePicker').close();
			}
		});	
	
});