const mobileDeviceWidth = 768;

function hideAllSubMenus( mobile ){
	$('.nav-menu__submenu--popup').removeClass('nav-menu__submenu--visible').addClass('nav-menu__submenu--hidden')
	if ( mobile ) $('.nav-menu--inline-burger').children('ul').css('visibility','hidden');
};

function showSelectedMenu( selector ){
	$(selector).removeClass('nav-menu__submenu--hidden').addClass('nav-menu__submenu--visible');
}

$(()=> {

	const isMobile = $( window ).width() <= mobileDeviceWidth;
	console.log( isMobile );

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
			if ( isMobile || ( !$(event.target).parents().hasClass('nav-menu--inline-burger') ) ) {
				hideAllSubMenus( true );
			}
			hideAllSubMenus();
		}		
	});			

	//Couldn't export variables from sass...
	if ( isMobile ) {
		$('.nav-menu--inline-burger').on('click', function() {
			event.stopPropagation();
			const NearestUlElemnt = $(this).children('ul');
			hideAllSubMenus();
			if ( NearestUlElemnt.css( 'visibility' ) != 'hidden' )
				NearestUlElemnt.css('visibility','hidden');
			else
				NearestUlElemnt.css('visibility','visible');
		});
	}
	
});