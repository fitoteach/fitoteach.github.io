"use strict";
/**
 * Request Object
 * Here we can  define Search parameters and Update it later,  when  some parameter was changed
 *
 */

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

var wpbc_ajx_customize_plugin = function (obj, $) {
  // Secure parameters for Ajax	------------------------------------------------------------------------------------
  var p_secure = obj.security_obj = obj.security_obj || {
    user_id: 0,
    nonce: '',
    locale: ''
  };

  obj.set_secure_param = function (param_key, param_val) {
    p_secure[param_key] = param_val;
  };

  obj.get_secure_param = function (param_key) {
    return p_secure[param_key];
  }; // Listing Search parameters	------------------------------------------------------------------------------------


  var p_listing = obj.search_request_obj = obj.search_request_obj || {// sort            : "booking_id",
    // sort_type       : "DESC",
    // page_num        : 1,
    // page_items_count: 10,
    // create_date     : "",
    // keyword         : "",
    // source          : ""
  };

  obj.search_set_all_params = function (request_param_obj) {
    p_listing = request_param_obj;
  };

  obj.search_get_all_params = function () {
    return p_listing;
  };

  obj.search_get_param = function (param_key) {
    return p_listing[param_key];
  };

  obj.search_set_param = function (param_key, param_val) {
    // if ( Array.isArray( param_val ) ){
    // 	param_val = JSON.stringify( param_val );
    // }
    p_listing[param_key] = param_val;
  };

  obj.search_set_params_arr = function (params_arr) {
    _.each(params_arr, function (p_val, p_key, p_data) {
      // Define different Search  parameters for request
      this.search_set_param(p_key, p_val);
    });
  }; // Other parameters 			------------------------------------------------------------------------------------


  var p_other = obj.other_obj = obj.other_obj || {};

  obj.set_other_param = function (param_key, param_val) {
    p_other[param_key] = param_val;
  };

  obj.get_other_param = function (param_key) {
    return p_other[param_key];
  };

  return obj;
}(wpbc_ajx_customize_plugin || {}, jQuery);

var wpbc_ajx_bookings = [];
/**
 *   Show Content  ---------------------------------------------------------------------------------------------- */

/**
 * Show Content - Calendar and UI elements
 *
 * @param ajx_data
 * @param ajx_search_params
 * @param ajx_cleaned_params
 */

function wpbc_ajx_customize_plugin__page_content__show(ajx_data, ajx_search_params, ajx_cleaned_params) {
  // Content ---------------------------------------------------------------------------------------------------------
  var template__customize_plugin_main_page_content = wp.template('wpbc_ajx_customize_plugin_main_page_content');
  jQuery(wpbc_ajx_customize_plugin.get_other_param('listing_container')).html(template__customize_plugin_main_page_content({
    'ajx_data': ajx_data,
    'ajx_search_params': ajx_search_params,
    // $_REQUEST[ 'search_params' ]
    'ajx_cleaned_params': ajx_cleaned_params
  }));
  var template__inline_calendar;
  var data_arr = {
    'ajx_data': ajx_data,
    'ajx_search_params': ajx_search_params,
    'ajx_cleaned_params': ajx_cleaned_params
  };

  switch (ajx_data['customize_steps']['current']) {
    case 'calendar_skin':
      // Calendar  --------------------------------------------------------------------------------------------
      template__inline_calendar = wp.template('wpbc_ajx_customize_plugin__inline_calendar');
      jQuery('.wpbc_ajx_cstm__section_left').html(template__inline_calendar(data_arr)); // Calendar Skin

      var template__wiget_calendar_skin = wp.template('wpbc_ajx_widget_change_calendar_skin');
      jQuery('.wpbc_ajx_cstm__section_right .wpbc_widgets').append(template__wiget_calendar_skin(data_arr)); // Shortcode
      // var template__widget_plugin_shortcode = wp.template( 'wpbc_ajx_widget_plugin_shortcode' );
      // jQuery('.wpbc_ajx_cstm__section_right .wpbc_widgets').append(	template__widget_plugin_shortcode( data_arr ) );
      // Size
      // var template__wiget_calendar_size = wp.template( 'wpbc_ajx_widget_calendar_size' );
      // jQuery('.wpbc_ajx_cstm__section_right .wpbc_widgets').append(	template__wiget_calendar_size( data_arr ) );

      break;

    case 'calendar_size':
      // Calendar  --------------------------------------------------------------------------------------------
      template__inline_calendar = wp.template('wpbc_ajx_customize_plugin__inline_calendar');
      jQuery('.wpbc_ajx_cstm__section_left').html(template__inline_calendar(data_arr)); // Calendar Skin

      var template__wiget_calendar_size = wp.template('wpbc_ajx_widget_calendar_size');
      jQuery('.wpbc_ajx_cstm__section_right .wpbc_widgets').append(template__wiget_calendar_size(data_arr)); // Shortcode
      // var template__widget_plugin_shortcode = wp.template( 'wpbc_ajx_widget_plugin_shortcode' );
      // jQuery('.wpbc_ajx_cstm__section_right .wpbc_widgets').append(	template__widget_plugin_shortcode( data_arr ) );

      break;

    case 'calendar_dates_selection':
      // Calendar  --------------------------------------------------------------------------------------------
      template__inline_calendar = wp.template('wpbc_ajx_customize_plugin__inline_calendar');
      jQuery('.wpbc_ajx_cstm__section_left').html(template__inline_calendar(data_arr));
      jQuery('.wpbc_ajx_cstm__section_left').append('<div class="clear" style="width:100%;margin:50px 0 0;"></div>');
      var message_html_id = wpbc_ajx_customize_plugin__show_message('<strong>' + 'You can test days selection in calendar' + '</strong>', {
        'container': '.wpbc_ajx_cstm__section_left',
        // '#ajax_working',
        'style': 'margin: 6px auto;  padding: 6px 20px;z-index: 999999;',
        'type': 'info',
        'delay': 5000
      });
      wpbc_blink_element('#' + message_html_id, 3, 320); // Widget - Dates selection

      var template__widget_plugin_calendar_dates_selection = wp.template('wpbc_ajx_widget_calendar_dates_selection');
      jQuery('.wpbc_ajx_cstm__section_right .wpbc_widgets').append(template__widget_plugin_calendar_dates_selection(data_arr));
      break;

    case 'calendar_weekdays_availability':
      // Scroll  to  current month
      var s_year = wpbc_ajx_customize_plugin.search_set_param('calendar__start_year', 0);
      var s_month = wpbc_ajx_customize_plugin.search_set_param('calendar__start_month', 0); // Calendar  --------------------------------------------------------------------------------------------

      template__inline_calendar = wp.template('wpbc_ajx_customize_plugin__inline_calendar');
      jQuery('.wpbc_ajx_cstm__section_left').html(template__inline_calendar(data_arr)); // Widget - Weekdays Availability

      var template__widget_plugin_calendar_weekdays_availability = wp.template('wpbc_ajx_widget_calendar_weekdays_availability');
      jQuery('.wpbc_ajx_cstm__section_right .wpbc_widgets').append(template__widget_plugin_calendar_weekdays_availability(data_arr));
      break;

    case 'calendar_additional':
      // Calendar  --------------------------------------------------------------------------------------------
      template__inline_calendar = wp.template('wpbc_ajx_customize_plugin__inline_calendar');
      jQuery('.wpbc_ajx_cstm__section_left').html(template__inline_calendar(data_arr)); // Calendar Skin

      var template__wiget_calendar_additional = wp.template('wpbc_ajx_widget_calendar_additional');
      jQuery('.wpbc_ajx_cstm__section_right .wpbc_widgets').append(template__wiget_calendar_additional(data_arr)); // Shortcode
      // var template__widget_plugin_shortcode = wp.template( 'wpbc_ajx_widget_plugin_shortcode' );
      // jQuery('.wpbc_ajx_cstm__section_right .wpbc_widgets').append(	template__widget_plugin_shortcode( data_arr ) );

      break;

    default: //console.log( `Sorry, we are out of ${expr}.` );

  } // Toolbar ---------------------------------------------------------------------------------------------------------


  var template__customize_plugin_toolbar_page_content = wp.template('wpbc_ajx_customize_plugin_toolbar_page_content');
  jQuery(wpbc_ajx_customize_plugin.get_other_param('toolbar_container')).html(template__customize_plugin_toolbar_page_content({
    'ajx_data': ajx_data,
    'ajx_search_params': ajx_search_params,
    // $_REQUEST[ 'search_params' ]
    'ajx_cleaned_params': ajx_cleaned_params
  })); // Booking resources  ------------------------------------------------------------------------------------------

  var wpbc_ajx_select_booking_resource = wp.template('wpbc_ajx_select_booking_resource');
  jQuery('#wpbc_hidden_template__select_booking_resource').html(wpbc_ajx_select_booking_resource({
    'ajx_data': ajx_data,
    'ajx_search_params': ajx_search_params,
    'ajx_cleaned_params': ajx_cleaned_params
  }));
  /*
   * By  default hided at ../wp-content/plugins/booking/includes/page-customize/_src/customize_plugin_page.css  #wpbc_hidden_template__select_booking_resource { display: none; }
   *
   * 	We can hide  ///-	Hide resources!
   * 				 //setTimeout( function (){ jQuery( '#wpbc_hidden_template__select_booking_resource' ).html( '' ); }, 1000 );
   */
  // Other  ---------------------------------------------------------------------------------------------------------

  jQuery('.wpbc_processing.wpbc_spin').parent().parent().parent().parent('[id^="wpbc_notice_"]').hide(); // Load calendar ---------------------------------------------------------------------------------------------------------

  wpbc_ajx_customize_plugin__calendar__show({
    'resource_id': ajx_cleaned_params.resource_id,
    'ajx_nonce_calendar': ajx_data.ajx_nonce_calendar,
    'ajx_data_arr': ajx_data,
    'ajx_cleaned_params': ajx_cleaned_params
  }); //------------------------------------------------------------------------------------------------------------------

  /**
   * Change calendar skin view
   */

  jQuery('.wpbc_radio__set_days_customize_plugin').on('change', function (event, resource_id, inst) {
    wpbc__calendar__change_skin(jQuery(this).val());
  }); // Re-load Tooltips

  jQuery(document).ready(function () {
    wpbc_define_tippy_tooltips(wpbc_ajx_customize_plugin.get_other_param('listing_container') + ' ');
    wpbc_define_tippy_tooltips(wpbc_ajx_customize_plugin.get_other_param('toolbar_container') + ' ');
  });
}
/**
 * Show inline month view calendar              with all predefined CSS (sizes and check in/out,  times containers)
 * @param {obj} calendar_params_arr
			{
				'resource_id'       	: ajx_cleaned_params.resource_id,
				'ajx_nonce_calendar'	: ajx_data_arr.ajx_nonce_calendar,
				'ajx_data_arr'          : ajx_data_arr = { ajx_booking_resources:[],  resource_unavailable_dates:[], season_customize_plugin:{},.... }
				'ajx_cleaned_params'    : {
											calendar__days_selection_mode: "dynamic"
											calendar__timeslot_day_bg_as_available: ""
											calendar__view__cell_height: ""
											calendar__view__months_in_row: 4
											calendar__view__visible_months: 12
											calendar__view__width: "100%"

											dates_customize_plugin: "unavailable"
											dates_selection: "2023-03-14 ~ 2023-03-16"
											do_action: "set_customize_plugin"
											resource_id: 1
											ui_clicked_element_id: "wpbc_customize_plugin_apply_btn"
											ui_usr__customize_plugin_selected_toolbar: "info"
								  		 }
			}
*/


function wpbc_ajx_customize_plugin__calendar__show(calendar_params_arr) {
  // Update nonce
  jQuery('#ajx_nonce_calendar_section').html(calendar_params_arr.ajx_nonce_calendar); //------------------------------------------------------------------------------------------------------------------
  // Update bookings
  //------------------------------------------------------------------------------------------------------------------

  if ('undefined' == typeof wpbc_ajx_bookings[calendar_params_arr.resource_id]) {
    wpbc_ajx_bookings[calendar_params_arr.resource_id] = [];
  }

  wpbc_ajx_bookings[calendar_params_arr.resource_id] = calendar_params_arr['ajx_data_arr']['calendar_settings']['booked_dates']; //------------------------------------------------------------------------------------------------------------------
  // Get scrolling month  or year  in calendar  and save it to  the init parameters
  //------------------------------------------------------------------------------------------------------------------

  jQuery('body').off('wpbc__inline_booking_calendar__changed_year_month');
  jQuery('body').on('wpbc__inline_booking_calendar__changed_year_month', function (event, year, month, calendar_params_arr, datepick_this) {
    wpbc_ajx_customize_plugin.search_set_param('calendar__start_year', year);
    wpbc_ajx_customize_plugin.search_set_param('calendar__start_month', month);
  }); //------------------------------------------------------------------------------------------------------------------
  // Define showing mouse over tooltip on unavailable dates
  //------------------------------------------------------------------------------------------------------------------

  jQuery('body').on('wpbc_datepick_inline_calendar_refresh', function (event, resource_id, inst) {
    /**
     * It's defined, when calendar REFRESHED (change months or days selection) loaded in jquery.datepick.wpbc.9.0.js :
     * 		$( 'body' ).trigger( 'wpbc_datepick_inline_calendar_refresh', ...		//FixIn: 9.4.4.13
     */
    // inst.dpDiv  it's:  <div class="datepick-inline datepick-multi" style="width: 17712px;">....</div>
    inst.dpDiv.find('.season_unavailable,.before_after_unavailable,.weekdays_unavailable').on('mouseover', function (this_event) {
      // also available these vars: 	resource_id, jCalContainer, inst
      var jCell = jQuery(this_event.currentTarget);
      wpbc_cstm__show_tooltip__for_element(jCell, calendar_params_arr['ajx_data_arr']['popover_hints']);
    });
  }); //------------------------------------------------------------------------------------------------------------------
  //  Define height of the calendar  cells, 	and  mouse over tooltips at  some unavailable dates
  //------------------------------------------------------------------------------------------------------------------

  jQuery('body').on('wpbc_datepick_inline_calendar_loaded', function (event, resource_id, jCalContainer, inst) {
    /**
     * It's defined, when calendar loaded in jquery.datepick.wpbc.9.0.js :
     * 		$( 'body' ).trigger( 'wpbc_datepick_inline_calendar_loaded', ...		//FixIn: 9.4.4.12
     */
    // Remove highlight day for today  date
    jQuery('.datepick-days-cell.datepick-today.datepick-days-cell-over').removeClass('datepick-days-cell-over'); // Set height of calendar  cells if defined this option

    var stylesheet = document.getElementById('wpbc-calendar-cell-height');

    if (null !== stylesheet) {
      stylesheet.parentNode.removeChild(stylesheet);
    }

    if ('' !== calendar_params_arr.ajx_cleaned_params.calendar__view__cell_height) {
      jQuery('head').append('<style type="text/css" id="wpbc-calendar-cell-height">' + '.hasDatepick .datepick-inline .datepick-title-row th, ' + '.hasDatepick .datepick-inline .datepick-days-cell {' + 'height: ' + calendar_params_arr.ajx_cleaned_params.calendar__view__cell_height + ' !important;' + '}' + '</style>');
    } // Define showing mouse over tooltip on unavailable dates


    jCalContainer.find('.season_unavailable,.before_after_unavailable,.weekdays_unavailable').on('mouseover', function (this_event) {
      // also available these vars: 	resource_id, jCalContainer, inst
      var jCell = jQuery(this_event.currentTarget);
      wpbc_cstm__show_tooltip__for_element(jCell, calendar_params_arr['ajx_data_arr']['popover_hints']);
    });
  }); //------------------------------------------------------------------------------------------------------------------
  // Define months_in_row
  //------------------------------------------------------------------------------------------------------------------

  if (undefined == calendar_params_arr.ajx_cleaned_params.calendar__view__months_in_row || '' == calendar_params_arr.ajx_cleaned_params.calendar__view__months_in_row) {
    calendar_params_arr.ajx_cleaned_params.calendar__view__months_in_row = calendar_params_arr.ajx_cleaned_params.calendar__view__visible_months;
  } //------------------------------------------------------------------------------------------------------------------
  // Define width of entire calendar
  //------------------------------------------------------------------------------------------------------------------


  var width = ''; // var width = 'width:100%;max-width:100%;';
  // Width																											/* FixIn: 9.7.3.4 */

  if (undefined != calendar_params_arr.ajx_cleaned_params.calendar__view__width && '' !== calendar_params_arr.ajx_cleaned_params.calendar__view__width) {
    width += 'max-width:' + calendar_params_arr.ajx_cleaned_params.calendar__view__width + ';';
    width += 'width:100%;';
  } //------------------------------------------------------------------------------------------------------------------
  // Add calendar container: "Calendar is loading..."  and textarea
  //------------------------------------------------------------------------------------------------------------------


  jQuery('.wpbc_ajx_cstm__calendar').html('<div class="' + ' bk_calendar_frame' + ' months_num_in_row_' + calendar_params_arr.ajx_cleaned_params.calendar__view__months_in_row + ' cal_month_num_' + calendar_params_arr.ajx_cleaned_params.calendar__view__visible_months + ' ' + calendar_params_arr.ajx_cleaned_params.calendar__timeslot_day_bg_as_available // 'wpbc_timeslot_day_bg_as_available' || ''
  + '" ' + 'style="' + width + '">' + '<div id="calendar_booking' + calendar_params_arr.resource_id + '">' + 'Calendar is loading...' + '</div>' + '</div>' + '<textarea      id="date_booking' + calendar_params_arr.resource_id + '"' + ' name="date_booking' + calendar_params_arr.resource_id + '"' + ' autocomplete="off"' + ' style="display:none;width:100%;height:10em;margin:2em 0 0;"></textarea>'); //------------------------------------------------------------------------------------------------------------------
  // Define variables for calendar
  //------------------------------------------------------------------------------------------------------------------

  var cal_param_arr = calendar_params_arr.ajx_data_arr.calendar_settings;
  cal_param_arr['html_id'] = 'calendar_booking' + calendar_params_arr.ajx_cleaned_params.resource_id;
  cal_param_arr['text_id'] = 'date_booking' + calendar_params_arr.ajx_cleaned_params.resource_id;
  cal_param_arr['resource_id'] = calendar_params_arr.ajx_cleaned_params.resource_id;
  cal_param_arr['ajx_nonce_calendar'] = calendar_params_arr.ajx_data_arr.ajx_nonce_calendar;
  cal_param_arr['season_customize_plugin'] = calendar_params_arr.ajx_data_arr.season_customize_plugin;
  cal_param_arr['resource_unavailable_dates'] = calendar_params_arr.ajx_data_arr.resource_unavailable_dates;
  cal_param_arr['popover_hints'] = calendar_params_arr.ajx_data_arr.popover_hints; // {'season_unavailable':'...','weekdays_unavailable':'...','before_after_unavailable':'...',}
  //------------------------------------------------------------------------------------------------------------------
  // Show Calendar
  //------------------------------------------------------------------------------------------------------------------

  wpbc_show_inline_booking_calendar(cal_param_arr); //------------------------------------------------------------------------------------------------------------------
  // Scroll  to  specific Year and Month,  if defined in init parameters
  //------------------------------------------------------------------------------------------------------------------

  var s_year = wpbc_ajx_customize_plugin.search_get_param('calendar__start_year');
  var s_month = wpbc_ajx_customize_plugin.search_get_param('calendar__start_month');

  if (0 !== s_year && 0 !== s_month) {
    wpbc__inline_booking_calendar__change_year_month(cal_param_arr['resource_id'], s_year, s_month);
  }
}
/**
 *   Tooltips  ---------------------------------------------------------------------------------------------- */

