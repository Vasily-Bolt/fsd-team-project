Block guide:
- text-field
	Миксин для отображения текстовых полей. Получает обьект с ключами pattern, name и placeholder.
	field_type			-	тип поля. 
		text-field 			- обычное текстовое поле
		dropdown-field	- поле для выпадающего списка со стрелками вниз или вверх (указывается дополнительно значение dropdown_hidden)
		subscribe-field	-	поле подписки со стрелочкой вправо
	corners					-	наличие закругленных углов (значения all, top или buttom определяют где будет закругление)
	value						-	для text-field указывает значение при загрузку страницы (value поля input)
	hovered					- состояние рамок поля по умолчанию (всегда как наведенное - true)
	name 						- имя поля input
	placeholder 		- передается в поле placeholder (строка с текстом) для text-field или в span (значение по умолчанию) для dropdown-field
	pattern 				- при наличии создает masked text field
	dropdown_hidden - true - маркер для закрытого dropdown, false - маркер для открытого dropdown

-	text-field-with-info
	Миксин для отображения миксина text-field с двумя подписями - сверху слева жирным (title) и сверху справа (aditional) полупрозрачным обычным текстом.
	Подстраивается под размер обертки
	titleClass				-	дополнительные классы стилей применяемые к блоку с title
		padding-top				-	отступ сверху 3 пикселя (для соответствия макету)
	title							-	текст сверху слева
	aditional					-	текст сверху справа
	tfType						-	field-type миксина text-field
	tfName						-	name миксина text-field
	tfPlaceholder			-	placeholder миксина text-field
	tfValue						-	value миксина text-field
	tfDropdownHidden	-	значение dropdown_hidden миксина text-field
	tfPattern					-	значение pattern миксина text-field
	tfCorners					-	значение corners миксина text-field
	tfHovered					-	значение hovered миксина text-field

- checkbox-radio
	Миксин, отображающий checkbox, radio или toggle
	type			-	тип кнопки: checkbox, radio, toggle-switch
	id				-	идентификатор поля. Должен быть уникален
	name			-	атрибут name поля input. Для радио кнопок - объединяющий элемент
	value			-	атрибут value поля input.
	text			-	текст, отображаемый рядом с кнопкой
	checked		- состояние на момент загрузки страницы

-	like-button
	Миксин для лайков. Используется checkbox
	id							-	уникальный идентификатор
	number_of_likes	-	количество, отображаемое в поле
	checked					-	статус при загрузке (если при загрузке из БД есть информация, что пользователь уже лайкал, то true)