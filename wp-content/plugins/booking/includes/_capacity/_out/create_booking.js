"use strict"; // ---------------------------------------------------------------------------------------------------------------------
//  A j a x    A d d    N e w    B o o k i n g
// ---------------------------------------------------------------------------------------------------------------------

/**
 * Submit new booking
 *
 * @param params   =     {
                                'resource_id'        : resource_id,
                                'dates_ddmmyy_csv'   : document.getElementById( 'date_booking' + resource_id ).value,
                                'formdata'           : formdata,
                                'booking_hash'       : my_booking_hash,
                                'custom_form'        : my_booking_form,

                                'captcha_chalange'   : captcha_chalange,
                                'captcha_user_input' : user_captcha,

                                'is_emails_send'     : is_send_emeils,
                                'active_locale'      : wpdev_active_locale
						}
 *
 */

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function wpbc_ajx_booking__create(params) {
  console.groupCollapsed('WPBC_AJX_BOOKING__CREATE');
  console.groupCollapsed('== Before Ajax Send ==');
  console.log(params);
  console.groupEnd();
  params = wpbc_captcha__simple__maybe_remove_in_ajx_params(params); // Start Ajax

  jQuery.post(wpbc_url_ajax, {
    action: 'WPBC_AJX_BOOKING__CREATE',
    wpbc_ajx_user_id: _wpbc.get_secure_param('user_id'),
    nonce: _wpbc.get_secure_param('nonce'),
    wpbc_ajx_locale: _wpbc.get_secure_param('locale'),
    calendar_request_params: params
    /**
     *  Usually  params = { 'resource_id'        : resource_id,
     *						'dates_ddmmyy_csv'   : document.getElementById( 'date_booking' + resource_id ).value,
     *						'formdata'           : formdata,
     *						'booking_hash'       : my_booking_hash,
     *						'custom_form'        : my_booking_form,
     *
     *						'captcha_chalange'   : captcha_chalange,
     *						'user_captcha'       : user_captcha,
     *
     *						'is_emails_send'     : is_send_emeils,
     *						'active_locale'      : wpdev_active_locale
     *				}
     */

  },
  /**
   * S u c c e s s
   *
   * @param response_data		-	its object returned from  Ajax - class-live-searcg.php
   * @param textStatus		-	'success'
   * @param jqXHR				-	Object
   */
  function (response_data, textStatus, jqXHR) {
    console.log(' == Response WPBC_AJX_BOOKING__CREATE == ');

    for (var obj_key in response_data) {
      console.groupCollapsed('==' + obj_key + '==');
      console.log(' : ' + obj_key + ' : ', response_data[obj_key]);
      console.groupEnd();
    }

    console.groupEnd(); // <editor-fold     defaultstate="collapsed"     desc=" = Error Message! Server response with String.  ->  E_X_I_T  "  >
    // -------------------------------------------------------------------------------------------------
    // This section execute,  when server response with  String instead of Object -- Usually  it's because of mistake in code !
    // -------------------------------------------------------------------------------------------------

    if (_typeof(response_data) !== 'object' || response_data === null) {
      var calendar_id = wpbc_get_resource_id__from_ajx_post_data_url(this.data);
      var jq_node = '#booking_form' + calendar_id;

      if ('' == response_data) {
        response_data = '<strong>' + 'Error! Server respond with empty string!' + '</strong> ';
      } // Show Message


      wpbc_front_end__show_message(response_data, {
        'type': 'error',
        'show_here': {
          'jq_node': jq_node,
          'where': 'after'
        },
        'is_append': true,
        'style': 'text-align:left;',
        'delay': 0
      }); // Enable Submit | Hide spin loader

      wpbc_booking_form__on_response__ui_elements_enable(calendar_id);
      return;
    } // </editor-fold>
    // <editor-fold     defaultstate="collapsed"     desc="  ==  This section execute,  when we have KNOWN errors from Booking Calendar.  ->  E_X_I_T  "  >
    // -------------------------------------------------------------------------------------------------
    // This section execute,  when we have KNOWN errors from Booking Calendar
    // -------------------------------------------------------------------------------------------------


    if ('ok' != response_data['ajx_data']['status']) {
      switch (response_data['ajx_data']['status_error']) {
        case 'captcha_simple_wrong':
          wpbc_captcha__simple__update({
            'resource_id': response_data['resource_id'],
            'url': response_data['ajx_data']['captcha__simple']['url'],
            'challenge': response_data['ajx_data']['captcha__simple']['challenge'],
            'message': response_data['ajx_data']['ajx_after_action_message'].replace(/\n/g, "<br />")
          });
          break;

        case 'resource_id_incorrect':
          // Show Error Message - incorrect  booking resource ID during submit of booking.
          var message_id = wpbc_front_end__show_message(response_data['ajx_data']['ajx_after_action_message'].replace(/\n/g, "<br />"), {
            'type': 'undefined' !== typeof response_data['ajx_data']['ajx_after_action_message_status'] ? response_data['ajx_data']['ajx_after_action_message_status'] : 'warning',
            'delay': 0,
            'show_here': {
              'where': 'after',
              'jq_node': '#booking_form' + params['resource_id']
            }
          });
          break;

        case 'booking_can_not_save':
          // We can not save booking, because dates are booked or can not save in same booking resource all the dates
          var message_id = wpbc_front_end__show_message(response_data['ajx_data']['ajx_after_action_message'].replace(/\n/g, "<br />"), {
            'type': 'undefined' !== typeof response_data['ajx_data']['ajx_after_action_message_status'] ? response_data['ajx_data']['ajx_after_action_message_status'] : 'warning',
            'delay': 0,
            'show_here': {
              'where': 'after',
              'jq_node': '#booking_form' + params['resource_id']
            }
          }); // Enable Submit | Hide spin loader

          wpbc_booking_form__on_response__ui_elements_enable(response_data['resource_id']);
          break;

        default:
          // <editor-fold     defaultstate="collapsed"                        desc=" = For debug only ? --  Show Message under the form = "  >
          // --------------------------------------------------------------------------------------------------------------------------------
          if ('undefined' !== typeof response_data['ajx_data']['ajx_after_action_message'] && '' != response_data['ajx_data']['ajx_after_action_message'].replace(/\n/g, "<br />")) {
            var calendar_id = wpbc_get_resource_id__from_ajx_post_data_url(this.data);
            var jq_node = '#booking_form' + calendar_id;
            var ajx_after_booking_message = response_data['ajx_data']['ajx_after_action_message'].replace(/\n/g, "<br />");
            console.log(ajx_after_booking_message);
            /**
             * // Show Message
            	var ajx_after_action_message_id = wpbc_front_end__show_message( ajx_after_booking_message,
            								{
            									'type' : ('undefined' !== typeof (response_data[ 'ajx_data' ][ 'ajx_after_action_message_status' ]))
            											? response_data[ 'ajx_data' ][ 'ajx_after_action_message_status' ] : 'info',
            									'delay'    : 10000,
            									'show_here': {
            													'jq_node': jq_node,
            													'where'  : 'after'
            												 }
            								} );
             */
          }

        // </editor-fold>
      } // -------------------------------------------------------------------------------------------------
      // Reactivate calendar again ?
      // -------------------------------------------------------------------------------------------------
      // Enable Submit | Hide spin loader


      wpbc_booking_form__on_response__ui_elements_enable(response_data['resource_id']); // Unselect  dates

      wpbc_calendar__unselect_all_dates(response_data['resource_id']); // 'resource_id'    => $params['resource_id'],
      // 'booking_hash'   => $booking_hash,
      // 'request_uri'    => $_SERVER['REQUEST_URI'],                                            // Is it the same as window.location.href or
      // 'custom_form'    => $params['custom_form'],                                             // Optional.
      // 'aggregate_resource_id_str' => implode( ',', $params['aggregate_resource_id_arr'] )     // Optional. Resource ID   from  aggregate parameter in shortcode.
      // Load new data in calendar.

      wpbc_calendar__load_data__ajx({
        'resource_id': response_data['resource_id'] // It's from response ...AJX_BOOKING__CREATE of initial sent resource_id
        ,
        'booking_hash': response_data['ajx_cleaned_params']['booking_hash'] // ?? we can not use it,  because HASH chnaged in any  case!
        ,
        'request_uri': response_data['ajx_cleaned_params']['request_uri'],
        'custom_form': response_data['ajx_cleaned_params']['custom_form'] // Aggregate booking resources,  if any ?
        ,
        'aggregate_resource_id_str': _wpbc.booking__get_param_value(response_data['resource_id'], 'aggregate_resource_id_arr').join(',')
      }); // Exit

      return;
    } // </editor-fold>

    /*
    	// Show Calendar
    	wpbc_calendar__loading__stop( response_data[ 'resource_id' ] );
    
    	// -------------------------------------------------------------------------------------------------
    	// Bookings - Dates
    	_wpbc.bookings_in_calendar__set_dates(  response_data[ 'resource_id' ], response_data[ 'ajx_data' ]['dates']  );
    
    	// Bookings - Child or only single booking resource in dates
    	_wpbc.booking__set_param_value( response_data[ 'resource_id' ], 'resources_id_arr__in_dates', response_data[ 'ajx_data' ][ 'resources_id_arr__in_dates' ] );
    	// -------------------------------------------------------------------------------------------------
    
    	// Update calendar
    	wpbc_calendar__update_look( response_data[ 'resource_id' ] );
    */
    // Hide spin loader


    wpbc_booking_form__spin_loader__hide(response_data['resource_id']); // Hide booking form

    wpbc_booking_form__animated__hide(response_data['resource_id']); // Show Confirmation | Payment section

    wpbc_show_thank_you_message_after_booking(response_data);
    setTimeout(function () {
      wpbc_do_scroll('#wpbc_scroll_point_' + response_data['resource_id'], 10);
    }, 500);
  }).fail( // <editor-fold     defaultstate="collapsed"                        desc=" = This section execute,  when  NONCE field was not passed or some error happened at  server! = "  >
  function (jqXHR, textStatus, errorThrown) {
    if (window.console && window.console.log) {
      console.log('Ajax_Error', jqXHR, textStatus, errorThrown);
    } // -------------------------------------------------------------------------------------------------
    // This section execute,  when  NONCE field was not passed or some error happened at  server!
    // -------------------------------------------------------------------------------------------------
    // Get Content of Error Message


    var error_message = '<strong>' + 'Error!' + '</strong> ' + errorThrown;

    if (jqXHR.status) {
      error_message += ' (<b>' + jqXHR.status + '</b>)';

      if (403 == jqXHR.status) {
        error_message += '<br> Probably nonce for this page has been expired. Please <a href="javascript:void(0)" onclick="javascript:location.reload();">reload the page</a>.';
        error_message += '<br> Otherwise, please check this <a style="font-weight: 600;" href="https://wpbookingcalendar.com/faq/request-do-not-pass-security-check/?after_update=10.1.1">troubleshooting instruction</a>.<br>';
      }
    }

    if (jqXHR.responseText) {
      // Escape tags in Error message
      error_message += '<br><strong>Response</strong><div style="padding: 0 10px;margin: 0 0 10px;border-radius:3px; box-shadow:0px 0px 1px #a3a3a3;">' + jqXHR.responseText.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;") + '</div>';
    }

    error_message = error_message.replace(/\n/g, "<br />");
    var calendar_id = wpbc_get_resource_id__from_ajx_post_data_url(this.data);
    var jq_node = '#booking_form' + calendar_id; // Show Message

    wpbc_front_end__show_message(error_message, {
      'type': 'error',
      'show_here': {
        'jq_node': jq_node,
        'where': 'after'
      },
      'is_append': true,
      'style': 'text-align:left;',
      'delay': 0
    }); // Enable Submit | Hide spin loader

    wpbc_booking_form__on_response__ui_elements_enable(calendar_id);
  } // </editor-fold>
  ) // .done(   function ( data, textStatus, jqXHR ) {   if ( window.console && window.console.log ){ console.log( 'second success', data, textStatus, jqXHR ); }    })
  // .always( function ( data_jqXHR, textStatus, jqXHR_errorThrown ) {   if ( window.console && window.console.log ){ console.log( 'always finished', data_jqXHR, textStatus, jqXHR_errorThrown ); }     })
  ; // End Ajax

  return true;
} // <editor-fold     defaultstate="collapsed"                        desc="  ==  CAPTCHA ==  "  >

/**
 * Update image in captcha and show warning message
 *
 * @param params
 *
 * Example of 'params' : {
 *							'resource_id': response_data[ 'resource_id' ],
 *							'url'        : response_data[ 'ajx_data' ][ 'captcha__simple' ][ 'url' ],
 *							'challenge'  : response_data[ 'ajx_data' ][ 'captcha__simple' ][ 'challenge' ],
 *							'message'    : response_data[ 'ajx_data' ][ 'ajx_after_action_message' ].replace( /\n/g, "<br />" )
 *						}
 */


function wpbc_captcha__simple__update(params) {
  document.getElementById('captcha_input' + params['resource_id']).value = '';
  document.getElementById('captcha_img' + params['resource_id']).src = params['url'];
  document.getElementById('wpdev_captcha_challenge_' + params['resource_id']).value = params['challenge']; // Show warning 		After CAPTCHA Img

  var message_id = wpbc_front_end__show_message__warning('#captcha_input' + params['resource_id'] + ' + img', params['message']); // Animate

  jQuery('#' + message_id + ', ' + '#captcha_input' + params['resource_id']).fadeOut(350).fadeIn(300).fadeOut(350).fadeIn(400).animate({
    opacity: 1
  }, 4000); // Focus text  field

  jQuery('#captcha_input' + params['resource_id']).trigger('focus'); //FixIn: 8.7.11.12
  // Enable Submit | Hide spin loader

  wpbc_booking_form__on_response__ui_elements_enable(params['resource_id']);
}
/**
 * If the captcha elements not exist  in the booking form,  then  remove parameters relative captcha
 * @param params
 * @returns obj
 */


