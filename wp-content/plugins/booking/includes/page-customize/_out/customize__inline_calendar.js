"use strict";
/**
 * Define JavaScript variables for front-end calendar for backward compatibility
 *
 * @param calendar_params_arr example:{
											'html_id'           : 'calendar_booking' + calendar_params_arr.ajx_cleaned_params.resource_id,
											'text_id'           : 'date_booking' + calendar_params_arr.ajx_cleaned_params.resource_id,

											'calendar__booking_start_day_weeek': 	  calendar_params_arr.ajx_cleaned_params.calendar__booking_start_day_weeek,
											'calendar__view__visible_months': calendar_params_arr.ajx_cleaned_params.calendar__view__visible_months,
											'calendar__days_selection_mode':  calendar_params_arr.ajx_cleaned_params.calendar__days_selection_mode,

											'resource_id'        : calendar_params_arr.ajx_cleaned_params.resource_id,
											'ajx_nonce_calendar' : calendar_params_arr.ajx_data_arr.ajx_nonce_calendar,
											'booked_dates'       : calendar_params_arr.ajx_data_arr.booked_dates,
											'season_customize_plugin': calendar_params_arr.ajx_data_arr.season_customize_plugin,

											'resource_unavailable_dates' : calendar_params_arr.ajx_data_arr.resource_unavailable_dates
										}
 */

function wpbc_assign_global_js_for_calendar(calendar_params_arr) {//TODO: need to  test it before remove
}
/**
 * 	Load Datepick Inline calendar
 *
 * @param calendar_params_arr		example:{
											'html_id'           : 'calendar_booking' + calendar_params_arr.ajx_cleaned_params.resource_id,
											'text_id'           : 'date_booking' + calendar_params_arr.ajx_cleaned_params.resource_id,

											'calendar__booking_start_day_weeek': 	  calendar_params_arr.ajx_cleaned_params.calendar__booking_start_day_weeek,
											'calendar__view__visible_months': calendar_params_arr.ajx_cleaned_params.calendar__view__visible_months,
											'calendar__days_selection_mode':  calendar_params_arr.ajx_cleaned_params.calendar__days_selection_mode,

											'resource_id'        : calendar_params_arr.ajx_cleaned_params.resource_id,
											'ajx_nonce_calendar' : calendar_params_arr.ajx_data_arr.ajx_nonce_calendar,
											'booked_dates'       : calendar_params_arr.ajx_data_arr.calendar_settings.booked_dates,
											'season_customize_plugin': calendar_params_arr.ajx_data_arr.season_customize_plugin,

											'resource_unavailable_dates' : calendar_params_arr.ajx_data_arr.resource_unavailable_dates
										}
 * @returns {boolean}
 */


function wpbc_show_inline_booking_calendar(calendar_params_arr) {
  if (0 === jQuery('#' + calendar_params_arr.html_id).length // If calendar DOM element not exist then exist
  || true === jQuery('#' + calendar_params_arr.html_id).hasClass('hasDatepick') // If the calendar with the same Booking resource already  has been activated, then exist.
  ) {
    return false;
  } //------------------------------------------------------------------------------------------------------------------
  //  JavaScript variables for front-end calendar
  //------------------------------------------------------------------------------------------------------------------


  wpbc_assign_global_js_for_calendar(calendar_params_arr); //------------------------------------------------------------------------------------------------------------------
  // Configure and show calendar
  //------------------------------------------------------------------------------------------------------------------

  jQuery('#' + calendar_params_arr.html_id).text('');
  jQuery('#' + calendar_params_arr.html_id).datepick({
    beforeShowDay: function beforeShowDay(date) {
      return wpbc__inline_booking_calendar__apply_css_to_days(date, calendar_params_arr, this);
    },
    onSelect: function onSelect(date) {
      jQuery('#' + calendar_params_arr.text_id).val(date); //wpbc_blink_element('.wpbc_widget_change_calendar_skin', 3, 220);

      return wpbc__inline_booking_calendar__on_days_select(date, calendar_params_arr, this);
    },
    onHover: function onHover(value, date) {
      //wpbc_cstm__prepare_tooltip__in_calendar( value, date, calendar_params_arr, this );
      return wpbc__inline_booking_calendar__on_days_hover(value, date, calendar_params_arr, this);
    },
    onChangeMonthYear: //null,
    function onChangeMonthYear(year, month) {
      return wpbc__inline_booking_calendar__on_change_year_month(year, month, calendar_params_arr, this);
    },
    showOn: 'both',
    numberOfMonths: calendar_params_arr.calendar__view__visible_months,
    stepMonths: 1,
    prevText: '&laquo;',
    nextText: '&raquo;',
    dateFormat: 'dd.mm.yy',
    // 'yy-mm-dd',
    changeMonth: false,
    changeYear: false,
    minDate: 0,
    //null,  	// Scroll as long as you need
    maxDate: calendar_params_arr.calendar__booking_max_monthes_in_calendar,
    // minDate: new Date(2020, 2, 1), maxDate: new Date(2020, 9, 31), 	// Ability to set any  start and end date in calendar
    showStatus: false,
    closeAtTop: false,
    firstDay: calendar_params_arr.calendar__booking_start_day_weeek,
    gotoCurrent: false,
    hideIfNoPrevNext: true,
    multiSeparator: ', ',

    /*  'multiSelect' can  be 0   for 'single', 'dynamic'
      			  and can  be 365 for 'multiple', 'fixed'
      			  																						// Maximum number of selectable dates:	 Single day = 0,  multi days = 365
     */
    multiSelect: 'single' == calendar_params_arr.calendar__days_selection_mode || 'dynamic' == calendar_params_arr.calendar__days_selection_mode ? 0 : 365,

    /*  'rangeSelect' true  for 'dynamic'
    				  false for 'single', 'multiple', 'fixed'
     */
    rangeSelect: 'dynamic' == calendar_params_arr.calendar__days_selection_mode,
    rangeSeparator: ' - ',
    //	' ~ ',	//' - ',
    // showWeeks: true,
    useThemeRoller: false
  });
  return true;
}
/**
 * When  we scroll  month in calendar  then  trigger specific event
 * @param year
 * @param month
 * @param calendar_params_arr
 * @param datepick_this
 */


function wpbc__inline_booking_calendar__on_change_year_month(year, month, calendar_params_arr, datepick_this) {
  /**
   *   We need to use inst.drawMonth  instead of month variable.
   *   It is because,  each  time,  when we use dynamic arnge selection,  the month here are different
   */
  var inst = jQuery.datepick._getInst(datepick_this);

  jQuery('body').trigger('wpbc__inline_booking_calendar__changed_year_month' // event name
  , [inst.drawYear, inst.drawMonth + 1, calendar_params_arr, datepick_this]); // To catch this event: jQuery( 'body' ).on('wpbc__inline_booking_calendar__changed_year_month', function( event, year, month, calendar_params_arr, datepick_this ) { ... } );
}
/**
 * Apply CSS to calendar date cells
 *
 * @param date					-  JavaScript Date Obj:  		Mon Dec 11 2023 00:00:00 GMT+0200 (Eastern European Standard Time)
 * @param calendar_params_arr	-  Calendar Settings Object:  	{
																  "html_id": "calendar_booking4",
																  "text_id": "date_booking4",
																  "calendar__booking_start_day_weeek": 1,
																  "calendar__view__visible_months": 12,
																  "resource_id": 4,
																  "ajx_nonce_calendar": "<input type=\"hidden\" ... />",
																  "booked_dates": {
																	"12-28-2022": [
																	  {
																		"booking_date": "2022-12-28 00:00:00",
																		"approved": "1",
																		"booking_id": "26"
																	  }
																	], ...
																	}
																	'season_customize_plugin':{
																		"2023-01-09": true,
																		"2023-01-10": true,
																		"2023-01-11": true, ...
																	}
																  }
																}
 * @param datepick_this			- this of datepick Obj
 *
 * @returns [boolean,string]	- [ {true -available | false - unavailable}, 'CSS classes for calendar day cell' ]
 */


function wpbc__inline_booking_calendar__apply_css_to_days(date, calendar_params_arr, datepick_this) {
  var today_date = new Date(_wpbc.get_other_param('today_arr')[0], parseInt(_wpbc.get_other_param('today_arr')[1]) - 1, _wpbc.get_other_param('today_arr')[2], 0, 0, 0);
  var class_day = date.getMonth() + 1 + '-' + date.getDate() + '-' + date.getFullYear(); // '1-9-2023'

  var sql_class_day = wpbc__get__sql_class_date(date); // '2023-01-09'

  var css_date__standard = 'cal4date-' + class_day;
  var css_date__additional = ' wpbc_weekday_' + date.getDay() + ' '; //--------------------------------------------------------------------------------------------------------------
  // WEEKDAYS :: Set unavailable week days from - Settings General page in "Availability" section

  for (var i = 0; i < _wpbc.get_other_param('availability__week_days_unavailable').length; i++) {
    if (date.getDay() == _wpbc.get_other_param('availability__week_days_unavailable')[i]) {
      return [false, css_date__standard + ' date_user_unavailable' + ' weekdays_unavailable'];
    }
  } // BEFORE_AFTER :: Set unavailable days Before / After the Today date


  if (wpbc_dates__days_between(date, today_date) < parseInt(_wpbc.get_other_param('availability__unavailable_from_today')) || parseInt('0' + parseInt(_wpbc.get_other_param('availability__available_from_today'))) > 0 && wpbc_dates__days_between(date, today_date) > parseInt('0' + parseInt(_wpbc.get_other_param('availability__available_from_today')))) {
    return [false, css_date__standard + ' date_user_unavailable' + ' before_after_unavailable'];
  } // SEASONS ::  					Booking > Resources > Availability page


  var is_date_available = calendar_params_arr.season_customize_plugin[sql_class_day];

  if (false === is_date_available) {
    //FixIn: 9.5.4.4
    return [false, css_date__standard + ' date_user_unavailable' + ' season_unavailable'];
  } // RESOURCE_UNAVAILABLE ::   	Booking > Customize page


  if (wpdev_in_array(calendar_params_arr.resource_unavailable_dates, sql_class_day)) {
    is_date_available = false;
  }

  if (false === is_date_available) {
    //FixIn: 9.5.4.4
    return [false, css_date__standard + ' date_user_unavailable' + ' resource_unavailable'];
  } //--------------------------------------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------------------------------------
  // Is any bookings in this date ?


  if ('undefined' !== typeof calendar_params_arr.booked_dates[class_day]) {
    var bookings_in_date = calendar_params_arr.booked_dates[class_day];

    if ('undefined' !== typeof bookings_in_date['sec_0']) {
      // "Full day" booking  -> (seconds == 0)
      css_date__additional += '0' === bookings_in_date['sec_0'].approved ? ' date2approve ' : ' date_approved '; // Pending = '0' |  Approved = '1'

      css_date__additional += ' full_day_booking';
      return [false, css_date__standard + css_date__additional];
    } else if (Object.keys(bookings_in_date).length > 0) {
      // "Time slots" Bookings
      var is_approved = true;

      _.each(bookings_in_date, function (p_val, p_key, p_data) {
        if (!parseInt(p_val.approved)) {
          is_approved = false;
        }

        var ts = p_val.booking_date.substring(p_val.booking_date.length - 1);

        if (true === _wpbc.get_other_param('is_enabled_change_over')) {
          if (ts == '1') {
            css_date__additional += ' check_in_time' + (parseInt(p_val.approved) ? ' check_in_time_date_approved' : ' check_in_time_date2approve');
          }

          if (ts == '2') {
            css_date__additional += ' check_out_time' + (parseInt(p_val.approved) ? ' check_out_time_date_approved' : ' check_out_time_date2approve');
          }
        }
      });

      if (!is_approved) {
        css_date__additional += ' date2approve timespartly';
      } else {
        css_date__additional += ' date_approved timespartly';
      }

      if (!_wpbc.get_other_param('is_enabled_change_over')) {
        css_date__additional += ' times_clock';
      }
    }
  } //--------------------------------------------------------------------------------------------------------------


  return [true, css_date__standard + css_date__additional + ' date_available'];
} //TODO: need to  use wpbc_calendar script,  instead of this one

/**
 * Apply some CSS classes, when we mouse over specific dates in calendar
 * @param value
 * @param date					-  JavaScript Date Obj:  		Mon Dec 11 2023 00:00:00 GMT+0200 (Eastern European Standard Time)
 * @param calendar_params_arr	-  Calendar Settings Object:  	{
																  "html_id": "calendar_booking4",
																  "text_id": "date_booking4",
																  "calendar__booking_start_day_weeek": 1,
																  "calendar__view__visible_months": 12,
																  "resource_id": 4,
																  "ajx_nonce_calendar": "<input type=\"hidden\" ... />",
																  "booked_dates": {
																	"12-28-2022": [
																	  {
																		"booking_date": "2022-12-28 00:00:00",
																		"approved": "1",
																		"booking_id": "26"
																	  }
																	], ...
																	}
																	'season_customize_plugin':{
																		"2023-01-09": true,
																		"2023-01-10": true,
																		"2023-01-11": true, ...
																	}
																  }
																}
 * @param datepick_this			- this of datepick Obj
 *
 * @returns {boolean}
 */


function wpbc__inline_booking_calendar__on_days_hover(value, date, calendar_params_arr, datepick_this) {
  if (null === date) {
    return;
  } // The same functions as in client.css *************************************************************
  //TODO: 2023-06-30 17:22


  if (true) {
    var bk_type = calendar_params_arr.resource_id;
    var is_calendar_booking_unselectable = jQuery('#calendar_booking_unselectable' + bk_type); //FixIn: 8.0.1.2

    var is_booking_form_also = jQuery('#booking_form_div' + bk_type); // Set unselectable,  if only Availability Calendar  here (and we do not insert Booking form by mistake).

    if (is_calendar_booking_unselectable.length == 1 && is_booking_form_also.length != 1) {
      jQuery('#calendar_booking' + bk_type + ' .datepick-days-cell-over').removeClass('datepick-days-cell-over'); // clear all highlight days selections

      jQuery('.wpbc_only_calendar #calendar_booking' + bk_type + ' .datepick-days-cell, ' + '.wpbc_only_calendar #calendar_booking' + bk_type + ' .datepick-days-cell a').css('cursor', 'default');
      return false;
    } //FixIn: 8.0.1.2	end


    return true;
  } // *************************************************************************************************


  if (null === date) {
    jQuery('.datepick-days-cell-over').removeClass('datepick-days-cell-over'); // clear all highlight days selections

    return false;
  }

  var inst = jQuery.datepick._getInst(document.getElementById('calendar_booking' + calendar_params_arr.resource_id));

  if (1 == inst.dates.length // If we have one selected date
  && 'dynamic' === calendar_params_arr.calendar__days_selection_mode // while have range days selection mode
  ) {
    var td_class;
    var td_overs = [];
    var is_check = true;
    var selceted_first_day = new Date();
    selceted_first_day.setFullYear(inst.dates[0].getFullYear(), inst.dates[0].getMonth(), inst.dates[0].getDate()); //Get first Date

    while (is_check) {
      td_class = selceted_first_day.getMonth() + 1 + '-' + selceted_first_day.getDate() + '-' + selceted_first_day.getFullYear();
      td_overs[td_overs.length] = '#calendar_booking' + calendar_params_arr.resource_id + ' .cal4date-' + td_class; // add to array for later make selection by class

      if (date.getMonth() == selceted_first_day.getMonth() && date.getDate() == selceted_first_day.getDate() && date.getFullYear() == selceted_first_day.getFullYear() || selceted_first_day > date) {
        is_check = false;
      }

      selceted_first_day.setFullYear(selceted_first_day.getFullYear(), selceted_first_day.getMonth(), selceted_first_day.getDate() + 1);
    } // Highlight Days


    for (var i = 0; i < td_overs.length; i++) {
      // add class to all elements
      jQuery(td_overs[i]).addClass('datepick-days-cell-over');
    }

    return true;
  }

  return true;
} //TODO: need to  use wpbc_calendar script,  instead of this one

