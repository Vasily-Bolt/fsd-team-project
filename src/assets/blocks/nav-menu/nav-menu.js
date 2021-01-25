function hideAllSubMenus(){
	$('.nav-menu__submenu').removeClass('nav-menu__submenu--visible').addClass('nav-menu__submenu--hidden')
};

function showSelectedMenu( selector ){
	$(selector).removeClass('nav-menu__submenu--hidden').addClass('nav-menu__submenu--visible');
}

$(()=> {

	$( '.nav-menu__arrow-container' ).parent().on( 'click', function( event ){
		const mySelector = $(this).children('.nav-menu__submenu');
		if ( mySelector.hasClass('nav-menu__submenu--hidden') ){
			event.stopPropagation();
			hideAllSubMenus();
			showSelectedMenu( mySelector );
		}
	});

	$(document).on('click', function(event) {
		if ( !$(event.target).parents().hasClass( 'nav-menu__submenu' ) && (!$(event.target).hasClass( 'nav-menu__submenu' )) ) {
			hideAllSubMenus();
		}		
	});			
	
});