function wpbc_captcha__simple__maybe_remove_in_ajx_params(params) {
  if (!wpbc_captcha__simple__is_exist_in_form(params['resource_id'])) {
    delete params['captcha_chalange'];
    delete params['captcha_user_input'];
  }

  return params;
}
/**
 * Check if CAPTCHA exist in the booking form
 * @param resource_id
 * @returns {boolean}
 */


function wpbc_captcha__simple__is_exist_in_form(resource_id) {
  return 0 !== jQuery('#wpdev_captcha_challenge_' + resource_id).length || 0 !== jQuery('#captcha_input' + resource_id).length;
} // </editor-fold>
// <editor-fold     defaultstate="collapsed"                        desc="  ==  Send Button | Form Spin Loader  ==  "  >

/**
 * Disable Send button  |  Show Spin Loader
 *
 * @param resource_id
 */


function wpbc_booking_form__on_submit__ui_elements_disable(resource_id) {
  // Disable Submit
  wpbc_booking_form__send_button__disable(resource_id); // Show Spin loader in booking form

  wpbc_booking_form__spin_loader__show(resource_id);
}
/**
 * Enable Send button  |   Hide Spin Loader
 *
 * @param resource_id
 */


function wpbc_booking_form__on_response__ui_elements_enable(resource_id) {
  // Enable Submit
  wpbc_booking_form__send_button__enable(resource_id); // Hide Spin loader in booking form

  wpbc_booking_form__spin_loader__hide(resource_id);
}
/**
 * Enable Submit button
 * @param resource_id
 */


function wpbc_booking_form__send_button__enable(resource_id) {
  // Activate Send button
  jQuery('#booking_form_div' + resource_id + ' input[type=button]').prop("disabled", false);
  jQuery('#booking_form_div' + resource_id + ' button').prop("disabled", false);
}
/**
 * Disable Submit button  and show  spin
 *
 * @param resource_id
 */


function wpbc_booking_form__send_button__disable(resource_id) {
  // Disable Send button
  jQuery('#booking_form_div' + resource_id + ' input[type=button]').prop("disabled", true);
  jQuery('#booking_form_div' + resource_id + ' button').prop("disabled", true);
}
/**
 * Show booking form  Spin Loader
 * @param resource_id
 */


function wpbc_booking_form__spin_loader__show(resource_id) {
  // Show Spin Loader
  jQuery('#booking_form' + resource_id).after('<div id="wpbc_booking_form_spin_loader' + resource_id + '" class="wpbc_booking_form_spin_loader" style="position: relative;"><div class="wpbc_spins_loader_wrapper"><div class="wpbc_spins_loader_mini"></div></div></div>');
}
/**
 * Remove / Hide booking form  Spin Loader
 * @param resource_id
 */


function wpbc_booking_form__spin_loader__hide(resource_id) {
  // Remove Spin Loader
  jQuery('#wpbc_booking_form_spin_loader' + resource_id).remove();
}
/**
 * Hide booking form wth animation
 *
 * @param resource_id
 */


function wpbc_booking_form__animated__hide(resource_id) {
  // jQuery( '#booking_form' + resource_id ).slideUp(  1000
  // 												, function (){
  //
  // 														// if ( document.getElementById( 'gateway_payment_forms' + response_data[ 'resource_id' ] ) != null ){
  // 														// 	wpbc_do_scroll( '#submiting' + resource_id );
  // 														// } else
  // 														if ( jQuery( '#booking_form' + resource_id ).parent().find( '.submiting_content' ).length > 0 ){
  // 															//wpbc_do_scroll( '#booking_form' + resource_id + ' + .submiting_content' );
  //
  // 															 var hideTimeout = setTimeout(function () {
  // 																				  wpbc_do_scroll( jQuery( '#booking_form' + resource_id ).parent().find( '.submiting_content' ).get( 0 ) );
  // 																				}, 100);
  //
  // 														}
  // 												  }
  // 										);
  jQuery('#booking_form' + resource_id).hide(); // var hideTimeout = setTimeout( function (){
  //
  // 	if ( jQuery( '#booking_form' + resource_id ).parent().find( '.submiting_content' ).length > 0 ){
  // 		var random_id = Math.floor( (Math.random() * 10000) + 1 );
  // 		jQuery( '#booking_form' + resource_id ).parent().before( '<div id="scroll_to' + random_id + '"></div>' );
  // 		console.log( jQuery( '#scroll_to' + random_id ) );
  //
  // 		wpbc_do_scroll( '#scroll_to' + random_id );
  // 		//wpbc_do_scroll( jQuery( '#booking_form' + resource_id ).parent().get( 0 ) );
  // 	}
  // }, 500 );
} // </editor-fold>
// <editor-fold     defaultstate="collapsed"                        desc="  ==  Mini Spin Loader  ==  "  >

/**
 * Show mini Spin Loader
 * @param parent_html_id
 */


function wpbc__spin_loader__mini__show(parent_html_id) {
  var color = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '#0071ce';

  if ('undefined' !== typeof color && '' != color) {
    color = 'border-color:' + color + ';';
  } // Show Spin Loader


  jQuery('#' + parent_html_id).after('<div id="wpbc_mini_spin_loader' + parent_html_id + '" class="wpbc_booking_form_spin_loader" style="position: relative;min-height: 2.8rem;"><div class="wpbc_spins_loader_wrapper"><div class="wpbc_one_spin_loader_mini 0wpbc_spins_loader_mini" style="' + color + '"></div></div></div>');
}
/**
 * Remove / Hide mini Spin Loader
 * @param parent_html_id
 */


function wpbc__spin_loader__mini__hide(parent_html_id) {
  // Remove Spin Loader
  jQuery('#wpbc_mini_spin_loader' + parent_html_id).remove();
} // </editor-fold>
//TODO: what  about showing only  Thank you. message without payment forms.

/**
 * Show 'Thank you'. message and payment forms
 *
 * @param response_data
 */