/**
 * On DAYs selection in calendar
 *
 * @param dates_selection		-  string:			 '2023-03-07 ~ 2023-03-07' or '2023-04-10, 2023-04-12, 2023-04-02, 2023-04-04'
 * @param calendar_params_arr	-  Calendar Settings Object:  	{
																  "html_id": "calendar_booking4",
																  "text_id": "date_booking4",
																  "calendar__booking_start_day_weeek": 1,
																  "calendar__view__visible_months": 12,
																  "resource_id": 4,
																  "ajx_nonce_calendar": "<input type=\"hidden\" ... />",
																  "booked_dates": {
																	"12-28-2022": [
																	  {
																		"booking_date": "2022-12-28 00:00:00",
																		"approved": "1",
																		"booking_id": "26"
																	  }
																	], ...
																	}
																	'season_customize_plugin':{
																		"2023-01-09": true,
																		"2023-01-10": true,
																		"2023-01-11": true, ...
																	}
																  }
																}
 * @param datepick_this			- this of datepick Obj
 *
 * @returns boolean
 */


function wpbc__inline_booking_calendar__on_days_select(dates_selection, calendar_params_arr) {
  var datepick_this = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

  // The same functions as in client.css			//TODO: 2023-06-30 17:22
  if (true) {
    var bk_type = calendar_params_arr.resource_id;
    var date = dates_selection; // Set unselectable,  if only Availability Calendar  here (and we do not insert Booking form by mistake).

    var is_calendar_booking_unselectable = jQuery('#calendar_booking_unselectable' + bk_type); //FixIn: 8.0.1.2

    var is_booking_form_also = jQuery('#booking_form_div' + bk_type);

    if (is_calendar_booking_unselectable.length > 0 && is_booking_form_also.length <= 0) {
      wpbc_calendar__unselect_all_dates(bk_type);
      jQuery('.wpbc_only_calendar .popover_calendar_hover').remove(); //Hide all opened popovers

      return false;
    } //FixIn: 8.0.1.2 end


    jQuery('#date_booking' + bk_type).val(date);
    jQuery(".booking_form_div").trigger("date_selected", [bk_type, date]);
  } else {
    // Functionality  from  Booking > Availability page
    var inst = jQuery.datepick._getInst(document.getElementById('calendar_booking' + calendar_params_arr.resource_id));

    var dates_arr = []; //  [ "2023-04-09", "2023-04-10", "2023-04-11" ]

    if (-1 !== dates_selection.indexOf('~')) {
      // Range Days
      dates_arr = wpbc_get_dates_arr__from_dates_range_js({
        'dates_separator': ' ~ ',
        //  ' ~ '
        'dates': dates_selection // '2023-04-04 ~ 2023-04-07'

      });
    } else {
      // Multiple Days
      dates_arr = wpbc_get_dates_arr__from_dates_comma_separated_js({
        'dates_separator': ', ',
        //  ', '
        'dates': dates_selection // '2023-04-10, 2023-04-12, 2023-04-02, 2023-04-04'

      });
    }

    wpbc_avy_after_days_selection__show_help_info({
      'calendar__days_selection_mode': calendar_params_arr.calendar__days_selection_mode,
      'dates_arr': dates_arr,
      'dates_click_num': inst.dates.length,
      'popover_hints': calendar_params_arr.popover_hints
    });
  }

  return true;
}
/**
 * Show help info at the top  toolbar about selected dates and future actions
 *
 * @param params
 * 					Example 1:  {
									calendar__days_selection_mode: "dynamic",
									dates_arr:  [ "2023-04-03" ],
									dates_click_num: 1
									'popover_hints'					: calendar_params_arr.popover_hints
								}
 * 					Example 2:  {
									calendar__days_selection_mode: "dynamic"
									dates_arr: Array(10) [ "2023-04-03", "2023-04-04", "2023-04-05", … ]
									dates_click_num: 2
									'popover_hints'					: calendar_params_arr.popover_hints
								}
 */


function wpbc_avy_after_days_selection__show_help_info(params) {
  // console.log( params );	//		[ "2023-04-09", "2023-04-10", "2023-04-11" ]
  var message, color;

  if (jQuery('#ui_btn_cstm__set_days_customize_plugin__available').is(':checked')) {
    message = params.popover_hints.toolbar_text_available; //'Set dates _DATES_ as _HTML_ available.';

    color = '#11be4c';
  } else {
    message = params.popover_hints.toolbar_text_unavailable; //'Set dates _DATES_ as _HTML_ unavailable.';

    color = '#e43939';
  }

  message = '<span>' + message + '</span>';
  var first_date = params['dates_arr'][0];
  var last_date = 'dynamic' == params.calendar__days_selection_mode ? params['dates_arr'][params['dates_arr'].length - 1] : params['dates_arr'].length > 1 ? params['dates_arr'][1] : '';
  first_date = jQuery.datepick.formatDate('dd M, yy', new Date(first_date + 'T00:00:00'));
  last_date = jQuery.datepick.formatDate('dd M, yy', new Date(last_date + 'T00:00:00'));

  if ('dynamic' == params.calendar__days_selection_mode) {
    if (1 == params.dates_click_num) {
      last_date = '___________';
    } else {
      if ('first_time' == jQuery('.wpbc_ajx_customize_plugin_container').attr('wpbc_loaded')) {
        jQuery('.wpbc_ajx_customize_plugin_container').attr('wpbc_loaded', 'done');
        wpbc_blink_element('.wpbc_widget_change_calendar_skin', 3, 220);
      }
    }

    message = message.replace('_DATES_', '</span>' //+ '<div>' + 'from' + '</div>'
    + '<span class="wpbc_big_date">' + first_date + '</span>' + '<span>' + '-' + '</span>' + '<span class="wpbc_big_date">' + last_date + '</span>' + '<span>');
  } else {
    // if ( params[ 'dates_arr' ].length > 1 ){
    // 	last_date = ', ' + last_date;
    // 	last_date += ( params[ 'dates_arr' ].length > 2 ) ? ', ...' : '';
    // } else {
    // 	last_date='';
    // }
    var dates_arr = [];

    for (var i = 0; i < params['dates_arr'].length; i++) {
      dates_arr.push(jQuery.datepick.formatDate('dd M yy', new Date(params['dates_arr'][i] + 'T00:00:00')));
    }

    first_date = dates_arr.join(', ');
    message = message.replace('_DATES_', '</span>' + '<span class="wpbc_big_date">' + first_date + '</span>' + '<span>');
  }

  message = message.replace('_HTML_', '</span><span class="wpbc_big_text" style="color:' + color + ';">') + '<span>'; //message += ' <div style="margin-left: 1em;">' + ' Click on Apply button to apply customize_plugin.' + '</div>';

  message = '<div class="wpbc_toolbar_dates_hints">' + message + '</div>';
  jQuery('.wpbc_help_text').html(message);
}
/**
 *   Parse dates  ------------------------------------------------------------------------------------------- */

/**
 * Get dates array,  from comma separated dates
 *
 * @param params       = {
									* 'dates_separator' => ', ',                                        // Dates separator
									* 'dates'           => '2023-04-04, 2023-04-07, 2023-04-05'         // Dates in 'Y-m-d' format: '2023-01-31'
						 }
 *
 * @return array      = [
									* [0] => 2023-04-04
									* [1] => 2023-04-05
									* [2] => 2023-04-06
									* [3] => 2023-04-07
						]
 *
 * Example #1:  wpbc_get_dates_arr__from_dates_comma_separated_js(  {  'dates_separator' : ', ', 'dates' : '2023-04-04, 2023-04-07, 2023-04-05'  }  );
 */


function wpbc_get_dates_arr__from_dates_comma_separated_js(params) {
  var dates_arr = [];

  if ('' !== params['dates']) {
    dates_arr = params['dates'].split(params['dates_separator']);
    dates_arr.sort();
  }

  return dates_arr;
}
/**
 * Get dates array,  from range days selection
 *
 * @param params       =  {
									* 'dates_separator' => ' ~ ',                         // Dates separator
									* 'dates'           => '2023-04-04 ~ 2023-04-07'      // Dates in 'Y-m-d' format: '2023-01-31'
						  }
 *
 * @return array        = [
									* [0] => 2023-04-04
									* [1] => 2023-04-05
									* [2] => 2023-04-06
									* [3] => 2023-04-07
						  ]
 *
 * Example #1:  wpbc_get_dates_arr__from_dates_range_js(  {  'dates_separator' : ' ~ ', 'dates' : '2023-04-04 ~ 2023-04-07'  }  );
 * Example #2:  wpbc_get_dates_arr__from_dates_range_js(  {  'dates_separator' : ' - ', 'dates' : '2023-04-04 - 2023-04-07'  }  );
 */


function wpbc_get_dates_arr__from_dates_range_js(params) {
  var dates_arr = [];

  if ('' !== params['dates']) {
    dates_arr = params['dates'].split(params['dates_separator']);
    var check_in_date_ymd = dates_arr[0];
    var check_out_date_ymd = dates_arr[1];

    if ('' !== check_in_date_ymd && '' !== check_out_date_ymd) {
      dates_arr = wpbc_get_dates_array_from_start_end_days_js(check_in_date_ymd, check_out_date_ymd);
    }
  }

  return dates_arr;
}
/**
 * Get dates array based on start and end dates.
 *
 * @param string sStartDate - start date: 2023-04-09
 * @param string sEndDate   - end date:   2023-04-11
 * @return array             - [ "2023-04-09", "2023-04-10", "2023-04-11" ]
 */


function wpbc_get_dates_array_from_start_end_days_js(sStartDate, sEndDate) {
  sStartDate = new Date(sStartDate + 'T00:00:00');
  sEndDate = new Date(sEndDate + 'T00:00:00');
  var aDays = []; // Start the variable off with the start date

  aDays.push(sStartDate.getTime()); // Set a 'temp' variable, sCurrentDate, with the start date - before beginning the loop

  var sCurrentDate = new Date(sStartDate.getTime());
  var one_day_duration = 24 * 60 * 60 * 1000; // While the current date is less than the end date

  while (sCurrentDate < sEndDate) {
    // Add a day to the current date "+1 day"
    sCurrentDate.setTime(sCurrentDate.getTime() + one_day_duration); // Add this new day to the aDays array

    aDays.push(sCurrentDate.getTime());
  }

  for (var i = 0; i < aDays.length; i++) {
    aDays[i] = new Date(aDays[i]);
    aDays[i] = aDays[i].getFullYear() + '-' + (aDays[i].getMonth() + 1 < 10 ? '0' : '') + (aDays[i].getMonth() + 1) + '-' + (aDays[i].getDate() < 10 ? '0' : '') + aDays[i].getDate();
  } // Once the loop has finished, return the array of days.


  return aDays;
}
/**
 * Scroll to  specific "Year & Month" 	in Inline Booking Calendar
 *
 * @param {number} resource_id		1
 * @param {number} year				2023
 * @param {number} month			12			(from 1 to  12)
 *
 * @returns {boolean}			// changed or not
 */


