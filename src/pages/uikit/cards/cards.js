$(()=> {
  	//Только для шаблона
	let inlineDateRangePickerSetup = {
		language: 'ru',
		showTopbar: false,
		singleMonth: true,
		showShortcuts: false,
		hoveringTooltip: false,
		startOfWeek: 'monday',
    container: '.datepicker-container',
		inline: true,
		alwaysOpen:true,
		format: 'DD.MM.YYYY',
		separator: ' - ',
		
		customArrowPrevSymbol: '<div style="height: 2.5rem; width: 2.5rem"><button class="elongated-button elongated-button--no-border" type="" value="#"><span class="header3 elongated-button__text elongated-button__text--white"></span><span class="elongated-button__arrow-block"><span class="arrow arrow--to-left arrow--purple"></span></span></button></div>',
		customArrowNextSymbol: '<div style="height: 2.5rem; width: 2.5rem"><button class="elongated-button elongated-button--no-border" type="" value="#"><span class="header3 elongated-button__text elongated-button__text--white"></span><span class="elongated-button__arrow-block"><span class="arrow arrow--to-right arrow--purple"></span></span></button></div>',
  };
  
  $( '#inline-datepickerForTemplate' ).find('input[id$="InputField"]').dateRangePicker( inlineDateRangePickerSetup );
  $( '#inline-datepickerForTemplate' ).find('table.month1').find('div:contains("8")').first().addClass('real-today')
})