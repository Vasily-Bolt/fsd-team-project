// const { event } = require("jquery");


function integerToStringMyFormat ( valueToConvert ) {
	return valueToConvert.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

$(()=> {
	const currency = '₽';
	
	$('.room-booking').each( function() {
		//Объект всех переменных нужных для подсчета. Содержит метод для расчета
		let roomBookingObject = {
			blockWithNumberOfDays: 	$(this).find('span[id$="daysOfResidence"]'),//Для быстрой смены цифры количества суток
			pricePerDay: 						$(this).find('span[id$="pricePerDay"]').attr('data-value'),//Со значением суточной стоимости
			discount: 							$(this).find('span[id$="discount"]').attr('data-value'),//Со значением скидки
			servicesPrice: 					$(this).find('span[id$="servicesPrice"]').attr('data-value'),//Со значением сбора за услуги
			extraServices: 					$(this).find('span[id$="extraServices"]').attr('data-value'),//Со значением сбора дополнительные за услуги
			pricePerPeriod: 				$(this).find('span[id$="pricePerPeriod"]'),//Для быстрого доступа к полю с суммой за проживание
			totalPrice: 						$(this).find('span[id$="totalPrice"]'),//Для быстрого доступа к полю с общей суммой
			// datePickerDataSelector:	$(this).find('input[id$="InputField"]').data('dateRangePicker'),//Для быстрого доступа к Пикеру
			datePickerDataSelector:	$(this).find('div[id^="datepickerHead"]').data('dateRangePicker'),//Для быстрого доступа к Пикеру
			daysOfResidence:				function() {
				//через метод getDaysPicked плагина datepickerselector получаем количество дней пребывания и сохраняем в переменную
				let howMuchDays = this.datePickerDataSelector.getDaysPicked();
				if ( howMuchDays == 1) return howMuchDays;
				else return howMuchDays - 1;
			},
			recalculateValues:			function () {
				howMuchDays = this.daysOfResidence();
				this.blockWithNumberOfDays.html( howMuchDays );
				let total = howMuchDays*this.pricePerDay

				this.pricePerPeriod.html( integerToStringMyFormat( total ) + currency );

				if ( this.discount ) total -= +this.discount;
				if ( this.servicesPrice ) total += +this.servicesPrice;
				if ( this.extraServices ) total += +this.extraServices;

				this.totalPrice.html( integerToStringMyFormat( total + currency ) );
			}
		};

		//При рендеринге страницы поля заполняются заданными датами, но плагин до первого вызова
		//не подтягивает их и метод getDaysPicked не работает. Потому выковыриваем информацию из
		//ДОМ и после кидаем через метод SetDateRange
		let ResidenceDaysRange = [
			$(this).find('input[id$="multiple-firstInputField"]').val(),
			$(this).find('input[id$="multiple-secondInputField"]').val()
		];
		roomBookingObject.datePickerDataSelector.setDateRange ( ResidenceDaysRange[0], ResidenceDaysRange[1] );

		//Устанавливаем слушатель на trigger datepicker-date-changed. При срабатывании переписываем в DOM
		//количество суток
		roomBookingObject.recalculateValues();

		$(this).find('div[id^="datepickerHead"').on('datepicker-date-changed', function(){
			roomBookingObject.recalculateValues();
		}); 


	});
});