/**
 * Define showing tooltip,  when  mouse over on  SELECTABLE (available, pending, approved, resource unavailable),  days
 * Can be called directly  from  datepick init function.
 *
 * @param value
 * @param date
 * @param calendar_params_arr
 * @param datepick_this
 * @returns {boolean}
 */


function wpbc_cstm__prepare_tooltip__in_calendar(value, date, calendar_params_arr, datepick_this) {
  if (null == date) {
    return false;
  }

  var td_class = date.getMonth() + 1 + '-' + date.getDate() + '-' + date.getFullYear();
  var jCell = jQuery('#calendar_booking' + calendar_params_arr.resource_id + ' td.cal4date-' + td_class);
  wpbc_cstm__show_tooltip__for_element(jCell, calendar_params_arr['popover_hints']);
  return true;
}
/**
 * Define tooltip  for showing on UNAVAILABLE days (season, weekday, today_depends unavailable)
 *
 * @param jCell					jQuery of specific day cell
 * @param popover_hints		    Array with tooltip hint texts	 : {'season_unavailable':'...','weekdays_unavailable':'...','before_after_unavailable':'...',}
 */


function wpbc_cstm__show_tooltip__for_element(jCell, popover_hints) {
  var tooltip_time = '';

  if (jCell.hasClass('season_unavailable')) {
    tooltip_time = popover_hints['season_unavailable'];
  } else if (jCell.hasClass('weekdays_unavailable')) {
    tooltip_time = popover_hints['weekdays_unavailable'];
  } else if (jCell.hasClass('before_after_unavailable')) {
    tooltip_time = popover_hints['before_after_unavailable'];
  } else if (jCell.hasClass('date2approve')) {} else if (jCell.hasClass('date_approved')) {} else {}

  jCell.attr('data-content', tooltip_time);
  var td_el = jCell.get(0); //jQuery( '#calendar_booking' + calendar_params_arr.resource_id + ' td.cal4date-' + td_class ).get(0);

  if (undefined == td_el._tippy && '' != tooltip_time) {
    wpbc_tippy(td_el, {
      content: function content(reference) {
        var popover_content = reference.getAttribute('data-content');
        return '<div class="popover popover_tippy">' + '<div class="popover-content">' + popover_content + '</div>' + '</div>';
      },
      allowHTML: true,
      trigger: 'mouseenter focus',
      interactive: !true,
      hideOnClick: true,
      interactiveBorder: 10,
      maxWidth: 550,
      theme: 'wpbc-tippy-times',
      placement: 'top',
      delay: [400, 0],
      //FixIn: 9.4.2.2
      ignoreAttributes: true,
      touch: true,
      //['hold', 500], // 500ms delay			//FixIn: 9.2.1.5
      appendTo: function appendTo() {
        return document.body;
      }
    });
  }
}
/**
 *   Ajax  ------------------------------------------------------------------------------------------------------ */

/**
 * Send Ajax show request
 */


function wpbc_ajx_customize_plugin__ajax_request() {
  console.groupCollapsed('WPBC_AJX_CUSTOMIZE_PLUGIN');
  console.log(' == Before Ajax Send - search_get_all_params() == ', wpbc_ajx_customize_plugin.search_get_all_params());
  wpbc_customize_plugin_reload_button__spin_start(); // Start Ajax

  jQuery.post(wpbc_url_ajax, {
    action: 'WPBC_AJX_CUSTOMIZE_PLUGIN',
    wpbc_ajx_user_id: wpbc_ajx_customize_plugin.get_secure_param('user_id'),
    nonce: wpbc_ajx_customize_plugin.get_secure_param('nonce'),
    wpbc_ajx_locale: wpbc_ajx_customize_plugin.get_secure_param('locale'),
    search_params: wpbc_ajx_customize_plugin.search_get_all_params()
  },
  /**
   * S u c c e s s
   *
   * @param response_data		-	its object returned from  Ajax - class-live-searcg.php
   * @param textStatus		-	'success'
   * @param jqXHR				-	Object
   */
  function (response_data, textStatus, jqXHR) {
    console.log(' == Response WPBC_AJX_CUSTOMIZE_PLUGIN == ', response_data);
    console.groupEnd(); // Probably Error

    if (_typeof(response_data) !== 'object' || response_data === null) {
      wpbc_ajx_customize_plugin__actual_content__hide();
      wpbc_ajx_customize_plugin__show_message(response_data);
      return;
    } // Reload page, after filter toolbar has been reset


    if (undefined != response_data['ajx_cleaned_params'] && 'reset_done' === response_data['ajx_cleaned_params']['do_action']) {
      location.reload();
      return;
    } // Show listing


    wpbc_ajx_customize_plugin__page_content__show(response_data['ajx_data'], response_data['ajx_search_params'], response_data['ajx_cleaned_params']); //wpbc_ajx_customize_plugin__define_ui_hooks();						// Redefine Hooks, because we show new DOM elements

    if ('' != response_data['ajx_data']['ajx_after_action_message'].replace(/\n/g, "<br />")) {
      wpbc_admin_show_message(response_data['ajx_data']['ajx_after_action_message'].replace(/\n/g, "<br />"), '1' == response_data['ajx_data']['ajx_after_action_result'] ? 'success' : 'error', 10000);
    }

    wpbc_customize_plugin_reload_button__spin_pause(); // Remove spin icon from  button and Enable this button.

    wpbc_button__remove_spin(response_data['ajx_cleaned_params']['ui_clicked_element_id']);
    jQuery('#ajax_respond').html(response_data); // For ability to show response, add such DIV element to page
  }).fail(function (jqXHR, textStatus, errorThrown) {
    if (window.console && window.console.log) {
      console.log('Ajax_Error', jqXHR, textStatus, errorThrown);
    }

    var error_message = '<strong>' + 'Error!' + '</strong> ' + errorThrown;

    if (jqXHR.status) {
      error_message += ' (<b>' + jqXHR.status + '</b>)';

      if (403 == jqXHR.status) {
        error_message += ' Probably nonce for this page has been expired. Please <a href="javascript:void(0)" onclick="javascript:location.reload();">reload the page</a>.';
      }
    }

    if (jqXHR.responseText) {
      error_message += ' ' + jqXHR.responseText;
    }

    error_message = error_message.replace(/\n/g, "<br />");
    wpbc_ajx_customize_plugin__actual_content__hide();
    wpbc_ajx_customize_plugin__show_message(error_message);
  }) // .done(   function ( data, textStatus, jqXHR ) {   if ( window.console && window.console.log ){ console.log( 'second success', data, textStatus, jqXHR ); }    })
  // .always( function ( data_jqXHR, textStatus, jqXHR_errorThrown ) {   if ( window.console && window.console.log ){ console.log( 'always finished', data_jqXHR, textStatus, jqXHR_errorThrown ); }     })
  ; // End Ajax
}
/**
 *   H o o k s  -  its Action/Times when need to re-Render Views  ----------------------------------------------- */

/**
 * Send Ajax Search Request after Updating search request parameters
 *
 * @param params_arr
 */


function wpbc_ajx_customize_plugin__send_request_with_params(params_arr) {
  // Define different Search  parameters for request
  _.each(params_arr, function (p_val, p_key, p_data) {
    //console.log( 'Request for: ', p_key, p_val );
    wpbc_ajx_customize_plugin.search_set_param(p_key, p_val);
  }); // Send Ajax Request


  wpbc_ajx_customize_plugin__ajax_request();
}
/**
 * Search request for "Page Number"
 * @param page_number	int
 */


function wpbc_ajx_customize_plugin__pagination_click(page_number) {
  wpbc_ajx_customize_plugin__send_request_with_params({
    'page_num': page_number
  });
}
/**
 *   Show / Hide Content  --------------------------------------------------------------------------------------- */

/**
 *  Show Listing Content 	- 	Sending Ajax Request	-	with parameters that  we early  defined
 */


function wpbc_ajx_customize_plugin__actual_content__show() {
  wpbc_ajx_customize_plugin__ajax_request(); // Send Ajax Request	-	with parameters that  we early  defined in "wpbc_ajx_booking_listing" Obj.
}
/**
 * Hide Listing Content
 */


function wpbc_ajx_customize_plugin__actual_content__hide() {
  jQuery(wpbc_ajx_customize_plugin.get_other_param('listing_container')).html('');
}
/**
 *   M e s s a g e  --------------------------------------------------------------------------------------------- */

/**
 *
 */

/**
 * Show message in content
 *
 * @param message				Message HTML
 * @param params = {
 *                   ['type']				'warning' | 'info' | 'error' | 'success'		default: 'warning'
 *                   ['container']			'.wpbc_ajx_cstm__section_left'		default: wpbc_ajx_customize_plugin.get_other_param( 'listing_container' )
 *                   ['is_append']			true | false						default: true
 *				   }
 * Example:
 * 			var html_id = wpbc_ajx_customize_plugin__show_message( 'You can test days selection in calendar', 'info', '.wpbc_ajx_cstm__section_left', true );
 *
 *
 * @returns string  - HTML ID
 */


function wpbc_ajx_customize_plugin__show_message(message) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var params_default = {
    'type': 'warning',
    'container': wpbc_ajx_customize_plugin.get_other_param('listing_container'),
    'is_append': true,
    'style': 'text-align:left;',
    'delay': 0
  };

  _.each(params, function (p_val, p_key, p_data) {
    params_default[p_key] = p_val;
  });

  params = params_default;
  var unique_div_id = new Date();
  unique_div_id = 'wpbc_notice_' + unique_div_id.getTime();
  var alert_class = 'notice ';

  if (params['type'] == 'error') {
    alert_class += 'notice-error ';
    message = '<i style="margin-right: 0.5em;color: #d63638;" class="menu_icon icon-1x wpbc_icn_report_gmailerrorred"></i>' + message;
  }

  if (params['type'] == 'warning') {
    alert_class += 'notice-warning ';
    message = '<i style="margin-right: 0.5em;color: #e9aa04;" class="menu_icon icon-1x wpbc_icn_warning"></i>' + message;
  }

  if (params['type'] == 'info') {
    alert_class += 'notice-info ';
  }

  if (params['type'] == 'success') {
    alert_class += 'notice-info alert-success updated ';
    message = '<i style="margin-right: 0.5em;color: #64aa45;" class="menu_icon icon-1x wpbc_icn_done_outline"></i>' + message;
  }

  message = '<div id="' + unique_div_id + '" class="wpbc-settings-notice ' + alert_class + '" style="' + params['style'] + '">' + message + '</div>';

  if (params['is_append']) {
    jQuery(params['container']).append(message);
  } else {
    jQuery(params['container']).html(message);
  }

  params['delay'] = parseInt(params['delay']);

  if (params['delay'] > 0) {
    var closed_timer = setTimeout(function () {
      jQuery('#' + unique_div_id).fadeOut(1500);
    }, params['delay']);
  }

  return unique_div_id;
}
/**
 *   Support Functions - Spin Icon in Buttons  ------------------------------------------------------------------ */

/**
 * Spin button in Filter toolbar  -  Start
 */


function wpbc_customize_plugin_reload_button__spin_start() {
  jQuery('#wpbc_customize_plugin_reload_button .menu_icon.wpbc_spin').removeClass('wpbc_animation_pause');
}
/**
 * Spin button in Filter toolbar  -  Pause
 */


function wpbc_customize_plugin_reload_button__spin_pause() {
  jQuery('#wpbc_customize_plugin_reload_button .menu_icon.wpbc_spin').addClass('wpbc_animation_pause');
}
/**
 * Spin button in Filter toolbar  -  is Spinning ?
 *
 * @returns {boolean}
 */


