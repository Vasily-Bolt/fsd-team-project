function change(objName, min, max, step) {
	let obj = $(objName).siblings('.myInput').val();
	let tmp = +obj + step;
	let reverseButtonType = '';

// Создаем переменную с id кнопки противоположного значения
	if ( objName.indexOf('Pls') == -1 ) 
		reverseButtonType = 'Pls';
	else 
		reverseButtonType = 'Mns';

	let reverseButton = objName.slice(0, objName.length-3) + reverseButtonType;
  if (tmp < min) tmp = min;
	if (tmp > max) tmp = max;

// Проверка: если максимальное или минимальное значение, то соответствующая кнопка "потухает"
	if (tmp == min) $(objName).removeClass('incdecField__input-button--is-available').addClass('incdecField__input-button--not-available');
	if (tmp == max) $(objName).removeClass('incdecField__input-button--is-available').addClass('incdecField__input-button--not-available');

// Проверка: если после изменения значения, оно перестает быть максимальным или минимальным, то возвращаем у "потухшей" кнопки видимость
	if ( (tmp != min && tmp != max) || ( $(reverseButton).hasClass('incdecField__input-button--not-available') ) ) {
		$(reverseButton).removeClass('incdecField__input-button--not-available').addClass('incdecField__input-button--is-available');
	};
	
	$(objName).siblings('.myInput').val(tmp);
};

$(()=> {
	
	let stopDoingThis = false;
	
	$('.myInput').each( function() {
		// Значение атрибута id поля с классом myInput - там будем искать id поля с заглавным текстом Dropdown 
		// (зашивается автоматически и берется из класса dropdownName объекта переданного в миксин dropdown counter)
		let idToSearchIn = $(this).attr('id'); 
		// Найдем значение класса id для поиска поля с заглавным тестом
		let idToSearch = idToSearchIn.slice( idToSearchIn.lastIndexOf(' ')+1 );
		// Нашли поле span - поле с заглавным текстом Dropdown
		let totalIdtoSearchStr = $('#'+idToSearch).children('span');
		// Длина заглавного текста.
		let HeaderValueLength = totalIdtoSearchStr.html().length;
		// Определили переменную в которую будем добавлять строку нужного склонения в зависимости от цифры
		let MyInputCounterName = '';

		// Определение строки в зависимости от цифры. Данные берем из data поля с классом myInput и текущим id, 
		// туда данные зашиваются из valueDependendText, объекта переданного в миксин dropdown counter
		switch ( +$(this).val() ) {
			case 1	: MyInputCounterName = $(this).attr('data-one'); break;
			case 2	: 
			case 3	: 
			case 4	: MyInputCounterName = $(this).attr('data-two-three-four'); break;
			case 0	: MyInputCounterName = $(this).attr('data-zero-others');
			default	: MyInputCounterName = $(this).attr('data-zero-others'); break;
		}

		// Если длина заглавного текста больше 0 и меньше 15 (выбранное мной максимальное значение), то надо поставить
		// запятую между значениями, (чтобы в начале и после последнего ее не было)
		if ( HeaderValueLength > 0 && HeaderValueLength < 15 ) {
			stopDoingThis = false;
			totalIdtoSearchStr.html( totalIdtoSearchStr.html() + ', ' );
		}
		// Если длина заглавного текста меньше выбранного мной максимального значения, то добавляем значение строки и цифру
		if ( HeaderValueLength < 15 ) totalIdtoSearchStr.html( totalIdtoSearchStr.html() + $(this).val() + ' ' + MyInputCounterName );
		// Если длина заглавного текста больше выбранного мной макс. значения, то ставим троеточие.
		// Однако сначала проверяем, не стоят ли они уже !!! Надо убрать переменную и сделать просто проверку на вхождение троеточия
		if ( HeaderValueLength > 15 && !stopDoingThis ) {
			stopDoingThis = true;
			totalIdtoSearchStr.html( totalIdtoSearchStr.html() + '...' );
		};
	});

	//Если кнопку нажали, делаем пересчет и меняем цифру
	$('.btnMns').click(function(){
			let myId = '#'+$(this).attr('id');
			change(myId, 0, 5, -1);
		});

		$('.btnPls').click(function(){
			let myId = '#'+$(this).attr('id');
			change(myId, 0, 5, 1);
		});
} );
