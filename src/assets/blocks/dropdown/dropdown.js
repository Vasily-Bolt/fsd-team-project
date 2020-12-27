// Функция ищет обертку дропдоуна по идентификатору.
// Необходимо найти все значения всех полей внутри обертки с 

function dropdownHeaderTextCheckV2( dropdownHeaderId ){
	// Функция создания объекта с информацией о будующем тексте заголовка 
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

	// Обработка получившегося массива и создание строки для заголовка дропдаун
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
	// Если длина окончательной строки для заголовка пустая, то устанавливаем значение по умолячанию и прячем кнопку ОЧИСТИТЬ
	if ( dropdownHeaderFinite != '' ) {
		$( '#' + dropdownHeaderId ).find('span').html( dropdownHeaderFinite );
	} else {
		$( '#' + dropdownHeaderId ).find('span').html( 
			$( '#' + dropdownHeaderId ).find('.field-template').attr('data-value') );
			$( '#' + dropdownHeaderId ).find('input:reset').toggle();
	}

};

function changeDropdownexpansion(dropdownHeaderId) {
	// Получаем z-index текущего блока
	let blockZIndex = dropdownHeaderId.css('z-index');
	let titleField = $(dropdownHeaderId).parent().find( '.field-template' );
	// Меняем класс (сворачиваем развернутый, разворачиваем свернутый)
	dropdownHeaderId.toggleClass( 'dropdown__expanded--false' );
	// Меняем класс главного поля для изменения яркости границ
	titleField.toggleClass( 'field-template--border-hovered' );
	titleField.toggleClass( 'field-template--border-not-hovered' );

	// Если сворачиваем, то возвращаем z-index к стоку (9 + 1 потом)
	if ( dropdownHeaderId.hasClass( 'dropdown__expanded--false' ) ) 
		blockZIndex = 9;
	else {
		// Проверяем все Dropdownы и находим с самым большим z-index
		$( '.dropdown__expanded' ).each( function (){
			if ( blockZIndex < $(this).css('z-index') ) blockZIndex = $(this).css('z-index')
		});
	}
	// Устанавливаем z-index
	dropdownHeaderId.css('z-index',+blockZIndex+1);
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

	// Изменение состояния дропдаун - открытие/закрытие	
	$( '.dropdown' ).children( '.text-field-with-info' ).children( '.text-field-with-info__visualisation' ).
	click( function() {
		let blockWeWorkWith = $(this).parent().siblings( '.dropdown__expanded' );
		changeDropdownexpansion( blockWeWorkWith );
	});

	$('form.dropdown').on('click', 'input:reset', function(event) {
		let idToSearch = $(event.delegateTarget).attr('id');
		event.preventDefault();
		dropdownHeaderTextCheckV2( idToSearch );
	});

	$('form.dropdown').on('click', 'input:submit', function(event) {
		let idToSearch = $(event.delegateTarget).find('fieldset');
		changeDropdownexpansion( idToSearch );
	});

} );
