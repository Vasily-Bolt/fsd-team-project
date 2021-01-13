const { event } = require("jquery");

$(()=> {
	$('.room-booking').each( function() {
		let blockWithNumberOfDays = $(this).find('span[id$="daysOfResidence"]');
		//Делаем переменную для быстрого доступа к Пикеру
		let datePickerDataSelector = $(this).find('input[id$="InputField"]').data('dateRangePicker');

		//При рендеринге страницы поля заполняются заданными датами, но плагин до первого вызова
		//не подтягивает их и метод getDaysPicked не работает. Потому выковыриваем информацию из
		//ДОМ и после кидаем через метод SetDateRange
		let ResidenceDaysRange = [
			$(this).find('input[id$="multiple-firstInputField"]').val(),
			$(this).find('input[id$="multiple-secondInputField"]').val()
		];
		datePickerDataSelector.setDateRange ( ResidenceDaysRange[0], ResidenceDaysRange[1] );

		//Теперь через метод getDaysPicked получаем количество дней пребывания и сохраняем в переменную
		let daysOfResidence = datePickerDataSelector.getDaysPicked()-1;
		blockWithNumberOfDays.html( daysOfResidence );
		$(this).find('div[id^="datepickerHead"').on('datepicker-date-changed', function(){
			daysOfResidence = $(this).attr('data-days');
			blockWithNumberOfDays.html( daysOfResidence );
		}); 

	});
});