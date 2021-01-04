$(()=> {
	$('.expandable-checkbox-list__title').find('input').addClass('header3');
	$('.expandable-checkbox-list__title').on('click','.field-template', function(event) {
		let idToSearch = $(event.delegateTarget).siblings('fieldset');
		let arrowContainer = $(this).find('.field-template__arrow-css')
		if ( arrowContainer.hasClass('field-template__arrow-css--to-top') ){
			arrowContainer.removeClass('field-template__arrow-css--to-top');
			arrowContainer.addClass('field-template__arrow-css--to-bottom');
		} else {
			arrowContainer.removeClass('field-template__arrow-css--to-bottom');
			arrowContainer.addClass('field-template__arrow-css--to-top');
		}
		
		idToSearch.toggle('.expandable-checkbox-list__fieldset--hidden');
	});
})