function wpbc_show_thank_you_message_after_booking(response_data) {
  if ('undefined' !== typeof response_data['ajx_confirmation']['ty_is_redirect'] && 'undefined' !== typeof response_data['ajx_confirmation']['ty_url'] && 'page' == response_data['ajx_confirmation']['ty_is_redirect'] && '' != response_data['ajx_confirmation']['ty_url']) {
    jQuery('body').trigger('wpbc_booking_created', [response_data['resource_id'], response_data]); //FixIn: 10.0.0.30

    window.location.href = response_data['ajx_confirmation']['ty_url'];
    return;
  }

  var resource_id = response_data['resource_id'];
  var confirm_content = '';

  if ('undefined' === typeof response_data['ajx_confirmation']['ty_message']) {
    response_data['ajx_confirmation']['ty_message'] = '';
  }

  if ('undefined' === typeof response_data['ajx_confirmation']['ty_payment_payment_description']) {
    response_data['ajx_confirmation']['ty_payment_payment_description'] = '';
  }

  if ('undefined' === typeof response_data['ajx_confirmation']['payment_cost']) {
    response_data['ajx_confirmation']['payment_cost'] = '';
  }

  if ('undefined' === typeof response_data['ajx_confirmation']['ty_payment_gateways']) {
    response_data['ajx_confirmation']['ty_payment_gateways'] = '';
  }

  var ty_message_hide = '' == response_data['ajx_confirmation']['ty_message'] ? 'wpbc_ty_hide' : '';
  var ty_payment_payment_description_hide = '' == response_data['ajx_confirmation']['ty_payment_payment_description'].replace(/\\n/g, '') ? 'wpbc_ty_hide' : '';
  var ty_booking_costs_hide = '' == response_data['ajx_confirmation']['payment_cost'] ? 'wpbc_ty_hide' : '';
  var ty_payment_gateways_hide = '' == response_data['ajx_confirmation']['ty_payment_gateways'].replace(/\\n/g, '') ? 'wpbc_ty_hide' : '';

  if ('wpbc_ty_hide' != ty_payment_gateways_hide) {
    jQuery('.wpbc_ty__content_text.wpbc_ty__content_gateways').html(''); // Reset  all  other possible gateways before showing new one.
  }

  confirm_content += "<div id=\"wpbc_scroll_point_".concat(resource_id, "\"></div>");
  confirm_content += "  <div class=\"wpbc_after_booking_thank_you_section\">";
  confirm_content += "    <div class=\"wpbc_ty__message ".concat(ty_message_hide, "\">").concat(response_data['ajx_confirmation']['ty_message'], "</div>");
  confirm_content += "    <div class=\"wpbc_ty__container\">";
  confirm_content += "      <div class=\"wpbc_ty__header\">".concat(response_data['ajx_confirmation']['ty_message_booking_id'], "</div>");
  confirm_content += "      <div class=\"wpbc_ty__content\">";
  confirm_content += "        <div class=\"wpbc_ty__content_text wpbc_ty__payment_description ".concat(ty_payment_payment_description_hide, "\">").concat(response_data['ajx_confirmation']['ty_payment_payment_description'].replace(/\\n/g, ''), "</div>");
  confirm_content += "      \t<div class=\"wpbc_ty__content_text wpbc_cols_2\">".concat(response_data['ajx_confirmation']['ty_customer_details'], "</div>");
  confirm_content += "      \t<div class=\"wpbc_ty__content_text wpbc_cols_2\">".concat(response_data['ajx_confirmation']['ty_booking_details'], "</div>");
  confirm_content += "        <div class=\"wpbc_ty__content_text wpbc_ty__content_costs ".concat(ty_booking_costs_hide, "\">").concat(response_data['ajx_confirmation']['ty_booking_costs'], "</div>");
  confirm_content += "        <div class=\"wpbc_ty__content_text wpbc_ty__content_gateways ".concat(ty_payment_gateways_hide, "\">").concat(response_data['ajx_confirmation']['ty_payment_gateways'].replace(/\\n/g, '').replace(/ajax_script/gi, 'script'), "</div>");
  confirm_content += "      </div>";
  confirm_content += "    </div>";
  confirm_content += "</div>";
  jQuery('#booking_form' + resource_id).after(confirm_content); //FixIn: 10.0.0.30		// event name			// Resource ID	-	'1'

  jQuery('body').trigger('wpbc_booking_created', [resource_id, response_data]); // To catch this event: jQuery( 'body' ).on('wpbc_booking_created', function( event, resource_id, params ) { console.log( event, resource_id, params ); } );
}
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluY2x1ZGVzL19jYXBhY2l0eS9fc3JjL2NyZWF0ZV9ib29raW5nLmpzIl0sIm5hbWVzIjpbIndwYmNfYWp4X2Jvb2tpbmdfX2NyZWF0ZSIsInBhcmFtcyIsImNvbnNvbGUiLCJncm91cENvbGxhcHNlZCIsImxvZyIsImdyb3VwRW5kIiwid3BiY19jYXB0Y2hhX19zaW1wbGVfX21heWJlX3JlbW92ZV9pbl9hanhfcGFyYW1zIiwialF1ZXJ5IiwicG9zdCIsIndwYmNfdXJsX2FqYXgiLCJhY3Rpb24iLCJ3cGJjX2FqeF91c2VyX2lkIiwiX3dwYmMiLCJnZXRfc2VjdXJlX3BhcmFtIiwibm9uY2UiLCJ3cGJjX2FqeF9sb2NhbGUiLCJjYWxlbmRhcl9yZXF1ZXN0X3BhcmFtcyIsInJlc3BvbnNlX2RhdGEiLCJ0ZXh0U3RhdHVzIiwianFYSFIiLCJvYmpfa2V5IiwiY2FsZW5kYXJfaWQiLCJ3cGJjX2dldF9yZXNvdXJjZV9pZF9fZnJvbV9hanhfcG9zdF9kYXRhX3VybCIsImRhdGEiLCJqcV9ub2RlIiwid3BiY19mcm9udF9lbmRfX3Nob3dfbWVzc2FnZSIsIndwYmNfYm9va2luZ19mb3JtX19vbl9yZXNwb25zZV9fdWlfZWxlbWVudHNfZW5hYmxlIiwid3BiY19jYXB0Y2hhX19zaW1wbGVfX3VwZGF0ZSIsInJlcGxhY2UiLCJtZXNzYWdlX2lkIiwiYWp4X2FmdGVyX2Jvb2tpbmdfbWVzc2FnZSIsIndwYmNfY2FsZW5kYXJfX3Vuc2VsZWN0X2FsbF9kYXRlcyIsIndwYmNfY2FsZW5kYXJfX2xvYWRfZGF0YV9fYWp4IiwiYm9va2luZ19fZ2V0X3BhcmFtX3ZhbHVlIiwiam9pbiIsIndwYmNfYm9va2luZ19mb3JtX19zcGluX2xvYWRlcl9faGlkZSIsIndwYmNfYm9va2luZ19mb3JtX19hbmltYXRlZF9faGlkZSIsIndwYmNfc2hvd190aGFua195b3VfbWVzc2FnZV9hZnRlcl9ib29raW5nIiwic2V0VGltZW91dCIsIndwYmNfZG9fc2Nyb2xsIiwiZmFpbCIsImVycm9yVGhyb3duIiwid2luZG93IiwiZXJyb3JfbWVzc2FnZSIsInN0YXR1cyIsInJlc3BvbnNlVGV4dCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJ2YWx1ZSIsInNyYyIsIndwYmNfZnJvbnRfZW5kX19zaG93X21lc3NhZ2VfX3dhcm5pbmciLCJmYWRlT3V0IiwiZmFkZUluIiwiYW5pbWF0ZSIsIm9wYWNpdHkiLCJ0cmlnZ2VyIiwid3BiY19jYXB0Y2hhX19zaW1wbGVfX2lzX2V4aXN0X2luX2Zvcm0iLCJyZXNvdXJjZV9pZCIsImxlbmd0aCIsIndwYmNfYm9va2luZ19mb3JtX19vbl9zdWJtaXRfX3VpX2VsZW1lbnRzX2Rpc2FibGUiLCJ3cGJjX2Jvb2tpbmdfZm9ybV9fc2VuZF9idXR0b25fX2Rpc2FibGUiLCJ3cGJjX2Jvb2tpbmdfZm9ybV9fc3Bpbl9sb2FkZXJfX3Nob3ciLCJ3cGJjX2Jvb2tpbmdfZm9ybV9fc2VuZF9idXR0b25fX2VuYWJsZSIsInByb3AiLCJhZnRlciIsInJlbW92ZSIsImhpZGUiLCJ3cGJjX19zcGluX2xvYWRlcl9fbWluaV9fc2hvdyIsInBhcmVudF9odG1sX2lkIiwiY29sb3IiLCJ3cGJjX19zcGluX2xvYWRlcl9fbWluaV9faGlkZSIsImxvY2F0aW9uIiwiaHJlZiIsImNvbmZpcm1fY29udGVudCIsInR5X21lc3NhZ2VfaGlkZSIsInR5X3BheW1lbnRfcGF5bWVudF9kZXNjcmlwdGlvbl9oaWRlIiwidHlfYm9va2luZ19jb3N0c19oaWRlIiwidHlfcGF5bWVudF9nYXRld2F5c19oaWRlIiwiaHRtbCJdLCJtYXBwaW5ncyI6IkFBQUEsYSxDQUVBO0FBQ0E7QUFDQTs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFDQSxTQUFTQSx3QkFBVCxDQUFtQ0MsTUFBbkMsRUFBMkM7QUFFM0NDLEVBQUFBLE9BQU8sQ0FBQ0MsY0FBUixDQUF3Qiww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QUFmO0FBQ0F3RCxFQUFBQSxlQUFlLHVFQUE2RHhELGFBQWEsQ0FBQyxrQkFBRCxDQUFiLENBQWtDLG9CQUFsQyxDQUE3RCxXQUFmO0FBQ0h3RCxFQUFBQSxlQUFlLGdGQUF3RUcscUJBQXhFLGdCQUFrRzNELGFBQWEsQ0FBRSxrQkFBRixDQUFiLENBQXFDLGtCQUFyQyxDQUFsRyxXQUFmO0FBQ0F3RCxFQUFBQSxlQUFlLG1GQUEyRUksd0JBQTNFLGdCQUF3RzVELGFBQWEsQ0FBRSxrQkFBRixDQUFiLENBQXFDLHFCQUFyQyxFQUE2RFcsT0FBN0QsQ0FBc0UsTUFBdEUsRUFBOEUsRUFBOUUsRUFBbUZBLE9BQW5GLENBQTRGLGVBQTVGLEVBQTZHLFFBQTdHLENBQXhHLFdBQWY7QUFDRzZDLEVBQUFBLGVBQWUsa0JBQWY7QUFDQUEsRUFBQUEsZUFBZSxnQkFBZjtBQUNIQSxFQUFBQSxlQUFlLFlBQWY7QUFFQ2xFLEVBQUFBLE1BQU0sQ0FBRSxrQkFBa0JrRCxXQUFwQixDQUFOLENBQXdDTyxLQUF4QyxDQUErQ1MsZUFBL0MsRUFwRGlFLENBdURsRTs7QUFDQWxFLEVBQUFBLE1BQU0sQ0FBRSxNQUFGLENBQU4sQ0FBaUJnRCxPQUFqQixDQUEwQixzQkFBMUIsRUFBa0QsQ0FBRUUsV0FBRixFQUFnQnhDLGFBQWhCLENBQWxELEVBeERrRSxDQXlEbEU7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xyXG5cclxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vICBBIGogYSB4ICAgIEEgZCBkICAgIE4gZSB3ICAgIEIgbyBvIGsgaSBuIGdcclxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG5cclxuLyoqXHJcbiAqIFN1Ym1pdCBuZXcgYm9va2luZ1xyXG4gKlxyXG4gKiBAcGFyYW0gcGFyYW1zICAgPSAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdyZXNvdXJjZV9pZCcgICAgICAgIDogcmVzb3VyY2VfaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2RhdGVzX2RkbW15eV9jc3YnICAgOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCggJ2RhdGVfYm9va2luZycgKyByZXNvdXJjZV9pZCApLnZhbHVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdmb3JtZGF0YScgICAgICAgICAgIDogZm9ybWRhdGEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2Jvb2tpbmdfaGFzaCcgICAgICAgOiBteV9ib29raW5nX2hhc2gsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2N1c3RvbV9mb3JtJyAgICAgICAgOiBteV9ib29raW5nX2Zvcm0sXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdjYXB0Y2hhX2NoYWxhbmdlJyAgIDogY2FwdGNoYV9jaGFsYW5nZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnY2FwdGNoYV91c2VyX2lucHV0JyA6IHVzZXJfY2FwdGNoYSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2lzX2VtYWlsc19zZW5kJyAgICAgOiBpc19zZW5kX2VtZWlscyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnYWN0aXZlX2xvY2FsZScgICAgICA6IHdwZGV2X2FjdGl2ZV9sb2NhbGVcclxuXHRcdFx0XHRcdFx0fVxyXG4gKlxyXG4gKi9cclxuZnVuY3Rpb24gd3BiY19hanhfYm9va2luZ19fY3JlYXRlKCBwYXJhbXMgKXtcclxuXHJcbmNvbnNvbGUuZ3JvdXBDb2xsYXBzZWQoICdXUEJDX0FKWF9CT09LSU5HX19DUkVBVEUnICk7XHJcbmNvbnNvbGUuZ3JvdXBDb2xsYXBzZWQoICc9PSBCZWZvcmUgQWpheCBTZW5kID09JyApO1xyXG5jb25zb2xlLmxvZyggcGFyYW1zICk7XHJcbmNvbnNvbGUuZ3JvdXBFbmQoKTtcclxuXHJcblx0cGFyYW1zID0gd3BiY19jYXB0Y2hhX19zaW1wbGVfX21heWJlX3JlbW92ZV9pbl9hanhfcGFyYW1zKCBwYXJhbXMgKTtcclxuXHJcblx0Ly8gU3RhcnQgQWpheFxyXG5cdGpRdWVyeS5wb3N0KCB3cGJjX3VybF9hamF4LFxyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdGFjdGlvbiAgICAgICAgICA6ICdXUEJDX0FKWF9CT09LSU5HX19DUkVBVEUnLFxyXG5cdFx0XHRcdFx0d3BiY19hanhfdXNlcl9pZDogX3dwYmMuZ2V0X3NlY3VyZV9wYXJhbSggJ3VzZXJfaWQnICksXHJcblx0XHRcdFx0XHRub25jZSAgICAgICAgICAgOiBfd3BiYy5nZXRfc2VjdXJlX3BhcmFtKCAnbm9uY2UnICksXHJcblx0XHRcdFx0XHR3cGJjX2FqeF9sb2NhbGUgOiBfd3BiYy5nZXRfc2VjdXJlX3BhcmFtKCAnbG9jYWxlJyApLFxyXG5cclxuXHRcdFx0XHRcdGNhbGVuZGFyX3JlcXVlc3RfcGFyYW1zIDogcGFyYW1zXHJcblxyXG5cdFx0XHRcdFx0LyoqXHJcblx0XHRcdFx0XHQgKiAgVXN1YWxseSAgcGFyYW1zID0geyAncmVzb3VyY2VfaWQnICAgICAgICA6IHJlc291cmNlX2lkLFxyXG5cdFx0XHRcdFx0ICpcdFx0XHRcdFx0XHQnZGF0ZXNfZGRtbXl5X2NzdicgICA6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCAnZGF0ZV9ib29raW5nJyArIHJlc291cmNlX2lkICkudmFsdWUsXHJcblx0XHRcdFx0XHQgKlx0XHRcdFx0XHRcdCdmb3JtZGF0YScgICAgICAgICAgIDogZm9ybWRhdGEsXHJcblx0XHRcdFx0XHQgKlx0XHRcdFx0XHRcdCdib29raW5nX2hhc2gnICAgICAgIDogbXlfYm9va2luZ19oYXNoLFxyXG5cdFx0XHRcdFx0ICpcdFx0XHRcdFx0XHQnY3VzdG9tX2Zvcm0nICAgICAgICA6IG15X2Jvb2tpbmdfZm9ybSxcclxuXHRcdFx0XHRcdCAqXHJcblx0XHRcdFx0XHQgKlx0XHRcdFx0XHRcdCdjYXB0Y2hhX2NoYWxhbmdlJyAgIDogY2FwdGNoYV9jaGFsYW5nZSxcclxuXHRcdFx0XHRcdCAqXHRcdFx0XHRcdFx0J3VzZXJfY2FwdGNoYScgICAgICAgOiB1c2VyX2NhcHRjaGEsXHJcblx0XHRcdFx0XHQgKlxyXG5cdFx0XHRcdFx0ICpcdFx0XHRcdFx0XHQnaXNfZW1haWxzX3NlbmQnICAgICA6IGlzX3NlbmRfZW1laWxzLFxyXG5cdFx0XHRcdFx0ICpcdFx0XHRcdFx0XHQnYWN0aXZlX2xvY2FsZScgICAgICA6IHdwZGV2X2FjdGl2ZV9sb2NhbGVcclxuXHRcdFx0XHRcdCAqXHRcdFx0XHR9XHJcblx0XHRcdFx0XHQgKi9cclxuXHRcdFx0XHR9LFxyXG5cclxuXHRcdFx0XHQvKipcclxuXHRcdFx0XHQgKiBTIHUgYyBjIGUgcyBzXHJcblx0XHRcdFx0ICpcclxuXHRcdFx0XHQgKiBAcGFyYW0gcmVzcG9uc2VfZGF0YVx0XHQtXHRpdHMgb2JqZWN0IHJldHVybmVkIGZyb20gIEFqYXggLSBjbGFzcy1saXZlLXNlYXJjZy5waHBcclxuXHRcdFx0XHQgKiBAcGFyYW0gdGV4dFN0YXR1c1x0XHQtXHQnc3VjY2VzcydcclxuXHRcdFx0XHQgKiBAcGFyYW0ganFYSFJcdFx0XHRcdC1cdE9iamVjdFxyXG5cdFx0XHRcdCAqL1xyXG5cdFx0XHRcdGZ1bmN0aW9uICggcmVzcG9uc2VfZGF0YSwgdGV4dFN0YXR1cywganFYSFIgKSB7XHJcbmNvbnNvbGUubG9nKCAnID09IFJlc3BvbnNlIFdQQkNfQUpYX0JPT0tJTkdfX0NSRUFURSA9PSAnICk7XHJcbmZvciAoIHZhciBvYmpfa2V5IGluIHJlc3BvbnNlX2RhdGEgKXtcclxuXHRjb25zb2xlLmdyb3VwQ29sbGFwc2VkKCAnPT0nICsgb2JqX2tleSArICc9PScgKTtcclxuXHRjb25zb2xlLmxvZyggJyA6ICcgKyBvYmpfa2V5ICsgJyA6ICcsIHJlc3BvbnNlX2RhdGFbIG9ial9rZXkgXSApO1xyXG5cdGNvbnNvbGUuZ3JvdXBFbmQoKTtcclxufVxyXG5jb25zb2xlLmdyb3VwRW5kKCk7XHJcblxyXG5cclxuXHRcdFx0XHRcdC8vIDxlZGl0b3ItZm9sZCAgICAgZGVmYXVsdHN0YXRlPVwiY29sbGFwc2VkXCIgICAgIGRlc2M9XCIgPSBFcnJvciBNZXNzYWdlISBTZXJ2ZXIgcmVzcG9uc2Ugd2l0aCBTdHJpbmcuICAtPiAgRV9YX0lfVCAgXCIgID5cclxuXHRcdFx0XHRcdC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHRcdFx0XHRcdC8vIFRoaXMgc2VjdGlvbiBleGVjdXRlLCAgd2hlbiBzZXJ2ZXIgcmVzcG9uc2Ugd2l0aCAgU3RyaW5nIGluc3RlYWQgb2YgT2JqZWN0IC0tIFVzdWFsbHkgIGl0J3MgYmVjYXVzZSBvZiBtaXN0YWtlIGluIGNvZGUgIVxyXG5cdFx0XHRcdFx0Ly8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdFx0XHRcdFx0aWYgKCAodHlwZW9mIHJlc3BvbnNlX2RhdGEgIT09ICdvYmplY3QnKSB8fCAocmVzcG9uc2VfZGF0YSA9PT0gbnVsbCkgKXtcclxuXHJcblx0XHRcdFx0XHRcdHZhciBjYWxlbmRhcl9pZCA9IHdwYmNfZ2V0X3Jlc291cmNlX2lkX19mcm9tX2FqeF9wb3N0X2RhdGFfdXJsKCB0aGlzLmRhdGEgKTtcclxuXHRcdFx0XHRcdFx0dmFyIGpxX25vZGUgPSAnI2Jvb2tpbmdfZm9ybScgKyBjYWxlbmRhcl9pZDtcclxuXHJcblx0XHRcdFx0XHRcdGlmICggJycgPT0gcmVzcG9uc2VfZGF0YSApe1xyXG5cdFx0XHRcdFx0XHRcdHJlc3BvbnNlX2RhdGEgPSAnPHN0cm9uZz4nICsgJ0Vycm9yISBTZXJ2ZXIgcmVzcG9uZCB3aXRoIGVtcHR5IHN0cmluZyEnICsgJzwvc3Ryb25nPiAnIDtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHQvLyBTaG93IE1lc3NhZ2VcclxuXHRcdFx0XHRcdFx0d3BiY19mcm9udF9lbmRfX3Nob3dfbWVzc2FnZSggcmVzcG9uc2VfZGF0YSAsIHsgJ3R5cGUnICAgICA6ICdlcnJvcicsXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCdzaG93X2hlcmUnOiB7J2pxX25vZGUnOiBqcV9ub2RlLCAnd2hlcmUnOiAnYWZ0ZXInfSxcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0J2lzX2FwcGVuZCc6IHRydWUsXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCdzdHlsZScgICAgOiAndGV4dC1hbGlnbjpsZWZ0OycsXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCdkZWxheScgICAgOiAwXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9ICk7XHJcblx0XHRcdFx0XHRcdC8vIEVuYWJsZSBTdWJtaXQgfCBIaWRlIHNwaW4gbG9hZGVyXHJcblx0XHRcdFx0XHRcdHdwYmNfYm9va2luZ19mb3JtX19vbl9yZXNwb25zZV9fdWlfZWxlbWVudHNfZW5hYmxlKCBjYWxlbmRhcl9pZCApO1xyXG5cdFx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHQvLyA8L2VkaXRvci1mb2xkPlxyXG5cclxuXHJcblx0XHRcdFx0XHQvLyA8ZWRpdG9yLWZvbGQgICAgIGRlZmF1bHRzdGF0ZT1cImNvbGxhcHNlZFwiICAgICBkZXNjPVwiICA9PSAgVGhpcyBzZWN0aW9uIGV4ZWN1dGUsICB3aGVuIHdlIGhhdmUgS05PV04gZXJyb3JzIGZyb20gQm9va2luZyBDYWxlbmRhci4gIC0+ICBFX1hfSV9UICBcIiAgPlxyXG5cdFx0XHRcdFx0Ly8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdFx0XHRcdFx0Ly8gVGhpcyBzZWN0aW9uIGV4ZWN1dGUsICB3aGVuIHdlIGhhdmUgS05PV04gZXJyb3JzIGZyb20gQm9va2luZyBDYWxlbmRhclxyXG5cdFx0XHRcdFx0Ly8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuXHRcdFx0XHRcdGlmICggJ29rJyAhPSByZXNwb25zZV9kYXRhWyAnYWp4X2RhdGEnIF1bICdzdGF0dXMnIF0gKSB7XHJcblxyXG5cdFx0XHRcdFx0XHRzd2l0Y2ggKCByZXNwb25zZV9kYXRhWyAnYWp4X2RhdGEnIF1bICdzdGF0dXNfZXJyb3InIF0gKXtcclxuXHJcblx0XHRcdFx0XHRcdFx0Y2FzZSAnY2FwdGNoYV9zaW1wbGVfd3JvbmcnOlxyXG5cdFx0XHRcdFx0XHRcdFx0d3BiY19jYXB0Y2hhX19zaW1wbGVfX3VwZGF0ZSgge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCdyZXNvdXJjZV9pZCc6IHJlc3BvbnNlX2RhdGFbICdyZXNvdXJjZV9pZCcgXSxcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQndXJsJyAgICAgICAgOiByZXNwb25zZV9kYXRhWyAnYWp4X2RhdGEnIF1bICdjYXB0Y2hhX19zaW1wbGUnIF1bICd1cmwnIF0sXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0J2NoYWxsZW5nZScgIDogcmVzcG9uc2VfZGF0YVsgJ2FqeF9kYXRhJyBdWyAnY2FwdGNoYV9fc2ltcGxlJyBdWyAnY2hhbGxlbmdlJyBdLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCdtZXNzYWdlJyAgICA6IHJlc3BvbnNlX2RhdGFbICdhanhfZGF0YScgXVsgJ2FqeF9hZnRlcl9hY3Rpb25fbWVzc2FnZScgXS5yZXBsYWNlKCAvXFxuL2csIFwiPGJyIC8+XCIgKVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQpO1xyXG5cdFx0XHRcdFx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRcdFx0XHRcdGNhc2UgJ3Jlc291cmNlX2lkX2luY29ycmVjdCc6XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvLyBTaG93IEVycm9yIE1lc3NhZ2UgLSBpbmNvcnJlY3QgIGJvb2tpbmcgcmVzb3VyY2UgSUQgZHVyaW5nIHN1Ym1pdCBvZiBib29raW5nLlxyXG5cdFx0XHRcdFx0XHRcdFx0dmFyIG1lc3NhZ2VfaWQgPSB3cGJjX2Zyb250X2VuZF9fc2hvd19tZXNzYWdlKCByZXNwb25zZV9kYXRhWyAnYWp4X2RhdGEnIF1bICdhanhfYWZ0ZXJfYWN0aW9uX21lc3NhZ2UnIF0ucmVwbGFjZSggL1xcbi9nLCBcIjxiciAvPlwiICksXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0J3R5cGUnIDogKCd1bmRlZmluZWQnICE9PSB0eXBlb2YgKHJlc3BvbnNlX2RhdGFbICdhanhfZGF0YScgXVsgJ2FqeF9hZnRlcl9hY3Rpb25fbWVzc2FnZV9zdGF0dXMnIF0pKVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdD8gcmVzcG9uc2VfZGF0YVsgJ2FqeF9kYXRhJyBdWyAnYWp4X2FmdGVyX2FjdGlvbl9tZXNzYWdlX3N0YXR1cycgXSA6ICd3YXJuaW5nJyxcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCdkZWxheScgICAgOiAwLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0J3Nob3dfaGVyZSc6IHsgJ3doZXJlJzogJ2FmdGVyJywgJ2pxX25vZGUnOiAnI2Jvb2tpbmdfZm9ybScgKyBwYXJhbXNbICdyZXNvdXJjZV9pZCcgXSB9XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0fSApO1xyXG5cdFx0XHRcdFx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRcdFx0XHRcdGNhc2UgJ2Jvb2tpbmdfY2FuX25vdF9zYXZlJzpcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vIFdlIGNhbiBub3Qgc2F2ZSBib29raW5nLCBiZWNhdXNlIGRhdGVzIGFyZSBib29rZWQgb3IgY2FuIG5vdCBzYXZlIGluIHNhbWUgYm9va2luZyByZXNvdXJjZSBhbGwgdGhlIGRhdGVzXHJcblx0XHRcdFx0XHRcdFx0XHR2YXIgbWVzc2FnZV9pZCA9IHdwYmNfZnJvbnRfZW5kX19zaG93X21lc3NhZ2UoIHJlc3BvbnNlX2RhdGFbICdhanhfZGF0YScgXVsgJ2FqeF9hZnRlcl9hY3Rpb25fbWVzc2FnZScgXS5yZXBsYWNlKCAvXFxuL2csIFwiPGJyIC8+XCIgKSxcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQndHlwZScgOiAoJ3VuZGVmaW5lZCcgIT09IHR5cGVvZiAocmVzcG9uc2VfZGF0YVsgJ2FqeF9kYXRhJyBdWyAnYWp4X2FmdGVyX2FjdGlvbl9tZXNzYWdlX3N0YXR1cycgXSkpXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PyByZXNwb25zZV9kYXRhWyAnYWp4X2RhdGEnIF1bICdhanhfYWZ0ZXJfYWN0aW9uX21lc3NhZ2Vfc3RhdHVzJyBdIDogJ3dhcm5pbmcnLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0J2RlbGF5JyAgICA6IDAsXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQnc2hvd19oZXJlJzogeyAnd2hlcmUnOiAnYWZ0ZXInLCAnanFfbm9kZSc6ICcjYm9va2luZ19mb3JtJyArIHBhcmFtc1sgJ3Jlc291cmNlX2lkJyBdIH1cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9ICk7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0Ly8gRW5hYmxlIFN1Ym1pdCB8IEhpZGUgc3BpbiBsb2FkZXJcclxuXHRcdFx0XHRcdFx0XHRcdHdwYmNfYm9va2luZ19mb3JtX19vbl9yZXNwb25zZV9fdWlfZWxlbWVudHNfZW5hYmxlKCByZXNwb25zZV9kYXRhWyAncmVzb3VyY2VfaWQnIF0gKTtcclxuXHJcblx0XHRcdFx0XHRcdFx0XHRicmVhaztcclxuXHJcblxyXG5cdFx0XHRcdFx0XHRcdGRlZmF1bHQ6XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0Ly8gPGVkaXRvci1mb2xkICAgICBkZWZhdWx0c3RhdGU9XCJjb2xsYXBzZWRcIiAgICAgICAgICAgICAgICAgICAgICAgIGRlc2M9XCIgPSBGb3IgZGVidWcgb25seSA/IC0tICBTaG93IE1lc3NhZ2UgdW5kZXIgdGhlIGZvcm0gPSBcIiAgPlxyXG5cdFx0XHRcdFx0XHRcdFx0Ly8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHRcdFx0XHRcdFx0XHRcdGlmIChcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHQoICd1bmRlZmluZWQnICE9PSB0eXBlb2YgKHJlc3BvbnNlX2RhdGFbICdhanhfZGF0YScgXVsgJ2FqeF9hZnRlcl9hY3Rpb25fbWVzc2FnZScgXSkgKVxyXG5cdFx0XHRcdFx0XHRcdFx0XHQgJiYgKCAnJyAhPSByZXNwb25zZV9kYXRhWyAnYWp4X2RhdGEnIF1bICdhanhfYWZ0ZXJfYWN0aW9uX21lc3NhZ2UnIF0ucmVwbGFjZSggL1xcbi9nLCBcIjxiciAvPlwiICkgKVxyXG5cdFx0XHRcdFx0XHRcdFx0KXtcclxuXHJcblx0XHRcdFx0XHRcdFx0XHRcdHZhciBjYWxlbmRhcl9pZCA9IHdwYmNfZ2V0X3Jlc291cmNlX2lkX19mcm9tX2FqeF9wb3N0X2RhdGFfdXJsKCB0aGlzLmRhdGEgKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0dmFyIGpxX25vZGUgPSAnI2Jvb2tpbmdfZm9ybScgKyBjYWxlbmRhcl9pZDtcclxuXHJcblx0XHRcdFx0XHRcdFx0XHRcdHZhciBhanhfYWZ0ZXJfYm9va2luZ19tZXNzYWdlID0gcmVzcG9uc2VfZGF0YVsgJ2FqeF9kYXRhJyBdWyAnYWp4X2FmdGVyX2FjdGlvbl9tZXNzYWdlJyBdLnJlcGxhY2UoIC9cXG4vZywgXCI8YnIgLz5cIiApO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRcdFx0Y29uc29sZS5sb2coIGFqeF9hZnRlcl9ib29raW5nX21lc3NhZ2UgKTtcclxuXHJcblx0XHRcdFx0XHRcdFx0XHRcdC8qKlxyXG5cdFx0XHRcdFx0XHRcdFx0XHQgKiAvLyBTaG93IE1lc3NhZ2VcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR2YXIgYWp4X2FmdGVyX2FjdGlvbl9tZXNzYWdlX2lkID0gd3BiY19mcm9udF9lbmRfX3Nob3dfbWVzc2FnZSggYWp4X2FmdGVyX2Jvb2tpbmdfbWVzc2FnZSxcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0J3R5cGUnIDogKCd1bmRlZmluZWQnICE9PSB0eXBlb2YgKHJlc3BvbnNlX2RhdGFbICdhanhfZGF0YScgXVsgJ2FqeF9hZnRlcl9hY3Rpb25fbWVzc2FnZV9zdGF0dXMnIF0pKVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PyByZXNwb25zZV9kYXRhWyAnYWp4X2RhdGEnIF1bICdhanhfYWZ0ZXJfYWN0aW9uX21lc3NhZ2Vfc3RhdHVzJyBdIDogJ2luZm8nLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQnZGVsYXknICAgIDogMTAwMDAsXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCdzaG93X2hlcmUnOiB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0J2pxX25vZGUnOiBqcV9ub2RlLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCd3aGVyZScgIDogJ2FmdGVyJ1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQgfVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0fSApO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHQgKi9cclxuXHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdC8vIDwvZWRpdG9yLWZvbGQ+XHJcblx0XHRcdFx0XHRcdH1cclxuXHJcblxyXG5cdFx0XHRcdFx0XHQvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblx0XHRcdFx0XHRcdC8vIFJlYWN0aXZhdGUgY2FsZW5kYXIgYWdhaW4gP1xyXG5cdFx0XHRcdFx0XHQvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblx0XHRcdFx0XHRcdC8vIEVuYWJsZSBTdWJtaXQgfCBIaWRlIHNwaW4gbG9hZGVyXHJcblx0XHRcdFx0XHRcdHdwYmNfYm9va2luZ19mb3JtX19vbl9yZXNwb25zZV9fdWlfZWxlbWVudHNfZW5hYmxlKCByZXNwb25zZV9kYXRhWyAncmVzb3VyY2VfaWQnIF0gKTtcclxuXHJcblx0XHRcdFx0XHRcdC8vIFVuc2VsZWN0ICBkYXRlc1xyXG5cdFx0XHRcdFx0XHR3cGJjX2NhbGVuZGFyX191bnNlbGVjdF9hbGxfZGF0ZXMoIHJlc3BvbnNlX2RhdGFbICdyZXNvdXJjZV9pZCcgXSApO1xyXG5cclxuXHRcdFx0XHRcdFx0Ly8gJ3Jlc291cmNlX2lkJyAgICA9PiAkcGFyYW1zWydyZXNvdXJjZV9pZCddLFxyXG5cdFx0XHRcdFx0XHQvLyAnYm9va2luZ19oYXNoJyAgID0+ICRib29raW5nX2hhc2gsXHJcblx0XHRcdFx0XHRcdC8vICdyZXF1ZXN0X3VyaScgICAgPT4gJF9TRVJWRVJbJ1JFUVVFU1RfVVJJJ10sICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBJcyBpdCB0aGUgc2FtZSBhcyB3aW5kb3cubG9jYXRpb24uaHJlZiBvclxyXG5cdFx0XHRcdFx0XHQvLyAnY3VzdG9tX2Zvcm0nICAgID0+ICRwYXJhbXNbJ2N1c3RvbV9mb3JtJ10sICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gT3B0aW9uYWwuXHJcblx0XHRcdFx0XHRcdC8vICdhZ2dyZWdhdGVfcmVzb3VyY2VfaWRfc3RyJyA9PiBpbXBsb2RlKCAnLCcsICRwYXJhbXNbJ2FnZ3JlZ2F0ZV9yZXNvdXJjZV9pZF9hcnInXSApICAgICAvLyBPcHRpb25hbC4gUmVzb3VyY2UgSUQgICBmcm9tICBhZ2dyZWdhdGUgcGFyYW1ldGVyIGluIHNob3J0Y29kZS5cclxuXHJcblx0XHRcdFx0XHRcdC8vIExvYWQgbmV3IGRhdGEgaW4gY2FsZW5kYXIuXHJcblx0XHRcdFx0XHRcdHdwYmNfY2FsZW5kYXJfX2xvYWRfZGF0YV9fYWp4KCB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQgICdyZXNvdXJjZV9pZCcgOiByZXNwb25zZV9kYXRhWyAncmVzb3VyY2VfaWQnIF1cdFx0XHRcdFx0XHRcdC8vIEl0J3MgZnJvbSByZXNwb25zZSAuLi5BSlhfQk9PS0lOR19fQ1JFQVRFIG9mIGluaXRpYWwgc2VudCByZXNvdXJjZV9pZFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0LCAnYm9va2luZ19oYXNoJzogcmVzcG9uc2VfZGF0YVsgJ2FqeF9jbGVhbmVkX3BhcmFtcycgXVsnYm9va2luZ19oYXNoJ10gXHQvLyA/PyB3ZSBjYW4gbm90IHVzZSBpdCwgIGJlY2F1c2UgSEFTSCBjaG5hZ2VkIGluIGFueSAgY2FzZSFcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdCwgJ3JlcXVlc3RfdXJpJyA6IHJlc3BvbnNlX2RhdGFbICdhanhfY2xlYW5lZF9wYXJhbXMnIF1bJ3JlcXVlc3RfdXJpJ11cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdCwgJ2N1c3RvbV9mb3JtJyA6IHJlc3BvbnNlX2RhdGFbICdhanhfY2xlYW5lZF9wYXJhbXMnIF1bJ2N1c3RvbV9mb3JtJ11cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvLyBBZ2dyZWdhdGUgYm9va2luZyByZXNvdXJjZXMsICBpZiBhbnkgP1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0LCAnYWdncmVnYXRlX3Jlc291cmNlX2lkX3N0cicgOiBfd3BiYy5ib29raW5nX19nZXRfcGFyYW1fdmFsdWUoIHJlc3BvbnNlX2RhdGFbICdyZXNvdXJjZV9pZCcgXSwgJ2FnZ3JlZ2F0ZV9yZXNvdXJjZV9pZF9hcnInICkuam9pbignLCcpXHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdH0gKTtcclxuXHRcdFx0XHRcdFx0Ly8gRXhpdFxyXG5cdFx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0Ly8gPC9lZGl0b3ItZm9sZD5cclxuXHJcblxyXG4vKlxyXG5cdC8vIFNob3cgQ2FsZW5kYXJcclxuXHR3cGJjX2NhbGVuZGFyX19sb2FkaW5nX19zdG9wKCByZXNwb25zZV9kYXRhWyAncmVzb3VyY2VfaWQnIF0gKTtcclxuXHJcblx0Ly8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdC8vIEJvb2tpbmdzIC0gRGF0ZXNcclxuXHRfd3BiYy5ib29raW5nc19pbl9jYWxlbmRhcl9fc2V0X2RhdGVzKCAgcmVzcG9uc2VfZGF0YVsgJ3Jlc291cmNlX2lkJyBdLCByZXNwb25zZV9kYXRhWyAnYWp4X2RhdGEnIF1bJ2RhdGVzJ10gICk7XHJcblxyXG5cdC8vIEJvb2tpbmdzIC0gQ2hpbGQgb3Igb25seSBzaW5nbGUgYm9va2luZyByZXNvdXJjZSBpbiBkYXRlc1xyXG5cdF93cGJjLmJvb2tpbmdfX3NldF9wYXJhbV92YWx1ZSggcmVzcG9uc2VfZGF0YVsgJ3Jlc291cmNlX2lkJyBdLCAncmVzb3VyY2VzX2lkX2Fycl9faW5fZGF0ZXMnLCByZXNwb25zZV9kYXRhWyAnYWp4X2RhdGEnIF1bICdyZXNvdXJjZXNfaWRfYXJyX19pbl9kYXRlcycgXSApO1xyXG5cdC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcblx0Ly8gVXBkYXRlIGNhbGVuZGFyXHJcblx0d3BiY19jYWxlbmRhcl9fdXBkYXRlX2xvb2soIHJlc3BvbnNlX2RhdGFbICdyZXNvdXJjZV9pZCcgXSApO1xyXG4qL1xyXG5cclxuXHRcdFx0XHRcdC8vIEhpZGUgc3BpbiBsb2FkZXJcclxuXHRcdFx0XHRcdHdwYmNfYm9va2luZ19mb3JtX19zcGluX2xvYWRlcl9faGlkZSggcmVzcG9uc2VfZGF0YVsgJ3Jlc291cmNlX2lkJyBdICk7XHJcblxyXG5cdFx0XHRcdFx0Ly8gSGlkZSBib29raW5nIGZvcm1cclxuXHRcdFx0XHRcdHdwYmNfYm9va2luZ19mb3JtX19hbmltYXRlZF9faGlkZSggcmVzcG9uc2VfZGF0YVsgJ3Jlc291cmNlX2lkJyBdICk7XHJcblxyXG5cdFx0XHRcdFx0Ly8gU2hvdyBDb25maXJtYXRpb24gfCBQYXltZW50IHNlY3Rpb25cclxuXHRcdFx0XHRcdHdwYmNfc2hvd190aGFua195b3VfbWVzc2FnZV9hZnRlcl9ib29raW5nKCByZXNwb25zZV9kYXRhICk7XHJcblxyXG5cdFx0XHRcdFx0c2V0VGltZW91dCggZnVuY3Rpb24gKCl7XHJcblx0XHRcdFx0XHRcdHdwYmNfZG9fc2Nyb2xsKCAnI3dwYmNfc2Nyb2xsX3BvaW50XycgKyByZXNwb25zZV9kYXRhWyAncmVzb3VyY2VfaWQnIF0sIDEwICk7XHJcblx0XHRcdFx0XHR9LCA1MDAgKTtcclxuXHJcblxyXG5cclxuXHRcdFx0XHR9XHJcblx0XHRcdCAgKS5mYWlsKFxyXG5cdFx0XHRcdCAgLy8gPGVkaXRvci1mb2xkICAgICBkZWZhdWx0c3RhdGU9XCJjb2xsYXBzZWRcIiAgICAgICAgICAgICAgICAgICAgICAgIGRlc2M9XCIgPSBUaGlzIHNlY3Rpb24gZXhlY3V0ZSwgIHdoZW4gIE5PTkNFIGZpZWxkIHdhcyBub3QgcGFzc2VkIG9yIHNvbWUgZXJyb3IgaGFwcGVuZWQgYXQgIHNlcnZlciEgPSBcIiAgPlxyXG5cdFx0XHRcdCAgZnVuY3Rpb24gKCBqcVhIUiwgdGV4dFN0YXR1cywgZXJyb3JUaHJvd24gKSB7ICAgIGlmICggd2luZG93LmNvbnNvbGUgJiYgd2luZG93LmNvbnNvbGUubG9nICl7IGNvbnNvbGUubG9nKCAnQWpheF9FcnJvcicsIGpxWEhSLCB0ZXh0U3RhdHVzLCBlcnJvclRocm93biApOyB9XHJcblxyXG5cdFx0XHRcdFx0Ly8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdFx0XHRcdFx0Ly8gVGhpcyBzZWN0aW9uIGV4ZWN1dGUsICB3aGVuICBOT05DRSBmaWVsZCB3YXMgbm90IHBhc3NlZCBvciBzb21lIGVycm9yIGhhcHBlbmVkIGF0ICBzZXJ2ZXIhXHJcblx0XHRcdFx0XHQvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG5cdFx0XHRcdFx0Ly8gR2V0IENvbnRlbnQgb2YgRXJyb3IgTWVzc2FnZVxyXG5cdFx0XHRcdFx0dmFyIGVycm9yX21lc3NhZ2UgPSAnPHN0cm9uZz4nICsgJ0Vycm9yIScgKyAnPC9zdHJvbmc+ICcgKyBlcnJvclRocm93biA7XHJcblx0XHRcdFx0XHRpZiAoIGpxWEhSLnN0YXR1cyApe1xyXG5cdFx0XHRcdFx0XHRlcnJvcl9tZXNzYWdlICs9ICcgKDxiPicgKyBqcVhIUi5zdGF0dXMgKyAnPC9iPiknO1xyXG5cdFx0XHRcdFx0XHRpZiAoNDAzID09IGpxWEhSLnN0YXR1cyApe1xyXG5cdFx0XHRcdFx0XHRcdGVycm9yX21lc3NhZ2UgKz0gJzxicj4gUHJvYmFibHkgbm9uY2UgZm9yIHRoaXMgcGFnZSBoYXMgYmVlbiBleHBpcmVkLiBQbGVhc2UgPGEgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiIG9uY2xpY2s9XCJqYXZhc2NyaXB0OmxvY2F0aW9uLnJlbG9hZCgpO1wiPnJlbG9hZCB0aGUgcGFnZTwvYT4uJztcclxuXHRcdFx0XHRcdFx0XHRlcnJvcl9tZXNzYWdlICs9ICc8YnI+IE90aGVyd2lzZSwgcGxlYXNlIGNoZWNrIHRoaXMgPGEgc3R5bGU9XCJmb250LXdlaWdodDogNjAwO1wiIGhyZWY9XCJodHRwczovL3dwYm9va2luZ2NhbGVuZGFyLmNvbS9mYXEvcmVxdWVzdC1kby1ub3QtcGFzcy1zZWN1cml0eS1jaGVjay8/YWZ0ZXJfdXBkYXRlPTEwLjEuMVwiPnRyb3VibGVzaG9vdGluZyBpbnN0cnVjdGlvbjwvYT4uPGJyPidcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0aWYgKCBqcVhIUi5yZXNwb25zZVRleHQgKXtcclxuXHRcdFx0XHRcdFx0Ly8gRXNjYXBlIHRhZ3MgaW4gRXJyb3IgbWVzc2FnZVxyXG5cdFx0XHRcdFx0XHRlcnJvcl9tZXNzYWdlICs9ICc8YnI+PHN0cm9uZz5SZXNwb25zZTwvc3Ryb25nPjxkaXYgc3R5bGU9XCJwYWRkaW5nOiAwIDEwcHg7bWFyZ2luOiAwIDAgMTBweDtib3JkZXItcmFkaXVzOjNweDsgYm94LXNoYWRvdzowcHggMHB4IDFweCAjYTNhM2EzO1wiPicgKyBqcVhIUi5yZXNwb25zZVRleHQucmVwbGFjZSgvJi9nLCBcIiZhbXA7XCIpXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0IC5yZXBsYWNlKC88L2csIFwiJmx0O1wiKVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCAucmVwbGFjZSgvPi9nLCBcIiZndDtcIilcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQgLnJlcGxhY2UoL1wiL2csIFwiJnF1b3Q7XCIpXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0IC5yZXBsYWNlKC8nL2csIFwiJiMzOTtcIilcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHQrJzwvZGl2Pic7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRlcnJvcl9tZXNzYWdlID0gZXJyb3JfbWVzc2FnZS5yZXBsYWNlKCAvXFxuL2csIFwiPGJyIC8+XCIgKTtcclxuXHJcblx0XHRcdFx0XHR2YXIgY2FsZW5kYXJfaWQgPSB3cGJjX2dldF9yZXNvdXJjZV9pZF9fZnJvbV9hanhfcG9zdF9kYXRhX3VybCggdGhpcy5kYXRhICk7XHJcblx0XHRcdFx0XHR2YXIganFfbm9kZSA9ICcjYm9va2luZ19mb3JtJyArIGNhbGVuZGFyX2lkO1xyXG5cclxuXHRcdFx0XHRcdC8vIFNob3cgTWVzc2FnZVxyXG5cdFx0XHRcdFx0d3BiY19mcm9udF9lbmRfX3Nob3dfbWVzc2FnZSggZXJyb3JfbWVzc2FnZSAsIHsgJ3R5cGUnICAgICA6ICdlcnJvcicsXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQnc2hvd19oZXJlJzogeydqcV9ub2RlJzoganFfbm9kZSwgJ3doZXJlJzogJ2FmdGVyJ30sXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQnaXNfYXBwZW5kJzogdHJ1ZSxcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCdzdHlsZScgICAgOiAndGV4dC1hbGlnbjpsZWZ0OycsXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQnZGVsYXknICAgIDogMFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdH0gKTtcclxuXHRcdFx0XHRcdC8vIEVuYWJsZSBTdWJtaXQgfCBIaWRlIHNwaW4gbG9hZGVyXHJcblx0XHRcdFx0XHR3cGJjX2Jvb2tpbmdfZm9ybV9fb25fcmVzcG9uc2VfX3VpX2VsZW1lbnRzX2VuYWJsZSggY2FsZW5kYXJfaWQgKTtcclxuXHRcdFx0ICBcdCB9XHJcblx0XHRcdFx0IC8vIDwvZWRpdG9yLWZvbGQ+XHJcblx0XHRcdCAgKVxyXG5cdCAgICAgICAgICAvLyAuZG9uZSggICBmdW5jdGlvbiAoIGRhdGEsIHRleHRTdGF0dXMsIGpxWEhSICkgeyAgIGlmICggd2luZG93LmNvbnNvbGUgJiYgd2luZG93LmNvbnNvbGUubG9nICl7IGNvbnNvbGUubG9nKCAnc2Vjb25kIHN1Y2Nlc3MnLCBkYXRhLCB0ZXh0U3RhdHVzLCBqcVhIUiApOyB9ICAgIH0pXHJcblx0XHRcdCAgLy8gLmFsd2F5cyggZnVuY3Rpb24gKCBkYXRhX2pxWEhSLCB0ZXh0U3RhdHVzLCBqcVhIUl9lcnJvclRocm93biApIHsgICBpZiAoIHdpbmRvdy5jb25zb2xlICYmIHdpbmRvdy5jb25zb2xlLmxvZyApeyBjb25zb2xlLmxvZyggJ2Fsd2F5cyBmaW5pc2hlZCcsIGRhdGFfanFYSFIsIHRleHRTdGF0dXMsIGpxWEhSX2Vycm9yVGhyb3duICk7IH0gICAgIH0pXHJcblx0XHRcdCAgOyAgLy8gRW5kIEFqYXhcclxuXHJcblx0cmV0dXJuIHRydWU7XHJcbn1cclxuXHJcblxyXG5cdC8vIDxlZGl0b3ItZm9sZCAgICAgZGVmYXVsdHN0YXRlPVwiY29sbGFwc2VkXCIgICAgICAgICAgICAgICAgICAgICAgICBkZXNjPVwiICA9PSAgQ0FQVENIQSA9PSAgXCIgID5cclxuXHJcblx0LyoqXHJcblx0ICogVXBkYXRlIGltYWdlIGluIGNhcHRjaGEgYW5kIHNob3cgd2FybmluZyBtZXNzYWdlXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gcGFyYW1zXHJcblx0ICpcclxuXHQgKiBFeGFtcGxlIG9mICdwYXJhbXMnIDoge1xyXG5cdCAqXHRcdFx0XHRcdFx0XHQncmVzb3VyY2VfaWQnOiByZXNwb25zZV9kYXRhWyAncmVzb3VyY2VfaWQnIF0sXHJcblx0ICpcdFx0XHRcdFx0XHRcdCd1cmwnICAgICAgICA6IHJlc3BvbnNlX2RhdGFbICdhanhfZGF0YScgXVsgJ2NhcHRjaGFfX3NpbXBsZScgXVsgJ3VybCcgXSxcclxuXHQgKlx0XHRcdFx0XHRcdFx0J2NoYWxsZW5nZScgIDogcmVzcG9uc2VfZGF0YVsgJ2FqeF9kYXRhJyBdWyAnY2FwdGNoYV9fc2ltcGxlJyBdWyAnY2hhbGxlbmdlJyBdLFxyXG5cdCAqXHRcdFx0XHRcdFx0XHQnbWVzc2FnZScgICAgOiByZXNwb25zZV9kYXRhWyAnYWp4X2RhdGEnIF1bICdhanhfYWZ0ZXJfYWN0aW9uX21lc3NhZ2UnIF0ucmVwbGFjZSggL1xcbi9nLCBcIjxiciAvPlwiIClcclxuXHQgKlx0XHRcdFx0XHRcdH1cclxuXHQgKi9cclxuXHRmdW5jdGlvbiB3cGJjX2NhcHRjaGFfX3NpbXBsZV9fdXBkYXRlKCBwYXJhbXMgKXtcclxuXHJcblx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCggJ2NhcHRjaGFfaW5wdXQnICsgcGFyYW1zWyAncmVzb3VyY2VfaWQnIF0gKS52YWx1ZSA9ICcnO1xyXG5cdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoICdjYXB0Y2hhX2ltZycgKyBwYXJhbXNbICdyZXNvdXJjZV9pZCcgXSApLnNyYyA9IHBhcmFtc1sgJ3VybCcgXTtcclxuXHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCAnd3BkZXZfY2FwdGNoYV9jaGFsbGVuZ2VfJyArIHBhcmFtc1sgJ3Jlc291cmNlX2lkJyBdICkudmFsdWUgPSBwYXJhbXNbICdjaGFsbGVuZ2UnIF07XHJcblxyXG5cdFx0Ly8gU2hvdyB3YXJuaW5nIFx0XHRBZnRlciBDQVBUQ0hBIEltZ1xyXG5cdFx0dmFyIG1lc3NhZ2VfaWQgPSB3cGJjX2Zyb250X2VuZF9fc2hvd19tZXNzYWdlX193YXJuaW5nKCAnI2NhcHRjaGFfaW5wdXQnICsgcGFyYW1zWyAncmVzb3VyY2VfaWQnIF0gKyAnICsgaW1nJywgcGFyYW1zWyAnbWVzc2FnZScgXSApO1xyXG5cclxuXHRcdC8vIEFuaW1hdGVcclxuXHRcdGpRdWVyeSggJyMnICsgbWVzc2FnZV9pZCArICcsICcgKyAnI2NhcHRjaGFfaW5wdXQnICsgcGFyYW1zWyAncmVzb3VyY2VfaWQnIF0gKS5mYWRlT3V0KCAzNTAgKS5mYWRlSW4oIDMwMCApLmZhZGVPdXQoIDM1MCApLmZhZGVJbiggNDAwICkuYW5pbWF0ZSgge29wYWNpdHk6IDF9LCA0MDAwICk7XHJcblx0XHQvLyBGb2N1cyB0ZXh0ICBmaWVsZFxyXG5cdFx0alF1ZXJ5KCAnI2NhcHRjaGFfaW5wdXQnICsgcGFyYW1zWyAncmVzb3VyY2VfaWQnIF0gKS50cmlnZ2VyKCAnZm9jdXMnICk7ICAgIFx0XHRcdFx0XHRcdFx0XHRcdC8vRml4SW46IDguNy4xMS4xMlxyXG5cclxuXHJcblx0XHQvLyBFbmFibGUgU3VibWl0IHwgSGlkZSBzcGluIGxvYWRlclxyXG5cdFx0d3BiY19ib29raW5nX2Zvcm1fX29uX3Jlc3BvbnNlX191aV9lbGVtZW50c19lbmFibGUoIHBhcmFtc1sgJ3Jlc291cmNlX2lkJyBdICk7XHJcblx0fVxyXG5cclxuXHJcblx0LyoqXHJcblx0ICogSWYgdGhlIGNhcHRjaGEgZWxlbWVudHMgbm90IGV4aXN0ICBpbiB0aGUgYm9va2luZyBmb3JtLCAgdGhlbiAgcmVtb3ZlIHBhcmFtZXRlcnMgcmVsYXRpdmUgY2FwdGNoYVxyXG5cdCAqIEBwYXJhbSBwYXJhbXNcclxuXHQgKiBAcmV0dXJucyBvYmpcclxuXHQgKi9cclxuXHRmdW5jdGlvbiB3cGJjX2NhcHRjaGFfX3NpbXBsZV9fbWF5YmVfcmVtb3ZlX2luX2FqeF9wYXJhbXMoIHBhcmFtcyApe1xyXG5cclxuXHRcdGlmICggISB3cGJjX2NhcHRjaGFfX3NpbXBsZV9faXNfZXhpc3RfaW5fZm9ybSggcGFyYW1zWyAncmVzb3VyY2VfaWQnIF0gKSApe1xyXG5cdFx0XHRkZWxldGUgcGFyYW1zWyAnY2FwdGNoYV9jaGFsYW5nZScgXTtcclxuXHRcdFx0ZGVsZXRlIHBhcmFtc1sgJ2NhcHRjaGFfdXNlcl9pbnB1dCcgXTtcclxuXHRcdH1cclxuXHRcdHJldHVybiBwYXJhbXM7XHJcblx0fVxyXG5cclxuXHJcblx0LyoqXHJcblx0ICogQ2hlY2sgaWYgQ0FQVENIQSBleGlzdCBpbiB0aGUgYm9va2luZyBmb3JtXHJcblx0ICogQHBhcmFtIHJlc291cmNlX2lkXHJcblx0ICogQHJldHVybnMge2Jvb2xlYW59XHJcblx0ICovXHJcblx0ZnVuY3Rpb24gd3BiY19jYXB0Y2hhX19zaW1wbGVfX2lzX2V4aXN0X2luX2Zvcm0oIHJlc291cmNlX2lkICl7XHJcblxyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0XHRcdFx0KDAgIT09IGpRdWVyeSggJyN3cGRldl9jYXB0Y2hhX2NoYWxsZW5nZV8nICsgcmVzb3VyY2VfaWQgKS5sZW5ndGgpXHJcblx0XHRcdFx0XHQgfHwgKDAgIT09IGpRdWVyeSggJyNjYXB0Y2hhX2lucHV0JyArIHJlc291cmNlX2lkICkubGVuZ3RoKVxyXG5cdFx0XHRcdCk7XHJcblx0fVxyXG5cclxuXHQvLyA8L2VkaXRvci1mb2xkPlxyXG5cclxuXHJcblx0Ly8gPGVkaXRvci1mb2xkICAgICBkZWZhdWx0c3RhdGU9XCJjb2xsYXBzZWRcIiAgICAgICAgICAgICAgICAgICAgICAgIGRlc2M9XCIgID09ICBTZW5kIEJ1dHRvbiB8IEZvcm0gU3BpbiBMb2FkZXIgID09ICBcIiAgPlxyXG5cclxuXHQvKipcclxuXHQgKiBEaXNhYmxlIFNlbmQgYnV0dG9uICB8ICBTaG93IFNwaW4gTG9hZGVyXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gcmVzb3VyY2VfaWRcclxuXHQgKi9cclxuXHRmdW5jdGlvbiB3cGJjX2Jvb2tpbmdfZm9ybV9fb25fc3VibWl0X191aV9lbGVtZW50c19kaXNhYmxlKCByZXNvdXJjZV9pZCApe1xyXG5cclxuXHRcdC8vIERpc2FibGUgU3VibWl0XHJcblx0XHR3cGJjX2Jvb2tpbmdfZm9ybV9fc2VuZF9idXR0b25fX2Rpc2FibGUoIHJlc291cmNlX2lkICk7XHJcblxyXG5cdFx0Ly8gU2hvdyBTcGluIGxvYWRlciBpbiBib29raW5nIGZvcm1cclxuXHRcdHdwYmNfYm9va2luZ19mb3JtX19zcGluX2xvYWRlcl9fc2hvdyggcmVzb3VyY2VfaWQgKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEVuYWJsZSBTZW5kIGJ1dHRvbiAgfCAgIEhpZGUgU3BpbiBMb2FkZXJcclxuXHQgKlxyXG5cdCAqIEBwYXJhbSByZXNvdXJjZV9pZFxyXG5cdCAqL1xyXG5cdGZ1bmN0aW9uIHdwYmNfYm9va2luZ19mb3JtX19vbl9yZXNwb25zZV9fdWlfZWxlbWVudHNfZW5hYmxlKHJlc291cmNlX2lkKXtcclxuXHJcblx0XHQvLyBFbmFibGUgU3VibWl0XHJcblx0XHR3cGJjX2Jvb2tpbmdfZm9ybV9fc2VuZF9idXR0b25fX2VuYWJsZSggcmVzb3VyY2VfaWQgKTtcclxuXHJcblx0XHQvLyBIaWRlIFNwaW4gbG9hZGVyIGluIGJvb2tpbmcgZm9ybVxyXG5cdFx0d3BiY19ib29raW5nX2Zvcm1fX3NwaW5fbG9hZGVyX19oaWRlKCByZXNvdXJjZV9pZCApO1xyXG5cdH1cclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEVuYWJsZSBTdWJtaXQgYnV0dG9uXHJcblx0XHQgKiBAcGFyYW0gcmVzb3VyY2VfaWRcclxuXHRcdCAqL1xyXG5cdFx0ZnVuY3Rpb24gd3BiY19ib29raW5nX2Zvcm1fX3NlbmRfYnV0dG9uX19lbmFibGUoIHJlc291cmNlX2lkICl7XHJcblxyXG5cdFx0XHQvLyBBY3RpdmF0ZSBTZW5kIGJ1dHRvblxyXG5cdFx0XHRqUXVlcnkoICcjYm9va2luZ19mb3JtX2RpdicgKyByZXNvdXJjZV9pZCArICcgaW5wdXRbdHlwZT1idXR0b25dJyApLnByb3AoIFwiZGlzYWJsZWRcIiwgZmFsc2UgKTtcclxuXHRcdFx0alF1ZXJ5KCAnI2Jvb2tpbmdfZm9ybV9kaXYnICsgcmVzb3VyY2VfaWQgKyAnIGJ1dHRvbicgKS5wcm9wKCBcImRpc2FibGVkXCIsIGZhbHNlICk7XHJcblx0XHR9XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBEaXNhYmxlIFN1Ym1pdCBidXR0b24gIGFuZCBzaG93ICBzcGluXHJcblx0XHQgKlxyXG5cdFx0ICogQHBhcmFtIHJlc291cmNlX2lkXHJcblx0XHQgKi9cclxuXHRcdGZ1bmN0aW9uIHdwYmNfYm9va2luZ19mb3JtX19zZW5kX2J1dHRvbl9fZGlzYWJsZSggcmVzb3VyY2VfaWQgKXtcclxuXHJcblx0XHRcdC8vIERpc2FibGUgU2VuZCBidXR0b25cclxuXHRcdFx0alF1ZXJ5KCAnI2Jvb2tpbmdfZm9ybV9kaXYnICsgcmVzb3VyY2VfaWQgKyAnIGlucHV0W3R5cGU9YnV0dG9uXScgKS5wcm9wKCBcImRpc2FibGVkXCIsIHRydWUgKTtcclxuXHRcdFx0alF1ZXJ5KCAnI2Jvb2tpbmdfZm9ybV9kaXYnICsgcmVzb3VyY2VfaWQgKyAnIGJ1dHRvbicgKS5wcm9wKCBcImRpc2FibGVkXCIsIHRydWUgKTtcclxuXHRcdH1cclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFNob3cgYm9va2luZyBmb3JtICBTcGluIExvYWRlclxyXG5cdFx0ICogQHBhcmFtIHJlc291cmNlX2lkXHJcblx0XHQgKi9cclxuXHRcdGZ1bmN0aW9uIHdwYmNfYm9va2luZ19mb3JtX19zcGluX2xvYWRlcl9fc2hvdyggcmVzb3VyY2VfaWQgKXtcclxuXHJcblx0XHRcdC8vIFNob3cgU3BpbiBMb2FkZXJcclxuXHRcdFx0alF1ZXJ5KCAnI2Jvb2tpbmdfZm9ybScgKyByZXNvdXJjZV9pZCApLmFmdGVyKFxyXG5cdFx0XHRcdCc8ZGl2IGlkPVwid3BiY19ib29raW5nX2Zvcm1fc3Bpbl9sb2FkZXInICsgcmVzb3VyY2VfaWQgKyAnXCIgY2xhc3M9XCJ3cGJjX2Jvb2tpbmdfZm9ybV9zcGluX2xvYWRlclwiIHN0eWxlPVwicG9zaXRpb246IHJlbGF0aXZlO1wiPjxkaXYgY2xhc3M9XCJ3cGJjX3NwaW5zX2xvYWRlcl93cmFwcGVyXCI+PGRpdiBjbGFzcz1cIndwYmNfc3BpbnNfbG9hZGVyX21pbmlcIj48L2Rpdj48L2Rpdj48L2Rpdj4nXHJcblx0XHRcdCk7XHJcblx0XHR9XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBSZW1vdmUgLyBIaWRlIGJvb2tpbmcgZm9ybSAgU3BpbiBMb2FkZXJcclxuXHRcdCAqIEBwYXJhbSByZXNvdXJjZV9pZFxyXG5cdFx0ICovXHJcblx0XHRmdW5jdGlvbiB3cGJjX2Jvb2tpbmdfZm9ybV9fc3Bpbl9sb2FkZXJfX2hpZGUoIHJlc291cmNlX2lkICl7XHJcblxyXG5cdFx0XHQvLyBSZW1vdmUgU3BpbiBMb2FkZXJcclxuXHRcdFx0alF1ZXJ5KCAnI3dwYmNfYm9va2luZ19mb3JtX3NwaW5fbG9hZGVyJyArIHJlc291cmNlX2lkICkucmVtb3ZlKCk7XHJcblx0XHR9XHJcblxyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogSGlkZSBib29raW5nIGZvcm0gd3RoIGFuaW1hdGlvblxyXG5cdFx0ICpcclxuXHRcdCAqIEBwYXJhbSByZXNvdXJjZV9pZFxyXG5cdFx0ICovXHJcblx0XHRmdW5jdGlvbiB3cGJjX2Jvb2tpbmdfZm9ybV9fYW5pbWF0ZWRfX2hpZGUoIHJlc291cmNlX2lkICl7XHJcblxyXG5cdFx0XHQvLyBqUXVlcnkoICcjYm9va2luZ19mb3JtJyArIHJlc291cmNlX2lkICkuc2xpZGVVcCggIDEwMDBcclxuXHRcdFx0Ly8gXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0LCBmdW5jdGlvbiAoKXtcclxuXHRcdFx0Ly9cclxuXHRcdFx0Ly8gXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vIGlmICggZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoICdnYXRld2F5X3BheW1lbnRfZm9ybXMnICsgcmVzcG9uc2VfZGF0YVsgJ3Jlc291cmNlX2lkJyBdICkgIT0gbnVsbCApe1xyXG5cdFx0XHQvLyBcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Ly8gXHR3cGJjX2RvX3Njcm9sbCggJyNzdWJtaXRpbmcnICsgcmVzb3VyY2VfaWQgKTtcclxuXHRcdFx0Ly8gXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vIH0gZWxzZVxyXG5cdFx0XHQvLyBcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKCBqUXVlcnkoICcjYm9va2luZ19mb3JtJyArIHJlc291cmNlX2lkICkucGFyZW50KCkuZmluZCggJy5zdWJtaXRpbmdfY29udGVudCcgKS5sZW5ndGggPiAwICl7XHJcblx0XHRcdC8vIFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vd3BiY19kb19zY3JvbGwoICcjYm9va2luZ19mb3JtJyArIHJlc291cmNlX2lkICsgJyArIC5zdWJtaXRpbmdfY29udGVudCcgKTtcclxuXHRcdFx0Ly9cclxuXHRcdFx0Ly8gXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0IHZhciBoaWRlVGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG5cdFx0XHQvLyBcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0ICB3cGJjX2RvX3Njcm9sbCggalF1ZXJ5KCAnI2Jvb2tpbmdfZm9ybScgKyByZXNvdXJjZV9pZCApLnBhcmVudCgpLmZpbmQoICcuc3VibWl0aW5nX2NvbnRlbnQnICkuZ2V0KCAwICkgKTtcclxuXHRcdFx0Ly8gXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdH0sIDEwMCk7XHJcblx0XHRcdC8vXHJcblx0XHRcdC8vIFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdC8vIFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCAgfVxyXG5cdFx0XHQvLyBcdFx0XHRcdFx0XHRcdFx0XHRcdCk7XHJcblxyXG5cdFx0XHRqUXVlcnkoICcjYm9va2luZ19mb3JtJyArIHJlc291cmNlX2lkICkuaGlkZSgpO1xyXG5cclxuXHRcdFx0Ly8gdmFyIGhpZGVUaW1lb3V0ID0gc2V0VGltZW91dCggZnVuY3Rpb24gKCl7XHJcblx0XHRcdC8vXHJcblx0XHRcdC8vIFx0aWYgKCBqUXVlcnkoICcjYm9va2luZ19mb3JtJyArIHJlc291cmNlX2lkICkucGFyZW50KCkuZmluZCggJy5zdWJtaXRpbmdfY29udGVudCcgKS5sZW5ndGggPiAwICl7XHJcblx0XHRcdC8vIFx0XHR2YXIgcmFuZG9tX2lkID0gTWF0aC5mbG9vciggKE1hdGgucmFuZG9tKCkgKiAxMDAwMCkgKyAxICk7XHJcblx0XHRcdC8vIFx0XHRqUXVlcnkoICcjYm9va2luZ19mb3JtJyArIHJlc291cmNlX2lkICkucGFyZW50KCkuYmVmb3JlKCAnPGRpdiBpZD1cInNjcm9sbF90bycgKyByYW5kb21faWQgKyAnXCI+PC9kaXY+JyApO1xyXG5cdFx0XHQvLyBcdFx0Y29uc29sZS5sb2coIGpRdWVyeSggJyNzY3JvbGxfdG8nICsgcmFuZG9tX2lkICkgKTtcclxuXHRcdFx0Ly9cclxuXHRcdFx0Ly8gXHRcdHdwYmNfZG9fc2Nyb2xsKCAnI3Njcm9sbF90bycgKyByYW5kb21faWQgKTtcclxuXHRcdFx0Ly8gXHRcdC8vd3BiY19kb19zY3JvbGwoIGpRdWVyeSggJyNib29raW5nX2Zvcm0nICsgcmVzb3VyY2VfaWQgKS5wYXJlbnQoKS5nZXQoIDAgKSApO1xyXG5cdFx0XHQvLyBcdH1cclxuXHRcdFx0Ly8gfSwgNTAwICk7XHJcblx0XHR9XHJcblx0Ly8gPC9lZGl0b3ItZm9sZD5cclxuXHJcblxyXG5cdC8vIDxlZGl0b3ItZm9sZCAgICAgZGVmYXVsdHN0YXRlPVwiY29sbGFwc2VkXCIgICAgICAgICAgICAgICAgICAgICAgICBkZXNjPVwiICA9PSAgTWluaSBTcGluIExvYWRlciAgPT0gIFwiICA+XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBTaG93IG1pbmkgU3BpbiBMb2FkZXJcclxuXHRcdCAqIEBwYXJhbSBwYXJlbnRfaHRtbF9pZFxyXG5cdFx0ICovXHJcblx0XHRmdW5jdGlvbiB3cGJjX19zcGluX2xvYWRlcl9fbWluaV9fc2hvdyggcGFyZW50X2h0bWxfaWQgLCBjb2xvciA9ICcjMDA3MWNlJyApe1xyXG5cclxuXHRcdFx0aWYgKCAoJ3VuZGVmaW5lZCcgIT09IHR5cGVvZiAoY29sb3IpKSAmJiAoJycgIT0gY29sb3IpICl7XHJcblx0XHRcdFx0Y29sb3IgPSAnYm9yZGVyLWNvbG9yOicgKyBjb2xvciArICc7JztcclxuXHRcdFx0fVxyXG5cdFx0XHQvLyBTaG93IFNwaW4gTG9hZGVyXHJcblx0XHRcdGpRdWVyeSggJyMnICsgcGFyZW50X2h0bWxfaWQgKS5hZnRlcihcclxuXHRcdFx0XHQnPGRpdiBpZD1cIndwYmNfbWluaV9zcGluX2xvYWRlcicgKyBwYXJlbnRfaHRtbF9pZCArICdcIiBjbGFzcz1cIndwYmNfYm9va2luZ19mb3JtX3NwaW5fbG9hZGVyXCIgc3R5bGU9XCJwb3NpdGlvbjogcmVsYXRpdmU7bWluLWhlaWdodDogMi44cmVtO1wiPjxkaXYgY2xhc3M9XCJ3cGJjX3NwaW5zX2xvYWRlcl93cmFwcGVyXCI+PGRpdiBjbGFzcz1cIndwYmNfb25lX3NwaW5fbG9hZGVyX21pbmkgMHdwYmNfc3BpbnNfbG9hZGVyX21pbmlcIiBzdHlsZT1cIicrY29sb3IrJ1wiPjwvZGl2PjwvZGl2PjwvZGl2PidcclxuXHRcdFx0KTtcclxuXHRcdH1cclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFJlbW92ZSAvIEhpZGUgbWluaSBTcGluIExvYWRlclxyXG5cdFx0ICogQHBhcmFtIHBhcmVudF9odG1sX2lkXHJcblx0XHQgKi9cclxuXHRcdGZ1bmN0aW9uIHdwYmNfX3NwaW5fbG9hZGVyX19taW5pX19oaWRlKCBwYXJlbnRfaHRtbF9pZCApe1xyXG5cclxuXHRcdFx0Ly8gUmVtb3ZlIFNwaW4gTG9hZGVyXHJcblx0XHRcdGpRdWVyeSggJyN3cGJjX21pbmlfc3Bpbl9sb2FkZXInICsgcGFyZW50X2h0bWxfaWQgKS5yZW1vdmUoKTtcclxuXHRcdH1cclxuXHJcblx0Ly8gPC9lZGl0b3ItZm9sZD5cclxuXHJcbi8vVE9ETzogd2hhdCAgYWJvdXQgc2hvd2luZyBvbmx5ICBUaGFuayB5b3UuIG1lc3NhZ2Ugd2l0aG91dCBwYXltZW50IGZvcm1zLlxyXG4vKipcclxuICogU2hvdyAnVGhhbmsgeW91Jy4gbWVzc2FnZSBhbmQgcGF5bWVudCBmb3Jtc1xyXG4gKlxyXG4gKiBAcGFyYW0gcmVzcG9uc2VfZGF0YVxyXG4gKi9cclxuZnVuY3Rpb24gd3BiY19zaG93X3RoYW5rX3lvdV9tZXNzYWdlX2FmdGVyX2Jvb2tpbmcoIHJlc3BvbnNlX2RhdGEgKXtcclxuXHJcblx0aWYgKFxyXG4gXHRcdCAgICgndW5kZWZpbmVkJyAhPT0gdHlwZW9mIChyZXNwb25zZV9kYXRhWyAnYWp4X2NvbmZpcm1hdGlvbicgXVsgJ3R5X2lzX3JlZGlyZWN0JyBdKSlcclxuXHRcdCYmICgndW5kZWZpbmVkJyAhPT0gdHlwZW9mIChyZXNwb25zZV9kYXRhWyAnYWp4X2NvbmZpcm1hdGlvbicgXVsgJ3R5X3VybCcgXSkpXHJcblx0XHQmJiAoJ3BhZ2UnID09IHJlc3BvbnNlX2RhdGFbICdhanhfY29uZmlybWF0aW9uJyBdWyAndHlfaXNfcmVkaXJlY3QnIF0pXHJcblx0XHQmJiAoJycgIT0gcmVzcG9uc2VfZGF0YVsgJ2FqeF9jb25maXJtYXRpb24nIF1bICd0eV91cmwnIF0pXHJcblx0KXtcclxuXHRcdGpRdWVyeSggJ2JvZHknICkudHJpZ2dlciggJ3dwYmNfYm9va2luZ19jcmVhdGVkJywgWyByZXNwb25zZV9kYXRhWyAncmVzb3VyY2VfaWQnIF0gLCByZXNwb25zZV9kYXRhIF0gKTtcdFx0XHQvL0ZpeEluOiAxMC4wLjAuMzBcclxuXHRcdHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gcmVzcG9uc2VfZGF0YVsgJ2FqeF9jb25maXJtYXRpb24nIF1bICd0eV91cmwnIF07XHJcblx0XHRyZXR1cm47XHJcblx0fVxyXG5cclxuXHR2YXIgcmVzb3VyY2VfaWQgPSByZXNwb25zZV9kYXRhWyAncmVzb3VyY2VfaWQnIF1cclxuXHR2YXIgY29uZmlybV9jb250ZW50ID0nJztcclxuXHJcblx0aWYgKCAndW5kZWZpbmVkJyA9PT0gdHlwZW9mIChyZXNwb25zZV9kYXRhWyAnYWp4X2NvbmZpcm1hdGlvbicgXVsgJ3R5X21lc3NhZ2UnIF0pICl7XHJcblx0XHRcdFx0XHQgIFx0XHRcdCByZXNwb25zZV9kYXRhWyAnYWp4X2NvbmZpcm1hdGlvbicgXVsgJ3R5X21lc3NhZ2UnIF0gPSAnJztcclxuXHR9XHJcblx0aWYgKCAndW5kZWZpbmVkJyA9PT0gdHlwZW9mIChyZXNwb25zZV9kYXRhWyAnYWp4X2NvbmZpcm1hdGlvbicgXVsgJ3R5X3BheW1lbnRfcGF5bWVudF9kZXNjcmlwdGlvbicgXSApICl7XHJcblx0XHQgXHRcdFx0ICBcdFx0XHQgcmVzcG9uc2VfZGF0YVsgJ2FqeF9jb25maXJtYXRpb24nIF1bICd0eV9wYXltZW50X3BheW1lbnRfZGVzY3JpcHRpb24nIF0gPSAnJztcclxuXHR9XHJcblx0aWYgKCAndW5kZWZpbmVkJyA9PT0gdHlwZW9mIChyZXNwb25zZV9kYXRhWyAnYWp4X2NvbmZpcm1hdGlvbicgXVsgJ3BheW1lbnRfY29zdCcgXSApICl7XHJcblx0XHRcdFx0XHQgIFx0XHRcdCByZXNwb25zZV9kYXRhWyAnYWp4X2NvbmZpcm1hdGlvbicgXVsgJ3BheW1lbnRfY29zdCcgXSA9ICcnO1xyXG5cdH1cclxuXHRpZiAoICd1bmRlZmluZWQnID09PSB0eXBlb2YgKHJlc3BvbnNlX2RhdGFbICdhanhfY29uZmlybWF0aW9uJyBdWyAndHlfcGF5bWVudF9nYXRld2F5cycgXSApICl7XHJcblx0XHRcdFx0XHQgIFx0XHRcdCByZXNwb25zZV9kYXRhWyAnYWp4X2NvbmZpcm1hdGlvbicgXVsgJ3R5X3BheW1lbnRfZ2F0ZXdheXMnIF0gPSAnJztcclxuXHR9XHJcblx0dmFyIHR5X21lc3NhZ2VfaGlkZSBcdFx0XHRcdFx0XHQ9ICgnJyA9PSByZXNwb25zZV9kYXRhWyAnYWp4X2NvbmZpcm1hdGlvbicgXVsgJ3R5X21lc3NhZ2UnIF0pID8gJ3dwYmNfdHlfaGlkZScgOiAnJztcclxuXHR2YXIgdHlfcGF5bWVudF9wYXltZW50X2Rlc2NyaXB0aW9uX2hpZGUgXHQ9ICgnJyA9PSByZXNwb25zZV9kYXRhWyAnYWp4X2NvbmZpcm1hdGlvbicgXVsgJ3R5X3BheW1lbnRfcGF5bWVudF9kZXNjcmlwdGlvbicgXS5yZXBsYWNlKCAvXFxcXG4vZywgJycgKSkgPyAnd3BiY190eV9oaWRlJyA6ICcnO1xyXG5cdHZhciB0eV9ib29raW5nX2Nvc3RzX2hpZGUgXHRcdFx0XHQ9ICgnJyA9PSByZXNwb25zZV9kYXRhWyAnYWp4X2NvbmZpcm1hdGlvbicgXVsgJ3BheW1lbnRfY29zdCcgXSkgPyAnd3BiY190eV9oaWRlJyA6ICcnO1xyXG5cdHZhciB0eV9wYXltZW50X2dhdGV3YXlzX2hpZGUgXHRcdFx0PSAoJycgPT0gcmVzcG9uc2VfZGF0YVsgJ2FqeF9jb25maXJtYXRpb24nIF1bICd0eV9wYXltZW50X2dhdGV3YXlzJyBdLnJlcGxhY2UoIC9cXFxcbi9nLCAnJyApKSA/ICd3cGJjX3R5X2hpZGUnIDogJyc7XHJcblxyXG5cdGlmICggJ3dwYmNfdHlfaGlkZScgIT0gdHlfcGF5bWVudF9nYXRld2F5c19oaWRlICl7XHJcblx0XHRqUXVlcnkoICcud3BiY190eV9fY29udGVudF90ZXh0LndwYmNfdHlfX2NvbnRlbnRfZ2F0ZXdheXMnICkuaHRtbCggJycgKTtcdC8vIFJlc2V0ICBhbGwgIG90aGVyIHBvc3NpYmxlIGdhdGV3YXlzIGJlZm9yZSBzaG93aW5nIG5ldyBvbmUuXHJcblx0fVxyXG5cclxuXHRjb25maXJtX2NvbnRlbnQgKz0gYDxkaXYgaWQ9XCJ3cGJjX3Njcm9sbF9wb2ludF8ke3Jlc291cmNlX2lkfVwiPjwvZGl2PmA7XHJcblx0Y29uZmlybV9jb250ZW50ICs9IGAgIDxkaXYgY2xhc3M9XCJ3cGJjX2FmdGVyX2Jvb2tpbmdfdGhhbmtfeW91X3NlY3Rpb25cIj5gO1xyXG5cdGNvbmZpcm1fY29udGVudCArPSBgICAgIDxkaXYgY2xhc3M9XCJ3cGJjX3R5X19tZXNzYWdlICR7dHlfbWVzc2FnZV9oaWRlfVwiPiR7cmVzcG9uc2VfZGF0YVsgJ2FqeF9jb25maXJtYXRpb24nIF1bICd0eV9tZXNzYWdlJyBdfTwvZGl2PmA7XHJcbiAgICBjb25maXJtX2NvbnRlbnQgKz0gYCAgICA8ZGl2IGNsYXNzPVwid3BiY190eV9fY29udGFpbmVyXCI+YDtcclxuICAgIGNvbmZpcm1fY29udGVudCArPSBgICAgICAgPGRpdiBjbGFzcz1cIndwYmNfdHlfX2hlYWRlclwiPiR7cmVzcG9uc2VfZGF0YVsnYWp4X2NvbmZpcm1hdGlvbiddWyd0eV9tZXNzYWdlX2Jvb2tpbmdfaWQnXX08L2Rpdj5gO1xyXG4gICAgY29uZmlybV9jb250ZW50ICs9IGAgICAgICA8ZGl2IGNsYXNzPVwid3BiY190eV9fY29udGVudFwiPmA7XHJcblx0Y29uZmlybV9jb250ZW50ICs9IGAgICAgICAgIDxkaXYgY2xhc3M9XCJ3cGJjX3R5X19jb250ZW50X3RleHQgd3BiY190eV9fcGF5bWVudF9kZXNjcmlwdGlvbiAke3R5X3BheW1lbnRfcGF5bWVudF9kZXNjcmlwdGlvbl9oaWRlfVwiPiR7cmVzcG9uc2VfZGF0YVsgJ2FqeF9jb25maXJtYXRpb24nIF1bICd0eV9wYXltZW50X3BheW1lbnRfZGVzY3JpcHRpb24nIF0ucmVwbGFjZSggL1xcXFxuL2csICcnICl9PC9kaXY+YDtcclxuICAgIGNvbmZpcm1fY29udGVudCArPSBgICAgICAgXHQ8ZGl2IGNsYXNzPVwid3BiY190eV9fY29udGVudF90ZXh0IHdwYmNfY29sc18yXCI+JHtyZXNwb25zZV9kYXRhWydhanhfY29uZmlybWF0aW9uJ11bJ3R5X2N1c3RvbWVyX2RldGFpbHMnXX08L2Rpdj5gO1xyXG4gICAgY29uZmlybV9jb250ZW50ICs9IGAgICAgICBcdDxkaXYgY2xhc3M9XCJ3cGJjX3R5X19jb250ZW50X3RleHQgd3BiY19jb2xzXzJcIj4ke3Jlc3BvbnNlX2RhdGFbJ2FqeF9jb25maXJtYXRpb24nXVsndHlfYm9va2luZ19kZXRhaWxzJ119PC9kaXY+YDtcclxuXHRjb25maXJtX2NvbnRlbnQgKz0gYCAgICAgICAgPGRpdiBjbGFzcz1cIndwYmNfdHlfX2NvbnRlbnRfdGV4dCB3cGJjX3R5X19jb250ZW50X2Nvc3RzICR7dHlfYm9va2luZ19jb3N0c19oaWRlfVwiPiR7cmVzcG9uc2VfZGF0YVsgJ2FqeF9jb25maXJtYXRpb24nIF1bICd0eV9ib29raW5nX2Nvc3RzJyBdfTwvZGl2PmA7XHJcblx0Y29uZmlybV9jb250ZW50ICs9IGAgICAgICAgIDxkaXYgY2xhc3M9XCJ3cGJjX3R5X19jb250ZW50X3RleHQgd3BiY190eV9fY29udGVudF9nYXRld2F5cyAke3R5X3BheW1lbnRfZ2F0ZXdheXNfaGlkZX1cIj4ke3Jlc3BvbnNlX2RhdGFbICdhanhfY29uZmlybWF0aW9uJyBdWyAndHlfcGF5bWVudF9nYXRld2F5cycgXS5yZXBsYWNlKCAvXFxcXG4vZywgJycgKS5yZXBsYWNlKCAvYWpheF9zY3JpcHQvZ2ksICdzY3JpcHQnICl9PC9kaXY+YDtcclxuICAgIGNvbmZpcm1fY29udGVudCArPSBgICAgICAgPC9kaXY+YDtcclxuICAgIGNvbmZpcm1fY29udGVudCArPSBgICAgIDwvZGl2PmA7XHJcblx0Y29uZmlybV9jb250ZW50ICs9IGA8L2Rpdj5gO1xyXG5cclxuIFx0alF1ZXJ5KCAnI2Jvb2tpbmdfZm9ybScgKyByZXNvdXJjZV9pZCApLmFmdGVyKCBjb25maXJtX2NvbnRlbnQgKTtcclxuXHJcblxyXG5cdC8vRml4SW46IDEwLjAuMC4zMFx0XHQvLyBldmVudCBuYW1lXHRcdFx0Ly8gUmVzb3VyY2UgSURcdC1cdCcxJ1xyXG5cdGpRdWVyeSggJ2JvZHknICkudHJpZ2dlciggJ3dwYmNfYm9va2luZ19jcmVhdGVkJywgWyByZXNvdXJjZV9pZCAsIHJlc3BvbnNlX2RhdGEgXSApO1xyXG5cdC8vIFRvIGNhdGNoIHRoaXMgZXZlbnQ6IGpRdWVyeSggJ2JvZHknICkub24oJ3dwYmNfYm9va2luZ19jcmVhdGVkJywgZnVuY3Rpb24oIGV2ZW50LCByZXNvdXJjZV9pZCwgcGFyYW1zICkgeyBjb25zb2xlLmxvZyggZXZlbnQsIHJlc291cmNlX2lkLCBwYXJhbXMgKTsgfSApO1xyXG59XHJcbiJdLCJmaWxlIjoiaW5jbHVkZXMvX2NhcGFjaXR5L19vdXQvY3JlYXRlX2Jvb2tpbmcuanMifQ==
