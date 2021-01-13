const { event } = require("jquery");
const currency = '₽';

function integerToStringMyFormat ( valueToConvert ) {
	return valueToConvert.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

$(()=> {
	$('.room-booking').each( function() {
		//Объект всех переменных нужных для подсчета. Содержит метод для расчета
		// let roomBookingObject = {
		// 	blockWithNumberOfDays = $(this).find('span[id$="daysOfResidence"]'),
		// 	pricePerDay = $(this).find('span[id$="pricePerDay"]').attr('data-value'),
		// 	discount = $(this).find('span[id$="discount"]').attr('data-value'),
		// 	servicesPrice = $(this).find('span[id$="servicesPrice"]').attr('data-value'),
		// 	extraServices = $(this).find('span[id$="extraServices"]').attr('data-value'),
		// 	pricePerPeriod = $(this).find('span[id$="pricePerPeriod"]'),
		// 	totalPrice = $(this).find('span[id$="totalPrice"]'),
		// 	datePickerDataSelector = $(this).find('input[id$="InputField"]').data('dateRangePicker'),
		// };

		//Переменная для быстрой смены цифры количества суток		
		let blockWithNumberOfDays = $(this).find('span[id$="daysOfResidence"]');
		
		//Переменная со значением суточной стоимости
		let pricePerDay = $(this).find('span[id$="pricePerDay"]').attr('data-value');

		//Переменная со значением скидки
		let discount = $(this).find('span[id$="discount"]').attr('data-value');
		
		//Переменная со значением сбора за услуги
		let servicesPrice = $(this).find('span[id$="servicesPrice"]').attr('data-value');

		//Переменная со значением сбора дополнительные за услуги
		let extraServices = $(this).find('span[id$="extraServices"]').attr('data-value');

		//Для быстрого доступа к полю с суммой за проживание
		let pricePerPeriod = $(this).find('span[id$="pricePerPeriod"]');
		
		////Для быстрого доступа к полю с общей суммой
		let totalPrice = $(this).find('span[id$="totalPrice"]');

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
		
		let countedTotalPrice = daysOfResidence*pricePerDay;

		pricePerPeriod.html( integerToStringMyFormat( countedTotalPrice ) + currency );
		if ( discount ) countedTotalPrice -= +discount;
		if ( servicesPrice ) countedTotalPrice += +servicesPrice;
		if ( extraServices ) countedTotalPrice += +extraServices;
		totalPrice.html( integerToStringMyFormat( countedTotalPrice + currency ) );

		//Устанавливаем слушатель на trigger datepicker-date-changed. При срабатывании переписываем в DOM
		//количество суток
		$(this).find('div[id^="datepickerHead"').on('datepicker-date-changed', function(){
			daysOfResidence = $(this).attr('data-days');
			blockWithNumberOfDays.html( daysOfResidence );
			
			countedTotalPrice = daysOfResidence*pricePerDay;

			pricePerPeriod.html( integerToStringMyFormat( countedTotalPrice ) + currency );
			if ( discount ) countedTotalPrice -= +discount;
			if ( servicesPrice ) countedTotalPrice += +servicesPrice;
			if ( extraServices ) countedTotalPrice += +extraServices;
			totalPrice.html( integerToStringMyFormat( countedTotalPrice + currency ) );

		}); 


	});
});