function wpbc__inline_booking_calendar__change_year_month(resource_id, year, month) {
  var inst = jQuery.datepick._getInst(document.getElementById('calendar_booking' + resource_id));

  if (false != inst) {
    year = parseInt(year);
    month = parseInt(month) - 1;
    inst.cursorDate = new Date();
    inst.cursorDate.setFullYear(year, month, 1);
    inst.cursorDate.setMonth(month); // In some cases,  the setFullYear can  set  only Year,  and not the Month and day      //FixIn:6.2.3.5

    inst.cursorDate.setDate(1);
    inst.drawMonth = inst.cursorDate.getMonth();
    inst.drawYear = inst.cursorDate.getFullYear();

    jQuery.datepick._notifyChange(inst);

    jQuery.datepick._adjustInstDate(inst);

    jQuery.datepick._showDate(inst);

    jQuery.datepick._updateDatepick(inst);

    return true;
  }

  return false;
}
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluY2x1ZGVzL3BhZ2UtY3VzdG9taXplL19zcmMvY3VzdG9taXplX19pbmxpbmVfY2FsZW5kYXIuanMiXSwibmFtZXMiOlsid3BiY19hc3NpZ25fZ2xvYmFsX2pzX2Zvcl9jYWxlbmRhciIsImNhbGVuZGFyX3BhcmFtc19hcnIiLCJ3cGJjX3Nob3dfaW5saW5lX2Jvb2tpbmdfY2FsZW5kYXIiLCJqUXVlcnkiLCJodG1sX2lkIiwibGVuZ3RoIiwiaGFzQ2xhc3MiLCJ0ZXh0IiwiZGF0ZXBpY2siLCJiZWZvcmVTaG93RGF5IiwiZGF0ZSIsIndwYmNfX2lubGluZV9ib29raW5nX2NhbGVuZGFyX19hcHBseV9jc3NfdG9fZGF5cyIsIm9uU2VsZWN0IiwidGV4dF9pZCIsInZhbCIsIndwYmNfX2lubGluZV9ib29raW5nX2NhbGVuZGFyX19vbl9kYXlzX3NlbGVjdCIsIm9uSG92ZXIiLCJ2YWx1ZSIsIndwYmNfX2lubGluZV9ib29raW5nX2NhbGVuZGFyX19vbl9kYXlzX2hvdmVyIiwib25DaGFuZ2VNb250aFllYXIiLCJ5ZWFyIiwibW9udGgiLCJ3cGJjX19pbmxpbmVfYm9va2luZ19jYWxlbmRhcl9fb25fY2hhbmdlX3llYXJfbW9udGgiLCJzaG93T24iLCJudW1iZXJPZk1vbnRocyIsImNhbGVuZGFyX192aWV3X192aXNpYmxlX21vbnRocyIsInN0ZXBNb250aHMiLCJwcmV2VGV4dCIsIm5leHRUZXh0IiwiZGF0ZUZvcm1hdCIsImNoYW5nZU1vbnRoIiwiY2hhbmdlWWVhciIsIm1pbkRhdGUiLCJtYXhEYXRlIiwiY2FsZW5kYXJfX2Jvb2tpbmdfbWF4X21vbnRoZXNfaW5fY2FsZW5kYXIiLCJzaG93U3RhdHVzIiwiY2xvc2VBdFRvcCIsImZpcnN0RGF5IiwiY2FsZW5kYXJfX2Jvb2tpbmdfc3RhcnRfZGF5X3dlZWVrIiwiZ290b0N1cnJlbnQiLCJoaWRlSWZOb1ByZXZOZXh0IiwibXVsdGlTZXBhcmF0b3IiLCJtdWx0aVNlbGVjdCIsImNhbGVuZGFyX19kYXlzX3NlbGVjdGlvbl9tb2RlIiwicmFuZ2VTZWxlY3QiLCJyYW5nZVNlcGFyYXRvciIsInVzZVRoZW1lUm9sbGVyIiwiZGF0ZXBpY2tfdGhpcyIsImluc3QiLCJfZ2V0SW5zdCIsInRyaWdnZXIiLCJkcmF3WWVhciIsImRyYXdNb250aCIsInRvZGF5X2RhdGUiLCJEYXRlIiwiX3dwYmMiLCJnZXRfb3RoZXJfcGFyYW0iLCJwYXJzZUludCIsImNsYXNzX2RheSIsImdldE1vbnRoIiwiZ2V0RGF0ZSIsImdldEZ1bGxZZWFyIiwic3FsX2NsYXNzX2RheSIsIndwYmNfX2dldF9fc3FsX2NsYXNzX2RhdGUiLCJjc3NfZGF0ZV9fc3RhbmRhcmQiLCJjc3NfZGF0ZV9fYWRkaXRpb25hbCIsImdldERheSIsImkiLCJ3cGJjX2RhdGVzX19kYXlzX2JldHdlZW4iLCJpc19kYXRlX2F2YWlsYWJsZSIsInNlYXNvbl9jdXN0b21pemVfcGx1Z2luIiwid3BkZXZfaW5fYXJyYXkiLCJyZXNvdXJjZV91bmF2YWlsYWJsZV9kYXRlcyIsImJvb2tlZF9kYXRlcyIsImJvb2tpbmdzX2luX2RhdGUiLCJhcHByb3ZlZCIsIk9iamVjdCIsImtleXMiLCJpc19hcHByb3ZlZCIsIl8iLCJlYWNoIiwicF92YWwiLCJwX2tleSIsInBfZGF0YSIsInRzIiwiYm9va2luZ19kYXRlIiwic3Vic3RyaW5nIiwiYmtfdHlwZSIsInJlc291cmNlX2lkIiwiaXNfY2FsZW5kYXJfYm9va2luZ191bnNlbGVjdGFibGUiLCJpc19ib29raW5nX2Zvcm1fYWxzbyIsInJlbW92ZUNsYXNzIiwiY3NzIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImRhdGVzIiwidGRfY2xhc3MiLCJ0ZF9vdmVycyIsImlzX2NoZWNrIiwic2VsY2V0ZWRfZmlyc3RfZGF5Iiwic2V0RnVsbFllYXIiLCJhZGRDbGFzcyIsImRhdGVzX3NlbGVjdGlvbiIsIndwYmNfY2FsZW5kYXJfX3Vuc2VsZWN0X2FsbF9kYXRlcyIsInJlbW92ZSIsImRhdGVzX2FyciIsImluZGV4T2YiLCJ3cGJjX2dldF9kYXRlc19hcnJfX2Zyb21fZGF0ZXNfcmFuZ2VfanMiLCJ3cGJjX2dldF9kYXRlc19hcnJfX2Zyb21fZGF0ZXNfY29tbWFfc2VwYXJhdGVkX2pzIiwid3BiY19hdnlfYWZ0ZXJfZGF5c19zZWxlY3Rpb25fX3Nob3dfaGVscF9pbmZvIiwicG9wb3Zlcl9oaW50cyIsInBhcmFtcyIsIm1lc3NhZ2UiLCJjb2xvciIsImlzIiwidG9vbGJhcl90ZXh0X2F2YWlsYWJsZSIsInRvb2xiYXJfdGV4dF91bmF2YWlsYWJsZSIsImZpcnN0X2RhdGUiLCJsYXN0X2RhdGUiLCJmb3JtYXREYXRlIiwiZGF0ZXNfY2xpY2tfbnVtIiwiYXR0ciIsIndwYmNfYmxpbmtfZWxlbWVudCIsInJlcGxhY2UiLCJwdXNoIiwiam9pbiIsImh0bWwiLCJzcGxpdCIsInNvcnQiLCJjaGVja19pbl9kYXRlX3ltZCIsImNoZWNrX291dF9kYXRlX3ltZCIsIndwYmNfZ2V0X2RhdGVzX2FycmF5X2Zyb21fc3RhcnRfZW5kX2RheXNfanMiLCJzU3RhcnREYXRlIiwic0VuZERhdGUiLCJhRGF5cyIsImdldFRpbWUiLCJzQ3VycmVudERhdGUiLCJvbmVfZGF5X2R1cmF0aW9uIiwic2V0VGltZSIsIndwYmNfX2lubGluZV9ib29raW5nX2NhbGVuZGFyX19jaGFuZ2VfeWVhcl9tb250aCIsImN1cnNvckRhdGUiLCJzZXRNb250aCIsInNldERhdGUiLCJfbm90aWZ5Q2hhbmdlIiwiX2FkanVzdEluc3REYXRlIiwiX3Nob3dEYXRlIiwiX3VwZGF0ZURhdGVwaWNrIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBLFNBQVNBLGtDQUFULENBQTZDQyxtQkFBN0MsRUFBa0UsQ0FDbEU7QUFDQztBQUdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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dmFTY3JpcHQgdmFyaWFibGVzIGZvciBmcm9udC1lbmQgY2FsZW5kYXIgZm9yIGJhY2t3YXJkIGNvbXBhdGliaWxpdHlcclxuICpcclxuICogQHBhcmFtIGNhbGVuZGFyX3BhcmFtc19hcnIgZXhhbXBsZTp7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQnaHRtbF9pZCcgICAgICAgICAgIDogJ2NhbGVuZGFyX2Jvb2tpbmcnICsgY2FsZW5kYXJfcGFyYW1zX2Fyci5hanhfY2xlYW5lZF9wYXJhbXMucmVzb3VyY2VfaWQsXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQndGV4dF9pZCcgICAgICAgICAgIDogJ2RhdGVfYm9va2luZycgKyBjYWxlbmRhcl9wYXJhbXNfYXJyLmFqeF9jbGVhbmVkX3BhcmFtcy5yZXNvdXJjZV9pZCxcclxuXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQnY2FsZW5kYXJfX2Jvb2tpbmdfc3RhcnRfZGF5X3dlZWVrJzogXHQgIGNhbGVuZGFyX3BhcmFtc19hcnIuYWp4X2NsZWFuZWRfcGFyYW1zLmNhbGVuZGFyX19ib29raW5nX3N0YXJ0X2RheV93ZWVlayxcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdCdjYWxlbmRhcl9fdmlld19fdmlzaWJsZV9tb250aHMnOiBjYWxlbmRhcl9wYXJhbXNfYXJyLmFqeF9jbGVhbmVkX3BhcmFtcy5jYWxlbmRhcl9fdmlld19fdmlzaWJsZV9tb250aHMsXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQnY2FsZW5kYXJfX2RheXNfc2VsZWN0aW9uX21vZGUnOiAgY2FsZW5kYXJfcGFyYW1zX2Fyci5hanhfY2xlYW5lZF9wYXJhbXMuY2FsZW5kYXJfX2RheXNfc2VsZWN0aW9uX21vZGUsXHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0J3Jlc291cmNlX2lkJyAgICAgICAgOiBjYWxlbmRhcl9wYXJhbXNfYXJyLmFqeF9jbGVhbmVkX3BhcmFtcy5yZXNvdXJjZV9pZCxcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdCdhanhfbm9uY2VfY2FsZW5kYXInIDogY2FsZW5kYXJfcGFyYW1zX2Fyci5hanhfZGF0YV9hcnIuYWp4X25vbmNlX2NhbGVuZGFyLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0J2Jvb2tlZF9kYXRlcycgICAgICAgOiBjYWxlbmRhcl9wYXJhbXNfYXJyLmFqeF9kYXRhX2Fyci5ib29rZWRfZGF0ZXMsXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQnc2Vhc29uX2N1c3RvbWl6ZV9wbHVnaW4nOiBjYWxlbmRhcl9wYXJhbXNfYXJyLmFqeF9kYXRhX2Fyci5zZWFzb25fY3VzdG9taXplX3BsdWdpbixcclxuXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQncmVzb3VyY2VfdW5hdmFpbGFibGVfZGF0ZXMnIDogY2FsZW5kYXJfcGFyYW1zX2Fyci5hanhfZGF0YV9hcnIucmVzb3VyY2VfdW5hdmFpbGFibGVfZGF0ZXNcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XHJcbiAqL1xyXG5mdW5jdGlvbiB3cGJjX2Fzc2lnbl9nbG9iYWxfanNfZm9yX2NhbGVuZGFyKCBjYWxlbmRhcl9wYXJhbXNfYXJyICl7XHJcbi8vVE9ETzogbmVlZCB0byAgdGVzdCBpdCBiZWZvcmUgcmVtb3ZlXHJcbn1cclxuXHJcblxyXG4vKipcclxuICogXHRMb2FkIERhdGVwaWNrIElubGluZSBjYWxlbmRhclxyXG4gKlxyXG4gKiBAcGFyYW0gY2FsZW5kYXJfcGFyYW1zX2Fyclx0XHRleGFtcGxlOntcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdCdodG1sX2lkJyAgICAgICAgICAgOiAnY2FsZW5kYXJfYm9va2luZycgKyBjYWxlbmRhcl9wYXJhbXNfYXJyLmFqeF9jbGVhbmVkX3BhcmFtcy5yZXNvdXJjZV9pZCxcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdCd0ZXh0X2lkJyAgICAgICAgICAgOiAnZGF0ZV9ib29raW5nJyArIGNhbGVuZGFyX3BhcmFtc19hcnIuYWp4X2NsZWFuZWRfcGFyYW1zLnJlc291cmNlX2lkLFxyXG5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdCdjYWxlbmRhcl9fYm9va2luZ19zdGFydF9kYXlfd2VlZWsnOiBcdCAgY2FsZW5kYXJfcGFyYW1zX2Fyci5hanhfY2xlYW5lZF9wYXJhbXMuY2FsZW5kYXJfX2Jvb2tpbmdfc3RhcnRfZGF5X3dlZWVrLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0J2NhbGVuZGFyX192aWV3X192aXNpYmxlX21vbnRocyc6IGNhbGVuZGFyX3BhcmFtc19hcnIuYWp4X2NsZWFuZWRfcGFyYW1zLmNhbGVuZGFyX192aWV3X192aXNpYmxlX21vbnRocyxcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdCdjYWxlbmRhcl9fZGF5c19zZWxlY3Rpb25fbW9kZSc6ICBjYWxlbmRhcl9wYXJhbXNfYXJyLmFqeF9jbGVhbmVkX3BhcmFtcy5jYWxlbmRhcl9fZGF5c19zZWxlY3Rpb25fbW9kZSxcclxuXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQncmVzb3VyY2VfaWQnICAgICAgICA6IGNhbGVuZGFyX3BhcmFtc19hcnIuYWp4X2NsZWFuZWRfcGFyYW1zLnJlc291cmNlX2lkLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0J2FqeF9ub25jZV9jYWxlbmRhcicgOiBjYWxlbmRhcl9wYXJhbXNfYXJyLmFqeF9kYXRhX2Fyci5hanhfbm9uY2VfY2FsZW5kYXIsXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQnYm9va2VkX2RhdGVzJyAgICAgICA6IGNhbGVuZGFyX3BhcmFtc19hcnIuYWp4X2RhdGFfYXJyLmNhbGVuZGFyX3NldHRpbmdzLmJvb2tlZF9kYXRlcyxcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdCdzZWFzb25fY3VzdG9taXplX3BsdWdpbic6IGNhbGVuZGFyX3BhcmFtc19hcnIuYWp4X2RhdGFfYXJyLnNlYXNvbl9jdXN0b21pemVfcGx1Z2luLFxyXG5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdCdyZXNvdXJjZV91bmF2YWlsYWJsZV9kYXRlcycgOiBjYWxlbmRhcl9wYXJhbXNfYXJyLmFqeF9kYXRhX2Fyci5yZXNvdXJjZV91bmF2YWlsYWJsZV9kYXRlc1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cclxuICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAqL1xyXG5mdW5jdGlvbiB3cGJjX3Nob3dfaW5saW5lX2Jvb2tpbmdfY2FsZW5kYXIoIGNhbGVuZGFyX3BhcmFtc19hcnIgKXtcclxuXHJcblx0aWYgKFxyXG5cdFx0ICAgKCAwID09PSBqUXVlcnkoICcjJyArIGNhbGVuZGFyX3BhcmFtc19hcnIuaHRtbF9pZCApLmxlbmd0aCApXHRcdFx0XHRcdFx0XHQvLyBJZiBjYWxlbmRhciBET00gZWxlbWVudCBub3QgZXhpc3QgdGhlbiBleGlzdFxyXG5cdFx0fHwgKCB0cnVlID09PSBqUXVlcnkoICcjJyArIGNhbGVuZGFyX3BhcmFtc19hcnIuaHRtbF9pZCApLmhhc0NsYXNzKCAnaGFzRGF0ZXBpY2snICkgKVx0Ly8gSWYgdGhlIGNhbGVuZGFyIHdpdGggdGhlIHNhbWUgQm9va2luZyByZXNvdXJjZSBhbHJlYWR5ICBoYXMgYmVlbiBhY3RpdmF0ZWQsIHRoZW4gZXhpc3QuXHJcblx0KXtcclxuXHQgICByZXR1cm4gZmFsc2U7XHJcblx0fVxyXG5cclxuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdC8vICBKYXZhU2NyaXB0IHZhcmlhYmxlcyBmb3IgZnJvbnQtZW5kIGNhbGVuZGFyXHJcblx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHR3cGJjX2Fzc2lnbl9nbG9iYWxfanNfZm9yX2NhbGVuZGFyKCBjYWxlbmRhcl9wYXJhbXNfYXJyICk7XHJcblxyXG5cclxuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdC8vIENvbmZpZ3VyZSBhbmQgc2hvdyBjYWxlbmRhclxyXG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblx0alF1ZXJ5KCAnIycgKyBjYWxlbmRhcl9wYXJhbXNfYXJyLmh0bWxfaWQgKS50ZXh0KCAnJyApO1xyXG5cdGpRdWVyeSggJyMnICsgY2FsZW5kYXJfcGFyYW1zX2Fyci5odG1sX2lkICkuZGF0ZXBpY2soe1xyXG5cdFx0XHRcdFx0YmVmb3JlU2hvd0RheTogXHRmdW5jdGlvbiAoIGRhdGUgKXtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gd3BiY19faW5saW5lX2Jvb2tpbmdfY2FsZW5kYXJfX2FwcGx5X2Nzc190b19kYXlzKCBkYXRlLCBjYWxlbmRhcl9wYXJhbXNfYXJyLCB0aGlzICk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdH0sXHJcbiAgICAgICAgICAgICAgICAgICAgb25TZWxlY3Q6IFx0ICBcdGZ1bmN0aW9uICggZGF0ZSApe1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGpRdWVyeSggJyMnICsgY2FsZW5kYXJfcGFyYW1zX2Fyci50ZXh0X2lkICkudmFsKCBkYXRlICk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0Ly93cGJjX2JsaW5rX2VsZW1lbnQoJy53cGJjX3dpZGdldF9jaGFuZ2VfY2FsZW5kYXJfc2tpbicsIDMsIDIyMCk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIHdwYmNfX2lubGluZV9ib29raW5nX2NhbGVuZGFyX19vbl9kYXlzX3NlbGVjdCggZGF0ZSwgY2FsZW5kYXJfcGFyYW1zX2FyciwgdGhpcyApO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR9LFxyXG4gICAgICAgICAgICAgICAgICAgIG9uSG92ZXI6IFx0XHRmdW5jdGlvbiAoIHZhbHVlLCBkYXRlICl7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0Ly93cGJjX2NzdG1fX3ByZXBhcmVfdG9vbHRpcF9faW5fY2FsZW5kYXIoIHZhbHVlLCBkYXRlLCBjYWxlbmRhcl9wYXJhbXNfYXJyLCB0aGlzICk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIHdwYmNfX2lubGluZV9ib29raW5nX2NhbGVuZGFyX19vbl9kYXlzX2hvdmVyKCB2YWx1ZSwgZGF0ZSwgY2FsZW5kYXJfcGFyYW1zX2FyciwgdGhpcyApO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR9LFxyXG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlTW9udGhZZWFyOlx0Ly9udWxsLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGZ1bmN0aW9uICggeWVhciwgbW9udGggKXtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiB3cGJjX19pbmxpbmVfYm9va2luZ19jYWxlbmRhcl9fb25fY2hhbmdlX3llYXJfbW9udGgoIHllYXIsIG1vbnRoLCBjYWxlbmRhcl9wYXJhbXNfYXJyLCB0aGlzICk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0fSxcclxuICAgICAgICAgICAgICAgICAgICBzaG93T246IFx0XHRcdCdib3RoJyxcclxuICAgICAgICAgICAgICAgICAgICBudW1iZXJPZk1vbnRoczogXHRjYWxlbmRhcl9wYXJhbXNfYXJyLmNhbGVuZGFyX192aWV3X192aXNpYmxlX21vbnRocyxcclxuICAgICAgICAgICAgICAgICAgICBzdGVwTW9udGhzOlx0XHRcdDEsXHJcbiAgICAgICAgICAgICAgICAgICAgcHJldlRleHQ6IFx0XHRcdCcmbGFxdW87JyxcclxuICAgICAgICAgICAgICAgICAgICBuZXh0VGV4dDogXHRcdFx0JyZyYXF1bzsnLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGVGb3JtYXQ6IFx0XHQnZGQubW0ueXknLFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vICd5eS1tbS1kZCcsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlTW9udGg6IFx0XHRmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2VZZWFyOiBcdFx0ZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgbWluRGF0ZTogXHRcdFx0MCxcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Ly9udWxsLCAgXHQvLyBTY3JvbGwgYXMgbG9uZyBhcyB5b3UgbmVlZFxyXG5cdFx0XHRcdFx0bWF4RGF0ZTogXHRcdFx0Y2FsZW5kYXJfcGFyYW1zX2Fyci5jYWxlbmRhcl9fYm9va2luZ19tYXhfbW9udGhlc19pbl9jYWxlbmRhcixcdFx0XHRcdFx0Ly8gbWluRGF0ZTogbmV3IERhdGUoMjAyMCwgMiwgMSksIG1heERhdGU6IG5ldyBEYXRlKDIwMjAsIDksIDMxKSwgXHQvLyBBYmlsaXR5IHRvIHNldCBhbnkgIHN0YXJ0IGFuZCBlbmQgZGF0ZSBpbiBjYWxlbmRhclxyXG4gICAgICAgICAgICAgICAgICAgIHNob3dTdGF0dXM6IFx0XHRmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBjbG9zZUF0VG9wOiBcdFx0ZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgZmlyc3REYXk6XHRcdFx0Y2FsZW5kYXJfcGFyYW1zX2Fyci5jYWxlbmRhcl9fYm9va2luZ19zdGFydF9kYXlfd2VlZWssXHJcbiAgICAgICAgICAgICAgICAgICAgZ290b0N1cnJlbnQ6IFx0XHRmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBoaWRlSWZOb1ByZXZOZXh0Olx0dHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBtdWx0aVNlcGFyYXRvcjogXHQnLCAnLFxyXG5cdFx0XHRcdFx0LyogICdtdWx0aVNlbGVjdCcgY2FuICBiZSAwICAgZm9yICdzaW5nbGUnLCAnZHluYW1pYydcclxuXHRcdFx0XHRcdCAgXHRcdFx0ICBhbmQgY2FuICBiZSAzNjUgZm9yICdtdWx0aXBsZScsICdmaXhlZCdcclxuXHRcdFx0XHRcdCAgXHRcdFx0ICBcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vIE1heGltdW0gbnVtYmVyIG9mIHNlbGVjdGFibGUgZGF0ZXM6XHQgU2luZ2xlIGRheSA9IDAsICBtdWx0aSBkYXlzID0gMzY1XHJcblx0XHRcdFx0XHQgKi9cclxuXHRcdFx0XHRcdG11bHRpU2VsZWN0OiAgKFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdCAgICggJ3NpbmdsZScgID09IGNhbGVuZGFyX3BhcmFtc19hcnIuY2FsZW5kYXJfX2RheXNfc2VsZWN0aW9uX21vZGUgKVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHx8ICggJ2R5bmFtaWMnID09IGNhbGVuZGFyX3BhcmFtc19hcnIuY2FsZW5kYXJfX2RheXNfc2VsZWN0aW9uX21vZGUgKVxyXG5cdFx0XHRcdFx0XHRcdFx0XHQgICA/IDBcclxuXHRcdFx0XHRcdFx0XHRcdFx0ICAgOiAzNjVcclxuXHRcdFx0XHRcdFx0XHRcdCAgKSxcclxuXHRcdFx0XHRcdC8qICAncmFuZ2VTZWxlY3QnIHRydWUgIGZvciAnZHluYW1pYydcclxuXHRcdFx0XHRcdFx0XHRcdFx0ICBmYWxzZSBmb3IgJ3NpbmdsZScsICdtdWx0aXBsZScsICdmaXhlZCdcclxuXHRcdFx0XHRcdCAqL1xyXG5cdFx0XHRcdFx0cmFuZ2VTZWxlY3Q6ICAoJ2R5bmFtaWMnID09IGNhbGVuZGFyX3BhcmFtc19hcnIuY2FsZW5kYXJfX2RheXNfc2VsZWN0aW9uX21vZGUpLFxyXG5cdFx0XHRcdFx0cmFuZ2VTZXBhcmF0b3I6ICcgLSAnLCBcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Ly9cdCcgfiAnLFx0Ly8nIC0gJyxcclxuICAgICAgICAgICAgICAgICAgICAvLyBzaG93V2Vla3M6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgdXNlVGhlbWVSb2xsZXI6XHRcdGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuXHJcblx0cmV0dXJuICB0cnVlO1xyXG59XHJcblxyXG5cclxuXHJcblx0LyoqXHJcblx0ICogV2hlbiAgd2Ugc2Nyb2xsICBtb250aCBpbiBjYWxlbmRhciAgdGhlbiAgdHJpZ2dlciBzcGVjaWZpYyBldmVudFxyXG5cdCAqIEBwYXJhbSB5ZWFyXHJcblx0ICogQHBhcmFtIG1vbnRoXHJcblx0ICogQHBhcmFtIGNhbGVuZGFyX3BhcmFtc19hcnJcclxuXHQgKiBAcGFyYW0gZGF0ZXBpY2tfdGhpc1xyXG5cdCAqL1xyXG5cdGZ1bmN0aW9uIHdwYmNfX2lubGluZV9ib29raW5nX2NhbGVuZGFyX19vbl9jaGFuZ2VfeWVhcl9tb250aCggeWVhciwgbW9udGgsIGNhbGVuZGFyX3BhcmFtc19hcnIsIGRhdGVwaWNrX3RoaXMgKXtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqICAgV2UgbmVlZCB0byB1c2UgaW5zdC5kcmF3TW9udGggIGluc3RlYWQgb2YgbW9udGggdmFyaWFibGUuXHJcblx0XHQgKiAgIEl0IGlzIGJlY2F1c2UsICBlYWNoICB0aW1lLCAgd2hlbiB3ZSB1c2UgZHluYW1pYyBhcm5nZSBzZWxlY3Rpb24sICB0aGUgbW9udGggaGVyZSBhcmUgZGlmZmVyZW50XHJcblx0XHQgKi9cclxuXHJcblx0XHR2YXIgaW5zdCA9IGpRdWVyeS5kYXRlcGljay5fZ2V0SW5zdCggZGF0ZXBpY2tfdGhpcyApO1xyXG5cclxuXHRcdGpRdWVyeSggJ2JvZHknICkudHJpZ2dlciggXHQgICd3cGJjX19pbmxpbmVfYm9va2luZ19jYWxlbmRhcl9fY2hhbmdlZF95ZWFyX21vbnRoJ1x0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Ly8gZXZlbnQgbmFtZVxyXG5cdFx0XHRcdFx0XHRcdFx0IFx0LCBbaW5zdC5kcmF3WWVhciwgKGluc3QuZHJhd01vbnRoKzEpLCBjYWxlbmRhcl9wYXJhbXNfYXJyLCBkYXRlcGlja190aGlzXVxyXG5cdFx0XHRcdFx0XHRcdFx0KTtcclxuXHRcdC8vIFRvIGNhdGNoIHRoaXMgZXZlbnQ6IGpRdWVyeSggJ2JvZHknICkub24oJ3dwYmNfX2lubGluZV9ib29raW5nX2NhbGVuZGFyX19jaGFuZ2VkX3llYXJfbW9udGgnLCBmdW5jdGlvbiggZXZlbnQsIHllYXIsIG1vbnRoLCBjYWxlbmRhcl9wYXJhbXNfYXJyLCBkYXRlcGlja190aGlzICkgeyAuLi4gfSApO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQXBwbHkgQ1NTIHRvIGNhbGVuZGFyIGRhdGUgY2VsbHNcclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBkYXRlXHRcdFx0XHRcdC0gIEphdmFTY3JpcHQgRGF0ZSBPYmo6ICBcdFx0TW9uIERlYyAxMSAyMDIzIDAwOjAwOjAwIEdNVCswMjAwIChFYXN0ZXJuIEV1cm9wZWFuIFN0YW5kYXJkIFRpbWUpXHJcblx0ICogQHBhcmFtIGNhbGVuZGFyX3BhcmFtc19hcnJcdC0gIENhbGVuZGFyIFNldHRpbmdzIE9iamVjdDogIFx0e1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0ICBcImh0bWxfaWRcIjogXCJjYWxlbmRhcl9ib29raW5nNFwiLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0ICBcInRleHRfaWRcIjogXCJkYXRlX2Jvb2tpbmc0XCIsXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQgIFwiY2FsZW5kYXJfX2Jvb2tpbmdfc3RhcnRfZGF5X3dlZWVrXCI6IDEsXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQgIFwiY2FsZW5kYXJfX3ZpZXdfX3Zpc2libGVfbW9udGhzXCI6IDEyLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0ICBcInJlc291cmNlX2lkXCI6IDQsXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQgIFwiYWp4X25vbmNlX2NhbGVuZGFyXCI6IFwiPGlucHV0IHR5cGU9XFxcImhpZGRlblxcXCIgLi4uIC8+XCIsXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQgIFwiYm9va2VkX2RhdGVzXCI6IHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XCIxMi0yOC0yMDIyXCI6IFtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0ICB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XCJib29raW5nX2RhdGVcIjogXCIyMDIyLTEyLTI4IDAwOjAwOjAwXCIsXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XCJhcHByb3ZlZFwiOiBcIjFcIixcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcImJvb2tpbmdfaWRcIjogXCIyNlwiXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCAgfVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRdLCAuLi5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQnc2Vhc29uX2N1c3RvbWl6ZV9wbHVnaW4nOntcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcIjIwMjMtMDEtMDlcIjogdHJ1ZSxcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcIjIwMjMtMDEtMTBcIjogdHJ1ZSxcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcIjIwMjMtMDEtMTFcIjogdHJ1ZSwgLi4uXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCAgfVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0fVxyXG5cdCAqIEBwYXJhbSBkYXRlcGlja190aGlzXHRcdFx0LSB0aGlzIG9mIGRhdGVwaWNrIE9ialxyXG5cdCAqXHJcblx0ICogQHJldHVybnMgW2Jvb2xlYW4sc3RyaW5nXVx0LSBbIHt0cnVlIC1hdmFpbGFibGUgfCBmYWxzZSAtIHVuYXZhaWxhYmxlfSwgJ0NTUyBjbGFzc2VzIGZvciBjYWxlbmRhciBkYXkgY2VsbCcgXVxyXG5cdCAqL1xyXG5cdGZ1bmN0aW9uIHdwYmNfX2lubGluZV9ib29raW5nX2NhbGVuZGFyX19hcHBseV9jc3NfdG9fZGF5cyggZGF0ZSwgY2FsZW5kYXJfcGFyYW1zX2FyciwgZGF0ZXBpY2tfdGhpcyApe1xyXG5cclxuXHRcdHZhciB0b2RheV9kYXRlID0gbmV3IERhdGUoIF93cGJjLmdldF9vdGhlcl9wYXJhbSggJ3RvZGF5X2FycicgKVsgMCBdLCAocGFyc2VJbnQoIF93cGJjLmdldF9vdGhlcl9wYXJhbSggJ3RvZGF5X2FycicgKVsgMSBdICkgLSAxKSwgX3dwYmMuZ2V0X290aGVyX3BhcmFtKCAndG9kYXlfYXJyJyApWyAyIF0sIDAsIDAsIDAgKTtcclxuXHJcblx0XHR2YXIgY2xhc3NfZGF5ICA9ICggZGF0ZS5nZXRNb250aCgpICsgMSApICsgJy0nICsgZGF0ZS5nZXREYXRlKCkgKyAnLScgKyBkYXRlLmdldEZ1bGxZZWFyKCk7XHRcdFx0XHRcdFx0Ly8gJzEtOS0yMDIzJ1xyXG5cdFx0dmFyIHNxbF9jbGFzc19kYXkgPSB3cGJjX19nZXRfX3NxbF9jbGFzc19kYXRlKCBkYXRlICk7XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Ly8gJzIwMjMtMDEtMDknXHJcblxyXG5cdFx0dmFyIGNzc19kYXRlX19zdGFuZGFyZCAgID0gICdjYWw0ZGF0ZS0nICsgY2xhc3NfZGF5O1xyXG5cdFx0dmFyIGNzc19kYXRlX19hZGRpdGlvbmFsID0gJyB3cGJjX3dlZWtkYXlfJyArIGRhdGUuZ2V0RGF5KCkgKyAnICc7XHJcblxyXG5cdFx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuXHRcdC8vIFdFRUtEQVlTIDo6IFNldCB1bmF2YWlsYWJsZSB3ZWVrIGRheXMgZnJvbSAtIFNldHRpbmdzIEdlbmVyYWwgcGFnZSBpbiBcIkF2YWlsYWJpbGl0eVwiIHNlY3Rpb25cclxuXHRcdGZvciAoIHZhciBpID0gMDsgaSA8IF93cGJjLmdldF9vdGhlcl9wYXJhbSggJ2F2YWlsYWJpbGl0eV9fd2Vla19kYXlzX3VuYXZhaWxhYmxlJyApLmxlbmd0aDsgaSsrICl7XHJcblx0XHRcdGlmICggZGF0ZS5nZXREYXkoKSA9PSBfd3BiYy5nZXRfb3RoZXJfcGFyYW0oICdhdmFpbGFiaWxpdHlfX3dlZWtfZGF5c191bmF2YWlsYWJsZScgKVsgaSBdICkge1xyXG5cdFx0XHRcdHJldHVybiBbIGZhbHNlLCBjc3NfZGF0ZV9fc3RhbmRhcmQgKyAnIGRhdGVfdXNlcl91bmF2YWlsYWJsZScgXHQrICcgd2Vla2RheXNfdW5hdmFpbGFibGUnIF07XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHQvLyBCRUZPUkVfQUZURVIgOjogU2V0IHVuYXZhaWxhYmxlIGRheXMgQmVmb3JlIC8gQWZ0ZXIgdGhlIFRvZGF5IGRhdGVcclxuXHRcdGlmICggXHQoICh3cGJjX2RhdGVzX19kYXlzX2JldHdlZW4oIGRhdGUsIHRvZGF5X2RhdGUgKSkgPCBwYXJzZUludChfd3BiYy5nZXRfb3RoZXJfcGFyYW0oICdhdmFpbGFiaWxpdHlfX3VuYXZhaWxhYmxlX2Zyb21fdG9kYXknICkpIClcclxuXHRcdFx0IHx8IChcclxuXHJcblx0XHRcdFx0ICAgKCBwYXJzZUludCggJzAnICsgcGFyc2VJbnQoIF93cGJjLmdldF9vdGhlcl9wYXJhbSggJ2F2YWlsYWJpbGl0eV9fYXZhaWxhYmxlX2Zyb21fdG9kYXknICkgKSApID4gMCApXHJcblx0XHRcdFx0JiYgKCB3cGJjX2RhdGVzX19kYXlzX2JldHdlZW4oIGRhdGUsIHRvZGF5X2RhdGUgKSA+IHBhcnNlSW50KCAnMCcgKyBwYXJzZUludCggX3dwYmMuZ2V0X290aGVyX3BhcmFtKCAnYXZhaWxhYmlsaXR5X19hdmFpbGFibGVfZnJvbV90b2RheScgKSApICkgKVxyXG5cdFx0XHRcdClcclxuXHRcdCl7XHJcblx0XHRcdHJldHVybiBbIGZhbHNlLCBjc3NfZGF0ZV9fc3RhbmRhcmQgKyAnIGRhdGVfdXNlcl91bmF2YWlsYWJsZScgXHRcdCsgJyBiZWZvcmVfYWZ0ZXJfdW5hdmFpbGFibGUnIF07XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gU0VBU09OUyA6OiAgXHRcdFx0XHRcdEJvb2tpbmcgPiBSZXNvdXJjZXMgPiBBdmFpbGFiaWxpdHkgcGFnZVxyXG5cdFx0dmFyICAgIGlzX2RhdGVfYXZhaWxhYmxlID0gY2FsZW5kYXJfcGFyYW1zX2Fyci5zZWFzb25fY3VzdG9taXplX3BsdWdpblsgc3FsX2NsYXNzX2RheSBdO1xyXG5cdFx0aWYgKCBmYWxzZSA9PT0gaXNfZGF0ZV9hdmFpbGFibGUgKXtcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Ly9GaXhJbjogOS41LjQuNFxyXG5cdFx0XHRyZXR1cm4gWyBmYWxzZSwgY3NzX2RhdGVfX3N0YW5kYXJkICsgJyBkYXRlX3VzZXJfdW5hdmFpbGFibGUnXHRcdCsgJyBzZWFzb25fdW5hdmFpbGFibGUnIF07XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gUkVTT1VSQ0VfVU5BVkFJTEFCTEUgOjogICBcdEJvb2tpbmcgPiBDdXN0b21pemUgcGFnZVxyXG5cdFx0aWYgKCB3cGRldl9pbl9hcnJheShjYWxlbmRhcl9wYXJhbXNfYXJyLnJlc291cmNlX3VuYXZhaWxhYmxlX2RhdGVzLCBzcWxfY2xhc3NfZGF5ICkgKXtcclxuXHRcdFx0aXNfZGF0ZV9hdmFpbGFibGUgPSBmYWxzZTtcclxuXHRcdH1cclxuXHRcdGlmICggIGZhbHNlID09PSBpc19kYXRlX2F2YWlsYWJsZSApe1x0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Ly9GaXhJbjogOS41LjQuNFxyXG5cdFx0XHRyZXR1cm4gWyBmYWxzZSwgY3NzX2RhdGVfX3N0YW5kYXJkICsgJyBkYXRlX3VzZXJfdW5hdmFpbGFibGUnXHRcdCsgJyByZXNvdXJjZV91bmF2YWlsYWJsZScgXTtcclxuXHRcdH1cclxuXHJcblx0XHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG5cclxuXHJcblxyXG5cdFx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuXHJcblx0XHQvLyBJcyBhbnkgYm9va2luZ3MgaW4gdGhpcyBkYXRlID9cclxuXHRcdGlmICggJ3VuZGVmaW5lZCcgIT09IHR5cGVvZiggY2FsZW5kYXJfcGFyYW1zX2Fyci5ib29rZWRfZGF0ZXNbIGNsYXNzX2RheSBdICkgKSB7XHJcblxyXG5cdFx0XHR2YXIgYm9va2luZ3NfaW5fZGF0ZSA9IGNhbGVuZGFyX3BhcmFtc19hcnIuYm9va2VkX2RhdGVzWyBjbGFzc19kYXkgXTtcclxuXHJcblxyXG5cdFx0XHRpZiAoICd1bmRlZmluZWQnICE9PSB0eXBlb2YoIGJvb2tpbmdzX2luX2RhdGVbICdzZWNfMCcgXSApICkge1x0XHRcdC8vIFwiRnVsbCBkYXlcIiBib29raW5nICAtPiAoc2Vjb25kcyA9PSAwKVxyXG5cclxuXHRcdFx0XHRjc3NfZGF0ZV9fYWRkaXRpb25hbCArPSAoICcwJyA9PT0gYm9va2luZ3NfaW5fZGF0ZVsgJ3NlY18wJyBdLmFwcHJvdmVkICkgPyAnIGRhdGUyYXBwcm92ZSAnIDogJyBkYXRlX2FwcHJvdmVkICc7XHRcdFx0XHQvLyBQZW5kaW5nID0gJzAnIHwgIEFwcHJvdmVkID0gJzEnXHJcblx0XHRcdFx0Y3NzX2RhdGVfX2FkZGl0aW9uYWwgKz0gJyBmdWxsX2RheV9ib29raW5nJztcclxuXHJcblx0XHRcdFx0cmV0dXJuIFsgZmFsc2UsIGNzc19kYXRlX19zdGFuZGFyZCArIGNzc19kYXRlX19hZGRpdGlvbmFsIF07XHJcblxyXG5cdFx0XHR9IGVsc2UgaWYgKCBPYmplY3Qua2V5cyggYm9va2luZ3NfaW5fZGF0ZSApLmxlbmd0aCA+IDAgKXtcdFx0XHRcdC8vIFwiVGltZSBzbG90c1wiIEJvb2tpbmdzXHJcblxyXG5cdFx0XHRcdHZhciBpc19hcHByb3ZlZCA9IHRydWU7XHJcblxyXG5cdFx0XHRcdF8uZWFjaCggYm9va2luZ3NfaW5fZGF0ZSwgZnVuY3Rpb24gKCBwX3ZhbCwgcF9rZXksIHBfZGF0YSApIHtcclxuXHRcdFx0XHRcdGlmICggIXBhcnNlSW50KCBwX3ZhbC5hcHByb3ZlZCApICl7XHJcblx0XHRcdFx0XHRcdGlzX2FwcHJvdmVkID0gZmFsc2U7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR2YXIgdHMgPSBwX3ZhbC5ib29raW5nX2RhdGUuc3Vic3RyaW5nKCBwX3ZhbC5ib29raW5nX2RhdGUubGVuZ3RoIC0gMSApO1xyXG5cdFx0XHRcdFx0aWYgKCB0cnVlID09PSBfd3BiYy5nZXRfb3RoZXJfcGFyYW0oICdpc19lbmFibGVkX2NoYW5nZV9vdmVyJyApICl7XHJcblx0XHRcdFx0XHRcdGlmICggdHMgPT0gJzEnICkgeyBjc3NfZGF0ZV9fYWRkaXRpb25hbCArPSAnIGNoZWNrX2luX3RpbWUnICsgKChwYXJzZUludChwX3ZhbC5hcHByb3ZlZCkpID8gJyBjaGVja19pbl90aW1lX2RhdGVfYXBwcm92ZWQnIDogJyBjaGVja19pbl90aW1lX2RhdGUyYXBwcm92ZScpOyB9XHJcblx0XHRcdFx0XHRcdGlmICggdHMgPT0gJzInICkgeyBjc3NfZGF0ZV9fYWRkaXRpb25hbCArPSAnIGNoZWNrX291dF90aW1lJyArICgocGFyc2VJbnQocF92YWwuYXBwcm92ZWQpKSA/ICcgY2hlY2tfb3V0X3RpbWVfZGF0ZV9hcHByb3ZlZCcgOiAnIGNoZWNrX291dF90aW1lX2RhdGUyYXBwcm92ZScpOyB9XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHRpZiAoICEgaXNfYXBwcm92ZWQgKXtcclxuXHRcdFx0XHRcdGNzc19kYXRlX19hZGRpdGlvbmFsICs9ICcgZGF0ZTJhcHByb3ZlIHRpbWVzcGFydGx5J1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRjc3NfZGF0ZV9fYWRkaXRpb25hbCArPSAnIGRhdGVfYXBwcm92ZWQgdGltZXNwYXJ0bHknXHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRpZiAoICEgX3dwYmMuZ2V0X290aGVyX3BhcmFtKCAnaXNfZW5hYmxlZF9jaGFuZ2Vfb3ZlcicgKSApe1xyXG5cdFx0XHRcdFx0Y3NzX2RhdGVfX2FkZGl0aW9uYWwgKz0gJyB0aW1lc19jbG9jaydcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHR9XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcblx0XHRyZXR1cm4gWyB0cnVlLCBjc3NfZGF0ZV9fc3RhbmRhcmQgKyBjc3NfZGF0ZV9fYWRkaXRpb25hbCArICcgZGF0ZV9hdmFpbGFibGUnIF07XHJcblx0fVxyXG5cclxuLy9UT0RPOiBuZWVkIHRvICB1c2Ugd3BiY19jYWxlbmRhciBzY3JpcHQsICBpbnN0ZWFkIG9mIHRoaXMgb25lXHJcblx0LyoqXHJcblx0ICogQXBwbHkgc29tZSBDU1MgY2xhc3Nlcywgd2hlbiB3ZSBtb3VzZSBvdmVyIHNwZWNpZmljIGRhdGVzIGluIGNhbGVuZGFyXHJcblx0ICogQHBhcmFtIHZhbHVlXHJcblx0ICogQHBhcmFtIGRhdGVcdFx0XHRcdFx0LSAgSmF2YVNjcmlwdCBEYXRlIE9iajogIFx0XHRNb24gRGVjIDExIDIwMjMgMDA6MDA6MDAgR01UKzAyMDAgKEVhc3Rlcm4gRXVyb3BlYW4gU3RhbmRhcmQgVGltZSlcclxuXHQgKiBAcGFyYW0gY2FsZW5kYXJfcGFyYW1zX2Fyclx0LSAgQ2FsZW5kYXIgU2V0dGluZ3MgT2JqZWN0OiAgXHR7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQgIFwiaHRtbF9pZFwiOiBcImNhbGVuZGFyX2Jvb2tpbmc0XCIsXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQgIFwidGV4dF9pZFwiOiBcImRhdGVfYm9va2luZzRcIixcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCAgXCJjYWxlbmRhcl9fYm9va2luZ19zdGFydF9kYXlfd2VlZWtcIjogMSxcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCAgXCJjYWxlbmRhcl9fdmlld19fdmlzaWJsZV9tb250aHNcIjogMTIsXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQgIFwicmVzb3VyY2VfaWRcIjogNCxcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCAgXCJhanhfbm9uY2VfY2FsZW5kYXJcIjogXCI8aW5wdXQgdHlwZT1cXFwiaGlkZGVuXFxcIiAuLi4gLz5cIixcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCAgXCJib29rZWRfZGF0ZXNcIjoge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcIjEyLTI4LTIwMjJcIjogW1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQgIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcImJvb2tpbmdfZGF0ZVwiOiBcIjIwMjItMTItMjggMDA6MDA6MDBcIixcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcImFwcHJvdmVkXCI6IFwiMVwiLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFwiYm9va2luZ19pZFwiOiBcIjI2XCJcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0ICB9XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdF0sIC4uLlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCdzZWFzb25fY3VzdG9taXplX3BsdWdpbic6e1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFwiMjAyMy0wMS0wOVwiOiB0cnVlLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFwiMjAyMy0wMS0xMFwiOiB0cnVlLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFwiMjAyMy0wMS0xMVwiOiB0cnVlLCAuLi5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0ICB9XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9XHJcblx0ICogQHBhcmFtIGRhdGVwaWNrX3RoaXNcdFx0XHQtIHRoaXMgb2YgZGF0ZXBpY2sgT2JqXHJcblx0ICpcclxuXHQgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuXHQgKi9cclxuXHRmdW5jdGlvbiB3cGJjX19pbmxpbmVfYm9va2luZ19jYWxlbmRhcl9fb25fZGF5c19ob3ZlciggdmFsdWUsIGRhdGUsIGNhbGVuZGFyX3BhcmFtc19hcnIsIGRhdGVwaWNrX3RoaXMgKXtcclxuXHJcblx0XHRcdFx0XHRpZiggbnVsbCA9PT0gZGF0ZSApe1xyXG5cdFx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cclxuXHJcblx0XHRcdFx0XHQvLyBUaGUgc2FtZSBmdW5jdGlvbnMgYXMgaW4gY2xpZW50LmNzcyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcblx0XHRcdFx0XHQvL1RPRE86IDIwMjMtMDYtMzAgMTc6MjJcclxuXHRcdFx0XHRcdGlmICggdHJ1ZSApe1xyXG5cclxuXHRcdFx0XHRcdFx0dmFyIGJrX3R5cGUgPSBjYWxlbmRhcl9wYXJhbXNfYXJyLnJlc291cmNlX2lkXHJcblxyXG5cclxuXHJcblx0XHRcdFx0XHRcdHZhciBpc19jYWxlbmRhcl9ib29raW5nX3Vuc2VsZWN0YWJsZSA9IGpRdWVyeSggJyNjYWxlbmRhcl9ib29raW5nX3Vuc2VsZWN0YWJsZScgKyBia190eXBlICk7XHRcdFx0XHQvL0ZpeEluOiA4LjAuMS4yXHJcblx0XHRcdFx0XHRcdHZhciBpc19ib29raW5nX2Zvcm1fYWxzbyA9IGpRdWVyeSggJyNib29raW5nX2Zvcm1fZGl2JyArIGJrX3R5cGUgKTtcclxuXHRcdFx0XHRcdFx0Ly8gU2V0IHVuc2VsZWN0YWJsZSwgIGlmIG9ubHkgQXZhaWxhYmlsaXR5IENhbGVuZGFyICBoZXJlIChhbmQgd2UgZG8gbm90IGluc2VydCBCb29raW5nIGZvcm0gYnkgbWlzdGFrZSkuXHJcblx0XHRcdFx0XHRcdGlmICggKGlzX2NhbGVuZGFyX2Jvb2tpbmdfdW5zZWxlY3RhYmxlLmxlbmd0aCA9PSAxKSAmJiAoaXNfYm9va2luZ19mb3JtX2Fsc28ubGVuZ3RoICE9IDEpICl7XHJcblx0XHRcdFx0XHRcdFx0alF1ZXJ5KCAnI2NhbGVuZGFyX2Jvb2tpbmcnICsgYmtfdHlwZSArICcgLmRhdGVwaWNrLWRheXMtY2VsbC1vdmVyJyApLnJlbW92ZUNsYXNzKCAnZGF0ZXBpY2stZGF5cy1jZWxsLW92ZXInICk7ICAgICAgICAvLyBjbGVhciBhbGwgaGlnaGxpZ2h0IGRheXMgc2VsZWN0aW9uc1xyXG5cdFx0XHRcdFx0XHRcdGpRdWVyeSggJy53cGJjX29ubHlfY2FsZW5kYXIgI2NhbGVuZGFyX2Jvb2tpbmcnICsgYmtfdHlwZSArICcgLmRhdGVwaWNrLWRheXMtY2VsbCwgJyArXHJcblx0XHRcdFx0XHRcdFx0XHQnLndwYmNfb25seV9jYWxlbmRhciAjY2FsZW5kYXJfYm9va2luZycgKyBia190eXBlICsgJyAuZGF0ZXBpY2stZGF5cy1jZWxsIGEnICkuY3NzKCAnY3Vyc29yJywgJ2RlZmF1bHQnICk7XHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHRcdFx0XHR9XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Ly9GaXhJbjogOC4wLjEuMlx0ZW5kXHJcblxyXG5cdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdC8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuXHJcblxyXG5cclxuXHJcblxyXG5cdFx0aWYgKCBudWxsID09PSBkYXRlICl7XHJcblx0XHRcdGpRdWVyeSggJy5kYXRlcGljay1kYXlzLWNlbGwtb3ZlcicgKS5yZW1vdmVDbGFzcyggJ2RhdGVwaWNrLWRheXMtY2VsbC1vdmVyJyApOyAgIFx0ICAgICAgICAgICAgICAgICAgICAgICAgLy8gY2xlYXIgYWxsIGhpZ2hsaWdodCBkYXlzIHNlbGVjdGlvbnNcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cclxuXHRcdHZhciBpbnN0ID0galF1ZXJ5LmRhdGVwaWNrLl9nZXRJbnN0KCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCggJ2NhbGVuZGFyX2Jvb2tpbmcnICsgY2FsZW5kYXJfcGFyYW1zX2Fyci5yZXNvdXJjZV9pZCApICk7XHJcblxyXG5cdFx0aWYgKFxyXG5cdFx0XHQgICAoIDEgPT0gaW5zdC5kYXRlcy5sZW5ndGgpXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Ly8gSWYgd2UgaGF2ZSBvbmUgc2VsZWN0ZWQgZGF0ZVxyXG5cdFx0XHQmJiAoJ2R5bmFtaWMnID09PSBjYWxlbmRhcl9wYXJhbXNfYXJyLmNhbGVuZGFyX19kYXlzX3NlbGVjdGlvbl9tb2RlKSBcdFx0XHRcdFx0Ly8gd2hpbGUgaGF2ZSByYW5nZSBkYXlzIHNlbGVjdGlvbiBtb2RlXHJcblx0XHQpe1xyXG5cclxuXHRcdFx0dmFyIHRkX2NsYXNzO1xyXG5cdFx0XHR2YXIgdGRfb3ZlcnMgPSBbXTtcclxuXHRcdFx0dmFyIGlzX2NoZWNrID0gdHJ1ZTtcclxuICAgICAgICAgICAgdmFyIHNlbGNldGVkX2ZpcnN0X2RheSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgICAgIHNlbGNldGVkX2ZpcnN0X2RheS5zZXRGdWxsWWVhcihpbnN0LmRhdGVzWzBdLmdldEZ1bGxZZWFyKCksKGluc3QuZGF0ZXNbMF0uZ2V0TW9udGgoKSksIChpbnN0LmRhdGVzWzBdLmdldERhdGUoKSApICk7IC8vR2V0IGZpcnN0IERhdGVcclxuXHJcbiAgICAgICAgICAgIHdoaWxlKCAgaXNfY2hlY2sgKXtcclxuXHJcblx0XHRcdFx0dGRfY2xhc3MgPSAoc2VsY2V0ZWRfZmlyc3RfZGF5LmdldE1vbnRoKCkgKyAxKSArICctJyArIHNlbGNldGVkX2ZpcnN0X2RheS5nZXREYXRlKCkgKyAnLScgKyBzZWxjZXRlZF9maXJzdF9kYXkuZ2V0RnVsbFllYXIoKTtcclxuXHJcblx0XHRcdFx0dGRfb3ZlcnNbIHRkX292ZXJzLmxlbmd0aCBdID0gJyNjYWxlbmRhcl9ib29raW5nJyArIGNhbGVuZGFyX3BhcmFtc19hcnIucmVzb3VyY2VfaWQgKyAnIC5jYWw0ZGF0ZS0nICsgdGRfY2xhc3M7ICAgICAgICAgICAgICAvLyBhZGQgdG8gYXJyYXkgZm9yIGxhdGVyIG1ha2Ugc2VsZWN0aW9uIGJ5IGNsYXNzXHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKFxyXG5cdFx0XHRcdFx0KCAgKCBkYXRlLmdldE1vbnRoKCkgPT0gc2VsY2V0ZWRfZmlyc3RfZGF5LmdldE1vbnRoKCkgKSAgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAoIGRhdGUuZ2V0RGF0ZSgpID09IHNlbGNldGVkX2ZpcnN0X2RheS5nZXREYXRlKCkgKSAgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAoIGRhdGUuZ2V0RnVsbFllYXIoKSA9PSBzZWxjZXRlZF9maXJzdF9kYXkuZ2V0RnVsbFllYXIoKSApXHJcblx0XHRcdFx0XHQpIHx8ICggc2VsY2V0ZWRfZmlyc3RfZGF5ID4gZGF0ZSApXHJcblx0XHRcdFx0KXtcclxuXHRcdFx0XHRcdGlzX2NoZWNrID0gIGZhbHNlO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0c2VsY2V0ZWRfZmlyc3RfZGF5LnNldEZ1bGxZZWFyKCBzZWxjZXRlZF9maXJzdF9kYXkuZ2V0RnVsbFllYXIoKSwgKHNlbGNldGVkX2ZpcnN0X2RheS5nZXRNb250aCgpKSwgKHNlbGNldGVkX2ZpcnN0X2RheS5nZXREYXRlKCkgKyAxKSApO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBIaWdobGlnaHQgRGF5c1xyXG5cdFx0XHRmb3IgKCB2YXIgaT0wOyBpIDwgdGRfb3ZlcnMubGVuZ3RoIDsgaSsrKSB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFkZCBjbGFzcyB0byBhbGwgZWxlbWVudHNcclxuXHRcdFx0XHRqUXVlcnkoIHRkX292ZXJzW2ldICkuYWRkQ2xhc3MoJ2RhdGVwaWNrLWRheXMtY2VsbC1vdmVyJyk7XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIHRydWU7XHJcblxyXG5cdFx0fVxyXG5cclxuXHQgICAgcmV0dXJuIHRydWU7XHJcblx0fVxyXG5cclxuLy9UT0RPOiBuZWVkIHRvICB1c2Ugd3BiY19jYWxlbmRhciBzY3JpcHQsICBpbnN0ZWFkIG9mIHRoaXMgb25lXHJcblxyXG5cdC8qKlxyXG5cdCAqIE9uIERBWXMgc2VsZWN0aW9uIGluIGNhbGVuZGFyXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gZGF0ZXNfc2VsZWN0aW9uXHRcdC0gIHN0cmluZzpcdFx0XHQgJzIwMjMtMDMtMDcgfiAyMDIzLTAzLTA3JyBvciAnMjAyMy0wNC0xMCwgMjAyMy0wNC0xMiwgMjAyMy0wNC0wMiwgMjAyMy0wNC0wNCdcclxuXHQgKiBAcGFyYW0gY2FsZW5kYXJfcGFyYW1zX2Fyclx0LSAgQ2FsZW5kYXIgU2V0dGluZ3MgT2JqZWN0OiAgXHR7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQgIFwiaHRtbF9pZFwiOiBcImNhbGVuZGFyX2Jvb2tpbmc0XCIsXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQgIFwidGV4dF9pZFwiOiBcImRhdGVfYm9va2luZzRcIixcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCAgXCJjYWxlbmRhcl9fYm9va2luZ19zdGFydF9kYXlfd2VlZWtcIjogMSxcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCAgXCJjYWxlbmRhcl9fdmlld19fdmlzaWJsZV9tb250aHNcIjogMTIsXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQgIFwicmVzb3VyY2VfaWRcIjogNCxcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCAgXCJhanhfbm9uY2VfY2FsZW5kYXJcIjogXCI8aW5wdXQgdHlwZT1cXFwiaGlkZGVuXFxcIiAuLi4gLz5cIixcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCAgXCJib29rZWRfZGF0ZXNcIjoge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcIjEyLTI4LTIwMjJcIjogW1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQgIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcImJvb2tpbmdfZGF0ZVwiOiBcIjIwMjItMTItMjggMDA6MDA6MDBcIixcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcImFwcHJvdmVkXCI6IFwiMVwiLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFwiYm9va2luZ19pZFwiOiBcIjI2XCJcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0ICB9XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdF0sIC4uLlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCdzZWFzb25fY3VzdG9taXplX3BsdWdpbic6e1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFwiMjAyMy0wMS0wOVwiOiB0cnVlLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFwiMjAyMy0wMS0xMFwiOiB0cnVlLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFwiMjAyMy0wMS0xMVwiOiB0cnVlLCAuLi5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0ICB9XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9XHJcblx0ICogQHBhcmFtIGRhdGVwaWNrX3RoaXNcdFx0XHQtIHRoaXMgb2YgZGF0ZXBpY2sgT2JqXHJcblx0ICpcclxuXHQgKiBAcmV0dXJucyBib29sZWFuXHJcblx0ICovXHJcblx0ZnVuY3Rpb24gd3BiY19faW5saW5lX2Jvb2tpbmdfY2FsZW5kYXJfX29uX2RheXNfc2VsZWN0KCBkYXRlc19zZWxlY3Rpb24sIGNhbGVuZGFyX3BhcmFtc19hcnIsIGRhdGVwaWNrX3RoaXMgPSBudWxsICl7XHJcblxyXG5cclxuXHRcdC8vIFRoZSBzYW1lIGZ1bmN0aW9ucyBhcyBpbiBjbGllbnQuY3NzXHRcdFx0Ly9UT0RPOiAyMDIzLTA2LTMwIDE3OjIyXHJcblx0XHRpZiAoIHRydWUgKXtcclxuXHJcblx0XHRcdHZhciBia190eXBlID0gY2FsZW5kYXJfcGFyYW1zX2Fyci5yZXNvdXJjZV9pZFxyXG5cdFx0XHR2YXIgZGF0ZSA9IGRhdGVzX3NlbGVjdGlvbjtcclxuXHJcblx0XHRcdC8vIFNldCB1bnNlbGVjdGFibGUsICBpZiBvbmx5IEF2YWlsYWJpbGl0eSBDYWxlbmRhciAgaGVyZSAoYW5kIHdlIGRvIG5vdCBpbnNlcnQgQm9va2luZyBmb3JtIGJ5IG1pc3Rha2UpLlxyXG5cdFx0XHR2YXIgaXNfY2FsZW5kYXJfYm9va2luZ191bnNlbGVjdGFibGUgPSBqUXVlcnkoICcjY2FsZW5kYXJfYm9va2luZ191bnNlbGVjdGFibGUnICsgYmtfdHlwZSApO1x0XHRcdFx0Ly9GaXhJbjogOC4wLjEuMlxyXG5cdFx0XHR2YXIgaXNfYm9va2luZ19mb3JtX2Fsc28gPSBqUXVlcnkoICcjYm9va2luZ19mb3JtX2RpdicgKyBia190eXBlICk7XHJcblxyXG5cdFx0XHRpZiAoIChpc19jYWxlbmRhcl9ib29raW5nX3Vuc2VsZWN0YWJsZS5sZW5ndGggPiAwKSAmJiAoaXNfYm9va2luZ19mb3JtX2Fsc28ubGVuZ3RoIDw9IDApICl7XHJcblxyXG5cdFx0XHRcdHdwYmNfY2FsZW5kYXJfX3Vuc2VsZWN0X2FsbF9kYXRlcyggYmtfdHlwZSApO1xyXG5cdFx0XHRcdGpRdWVyeSggJy53cGJjX29ubHlfY2FsZW5kYXIgLnBvcG92ZXJfY2FsZW5kYXJfaG92ZXInICkucmVtb3ZlKCk7ICAgICAgICAgICAgICAgICAgICAgIFx0XHRcdFx0XHQvL0hpZGUgYWxsIG9wZW5lZCBwb3BvdmVyc1xyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0fVx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vRml4SW46IDguMC4xLjIgZW5kXHJcblxyXG5cdFx0XHRqUXVlcnkoICcjZGF0ZV9ib29raW5nJyArIGJrX3R5cGUgKS52YWwoIGRhdGUgKTtcclxuXHJcblxyXG5cclxuXHJcblx0XHRcdGpRdWVyeSggXCIuYm9va2luZ19mb3JtX2RpdlwiICkudHJpZ2dlciggXCJkYXRlX3NlbGVjdGVkXCIsIFtia190eXBlLCBkYXRlXSApO1xyXG5cclxuXHRcdH0gZWxzZSB7XHJcblxyXG5cdFx0XHQvLyBGdW5jdGlvbmFsaXR5ICBmcm9tICBCb29raW5nID4gQXZhaWxhYmlsaXR5IHBhZ2VcclxuXHJcblx0XHRcdHZhciBpbnN0ID0galF1ZXJ5LmRhdGVwaWNrLl9nZXRJbnN0KCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCggJ2NhbGVuZGFyX2Jvb2tpbmcnICsgY2FsZW5kYXJfcGFyYW1zX2Fyci5yZXNvdXJjZV9pZCApICk7XHJcblxyXG5cdFx0XHR2YXIgZGF0ZXNfYXJyID0gW107XHQvLyAgWyBcIjIwMjMtMDQtMDlcIiwgXCIyMDIzLTA0LTEwXCIsIFwiMjAyMy0wNC0xMVwiIF1cclxuXHJcblx0XHRcdGlmICggLTEgIT09IGRhdGVzX3NlbGVjdGlvbi5pbmRleE9mKCAnficgKSApIHsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gUmFuZ2UgRGF5c1xyXG5cclxuXHRcdFx0XHRkYXRlc19hcnIgPSB3cGJjX2dldF9kYXRlc19hcnJfX2Zyb21fZGF0ZXNfcmFuZ2VfanMoIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0J2RhdGVzX3NlcGFyYXRvcicgOiAnIH4gJywgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICcgfiAnXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCdkYXRlcycgICAgICAgICAgIDogZGF0ZXNfc2VsZWN0aW9uLCAgICBcdFx0ICAgLy8gJzIwMjMtMDQtMDQgfiAyMDIzLTA0LTA3J1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0fSApO1xyXG5cclxuXHRcdFx0fSBlbHNlIHsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIE11bHRpcGxlIERheXNcclxuXHRcdFx0XHRkYXRlc19hcnIgPSB3cGJjX2dldF9kYXRlc19hcnJfX2Zyb21fZGF0ZXNfY29tbWFfc2VwYXJhdGVkX2pzKCB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCdkYXRlc19zZXBhcmF0b3InIDogJywgJywgICAgICAgICAgICAgICAgICAgICAgICAgXHQvLyAgJywgJ1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQnZGF0ZXMnICAgICAgICAgICA6IGRhdGVzX3NlbGVjdGlvbiwgICAgXHRcdFx0Ly8gJzIwMjMtMDQtMTAsIDIwMjMtMDQtMTIsIDIwMjMtMDQtMDIsIDIwMjMtMDQtMDQnXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9ICk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHdwYmNfYXZ5X2FmdGVyX2RheXNfc2VsZWN0aW9uX19zaG93X2hlbHBfaW5mbyh7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCdjYWxlbmRhcl9fZGF5c19zZWxlY3Rpb25fbW9kZSc6IGNhbGVuZGFyX3BhcmFtc19hcnIuY2FsZW5kYXJfX2RheXNfc2VsZWN0aW9uX21vZGUsXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCdkYXRlc19hcnInICAgICAgICAgICAgICAgICAgICA6IGRhdGVzX2FycixcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0J2RhdGVzX2NsaWNrX251bScgICAgICAgICAgICAgIDogaW5zdC5kYXRlcy5sZW5ndGgsXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCdwb3BvdmVyX2hpbnRzJ1x0XHRcdFx0XHQ6IGNhbGVuZGFyX3BhcmFtc19hcnIucG9wb3Zlcl9oaW50c1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0fSApO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB0cnVlO1xyXG5cclxuXHR9XHJcblxyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogU2hvdyBoZWxwIGluZm8gYXQgdGhlIHRvcCAgdG9vbGJhciBhYm91dCBzZWxlY3RlZCBkYXRlcyBhbmQgZnV0dXJlIGFjdGlvbnNcclxuXHRcdCAqXHJcblx0XHQgKiBAcGFyYW0gcGFyYW1zXHJcblx0XHQgKiBcdFx0XHRcdFx0RXhhbXBsZSAxOiAge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y2FsZW5kYXJfX2RheXNfc2VsZWN0aW9uX21vZGU6IFwiZHluYW1pY1wiLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0ZGF0ZXNfYXJyOiAgWyBcIjIwMjMtMDQtMDNcIiBdLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0ZGF0ZXNfY2xpY2tfbnVtOiAxXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQncG9wb3Zlcl9oaW50cydcdFx0XHRcdFx0OiBjYWxlbmRhcl9wYXJhbXNfYXJyLnBvcG92ZXJfaGludHNcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHQgKiBcdFx0XHRcdFx0RXhhbXBsZSAyOiAge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y2FsZW5kYXJfX2RheXNfc2VsZWN0aW9uX21vZGU6IFwiZHluYW1pY1wiXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRkYXRlc19hcnI6IEFycmF5KDEwKSBbIFwiMjAyMy0wNC0wM1wiLCBcIjIwMjMtMDQtMDRcIiwgXCIyMDIzLTA0LTA1XCIsIOKApiBdXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRkYXRlc19jbGlja19udW06IDJcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdCdwb3BvdmVyX2hpbnRzJ1x0XHRcdFx0XHQ6IGNhbGVuZGFyX3BhcmFtc19hcnIucG9wb3Zlcl9oaW50c1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdCAqL1xyXG5cdFx0ZnVuY3Rpb24gd3BiY19hdnlfYWZ0ZXJfZGF5c19zZWxlY3Rpb25fX3Nob3dfaGVscF9pbmZvKCBwYXJhbXMgKXtcclxuLy8gY29uc29sZS5sb2coIHBhcmFtcyApO1x0Ly9cdFx0WyBcIjIwMjMtMDQtMDlcIiwgXCIyMDIzLTA0LTEwXCIsIFwiMjAyMy0wNC0xMVwiIF1cclxuXHJcblx0XHRcdHZhciBtZXNzYWdlLCBjb2xvcjtcclxuXHRcdFx0aWYgKGpRdWVyeSggJyN1aV9idG5fY3N0bV9fc2V0X2RheXNfY3VzdG9taXplX3BsdWdpbl9fYXZhaWxhYmxlJykuaXMoJzpjaGVja2VkJykpe1xyXG5cdFx0XHRcdCBtZXNzYWdlID0gcGFyYW1zLnBvcG92ZXJfaGludHMudG9vbGJhcl90ZXh0X2F2YWlsYWJsZTsvLydTZXQgZGF0ZXMgX0RBVEVTXyBhcyBfSFRNTF8gYXZhaWxhYmxlLic7XHJcblx0XHRcdFx0IGNvbG9yID0gJyMxMWJlNGMnO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdG1lc3NhZ2UgPSBwYXJhbXMucG9wb3Zlcl9oaW50cy50b29sYmFyX3RleHRfdW5hdmFpbGFibGU7Ly8nU2V0IGRhdGVzIF9EQVRFU18gYXMgX0hUTUxfIHVuYXZhaWxhYmxlLic7XHJcblx0XHRcdFx0Y29sb3IgPSAnI2U0MzkzOSc7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdG1lc3NhZ2UgPSAnPHNwYW4+JyArIG1lc3NhZ2UgKyAnPC9zcGFuPic7XHJcblxyXG5cdFx0XHR2YXIgZmlyc3RfZGF0ZSA9IHBhcmFtc1sgJ2RhdGVzX2FycicgXVsgMCBdO1xyXG5cdFx0XHR2YXIgbGFzdF9kYXRlICA9ICggJ2R5bmFtaWMnID09IHBhcmFtcy5jYWxlbmRhcl9fZGF5c19zZWxlY3Rpb25fbW9kZSApXHJcblx0XHRcdFx0XHRcdFx0PyBwYXJhbXNbICdkYXRlc19hcnInIF1bIChwYXJhbXNbICdkYXRlc19hcnInIF0ubGVuZ3RoIC0gMSkgXVxyXG5cdFx0XHRcdFx0XHRcdDogKCBwYXJhbXNbICdkYXRlc19hcnInIF0ubGVuZ3RoID4gMSApID8gcGFyYW1zWyAnZGF0ZXNfYXJyJyBdWyAxIF0gOiAnJztcclxuXHJcblx0XHRcdGZpcnN0X2RhdGUgPSBqUXVlcnkuZGF0ZXBpY2suZm9ybWF0RGF0ZSggJ2RkIE0sIHl5JywgbmV3IERhdGUoIGZpcnN0X2RhdGUgKyAnVDAwOjAwOjAwJyApICk7XHJcblx0XHRcdGxhc3RfZGF0ZSA9IGpRdWVyeS5kYXRlcGljay5mb3JtYXREYXRlKCAnZGQgTSwgeXknLCAgbmV3IERhdGUoIGxhc3RfZGF0ZSArICdUMDA6MDA6MDAnICkgKTtcclxuXHJcblxyXG5cdFx0XHRpZiAoICdkeW5hbWljJyA9PSBwYXJhbXMuY2FsZW5kYXJfX2RheXNfc2VsZWN0aW9uX21vZGUgKXtcclxuXHRcdFx0XHRpZiAoIDEgPT0gcGFyYW1zLmRhdGVzX2NsaWNrX251bSApe1xyXG5cdFx0XHRcdFx0bGFzdF9kYXRlID0gJ19fX19fX19fX19fJ1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRpZiAoICdmaXJzdF90aW1lJyA9PSBqUXVlcnkoICcud3BiY19hanhfY3VzdG9taXplX3BsdWdpbl9jb250YWluZXInICkuYXR0ciggJ3dwYmNfbG9hZGVkJyApICl7XHJcblx0XHRcdFx0XHRcdGpRdWVyeSggJy53cGJjX2FqeF9jdXN0b21pemVfcGx1Z2luX2NvbnRhaW5lcicgKS5hdHRyKCAnd3BiY19sb2FkZWQnLCAnZG9uZScgKVxyXG5cdFx0XHRcdFx0XHR3cGJjX2JsaW5rX2VsZW1lbnQoICcud3BiY193aWRnZXRfY2hhbmdlX2NhbGVuZGFyX3NraW4nLCAzLCAyMjAgKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0bWVzc2FnZSA9IG1lc3NhZ2UucmVwbGFjZSggJ19EQVRFU18nLCAgICAnPC9zcGFuPidcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vKyAnPGRpdj4nICsgJ2Zyb20nICsgJzwvZGl2PidcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCsgJzxzcGFuIGNsYXNzPVwid3BiY19iaWdfZGF0ZVwiPicgKyBmaXJzdF9kYXRlICsgJzwvc3Bhbj4nXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQrICc8c3Bhbj4nICsgJy0nICsgJzwvc3Bhbj4nXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQrICc8c3BhbiBjbGFzcz1cIndwYmNfYmlnX2RhdGVcIj4nICsgbGFzdF9kYXRlICsgJzwvc3Bhbj4nXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQrICc8c3Bhbj4nICk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0Ly8gaWYgKCBwYXJhbXNbICdkYXRlc19hcnInIF0ubGVuZ3RoID4gMSApe1xyXG5cdFx0XHRcdC8vIFx0bGFzdF9kYXRlID0gJywgJyArIGxhc3RfZGF0ZTtcclxuXHRcdFx0XHQvLyBcdGxhc3RfZGF0ZSArPSAoIHBhcmFtc1sgJ2RhdGVzX2FycicgXS5sZW5ndGggPiAyICkgPyAnLCAuLi4nIDogJyc7XHJcblx0XHRcdFx0Ly8gfSBlbHNlIHtcclxuXHRcdFx0XHQvLyBcdGxhc3RfZGF0ZT0nJztcclxuXHRcdFx0XHQvLyB9XHJcblx0XHRcdFx0dmFyIGRhdGVzX2FyciA9IFtdO1xyXG5cdFx0XHRcdGZvciggdmFyIGkgPSAwOyBpIDwgcGFyYW1zWyAnZGF0ZXNfYXJyJyBdLmxlbmd0aDsgaSsrICl7XHJcblx0XHRcdFx0XHRkYXRlc19hcnIucHVzaCggIGpRdWVyeS5kYXRlcGljay5mb3JtYXREYXRlKCAnZGQgTSB5eScsICBuZXcgRGF0ZSggcGFyYW1zWyAnZGF0ZXNfYXJyJyBdWyBpIF0gKyAnVDAwOjAwOjAwJyApICkgICk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGZpcnN0X2RhdGUgPSBkYXRlc19hcnIuam9pbiggJywgJyApO1xyXG5cdFx0XHRcdG1lc3NhZ2UgPSBtZXNzYWdlLnJlcGxhY2UoICdfREFURVNfJywgICAgJzwvc3Bhbj4nXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQrICc8c3BhbiBjbGFzcz1cIndwYmNfYmlnX2RhdGVcIj4nICsgZmlyc3RfZGF0ZSArICc8L3NwYW4+J1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0KyAnPHNwYW4+JyApO1xyXG5cdFx0XHR9XHJcblx0XHRcdG1lc3NhZ2UgPSBtZXNzYWdlLnJlcGxhY2UoICdfSFRNTF8nICwgJzwvc3Bhbj48c3BhbiBjbGFzcz1cIndwYmNfYmlnX3RleHRcIiBzdHlsZT1cImNvbG9yOicrY29sb3IrJztcIj4nKSArICc8c3Bhbj4nO1xyXG5cclxuXHRcdFx0Ly9tZXNzYWdlICs9ICcgPGRpdiBzdHlsZT1cIm1hcmdpbi1sZWZ0OiAxZW07XCI+JyArICcgQ2xpY2sgb24gQXBwbHkgYnV0dG9uIHRvIGFwcGx5IGN1c3RvbWl6ZV9wbHVnaW4uJyArICc8L2Rpdj4nO1xyXG5cclxuXHRcdFx0bWVzc2FnZSA9ICc8ZGl2IGNsYXNzPVwid3BiY190b29sYmFyX2RhdGVzX2hpbnRzXCI+JyArIG1lc3NhZ2UgKyAnPC9kaXY+JztcclxuXHJcblx0XHRcdGpRdWVyeSggJy53cGJjX2hlbHBfdGV4dCcgKS5odG1sKFx0bWVzc2FnZSApO1xyXG5cdFx0fVxyXG5cclxuXHQvKipcclxuXHQgKiAgIFBhcnNlIGRhdGVzICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBHZXQgZGF0ZXMgYXJyYXksICBmcm9tIGNvbW1hIHNlcGFyYXRlZCBkYXRlc1xyXG5cdFx0ICpcclxuXHRcdCAqIEBwYXJhbSBwYXJhbXMgICAgICAgPSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQqICdkYXRlc19zZXBhcmF0b3InID0+ICcsICcsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIERhdGVzIHNlcGFyYXRvclxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0KiAnZGF0ZXMnICAgICAgICAgICA9PiAnMjAyMy0wNC0wNCwgMjAyMy0wNC0wNywgMjAyMy0wNC0wNScgICAgICAgICAvLyBEYXRlcyBpbiAnWS1tLWQnIGZvcm1hdDogJzIwMjMtMDEtMzEnXHJcblx0XHRcdFx0XHRcdFx0XHQgfVxyXG5cdFx0ICpcclxuXHRcdCAqIEByZXR1cm4gYXJyYXkgICAgICA9IFtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdCogWzBdID0+IDIwMjMtMDQtMDRcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdCogWzFdID0+IDIwMjMtMDQtMDVcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdCogWzJdID0+IDIwMjMtMDQtMDZcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdCogWzNdID0+IDIwMjMtMDQtMDdcclxuXHRcdFx0XHRcdFx0XHRcdF1cclxuXHRcdCAqXHJcblx0XHQgKiBFeGFtcGxlICMxOiAgd3BiY19nZXRfZGF0ZXNfYXJyX19mcm9tX2RhdGVzX2NvbW1hX3NlcGFyYXRlZF9qcyggIHsgICdkYXRlc19zZXBhcmF0b3InIDogJywgJywgJ2RhdGVzJyA6ICcyMDIzLTA0LTA0LCAyMDIzLTA0LTA3LCAyMDIzLTA0LTA1JyAgfSAgKTtcclxuXHRcdCAqL1xyXG5cdFx0ZnVuY3Rpb24gd3BiY19nZXRfZGF0ZXNfYXJyX19mcm9tX2RhdGVzX2NvbW1hX3NlcGFyYXRlZF9qcyggcGFyYW1zICl7XHJcblxyXG5cdFx0XHR2YXIgZGF0ZXNfYXJyID0gW107XHJcblxyXG5cdFx0XHRpZiAoICcnICE9PSBwYXJhbXNbICdkYXRlcycgXSApe1xyXG5cclxuXHRcdFx0XHRkYXRlc19hcnIgPSBwYXJhbXNbICdkYXRlcycgXS5zcGxpdCggcGFyYW1zWyAnZGF0ZXNfc2VwYXJhdG9yJyBdICk7XHJcblxyXG5cdFx0XHRcdGRhdGVzX2Fyci5zb3J0KCk7XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIGRhdGVzX2FycjtcclxuXHRcdH1cclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEdldCBkYXRlcyBhcnJheSwgIGZyb20gcmFuZ2UgZGF5cyBzZWxlY3Rpb25cclxuXHRcdCAqXHJcblx0XHQgKiBAcGFyYW0gcGFyYW1zICAgICAgID0gIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdCogJ2RhdGVzX3NlcGFyYXRvcicgPT4gJyB+ICcsICAgICAgICAgICAgICAgICAgICAgICAgIC8vIERhdGVzIHNlcGFyYXRvclxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0KiAnZGF0ZXMnICAgICAgICAgICA9PiAnMjAyMy0wNC0wNCB+IDIwMjMtMDQtMDcnICAgICAgLy8gRGF0ZXMgaW4gJ1ktbS1kJyBmb3JtYXQ6ICcyMDIzLTAxLTMxJ1xyXG5cdFx0XHRcdFx0XHRcdFx0ICB9XHJcblx0XHQgKlxyXG5cdFx0ICogQHJldHVybiBhcnJheSAgICAgICAgPSBbXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQqIFswXSA9PiAyMDIzLTA0LTA0XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQqIFsxXSA9PiAyMDIzLTA0LTA1XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQqIFsyXSA9PiAyMDIzLTA0LTA2XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQqIFszXSA9PiAyMDIzLTA0LTA3XHJcblx0XHRcdFx0XHRcdFx0XHQgIF1cclxuXHRcdCAqXHJcblx0XHQgKiBFeGFtcGxlICMxOiAgd3BiY19nZXRfZGF0ZXNfYXJyX19mcm9tX2RhdGVzX3JhbmdlX2pzKCAgeyAgJ2RhdGVzX3NlcGFyYXRvcicgOiAnIH4gJywgJ2RhdGVzJyA6ICcyMDIzLTA0LTA0IH4gMjAyMy0wNC0wNycgIH0gICk7XHJcblx0XHQgKiBFeGFtcGxlICMyOiAgd3BiY19nZXRfZGF0ZXNfYXJyX19mcm9tX2RhdGVzX3JhbmdlX2pzKCAgeyAgJ2RhdGVzX3NlcGFyYXRvcicgOiAnIC0gJywgJ2RhdGVzJyA6ICcyMDIzLTA0LTA0IC0gMjAyMy0wNC0wNycgIH0gICk7XHJcblx0XHQgKi9cclxuXHRcdGZ1bmN0aW9uIHdwYmNfZ2V0X2RhdGVzX2Fycl9fZnJvbV9kYXRlc19yYW5nZV9qcyggcGFyYW1zICl7XHJcblxyXG5cdFx0XHR2YXIgZGF0ZXNfYXJyID0gW107XHJcblxyXG5cdFx0XHRpZiAoICcnICE9PSBwYXJhbXNbJ2RhdGVzJ10gKSB7XHJcblxyXG5cdFx0XHRcdGRhdGVzX2FyciA9IHBhcmFtc1sgJ2RhdGVzJyBdLnNwbGl0KCBwYXJhbXNbICdkYXRlc19zZXBhcmF0b3InIF0gKTtcclxuXHRcdFx0XHR2YXIgY2hlY2tfaW5fZGF0ZV95bWQgID0gZGF0ZXNfYXJyWzBdO1xyXG5cdFx0XHRcdHZhciBjaGVja19vdXRfZGF0ZV95bWQgPSBkYXRlc19hcnJbMV07XHJcblxyXG5cdFx0XHRcdGlmICggKCcnICE9PSBjaGVja19pbl9kYXRlX3ltZCkgJiYgKCcnICE9PSBjaGVja19vdXRfZGF0ZV95bWQpICl7XHJcblxyXG5cdFx0XHRcdFx0ZGF0ZXNfYXJyID0gd3BiY19nZXRfZGF0ZXNfYXJyYXlfZnJvbV9zdGFydF9lbmRfZGF5c19qcyggY2hlY2tfaW5fZGF0ZV95bWQsIGNoZWNrX291dF9kYXRlX3ltZCApO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gZGF0ZXNfYXJyO1xyXG5cdFx0fVxyXG5cclxuXHRcdFx0LyoqXHJcblx0XHRcdCAqIEdldCBkYXRlcyBhcnJheSBiYXNlZCBvbiBzdGFydCBhbmQgZW5kIGRhdGVzLlxyXG5cdFx0XHQgKlxyXG5cdFx0XHQgKiBAcGFyYW0gc3RyaW5nIHNTdGFydERhdGUgLSBzdGFydCBkYXRlOiAyMDIzLTA0LTA5XHJcblx0XHRcdCAqIEBwYXJhbSBzdHJpbmcgc0VuZERhdGUgICAtIGVuZCBkYXRlOiAgIDIwMjMtMDQtMTFcclxuXHRcdFx0ICogQHJldHVybiBhcnJheSAgICAgICAgICAgICAtIFsgXCIyMDIzLTA0LTA5XCIsIFwiMjAyMy0wNC0xMFwiLCBcIjIwMjMtMDQtMTFcIiBdXHJcblx0XHRcdCAqL1xyXG5cdFx0XHRmdW5jdGlvbiB3cGJjX2dldF9kYXRlc19hcnJheV9mcm9tX3N0YXJ0X2VuZF9kYXlzX2pzKCBzU3RhcnREYXRlLCBzRW5kRGF0ZSApe1xyXG5cclxuXHRcdFx0XHRzU3RhcnREYXRlID0gbmV3IERhdGUoIHNTdGFydERhdGUgKyAnVDAwOjAwOjAwJyApO1xyXG5cdFx0XHRcdHNFbmREYXRlID0gbmV3IERhdGUoIHNFbmREYXRlICsgJ1QwMDowMDowMCcgKTtcclxuXHJcblx0XHRcdFx0dmFyIGFEYXlzPVtdO1xyXG5cclxuXHRcdFx0XHQvLyBTdGFydCB0aGUgdmFyaWFibGUgb2ZmIHdpdGggdGhlIHN0YXJ0IGRhdGVcclxuXHRcdFx0XHRhRGF5cy5wdXNoKCBzU3RhcnREYXRlLmdldFRpbWUoKSApO1xyXG5cclxuXHRcdFx0XHQvLyBTZXQgYSAndGVtcCcgdmFyaWFibGUsIHNDdXJyZW50RGF0ZSwgd2l0aCB0aGUgc3RhcnQgZGF0ZSAtIGJlZm9yZSBiZWdpbm5pbmcgdGhlIGxvb3BcclxuXHRcdFx0XHR2YXIgc0N1cnJlbnREYXRlID0gbmV3IERhdGUoIHNTdGFydERhdGUuZ2V0VGltZSgpICk7XHJcblx0XHRcdFx0dmFyIG9uZV9kYXlfZHVyYXRpb24gPSAyNCo2MCo2MCoxMDAwO1xyXG5cclxuXHRcdFx0XHQvLyBXaGlsZSB0aGUgY3VycmVudCBkYXRlIGlzIGxlc3MgdGhhbiB0aGUgZW5kIGRhdGVcclxuXHRcdFx0XHR3aGlsZShzQ3VycmVudERhdGUgPCBzRW5kRGF0ZSl7XHJcblx0XHRcdFx0XHQvLyBBZGQgYSBkYXkgdG8gdGhlIGN1cnJlbnQgZGF0ZSBcIisxIGRheVwiXHJcblx0XHRcdFx0XHRzQ3VycmVudERhdGUuc2V0VGltZSggc0N1cnJlbnREYXRlLmdldFRpbWUoKSArIG9uZV9kYXlfZHVyYXRpb24gKTtcclxuXHJcblx0XHRcdFx0XHQvLyBBZGQgdGhpcyBuZXcgZGF5IHRvIHRoZSBhRGF5cyBhcnJheVxyXG5cdFx0XHRcdFx0YURheXMucHVzaCggc0N1cnJlbnREYXRlLmdldFRpbWUoKSApO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBhRGF5cy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdFx0YURheXNbIGkgXSA9IG5ldyBEYXRlKCBhRGF5c1tpXSApO1xyXG5cdFx0XHRcdFx0YURheXNbIGkgXSA9IGFEYXlzWyBpIF0uZ2V0RnVsbFllYXIoKVxyXG5cdFx0XHRcdFx0XHRcdFx0KyAnLScgKyAoKCAoYURheXNbIGkgXS5nZXRNb250aCgpICsgMSkgPCAxMCkgPyAnMCcgOiAnJykgKyAoYURheXNbIGkgXS5nZXRNb250aCgpICsgMSlcclxuXHRcdFx0XHRcdFx0XHRcdCsgJy0nICsgKCggICAgICAgIGFEYXlzWyBpIF0uZ2V0RGF0ZSgpIDwgMTApID8gJzAnIDogJycpICsgIGFEYXlzWyBpIF0uZ2V0RGF0ZSgpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHQvLyBPbmNlIHRoZSBsb29wIGhhcyBmaW5pc2hlZCwgcmV0dXJuIHRoZSBhcnJheSBvZiBkYXlzLlxyXG5cdFx0XHRcdHJldHVybiBhRGF5cztcclxuXHRcdFx0fVxyXG5cclxuXHJcbi8qKlxyXG4gKiBTY3JvbGwgdG8gIHNwZWNpZmljIFwiWWVhciAmIE1vbnRoXCIgXHRpbiBJbmxpbmUgQm9va2luZyBDYWxlbmRhclxyXG4gKlxyXG4gKiBAcGFyYW0ge251bWJlcn0gcmVzb3VyY2VfaWRcdFx0MVxyXG4gKiBAcGFyYW0ge251bWJlcn0geWVhclx0XHRcdFx0MjAyM1xyXG4gKiBAcGFyYW0ge251bWJlcn0gbW9udGhcdFx0XHQxMlx0XHRcdChmcm9tIDEgdG8gIDEyKVxyXG4gKlxyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cdFx0XHQvLyBjaGFuZ2VkIG9yIG5vdFxyXG4gKi9cclxuZnVuY3Rpb24gd3BiY19faW5saW5lX2Jvb2tpbmdfY2FsZW5kYXJfX2NoYW5nZV95ZWFyX21vbnRoKCByZXNvdXJjZV9pZCwgeWVhciwgbW9udGggKXtcclxuXHJcblx0dmFyIGluc3QgPSBqUXVlcnkuZGF0ZXBpY2suX2dldEluc3QoIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCAnY2FsZW5kYXJfYm9va2luZycgKyByZXNvdXJjZV9pZCkgKTtcclxuXHJcblx0aWYgKCBmYWxzZSAhPSBpbnN0ICl7XHJcblxyXG5cdFx0eWVhciA9IHBhcnNlSW50KCB5ZWFyICk7XHJcblx0XHRtb250aCA9IHBhcnNlSW50KCBtb250aCApIC0gMTtcclxuXHJcblx0XHRpbnN0LmN1cnNvckRhdGUgPSBuZXcgRGF0ZSgpO1xyXG5cdFx0aW5zdC5jdXJzb3JEYXRlLnNldEZ1bGxZZWFyKCB5ZWFyLCBtb250aCwgMSApO1xyXG5cdFx0aW5zdC5jdXJzb3JEYXRlLnNldE1vbnRoKCBtb250aCApO1x0XHRcdFx0XHRcdC8vIEluIHNvbWUgY2FzZXMsICB0aGUgc2V0RnVsbFllYXIgY2FuICBzZXQgIG9ubHkgWWVhciwgIGFuZCBub3QgdGhlIE1vbnRoIGFuZCBkYXkgICAgICAvL0ZpeEluOjYuMi4zLjVcclxuXHRcdGluc3QuY3Vyc29yRGF0ZS5zZXREYXRlKCAxICk7XHJcblxyXG5cdFx0aW5zdC5kcmF3TW9udGggPSBpbnN0LmN1cnNvckRhdGUuZ2V0TW9udGgoKTtcclxuXHRcdGluc3QuZHJhd1llYXIgID0gaW5zdC5jdXJzb3JEYXRlLmdldEZ1bGxZZWFyKCk7XHJcblxyXG5cdFx0alF1ZXJ5LmRhdGVwaWNrLl9ub3RpZnlDaGFuZ2UoIGluc3QgKTtcclxuXHRcdGpRdWVyeS5kYXRlcGljay5fYWRqdXN0SW5zdERhdGUoIGluc3QgKTtcclxuXHRcdGpRdWVyeS5kYXRlcGljay5fc2hvd0RhdGUoIGluc3QgKTtcclxuXHRcdGpRdWVyeS5kYXRlcGljay5fdXBkYXRlRGF0ZXBpY2soIGluc3QgKTtcclxuXHJcblx0XHRyZXR1cm4gIHRydWU7XHJcblx0fVxyXG5cdHJldHVybiAgZmFsc2U7XHJcbn0iXSwiZmlsZSI6ImluY2x1ZGVzL3BhZ2UtY3VzdG9taXplL19vdXQvY3VzdG9taXplX19pbmxpbmVfY2FsZW5kYXIuanMifQ==
