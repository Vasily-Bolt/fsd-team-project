$(()=> {

	$( '.nav-menu__arrow-container' ).parent().on( 'click', function(){
		$(this).children('.nav-menu__submenu').toggleClass('nav-menu__submenu--hidden nav-menu__submenu--visible	');
	});

	// $('body').on('click', function( event ) {
	// 	console.log('doit');
	// 	// $( '.nav-menu__submenu' )
	// 	// .hasClass( 'nav-menu__submenu--visible' )
	// 	// .removeClass( 'nav-menu__submenu--visible' )
	// 	// .addClass( 'nav-menu__submenu--hidden' );
	// 	if ( $( '.nav-menu__submenu' ).hasClass( 'nav-menu__submenu--visible' ) ) {
	// 		$( '.nav-menu__submenu' ).removeClass( 'nav-menu__submenu--visible' ).addClass( 'nav-menu__submenu--hidden' );
	// 	}
	// });


});