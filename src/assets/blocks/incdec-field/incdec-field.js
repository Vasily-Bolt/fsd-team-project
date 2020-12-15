// Функция изменения значений счетчиков и проверки состояния кнопок !!!разбить на две функции
function change(objName, min, max, step) {
	let counterValue = $(objName).siblings('.incdecField__myInput').val();
	let tmp = +counterValue + step;
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
	
	$(objName).siblings('.incdecField__myInput').val(tmp);
};

$(()=> {
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
