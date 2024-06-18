"use strict";
/**
 *   Ajax   ----------------------------------------------------------------------------------------------------- */
//var is_this_action = false;

/**
 * Send Ajax action request,  like approving or cancellation
 *
 * @param action_param
 */

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function wpbc_ajx_booking_ajax_action_request() {
  var action_param = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  console.groupCollapsed('WPBC_AJX_BOOKING_ACTIONS');
  console.log(' == Ajax Actions :: Params == ', action_param); //is_this_action = true;

  wpbc_booking_listing_reload_button__spin_start(); // Get redefined Locale,  if action on single booking !

  if (undefined != action_param['booking_id'] && !Array.isArray(action_param['booking_id'])) {
    // Not array
    action_param['locale'] = wpbc_get_selected_locale(action_param['booking_id'], wpbc_ajx_booking_listing.get_secure_param('locale'));
  }

  var action_post_params = {
    action: 'WPBC_AJX_BOOKING_ACTIONS',
    nonce: wpbc_ajx_booking_listing.get_secure_param('nonce'),
    wpbc_ajx_user_id: undefined == action_param['user_id'] ? wpbc_ajx_booking_listing.get_secure_param('user_id') : action_param['user_id'],
    wpbc_ajx_locale: undefined == action_param['locale'] ? wpbc_ajx_booking_listing.get_secure_param('locale') : action_param['locale'],
    action_params: action_param
  }; // It's required for CSV export - getting the same list  of bookings

  if (typeof action_param.search_params !== 'undefined') {
    action_post_params['search_params'] = action_param.search_params;
    delete action_post_params.action_params.search_params;
  } // Start Ajax


  jQuery.post(wpbc_url_ajax, action_post_params,
  /**
   * S u c c e s s
   *
   * @param response_data		-	its object returned from  Ajax - class-live-searcg.php
   * @param textStatus		-	'success'
   * @param jqXHR				-	Object
   */
  function (response_data, textStatus, jqXHR) {
    console.log(' == Ajax Actions :: Response WPBC_AJX_BOOKING_ACTIONS == ', response_data);
    console.groupEnd(); // Probably Error

    if (_typeof(response_data) !== 'object' || response_data === null) {
      jQuery('.wpbc_ajx_under_toolbar_row').hide(); //FixIn: 9.6.1.5

      jQuery(wpbc_ajx_booking_listing.get_other_param('listing_container')).html('<div class="wpbc-settings-notice notice-warning" style="text-align:left">' + response_data + '</div>');
      return;
    }

    wpbc_booking_listing_reload_button__spin_pause();
    wpbc_admin_show_message(response_data['ajx_after_action_message'].replace(/\n/g, "<br />"), '1' == response_data['ajx_after_action_result'] ? 'success' : 'error', 'undefined' === typeof response_data['ajx_after_action_result_all_params_arr']['after_action_result_delay'] ? 10000 : response_data['ajx_after_action_result_all_params_arr']['after_action_result_delay']); // Success response

    if ('1' == response_data['ajx_after_action_result']) {
      var is_reload_ajax_listing = true; // After Google Calendar import show imported bookings and reload the page for toolbar parameters update

      if (false !== response_data['ajx_after_action_result_all_params_arr']['new_listing_params']) {
        wpbc_ajx_booking_send_search_request_with_params(response_data['ajx_after_action_result_all_params_arr']['new_listing_params']);
        var closed_timer = setTimeout(function () {
          if (wpbc_booking_listing_reload_button__is_spin()) {
            if (undefined != response_data['ajx_after_action_result_all_params_arr']['new_listing_params']['reload_url_params']) {
              document.location.href = response_data['ajx_after_action_result_all_params_arr']['new_listing_params']['reload_url_params'];
            } else {
              document.location.reload();
            }
          }
        }, 2000);
        is_reload_ajax_listing = false;
      } // Start download exported CSV file


      if (undefined != response_data['ajx_after_action_result_all_params_arr']['export_csv_url']) {
        wpbc_ajx_booking__export_csv_url__download(response_data['ajx_after_action_result_all_params_arr']['export_csv_url']);
        is_reload_ajax_listing = false;
      }

      if (is_reload_ajax_listing) {
        wpbc_ajx_booking__actual_listing__show(); //	Sending Ajax Request	-	with parameters that  we early  defined in "wpbc_ajx_booking_listing" Obj.
      }
    } // Remove spin icon from  button and Enable this button.


    wpbc_button__remove_spin(response_data['ajx_cleaned_params']['ui_clicked_element_id']); // Hide modals

    wpbc_popup_modals__hide();
    jQuery('#ajax_respond').html(response_data); // For ability to show response, add such DIV element to page
  }).fail(function (jqXHR, textStatus, errorThrown) {
    if (window.console && window.console.log) {
      console.log('Ajax_Error', jqXHR, textStatus, errorThrown);
    }

    jQuery('.wpbc_ajx_under_toolbar_row').hide(); //FixIn: 9.6.1.5

    var error_message = '<strong>' + 'Error!' + '</strong> ' + errorThrown;

    if (jqXHR.responseText) {
      error_message += jqXHR.responseText;
    }

    error_message = error_message.replace(/\n/g, "<br />");
    wpbc_ajx_booking_show_message(error_message);
  }) // .done(   function ( data, textStatus, jqXHR ) {   if ( window.console && window.console.log ){ console.log( 'second success', data, textStatus, jqXHR ); }    })
  // .always( function ( data_jqXHR, textStatus, jqXHR_errorThrown ) {   if ( window.console && window.console.log ){ console.log( 'always finished', data_jqXHR, textStatus, jqXHR_errorThrown ); }     })
  ; // End Ajax
}
/**
 * Hide all open modal popups windows
 */


function wpbc_popup_modals__hide() {
  // Hide modals
  if ('function' === typeof jQuery('.wpbc_popup_modal').wpbc_my_modal) {
    jQuery('.wpbc_popup_modal').wpbc_my_modal('hide');
  }
}
/**
 *   Dates  Short <-> Wide    ----------------------------------------------------------------------------------- */


function wpbc_ajx_click_on_dates_short() {
  jQuery('#booking_dates_small,.booking_dates_full').hide();
  jQuery('#booking_dates_full,.booking_dates_small').show();
  wpbc_ajx_booking_send_search_request_with_params({
    'ui_usr__dates_short_wide': 'short'
  });
}

function wpbc_ajx_click_on_dates_wide() {
  jQuery('#booking_dates_full,.booking_dates_small').hide();
  jQuery('#booking_dates_small,.booking_dates_full').show();
  wpbc_ajx_booking_send_search_request_with_params({
    'ui_usr__dates_short_wide': 'wide'
  });
}

function wpbc_ajx_click_on_dates_toggle(this_date) {
  jQuery(this_date).parents('.wpbc_col_dates').find('.booking_dates_small').toggle();
  jQuery(this_date).parents('.wpbc_col_dates').find('.booking_dates_full').toggle();
  /*
  var visible_section = jQuery( this_date ).parents( '.booking_dates_expand_section' );
  visible_section.hide();
  if ( visible_section.hasClass( 'booking_dates_full' ) ){
  	visible_section.parents( '.wpbc_col_dates' ).find( '.booking_dates_small' ).show();
  } else {
  	visible_section.parents( '.wpbc_col_dates' ).find( '.booking_dates_full' ).show();
  }*/

  console.log('wpbc_ajx_click_on_dates_toggle', this_date);
}
/**
 *   Locale   --------------------------------------------------------------------------------------------------- */

/**
 * 	Select options in select boxes based on attribute "value_of_selected_option" and RED color and hint for LOCALE button   --  It's called from 	wpbc_ajx_booking_define_ui_hooks()  	each  time after Listing loading.
 */


function wpbc_ajx_booking__ui_define__locale() {
  jQuery('.wpbc_listing_container select').each(function (index) {
    var selection = jQuery(this).attr("value_of_selected_option"); // Define selected select boxes

    if (undefined !== selection) {
      jQuery(this).find('option[value="' + selection + '"]').prop('selected', true);

      if ('' != selection && jQuery(this).hasClass('set_booking_locale_selectbox')) {
        // Locale
        var booking_locale_button = jQuery(this).parents('.ui_element_locale').find('.set_booking_locale_button'); //booking_locale_button.css( 'color', '#db4800' );		// Set button  red

        booking_locale_button.addClass('wpbc_ui_red'); // Set button  red

        if ('function' === typeof wpbc_tippy) {
          booking_locale_button.get(0)._tippy.setContent(selection);
        }
      }
    }
  });
}
/**
 *   Remark   --------------------------------------------------------------------------------------------------- */

/**
 * Define content of remark "booking note" button and textarea.  -- It's called from 	wpbc_ajx_booking_define_ui_hooks()  	each  time after Listing loading.
 */


function wpbc_ajx_booking__ui_define__remark() {
  jQuery('.wpbc_listing_container .ui_remark_section textarea').each(function (index) {
    var text_val = jQuery(this).val();

    if (undefined !== text_val && '' != text_val) {
      var remark_button = jQuery(this).parents('.ui_group').find('.set_booking_note_button');

      if (remark_button.length > 0) {
        remark_button.addClass('wpbc_ui_red'); // Set button  red

        if ('function' === typeof wpbc_tippy) {
          //remark_button.get( 0 )._tippy.allowHTML = true;
          //remark_button.get( 0 )._tippy.setContent( text_val.replace(/[\n\r]/g, '<br>') );
          remark_button.get(0)._tippy.setProps({
            allowHTML: true,
            content: text_val.replace(/[\n\r]/g, '<br>')
          });
        }
      }
    }
  });
}
/**
 * Actions ,when we click on "Remark" button.
 *
 * @param jq_button  -	this jQuery button  object
 */


function wpbc_ajx_booking__ui_click__remark(jq_button) {
  jq_button.parents('.ui_group').find('.ui_remark_section').toggle();
}
/**
 *   Change booking resource   ---------------------------------------------------------------------------------- */


function wpbc_ajx_booking__ui_click_show__change_resource(booking_id, resource_id) {
  // Define ID of booking to hidden input
  jQuery('#change_booking_resource__booking_id').val(booking_id); // Select booking resource  that belong to  booking

  jQuery('#change_booking_resource__resource_select').val(resource_id).trigger('change');
  var cbr; // Get Resource section

  cbr = jQuery("#change_booking_resource__section").detach(); // Append it to booking ROW

  cbr.appendTo(jQuery("#ui__change_booking_resource__section_in_booking_" + booking_id));
  cbr = null; // Hide sections of "Change booking resource" in all other bookings ROWs
  //jQuery( ".ui__change_booking_resource__section_in_booking" ).hide();

  if (!jQuery("#ui__change_booking_resource__section_in_booking_" + booking_id).is(':visible')) {
    jQuery(".ui__under_actions_row__section_in_booking").hide();
  } // Show only "change booking resource" section  for current booking


  jQuery("#ui__change_booking_resource__section_in_booking_" + booking_id).toggle();
}

function wpbc_ajx_booking__ui_click_save__change_resource(this_el, booking_action, el_id) {
  wpbc_ajx_booking_ajax_action_request({
    'booking_action': booking_action,
    'booking_id': jQuery('#change_booking_resource__booking_id').val(),
    'selected_resource_id': jQuery('#change_booking_resource__resource_select').val(),
    'ui_clicked_element_id': el_id
  });
  wpbc_button_enable_loading_icon(this_el); // wpbc_ajx_booking__ui_click_close__change_resource();
}

