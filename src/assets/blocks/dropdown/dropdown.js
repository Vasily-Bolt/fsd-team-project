// Функция ищет обертку дропдоуна по идентификатору.
// Необходимо найти все значения всех полей внутри обертки с 


function dropdownHeaderTextCheckV2( dropdownHeaderId ){
	function writeCounterProperties (id, counterNameString, counterValue){
		return {
			id: id,
			counterNameString: counterNameString, 
			counterValue: counterValue 
		};
	}
	let titleDropdownHeaderArray = [];
	let dropdownHeaderFinite = '';
	let myInputCounterName = '';
	let activeFieldWeWorkWith = '';
	let newValueOfDropdownHeader = 0;
	let indexOfDropdownHeaderArray = 0;
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
		titleDropdownHeaderArray.forEach( ( element, index ) => {
			if ( activeFieldWeWorkWith.attr('data-zero-others') == element.id ) {
				indexOfDropdownHeaderArray = index;
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
			case 0	: break; 
			default	: myInputCounterName = activeFieldWeWorkWith.attr('data-zero-others'); break;
		};

		// Заносим в массив новый обект
		titleDropdownHeaderArray[indexOfDropdownHeaderArray] = writeCounterProperties( activeFieldWeWorkWith.attr('data-zero-others'), 
			myInputCounterName, newValueOfDropdownHeader );
		indexOfDropdownHeaderArray = titleDropdownHeaderArray.length;

		
	});

	titleDropdownHeaderArray.forEach( ( element ) => {

		// Если общая длина заголовка превысила 15 символов, то не записываем новые данные
		if ( dropdownHeaderFinite.length < 15 && element.counterValue != 0 ) {
			if ( dropdownHeaderFinite.length > 0 )
				dropdownHeaderFinite += ', ';
			dropdownHeaderFinite += element.counterValue + ' ' + element.counterNameString;
		};

	});
	// Проверка длинны массива. Если больше двух значений и есть данные для отображения, то ставит троеточие
	if ( titleDropdownHeaderArray.length > 2 && dropdownHeaderFinite != '' ) dropdownHeaderFinite += '...';
	
	if ( dropdownHeaderFinite != '' ) 
		$( '#' + dropdownHeaderId ).find('span').html( dropdownHeaderFinite );
	else 
		$( '#' + dropdownHeaderId ).find('span').html( 
			$( '#' + dropdownHeaderId ).find('.field-template').attr('data-value') );

};


$(()=> {
	$( '.dropdown' ).each( function () {
		dropdownHeaderTextCheckV2( $(this).attr('id') );
	});

	// При нажатии на плюс/минус полей ищем ID (зашито последним словом в ID поля my-input)
	// Далее запускаем функцию изменения заголовка
	$( '.incdecField__input-button' ).click( function() {
		let stringToSearchForId = $(this).siblings('.incdecField__my-input').attr('id');
		let idToSearch = stringToSearchForId.slice( stringToSearchForId.lastIndexOf(' ')+1 );
		dropdownHeaderTextCheckV2( idToSearch );
	});

	$('input:reset').click( function(){
		setTimeout(() => {
			dropdownHeaderTextCheckV2( $(this).closest('form').attr('id') );
		}, 1);
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
