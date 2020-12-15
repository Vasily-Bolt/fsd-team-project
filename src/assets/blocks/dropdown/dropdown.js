// Функция изменения текста заголовка поля Drowdown
// function DropdownHeaderTextCheck(inThis, firstTime){
// 	console.log(inThis);
// 	// $('.myInput').each( function() {
// 		// Значение атрибута id поля с классом myInput - там будем искать id поля с заглавным текстом Dropdown 
// 		// (зашивается автоматически и берется из класса dropdownName объекта переданного в миксин dropdown counter)
// 		let idToSearchIn = $(inThis).attr('id');
// 		console.log( 'in DropdownHeaderTextCheck ' + idToSearchIn );
// 		// Найдем значение класса id для поиска поля с заглавным тестом
// 		let idToSearch = idToSearchIn.slice( idToSearchIn.lastIndexOf(' ')+1 );
// 		console.log( 'in DropdownHeaderTextCheck ' + idToSearch );
// 		// Нашли поле span - поле с заглавным текстом Dropdown
// 		let totalIdtoSearchStr = $('#'+idToSearch).children('span');
// 		console.log( 'in DropdownHeaderTextCheck ' + totalIdtoSearchStr );
// 		// Длина заглавного текста.
// 		if (!firstTime) totalIdtoSearchStr.html( '' );
// 		let HeaderValueLength = totalIdtoSearchStr.html().length;
// 		console.log( 'in DropdownHeaderTextCheck ' + HeaderValueLength );
// 		// Определили переменную в которую будем добавлять строку нужного склонения в зависимости от цифры
// 		let myInputCounterName = '';
// 		// Определение строки в зависимости от цифры. Данные берем из data поля с классом myInput и текущим id, 
// 		// туда данные зашиваются из valueDependendText, объекта переданного в миксин dropdown counter
// 		switch ( +$(inThis).val() ) {
// 			case 1	: myInputCounterName = $(inThis).attr('data-one'); break;
// 			case 2	: 
// 			case 3	: 
// 			case 4	: myInputCounterName = $(inThis).attr('data-two-three-four'); break;
// 			case 0	: myInputCounterName = $(inThis).attr('data-zero-others');
// 			default	: myInputCounterName = $(inThis).attr('data-zero-others'); break;
// 		}

// 		// Если длина заглавного текста больше 0 и меньше 15 (выбранное мной максимальное значение), то надо поставить
// 		// запятую между значениями, (чтобы в начале и после последнего ее не было)
// 		if ( HeaderValueLength > 0 && HeaderValueLength < 15 ) {
// 			totalIdtoSearchStr.html( totalIdtoSearchStr.html() + ', ' );
// 		}
// 		// Если длина заглавного текста меньше выбранного мной максимального значения, то добавляем значение строки и цифру
// 		if ( HeaderValueLength < 15 ) totalIdtoSearchStr.html( totalIdtoSearchStr.html() + $(inThis).val() + ' ' + myInputCounterName );
// 		// Если длина заглавного текста больше выбранного мной макс. значения, то ставим троеточие.
// 		// Однако сначала проверяем, не стоят ли они уже 
// 		if ( HeaderValueLength > 15 && totalIdtoSearchStr.html().indexOf('...') == -1 ) {
// 			totalIdtoSearchStr.html( totalIdtoSearchStr.html() + '...' );
// 		};
// 	// });
// };



// Функция ищет обертку дропдоуна по идентификатору.
// Необходимо найти все значения всех полей внутри обертки с 
function dropdownHeaderTextCheck(dropdownHeaderId){
	let titleDropdownHeader = '';
	let myInputCounterName = '';

	// Если длина заглавного текста больше 0 и меньше 15 (выбранное мной максимальное значение), то надо поставить
	// запятую между значениями, (чтобы в начале и после последнего ее не было)
	// Если длина заглавного текста меньше выбранного мной максимального значения, то добавляем значение строки и цифру
	// Если длина заглавного текста больше выбранного мной макс. значения, то ставим троеточие.
	// Однако сначала проверяем, не стоят ли они уже 
	$( '#' + dropdownHeaderId ).find('.incdecField__myInput').each( function () {
		let activeFieldWeWorkWith = $(this);

		// Определение строки в зависимости от цифры. Данные берем из data поля с классом myInput и текущим id, 
		// туда данные зашиваются из valueDependendText, объекта переданного в миксин dropdown counter
		console.log( activeFieldWeWorkWith.val() );
		switch ( +activeFieldWeWorkWith.val() ) {
			case 1	: myInputCounterName = activeFieldWeWorkWith.attr('data-one'); break;
			case 2	:  
			case 3	:  
			case 4	: myInputCounterName = activeFieldWeWorkWith.attr('data-two-three-four'); break;
			case 0	: 
			default	: myInputCounterName = activeFieldWeWorkWith.attr('data-zero-others'); break;
		};

		if ( titleDropdownHeader.length < 15 ) {
			if ( titleDropdownHeader.length > 0 )
				titleDropdownHeader += ', ';
			titleDropdownHeader += activeFieldWeWorkWith.val() +
			' ' + myInputCounterName;
		}
		else {
			if ( titleDropdownHeader.indexOf('...') == -1 ) titleDropdownHeader += '...';
		}
	});
	console.log( titleDropdownHeader );
	$( '#' + dropdownHeaderId ).find('span').html( titleDropdownHeader );
};

$(()=> {
	$( '.dropdown' ).each( function () {
		dropdownHeaderTextCheck( $(this).attr('id') );
	});

	$( '.incdecField__input-button' ).click( function() {
		let stringToSearchForId = $(this).siblings('.incdecField__myInput').attr('id');
		console.log ( stringToSearchForId );
		let idToSearch = stringToSearchForId.slice( stringToSearchForId.lastIndexOf(' ')+1 );
		console.log ( idToSearch );
		dropdownHeaderTextCheck( idToSearch );
	});
} );