function wpbc_ajx_booking__ui_click_close__change_resource() {
  var cbrce; // Get Resource section

  cbrce = jQuery("#change_booking_resource__section").detach(); // Append it to hidden HTML template section  at  the bottom  of the page

  cbrce.appendTo(jQuery("#wpbc_hidden_template__change_booking_resource"));
  cbrce = null; // Hide all change booking resources sections

  jQuery(".ui__change_booking_resource__section_in_booking").hide();
}
/**
 *   Duplicate booking in other resource   ---------------------------------------------------------------------- */


function wpbc_ajx_booking__ui_click_show__duplicate_booking(booking_id, resource_id) {
  // Define ID of booking to hidden input
  jQuery('#duplicate_booking_to_other_resource__booking_id').val(booking_id); // Select booking resource  that belong to  booking

  jQuery('#duplicate_booking_to_other_resource__resource_select').val(resource_id).trigger('change');
  var cbr; // Get Resource section

  cbr = jQuery("#duplicate_booking_to_other_resource__section").detach(); // Append it to booking ROW

  cbr.appendTo(jQuery("#ui__duplicate_booking_to_other_resource__section_in_booking_" + booking_id));
  cbr = null; // Hide sections of "Duplicate booking" in all other bookings ROWs

  if (!jQuery("#ui__duplicate_booking_to_other_resource__section_in_booking_" + booking_id).is(':visible')) {
    jQuery(".ui__under_actions_row__section_in_booking").hide();
  } // Show only "Duplicate booking" section  for current booking ROW


  jQuery("#ui__duplicate_booking_to_other_resource__section_in_booking_" + booking_id).toggle();
}

function wpbc_ajx_booking__ui_click_save__duplicate_booking(this_el, booking_action, el_id) {
  wpbc_ajx_booking_ajax_action_request({
    'booking_action': booking_action,
    'booking_id': jQuery('#duplicate_booking_to_other_resource__booking_id').val(),
    'selected_resource_id': jQuery('#duplicate_booking_to_other_resource__resource_select').val(),
    'ui_clicked_element_id': el_id
  });
  wpbc_button_enable_loading_icon(this_el); // wpbc_ajx_booking__ui_click_close__change_resource();
}

function wpbc_ajx_booking__ui_click_close__duplicate_booking() {
  var cbrce; // Get Resource section

  cbrce = jQuery("#duplicate_booking_to_other_resource__section").detach(); // Append it to hidden HTML template section  at  the bottom  of the page

  cbrce.appendTo(jQuery("#wpbc_hidden_template__duplicate_booking_to_other_resource"));
  cbrce = null; // Hide all change booking resources sections

  jQuery(".ui__duplicate_booking_to_other_resource__section_in_booking").hide();
}
/**
 *   Change payment status   ------------------------------------------------------------------------------------ */


function wpbc_ajx_booking__ui_click_show__set_payment_status(booking_id) {
  var jSelect = jQuery('#ui__set_payment_status__section_in_booking_' + booking_id).find('select');
  var selected_pay_status = jSelect.attr("ajx-selected-value"); // Is it float - then  it's unknown

  if (!isNaN(parseFloat(selected_pay_status))) {
    jSelect.find('option[value="1"]').prop('selected', true); // Unknown  value is '1' in select box
  } else {
    jSelect.find('option[value="' + selected_pay_status + '"]').prop('selected', true); // Otherwise known payment status
  } // Hide sections of "Change booking resource" in all other bookings ROWs


  if (!jQuery("#ui__set_payment_status__section_in_booking_" + booking_id).is(':visible')) {
    jQuery(".ui__under_actions_row__section_in_booking").hide();
  } // Show only "change booking resource" section  for current booking


  jQuery("#ui__set_payment_status__section_in_booking_" + booking_id).toggle();
}

function wpbc_ajx_booking__ui_click_save__set_payment_status(booking_id, this_el, booking_action, el_id) {
  wpbc_ajx_booking_ajax_action_request({
    'booking_action': booking_action,
    'booking_id': booking_id,
    'selected_payment_status': jQuery('#ui_btn_set_payment_status' + booking_id).val(),
    'ui_clicked_element_id': el_id + '_save'
  });
  wpbc_button_enable_loading_icon(this_el);
  jQuery('#' + el_id + '_cancel').hide(); //wpbc_button_enable_loading_icon( jQuery( '#' + el_id + '_cancel').get(0) );
}

function wpbc_ajx_booking__ui_click_close__set_payment_status() {
  // Hide all change  payment status for booking
  jQuery(".ui__set_payment_status__section_in_booking").hide();
}
/**
 *   Change booking cost   -------------------------------------------------------------------------------------- */


function wpbc_ajx_booking__ui_click_save__set_booking_cost(booking_id, this_el, booking_action, el_id) {
  wpbc_ajx_booking_ajax_action_request({
    'booking_action': booking_action,
    'booking_id': booking_id,
    'booking_cost': jQuery('#ui_btn_set_booking_cost' + booking_id + '_cost').val(),
    'ui_clicked_element_id': el_id + '_save'
  });
  wpbc_button_enable_loading_icon(this_el);
  jQuery('#' + el_id + '_cancel').hide(); //wpbc_button_enable_loading_icon( jQuery( '#' + el_id + '_cancel').get(0) );
}

function wpbc_ajx_booking__ui_click_close__set_booking_cost() {
  // Hide all change  payment status for booking
  jQuery(".ui__set_booking_cost__section_in_booking").hide();
}
/**
 *   Send Payment request   -------------------------------------------------------------------------------------- */


function wpbc_ajx_booking__ui_click__send_payment_request() {
  wpbc_ajx_booking_ajax_action_request({
    'booking_action': 'send_payment_request',
    'booking_id': jQuery('#wpbc_modal__payment_request__booking_id').val(),
    'reason_of_action': jQuery('#wpbc_modal__payment_request__reason_of_action').val(),
    'ui_clicked_element_id': 'wpbc_modal__payment_request__button_send'
  });
  wpbc_button_enable_loading_icon(jQuery('#wpbc_modal__payment_request__button_send').get(0));
}
/**
 *   Import Google Calendar  ------------------------------------------------------------------------------------ */


function wpbc_ajx_booking__ui_click__import_google_calendar() {
  wpbc_ajx_booking_ajax_action_request({
    'booking_action': 'import_google_calendar',
    'ui_clicked_element_id': 'wpbc_modal__import_google_calendar__button_send',
    'booking_gcal_events_from': jQuery('#wpbc_modal__import_google_calendar__section #booking_gcal_events_from option:selected').val(),
    'booking_gcal_events_from_offset': jQuery('#wpbc_modal__import_google_calendar__section #booking_gcal_events_from_offset').val(),
    'booking_gcal_events_from_offset_type': jQuery('#wpbc_modal__import_google_calendar__section #booking_gcal_events_from_offset_type option:selected').val(),
    'booking_gcal_events_until': jQuery('#wpbc_modal__import_google_calendar__section #booking_gcal_events_until option:selected').val(),
    'booking_gcal_events_until_offset': jQuery('#wpbc_modal__import_google_calendar__section #booking_gcal_events_until_offset').val(),
    'booking_gcal_events_until_offset_type': jQuery('#wpbc_modal__import_google_calendar__section #booking_gcal_events_until_offset_type option:selected').val(),
    'booking_gcal_events_max': jQuery('#wpbc_modal__import_google_calendar__section #booking_gcal_events_max').val(),
    'booking_gcal_resource': jQuery('#wpbc_modal__import_google_calendar__section #wpbc_booking_resource option:selected').val()
  });
  wpbc_button_enable_loading_icon(jQuery('#wpbc_modal__import_google_calendar__section #wpbc_modal__import_google_calendar__button_send').get(0));
}
/**
 *   Export bookings to CSV  ------------------------------------------------------------------------------------ */


function wpbc_ajx_booking__ui_click__export_csv(params) {
  var selected_booking_id_arr = wpbc_get_selected_row_id();
  wpbc_ajx_booking_ajax_action_request({
    'booking_action': params['booking_action'],
    'ui_clicked_element_id': params['ui_clicked_element_id'],
    'export_type': params['export_type'],
    'csv_export_separator': params['csv_export_separator'],
    'csv_export_skip_fields': params['csv_export_skip_fields'],
    'booking_id': selected_booking_id_arr.join(','),
    'search_params': wpbc_ajx_booking_listing.search_get_all_params()
  });
  var this_el = jQuery('#' + params['ui_clicked_element_id']).get(0);
  wpbc_button_enable_loading_icon(this_el);
}
/**
 * Open URL in new tab - mainly  it's used for open CSV link  for downloaded exported bookings as CSV
 *
 * @param export_csv_url
 */


