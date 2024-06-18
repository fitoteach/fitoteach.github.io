( function( api ) {

	// Extends our custom "kundoo" section.
	api.sectionConstructor['kundoo'] = api.Section.extend( {

		// No events for this type of section.
		attachEvents: function () {},

		// Always make the section active.
		isContextuallyActive: function () {
			return true;
		}
	} );

} )( wp.customize );