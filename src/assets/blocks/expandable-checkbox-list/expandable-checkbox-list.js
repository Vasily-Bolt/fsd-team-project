$(()=> {
	$('.expandable-checkbox-list__title').find('input').addClass('header3');
	$('.expandable-checkbox-list__title').on('click','.field-template', function(event) {
		let idToSearch = $(event.delegateTarget).siblings('fieldset');
		let arrowContainer = $(this).find('.arrow-triangle')
		if ( arrowContainer.hasClass('arrow-triangle--to-top') ){
			arrowContainer.removeClass('arrow-triangle--to-top');
			arrowContainer.addClass('arrow-triangle--to-bottom');
		} else {
			arrowContainer.removeClass('arrow-triangle--to-bottom');
			arrowContainer.addClass('arrow-triangle--to-top');
		}
		
		idToSearch.toggle('.expandable-checkbox-list__fieldset--hidden');
	});
})