function wpbc_customize_plugin_reload_button__is_spin() {
  if (jQuery('#wpbc_customize_plugin_reload_button .menu_icon.wpbc_spin').hasClass('wpbc_animation_pause')) {
    return true;
  } else {
    return false;
  }
}
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluY2x1ZGVzL3BhZ2UtY3VzdG9taXplL19zcmMvY3VzdG9taXplX3BsdWdpbl9wYWdlLmpzIl0sIm5hbWVzIjpbIndwYmNfYWp4X2N1c3RvbWl6ZV9wbHVnaW4iLCJvYmoiLCIkIiwicF9zZWN1cmUiLCJzZWN1cml0eV9vYmoiLCJ1c2VyX2lkIiwibm9uY2UiLCJsb2NhbGUiLCJzZXRfc2VjdXJlX3BhcmFtIiwicGFyYW1fa2V5IiwicGFyYW1fdmFsIiwiZ2V0X3NlY3VyZV9wYXJhbSIsInBfbGlzdGluZyIsInNlYXJjaF9yZXF1ZXN0X29iaiIsInNlYXJjaF9zZXRfYWxsX3BhcmFtcyIsInJlcXVlc3RfcGFyYW1fb2JqIiwic2VhcmNoX2dldF9hbGxfcGFyYW1zIiwic2VhcmNoX2dldF9wYXJhbSIsInNlYXJjaF9zZXRfcGFyYW0iLCJzZWFyY2hfc2V0X3BhcmFtc19hcnIiLCJwYXJhbXNfYXJyIiwiXyIsImVhY2giLCJwX3ZhbCIsInBfa2V5IiwicF9kYXRhIiwicF9vdGhlciIsIm90aGVyX29iaiIsInNldF9vdGhlcl9wYXJhbSIsImdldF9vdGhlcl9wYXJhbSIsImpRdWVyeSIsIndwYmNfYWp4X2Jvb2tpbmdzIiwid3BiY19hanhfY3VzdG9taXplX3BsdWdpbl9fcGFnZV9jb250ZW50X19zaG93IiwiYWp4X2RhdGEiLCJhanhfc2VhcmNoX3BhcmFtcyIsImFqeF9jbGVhbmVkX3BhcmFtcyIsInRlbXBsYXRlX19jdXN0b21pemVfcGx1Z2luX21haW5fcGFnZV9jb250ZW50Iiwid3AiLCJ0ZW1wbGF0ZSIsImh0bWwiLCJ0ZW1wbGF0ZV9faW5saW5lX2NhbGVuZGFyIiwiZGF0YV9hcnIiLCJ0ZW1wbGF0ZV9fd2lnZXRfY2FsZW5kYXJfc2tpbiIsImFwcGVuZCIsInRlbXBsYXRlX193aWdldF9jYWxlbmRhcl9zaXplIiwibWVzc2FnZV9odG1sX2lkIiwid3BiY19hanhfY3VzdG9taXplX3BsdWdpbl9fc2hvd19tZXNzYWdlIiwid3BiY19ibGlua19lbGVtZW50IiwidGVtcGxhdGVfX3dpZGdldF9wbHVnaW5fY2FsZW5kYXJfZGF0ZXNfc2VsZWN0aW9uIiwic195ZWFyIiwic19tb250aCIsInRlbXBsYXRlX193aWRnZXRfcGx1Z2luX2NhbGVuZGFyX3dlZWtkYXlzX2F2YWlsYWJpbGl0eSIsInRlbXBsYXRlX193aWdldF9jYWxlbmRhcl9hZGRpdGlvbmFsIiwidGVtcGxhdGVfX2N1c3RvbWl6ZV9wbHVnaW5fdG9vbGJhcl9wYWdlX2NvbnRlbnQiLCJ3cGJjX2FqeF9zZWxlY3RfYm9va2luZ19yZXNvdXJjZSIsInBhcmVudCIsImhpZGUiLCJ3cGJjX2FqeF9jdXN0b21pemVfcGx1Z2luX19jYWxlbmRhcl9fc2hvdyIsInJlc291cmNlX2lkIiwiYWp4X25vbmNlX2NhbGVuZGFyIiwib24iLCJldmVudCIsImluc3QiLCJ3cGJjX19jYWxlbmRhcl9fY2hhbmdlX3NraW4iLCJ2YWwiLCJkb2N1bWVudCIsInJlYWR5Iiwid3BiY19kZWZpbmVfdGlwcHlfdG9vbHRpcHMiLCJjYWxlbmRhcl9wYXJhbXNfYXJyIiwib2ZmIiwieWVhciIsIm1vbnRoIiwiZGF0ZXBpY2tfdGhpcyIsImRwRGl2IiwiZmluZCIsInRoaXNfZXZlbnQiLCJqQ2VsbCIsImN1cnJlbnRUYXJnZXQiLCJ3cGJjX2NzdG1fX3Nob3dfdG9vbHRpcF9fZm9yX2VsZW1lbnQiLCJqQ2FsQ29udGFpbmVyIiwicmVtb3ZlQ2xhc3MiLCJzdHlsZXNoZWV0IiwiZ2V0RWxlbWVudEJ5SWQiLCJwYXJlbnROb2RlIiwicmVtb3ZlQ2hpbGQiLCJjYWxlbmRhcl9fdmlld19fY2VsbF9oZWlnaHQiLCJ1bmRlZmluZWQiLCJjYWxlbmRhcl9fdmlld19fbW9udGhzX2luX3JvdyIsImNhbGVuZGFyX192aWV3X192aXNpYmxlX21vbnRocyIsIndpZHRoIiwiY2FsZW5kYXJfX3ZpZXdfX3dpZHRoIiwiY2FsZW5kYXJfX3RpbWVzbG90X2RheV9iZ19hc19hdmFpbGFibGUiLCJjYWxfcGFyYW1fYXJyIiwiYWp4X2RhdGFfYXJyIiwiY2FsZW5kYXJfc2V0dGluZ3MiLCJzZWFzb25fY3VzdG9taXplX3BsdWdpbiIsInJlc291cmNlX3VuYXZhaWxhYmxlX2RhdGVzIiwicG9wb3Zlcl9oaW50cyIsIndwYmNfc2hvd19pbmxpbmVfYm9va2luZ19jYWxlbmRhciIsIndwYmNfX2lubGluZV9ib29raW5nX2NhbGVuZGFyX19jaGFuZ2VfeWVhcl9tb250aCIsIndwYmNfY3N0bV9fcHJlcGFyZV90b29sdGlwX19pbl9jYWxlbmRhciIsInZhbHVlIiwiZGF0ZSIsInRkX2NsYXNzIiwiZ2V0TW9udGgiLCJnZXREYXRlIiwiZ2V0RnVsbFllYXIiLCJ0b29sdGlwX3RpbWUiLCJoYXNDbGFzcyIsImF0dHIiLCJ0ZF9lbCIsImdldCIsIl90aXBweSIsIndwYmNfdGlwcHkiLCJjb250ZW50IiwicmVmZXJlbmNlIiwicG9wb3Zlcl9jb250ZW50IiwiZ2V0QXR0cmlidXRlIiwiYWxsb3dIVE1MIiwidHJpZ2dlciIsImludGVyYWN0aXZlIiwiaGlkZU9uQ2xpY2siLCJpbnRlcmFjdGl2ZUJvcmRlciIsIm1heFdpZHRoIiwidGhlbWUiLCJwbGFjZW1lbnQiLCJkZWxheSIsImlnbm9yZUF0dHJpYnV0ZXMiLCJ0b3VjaCIsImFwcGVuZFRvIiwiYm9keSIsIndwYmNfYWp4X2N1c3RvbWl6ZV9wbHVnaW5fX2FqYXhfcmVxdWVzdCIsImNvbnNvbGUiLCJncm91cENvbGxhcHNlZCIsImxvZyIsIndwYmNfY3VzdG9taXplX3BsdWdpbl9yZWxvYWRfYnV0dG9uX19zcGluX3N0YXJ0IiwicG9zdCIsIndwYmNfdXJsX2FqYXgiLCJhY3Rpb24iLCJ3cGJjX2FqeF91c2VyX2lkIiwid3BiY19hanhfbG9jYWxlIiwic2VhcmNoX3BhcmFtcyIsInJlc3BvbnNlX2RhdGEiLCJ0ZXh0U3RhdHVzIiwianFYSFIiLCJncm91cEVuZCIsIndwYmNfYWp4X2N1c3RvbWl6ZV9wbHVnaW5fX2FjdHVhbF9jb250ZW50X19oaWRlIiwibG9jYXRpb24iLCJyZWxvYWQiLCJyZXBsYWNlIiwid3BiY19hZG1pbl9zaG93X21lc3NhZ2UiLCJ3cGJjX2N1c3RvbWl6ZV9wbHVnaW5fcmVsb2FkX2J1dHRvbl9fc3Bpbl9wYXVzZSIsIndwYmNfYnV0dG9uX19yZW1vdmVfc3BpbiIsImZhaWwiLCJlcnJvclRocm93biIsIndpbmRvdyIsImVycm9yX21lc3NhZ2UiLCJzdGF0dXMiLCJyZXNwb25zZVRleHQiLCJ3cGJjX2FqeF9jdXN0b21pemVfcGx1Z2luX19zZW5kX3JlcXVlc3Rfd2l0aF9wYXJhbXMiLCJ3cGJjX2FqeF9jdXN0b21pemVfcGx1Z2luX19wYWdpbmF0aW9uX2NsaWNrIiwicGFnZV9udW1iZXIiLCJ3cGJjX2FqeF9jdXN0b21pemVfcGx1Z2luX19hY3R1YWxfY29udGVudF9fc2hvdyIsIm1lc3NhZ2UiLCJwYXJhbXMiLCJwYXJhbXNfZGVmYXVsdCIsInVuaXF1ZV9kaXZfaWQiLCJEYXRlIiwiZ2V0VGltZSIsImFsZXJ0X2NsYXNzIiwicGFyc2VJbnQiLCJjbG9zZWRfdGltZXIiLCJzZXRUaW1lb3V0IiwiZmFkZU91dCIsImFkZENsYXNzIiwid3BiY19jdXN0b21pemVfcGx1Z2luX3JlbG9hZF9idXR0b25fX2lzX3NwaW4iXSwibWFwcGluZ3MiOiJBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUVBLElBQUlBLHlCQUF5QixHQUFJLFVBQVdDLEdBQVgsRUFBZ0JDLENBQWhCLEVBQW1CO0FBRW5EO0FBQ0EsTUFBSUMsUUFBUSxHQUFHRixHQUFHLENBQUNHLFlBQUosR0FBbUJILEdBQUcsQ0FBQ0csWUFBSixJQUFvQjtBQUN4Q0MsSUFBQUEsT0FBTyxFQUFFLENBRCtCO0FBRXhDQyxJQUFBQSxLQUFLLEVBQUksRUFGK0I7QUFHeENDLElBQUFBLE1BQU0sRUFBRztBQUgrQixHQUF0RDs7QUFNQU4sRUFBQUEsR0FBRyxDQUFDTyxnQkFBSixHQUF1QixVQUFXQyxTQUFYLEVBQXNCQyxTQUF0QixFQUFrQztBQUN4RFAsSUFBQUEsUUFBUSxDQUFFTSxTQUFGLENBQVIsR0FBd0JDLFNB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RUFBK0c7QUFDakgsV0FBTyxJQUFQO0FBQ0EsR0FGRSxNQUVJO0FBQ04sV0FBTyxLQUFQO0FBQ0E7QUFDRCIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xyXG5cclxuLyoqXHJcbiAqIFJlcXVlc3QgT2JqZWN0XHJcbiAqIEhlcmUgd2UgY2FuICBkZWZpbmUgU2VhcmNoIHBhcmFtZXRlcnMgYW5kIFVwZGF0ZSBpdCBsYXRlciwgIHdoZW4gIHNvbWUgcGFyYW1ldGVyIHdhcyBjaGFuZ2VkXHJcbiAqXHJcbiAqL1xyXG5cclxudmFyIHdwYmNfYWp4X2N1c3RvbWl6ZV9wbHVnaW4gPSAoZnVuY3Rpb24gKCBvYmosICQpIHtcclxuXHJcblx0Ly8gU2VjdXJlIHBhcmFtZXRlcnMgZm9yIEFqYXhcdC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdHZhciBwX3NlY3VyZSA9IG9iai5zZWN1cml0eV9vYmogPSBvYmouc2VjdXJpdHlfb2JqIHx8IHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0dXNlcl9pZDogMCxcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0bm9uY2UgIDogJycsXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGxvY2FsZSA6ICcnXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQgIH07XHJcblxyXG5cdG9iai5zZXRfc2VjdXJlX3BhcmFtID0gZnVuY3Rpb24gKCBwYXJhbV9rZXksIHBhcmFtX3ZhbCApIHtcclxuXHRcdHBfc2VjdXJlWyBwYXJhbV9rZXkgXSA9IHBhcmFtX3ZhbDtcclxuXHR9O1xyXG5cclxuXHRvYmouZ2V0X3NlY3VyZV9wYXJhbSA9IGZ1bmN0aW9uICggcGFyYW1fa2V5ICkge1xyXG5cdFx0cmV0dXJuIHBfc2VjdXJlWyBwYXJhbV9rZXkgXTtcclxuXHR9O1xyXG5cclxuXHJcblx0Ly8gTGlzdGluZyBTZWFyY2ggcGFyYW1ldGVyc1x0LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblx0dmFyIHBfbGlzdGluZyA9IG9iai5zZWFyY2hfcmVxdWVzdF9vYmogPSBvYmouc2VhcmNoX3JlcXVlc3Rfb2JqIHx8IHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Ly8gc29ydCAgICAgICAgICAgIDogXCJib29raW5nX2lkXCIsXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vIHNvcnRfdHlwZSAgICAgICA6IFwiREVTQ1wiLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvLyBwYWdlX251bSAgICAgICAgOiAxLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvLyBwYWdlX2l0ZW1zX2NvdW50OiAxMCxcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Ly8gY3JlYXRlX2RhdGUgICAgIDogXCJcIixcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Ly8ga2V5d29yZCAgICAgICAgIDogXCJcIixcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Ly8gc291cmNlICAgICAgICAgIDogXCJcIlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0fTtcclxuXHJcblx0b2JqLnNlYXJjaF9zZXRfYWxsX3BhcmFtcyA9IGZ1bmN0aW9uICggcmVxdWVzdF9wYXJhbV9vYmogKSB7XHJcblx0XHRwX2xpc3RpbmcgPSByZXF1ZXN0X3BhcmFtX29iajtcclxuXHR9O1xyXG5cclxuXHRvYmouc2VhcmNoX2dldF9hbGxfcGFyYW1zID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0cmV0dXJuIHBfbGlzdGluZztcclxuXHR9O1xyXG5cclxuXHRvYmouc2VhcmNoX2dldF9wYXJhbSA9IGZ1bmN0aW9uICggcGFyYW1fa2V5ICkge1xyXG5cdFx0cmV0dXJuIHBfbGlzdGluZ1sgcGFyYW1fa2V5IF07XHJcblx0fTtcclxuXHJcblx0b2JqLnNlYXJjaF9zZXRfcGFyYW0gPSBmdW5jdGlvbiAoIHBhcmFtX2tleSwgcGFyYW1fdmFsICkge1xyXG5cdFx0Ly8gaWYgKCBBcnJheS5pc0FycmF5KCBwYXJhbV92YWwgKSApe1xyXG5cdFx0Ly8gXHRwYXJhbV92YWwgPSBKU09OLnN0cmluZ2lmeSggcGFyYW1fdmFsICk7XHJcblx0XHQvLyB9XHJcblx0XHRwX2xpc3RpbmdbIHBhcmFtX2tleSBdID0gcGFyYW1fdmFsO1xyXG5cdH07XHJcblxyXG5cdG9iai5zZWFyY2hfc2V0X3BhcmFtc19hcnIgPSBmdW5jdGlvbiggcGFyYW1zX2FyciApe1xyXG5cdFx0Xy5lYWNoKCBwYXJhbXNfYXJyLCBmdW5jdGlvbiAoIHBfdmFsLCBwX2tleSwgcF9kYXRhICl7XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Ly8gRGVmaW5lIGRpZmZlcmVudCBTZWFyY2ggIHBhcmFtZXRlcnMgZm9yIHJlcXVlc3RcclxuXHRcdFx0dGhpcy5zZWFyY2hfc2V0X3BhcmFtKCBwX2tleSwgcF92YWwgKTtcclxuXHRcdH0gKTtcclxuXHR9XHJcblxyXG5cclxuXHQvLyBPdGhlciBwYXJhbWV0ZXJzIFx0XHRcdC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdHZhciBwX290aGVyID0gb2JqLm90aGVyX29iaiA9IG9iai5vdGhlcl9vYmogfHwgeyB9O1xyXG5cclxuXHRvYmouc2V0X290aGVyX3BhcmFtID0gZnVuY3Rpb24gKCBwYXJhbV9rZXksIHBhcmFtX3ZhbCApIHtcclxuXHRcdHBfb3RoZXJbIHBhcmFtX2tleSBdID0gcGFyYW1fdmFsO1xyXG5cdH07XHJcblxyXG5cdG9iai5nZXRfb3RoZXJfcGFyYW0gPSBmdW5jdGlvbiAoIHBhcmFtX2tleSApIHtcclxuXHRcdHJldHVybiBwX290aGVyWyBwYXJhbV9rZXkgXTtcclxuXHR9O1xyXG5cclxuXHJcblx0cmV0dXJuIG9iajtcclxufSggd3BiY19hanhfY3VzdG9taXplX3BsdWdpbiB8fCB7fSwgalF1ZXJ5ICkpO1xyXG5cclxudmFyIHdwYmNfYWp4X2Jvb2tpbmdzID0gW107XHJcblxyXG4vKipcclxuICogICBTaG93IENvbnRlbnQgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cclxuXHJcbi8qKlxyXG4gKiBTaG93IENvbnRlbnQgLSBDYWxlbmRhciBhbmQgVUkgZWxlbWVudHNcclxuICpcclxuICogQHBhcmFtIGFqeF9kYXRhXHJcbiAqIEBwYXJhbSBhanhfc2VhcmNoX3BhcmFtc1xyXG4gKiBAcGFyYW0gYWp4X2NsZWFuZWRfcGFyYW1zXHJcbiAqL1xyXG5mdW5jdGlvbiB3cGJjX2FqeF9jdXN0b21pemVfcGx1Z2luX19wYWdlX2NvbnRlbnRfX3Nob3coIGFqeF9kYXRhLCBhanhfc2VhcmNoX3BhcmFtcyAsIGFqeF9jbGVhbmVkX3BhcmFtcyApe1xyXG5cclxuXHQvLyBDb250ZW50IC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdHZhciB0ZW1wbGF0ZV9fY3VzdG9taXplX3BsdWdpbl9tYWluX3BhZ2VfY29udGVudCA9IHdwLnRlbXBsYXRlKCAnd3BiY19hanhfY3VzdG9taXplX3BsdWdpbl9tYWluX3BhZ2VfY29udGVudCcgKTtcclxuXHRqUXVlcnkoIHdwYmNfYWp4X2N1c3RvbWl6ZV9wbHVnaW4uZ2V0X290aGVyX3BhcmFtKCAnbGlzdGluZ19jb250YWluZXInICkgKS5odG1sKCB0ZW1wbGF0ZV9fY3VzdG9taXplX3BsdWdpbl9tYWluX3BhZ2VfY29udGVudCgge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCdhanhfZGF0YScgICAgICAgICAgICAgIDogYWp4X2RhdGEsXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0J2FqeF9zZWFyY2hfcGFyYW1zJyAgICAgOiBhanhfc2VhcmNoX3BhcmFtcyxcdFx0XHRcdFx0XHRcdFx0Ly8gJF9SRVFVRVNUWyAnc2VhcmNoX3BhcmFtcycgXVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCdhanhfY2xlYW5lZF9wYXJhbXMnICAgIDogYWp4X2NsZWFuZWRfcGFyYW1zXHJcblx0XHRcdFx0XHRcdFx0XHRcdH0gKSApO1xyXG5cclxuXHR2YXIgdGVtcGxhdGVfX2lubGluZV9jYWxlbmRhcjtcclxuXHR2YXIgZGF0YV9hcnIgPSB7XHJcblx0XHRcdFx0XHRcdFx0J2FqeF9kYXRhJyAgICAgICAgICAgICAgOiBhanhfZGF0YSxcclxuXHRcdFx0XHRcdFx0XHQnYWp4X3NlYXJjaF9wYXJhbXMnICAgICA6IGFqeF9zZWFyY2hfcGFyYW1zLFxyXG5cdFx0XHRcdFx0XHRcdCdhanhfY2xlYW5lZF9wYXJhbXMnICAgIDogYWp4X2NsZWFuZWRfcGFyYW1zXHJcblx0XHRcdFx0XHRcdH07XHJcblxyXG5cdHN3aXRjaCAoIGFqeF9kYXRhWydjdXN0b21pemVfc3RlcHMnXVsnY3VycmVudCddICl7XHJcblxyXG5cdFx0Y2FzZSAnY2FsZW5kYXJfc2tpbic6XHJcblxyXG5cdFx0XHQvLyBDYWxlbmRhciAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHRcdFx0dGVtcGxhdGVfX2lubGluZV9jYWxlbmRhciA9IHdwLnRlbXBsYXRlKCAnd3BiY19hanhfY3VzdG9taXplX3BsdWdpbl9faW5saW5lX2NhbGVuZGFyJyApO1xyXG5cdFx0XHRqUXVlcnkoJy53cGJjX2FqeF9jc3RtX19zZWN0aW9uX2xlZnQnKS5odG1sKFx0dGVtcGxhdGVfX2lubGluZV9jYWxlbmRhciggZGF0YV9hcnIgKSApO1xyXG5cclxuXHRcdFx0Ly8gQ2FsZW5kYXIgU2tpblxyXG5cdFx0XHR2YXIgdGVtcGxhdGVfX3dpZ2V0X2NhbGVuZGFyX3NraW4gPSB3cC50ZW1wbGF0ZSggJ3dwYmNfYWp4X3dpZGdldF9jaGFuZ2VfY2FsZW5kYXJfc2tpbicgKTtcclxuXHRcdFx0alF1ZXJ5KCcud3BiY19hanhfY3N0bV9fc2VjdGlvbl9yaWdodCAud3BiY193aWRnZXRzJykuYXBwZW5kKFx0dGVtcGxhdGVfX3dpZ2V0X2NhbGVuZGFyX3NraW4oIGRhdGFfYXJyICkgKTtcclxuXHJcblx0XHRcdC8vIFNob3J0Y29kZVxyXG5cdFx0XHQvLyB2YXIgdGVtcGxhdGVfX3dpZGdldF9wbHVnaW5fc2hvcnRjb2RlID0gd3AudGVtcGxhdGUoICd3cGJjX2FqeF93aWRnZXRfcGx1Z2luX3Nob3J0Y29kZScgKTtcclxuXHRcdFx0Ly8galF1ZXJ5KCcud3BiY19hanhfY3N0bV9fc2VjdGlvbl9yaWdodCAud3BiY193aWRnZXRzJykuYXBwZW5kKFx0dGVtcGxhdGVfX3dpZGdldF9wbHVnaW5fc2hvcnRjb2RlKCBkYXRhX2FyciApICk7XHJcblxyXG5cdFx0XHQvLyBTaXplXHJcblx0XHRcdC8vIHZhciB0ZW1wbGF0ZV9fd2lnZXRfY2FsZW5kYXJfc2l6ZSA9IHdwLnRlbXBsYXRlKCAnd3BiY19hanhfd2lkZ2V0X2NhbGVuZGFyX3NpemUnICk7XHJcblx0XHRcdC8vIGpRdWVyeSgnLndwYmNfYWp4X2NzdG1fX3NlY3Rpb25fcmlnaHQgLndwYmNfd2lkZ2V0cycpLmFwcGVuZChcdHRlbXBsYXRlX193aWdldF9jYWxlbmRhcl9zaXplKCBkYXRhX2FyciApICk7XHJcblxyXG5cdFx0XHRicmVhaztcclxuXHJcblx0XHRjYXNlICdjYWxlbmRhcl9zaXplJzpcclxuXHJcblx0XHRcdC8vIENhbGVuZGFyICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdFx0XHR0ZW1wbGF0ZV9faW5saW5lX2NhbGVuZGFyID0gd3AudGVtcGxhdGUoICd3cGJjX2FqeF9jdXN0b21pemVfcGx1Z2luX19pbmxpbmVfY2FsZW5kYXInICk7XHJcblx0XHRcdGpRdWVyeSgnLndwYmNfYWp4X2NzdG1fX3NlY3Rpb25fbGVmdCcpLmh0bWwoXHR0ZW1wbGF0ZV9faW5saW5lX2NhbGVuZGFyKCBkYXRhX2FyciApICk7XHJcblxyXG5cdFx0XHQvLyBDYWxlbmRhciBTa2luXHJcblx0XHRcdHZhciB0ZW1wbGF0ZV9fd2lnZXRfY2FsZW5kYXJfc2l6ZSA9IHdwLnRlbXBsYXRlKCAnd3BiY19hanhfd2lkZ2V0X2NhbGVuZGFyX3NpemUnICk7XHJcblx0XHRcdGpRdWVyeSgnLndwYmNfYWp4X2NzdG1fX3NlY3Rpb25fcmlnaHQgLndwYmNfd2lkZ2V0cycpLmFwcGVuZChcdHRlbXBsYXRlX193aWdldF9jYWxlbmRhcl9zaXplKCBkYXRhX2FyciApICk7XHJcblxyXG5cdFx0XHQvLyBTaG9ydGNvZGVcclxuXHRcdFx0Ly8gdmFyIHRlbXBsYXRlX193aWRnZXRfcGx1Z2luX3Nob3J0Y29kZSA9IHdwLnRlbXBsYXRlKCAnd3BiY19hanhfd2lkZ2V0X3BsdWdpbl9zaG9ydGNvZGUnICk7XHJcblx0XHRcdC8vIGpRdWVyeSgnLndwYmNfYWp4X2NzdG1fX3NlY3Rpb25fcmlnaHQgLndwYmNfd2lkZ2V0cycpLmFwcGVuZChcdHRlbXBsYXRlX193aWRnZXRfcGx1Z2luX3Nob3J0Y29kZSggZGF0YV9hcnIgKSApO1xyXG5cclxuXHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0Y2FzZSAnY2FsZW5kYXJfZGF0ZXNfc2VsZWN0aW9uJzpcclxuXHJcblx0XHRcdC8vIENhbGVuZGFyICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdFx0XHR0ZW1wbGF0ZV9faW5saW5lX2NhbGVuZGFyID0gd3AudGVtcGxhdGUoICd3cGJjX2FqeF9jdXN0b21pemVfcGx1Z2luX19pbmxpbmVfY2FsZW5kYXInICk7XHJcblx0XHRcdGpRdWVyeSgnLndwYmNfYWp4X2NzdG1fX3NlY3Rpb25fbGVmdCcpLmh0bWwoXHR0ZW1wbGF0ZV9faW5saW5lX2NhbGVuZGFyKCBkYXRhX2FyciApICk7XHJcblxyXG5cdFx0XHRqUXVlcnkoJy53cGJjX2FqeF9jc3RtX19zZWN0aW9uX2xlZnQnKS5hcHBlbmQoJzxkaXYgY2xhc3M9XCJjbGVhclwiIHN0eWxlPVwid2lkdGg6MTAwJTttYXJnaW46NTBweCAwIDA7XCI+PC9kaXY+Jyk7XHJcblxyXG5cdFx0XHR2YXIgbWVzc2FnZV9odG1sX2lkID0gd3BiY19hanhfY3VzdG9taXplX3BsdWdpbl9fc2hvd19tZXNzYWdlKFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCc8c3Ryb25nPicgK1x0J1lvdSBjYW4gdGVzdCBkYXlzIHNlbGVjdGlvbiBpbiBjYWxlbmRhcicgKyAnPC9zdHJvbmc+J1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCwge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQnY29udGFpbmVyJzogJy53cGJjX2FqeF9jc3RtX19zZWN0aW9uX2xlZnQnLFx0XHQvLyAnI2FqYXhfd29ya2luZycsXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCdzdHlsZScgICAgOiAnbWFyZ2luOiA2cHggYXV0bzsgIHBhZGRpbmc6IDZweCAyMHB4O3otaW5kZXg6IDk5OTk5OTsnLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQndHlwZScgICAgIDogJ2luZm8nLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQnZGVsYXknICAgIDogNTAwMFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCk7XHJcblx0XHRcdHdwYmNfYmxpbmtfZWxlbWVudCggJyMnICsgbWVzc2FnZV9odG1sX2lkLCAzLCAzMjAgKTtcclxuXHJcblx0XHRcdC8vIFdpZGdldCAtIERhdGVzIHNlbGVjdGlvblxyXG5cdFx0XHQgdmFyIHRlbXBsYXRlX193aWRnZXRfcGx1Z2luX2NhbGVuZGFyX2RhdGVzX3NlbGVjdGlvbiA9IHdwLnRlbXBsYXRlKCAnd3BiY19hanhfd2lkZ2V0X2NhbGVuZGFyX2RhdGVzX3NlbGVjdGlvbicgKTtcclxuXHRcdFx0IGpRdWVyeSgnLndwYmNfYWp4X2NzdG1fX3NlY3Rpb25fcmlnaHQgLndwYmNfd2lkZ2V0cycpLmFwcGVuZChcdHRlbXBsYXRlX193aWRnZXRfcGx1Z2luX2NhbGVuZGFyX2RhdGVzX3NlbGVjdGlvbiggZGF0YV9hcnIgKSApO1xyXG5cclxuXHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0Y2FzZSAnY2FsZW5kYXJfd2Vla2RheXNfYXZhaWxhYmlsaXR5JzpcclxuXHJcblx0XHRcdC8vIFNjcm9sbCAgdG8gIGN1cnJlbnQgbW9udGhcclxuXHRcdFx0dmFyIHNfeWVhciA9IHdwYmNfYWp4X2N1c3RvbWl6ZV9wbHVnaW4uc2VhcmNoX3NldF9wYXJhbSggJ2NhbGVuZGFyX19zdGFydF95ZWFyJywgMCApO1xyXG5cdFx0XHR2YXIgc19tb250aCA9IHdwYmNfYWp4X2N1c3RvbWl6ZV9wbHVnaW4uc2VhcmNoX3NldF9wYXJhbSggJ2NhbGVuZGFyX19zdGFydF9tb250aCcsIDAgKTtcclxuXHJcblx0XHRcdC8vIENhbGVuZGFyICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdFx0XHR0ZW1wbGF0ZV9faW5saW5lX2NhbGVuZGFyID0gd3AudGVtcGxhdGUoICd3cGJjX2FqeF9jdXN0b21pemVfcGx1Z2luX19pbmxpbmVfY2FsZW5kYXInICk7XHJcblx0XHRcdGpRdWVyeSgnLndwYmNfYWp4X2NzdG1fX3NlY3Rpb25fbGVmdCcpLmh0bWwoXHR0ZW1wbGF0ZV9faW5saW5lX2NhbGVuZGFyKCBkYXRhX2FyciApICk7XHJcblxyXG5cdFx0XHQvLyBXaWRnZXQgLSBXZWVrZGF5cyBBdmFpbGFiaWxpdHlcclxuXHRcdFx0IHZhciB0ZW1wbGF0ZV9fd2lkZ2V0X3BsdWdpbl9jYWxlbmRhcl93ZWVrZGF5c19hdmFpbGFiaWxpdHkgPSB3cC50ZW1wbGF0ZSggJ3dwYmNfYWp4X3dpZGdldF9jYWxlbmRhcl93ZWVrZGF5c19hdmFpbGFiaWxpdHknICk7XHJcblx0XHRcdCBqUXVlcnkoJy53cGJjX2FqeF9jc3RtX19zZWN0aW9uX3JpZ2h0IC53cGJjX3dpZGdldHMnKS5hcHBlbmQoXHR0ZW1wbGF0ZV9fd2lkZ2V0X3BsdWdpbl9jYWxlbmRhcl93ZWVrZGF5c19hdmFpbGFiaWxpdHkoIGRhdGFfYXJyICkgKTtcclxuXHJcblx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdGNhc2UgJ2NhbGVuZGFyX2FkZGl0aW9uYWwnOlxyXG5cclxuXHRcdFx0Ly8gQ2FsZW5kYXIgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblx0XHRcdHRlbXBsYXRlX19pbmxpbmVfY2FsZW5kYXIgPSB3cC50ZW1wbGF0ZSggJ3dwYmNfYWp4X2N1c3RvbWl6ZV9wbHVnaW5fX2lubGluZV9jYWxlbmRhcicgKTtcclxuXHRcdFx0alF1ZXJ5KCcud3BiY19hanhfY3N0bV9fc2VjdGlvbl9sZWZ0JykuaHRtbChcdHRlbXBsYXRlX19pbmxpbmVfY2FsZW5kYXIoIGRhdGFfYXJyICkgKTtcclxuXHJcblx0XHRcdC8vIENhbGVuZGFyIFNraW5cclxuXHRcdFx0dmFyIHRlbXBsYXRlX193aWdldF9jYWxlbmRhcl9hZGRpdGlvbmFsID0gd3AudGVtcGxhdGUoICd3cGJjX2FqeF93aWRnZXRfY2FsZW5kYXJfYWRkaXRpb25hbCcgKTtcclxuXHRcdFx0alF1ZXJ5KCcud3BiY19hanhfY3N0bV9fc2VjdGlvbl9yaWdodCAud3BiY193aWRnZXRzJykuYXBwZW5kKFx0dGVtcGxhdGVfX3dpZ2V0X2NhbGVuZGFyX2FkZGl0aW9uYWwoIGRhdGFfYXJyICkgKTtcclxuXHJcblx0XHRcdC8vIFNob3J0Y29kZVxyXG5cdFx0XHQvLyB2YXIgdGVtcGxhdGVfX3dpZGdldF9wbHVnaW5fc2hvcnRjb2RlID0gd3AudGVtcGxhdGUoICd3cGJjX2FqeF93aWRnZXRfcGx1Z2luX3Nob3J0Y29kZScgKTtcclxuXHRcdFx0Ly8galF1ZXJ5KCcud3BiY19hanhfY3N0bV9fc2VjdGlvbl9yaWdodCAud3BiY193aWRnZXRzJykuYXBwZW5kKFx0dGVtcGxhdGVfX3dpZGdldF9wbHVnaW5fc2hvcnRjb2RlKCBkYXRhX2FyciApICk7XHJcblxyXG5cdFx0XHRicmVhaztcclxuXHJcblx0XHRkZWZhdWx0OlxyXG5cdFx0XHQvL2NvbnNvbGUubG9nKCBgU29ycnksIHdlIGFyZSBvdXQgb2YgJHtleHByfS5gICk7XHJcblx0fVxyXG5cclxuXHQvLyBUb29sYmFyIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdHZhciB0ZW1wbGF0ZV9fY3VzdG9taXplX3BsdWdpbl90b29sYmFyX3BhZ2VfY29udGVudCA9IHdwLnRlbXBsYXRlKCAnd3BiY19hanhfY3VzdG9taXplX3BsdWdpbl90b29sYmFyX3BhZ2VfY29udGVudCcgKTtcclxuXHRqUXVlcnkoIHdwYmNfYWp4X2N1c3RvbWl6ZV9wbHVnaW4uZ2V0X290aGVyX3BhcmFtKCAndG9vbGJhcl9jb250YWluZXInICkgKS5odG1sKCB0ZW1wbGF0ZV9fY3VzdG9taXplX3BsdWdpbl90b29sYmFyX3BhZ2VfY29udGVudCgge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCdhanhfZGF0YScgICAgICAgICAgICAgIDogYWp4X2RhdGEsXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0J2FqeF9zZWFyY2hfcGFyYW1zJyAgICAgOiBhanhfc2VhcmNoX3BhcmFtcyxcdFx0XHRcdFx0XHRcdFx0Ly8gJF9SRVFVRVNUWyAnc2VhcmNoX3BhcmFtcycgXVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCdhanhfY2xlYW5lZF9wYXJhbXMnICAgIDogYWp4X2NsZWFuZWRfcGFyYW1zXHJcblx0XHRcdFx0XHRcdFx0XHRcdH0gKSApO1xyXG5cclxuXHJcblx0XHQvLyBCb29raW5nIHJlc291cmNlcyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblx0XHR2YXIgd3BiY19hanhfc2VsZWN0X2Jvb2tpbmdfcmVzb3VyY2UgPSB3cC50ZW1wbGF0ZSggJ3dwYmNfYWp4X3NlbGVjdF9ib29raW5nX3Jlc291cmNlJyApO1xyXG5cdFx0alF1ZXJ5KCAnI3dwYmNfaGlkZGVuX3RlbXBsYXRlX19zZWxlY3RfYm9va2luZ19yZXNvdXJjZScpLmh0bWwoIHdwYmNfYWp4X3NlbGVjdF9ib29raW5nX3Jlc291cmNlKCB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQnYWp4X2RhdGEnICAgICAgICAgICAgICA6IGFqeF9kYXRhLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0J2FqeF9zZWFyY2hfcGFyYW1zJyAgICAgOiBhanhfc2VhcmNoX3BhcmFtcyxcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCdhanhfY2xlYW5lZF9wYXJhbXMnICAgIDogYWp4X2NsZWFuZWRfcGFyYW1zXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0fSBcdCkgKTtcclxuXHRcdC8qXHJcblx0XHQgKiBCeSAgZGVmYXVsdCBoaWRlZCBhdCAuLi93cC1jb250ZW50L3BsdWdpbnMvYm9va2luZy9pbmNsdWRlcy9wYWdlLWN1c3RvbWl6ZS9fc3JjL2N1c3RvbWl6ZV9wbHVnaW5fcGFnZS5jc3MgICN3cGJjX2hpZGRlbl90ZW1wbGF0ZV9fc2VsZWN0X2Jvb2tpbmdfcmVzb3VyY2UgeyBkaXNwbGF5OiBub25lOyB9XHJcblx0XHQgKlxyXG5cdFx0ICogXHRXZSBjYW4gaGlkZSAgLy8vLVx0SGlkZSByZXNvdXJjZXMhXHJcblx0XHQgKiBcdFx0XHRcdCAvL3NldFRpbWVvdXQoIGZ1bmN0aW9uICgpeyBqUXVlcnkoICcjd3BiY19oaWRkZW5fdGVtcGxhdGVfX3NlbGVjdF9ib29raW5nX3Jlc291cmNlJyApLmh0bWwoICcnICk7IH0sIDEwMDAgKTtcclxuXHRcdCAqL1xyXG5cclxuXHJcblxyXG5cclxuXHQvLyBPdGhlciAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblx0alF1ZXJ5KCAnLndwYmNfcHJvY2Vzc2luZy53cGJjX3NwaW4nKS5wYXJlbnQoKS5wYXJlbnQoKS5wYXJlbnQoKS5wYXJlbnQoICdbaWRePVwid3BiY19ub3RpY2VfXCJdJyApLmhpZGUoKTtcclxuXHJcblxyXG5cdC8vIExvYWQgY2FsZW5kYXIgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblx0d3BiY19hanhfY3VzdG9taXplX3BsdWdpbl9fY2FsZW5kYXJfX3Nob3coIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdCdyZXNvdXJjZV9pZCcgICAgICAgOiBhanhfY2xlYW5lZF9wYXJhbXMucmVzb3VyY2VfaWQsXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQnYWp4X25vbmNlX2NhbGVuZGFyJzogYWp4X2RhdGEuYWp4X25vbmNlX2NhbGVuZGFyLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0J2FqeF9kYXRhX2FycicgICAgICAgICAgOiBhanhfZGF0YSxcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdCdhanhfY2xlYW5lZF9wYXJhbXMnICAgIDogYWp4X2NsZWFuZWRfcGFyYW1zXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0fSApO1xyXG5cclxuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdC8qKlxyXG5cdCAqIENoYW5nZSBjYWxlbmRhciBza2luIHZpZXdcclxuXHQgKi9cclxuXHRqUXVlcnkoICcud3BiY19yYWRpb19fc2V0X2RheXNfY3VzdG9taXplX3BsdWdpbicgKS5vbignY2hhbmdlJywgZnVuY3Rpb24gKCBldmVudCwgcmVzb3VyY2VfaWQsIGluc3QgKXtcclxuXHRcdHdwYmNfX2NhbGVuZGFyX19jaGFuZ2Vfc2tpbiggalF1ZXJ5KCB0aGlzICkudmFsKCkgKTtcclxuXHR9KTtcclxuXHJcblxyXG5cdC8vIFJlLWxvYWQgVG9vbHRpcHNcclxuXHRqUXVlcnkoIGRvY3VtZW50ICkucmVhZHkoIGZ1bmN0aW9uICgpe1xyXG5cdFx0d3BiY19kZWZpbmVfdGlwcHlfdG9vbHRpcHMoIHdwYmNfYWp4X2N1c3RvbWl6ZV9wbHVnaW4uZ2V0X290aGVyX3BhcmFtKCAnbGlzdGluZ19jb250YWluZXInICkgKyAnICcgKTtcclxuXHRcdHdwYmNfZGVmaW5lX3RpcHB5X3Rvb2x0aXBzKCB3cGJjX2FqeF9jdXN0b21pemVfcGx1Z2luLmdldF9vdGhlcl9wYXJhbSggJ3Rvb2xiYXJfY29udGFpbmVyJyApICsgJyAnICk7XHJcblx0fSk7XHJcbn1cclxuXHJcblxyXG4vKipcclxuICogU2hvdyBpbmxpbmUgbW9udGggdmlldyBjYWxlbmRhciAgICAgICAgICAgICAgd2l0aCBhbGwgcHJlZGVmaW5lZCBDU1MgKHNpemVzIGFuZCBjaGVjayBpbi9vdXQsICB0aW1lcyBjb250YWluZXJzKVxyXG4gKiBAcGFyYW0ge29ian0gY2FsZW5kYXJfcGFyYW1zX2FyclxyXG5cdFx0XHR7XHJcblx0XHRcdFx0J3Jlc291cmNlX2lkJyAgICAgICBcdDogYWp4X2NsZWFuZWRfcGFyYW1zLnJlc291cmNlX2lkLFxyXG5cdFx0XHRcdCdhanhfbm9uY2VfY2FsZW5kYXInXHQ6IGFqeF9kYXRhX2Fyci5hanhfbm9uY2VfY2FsZW5kYXIsXHJcblx0XHRcdFx0J2FqeF9kYXRhX2FycicgICAgICAgICAgOiBhanhfZGF0YV9hcnIgPSB7IGFqeF9ib29raW5nX3Jlc291cmNlczpbXSwgIHJlc291cmNlX3VuYXZhaWxhYmxlX2RhdGVzOltdLCBzZWFzb25fY3VzdG9taXplX3BsdWdpbjp7fSwuLi4uIH1cclxuXHRcdFx0XHQnYWp4X2NsZWFuZWRfcGFyYW1zJyAgICA6IHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNhbGVuZGFyX19kYXlzX3NlbGVjdGlvbl9tb2RlOiBcImR5bmFtaWNcIlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y2FsZW5kYXJfX3RpbWVzbG90X2RheV9iZ19hc19hdmFpbGFibGU6IFwiXCJcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNhbGVuZGFyX192aWV3X19jZWxsX2hlaWdodDogXCJcIlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y2FsZW5kYXJfX3ZpZXdfX21vbnRoc19pbl9yb3c6IDRcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNhbGVuZGFyX192aWV3X192aXNpYmxlX21vbnRoczogMTJcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNhbGVuZGFyX192aWV3X193aWR0aDogXCIxMDAlXCJcclxuXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRkYXRlc19jdXN0b21pemVfcGx1Z2luOiBcInVuYXZhaWxhYmxlXCJcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGRhdGVzX3NlbGVjdGlvbjogXCIyMDIzLTAzLTE0IH4gMjAyMy0wMy0xNlwiXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRkb19hY3Rpb246IFwic2V0X2N1c3RvbWl6ZV9wbHVnaW5cIlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmVzb3VyY2VfaWQ6IDFcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHVpX2NsaWNrZWRfZWxlbWVudF9pZDogXCJ3cGJjX2N1c3RvbWl6ZV9wbHVnaW5fYXBwbHlfYnRuXCJcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHVpX3Vzcl9fY3VzdG9taXplX3BsdWdpbl9zZWxlY3RlZF90b29sYmFyOiBcImluZm9cIlxyXG5cdFx0XHRcdFx0XHRcdFx0ICBcdFx0IH1cclxuXHRcdFx0fVxyXG4qL1xyXG5mdW5jdGlvbiB3cGJjX2FqeF9jdXN0b21pemVfcGx1Z2luX19jYWxlbmRhcl9fc2hvdyggY2FsZW5kYXJfcGFyYW1zX2FyciApe1xyXG5cclxuXHQvLyBVcGRhdGUgbm9uY2VcclxuXHRqUXVlcnkoICcjYWp4X25vbmNlX2NhbGVuZGFyX3NlY3Rpb24nICkuaHRtbCggY2FsZW5kYXJfcGFyYW1zX2Fyci5hanhfbm9uY2VfY2FsZW5kYXIgKTtcclxuXHJcblxyXG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblx0Ly8gVXBkYXRlIGJvb2tpbmdzXHJcblx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHRpZiAoICd1bmRlZmluZWQnID09IHR5cGVvZiAod3BiY19hanhfYm9va2luZ3NbIGNhbGVuZGFyX3BhcmFtc19hcnIucmVzb3VyY2VfaWQgXSkgKXsgd3BiY19hanhfYm9va2luZ3NbIGNhbGVuZGFyX3BhcmFtc19hcnIucmVzb3VyY2VfaWQgXSA9IFtdOyB9XHJcblx0d3BiY19hanhfYm9va2luZ3NbIGNhbGVuZGFyX3BhcmFtc19hcnIucmVzb3VyY2VfaWQgXSA9IGNhbGVuZGFyX3BhcmFtc19hcnJbICdhanhfZGF0YV9hcnInIF1bICdjYWxlbmRhcl9zZXR0aW5ncycgXVsgJ2Jvb2tlZF9kYXRlcycgXTtcclxuXHJcblxyXG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiBcdC8vIEdldCBzY3JvbGxpbmcgbW9udGggIG9yIHllYXIgIGluIGNhbGVuZGFyICBhbmQgc2F2ZSBpdCB0byAgdGhlIGluaXQgcGFyYW1ldGVyc1xyXG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblx0alF1ZXJ5KCAnYm9keScgKS5vZmYoICd3cGJjX19pbmxpbmVfYm9va2luZ19jYWxlbmRhcl9fY2hhbmdlZF95ZWFyX21vbnRoJyApO1xyXG5cdGpRdWVyeSggJ2JvZHknICkub24oICd3cGJjX19pbmxpbmVfYm9va2luZ19jYWxlbmRhcl9fY2hhbmdlZF95ZWFyX21vbnRoJywgZnVuY3Rpb24gKCBldmVudCwgeWVhciwgbW9udGgsIGNhbGVuZGFyX3BhcmFtc19hcnIsIGRhdGVwaWNrX3RoaXMgKXtcclxuXHJcblx0XHR3cGJjX2FqeF9jdXN0b21pemVfcGx1Z2luLnNlYXJjaF9zZXRfcGFyYW0oICdjYWxlbmRhcl9fc3RhcnRfeWVhcicsIHllYXIgKTtcclxuXHRcdHdwYmNfYWp4X2N1c3RvbWl6ZV9wbHVnaW4uc2VhcmNoX3NldF9wYXJhbSggJ2NhbGVuZGFyX19zdGFydF9tb250aCcsIG1vbnRoICk7XHJcblx0fSApO1xyXG5cclxuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdC8vIERlZmluZSBzaG93aW5nIG1vdXNlIG92ZXIgdG9vbHRpcCBvbiB1bmF2YWlsYWJsZSBkYXRlc1xyXG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblx0alF1ZXJ5KCAnYm9keScgKS5vbiggJ3dwYmNfZGF0ZXBpY2tfaW5saW5lX2NhbGVuZGFyX3JlZnJlc2gnLCBmdW5jdGlvbiAoIGV2ZW50LCByZXNvdXJjZV9pZCwgaW5zdCApe1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogSXQncyBkZWZpbmVkLCB3aGVuIGNhbGVuZGFyIFJFRlJFU0hFRCAoY2hhbmdlIG1vbnRocyBvciBkYXlzIHNlbGVjdGlvbikgbG9hZGVkIGluIGpxdWVyeS5kYXRlcGljay53cGJjLjkuMC5qcyA6XHJcblx0XHQgKiBcdFx0JCggJ2JvZHknICkudHJpZ2dlciggJ3dwYmNfZGF0ZXBpY2tfaW5saW5lX2NhbGVuZGFyX3JlZnJlc2gnLCAuLi5cdFx0Ly9GaXhJbjogOS40LjQuMTNcclxuXHRcdCAqL1xyXG5cclxuXHRcdC8vIGluc3QuZHBEaXYgIGl0J3M6ICA8ZGl2IGNsYXNzPVwiZGF0ZXBpY2staW5saW5lIGRhdGVwaWNrLW11bHRpXCIgc3R5bGU9XCJ3aWR0aDogMTc3MTJweDtcIj4uLi4uPC9kaXY+XHJcblxyXG5cdFx0aW5zdC5kcERpdi5maW5kKCAnLnNlYXNvbl91bmF2YWlsYWJsZSwuYmVmb3JlX2FmdGVyX3VuYXZhaWxhYmxlLC53ZWVrZGF5c191bmF2YWlsYWJsZScgKS5vbiggJ21vdXNlb3ZlcicsIGZ1bmN0aW9uICggdGhpc19ldmVudCApe1xyXG5cdFx0XHQvLyBhbHNvIGF2YWlsYWJsZSB0aGVzZSB2YXJzOiBcdHJlc291cmNlX2lkLCBqQ2FsQ29udGFpbmVyLCBpbnN0XHJcblx0XHRcdHZhciBqQ2VsbCA9IGpRdWVyeSggdGhpc19ldmVudC5jdXJyZW50VGFyZ2V0ICk7XHJcblx0XHRcdHdwYmNfY3N0bV9fc2hvd190b29sdGlwX19mb3JfZWxlbWVudCggakNlbGwsIGNhbGVuZGFyX3BhcmFtc19hcnJbICdhanhfZGF0YV9hcnInIF1bJ3BvcG92ZXJfaGludHMnXSApO1xyXG5cdFx0fSk7XHJcblxyXG5cdH0pO1xyXG5cclxuXHJcblx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHQvLyAgRGVmaW5lIGhlaWdodCBvZiB0aGUgY2FsZW5kYXIgIGNlbGxzLCBcdGFuZCAgbW91c2Ugb3ZlciB0b29sdGlwcyBhdCAgc29tZSB1bmF2YWlsYWJsZSBkYXRlc1xyXG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblx0alF1ZXJ5KCAnYm9keScgKS5vbiggJ3dwYmNfZGF0ZXBpY2tfaW5saW5lX2NhbGVuZGFyX2xvYWRlZCcsIGZ1bmN0aW9uICggZXZlbnQsIHJlc291cmNlX2lkLCBqQ2FsQ29udGFpbmVyLCBpbnN0ICl7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBJdCdzIGRlZmluZWQsIHdoZW4gY2FsZW5kYXIgbG9hZGVkIGluIGpxdWVyeS5kYXRlcGljay53cGJjLjkuMC5qcyA6XHJcblx0XHQgKiBcdFx0JCggJ2JvZHknICkudHJpZ2dlciggJ3dwYmNfZGF0ZXBpY2tfaW5saW5lX2NhbGVuZGFyX2xvYWRlZCcsIC4uLlx0XHQvL0ZpeEluOiA5LjQuNC4xMlxyXG5cdFx0ICovXHJcblxyXG5cdFx0Ly8gUmVtb3ZlIGhpZ2hsaWdodCBkYXkgZm9yIHRvZGF5ICBkYXRlXHJcblx0XHRqUXVlcnkoICcuZGF0ZXBpY2stZGF5cy1jZWxsLmRhdGVwaWNrLXRvZGF5LmRhdGVwaWNrLWRheXMtY2VsbC1vdmVyJyApLnJlbW92ZUNsYXNzKCAnZGF0ZXBpY2stZGF5cy1jZWxsLW92ZXInICk7XHJcblxyXG5cdFx0Ly8gU2V0IGhlaWdodCBvZiBjYWxlbmRhciAgY2VsbHMgaWYgZGVmaW5lZCB0aGlzIG9wdGlvblxyXG5cdFx0dmFyIHN0eWxlc2hlZXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCggJ3dwYmMtY2FsZW5kYXItY2VsbC1oZWlnaHQnICk7XHJcblx0XHRpZiAoIG51bGwgIT09IHN0eWxlc2hlZXQgKXtcclxuXHRcdFx0c3R5bGVzaGVldC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKCBzdHlsZXNoZWV0ICk7XHJcblx0XHR9XHJcblx0XHRpZiAoICcnICE9PSBjYWxlbmRhcl9wYXJhbXNfYXJyLmFqeF9jbGVhbmVkX3BhcmFtcy5jYWxlbmRhcl9fdmlld19fY2VsbF9oZWlnaHQgKXtcclxuXHRcdFx0alF1ZXJ5KCAnaGVhZCcgKS5hcHBlbmQoICc8c3R5bGUgdHlwZT1cInRleHQvY3NzXCIgaWQ9XCJ3cGJjLWNhbGVuZGFyLWNlbGwtaGVpZ2h0XCI+J1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdCsgJy5oYXNEYXRlcGljayAuZGF0ZXBpY2staW5saW5lIC5kYXRlcGljay10aXRsZS1yb3cgdGgsICdcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHQrICcuaGFzRGF0ZXBpY2sgLmRhdGVwaWNrLWlubGluZSAuZGF0ZXBpY2stZGF5cy1jZWxsIHsnXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQrICdoZWlnaHQ6ICcgKyBjYWxlbmRhcl9wYXJhbXNfYXJyLmFqeF9jbGVhbmVkX3BhcmFtcy5jYWxlbmRhcl9fdmlld19fY2VsbF9oZWlnaHQgKyAnICFpbXBvcnRhbnQ7J1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdCsgJ30nXHJcblx0XHRcdFx0XHRcdFx0XHRcdCsnPC9zdHlsZT4nICk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gRGVmaW5lIHNob3dpbmcgbW91c2Ugb3ZlciB0b29sdGlwIG9uIHVuYXZhaWxhYmxlIGRhdGVzXHJcblx0XHRqQ2FsQ29udGFpbmVyLmZpbmQoICcuc2Vhc29uX3VuYXZhaWxhYmxlLC5iZWZvcmVfYWZ0ZXJfdW5hdmFpbGFibGUsLndlZWtkYXlzX3VuYXZhaWxhYmxlJyApLm9uKCAnbW91c2VvdmVyJywgZnVuY3Rpb24gKCB0aGlzX2V2ZW50ICl7XHJcblx0XHRcdC8vIGFsc28gYXZhaWxhYmxlIHRoZXNlIHZhcnM6IFx0cmVzb3VyY2VfaWQsIGpDYWxDb250YWluZXIsIGluc3RcclxuXHRcdFx0dmFyIGpDZWxsID0galF1ZXJ5KCB0aGlzX2V2ZW50LmN1cnJlbnRUYXJnZXQgKTtcclxuXHRcdFx0d3BiY19jc3RtX19zaG93X3Rvb2x0aXBfX2Zvcl9lbGVtZW50KCBqQ2VsbCwgY2FsZW5kYXJfcGFyYW1zX2FyclsgJ2FqeF9kYXRhX2FycicgXVsncG9wb3Zlcl9oaW50cyddICk7XHJcblx0XHR9KTtcclxuXHR9ICk7XHJcblxyXG5cclxuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdC8vIERlZmluZSBtb250aHNfaW5fcm93XHJcblx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHRpZiAoICAgKCB1bmRlZmluZWQgPT0gY2FsZW5kYXJfcGFyYW1zX2Fyci5hanhfY2xlYW5lZF9wYXJhbXMuY2FsZW5kYXJfX3ZpZXdfX21vbnRoc19pbl9yb3cgKVxyXG5cdFx0ICAgICAgfHwgKCAnJyA9PSBjYWxlbmRhcl9wYXJhbXNfYXJyLmFqeF9jbGVhbmVkX3BhcmFtcy5jYWxlbmRhcl9fdmlld19fbW9udGhzX2luX3JvdyApXHJcblx0KXtcclxuXHRcdGNhbGVuZGFyX3BhcmFtc19hcnIuYWp4X2NsZWFuZWRfcGFyYW1zLmNhbGVuZGFyX192aWV3X19tb250aHNfaW5fcm93ID0gY2FsZW5kYXJfcGFyYW1zX2Fyci5hanhfY2xlYW5lZF9wYXJhbXMuY2FsZW5kYXJfX3ZpZXdfX3Zpc2libGVfbW9udGhzO1xyXG5cdH1cclxuXHRcclxuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdC8vIERlZmluZSB3aWR0aCBvZiBlbnRpcmUgY2FsZW5kYXJcclxuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdHZhciB3aWR0aCA9ICAgJyc7XHRcdFx0XHRcdC8vIHZhciB3aWR0aCA9ICd3aWR0aDoxMDAlO21heC13aWR0aDoxMDAlOyc7XHJcblx0Ly8gV2lkdGhcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvKiBGaXhJbjogOS43LjMuNCAqL1xyXG5cdGlmICggICAoIHVuZGVmaW5lZCAhPSBjYWxlbmRhcl9wYXJhbXNfYXJyLmFqeF9jbGVhbmVkX3BhcmFtcy5jYWxlbmRhcl9fdmlld19fd2lkdGggKVxyXG5cdFx0ICAgICAgJiYgKCAnJyAhPT0gY2FsZW5kYXJfcGFyYW1zX2Fyci5hanhfY2xlYW5lZF9wYXJhbXMuY2FsZW5kYXJfX3ZpZXdfX3dpZHRoIClcclxuXHQpe1xyXG5cdFx0d2lkdGggKz0gJ21heC13aWR0aDonIFx0KyBjYWxlbmRhcl9wYXJhbXNfYXJyLmFqeF9jbGVhbmVkX3BhcmFtcy5jYWxlbmRhcl9fdmlld19fd2lkdGggKyAnOyc7XHJcblx0XHR3aWR0aCArPSAnd2lkdGg6MTAwJTsnO1xyXG5cdH1cclxuXHJcblxyXG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblx0Ly8gQWRkIGNhbGVuZGFyIGNvbnRhaW5lcjogXCJDYWxlbmRhciBpcyBsb2FkaW5nLi4uXCIgIGFuZCB0ZXh0YXJlYVxyXG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblx0alF1ZXJ5KCAnLndwYmNfYWp4X2NzdG1fX2NhbGVuZGFyJyApLmh0bWwoXHJcblxyXG5cdFx0JzxkaXYgY2xhc3M9XCInXHQrICcgYmtfY2FsZW5kYXJfZnJhbWUnXHJcblx0XHRcdFx0XHRcdCsgJyBtb250aHNfbnVtX2luX3Jvd18nICsgY2FsZW5kYXJfcGFyYW1zX2Fyci5hanhfY2xlYW5lZF9wYXJhbXMuY2FsZW5kYXJfX3ZpZXdfX21vbnRoc19pbl9yb3dcclxuXHRcdFx0XHRcdFx0KyAnIGNhbF9tb250aF9udW1fJyBcdCsgY2FsZW5kYXJfcGFyYW1zX2Fyci5hanhfY2xlYW5lZF9wYXJhbXMuY2FsZW5kYXJfX3ZpZXdfX3Zpc2libGVfbW9udGhzXHJcblx0XHRcdFx0XHRcdCsgJyAnIFx0XHRcdFx0XHQrIGNhbGVuZGFyX3BhcmFtc19hcnIuYWp4X2NsZWFuZWRfcGFyYW1zLmNhbGVuZGFyX190aW1lc2xvdF9kYXlfYmdfYXNfYXZhaWxhYmxlIFx0XHRcdFx0Ly8gJ3dwYmNfdGltZXNsb3RfZGF5X2JnX2FzX2F2YWlsYWJsZScgfHwgJydcclxuXHRcdFx0XHQrICdcIiAnXHJcblx0XHRcdCsgJ3N0eWxlPVwiJyArIHdpZHRoICsgJ1wiPidcclxuXHJcblx0XHRcdFx0KyAnPGRpdiBpZD1cImNhbGVuZGFyX2Jvb2tpbmcnICsgY2FsZW5kYXJfcGFyYW1zX2Fyci5yZXNvdXJjZV9pZCArICdcIj4nICsgJ0NhbGVuZGFyIGlzIGxvYWRpbmcuLi4nICsgJzwvZGl2PidcclxuXHJcblx0XHQrICc8L2Rpdj4nXHJcblxyXG5cdFx0KyAnPHRleHRhcmVhICAgICAgaWQ9XCJkYXRlX2Jvb2tpbmcnICsgY2FsZW5kYXJfcGFyYW1zX2Fyci5yZXNvdXJjZV9pZCArICdcIidcclxuXHRcdFx0XHRcdCsgJyBuYW1lPVwiZGF0ZV9ib29raW5nJyArIGNhbGVuZGFyX3BhcmFtc19hcnIucmVzb3VyY2VfaWQgKyAnXCInXHJcblx0XHRcdFx0XHQrICcgYXV0b2NvbXBsZXRlPVwib2ZmXCInXHJcblx0XHRcdFx0XHQrICcgc3R5bGU9XCJkaXNwbGF5Om5vbmU7d2lkdGg6MTAwJTtoZWlnaHQ6MTBlbTttYXJnaW46MmVtIDAgMDtcIj48L3RleHRhcmVhPidcclxuXHQpO1xyXG5cclxuXHJcblx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHQvLyBEZWZpbmUgdmFyaWFibGVzIGZvciBjYWxlbmRhclxyXG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblx0dmFyIGNhbF9wYXJhbV9hcnIgPSAgY2FsZW5kYXJfcGFyYW1zX2Fyci5hanhfZGF0YV9hcnIuY2FsZW5kYXJfc2V0dGluZ3M7XHJcblx0Y2FsX3BhcmFtX2FyclsgJ2h0bWxfaWQnIF0gXHRcdFx0XHRcdFx0PSAnY2FsZW5kYXJfYm9va2luZycgKyBjYWxlbmRhcl9wYXJhbXNfYXJyLmFqeF9jbGVhbmVkX3BhcmFtcy5yZXNvdXJjZV9pZDtcclxuXHRjYWxfcGFyYW1fYXJyWyAndGV4dF9pZCcgXSBcdFx0XHRcdFx0XHQ9ICdkYXRlX2Jvb2tpbmcnIFx0ICsgY2FsZW5kYXJfcGFyYW1zX2Fyci5hanhfY2xlYW5lZF9wYXJhbXMucmVzb3VyY2VfaWQ7XHJcblx0Y2FsX3BhcmFtX2FyclsgJ3Jlc291cmNlX2lkJyBdIFx0XHRcdFx0XHQ9IGNhbGVuZGFyX3BhcmFtc19hcnIuYWp4X2NsZWFuZWRfcGFyYW1zLnJlc291cmNlX2lkO1xyXG5cdGNhbF9wYXJhbV9hcnJbICdhanhfbm9uY2VfY2FsZW5kYXInIF0gXHRcdFx0PSBjYWxlbmRhcl9wYXJhbXNfYXJyLmFqeF9kYXRhX2Fyci5hanhfbm9uY2VfY2FsZW5kYXI7XHJcblx0Y2FsX3BhcmFtX2FyclsgJ3NlYXNvbl9jdXN0b21pemVfcGx1Z2luJyBdIFx0XHQ9IGNhbGVuZGFyX3BhcmFtc19hcnIuYWp4X2RhdGFfYXJyLnNlYXNvbl9jdXN0b21pemVfcGx1Z2luO1xyXG5cdGNhbF9wYXJhbV9hcnJbICdyZXNvdXJjZV91bmF2YWlsYWJsZV9kYXRlcycgXSBcdD0gY2FsZW5kYXJfcGFyYW1zX2Fyci5hanhfZGF0YV9hcnIucmVzb3VyY2VfdW5hdmFpbGFibGVfZGF0ZXM7XHJcblx0Y2FsX3BhcmFtX2FyclsgJ3BvcG92ZXJfaGludHMnIF0gXHRcdFx0XHQ9IGNhbGVuZGFyX3BhcmFtc19hcnIuYWp4X2RhdGFfYXJyLnBvcG92ZXJfaGludHM7XHRcdFx0XHRcdC8vIHsnc2Vhc29uX3VuYXZhaWxhYmxlJzonLi4uJywnd2Vla2RheXNfdW5hdmFpbGFibGUnOicuLi4nLCdiZWZvcmVfYWZ0ZXJfdW5hdmFpbGFibGUnOicuLi4nLH1cclxuXHJcblxyXG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblx0Ly8gU2hvdyBDYWxlbmRhclxyXG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblx0d3BiY19zaG93X2lubGluZV9ib29raW5nX2NhbGVuZGFyKCBjYWxfcGFyYW1fYXJyICk7XHJcblxyXG5cclxuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdC8vIFNjcm9sbCAgdG8gIHNwZWNpZmljIFllYXIgYW5kIE1vbnRoLCAgaWYgZGVmaW5lZCBpbiBpbml0IHBhcmFtZXRlcnNcclxuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdHZhciBzX3llYXIgID0gd3BiY19hanhfY3VzdG9taXplX3BsdWdpbi5zZWFyY2hfZ2V0X3BhcmFtKCAnY2FsZW5kYXJfX3N0YXJ0X3llYXInICk7XHJcblx0dmFyIHNfbW9udGggPSB3cGJjX2FqeF9jdXN0b21pemVfcGx1Z2luLnNlYXJjaF9nZXRfcGFyYW0oICdjYWxlbmRhcl9fc3RhcnRfbW9udGgnICk7XHJcblx0aWYgKCAoIDAgIT09IHNfeWVhciApICYmICggMCAhPT0gc19tb250aCApICl7XHJcblx0XHQgd3BiY19faW5saW5lX2Jvb2tpbmdfY2FsZW5kYXJfX2NoYW5nZV95ZWFyX21vbnRoKCBjYWxfcGFyYW1fYXJyWyAncmVzb3VyY2VfaWQnIF0sIHNfeWVhciwgc19tb250aCApXHJcblx0fVxyXG59XHJcblxyXG5cclxuXHQvKipcclxuXHQgKiAgIFRvb2x0aXBzICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXHJcblxyXG5cdC8qKlxyXG5cdCAqIERlZmluZSBzaG93aW5nIHRvb2x0aXAsICB3aGVuICBtb3VzZSBvdmVyIG9uICBTRUxFQ1RBQkxFIChhdmFpbGFibGUsIHBlbmRpbmcsIGFwcHJvdmVkLCByZXNvdXJjZSB1bmF2YWlsYWJsZSksICBkYXlzXHJcblx0ICogQ2FuIGJlIGNhbGxlZCBkaXJlY3RseSAgZnJvbSAgZGF0ZXBpY2sgaW5pdCBmdW5jdGlvbi5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB2YWx1ZVxyXG5cdCAqIEBwYXJhbSBkYXRlXHJcblx0ICogQHBhcmFtIGNhbGVuZGFyX3BhcmFtc19hcnJcclxuXHQgKiBAcGFyYW0gZGF0ZXBpY2tfdGhpc1xyXG5cdCAqIEByZXR1cm5zIHtib29sZWFufVxyXG5cdCAqL1xyXG5cdGZ1bmN0aW9uIHdwYmNfY3N0bV9fcHJlcGFyZV90b29sdGlwX19pbl9jYWxlbmRhciggdmFsdWUsIGRhdGUsIGNhbGVuZGFyX3BhcmFtc19hcnIsIGRhdGVwaWNrX3RoaXMgKXtcclxuXHJcblx0XHRpZiAoIG51bGwgPT0gZGF0ZSApeyAgcmV0dXJuIGZhbHNlOyAgfVxyXG5cclxuXHRcdHZhciB0ZF9jbGFzcyA9ICggZGF0ZS5nZXRNb250aCgpICsgMSApICsgJy0nICsgZGF0ZS5nZXREYXRlKCkgKyAnLScgKyBkYXRlLmdldEZ1bGxZZWFyKCk7XHJcblxyXG5cdFx0dmFyIGpDZWxsID0galF1ZXJ5KCAnI2NhbGVuZGFyX2Jvb2tpbmcnICsgY2FsZW5kYXJfcGFyYW1zX2Fyci5yZXNvdXJjZV9pZCArICcgdGQuY2FsNGRhdGUtJyArIHRkX2NsYXNzICk7XHJcblxyXG5cdFx0d3BiY19jc3RtX19zaG93X3Rvb2x0aXBfX2Zvcl9lbGVtZW50KCBqQ2VsbCwgY2FsZW5kYXJfcGFyYW1zX2FyclsgJ3BvcG92ZXJfaGludHMnIF0gKTtcclxuXHRcdHJldHVybiB0cnVlO1xyXG5cdH1cclxuXHJcblxyXG5cdC8qKlxyXG5cdCAqIERlZmluZSB0b29sdGlwICBmb3Igc2hvd2luZyBvbiBVTkFWQUlMQUJMRSBkYXlzIChzZWFzb24sIHdlZWtkYXksIHRvZGF5X2RlcGVuZHMgdW5hdmFpbGFibGUpXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gakNlbGxcdFx0XHRcdFx0alF1ZXJ5IG9mIHNwZWNpZmljIGRheSBjZWxsXHJcblx0ICogQHBhcmFtIHBvcG92ZXJfaGludHNcdFx0ICAgIEFycmF5IHdpdGggdG9vbHRpcCBoaW50IHRleHRzXHQgOiB7J3NlYXNvbl91bmF2YWlsYWJsZSc6Jy4uLicsJ3dlZWtkYXlzX3VuYXZhaWxhYmxlJzonLi4uJywnYmVmb3JlX2FmdGVyX3VuYXZhaWxhYmxlJzonLi4uJyx9XHJcblx0ICovXHJcblx0ZnVuY3Rpb24gd3BiY19jc3RtX19zaG93X3Rvb2x0aXBfX2Zvcl9lbGVtZW50KCBqQ2VsbCwgcG9wb3Zlcl9oaW50cyApe1xyXG5cclxuXHRcdHZhciB0b29sdGlwX3RpbWUgPSAnJztcclxuXHJcblx0XHRpZiAoIGpDZWxsLmhhc0NsYXNzKCAnc2Vhc29uX3VuYXZhaWxhYmxlJyApICl7XHJcblx0XHRcdHRvb2x0aXBfdGltZSA9IHBvcG92ZXJfaGludHNbICdzZWFzb25fdW5hdmFpbGFibGUnIF07XHJcblx0XHR9IGVsc2UgaWYgKCBqQ2VsbC5oYXNDbGFzcyggJ3dlZWtkYXlzX3VuYXZhaWxhYmxlJyApICl7XHJcblx0XHRcdHRvb2x0aXBfdGltZSA9IHBvcG92ZXJfaGludHNbICd3ZWVrZGF5c191bmF2YWlsYWJsZScgXTtcclxuXHRcdH0gZWxzZSBpZiAoIGpDZWxsLmhhc0NsYXNzKCAnYmVmb3JlX2FmdGVyX3VuYXZhaWxhYmxlJyApICl7XHJcblx0XHRcdHRvb2x0aXBfdGltZSA9IHBvcG92ZXJfaGludHNbICdiZWZvcmVfYWZ0ZXJfdW5hdmFpbGFibGUnIF07XHJcblx0XHR9IGVsc2UgaWYgKCBqQ2VsbC5oYXNDbGFzcyggJ2RhdGUyYXBwcm92ZScgKSApe1xyXG5cclxuXHRcdH0gZWxzZSBpZiAoIGpDZWxsLmhhc0NsYXNzKCAnZGF0ZV9hcHByb3ZlZCcgKSApe1xyXG5cclxuXHRcdH0gZWxzZSB7XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdGpDZWxsLmF0dHIoICdkYXRhLWNvbnRlbnQnLCB0b29sdGlwX3RpbWUgKTtcclxuXHJcblx0XHR2YXIgdGRfZWwgPSBqQ2VsbC5nZXQoMCk7XHQvL2pRdWVyeSggJyNjYWxlbmRhcl9ib29raW5nJyArIGNhbGVuZGFyX3BhcmFtc19hcnIucmVzb3VyY2VfaWQgKyAnIHRkLmNhbDRkYXRlLScgKyB0ZF9jbGFzcyApLmdldCgwKTtcclxuXHJcblx0XHRpZiAoICggdW5kZWZpbmVkID09IHRkX2VsLl90aXBweSApICYmICggJycgIT0gdG9vbHRpcF90aW1lICkgKXtcclxuXHJcblx0XHRcdFx0d3BiY190aXBweSggdGRfZWwgLCB7XHJcblx0XHRcdFx0XHRjb250ZW50KCByZWZlcmVuY2UgKXtcclxuXHJcblx0XHRcdFx0XHRcdHZhciBwb3BvdmVyX2NvbnRlbnQgPSByZWZlcmVuY2UuZ2V0QXR0cmlidXRlKCAnZGF0YS1jb250ZW50JyApO1xyXG5cclxuXHRcdFx0XHRcdFx0cmV0dXJuICc8ZGl2IGNsYXNzPVwicG9wb3ZlciBwb3BvdmVyX3RpcHB5XCI+J1xyXG5cdFx0XHRcdFx0XHRcdFx0XHQrICc8ZGl2IGNsYXNzPVwicG9wb3Zlci1jb250ZW50XCI+J1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdCsgcG9wb3Zlcl9jb250ZW50XHJcblx0XHRcdFx0XHRcdFx0XHRcdCsgJzwvZGl2PidcclxuXHRcdFx0XHRcdFx0XHQgKyAnPC9kaXY+JztcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRhbGxvd0hUTUwgICAgICAgIDogdHJ1ZSxcclxuXHRcdFx0XHRcdHRyaWdnZXJcdFx0XHQgOiAnbW91c2VlbnRlciBmb2N1cycsXHJcblx0XHRcdFx0XHRpbnRlcmFjdGl2ZSAgICAgIDogISB0cnVlLFxyXG5cdFx0XHRcdFx0aGlkZU9uQ2xpY2sgICAgICA6IHRydWUsXHJcblx0XHRcdFx0XHRpbnRlcmFjdGl2ZUJvcmRlcjogMTAsXHJcblx0XHRcdFx0XHRtYXhXaWR0aCAgICAgICAgIDogNTUwLFxyXG5cdFx0XHRcdFx0dGhlbWUgICAgICAgICAgICA6ICd3cGJjLXRpcHB5LXRpbWVzJyxcclxuXHRcdFx0XHRcdHBsYWNlbWVudCAgICAgICAgOiAndG9wJyxcclxuXHRcdFx0XHRcdGRlbGF5XHRcdFx0IDogWzQwMCwgMF0sXHRcdFx0Ly9GaXhJbjogOS40LjIuMlxyXG5cdFx0XHRcdFx0aWdub3JlQXR0cmlidXRlcyA6IHRydWUsXHJcblx0XHRcdFx0XHR0b3VjaFx0XHRcdCA6IHRydWUsXHRcdFx0XHQvL1snaG9sZCcsIDUwMF0sIC8vIDUwMG1zIGRlbGF5XHRcdFx0Ly9GaXhJbjogOS4yLjEuNVxyXG5cdFx0XHRcdFx0YXBwZW5kVG86ICgpID0+IGRvY3VtZW50LmJvZHksXHJcblx0XHRcdFx0fSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHJcblxyXG5cclxuXHJcbi8qKlxyXG4gKiAgIEFqYXggIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xyXG5cclxuLyoqXHJcbiAqIFNlbmQgQWpheCBzaG93IHJlcXVlc3RcclxuICovXHJcbmZ1bmN0aW9uIHdwYmNfYWp4X2N1c3RvbWl6ZV9wbHVnaW5fX2FqYXhfcmVxdWVzdCgpe1xyXG5cclxuY29uc29sZS5ncm91cENvbGxhcHNlZCggJ1dQQkNfQUpYX0NVU1RPTUlaRV9QTFVHSU4nICk7IGNvbnNvbGUubG9nKCAnID09IEJlZm9yZSBBamF4IFNlbmQgLSBzZWFyY2hfZ2V0X2FsbF9wYXJhbXMoKSA9PSAnICwgd3BiY19hanhfY3VzdG9taXplX3BsdWdpbi5zZWFyY2hfZ2V0X2FsbF9wYXJhbXMoKSApO1xyXG5cclxuXHR3cGJjX2N1c3RvbWl6ZV9wbHVnaW5fcmVsb2FkX2J1dHRvbl9fc3Bpbl9zdGFydCgpO1xyXG5cclxuXHQvLyBTdGFydCBBamF4XHJcblx0alF1ZXJ5LnBvc3QoIHdwYmNfdXJsX2FqYXgsXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0YWN0aW9uICAgICAgICAgIDogJ1dQQkNfQUpYX0NVU1RPTUlaRV9QTFVHSU4nLFxyXG5cdFx0XHRcdFx0d3BiY19hanhfdXNlcl9pZDogd3BiY19hanhfY3VzdG9taXplX3BsdWdpbi5nZXRfc2VjdXJlX3BhcmFtKCAndXNlcl9pZCcgKSxcclxuXHRcdFx0XHRcdG5vbmNlICAgICAgICAgICA6IHdwYmNfYWp4X2N1c3RvbWl6ZV9wbHVnaW4uZ2V0X3NlY3VyZV9wYXJhbSggJ25vbmNlJyApLFxyXG5cdFx0XHRcdFx0d3BiY19hanhfbG9jYWxlIDogd3BiY19hanhfY3VzdG9taXplX3BsdWdpbi5nZXRfc2VjdXJlX3BhcmFtKCAnbG9jYWxlJyApLFxyXG5cclxuXHRcdFx0XHRcdHNlYXJjaF9wYXJhbXNcdDogd3BiY19hanhfY3VzdG9taXplX3BsdWdpbi5zZWFyY2hfZ2V0X2FsbF9wYXJhbXMoKVxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0LyoqXHJcblx0XHRcdFx0ICogUyB1IGMgYyBlIHMgc1xyXG5cdFx0XHRcdCAqXHJcblx0XHRcdFx0ICogQHBhcmFtIHJlc3BvbnNlX2RhdGFcdFx0LVx0aXRzIG9iamVjdCByZXR1cm5lZCBmcm9tICBBamF4IC0gY2xhc3MtbGl2ZS1zZWFyY2cucGhwXHJcblx0XHRcdFx0ICogQHBhcmFtIHRleHRTdGF0dXNcdFx0LVx0J3N1Y2Nlc3MnXHJcblx0XHRcdFx0ICogQHBhcmFtIGpxWEhSXHRcdFx0XHQtXHRPYmplY3RcclxuXHRcdFx0XHQgKi9cclxuXHRcdFx0XHRmdW5jdGlvbiAoIHJlc3BvbnNlX2RhdGEsIHRleHRTdGF0dXMsIGpxWEhSICkge1xyXG5cclxuY29uc29sZS5sb2coICcgPT0gUmVzcG9uc2UgV1BCQ19BSlhfQ1VTVE9NSVpFX1BMVUdJTiA9PSAnLCByZXNwb25zZV9kYXRhICk7IGNvbnNvbGUuZ3JvdXBFbmQoKTtcclxuXHJcblx0XHRcdFx0XHQvLyBQcm9iYWJseSBFcnJvclxyXG5cdFx0XHRcdFx0aWYgKCAodHlwZW9mIHJlc3BvbnNlX2RhdGEgIT09ICdvYmplY3QnKSB8fCAocmVzcG9uc2VfZGF0YSA9PT0gbnVsbCkgKXtcclxuXHJcblx0XHRcdFx0XHRcdHdwYmNfYWp4X2N1c3RvbWl6ZV9wbHVnaW5fX2FjdHVhbF9jb250ZW50X19oaWRlKCk7XHJcblx0XHRcdFx0XHRcdHdwYmNfYWp4X2N1c3RvbWl6ZV9wbHVnaW5fX3Nob3dfbWVzc2FnZSggcmVzcG9uc2VfZGF0YSApO1xyXG5cclxuXHRcdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdC8vIFJlbG9hZCBwYWdlLCBhZnRlciBmaWx0ZXIgdG9vbGJhciBoYXMgYmVlbiByZXNldFxyXG5cdFx0XHRcdFx0aWYgKCAgICAgICAoICAgICB1bmRlZmluZWQgIT0gcmVzcG9uc2VfZGF0YVsgJ2FqeF9jbGVhbmVkX3BhcmFtcycgXSlcclxuXHRcdFx0XHRcdFx0XHQmJiAoICdyZXNldF9kb25lJyA9PT0gcmVzcG9uc2VfZGF0YVsgJ2FqeF9jbGVhbmVkX3BhcmFtcycgXVsgJ2RvX2FjdGlvbicgXSlcclxuXHRcdFx0XHRcdCl7XHJcblx0XHRcdFx0XHRcdGxvY2F0aW9uLnJlbG9hZCgpO1xyXG5cdFx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0Ly8gU2hvdyBsaXN0aW5nXHJcblx0XHRcdFx0XHR3cGJjX2FqeF9jdXN0b21pemVfcGx1Z2luX19wYWdlX2NvbnRlbnRfX3Nob3coIHJlc3BvbnNlX2RhdGFbICdhanhfZGF0YScgXSwgcmVzcG9uc2VfZGF0YVsgJ2FqeF9zZWFyY2hfcGFyYW1zJyBdICwgcmVzcG9uc2VfZGF0YVsgJ2FqeF9jbGVhbmVkX3BhcmFtcycgXSApO1xyXG5cclxuXHRcdFx0XHRcdC8vd3BiY19hanhfY3VzdG9taXplX3BsdWdpbl9fZGVmaW5lX3VpX2hvb2tzKCk7XHRcdFx0XHRcdFx0Ly8gUmVkZWZpbmUgSG9va3MsIGJlY2F1c2Ugd2Ugc2hvdyBuZXcgRE9NIGVsZW1lbnRzXHJcblx0XHRcdFx0XHRpZiAoICcnICE9IHJlc3BvbnNlX2RhdGFbICdhanhfZGF0YScgXVsgJ2FqeF9hZnRlcl9hY3Rpb25fbWVzc2FnZScgXS5yZXBsYWNlKCAvXFxuL2csIFwiPGJyIC8+XCIgKSApe1xyXG5cdFx0XHRcdFx0XHR3cGJjX2FkbWluX3Nob3dfbWVzc2FnZShcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQgIHJlc3BvbnNlX2RhdGFbICdhanhfZGF0YScgXVsgJ2FqeF9hZnRlcl9hY3Rpb25fbWVzc2FnZScgXS5yZXBsYWNlKCAvXFxuL2csIFwiPGJyIC8+XCIgKVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCwgKCAnMScgPT0gcmVzcG9uc2VfZGF0YVsgJ2FqeF9kYXRhJyBdWyAnYWp4X2FmdGVyX2FjdGlvbl9yZXN1bHQnIF0gKSA/ICdzdWNjZXNzJyA6ICdlcnJvcidcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQsIDEwMDAwXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCk7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0d3BiY19jdXN0b21pemVfcGx1Z2luX3JlbG9hZF9idXR0b25fX3NwaW5fcGF1c2UoKTtcclxuXHRcdFx0XHRcdC8vIFJlbW92ZSBzcGluIGljb24gZnJvbSAgYnV0dG9uIGFuZCBFbmFibGUgdGhpcyBidXR0b24uXHJcblx0XHRcdFx0XHR3cGJjX2J1dHRvbl9fcmVtb3ZlX3NwaW4oIHJlc3BvbnNlX2RhdGFbICdhanhfY2xlYW5lZF9wYXJhbXMnIF1bICd1aV9jbGlja2VkX2VsZW1lbnRfaWQnIF0gKVxyXG5cclxuXHRcdFx0XHRcdGpRdWVyeSggJyNhamF4X3Jlc3BvbmQnICkuaHRtbCggcmVzcG9uc2VfZGF0YSApO1x0XHQvLyBGb3IgYWJpbGl0eSB0byBzaG93IHJlc3BvbnNlLCBhZGQgc3VjaCBESVYgZWxlbWVudCB0byBwYWdlXHJcblx0XHRcdFx0fVxyXG5cdFx0XHQgICkuZmFpbCggZnVuY3Rpb24gKCBqcVhIUiwgdGV4dFN0YXR1cywgZXJyb3JUaHJvd24gKSB7ICAgIGlmICggd2luZG93LmNvbnNvbGUgJiYgd2luZG93LmNvbnNvbGUubG9nICl7IGNvbnNvbGUubG9nKCAnQWpheF9FcnJvcicsIGpxWEhSLCB0ZXh0U3RhdHVzLCBlcnJvclRocm93biApOyB9XHJcblxyXG5cdFx0XHRcdFx0dmFyIGVycm9yX21lc3NhZ2UgPSAnPHN0cm9uZz4nICsgJ0Vycm9yIScgKyAnPC9zdHJvbmc+ICcgKyBlcnJvclRocm93biA7XHJcblx0XHRcdFx0XHRpZiAoIGpxWEhSLnN0YXR1cyApe1xyXG5cdFx0XHRcdFx0XHRlcnJvcl9tZXNzYWdlICs9ICcgKDxiPicgKyBqcVhIUi5zdGF0dXMgKyAnPC9iPiknO1xyXG5cdFx0XHRcdFx0XHRpZiAoNDAzID09IGpxWEhSLnN0YXR1cyApe1xyXG5cdFx0XHRcdFx0XHRcdGVycm9yX21lc3NhZ2UgKz0gJyBQcm9iYWJseSBub25jZSBmb3IgdGhpcyBwYWdlIGhhcyBiZWVuIGV4cGlyZWQuIFBsZWFzZSA8YSBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCIgb25jbGljaz1cImphdmFzY3JpcHQ6bG9jYXRpb24ucmVsb2FkKCk7XCI+cmVsb2FkIHRoZSBwYWdlPC9hPi4nO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRpZiAoIGpxWEhSLnJlc3BvbnNlVGV4dCApe1xyXG5cdFx0XHRcdFx0XHRlcnJvcl9tZXNzYWdlICs9ICcgJyArIGpxWEhSLnJlc3BvbnNlVGV4dDtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGVycm9yX21lc3NhZ2UgPSBlcnJvcl9tZXNzYWdlLnJlcGxhY2UoIC9cXG4vZywgXCI8YnIgLz5cIiApO1xyXG5cclxuXHRcdFx0XHRcdHdwYmNfYWp4X2N1c3RvbWl6ZV9wbHVnaW5fX2FjdHVhbF9jb250ZW50X19oaWRlKCk7XHJcblx0XHRcdFx0XHR3cGJjX2FqeF9jdXN0b21pemVfcGx1Z2luX19zaG93X21lc3NhZ2UoIGVycm9yX21lc3NhZ2UgKTtcclxuXHRcdFx0ICB9KVxyXG5cdCAgICAgICAgICAvLyAuZG9uZSggICBmdW5jdGlvbiAoIGRhdGEsIHRleHRTdGF0dXMsIGpxWEhSICkgeyAgIGlmICggd2luZG93LmNvbnNvbGUgJiYgd2luZG93LmNvbnNvbGUubG9nICl7IGNvbnNvbGUubG9nKCAnc2Vjb25kIHN1Y2Nlc3MnLCBkYXRhLCB0ZXh0U3RhdHVzLCBqcVhIUiApOyB9ICAgIH0pXHJcblx0XHRcdCAgLy8gLmFsd2F5cyggZnVuY3Rpb24gKCBkYXRhX2pxWEhSLCB0ZXh0U3RhdHVzLCBqcVhIUl9lcnJvclRocm93biApIHsgICBpZiAoIHdpbmRvdy5jb25zb2xlICYmIHdpbmRvdy5jb25zb2xlLmxvZyApeyBjb25zb2xlLmxvZyggJ2Fsd2F5cyBmaW5pc2hlZCcsIGRhdGFfanFYSFIsIHRleHRTdGF0dXMsIGpxWEhSX2Vycm9yVGhyb3duICk7IH0gICAgIH0pXHJcblx0XHRcdCAgOyAgLy8gRW5kIEFqYXhcclxuXHJcbn1cclxuXHJcblxyXG5cclxuLyoqXHJcbiAqICAgSCBvIG8gayBzICAtICBpdHMgQWN0aW9uL1RpbWVzIHdoZW4gbmVlZCB0byByZS1SZW5kZXIgVmlld3MgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXHJcblxyXG4vKipcclxuICogU2VuZCBBamF4IFNlYXJjaCBSZXF1ZXN0IGFmdGVyIFVwZGF0aW5nIHNlYXJjaCByZXF1ZXN0IHBhcmFtZXRlcnNcclxuICpcclxuICogQHBhcmFtIHBhcmFtc19hcnJcclxuICovXHJcbmZ1bmN0aW9uIHdwYmNfYWp4X2N1c3RvbWl6ZV9wbHVnaW5fX3NlbmRfcmVxdWVzdF93aXRoX3BhcmFtcyAoIHBhcmFtc19hcnIgKXtcclxuXHJcblx0Ly8gRGVmaW5lIGRpZmZlcmVudCBTZWFyY2ggIHBhcmFtZXRlcnMgZm9yIHJlcXVlc3RcclxuXHRfLmVhY2goIHBhcmFtc19hcnIsIGZ1bmN0aW9uICggcF92YWwsIHBfa2V5LCBwX2RhdGEgKSB7XHJcblx0XHQvL2NvbnNvbGUubG9nKCAnUmVxdWVzdCBmb3I6ICcsIHBfa2V5LCBwX3ZhbCApO1xyXG5cdFx0d3BiY19hanhfY3VzdG9taXplX3BsdWdpbi5zZWFyY2hfc2V0X3BhcmFtKCBwX2tleSwgcF92YWwgKTtcclxuXHR9KTtcclxuXHJcblx0Ly8gU2VuZCBBamF4IFJlcXVlc3RcclxuXHR3cGJjX2FqeF9jdXN0b21pemVfcGx1Z2luX19hamF4X3JlcXVlc3QoKTtcclxufVxyXG5cclxuXHJcblx0LyoqXHJcblx0ICogU2VhcmNoIHJlcXVlc3QgZm9yIFwiUGFnZSBOdW1iZXJcIlxyXG5cdCAqIEBwYXJhbSBwYWdlX251bWJlclx0aW50XHJcblx0ICovXHJcblx0ZnVuY3Rpb24gd3BiY19hanhfY3VzdG9taXplX3BsdWdpbl9fcGFnaW5hdGlvbl9jbGljayggcGFnZV9udW1iZXIgKXtcclxuXHJcblx0XHR3cGJjX2FqeF9jdXN0b21pemVfcGx1Z2luX19zZW5kX3JlcXVlc3Rfd2l0aF9wYXJhbXMoIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdCdwYWdlX251bSc6IHBhZ2VfbnVtYmVyXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0fSApO1xyXG5cdH1cclxuXHJcblxyXG5cclxuLyoqXHJcbiAqICAgU2hvdyAvIEhpZGUgQ29udGVudCAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXHJcblxyXG4vKipcclxuICogIFNob3cgTGlzdGluZyBDb250ZW50IFx0LSBcdFNlbmRpbmcgQWpheCBSZXF1ZXN0XHQtXHR3aXRoIHBhcmFtZXRlcnMgdGhhdCAgd2UgZWFybHkgIGRlZmluZWRcclxuICovXHJcbmZ1bmN0aW9uIHdwYmNfYWp4X2N1c3RvbWl6ZV9wbHVnaW5fX2FjdHVhbF9jb250ZW50X19zaG93KCl7XHJcblxyXG5cdHdwYmNfYWp4X2N1c3RvbWl6ZV9wbHVnaW5fX2FqYXhfcmVxdWVzdCgpO1x0XHRcdC8vIFNlbmQgQWpheCBSZXF1ZXN0XHQtXHR3aXRoIHBhcmFtZXRlcnMgdGhhdCAgd2UgZWFybHkgIGRlZmluZWQgaW4gXCJ3cGJjX2FqeF9ib29raW5nX2xpc3RpbmdcIiBPYmouXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBIaWRlIExpc3RpbmcgQ29udGVudFxyXG4gKi9cclxuZnVuY3Rpb24gd3BiY19hanhfY3VzdG9taXplX3BsdWdpbl9fYWN0dWFsX2NvbnRlbnRfX2hpZGUoKXtcclxuXHJcblx0alF1ZXJ5KCAgd3BiY19hanhfY3VzdG9taXplX3BsdWdpbi5nZXRfb3RoZXJfcGFyYW0oICdsaXN0aW5nX2NvbnRhaW5lcicgKSAgKS5odG1sKCAnJyApO1xyXG59XHJcblxyXG5cclxuXHJcbi8qKlxyXG4gKiAgIE0gZSBzIHMgYSBnIGUgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xyXG5cclxuLyoqXHJcbiAqXHJcbiAqL1xyXG5cclxuXHJcblxyXG4vKipcclxuICogU2hvdyBtZXNzYWdlIGluIGNvbnRlbnRcclxuICpcclxuICogQHBhcmFtIG1lc3NhZ2VcdFx0XHRcdE1lc3NhZ2UgSFRNTFxyXG4gKiBAcGFyYW0gcGFyYW1zID0ge1xyXG4gKiAgICAgICAgICAgICAgICAgICBbJ3R5cGUnXVx0XHRcdFx0J3dhcm5pbmcnIHwgJ2luZm8nIHwgJ2Vycm9yJyB8ICdzdWNjZXNzJ1x0XHRkZWZhdWx0OiAnd2FybmluZydcclxuICogICAgICAgICAgICAgICAgICAgWydjb250YWluZXInXVx0XHRcdCcud3BiY19hanhfY3N0bV9fc2VjdGlvbl9sZWZ0J1x0XHRkZWZhdWx0OiB3cGJjX2FqeF9jdXN0b21pemVfcGx1Z2luLmdldF9vdGhlcl9wYXJhbSggJ2xpc3RpbmdfY29udGFpbmVyJyApXHJcbiAqICAgICAgICAgICAgICAgICAgIFsnaXNfYXBwZW5kJ11cdFx0XHR0cnVlIHwgZmFsc2VcdFx0XHRcdFx0XHRkZWZhdWx0OiB0cnVlXHJcbiAqXHRcdFx0XHQgICB9XHJcbiAqIEV4YW1wbGU6XHJcbiAqIFx0XHRcdHZhciBodG1sX2lkID0gd3BiY19hanhfY3VzdG9taXplX3BsdWdpbl9fc2hvd19tZXNzYWdlKCAnWW91IGNhbiB0ZXN0IGRheXMgc2VsZWN0aW9uIGluIGNhbGVuZGFyJywgJ2luZm8nLCAnLndwYmNfYWp4X2NzdG1fX3NlY3Rpb25fbGVmdCcsIHRydWUgKTtcclxuICpcclxuICpcclxuICogQHJldHVybnMgc3RyaW5nICAtIEhUTUwgSURcclxuICovXHJcbmZ1bmN0aW9uIHdwYmNfYWp4X2N1c3RvbWl6ZV9wbHVnaW5fX3Nob3dfbWVzc2FnZSggbWVzc2FnZSwgcGFyYW1zID0ge30gKXtcclxuXHJcblx0dmFyIHBhcmFtc19kZWZhdWx0ID0ge1xyXG5cdFx0XHRcdFx0XHRcdFx0J3R5cGUnICAgICA6ICd3YXJuaW5nJyxcclxuXHRcdFx0XHRcdFx0XHRcdCdjb250YWluZXInOiB3cGJjX2FqeF9jdXN0b21pemVfcGx1Z2luLmdldF9vdGhlcl9wYXJhbSggJ2xpc3RpbmdfY29udGFpbmVyJyApLFxyXG5cdFx0XHRcdFx0XHRcdFx0J2lzX2FwcGVuZCc6IHRydWUsXHJcblx0XHRcdFx0XHRcdFx0XHQnc3R5bGUnICAgIDogJ3RleHQtYWxpZ246bGVmdDsnLFxyXG5cdFx0XHRcdFx0XHRcdFx0J2RlbGF5JyAgICA6IDBcclxuXHRcdFx0XHRcdFx0XHR9O1xyXG5cdF8uZWFjaCggcGFyYW1zLCBmdW5jdGlvbiAoIHBfdmFsLCBwX2tleSwgcF9kYXRhICl7XHJcblx0XHRwYXJhbXNfZGVmYXVsdFsgcF9rZXkgXSA9IHBfdmFsO1xyXG5cdH0gKTtcclxuXHRwYXJhbXMgPSBwYXJhbXNfZGVmYXVsdDtcclxuXHJcbiAgICB2YXIgdW5pcXVlX2Rpdl9pZCA9IG5ldyBEYXRlKCk7XHJcbiAgICB1bmlxdWVfZGl2X2lkID0gJ3dwYmNfbm90aWNlXycgKyB1bmlxdWVfZGl2X2lkLmdldFRpbWUoKTtcclxuXHJcblx0dmFyIGFsZXJ0X2NsYXNzID0gJ25vdGljZSAnO1xyXG5cdGlmICggcGFyYW1zWyd0eXBlJ10gPT0gJ2Vycm9yJyApe1xyXG5cdFx0YWxlcnRfY2xhc3MgKz0gJ25vdGljZS1lcnJvciAnO1xyXG5cdFx0bWVzc2FnZSA9ICc8aSBzdHlsZT1cIm1hcmdpbi1yaWdodDogMC41ZW07Y29sb3I6ICNkNjM2Mzg7XCIgY2xhc3M9XCJtZW51X2ljb24gaWNvbi0xeCB3cGJjX2ljbl9yZXBvcnRfZ21haWxlcnJvcnJlZFwiPjwvaT4nICsgbWVzc2FnZTtcclxuXHR9XHJcblx0aWYgKCBwYXJhbXNbJ3R5cGUnXSA9PSAnd2FybmluZycgKXtcclxuXHRcdGFsZXJ0X2NsYXNzICs9ICdub3RpY2Utd2FybmluZyAnO1xyXG5cdFx0bWVzc2FnZSA9ICc8aSBzdHlsZT1cIm1hcmdpbi1yaWdodDogMC41ZW07Y29sb3I6ICNlOWFhMDQ7XCIgY2xhc3M9XCJtZW51X2ljb24gaWNvbi0xeCB3cGJjX2ljbl93YXJuaW5nXCI+PC9pPicgKyBtZXNzYWdlO1xyXG5cdH1cclxuXHRpZiAoIHBhcmFtc1sndHlwZSddID09ICdpbmZvJyApe1xyXG5cdFx0YWxlcnRfY2xhc3MgKz0gJ25vdGljZS1pbmZvICc7XHJcblx0fVxyXG5cdGlmICggcGFyYW1zWyd0eXBlJ10gPT0gJ3N1Y2Nlc3MnICl7XHJcblx0XHRhbGVydF9jbGFzcyArPSAnbm90aWNlLWluZm8gYWxlcnQtc3VjY2VzcyB1cGRhdGVkICc7XHJcblx0XHRtZXNzYWdlID0gJzxpIHN0eWxlPVwibWFyZ2luLXJpZ2h0OiAwLjVlbTtjb2xvcjogIzY0YWE0NTtcIiBjbGFzcz1cIm1lbnVfaWNvbiBpY29uLTF4IHdwYmNfaWNuX2RvbmVfb3V0bGluZVwiPjwvaT4nICsgbWVzc2FnZTtcclxuXHR9XHJcblxyXG5cdG1lc3NhZ2UgPSAnPGRpdiBpZD1cIicgKyB1bmlxdWVfZGl2X2lkICsgJ1wiIGNsYXNzPVwid3BiYy1zZXR0aW5ncy1ub3RpY2UgJyArIGFsZXJ0X2NsYXNzICsgJ1wiIHN0eWxlPVwiJyArIHBhcmFtc1sgJ3N0eWxlJyBdICsgJ1wiPicgKyBtZXNzYWdlICsgJzwvZGl2Pic7XHJcblxyXG5cdGlmICggcGFyYW1zWydpc19hcHBlbmQnXSApe1xyXG5cdFx0alF1ZXJ5KCBwYXJhbXNbJ2NvbnRhaW5lciddICkuYXBwZW5kKCBtZXNzYWdlICk7XHJcblx0fSBlbHNlIHtcclxuXHRcdGpRdWVyeSggcGFyYW1zWydjb250YWluZXInXSApLmh0bWwoIG1lc3NhZ2UgKTtcclxuXHR9XHJcblxyXG5cdHBhcmFtc1snZGVsYXknXSA9IHBhcnNlSW50KCBwYXJhbXNbJ2RlbGF5J10gKTtcclxuXHRpZiAoIHBhcmFtc1snZGVsYXknXSA+IDAgKXtcclxuXHJcblx0XHR2YXIgY2xvc2VkX3RpbWVyID0gc2V0VGltZW91dCggZnVuY3Rpb24gKCl7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRqUXVlcnkoICcjJyArIHVuaXF1ZV9kaXZfaWQgKS5mYWRlT3V0KCAxNTAwICk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQsIHBhcmFtc1sgJ2RlbGF5JyBdXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQgKTtcclxuXHR9XHJcblxyXG5cdHJldHVybiB1bmlxdWVfZGl2X2lkO1xyXG59XHJcblxyXG5cclxuXHJcbi8qKlxyXG4gKiAgIFN1cHBvcnQgRnVuY3Rpb25zIC0gU3BpbiBJY29uIGluIEJ1dHRvbnMgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xyXG5cclxuLyoqXHJcbiAqIFNwaW4gYnV0dG9uIGluIEZpbHRlciB0b29sYmFyICAtICBTdGFydFxyXG4gKi9cclxuZnVuY3Rpb24gd3BiY19jdXN0b21pemVfcGx1Z2luX3JlbG9hZF9idXR0b25fX3NwaW5fc3RhcnQoKXtcclxuXHRqUXVlcnkoICcjd3BiY19jdXN0b21pemVfcGx1Z2luX3JlbG9hZF9idXR0b24gLm1lbnVfaWNvbi53cGJjX3NwaW4nKS5yZW1vdmVDbGFzcyggJ3dwYmNfYW5pbWF0aW9uX3BhdXNlJyApO1xyXG59XHJcblxyXG4vKipcclxuICogU3BpbiBidXR0b24gaW4gRmlsdGVyIHRvb2xiYXIgIC0gIFBhdXNlXHJcbiAqL1xyXG5mdW5jdGlvbiB3cGJjX2N1c3RvbWl6ZV9wbHVnaW5fcmVsb2FkX2J1dHRvbl9fc3Bpbl9wYXVzZSgpe1xyXG5cdGpRdWVyeSggJyN3cGJjX2N1c3RvbWl6ZV9wbHVnaW5fcmVsb2FkX2J1dHRvbiAubWVudV9pY29uLndwYmNfc3BpbicgKS5hZGRDbGFzcyggJ3dwYmNfYW5pbWF0aW9uX3BhdXNlJyApO1xyXG59XHJcblxyXG4vKipcclxuICogU3BpbiBidXR0b24gaW4gRmlsdGVyIHRvb2xiYXIgIC0gIGlzIFNwaW5uaW5nID9cclxuICpcclxuICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAqL1xyXG5mdW5jdGlvbiB3cGJjX2N1c3RvbWl6ZV9wbHVnaW5fcmVsb2FkX2J1dHRvbl9faXNfc3Bpbigpe1xyXG4gICAgaWYgKCBqUXVlcnkoICcjd3BiY19jdXN0b21pemVfcGx1Z2luX3JlbG9hZF9idXR0b24gLm1lbnVfaWNvbi53cGJjX3NwaW4nICkuaGFzQ2xhc3MoICd3cGJjX2FuaW1hdGlvbl9wYXVzZScgKSApe1xyXG5cdFx0cmV0dXJuIHRydWU7XHJcblx0fSBlbHNlIHtcclxuXHRcdHJldHVybiBmYWxzZTtcclxuXHR9XHJcbn1cclxuIl0sImZpbGUiOiJpbmNsdWRlcy9wYWdlLWN1c3RvbWl6ZS9fb3V0L2N1c3RvbWl6ZV9wbHVnaW5fcGFnZS5qcyJ9
