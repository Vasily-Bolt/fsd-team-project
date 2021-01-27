function hideAllSubMenus(){
	$('.nav-menu__submenu--popup').removeClass('nav-menu__submenu--visible').addClass('nav-menu__submenu--hidden')
};

function showSelectedMenu( selector ){
	$(selector).removeClass('nav-menu__submenu--hidden').addClass('nav-menu__submenu--visible');
}

$(()=> {

	$( '.nav-menu__arrow-container' ).parent().on( 'click', function( event ){
		const mySelector = $(this).children('.nav-menu__submenu--popup');
		if ( mySelector.hasClass('nav-menu__submenu--hidden') ){
			event.stopPropagation();
			hideAllSubMenus();
			showSelectedMenu( mySelector );
		}
	});

	$(document).on('click', function(event) {
		if ( !$(event.target).parents().hasClass( 'nav-menu__submenu--popup' ) && (!$(event.target).hasClass( 'nav-menu__submenu--popup' )) ) {
			hideAllSubMenus();
		}		
	});			

	if ( $( window ).width() <= '768' ) console.log($( window ).width());
	
});