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
	$( '#' + dropdownHeaderId ).find('.incdecField__my-input').each( function () {
		let activeFieldWeWorkWith = $(this);
		// Определение строки в зависимости от цифры. Данные берем из data поля с классом myInput и текущим id, 
		// туда данные зашиваются из valueDependendText, объекта переданного в миксин dropdown counter
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
	$( '#' + dropdownHeaderId ).find('span').html( titleDropdownHeader );
};

$(()=> {
	$( '.dropdown' ).each( function () {
		dropdownHeaderTextCheck( $(this).attr('id') );
	});

	$( '.incdecField__input-button' ).click( function() {
		let stringToSearchForId = $(this).siblings('.incdecField__my-input').attr('id');
		let idToSearch = stringToSearchForId.slice( stringToSearchForId.lastIndexOf(' ')+1 );
		dropdownHeaderTextCheck( idToSearch );
	});

	
	$( '.dropdown' ).children( '.text-field-with-info' ).children( '.text-field-with-info__visualisation' ).
	click( function() {
		let blockWeWorkWith = $(this).parent().siblings( '.dropdown__expanded' );
		// Получаем z-index текущего блока
		let blockZIndex = blockWeWorkWith.css('z-index');
		// Меняем класс (сворачиваем развернутый, разворачиваем свернутый)
		blockWeWorkWith.toggleClass( 'dropdown__expanded--false' );
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
		console.log( blockWeWorkWith.css('z-index') );
	});
} );
