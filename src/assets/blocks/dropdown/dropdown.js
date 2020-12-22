// Функция ищет обертку дропдоуна по идентификатору.
// Необходимо найти все значения всех полей внутри обертки с 
function dropdownHeaderTextCheck( dropdownHeaderId ){
	let titleDropdownHeader = '';
	let myInputCounterName = '';
	let activeFieldWeWorkWith = '';
	// Если длина заглавного текста больше 0 и меньше 15 (выбранное мной максимальное значение), то надо поставить
	// запятую между значениями, (чтобы в начале и после последнего ее не было)
	// Если длина заглавного текста меньше выбранного мной максимального значения, 
	// то добавляем значение строки и цифру
	// Если длина заглавного текста больше выбранного мной макс. значения, то ставим троеточие.
	// Однако сначала проверяем, не стоят ли они уже 
	$( '#' + dropdownHeaderId ).find('.incdecField__my-input').each( function () {
		activeFieldWeWorkWith = $(this);
		// Определение строки в зависимости от цифры. Данные берем из data поля с классом myInput и текущим id, 
		// туда данные зашиваются из valueDependendText, объекта переданного в миксин dropdown counter
		switch ( +activeFieldWeWorkWith.val() ) {
			case 1	: myInputCounterName = activeFieldWeWorkWith.attr('data-one'); break;
			case 2	:  
			case 3	:  
			case 4	: myInputCounterName = activeFieldWeWorkWith.attr('data-two-three-four'); break;
			case 0	: return; break; 
			default	: myInputCounterName = activeFieldWeWorkWith.attr('data-zero-others'); break;
		};
		
		// Если общая длина заголовка превысила 15 символов, то не записываем новые данные
		if ( titleDropdownHeader.length < 15 ) {
			if ( titleDropdownHeader.length > 0 )
				titleDropdownHeader += ', ';
			titleDropdownHeader += activeFieldWeWorkWith.val() + ' ' + myInputCounterName;
		}

	});
	// Если длина заголовка превышает 15 символов, ставим ...
	if ( titleDropdownHeader.length > 15 ) titleDropdownHeader += '...';

	if ( titleDropdownHeader != '' ) 
		$( '#' + dropdownHeaderId ).find('span').html( titleDropdownHeader );
	else 
		$( '#' + dropdownHeaderId ).find('span').html( 
			$( '#' + dropdownHeaderId ).find('.field-template').attr('data-value') );
};



