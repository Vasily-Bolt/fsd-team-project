let minimalValue = 0;
let maximalValue = 5;
let stepValue = 1;

// Функция затемнения кнопок
function fadeButton(objName){
	$(objName).removeClass('incdecField__input-button--is-available').addClass('incdecField__input-button--not-available')
		.attr('disabled',true);
};

// Функция подсветки (активации) кнопок
function unFadeButton(objName){
	$(objName).removeClass('incdecField__input-button--not-available').addClass('incdecField__input-button--is-available')
		.attr('disabled',false);;
};

// Функция проверки актальности подсветки кнопок
function checkButtonStatus(objName,newCounterValue){
	let reverseButtonType = '';
	if ( objName.indexOf('Pls') == -1 ) 
		reverseButtonType = 'Pls';
	else 
		reverseButtonType = 'Mns';

	let reverseButton = objName.slice(0, objName.length-3) + reverseButtonType;
  
	// Проверка: если максимальное или минимальное значение, то соответствующая кнопка "потухает"
	if (newCounterValue == minimalValue || newCounterValue == maximalValue) fadeButton(objName);
	// if (tmp == maximalValue) fadeButton(objName);

// Проверка: если после изменения значения, оно перестает быть максимальным или минимальным, то возвращаем у "потухшей" кнопки видимость
	if ( (newCounterValue != minimalValue && newCounterValue != maximalValue) || ( $(reverseButton).hasClass('incdecField__input-button--not-available') ) ) {
		unFadeButton(reverseButton);
	};
};

// Возвращает текущее значение поля my-input, соседствующее с кнопкой
function getCounterValue (objName){
	let counterSelector = $(objName).siblings('.incdecField__my-input');
	return counterSelector.val();
};

// Обновляет текущее значение поля my-input, соседствующее с кнопкой
function setCounterValue (objName, valueToSet){
	let counterSelector = $(objName).siblings('.incdecField__my-input');
	counterSelector.val(valueToSet);
};

// Функция изменения значений счетчиков и проверки состояния кнопок !!!разбить на две функции
function change(objName, step) {

	let counterValue = getCounterValue( objName );
	let tmp = +counterValue + step;

	if (tmp < minimalValue) tmp = minimalValue;
	if (tmp > maximalValue) tmp = maximalValue;

	setCounterValue( objName, tmp );

	checkButtonStatus( objName, tmp );
};


$(()=> {
	let myId = '';
	//Если кнопку нажали, делаем пересчет и меняем цифру
	$('.btnMns').click(function(){
			myId = '#'+$(this).attr('id');
			change(myId, -stepValue);
	});

	$('.btnPls').click(function(){
		myId = '#'+$(this).attr('id');
		change(myId, stepValue);
	});

	$('form.dropdown').on('click', 'input:reset', function(event) {
		event.preventDefault();
		$(event.delegateTarget).find('.incdecField').each( function() {
			myId = '#'+$(this).find('.btnMns').attr('id');
			setCounterValue ( myId, 0 );
			checkButtonStatus( myId, 0 );
		});	
		
	});

	$('form.dropdown').submit( function() {
		event.preventDefault();
	});
});