function wpbc_ajx_booking__export_csv_url__download(export_csv_url) {
  //var selected_booking_id_arr = wpbc_get_selected_row_id();
  document.location.href = export_csv_url; // + '&selected_id=' + selected_booking_id_arr.join(',');
  // It's open additional dialog for asking opening ulr in new tab
  // window.open( export_csv_url, '_blank').focus();
}
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluY2x1ZGVzL3BhZ2UtYm9va2luZ3MvX3NyYy9ib29raW5nc19fYWN0aW9ucy5qcyJdLCJuYW1lcyI6WyJ3cGJjX2FqeF9ib29raW5nX2FqYXhfYWN0aW9uX3JlcXVlc3QiLCJhY3Rpb25fcGFyYW0iLCJjb25zb2xlIiwiZ3JvdXBDb2xsYXBzZWQiLCJsb2ciLCJ3cGJjX2Jvb2tpbmdfbGlzdGluZ19yZWxvYWRfYnV0dG9uX19zcGluX3N0YXJ0IiwidW5kZWZpbmVkIiwiQXJyYXkiLCJpc0FycmF5Iiwid3BiY19nZXRfc2VsZWN0ZWRfbG9jYWxlIiwid3BiY19hanhfYm9va2luZ19saXN0aW5nIiwiZ2V0X3NlY3VyZV9wYXJhbSIsImFjdGlvbl9wb3N0X3BhcmFtcyIsImFjdGlvbiIsIm5vbmNlIiwid3BiY19hanhfdXNlcl9pZCIsIndwYmNfYWp4X2xvY2FsZSIsImFjdGlvbl9wYXJhbXMiLCJzZWFyY2hfcGFyYW1zIiwialF1ZXJ5IiwicG9zdCIsIndwYmNfdXJsX2FqYXgiLCJyZXNwb25zZV9kYXRhIiwidGV4dFN0YXR1cyIsImpxWEhSIiwiZ3JvdXBFbmQiLCJoaWRlIiwiZ2V0X290aGVyX3BhcmFtIiwiaHRtbCIsIndwYmNfYm9va2luZ19saXN0aW5nX3JlbG9hZF9idXR0b25fX3NwaW5fcGF1c2UiLCJ3cGJjX2FkbWluX3Nob3dfbWVzc2FnZSIsInJlcGxhY2UiLCJpc19yZWxvYWRfYWpheF9saXN0aW5nIiwid3BiY19hanhfYm9va2luZ19zZW5kX3NlYXJjaF9yZXF1ZXN0X3dpdGhfcGFyYW1zIiwiY2xvc2VkX3RpbWVyIiwic2V0VGltZW91dCIsIndwYmNfYm9va2luZ19saXN0aW5nX3JlbG9hZF9idXR0b25fX2lzX3NwaW4iLCJkb2N1bWVudCIsImxvY2F0aW9uIiwiaHJlZiIsInJlbG9hZCIsIndwYmNfYWp4X2Jvb2tpbmdfX2V4cG9ydF9jc3ZfdXJsX19kb3dubG9hZCIsIndwYmNfYWp4X2Jvb2tpbmdfX2FjdHVhbF9saXN0aW5nX19zaG93Iiwid3BiY19idXR0b25fX3JlbW92ZV9zcGluIiwid3BiY19wb3B1cF9tb2RhbHNfX2hpZGUiLCJmYWlsIiwiZXJyb3JUaHJvd24iLCJ3aW5kb3ciLCJlcnJvcl9tZXNzYWdlIiwicmVzcG9uc2VUZXh0Iiwid3BiY19hanhfYm9va2luZ19zaG93X21lc3NhZ2UiLCJ3cGJjX215X21vZGFsIiwid3BiY19hanhfY2xpY2tfb25fZGF0ZXNfc2hvcnQiLCJzaG93Iiwid3BiY19hanhfY2xpY2tfb25fZGF0ZXNfd2lkZSIsIndwYmNfYWp4X2NsaWNrX29uX2RhdGVzX3RvZ2dsZSIsInRoaXNfZGF0ZSIsInBhcmVudHMiLCJmaW5kIiwidG9nZ2xlIiwid3BiY19hanhfYm9va2luZ19fdWlfZGVmaW5lX19sb2NhbGUiLCJlYWNoIiwiaW5kZXgiLCJzZWxlY3Rpb24iLCJhdHRyIiwicHJvcCIsImhhc0NsYXNzIiwiYm9va2luZ19sb2NhbGVfYnV0dG9uIiwiYWRkQ2xhc3MiLCJ3cGJjX3RpcHB5IiwiZ2V0IiwiX3RpcHB5Iiwic2V0Q29udGVudCIsIndwYmNfYWp4X2Jvb2tpbmdfX3VpX2RlZmluZV9fcmVtYXJrIiwidGV4dF92YWwiLCJ2YWwiLCJyZW1hcmtfYnV0dG9uIiwibGVuZ3RoIiwic2V0UHJvcHMiLCJhbGxvd0hUTUwiLCJjb250ZW50Iiwid3BiY19hanhfYm9va2luZ19fdWlfY2xpY2tfX3JlbWFyayIsImpxX2J1dHRvbiIsIndwYmNfYWp4X2Jvb2tpbmdfX3VpX2NsaWNrX3Nob3dfX2NoYW5nZV9yZXNvdXJjZSIsImJvb2tpbmdfaWQiLCJyZXNvdXJjZV9pZCIsInRyaWdnZXIiLCJjYnIiLCJkZXRhY2giLCJhcHBlbmRUbyIsImlzIiwid3BiY19hanhfYm9va2luZ19fdWlfY2xpY2tfc2F2ZV9fY2hhbmdlX3Jlc291cmNlIiwidGhpc19lbCIsImJvb2tpbmdfYWN0aW9uIiwiZWxfaWQiLCJ3cGJjX2J1dHRvbl9lbmFibGVfbG9hZGluZ19pY29uIiwid3BiY19hanhfYm9va2luZ19fdWlfY2xpY2tfY2xvc2VfX2NoYW5nZV9yZXNvdXJjZSIsImNicmNlIiwid3BiY19hanhfYm9va2luZ19fdWlfY2xpY2tfc2hvd19fZHVwbGljYXRlX2Jvb2tpbmciLCJ3cGJjX2FqeF9ib29raW5nX191aV9jbGlja19zYXZlX19kdXBsaWNhdGVfYm9va2luZyIsIndwYmNfYWp4X2Jvb2tpbmdfX3VpX2NsaWNrX2Nsb3NlX19kdXBsaWNhdGVfYm9va2luZyIsIndwYmNfYWp4X2Jvb2tpbmdfX3VpX2NsaWNrX3Nob3dfX3NldF9wYXltZW50X3N0YXR1cyIsImpTZWxlY3QiLCJzZWxlY3RlZF9wYXlfc3RhdHVzIiwiaXNOYU4iLCJwYXJzZUZsb2F0Iiwid3BiY19hanhfYm9va2luZ19fdWlfY2xpY2tfc2F2ZV9fc2V0X3BheW1lbnRfc3RhdHVzIiwid3BiY19hanhfYm9va2luZ19fdWlfY2xpY2tfY2xvc2VfX3NldF9wYXltZW50X3N0YXR1cyIsIndwYmNfYWp4X2Jvb2tpbmdfX3VpX2NsaWNrX3NhdmVfX3NldF9ib29raW5nX2Nvc3QiLCJ3cGJjX2FqeF9ib29raW5nX191aV9jbGlja19jbG9zZV9fc2V0X2Jvb2tpbmdfY29zdCIsIndwYmNfYWp4X2Jvb2tpbmdfX3VpX2NsaWNrX19zZW5kX3BheW1lbnRfcmVxdWVzdCIsIndwYmNfYWp4X2Jvb2tpbmdfX3VpX2NsaWNrX19pbXBvcnRfZ29vZ2xlX2NhbGVuZGFyIiwid3BiY19hanhfYm9va2luZ19fdWlfY2xpY2tfX2V4cG9ydF9jc3YiLCJwYXJhbXMiLCJzZWxlY3RlZF9ib29raW5nX2lkX2FyciIsIndwYmNfZ2V0X3NlbGVjdGVkX3Jvd19pZCIsImpvaW4iLCJzZWFyY2hfZ2V0X2FsbF9wYXJhbXMiLCJleHBvcnRfY3N2X3VybCJdLCJtYXBwaW5ncyI6IkFBQUE7QUFFQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUNBLFNBQVNBLG9DQUFULEdBQWtFO0FBQUEsTUFBbkJDLFlBQW1CLHVFQUFKLEVBQUk7QUFFbEVDLEVBQUFBLE9BQU8s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biAqICAgQWpheCAgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXHJcbi8vdmFyIGlzX3RoaXNfYWN0aW9uID0gZmFsc2U7XHJcbi8qKlxyXG4gKiBTZW5kIEFqYXggYWN0aW9uIHJlcXVlc3QsICBsaWtlIGFwcHJvdmluZyBvciBjYW5jZWxsYXRpb25cclxuICpcclxuICogQHBhcmFtIGFjdGlvbl9wYXJhbVxyXG4gKi9cclxuZnVuY3Rpb24gd3BiY19hanhfYm9va2luZ19hamF4X2FjdGlvbl9yZXF1ZXN0KCBhY3Rpb25fcGFyYW0gPSB7fSApe1xyXG5cclxuY29uc29sZS5ncm91cENvbGxhcHNlZCggJ1dQQkNfQUpYX0JPT0tJTkdfQUNUSU9OUycgKTsgY29uc29sZS5sb2coICcgPT0gQWpheCBBY3Rpb25zIDo6IFBhcmFtcyA9PSAnLCBhY3Rpb25fcGFyYW0gKTtcclxuLy9pc190aGlzX2FjdGlvbiA9IHRydWU7XHJcblxyXG5cdHdwYmNfYm9va2luZ19saXN0aW5nX3JlbG9hZF9idXR0b25fX3NwaW5fc3RhcnQoKTtcclxuXHJcblx0Ly8gR2V0IHJlZGVmaW5lZCBMb2NhbGUsICBpZiBhY3Rpb24gb24gc2luZ2xlIGJvb2tpbmcgIVxyXG5cdGlmICggICggdW5kZWZpbmVkICE9IGFjdGlvbl9wYXJhbVsgJ2Jvb2tpbmdfaWQnIF0gKSAmJiAoICEgQXJyYXkuaXNBcnJheSggYWN0aW9uX3BhcmFtWyAnYm9va2luZ19pZCcgXSApICkgKXtcdFx0XHRcdC8vIE5vdCBhcnJheVxyXG5cclxuXHRcdGFjdGlvbl9wYXJhbVsgJ2xvY2FsZScgXSA9IHdwYmNfZ2V0X3NlbGVjdGVkX2xvY2FsZSggYWN0aW9uX3BhcmFtWyAnYm9va2luZ19pZCcgXSwgd3BiY19hanhfYm9va2luZ19saXN0aW5nLmdldF9zZWN1cmVfcGFyYW0oICdsb2NhbGUnICkgKTtcclxuXHR9XHJcblxyXG5cdHZhciBhY3Rpb25fcG9zdF9wYXJhbXMgPSB7XHJcblx0XHRcdFx0XHRcdFx0XHRhY3Rpb24gICAgICAgICAgOiAnV1BCQ19BSlhfQk9PS0lOR19BQ1RJT05TJyxcclxuXHRcdFx0XHRcdFx0XHRcdG5vbmNlICAgICAgICAgICA6IHdwYmNfYWp4X2Jvb2tpbmdfbGlzdGluZy5nZXRfc2VjdXJlX3BhcmFtKCAnbm9uY2UnICksXHJcblx0XHRcdFx0XHRcdFx0XHR3cGJjX2FqeF91c2VyX2lkOiAoICggdW5kZWZpbmVkID09IGFjdGlvbl9wYXJhbVsgJ3VzZXJfaWQnIF0gKSA/IHdwYmNfYWp4X2Jvb2tpbmdfbGlzdGluZy5nZXRfc2VjdXJlX3BhcmFtKCAndXNlcl9pZCcgKSA6IGFjdGlvbl9wYXJhbVsgJ3VzZXJfaWQnIF0gKSxcclxuXHRcdFx0XHRcdFx0XHRcdHdwYmNfYWp4X2xvY2FsZTogICggKCB1bmRlZmluZWQgPT0gYWN0aW9uX3BhcmFtWyAnbG9jYWxlJyBdICkgID8gd3BiY19hanhfYm9va2luZ19saXN0aW5nLmdldF9zZWN1cmVfcGFyYW0oICdsb2NhbGUnICkgIDogYWN0aW9uX3BhcmFtWyAnbG9jYWxlJyBdICksXHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0YWN0aW9uX3BhcmFtc1x0OiBhY3Rpb25fcGFyYW1cclxuXHRcdFx0XHRcdFx0XHR9O1xyXG5cclxuXHQvLyBJdCdzIHJlcXVpcmVkIGZvciBDU1YgZXhwb3J0IC0gZ2V0dGluZyB0aGUgc2FtZSBsaXN0ICBvZiBib29raW5nc1xyXG5cdGlmICggdHlwZW9mIGFjdGlvbl9wYXJhbS5zZWFyY2hfcGFyYW1zICE9PSAndW5kZWZpbmVkJyApe1xyXG5cdFx0YWN0aW9uX3Bvc3RfcGFyYW1zWyAnc2VhcmNoX3BhcmFtcycgXSA9IGFjdGlvbl9wYXJhbS5zZWFyY2hfcGFyYW1zO1xyXG5cdFx0ZGVsZXRlIGFjdGlvbl9wb3N0X3BhcmFtcy5hY3Rpb25fcGFyYW1zLnNlYXJjaF9wYXJhbXM7XHJcblx0fVxyXG5cclxuXHQvLyBTdGFydCBBamF4XHJcblx0alF1ZXJ5LnBvc3QoIHdwYmNfdXJsX2FqYXggLFxyXG5cclxuXHRcdFx0XHRhY3Rpb25fcG9zdF9wYXJhbXMgLFxyXG5cclxuXHRcdFx0XHQvKipcclxuXHRcdFx0XHQgKiBTIHUgYyBjIGUgcyBzXHJcblx0XHRcdFx0ICpcclxuXHRcdFx0XHQgKiBAcGFyYW0gcmVzcG9uc2VfZGF0YVx0XHQtXHRpdHMgb2JqZWN0IHJldHVybmVkIGZyb20gIEFqYXggLSBjbGFzcy1saXZlLXNlYXJjZy5waHBcclxuXHRcdFx0XHQgKiBAcGFyYW0gdGV4dFN0YXR1c1x0XHQtXHQnc3VjY2VzcydcclxuXHRcdFx0XHQgKiBAcGFyYW0ganFYSFJcdFx0XHRcdC1cdE9iamVjdFxyXG5cdFx0XHRcdCAqL1xyXG5cdFx0XHRcdGZ1bmN0aW9uICggcmVzcG9uc2VfZGF0YSwgdGV4dFN0YXR1cywganFYSFIgKSB7XHJcblxyXG5jb25zb2xlLmxvZyggJyA9PSBBamF4IEFjdGlvbnMgOjogUmVzcG9uc2UgV1BCQ19BSlhfQk9PS0lOR19BQ1RJT05TID09ICcsIHJlc3BvbnNlX2RhdGEgKTsgY29uc29sZS5ncm91cEVuZCgpO1xyXG5cclxuXHRcdFx0XHRcdC8vIFByb2JhYmx5IEVycm9yXHJcblx0XHRcdFx0XHRpZiAoICh0eXBlb2YgcmVzcG9uc2VfZGF0YSAhPT0gJ29iamVjdCcpIHx8IChyZXNwb25zZV9kYXRhID09PSBudWxsKSApe1xyXG5cdFx0XHRcdFx0XHRqUXVlcnkoICcud3BiY19hanhfdW5kZXJfdG9vbGJhcl9yb3cnICkuaGlkZSgpO1x0IFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vRml4SW46IDkuNi4xLjVcclxuXHRcdFx0XHRcdFx0alF1ZXJ5KCB3cGJjX2FqeF9ib29raW5nX2xpc3RpbmcuZ2V0X290aGVyX3BhcmFtKCAnbGlzdGluZ19jb250YWluZXInICkgKS5odG1sKFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0JzxkaXYgY2xhc3M9XCJ3cGJjLXNldHRpbmdzLW5vdGljZSBub3RpY2Utd2FybmluZ1wiIHN0eWxlPVwidGV4dC1hbGlnbjpsZWZ0XCI+JyArXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJlc3BvbnNlX2RhdGEgK1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0JzwvZGl2PidcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0KTtcclxuXHRcdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdHdwYmNfYm9va2luZ19saXN0aW5nX3JlbG9hZF9idXR0b25fX3NwaW5fcGF1c2UoKTtcclxuXHJcblx0XHRcdFx0XHR3cGJjX2FkbWluX3Nob3dfbWVzc2FnZShcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0ICByZXNwb25zZV9kYXRhWyAnYWp4X2FmdGVyX2FjdGlvbl9tZXNzYWdlJyBdLnJlcGxhY2UoIC9cXG4vZywgXCI8YnIgLz5cIiApXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCwgKCAnMScgPT0gcmVzcG9uc2VfZGF0YVsgJ2FqeF9hZnRlcl9hY3Rpb25fcmVzdWx0JyBdICkgPyAnc3VjY2VzcycgOiAnZXJyb3InXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCwgKCAoICd1bmRlZmluZWQnID09PSB0eXBlb2YocmVzcG9uc2VfZGF0YVsgJ2FqeF9hZnRlcl9hY3Rpb25fcmVzdWx0X2FsbF9wYXJhbXNfYXJyJyBdWyAnYWZ0ZXJfYWN0aW9uX3Jlc3VsdF9kZWxheScgXSkgKVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdD8gMTAwMDBcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ6IHJlc3BvbnNlX2RhdGFbICdhanhfYWZ0ZXJfYWN0aW9uX3Jlc3VsdF9hbGxfcGFyYW1zX2FycicgXVsgJ2FmdGVyX2FjdGlvbl9yZXN1bHRfZGVsYXknIF0gKVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0KTtcclxuXHJcblx0XHRcdFx0XHQvLyBTdWNjZXNzIHJlc3BvbnNlXHJcblx0XHRcdFx0XHRpZiAoICcxJyA9PSByZXNwb25zZV9kYXRhWyAnYWp4X2FmdGVyX2FjdGlvbl9yZXN1bHQnIF0gKXtcclxuXHJcblx0XHRcdFx0XHRcdHZhciBpc19yZWxvYWRfYWpheF9saXN0aW5nID0gdHJ1ZTtcclxuXHJcblx0XHRcdFx0XHRcdC8vIEFmdGVyIEdvb2dsZSBDYWxlbmRhciBpbXBvcnQgc2hvdyBpbXBvcnRlZCBib29raW5ncyBhbmQgcmVsb2FkIHRoZSBwYWdlIGZvciB0b29sYmFyIHBhcmFtZXRlcnMgdXBkYXRlXHJcblx0XHRcdFx0XHRcdGlmICggZmFsc2UgIT09IHJlc3BvbnNlX2RhdGFbICdhanhfYWZ0ZXJfYWN0aW9uX3Jlc3VsdF9hbGxfcGFyYW1zX2FycicgXVsgJ25ld19saXN0aW5nX3BhcmFtcycgXSApe1xyXG5cclxuXHRcdFx0XHRcdFx0XHR3cGJjX2FqeF9ib29raW5nX3NlbmRfc2VhcmNoX3JlcXVlc3Rfd2l0aF9wYXJhbXMoIHJlc3BvbnNlX2RhdGFbICdhanhfYWZ0ZXJfYWN0aW9uX3Jlc3VsdF9hbGxfcGFyYW1zX2FycicgXVsgJ25ld19saXN0aW5nX3BhcmFtcycgXSApO1xyXG5cclxuXHRcdFx0XHRcdFx0XHR2YXIgY2xvc2VkX3RpbWVyID0gc2V0VGltZW91dCggZnVuY3Rpb24gKCl7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAoIHdwYmNfYm9va2luZ19saXN0aW5nX3JlbG9hZF9idXR0b25fX2lzX3NwaW4oKSApe1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGlmICggdW5kZWZpbmVkICE9IHJlc3BvbnNlX2RhdGFbICdhanhfYWZ0ZXJfYWN0aW9uX3Jlc3VsdF9hbGxfcGFyYW1zX2FycicgXVsgJ25ld19saXN0aW5nX3BhcmFtcycgXVsgJ3JlbG9hZF91cmxfcGFyYW1zJyBdICl7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRkb2N1bWVudC5sb2NhdGlvbi5ocmVmID0gcmVzcG9uc2VfZGF0YVsgJ2FqeF9hZnRlcl9hY3Rpb25fcmVzdWx0X2FsbF9wYXJhbXNfYXJyJyBdWyAnbmV3X2xpc3RpbmdfcGFyYW1zJyBdWyAncmVsb2FkX3VybF9wYXJhbXMnIF07XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGRvY3VtZW50LmxvY2F0aW9uLnJlbG9hZCgpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQsIDIwMDAgKTtcclxuXHRcdFx0XHRcdFx0XHRpc19yZWxvYWRfYWpheF9saXN0aW5nID0gZmFsc2U7XHJcblx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdC8vIFN0YXJ0IGRvd25sb2FkIGV4cG9ydGVkIENTViBmaWxlXHJcblx0XHRcdFx0XHRcdGlmICggdW5kZWZpbmVkICE9IHJlc3BvbnNlX2RhdGFbICdhanhfYWZ0ZXJfYWN0aW9uX3Jlc3VsdF9hbGxfcGFyYW1zX2FycicgXVsgJ2V4cG9ydF9jc3ZfdXJsJyBdICl7XHJcblx0XHRcdFx0XHRcdFx0d3BiY19hanhfYm9va2luZ19fZXhwb3J0X2Nzdl91cmxfX2Rvd25sb2FkKCByZXNwb25zZV9kYXRhWyAnYWp4X2FmdGVyX2FjdGlvbl9yZXN1bHRfYWxsX3BhcmFtc19hcnInIF1bICdleHBvcnRfY3N2X3VybCcgXSApO1xyXG5cdFx0XHRcdFx0XHRcdGlzX3JlbG9hZF9hamF4X2xpc3RpbmcgPSBmYWxzZTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0aWYgKCBpc19yZWxvYWRfYWpheF9saXN0aW5nICl7XHJcblx0XHRcdFx0XHRcdFx0d3BiY19hanhfYm9va2luZ19fYWN0dWFsX2xpc3RpbmdfX3Nob3coKTtcdC8vXHRTZW5kaW5nIEFqYXggUmVxdWVzdFx0LVx0d2l0aCBwYXJhbWV0ZXJzIHRoYXQgIHdlIGVhcmx5ICBkZWZpbmVkIGluIFwid3BiY19hanhfYm9va2luZ19saXN0aW5nXCIgT2JqLlxyXG5cdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdC8vIFJlbW92ZSBzcGluIGljb24gZnJvbSAgYnV0dG9uIGFuZCBFbmFibGUgdGhpcyBidXR0b24uXHJcblx0XHRcdFx0XHR3cGJjX2J1dHRvbl9fcmVtb3ZlX3NwaW4oIHJlc3BvbnNlX2RhdGFbICdhanhfY2xlYW5lZF9wYXJhbXMnIF1bICd1aV9jbGlja2VkX2VsZW1lbnRfaWQnIF0gKVxyXG5cclxuXHRcdFx0XHRcdC8vIEhpZGUgbW9kYWxzXHJcblx0XHRcdFx0XHR3cGJjX3BvcHVwX21vZGFsc19faGlkZSgpO1xyXG5cclxuXHRcdFx0XHRcdGpRdWVyeSggJyNhamF4X3Jlc3BvbmQnICkuaHRtbCggcmVzcG9uc2VfZGF0YSApO1x0XHQvLyBGb3IgYWJpbGl0eSB0byBzaG93IHJlc3BvbnNlLCBhZGQgc3VjaCBESVYgZWxlbWVudCB0byBwYWdlXHJcblx0XHRcdFx0fVxyXG5cdFx0XHQgICkuZmFpbCggZnVuY3Rpb24gKCBqcVhIUiwgdGV4dFN0YXR1cywgZXJyb3JUaHJvd24gKSB7ICAgIGlmICggd2luZG93LmNvbnNvbGUgJiYgd2luZG93LmNvbnNvbGUubG9nICl7IGNvbnNvbGUubG9nKCAnQWpheF9FcnJvcicsIGpxWEhSLCB0ZXh0U3RhdHVzLCBlcnJvclRocm93biApOyB9XHJcblx0XHRcdFx0XHRqUXVlcnkoICcud3BiY19hanhfdW5kZXJfdG9vbGJhcl9yb3cnICkuaGlkZSgpO1x0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvL0ZpeEluOiA5LjYuMS41XHJcblx0XHRcdFx0XHR2YXIgZXJyb3JfbWVzc2FnZSA9ICc8c3Ryb25nPicgKyAnRXJyb3IhJyArICc8L3N0cm9uZz4gJyArIGVycm9yVGhyb3duIDtcclxuXHRcdFx0XHRcdGlmICgganFYSFIucmVzcG9uc2VUZXh0ICl7XHJcblx0XHRcdFx0XHRcdGVycm9yX21lc3NhZ2UgKz0ganFYSFIucmVzcG9uc2VUZXh0O1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0ZXJyb3JfbWVzc2FnZSA9IGVycm9yX21lc3NhZ2UucmVwbGFjZSggL1xcbi9nLCBcIjxiciAvPlwiICk7XHJcblxyXG5cdFx0XHRcdFx0d3BiY19hanhfYm9va2luZ19zaG93X21lc3NhZ2UoIGVycm9yX21lc3NhZ2UgKTtcclxuXHRcdFx0ICB9KVxyXG5cdCAgICAgICAgICAvLyAuZG9uZSggICBmdW5jdGlvbiAoIGRhdGEsIHRleHRTdGF0dXMsIGpxWEhSICkgeyAgIGlmICggd2luZG93LmNvbnNvbGUgJiYgd2luZG93LmNvbnNvbGUubG9nICl7IGNvbnNvbGUubG9nKCAnc2Vjb25kIHN1Y2Nlc3MnLCBkYXRhLCB0ZXh0U3RhdHVzLCBqcVhIUiApOyB9ICAgIH0pXHJcblx0XHRcdCAgLy8gLmFsd2F5cyggZnVuY3Rpb24gKCBkYXRhX2pxWEhSLCB0ZXh0U3RhdHVzLCBqcVhIUl9lcnJvclRocm93biApIHsgICBpZiAoIHdpbmRvdy5jb25zb2xlICYmIHdpbmRvdy5jb25zb2xlLmxvZyApeyBjb25zb2xlLmxvZyggJ2Fsd2F5cyBmaW5pc2hlZCcsIGRhdGFfanFYSFIsIHRleHRTdGF0dXMsIGpxWEhSX2Vycm9yVGhyb3duICk7IH0gICAgIH0pXHJcblx0XHRcdCAgOyAgLy8gRW5kIEFqYXhcclxufVxyXG5cclxuXHJcblxyXG4vKipcclxuICogSGlkZSBhbGwgb3BlbiBtb2RhbCBwb3B1cHMgd2luZG93c1xyXG4gKi9cclxuZnVuY3Rpb24gd3BiY19wb3B1cF9tb2RhbHNfX2hpZGUoKXtcclxuXHJcblx0Ly8gSGlkZSBtb2RhbHNcclxuXHRpZiAoICdmdW5jdGlvbicgPT09IHR5cGVvZiAoalF1ZXJ5KCAnLndwYmNfcG9wdXBfbW9kYWwnICkud3BiY19teV9tb2RhbCkgKXtcclxuXHRcdGpRdWVyeSggJy53cGJjX3BvcHVwX21vZGFsJyApLndwYmNfbXlfbW9kYWwoICdoaWRlJyApO1xyXG5cdH1cclxufVxyXG5cclxuXHJcbi8qKlxyXG4gKiAgIERhdGVzICBTaG9ydCA8LT4gV2lkZSAgICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xyXG5cclxuZnVuY3Rpb24gd3BiY19hanhfY2xpY2tfb25fZGF0ZXNfc2hvcnQoKXtcclxuXHRqUXVlcnkoICcjYm9va2luZ19kYXRlc19zbWFsbCwuYm9va2luZ19kYXRlc19mdWxsJyApLmhpZGUoKTtcclxuXHRqUXVlcnkoICcjYm9va2luZ19kYXRlc19mdWxsLC5ib29raW5nX2RhdGVzX3NtYWxsJyApLnNob3coKTtcclxuXHR3cGJjX2FqeF9ib29raW5nX3NlbmRfc2VhcmNoX3JlcXVlc3Rfd2l0aF9wYXJhbXMoIHsndWlfdXNyX19kYXRlc19zaG9ydF93aWRlJzogJ3Nob3J0J30gKTtcclxufVxyXG5cclxuZnVuY3Rpb24gd3BiY19hanhfY2xpY2tfb25fZGF0ZXNfd2lkZSgpe1xyXG5cdGpRdWVyeSggJyNib29raW5nX2RhdGVzX2Z1bGwsLmJvb2tpbmdfZGF0ZXNfc21hbGwnICkuaGlkZSgpO1xyXG5cdGpRdWVyeSggJyNib29raW5nX2RhdGVzX3NtYWxsLC5ib29raW5nX2RhdGVzX2Z1bGwnICkuc2hvdygpO1xyXG5cdHdwYmNfYWp4X2Jvb2tpbmdfc2VuZF9zZWFyY2hfcmVxdWVzdF93aXRoX3BhcmFtcyggeyd1aV91c3JfX2RhdGVzX3Nob3J0X3dpZGUnOiAnd2lkZSd9ICk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHdwYmNfYWp4X2NsaWNrX29uX2RhdGVzX3RvZ2dsZSh0aGlzX2RhdGUpe1xyXG5cclxuXHRqUXVlcnkoIHRoaXNfZGF0ZSApLnBhcmVudHMoICcud3BiY19jb2xfZGF0ZXMnICkuZmluZCggJy5ib29raW5nX2RhdGVzX3NtYWxsJyApLnRvZ2dsZSgpO1xyXG5cdGpRdWVyeSggdGhpc19kYXRlICkucGFyZW50cyggJy53cGJjX2NvbF9kYXRlcycgKS5maW5kKCAnLmJvb2tpbmdfZGF0ZXNfZnVsbCcgKS50b2dnbGUoKTtcclxuXHJcblx0LypcclxuXHR2YXIgdmlzaWJsZV9zZWN0aW9uID0galF1ZXJ5KCB0aGlzX2RhdGUgKS5wYXJlbnRzKCAnLmJvb2tpbmdfZGF0ZXNfZXhwYW5kX3NlY3Rpb24nICk7XHJcblx0dmlzaWJsZV9zZWN0aW9uLmhpZGUoKTtcclxuXHRpZiAoIHZpc2libGVfc2VjdGlvbi5oYXNDbGFzcyggJ2Jvb2tpbmdfZGF0ZXNfZnVsbCcgKSApe1xyXG5cdFx0dmlzaWJsZV9zZWN0aW9uLnBhcmVudHMoICcud3BiY19jb2xfZGF0ZXMnICkuZmluZCggJy5ib29raW5nX2RhdGVzX3NtYWxsJyApLnNob3coKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0dmlzaWJsZV9zZWN0aW9uLnBhcmVudHMoICcud3BiY19jb2xfZGF0ZXMnICkuZmluZCggJy5ib29raW5nX2RhdGVzX2Z1bGwnICkuc2hvdygpO1xyXG5cdH0qL1xyXG5cdGNvbnNvbGUubG9nKCAnd3BiY19hanhfY2xpY2tfb25fZGF0ZXNfdG9nZ2xlJywgdGhpc19kYXRlICk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiAgIExvY2FsZSAgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xyXG5cclxuLyoqXHJcbiAqIFx0U2VsZWN0IG9wdGlvbnMgaW4gc2VsZWN0IGJveGVzIGJhc2VkIG9uIGF0dHJpYnV0ZSBcInZhbHVlX29mX3NlbGVjdGVkX29wdGlvblwiIGFuZCBSRUQgY29sb3IgYW5kIGhpbnQgZm9yIExPQ0FMRSBidXR0b24gICAtLSAgSXQncyBjYWxsZWQgZnJvbSBcdHdwYmNfYWp4X2Jvb2tpbmdfZGVmaW5lX3VpX2hvb2tzKCkgIFx0ZWFjaCAgdGltZSBhZnRlciBMaXN0aW5nIGxvYWRpbmcuXHJcbiAqL1xyXG5mdW5jdGlvbiB3cGJjX2FqeF9ib29raW5nX191aV9kZWZpbmVfX2xvY2FsZSgpe1xyXG5cclxuXHRqUXVlcnkoICcud3BiY19saXN0aW5nX2NvbnRhaW5lciBzZWxlY3QnICkuZWFjaCggZnVuY3Rpb24gKCBpbmRleCApe1xyXG5cclxuXHRcdHZhciBzZWxlY3Rpb24gPSBqUXVlcnkoIHRoaXMgKS5hdHRyKCBcInZhbHVlX29mX3NlbGVjdGVkX29wdGlvblwiICk7XHRcdFx0Ly8gRGVmaW5lIHNlbGVjdGVkIHNlbGVjdCBib3hlc1xyXG5cclxuXHRcdGlmICggdW5kZWZpbmVkICE9PSBzZWxlY3Rpb24gKXtcclxuXHRcdFx0alF1ZXJ5KCB0aGlzICkuZmluZCggJ29wdGlvblt2YWx1ZT1cIicgKyBzZWxlY3Rpb24gKyAnXCJdJyApLnByb3AoICdzZWxlY3RlZCcsIHRydWUgKTtcclxuXHJcblx0XHRcdGlmICggKCcnICE9IHNlbGVjdGlvbikgJiYgKGpRdWVyeSggdGhpcyApLmhhc0NsYXNzKCAnc2V0X2Jvb2tpbmdfbG9jYWxlX3NlbGVjdGJveCcgKSkgKXtcdFx0XHRcdFx0XHRcdFx0Ly8gTG9jYWxlXHJcblxyXG5cdFx0XHRcdHZhciBib29raW5nX2xvY2FsZV9idXR0b24gPSBqUXVlcnkoIHRoaXMgKS5wYXJlbnRzKCAnLnVpX2VsZW1lbnRfbG9jYWxlJyApLmZpbmQoICcuc2V0X2Jvb2tpbmdfbG9jYWxlX2J1dHRvbicgKVxyXG5cclxuXHRcdFx0XHQvL2Jvb2tpbmdfbG9jYWxlX2J1dHRvbi5jc3MoICdjb2xvcicsICcjZGI0ODAwJyApO1x0XHQvLyBTZXQgYnV0dG9uICByZWRcclxuXHRcdFx0XHRib29raW5nX2xvY2FsZV9idXR0b24uYWRkQ2xhc3MoICd3cGJjX3VpX3JlZCcgKTtcdFx0Ly8gU2V0IGJ1dHRvbiAgcmVkXHJcblx0XHRcdFx0IGlmICggJ2Z1bmN0aW9uJyA9PT0gdHlwZW9mKCB3cGJjX3RpcHB5ICkgKXtcclxuXHRcdFx0XHRcdGJvb2tpbmdfbG9jYWxlX2J1dHRvbi5nZXQoMCkuX3RpcHB5LnNldENvbnRlbnQoIHNlbGVjdGlvbiApO1xyXG5cdFx0XHRcdCB9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9ICk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiAgIFJlbWFyayAgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xyXG5cclxuLyoqXHJcbiAqIERlZmluZSBjb250ZW50IG9mIHJlbWFyayBcImJvb2tpbmcgbm90ZVwiIGJ1dHRvbiBhbmQgdGV4dGFyZWEuICAtLSBJdCdzIGNhbGxlZCBmcm9tIFx0d3BiY19hanhfYm9va2luZ19kZWZpbmVfdWlfaG9va3MoKSAgXHRlYWNoICB0aW1lIGFmdGVyIExpc3RpbmcgbG9hZGluZy5cclxuICovXHJcbmZ1bmN0aW9uIHdwYmNfYWp4X2Jvb2tpbmdfX3VpX2RlZmluZV9fcmVtYXJrKCl7XHJcblxyXG5cdGpRdWVyeSggJy53cGJjX2xpc3RpbmdfY29udGFpbmVyIC51aV9yZW1hcmtfc2VjdGlvbiB0ZXh0YXJlYScgKS5lYWNoKCBmdW5jdGlvbiAoIGluZGV4ICl7XHJcblx0XHR2YXIgdGV4dF92YWwgPSBqUXVlcnkoIHRoaXMgKS52YWwoKTtcclxuXHRcdGlmICggKHVuZGVmaW5lZCAhPT0gdGV4dF92YWwpICYmICgnJyAhPSB0ZXh0X3ZhbCkgKXtcclxuXHJcblx0XHRcdHZhciByZW1hcmtfYnV0dG9uID0galF1ZXJ5KCB0aGlzICkucGFyZW50cyggJy51aV9ncm91cCcgKS5maW5kKCAnLnNldF9ib29raW5nX25vdGVfYnV0dG9uJyApO1xyXG5cclxuXHRcdFx0aWYgKCByZW1hcmtfYnV0dG9uLmxlbmd0aCA+IDAgKXtcclxuXHJcblx0XHRcdFx0cmVtYXJrX2J1dHRvbi5hZGRDbGFzcyggJ3dwYmNfdWlfcmVkJyApO1x0XHQvLyBTZXQgYnV0dG9uICByZWRcclxuXHRcdFx0XHRpZiAoICdmdW5jdGlvbicgPT09IHR5cGVvZiAod3BiY190aXBweSkgKXtcclxuXHRcdFx0XHRcdC8vcmVtYXJrX2J1dHRvbi5nZXQoIDAgKS5fdGlwcHkuYWxsb3dIVE1MID0gdHJ1ZTtcclxuXHRcdFx0XHRcdC8vcmVtYXJrX2J1dHRvbi5nZXQoIDAgKS5fdGlwcHkuc2V0Q29udGVudCggdGV4dF92YWwucmVwbGFjZSgvW1xcblxccl0vZywgJzxicj4nKSApO1xyXG5cclxuXHRcdFx0XHRcdHJlbWFya19idXR0b24uZ2V0KCAwICkuX3RpcHB5LnNldFByb3BzKCB7XHJcblx0XHRcdFx0XHRcdGFsbG93SFRNTDogdHJ1ZSxcclxuXHRcdFx0XHRcdFx0Y29udGVudCAgOiB0ZXh0X3ZhbC5yZXBsYWNlKCAvW1xcblxccl0vZywgJzxicj4nIClcclxuXHRcdFx0XHRcdH0gKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9ICk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBBY3Rpb25zICx3aGVuIHdlIGNsaWNrIG9uIFwiUmVtYXJrXCIgYnV0dG9uLlxyXG4gKlxyXG4gKiBAcGFyYW0ganFfYnV0dG9uICAtXHR0aGlzIGpRdWVyeSBidXR0b24gIG9iamVjdFxyXG4gKi9cclxuZnVuY3Rpb24gd3BiY19hanhfYm9va2luZ19fdWlfY2xpY2tfX3JlbWFyaygganFfYnV0dG9uICl7XHJcblxyXG5cdGpxX2J1dHRvbi5wYXJlbnRzKCcudWlfZ3JvdXAnKS5maW5kKCcudWlfcmVtYXJrX3NlY3Rpb24nKS50b2dnbGUoKTtcclxufVxyXG5cclxuXHJcbi8qKlxyXG4gKiAgIENoYW5nZSBib29raW5nIHJlc291cmNlICAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xyXG5cclxuZnVuY3Rpb24gd3BiY19hanhfYm9va2luZ19fdWlfY2xpY2tfc2hvd19fY2hhbmdlX3Jlc291cmNlKCBib29raW5nX2lkLCByZXNvdXJjZV9pZCApe1xyXG5cclxuXHQvLyBEZWZpbmUgSUQgb2YgYm9va2luZyB0byBoaWRkZW4gaW5wdXRcclxuXHRqUXVlcnkoICcjY2hhbmdlX2Jvb2tpbmdfcmVzb3VyY2VfX2Jvb2tpbmdfaWQnICkudmFsKCBib29raW5nX2lkICk7XHJcblxyXG5cdC8vIFNlbGVjdCBib29raW5nIHJlc291cmNlICB0aGF0IGJlbG9uZyB0byAgYm9va2luZ1xyXG5cdGpRdWVyeSggJyNjaGFuZ2VfYm9va2luZ19yZXNvdXJjZV9fcmVzb3VyY2Vfc2VsZWN0JyApLnZhbCggcmVzb3VyY2VfaWQgKS50cmlnZ2VyKCAnY2hhbmdlJyApO1xyXG5cdHZhciBjYnI7XHJcblxyXG5cdC8vIEdldCBSZXNvdXJjZSBzZWN0aW9uXHJcblx0Y2JyID0galF1ZXJ5KCBcIiNjaGFuZ2VfYm9va2luZ19yZXNvdXJjZV9fc2VjdGlvblwiICkuZGV0YWNoKCk7XHJcblxyXG5cdC8vIEFwcGVuZCBpdCB0byBib29raW5nIFJPV1xyXG5cdGNici5hcHBlbmRUbyggalF1ZXJ5KCBcIiN1aV9fY2hhbmdlX2Jvb2tpbmdfcmVzb3VyY2VfX3NlY3Rpb25faW5fYm9va2luZ19cIiArIGJvb2tpbmdfaWQgKSApO1xyXG5cdGNiciA9IG51bGw7XHJcblxyXG5cdC8vIEhpZGUgc2VjdGlvbnMgb2YgXCJDaGFuZ2UgYm9va2luZyByZXNvdXJjZVwiIGluIGFsbCBvdGhlciBib29raW5ncyBST1dzXHJcblx0Ly9qUXVlcnkoIFwiLnVpX19jaGFuZ2VfYm9va2luZ19yZXNvdXJjZV9fc2VjdGlvbl9pbl9ib29raW5nXCIgKS5oaWRlKCk7XHJcblx0aWYgKCAhIGpRdWVyeSggXCIjdWlfX2NoYW5nZV9ib29raW5nX3Jlc291cmNlX19zZWN0aW9uX2luX2Jvb2tpbmdfXCIgKyBib29raW5nX2lkICkuaXMoJzp2aXNpYmxlJykgKXtcclxuXHRcdGpRdWVyeSggXCIudWlfX3VuZGVyX2FjdGlvbnNfcm93X19zZWN0aW9uX2luX2Jvb2tpbmdcIiApLmhpZGUoKTtcclxuXHR9XHJcblxyXG5cdC8vIFNob3cgb25seSBcImNoYW5nZSBib29raW5nIHJlc291cmNlXCIgc2VjdGlvbiAgZm9yIGN1cnJlbnQgYm9va2luZ1xyXG5cdGpRdWVyeSggXCIjdWlfX2NoYW5nZV9ib29raW5nX3Jlc291cmNlX19zZWN0aW9uX2luX2Jvb2tpbmdfXCIgKyBib29raW5nX2lkICkudG9nZ2xlKCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHdwYmNfYWp4X2Jvb2tpbmdfX3VpX2NsaWNrX3NhdmVfX2NoYW5nZV9yZXNvdXJjZSggdGhpc19lbCwgYm9va2luZ19hY3Rpb24sIGVsX2lkICl7XHJcblxyXG5cdHdwYmNfYWp4X2Jvb2tpbmdfYWpheF9hY3Rpb25fcmVxdWVzdCgge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0J2Jvb2tpbmdfYWN0aW9uJyAgICAgICA6IGJvb2tpbmdfYWN0aW9uLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0J2Jvb2tpbmdfaWQnICAgICAgICAgICA6IGpRdWVyeSggJyNjaGFuZ2VfYm9va2luZ19yZXNvdXJjZV9fYm9va2luZ19pZCcgKS52YWwoKSxcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdCdzZWxlY3RlZF9yZXNvdXJjZV9pZCcgOiBqUXVlcnkoICcjY2hhbmdlX2Jvb2tpbmdfcmVzb3VyY2VfX3Jlc291cmNlX3NlbGVjdCcgKS52YWwoKSxcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdCd1aV9jbGlja2VkX2VsZW1lbnRfaWQnOiBlbF9pZFxyXG5cdH0gKTtcclxuXHJcblx0d3BiY19idXR0b25fZW5hYmxlX2xvYWRpbmdfaWNvbiggdGhpc19lbCApO1xyXG5cclxuXHQvLyB3cGJjX2FqeF9ib29raW5nX191aV9jbGlja19jbG9zZV9fY2hhbmdlX3Jlc291cmNlKCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHdwYmNfYWp4X2Jvb2tpbmdfX3VpX2NsaWNrX2Nsb3NlX19jaGFuZ2VfcmVzb3VyY2UoKXtcclxuXHJcblx0dmFyIGNicmNlO1xyXG5cclxuXHQvLyBHZXQgUmVzb3VyY2Ugc2VjdGlvblxyXG5cdGNicmNlID0galF1ZXJ5KFwiI2NoYW5nZV9ib29raW5nX3Jlc291cmNlX19zZWN0aW9uXCIpLmRldGFjaCgpO1xyXG5cclxuXHQvLyBBcHBlbmQgaXQgdG8gaGlkZGVuIEhUTUwgdGVtcGxhdGUgc2VjdGlvbiAgYXQgIHRoZSBib3R0b20gIG9mIHRoZSBwYWdlXHJcblx0Y2JyY2UuYXBwZW5kVG8oalF1ZXJ5KFwiI3dwYmNfaGlkZGVuX3RlbXBsYXRlX19jaGFuZ2VfYm9va2luZ19yZXNvdXJjZVwiKSk7XHJcblx0Y2JyY2UgPSBudWxsO1xyXG5cclxuXHQvLyBIaWRlIGFsbCBjaGFuZ2UgYm9va2luZyByZXNvdXJjZXMgc2VjdGlvbnNcclxuXHRqUXVlcnkoXCIudWlfX2NoYW5nZV9ib29raW5nX3Jlc291cmNlX19zZWN0aW9uX2luX2Jvb2tpbmdcIikuaGlkZSgpO1xyXG59XHJcblxyXG4vKipcclxuICogICBEdXBsaWNhdGUgYm9va2luZyBpbiBvdGhlciByZXNvdXJjZSAgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cclxuXHJcbmZ1bmN0aW9uIHdwYmNfYWp4X2Jvb2tpbmdfX3VpX2NsaWNrX3Nob3dfX2R1cGxpY2F0ZV9ib29raW5nKCBib29raW5nX2lkLCByZXNvdXJjZV9pZCApe1xyXG5cclxuXHQvLyBEZWZpbmUgSUQgb2YgYm9va2luZyB0byBoaWRkZW4gaW5wdXRcclxuXHRqUXVlcnkoICcjZHVwbGljYXRlX2Jvb2tpbmdfdG9fb3RoZXJfcmVzb3VyY2VfX2Jvb2tpbmdfaWQnICkudmFsKCBib29raW5nX2lkICk7XHJcblxyXG5cdC8vIFNlbGVjdCBib29raW5nIHJlc291cmNlICB0aGF0IGJlbG9uZyB0byAgYm9va2luZ1xyXG5cdGpRdWVyeSggJyNkdXBsaWNhdGVfYm9va2luZ190b19vdGhlcl9yZXNvdXJjZV9fcmVzb3VyY2Vfc2VsZWN0JyApLnZhbCggcmVzb3VyY2VfaWQgKS50cmlnZ2VyKCAnY2hhbmdlJyApO1xyXG5cdHZhciBjYnI7XHJcblxyXG5cdC8vIEdldCBSZXNvdXJjZSBzZWN0aW9uXHJcblx0Y2JyID0galF1ZXJ5KCBcIiNkdXBsaWNhdGVfYm9va2luZ190b19vdGhlcl9yZXNvdXJjZV9fc2VjdGlvblwiICkuZGV0YWNoKCk7XHJcblxyXG5cdC8vIEFwcGVuZCBpdCB0byBib29raW5nIFJPV1xyXG5cdGNici5hcHBlbmRUbyggalF1ZXJ5KCBcIiN1aV9fZHVwbGljYXRlX2Jvb2tpbmdfdG9fb3RoZXJfcmVzb3VyY2VfX3NlY3Rpb25faW5fYm9va2luZ19cIiArIGJvb2tpbmdfaWQgKSApO1xyXG5cdGNiciA9IG51bGw7XHJcblxyXG5cdC8vIEhpZGUgc2VjdGlvbnMgb2YgXCJEdXBsaWNhdGUgYm9va2luZ1wiIGluIGFsbCBvdGhlciBib29raW5ncyBST1dzXHJcblx0aWYgKCAhIGpRdWVyeSggXCIjdWlfX2R1cGxpY2F0ZV9ib29raW5nX3RvX290aGVyX3Jlc291cmNlX19zZWN0aW9uX2luX2Jvb2tpbmdfXCIgKyBib29raW5nX2lkICkuaXMoJzp2aXNpYmxlJykgKXtcclxuXHRcdGpRdWVyeSggXCIudWlfX3VuZGVyX2FjdGlvbnNfcm93X19zZWN0aW9uX2luX2Jvb2tpbmdcIiApLmhpZGUoKTtcclxuXHR9XHJcblxyXG5cdC8vIFNob3cgb25seSBcIkR1cGxpY2F0ZSBib29raW5nXCIgc2VjdGlvbiAgZm9yIGN1cnJlbnQgYm9va2luZyBST1dcclxuXHRqUXVlcnkoIFwiI3VpX19kdXBsaWNhdGVfYm9va2luZ190b19vdGhlcl9yZXNvdXJjZV9fc2VjdGlvbl9pbl9ib29raW5nX1wiICsgYm9va2luZ19pZCApLnRvZ2dsZSgpO1xyXG59XHJcblxyXG5mdW5jdGlvbiB3cGJjX2FqeF9ib29raW5nX191aV9jbGlja19zYXZlX19kdXBsaWNhdGVfYm9va2luZyggdGhpc19lbCwgYm9va2luZ19hY3Rpb24sIGVsX2lkICl7XHJcblxyXG5cdHdwYmNfYWp4X2Jvb2tpbmdfYWpheF9hY3Rpb25fcmVxdWVzdCgge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0J2Jvb2tpbmdfYWN0aW9uJyAgICAgICA6IGJvb2tpbmdfYWN0aW9uLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0J2Jvb2tpbmdfaWQnICAgICAgICAgICA6IGpRdWVyeSggJyNkdXBsaWNhdGVfYm9va2luZ190b19vdGhlcl9yZXNvdXJjZV9fYm9va2luZ19pZCcgKS52YWwoKSxcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdCdzZWxlY3RlZF9yZXNvdXJjZV9pZCcgOiBqUXVlcnkoICcjZHVwbGljYXRlX2Jvb2tpbmdfdG9fb3RoZXJfcmVzb3VyY2VfX3Jlc291cmNlX3NlbGVjdCcgKS52YWwoKSxcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdCd1aV9jbGlja2VkX2VsZW1lbnRfaWQnOiBlbF9pZFxyXG5cdH0gKTtcclxuXHJcblx0d3BiY19idXR0b25fZW5hYmxlX2xvYWRpbmdfaWNvbiggdGhpc19lbCApO1xyXG5cclxuXHQvLyB3cGJjX2FqeF9ib29raW5nX191aV9jbGlja19jbG9zZV9fY2hhbmdlX3Jlc291cmNlKCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHdwYmNfYWp4X2Jvb2tpbmdfX3VpX2NsaWNrX2Nsb3NlX19kdXBsaWNhdGVfYm9va2luZygpe1xyXG5cclxuXHR2YXIgY2JyY2U7XHJcblxyXG5cdC8vIEdldCBSZXNvdXJjZSBzZWN0aW9uXHJcblx0Y2JyY2UgPSBqUXVlcnkoXCIjZHVwbGljYXRlX2Jvb2tpbmdfdG9fb3RoZXJfcmVzb3VyY2VfX3NlY3Rpb25cIikuZGV0YWNoKCk7XHJcblxyXG5cdC8vIEFwcGVuZCBpdCB0byBoaWRkZW4gSFRNTCB0ZW1wbGF0ZSBzZWN0aW9uICBhdCAgdGhlIGJvdHRvbSAgb2YgdGhlIHBhZ2VcclxuXHRjYnJjZS5hcHBlbmRUbyhqUXVlcnkoXCIjd3BiY19oaWRkZW5fdGVtcGxhdGVfX2R1cGxpY2F0ZV9ib29raW5nX3RvX290aGVyX3Jlc291cmNlXCIpKTtcclxuXHRjYnJjZSA9IG51bGw7XHJcblxyXG5cdC8vIEhpZGUgYWxsIGNoYW5nZSBib29raW5nIHJlc291cmNlcyBzZWN0aW9uc1xyXG5cdGpRdWVyeShcIi51aV9fZHVwbGljYXRlX2Jvb2tpbmdfdG9fb3RoZXJfcmVzb3VyY2VfX3NlY3Rpb25faW5fYm9va2luZ1wiKS5oaWRlKCk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiAgIENoYW5nZSBwYXltZW50IHN0YXR1cyAgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xyXG5cclxuZnVuY3Rpb24gd3BiY19hanhfYm9va2luZ19fdWlfY2xpY2tfc2hvd19fc2V0X3BheW1lbnRfc3RhdHVzKCBib29raW5nX2lkICl7XHJcblxyXG5cdHZhciBqU2VsZWN0ID0galF1ZXJ5KCAnI3VpX19zZXRfcGF5bWVudF9zdGF0dXNfX3NlY3Rpb25faW5fYm9va2luZ18nICsgYm9va2luZ19pZCApLmZpbmQoICdzZWxlY3QnIClcclxuXHJcblx0dmFyIHNlbGVjdGVkX3BheV9zdGF0dXMgPSBqU2VsZWN0LmF0dHIoIFwiYWp4LXNlbGVjdGVkLXZhbHVlXCIgKTtcclxuXHJcblx0Ly8gSXMgaXQgZmxvYXQgLSB0aGVuICBpdCdzIHVua25vd25cclxuXHRpZiAoICFpc05hTiggcGFyc2VGbG9hdCggc2VsZWN0ZWRfcGF5X3N0YXR1cyApICkgKXtcclxuXHRcdGpTZWxlY3QuZmluZCggJ29wdGlvblt2YWx1ZT1cIjFcIl0nICkucHJvcCggJ3NlbGVjdGVkJywgdHJ1ZSApO1x0XHRcdFx0XHRcdFx0XHQvLyBVbmtub3duICB2YWx1ZSBpcyAnMScgaW4gc2VsZWN0IGJveFxyXG5cdH0gZWxzZSB7XHJcblx0XHRqU2VsZWN0LmZpbmQoICdvcHRpb25bdmFsdWU9XCInICsgc2VsZWN0ZWRfcGF5X3N0YXR1cyArICdcIl0nICkucHJvcCggJ3NlbGVjdGVkJywgdHJ1ZSApO1x0XHQvLyBPdGhlcndpc2Uga25vd24gcGF5bWVudCBzdGF0dXNcclxuXHR9XHJcblxyXG5cdC8vIEhpZGUgc2VjdGlvbnMgb2YgXCJDaGFuZ2UgYm9va2luZyByZXNvdXJjZVwiIGluIGFsbCBvdGhlciBib29raW5ncyBST1dzXHJcblx0aWYgKCAhIGpRdWVyeSggXCIjdWlfX3NldF9wYXltZW50X3N0YXR1c19fc2VjdGlvbl9pbl9ib29raW5nX1wiICsgYm9va2luZ19pZCApLmlzKCc6dmlzaWJsZScpICl7XHJcblx0XHRqUXVlcnkoIFwiLnVpX191bmRlcl9hY3Rpb25zX3Jvd19fc2VjdGlvbl9pbl9ib29raW5nXCIgKS5oaWRlKCk7XHJcblx0fVxyXG5cclxuXHQvLyBTaG93IG9ubHkgXCJjaGFuZ2UgYm9va2luZyByZXNvdXJjZVwiIHNlY3Rpb24gIGZvciBjdXJyZW50IGJvb2tpbmdcclxuXHRqUXVlcnkoIFwiI3VpX19zZXRfcGF5bWVudF9zdGF0dXNfX3NlY3Rpb25faW5fYm9va2luZ19cIiArIGJvb2tpbmdfaWQgKS50b2dnbGUoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gd3BiY19hanhfYm9va2luZ19fdWlfY2xpY2tfc2F2ZV9fc2V0X3BheW1lbnRfc3RhdHVzKCBib29raW5nX2lkLCB0aGlzX2VsLCBib29raW5nX2FjdGlvbiwgZWxfaWQgKXtcclxuXHJcblx0d3BiY19hanhfYm9va2luZ19hamF4X2FjdGlvbl9yZXF1ZXN0KCB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQnYm9va2luZ19hY3Rpb24nICAgICAgIDogYm9va2luZ19hY3Rpb24sXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQnYm9va2luZ19pZCcgICAgICAgICAgIDogYm9va2luZ19pZCxcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdCdzZWxlY3RlZF9wYXltZW50X3N0YXR1cycgOiBqUXVlcnkoICcjdWlfYnRuX3NldF9wYXltZW50X3N0YXR1cycgKyBib29raW5nX2lkICkudmFsKCksXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQndWlfY2xpY2tlZF9lbGVtZW50X2lkJzogZWxfaWQgKyAnX3NhdmUnXHJcblx0fSApO1xyXG5cclxuXHR3cGJjX2J1dHRvbl9lbmFibGVfbG9hZGluZ19pY29uKCB0aGlzX2VsICk7XHJcblxyXG5cdGpRdWVyeSggJyMnICsgZWxfaWQgKyAnX2NhbmNlbCcpLmhpZGUoKTtcclxuXHQvL3dwYmNfYnV0dG9uX2VuYWJsZV9sb2FkaW5nX2ljb24oIGpRdWVyeSggJyMnICsgZWxfaWQgKyAnX2NhbmNlbCcpLmdldCgwKSApO1xyXG5cclxufVxyXG5cclxuZnVuY3Rpb24gd3BiY19hanhfYm9va2luZ19fdWlfY2xpY2tfY2xvc2VfX3NldF9wYXltZW50X3N0YXR1cygpe1xyXG5cdC8vIEhpZGUgYWxsIGNoYW5nZSAgcGF5bWVudCBzdGF0dXMgZm9yIGJvb2tpbmdcclxuXHRqUXVlcnkoXCIudWlfX3NldF9wYXltZW50X3N0YXR1c19fc2VjdGlvbl9pbl9ib29raW5nXCIpLmhpZGUoKTtcclxufVxyXG5cclxuXHJcbi8qKlxyXG4gKiAgIENoYW5nZSBib29raW5nIGNvc3QgICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xyXG5cclxuZnVuY3Rpb24gd3BiY19hanhfYm9va2luZ19fdWlfY2xpY2tfc2F2ZV9fc2V0X2Jvb2tpbmdfY29zdCggYm9va2luZ19pZCwgdGhpc19lbCwgYm9va2luZ19hY3Rpb24sIGVsX2lkICl7XHJcblxyXG5cdHdwYmNfYWp4X2Jvb2tpbmdfYWpheF9hY3Rpb25fcmVxdWVzdCgge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0J2Jvb2tpbmdfYWN0aW9uJyAgICAgICA6IGJvb2tpbmdfYWN0aW9uLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0J2Jvb2tpbmdfaWQnICAgICAgICAgICA6IGJvb2tpbmdfaWQsXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQnYm9va2luZ19jb3N0JyBcdFx0ICAgOiBqUXVlcnkoICcjdWlfYnRuX3NldF9ib29raW5nX2Nvc3QnICsgYm9va2luZ19pZCArICdfY29zdCcpLnZhbCgpLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0J3VpX2NsaWNrZWRfZWxlbWVudF9pZCc6IGVsX2lkICsgJ19zYXZlJ1xyXG5cdH0gKTtcclxuXHJcblx0d3BiY19idXR0b25fZW5hYmxlX2xvYWRpbmdfaWNvbiggdGhpc19lbCApO1xyXG5cclxuXHRqUXVlcnkoICcjJyArIGVsX2lkICsgJ19jYW5jZWwnKS5oaWRlKCk7XHJcblx0Ly93cGJjX2J1dHRvbl9lbmFibGVfbG9hZGluZ19pY29uKCBqUXVlcnkoICcjJyArIGVsX2lkICsgJ19jYW5jZWwnKS5nZXQoMCkgKTtcclxuXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHdwYmNfYWp4X2Jvb2tpbmdfX3VpX2NsaWNrX2Nsb3NlX19zZXRfYm9va2luZ19jb3N0KCl7XHJcblx0Ly8gSGlkZSBhbGwgY2hhbmdlICBwYXltZW50IHN0YXR1cyBmb3IgYm9va2luZ1xyXG5cdGpRdWVyeShcIi51aV9fc2V0X2Jvb2tpbmdfY29zdF9fc2VjdGlvbl9pbl9ib29raW5nXCIpLmhpZGUoKTtcclxufVxyXG5cclxuXHJcbi8qKlxyXG4gKiAgIFNlbmQgUGF5bWVudCByZXF1ZXN0ICAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cclxuXHJcbmZ1bmN0aW9uIHdwYmNfYWp4X2Jvb2tpbmdfX3VpX2NsaWNrX19zZW5kX3BheW1lbnRfcmVxdWVzdCgpe1xyXG5cclxuXHR3cGJjX2FqeF9ib29raW5nX2FqYXhfYWN0aW9uX3JlcXVlc3QoIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdCdib29raW5nX2FjdGlvbicgICAgICAgOiAnc2VuZF9wYXltZW50X3JlcXVlc3QnLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0J2Jvb2tpbmdfaWQnICAgICAgICAgICA6IGpRdWVyeSggJyN3cGJjX21vZGFsX19wYXltZW50X3JlcXVlc3RfX2Jvb2tpbmdfaWQnKS52YWwoKSxcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdCdyZWFzb25fb2ZfYWN0aW9uJyBcdCAgIDogalF1ZXJ5KCAnI3dwYmNfbW9kYWxfX3BheW1lbnRfcmVxdWVzdF9fcmVhc29uX29mX2FjdGlvbicpLnZhbCgpLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0J3VpX2NsaWNrZWRfZWxlbWVudF9pZCc6ICd3cGJjX21vZGFsX19wYXltZW50X3JlcXVlc3RfX2J1dHRvbl9zZW5kJ1xyXG5cdH0gKTtcclxuXHR3cGJjX2J1dHRvbl9lbmFibGVfbG9hZGluZ19pY29uKCBqUXVlcnkoICcjd3BiY19tb2RhbF9fcGF5bWVudF9yZXF1ZXN0X19idXR0b25fc2VuZCcgKS5nZXQoIDAgKSApO1xyXG59XHJcblxyXG5cclxuLyoqXHJcbiAqICAgSW1wb3J0IEdvb2dsZSBDYWxlbmRhciAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXHJcblxyXG5mdW5jdGlvbiB3cGJjX2FqeF9ib29raW5nX191aV9jbGlja19faW1wb3J0X2dvb2dsZV9jYWxlbmRhcigpe1xyXG5cclxuXHR3cGJjX2FqeF9ib29raW5nX2FqYXhfYWN0aW9uX3JlcXVlc3QoIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdCdib29raW5nX2FjdGlvbicgICAgICAgOiAnaW1wb3J0X2dvb2dsZV9jYWxlbmRhcicsXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQndWlfY2xpY2tlZF9lbGVtZW50X2lkJzogJ3dwYmNfbW9kYWxfX2ltcG9ydF9nb29nbGVfY2FsZW5kYXJfX2J1dHRvbl9zZW5kJ1xyXG5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdCwgJ2Jvb2tpbmdfZ2NhbF9ldmVudHNfZnJvbScgOiBcdFx0XHRcdGpRdWVyeSggJyN3cGJjX21vZGFsX19pbXBvcnRfZ29vZ2xlX2NhbGVuZGFyX19zZWN0aW9uICNib29raW5nX2djYWxfZXZlbnRzX2Zyb20gb3B0aW9uOnNlbGVjdGVkJykudmFsKClcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdCwgJ2Jvb2tpbmdfZ2NhbF9ldmVudHNfZnJvbV9vZmZzZXQnIDogXHRcdGpRdWVyeSggJyN3cGJjX21vZGFsX19pbXBvcnRfZ29vZ2xlX2NhbGVuZGFyX19zZWN0aW9uICNib29raW5nX2djYWxfZXZlbnRzX2Zyb21fb2Zmc2V0JyApLnZhbCgpXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQsICdib29raW5nX2djYWxfZXZlbnRzX2Zyb21fb2Zmc2V0X3R5cGUnIDogXHRqUXVlcnkoICcjd3BiY19tb2RhbF9faW1wb3J0X2dvb2dsZV9jYWxlbmRhcl9fc2VjdGlvbiAjYm9va2luZ19nY2FsX2V2ZW50c19mcm9tX29mZnNldF90eXBlIG9wdGlvbjpzZWxlY3RlZCcpLnZhbCgpXHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0LCAnYm9va2luZ19nY2FsX2V2ZW50c191bnRpbCcgOiBcdFx0XHRqUXVlcnkoICcjd3BiY19tb2RhbF9faW1wb3J0X2dvb2dsZV9jYWxlbmRhcl9fc2VjdGlvbiAjYm9va2luZ19nY2FsX2V2ZW50c191bnRpbCBvcHRpb246c2VsZWN0ZWQnKS52YWwoKVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0LCAnYm9va2luZ19nY2FsX2V2ZW50c191bnRpbF9vZmZzZXQnIDogXHRcdGpRdWVyeSggJyN3cGJjX21vZGFsX19pbXBvcnRfZ29vZ2xlX2NhbGVuZGFyX19zZWN0aW9uICNib29raW5nX2djYWxfZXZlbnRzX3VudGlsX29mZnNldCcgKS52YWwoKVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0LCAnYm9va2luZ19nY2FsX2V2ZW50c191bnRpbF9vZmZzZXRfdHlwZScgOiBqUXVlcnkoICcjd3BiY19tb2RhbF9faW1wb3J0X2dvb2dsZV9jYWxlbmRhcl9fc2VjdGlvbiAjYm9va2luZ19nY2FsX2V2ZW50c191bnRpbF9vZmZzZXRfdHlwZSBvcHRpb246c2VsZWN0ZWQnKS52YWwoKVxyXG5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdCwgJ2Jvb2tpbmdfZ2NhbF9ldmVudHNfbWF4JyA6IFx0alF1ZXJ5KCAnI3dwYmNfbW9kYWxfX2ltcG9ydF9nb29nbGVfY2FsZW5kYXJfX3NlY3Rpb24gI2Jvb2tpbmdfZ2NhbF9ldmVudHNfbWF4JyApLnZhbCgpXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQsICdib29raW5nX2djYWxfcmVzb3VyY2UnIDogXHRqUXVlcnkoICcjd3BiY19tb2RhbF9faW1wb3J0X2dvb2dsZV9jYWxlbmRhcl9fc2VjdGlvbiAjd3BiY19ib29raW5nX3Jlc291cmNlIG9wdGlvbjpzZWxlY3RlZCcpLnZhbCgpXHJcblx0fSApO1xyXG5cdHdwYmNfYnV0dG9uX2VuYWJsZV9sb2FkaW5nX2ljb24oIGpRdWVyeSggJyN3cGJjX21vZGFsX19pbXBvcnRfZ29vZ2xlX2NhbGVuZGFyX19zZWN0aW9uICN3cGJjX21vZGFsX19pbXBvcnRfZ29vZ2xlX2NhbGVuZGFyX19idXR0b25fc2VuZCcgKS5nZXQoIDAgKSApO1xyXG59XHJcblxyXG5cclxuLyoqXHJcbiAqICAgRXhwb3J0IGJvb2tpbmdzIHRvIENTViAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXHJcbmZ1bmN0aW9uIHdwYmNfYWp4X2Jvb2tpbmdfX3VpX2NsaWNrX19leHBvcnRfY3N2KCBwYXJhbXMgKXtcclxuXHJcblx0dmFyIHNlbGVjdGVkX2Jvb2tpbmdfaWRfYXJyID0gd3BiY19nZXRfc2VsZWN0ZWRfcm93X2lkKCk7XHJcblxyXG5cdHdwYmNfYWp4X2Jvb2tpbmdfYWpheF9hY3Rpb25fcmVxdWVzdCgge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0J2Jvb2tpbmdfYWN0aW9uJyAgICAgICAgOiBwYXJhbXNbICdib29raW5nX2FjdGlvbicgXSxcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdCd1aV9jbGlja2VkX2VsZW1lbnRfaWQnIDogcGFyYW1zWyAndWlfY2xpY2tlZF9lbGVtZW50X2lkJyBdLFxyXG5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdCdleHBvcnRfdHlwZScgICAgICAgICAgIDogcGFyYW1zWyAnZXhwb3J0X3R5cGUnIF0sXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQnY3N2X2V4cG9ydF9zZXBhcmF0b3InICA6IHBhcmFtc1sgJ2Nzdl9leHBvcnRfc2VwYXJhdG9yJyBdLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0J2Nzdl9leHBvcnRfc2tpcF9maWVsZHMnOiBwYXJhbXNbICdjc3ZfZXhwb3J0X3NraXBfZmllbGRzJyBdLFxyXG5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdCdib29raW5nX2lkJ1x0OiBzZWxlY3RlZF9ib29raW5nX2lkX2Fyci5qb2luKCcsJyksXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQnc2VhcmNoX3BhcmFtcycgOiB3cGJjX2FqeF9ib29raW5nX2xpc3Rpbmcuc2VhcmNoX2dldF9hbGxfcGFyYW1zKClcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR9ICk7XHJcblxyXG5cdHZhciB0aGlzX2VsID0galF1ZXJ5KCAnIycgKyBwYXJhbXNbICd1aV9jbGlja2VkX2VsZW1lbnRfaWQnIF0gKS5nZXQoIDAgKVxyXG5cclxuXHR3cGJjX2J1dHRvbl9lbmFibGVfbG9hZGluZ19pY29uKCB0aGlzX2VsICk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBPcGVuIFVSTCBpbiBuZXcgdGFiIC0gbWFpbmx5ICBpdCdzIHVzZWQgZm9yIG9wZW4gQ1NWIGxpbmsgIGZvciBkb3dubG9hZGVkIGV4cG9ydGVkIGJvb2tpbmdzIGFzIENTVlxyXG4gKlxyXG4gKiBAcGFyYW0gZXhwb3J0X2Nzdl91cmxcclxuICovXHJcbmZ1bmN0aW9uIHdwYmNfYWp4X2Jvb2tpbmdfX2V4cG9ydF9jc3ZfdXJsX19kb3dubG9hZCggZXhwb3J0X2Nzdl91cmwgKXtcclxuXHJcblx0Ly92YXIgc2VsZWN0ZWRfYm9va2luZ19pZF9hcnIgPSB3cGJjX2dldF9zZWxlY3RlZF9yb3dfaWQoKTtcclxuXHJcblx0ZG9jdW1lbnQubG9jYXRpb24uaHJlZiA9IGV4cG9ydF9jc3ZfdXJsOy8vICsgJyZzZWxlY3RlZF9pZD0nICsgc2VsZWN0ZWRfYm9va2luZ19pZF9hcnIuam9pbignLCcpO1xyXG5cclxuXHQvLyBJdCdzIG9wZW4gYWRkaXRpb25hbCBkaWFsb2cgZm9yIGFza2luZyBvcGVuaW5nIHVsciBpbiBuZXcgdGFiXHJcblx0Ly8gd2luZG93Lm9wZW4oIGV4cG9ydF9jc3ZfdXJsLCAnX2JsYW5rJykuZm9jdXMoKTtcclxufSJdLCJmaWxlIjoiaW5jbHVkZXMvcGFnZS1ib29raW5ncy9fb3V0L2Jvb2tpbmdzX19hY3Rpb25zLmpzIn0=