function dropdownHeaderTextCheckV2( dropdownHeaderId ){
	function writeCounterProperties (id, counterNameString, counterValue){
		return {
			id: id,
			counterNameString: counterNameString, 
			counterValue: counterValue 
		};
	}
	let titleDropdownHeaderArray = [];
	let DropdownHeaderFinite = '';
	let myInputCounterName = '';
	let activeFieldWeWorkWith = '';
	let newValueOfDropdownHeader = 0;
	let index = 0;
	console.clear();
	// Если длина заглавного текста больше 0 и меньше 15 (выбранное мной максимальное значение), то надо поставить
	// запятую между значениями, (чтобы в начале и после последнего ее не было)
	// Если длина заглавного текста меньше выбранного мной максимального значения, 
	// то добавляем значение строки и цифру
	// Если длина заглавного текста больше выбранного мной макс. значения, то ставим троеточие.
	// Однако сначала проверяем, не стоят ли они уже 
	$( '#' + dropdownHeaderId ).find('.incdecField__my-input').each( function () {
		activeFieldWeWorkWith = $(this);

		// Присвоение переменной значение поля Myinput
		newValueOfDropdownHeader = +activeFieldWeWorkWith.val();

		// Далее перебираем весь массив объектов и сравниваем поле id с текущим. Если есть совпадение - 
		// суммируем значения и уменьшаем счетчик массива
		titleDropdownHeaderArray.forEach(element => {
			if ( activeFieldWeWorkWith.attr('data-zero-others') == element.id ) {
				index--;
				console.log('Found');
				newValueOfDropdownHeader = +activeFieldWeWorkWith.val() + +element.counterValue;
				return;
			}
		});
		
		// Определение строки в зависимости от цифры. Данные берем из data поля с классом myInput и текущим id, 
		// туда данные зашиваются из valueDependendText, объекта переданного в миксин dropdown counter
		switch ( newValueOfDropdownHeader ) {
			case 1	: myInputCounterName = activeFieldWeWorkWith.attr('data-one'); break;
			case 2	:  
			case 3	:  
			case 4	: myInputCounterName = activeFieldWeWorkWith.attr('data-two-three-four'); break;
			case 0	: return; break; 
			default	: myInputCounterName = activeFieldWeWorkWith.attr('data-zero-others'); break;
		};

		// Заносим в массив новый обект
		titleDropdownHeaderArray[index] = writeCounterProperties( activeFieldWeWorkWith.attr('data-zero-others'), 
			myInputCounterName, newValueOfDropdownHeader );
		index++;

		
	});

	titleDropdownHeaderArray.forEach( (element, index) => {
		console.log(element);

		// Если общая длина заголовка превысила 15 символов, то не записываем новые данные
		if ( DropdownHeaderFinite.length < 15 ) {
			if ( DropdownHeaderFinite.length > 0 )
				DropdownHeaderFinite += ', ';
			DropdownHeaderFinite += element.counterValue + ' ' + element.counterNameString;
		};

		// Если длина заголовка превышает 15 символов, ставим ...
		if ( DropdownHeaderFinite.length > 15 ) DropdownHeaderFinite += '...';

	});

	console.log ( DropdownHeaderFinite );
	

	

	if ( DropdownHeaderFinite != '' ) 
		$( '#' + dropdownHeaderId ).find('span').html( DropdownHeaderFinite );
	else 
		$( '#' + dropdownHeaderId ).find('span').html( 
			$( '#' + dropdownHeaderId ).find('.field-template').attr('data-value') );

};



$(()=> {
	$( '.dropdown' ).each( function () {
		dropdownHeaderTextCheck( $(this).attr('id') );
	});

	// При нажатии на плюс/минус полей ищем ID (зашито последним словом в ID поля my-input)
	// Далее запускаем функцию изменения заголовка
	$( '.incdecField__input-button' ).click( function() {
		let stringToSearchForId = $(this).siblings('.incdecField__my-input').attr('id');
		let idToSearch = stringToSearchForId.slice( stringToSearchForId.lastIndexOf(' ')+1 );
		dropdownHeaderTextCheckV2( idToSearch );
	});

	// Изменение состояния дропдаун - открытие/закрытие	
	$( '.dropdown' ).children( '.text-field-with-info' ).children( '.text-field-with-info__visualisation' ).
	click( function() {
		let blockWeWorkWith = $(this).parent().siblings( '.dropdown__expanded' );
		// Получаем z-index текущего блока
		let blockZIndex = blockWeWorkWith.css('z-index');
		let titleField = $(this).children( '.field-template' );
		// Меняем класс (сворачиваем развернутый, разворачиваем свернутый)
		blockWeWorkWith.toggleClass( 'dropdown__expanded--false' );
	// Меняем класс главного поля для изменения яркости границ
		titleField.toggleClass( 'field-template--border-hovered' );
		titleField.toggleClass( 'field-template--border-not-hovered' );

		// Если сворачиваем, то возвращаем z-index к стоку (9 + 1 потом)
		if ( blockWeWorkWith.hasClass( 'dropdown__expanded--false' ) ) 
			blockZIndex = 9;
		else {
			// Проверяем все Dropdownы и находим с самым большим z-index
			$( '.dropdown__expanded' ).each( function (){
				if ( blockZIndex < $(this).css('z-index') ) blockZIndex = $(this).css('z-index')
			});
		}
		// Устанавливаем z-index
		blockWeWorkWith.css('z-index',+blockZIndex+1);
	});
} );
