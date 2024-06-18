"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

jQuery('body').on({
  'touchmove': function touchmove(e) {
    jQuery('.timespartly').each(function (index) {
      var td_el = jQuery(this).get(0);

      if (undefined != td_el._tippy) {
        var instance = td_el._tippy;
        instance.hide();
      }
    });
  }
});
/**
 * Request Object
 * Here we can  define Search parameters and Update it later,  when  some parameter was changed
 *
 */

var wpbc_ajx_booking_listing = function (obj, $) {
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


  var p_listing = obj.search_request_obj = obj.search_request_obj || {
    sort: "booking_id",
    sort_type: "DESC",
    page_num: 1,
    page_items_count: 10,
    create_date: "",
    keyword: "",
    source: ""
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
}(wpbc_ajx_booking_listing || {}, jQuery);
/**
 *   Ajax  ------------------------------------------------------------------------------------------------------ */

/**
 * Send Ajax search request
 * for searching specific Keyword and other params
 */


function wpbc_ajx_booking_ajax_search_request() {
  console.groupCollapsed('AJX_BOOKING_LISTING');
  console.log(' == Before Ajax Send - search_get_all_params() == ', wpbc_ajx_booking_listing.search_get_all_params());
  wpbc_booking_listing_reload_button__spin_start();
  /*
  //FixIn: forVideo
  if ( ! is_this_action ){
  	//wpbc_ajx_booking__actual_listing__hide();
  	jQuery( wpbc_ajx_booking_listing.get_other_param( 'listing_container' ) ).html(
  		'<div style="width:100%;text-align: center;" id="wpbc_loading_section"><span class="wpbc_icn_autorenew wpbc_spin"></span></div>'
  		+ jQuery( wpbc_ajx_booking_listing.get_other_param( 'listing_container' ) ).html()
  	);
  	if ( 'function' === typeof (jQuery( '#wpbc_loading_section' ).wpbc_my_modal) ){			//FixIn: 9.0.1.5
  		jQuery( '#wpbc_loading_section' ).wpbc_my_modal( 'show' );
  	} else {
  		alert( 'Warning! Booking Calendar. Its seems that  you have deactivated loading of Bootstrap JS files at Booking Settings General page in Advanced section.' )
  	}
  }
  is_this_action = false;
  */
  // Start Ajax

  jQuery.post(wpbc_url_ajax, {
    action: 'WPBC_AJX_BOOKING_LISTING',
    wpbc_ajx_user_id: wpbc_ajx_booking_listing.get_secure_param('user_id'),
    nonce: wpbc_ajx_booking_listing.get_secure_param('nonce'),
    wpbc_ajx_locale: wpbc_ajx_booking_listing.get_secure_param('locale'),
    search_params: wpbc_ajx_booking_listing.search_get_all_params()
  },
  /**
   * S u c c e s s
   *
   * @param response_data		-	its object returned from  Ajax - class-live-searcg.php
   * @param textStatus		-	'success'
   * @param jqXHR				-	Object
   */
  function (response_data, textStatus, jqXHR) {
    //FixIn: forVideo
    //jQuery( '#wpbc_loading_section' ).wpbc_my_modal( 'hide' );
    console.log(' == Response WPBC_AJX_BOOKING_LISTING == ', response_data);
    console.groupEnd(); // Probably Error

    if (_typeof(response_data) !== 'object' || response_data === null) {
      jQuery('.wpbc_ajx_under_toolbar_row').hide(); //FixIn: 9.6.1.5

      jQuery(wpbc_ajx_booking_listing.get_other_param('listing_container')).html('<div class="wpbc-settings-notice notice-warning" style="text-align:left">' + response_data + '</div>');
      return;
    } // Reload page, after filter toolbar was reseted


    if (undefined != response_data['ajx_cleaned_params'] && 'reset_done' === response_data['ajx_cleaned_params']['ui_reset']) {
      location.reload();
      return;
    } // Show listing


    if (response_data['ajx_count'] > 0) {
      wpbc_ajx_booking_show_listing(response_data['ajx_items'], response_data['ajx_search_params'], response_data['ajx_booking_resources']);
      wpbc_pagination_echo(wpbc_ajx_booking_listing.get_other_param('pagination_container'), {
        'page_active': response_data['ajx_search_params']['page_num'],
        'pages_count': Math.ceil(response_data['ajx_count'] / response_data['ajx_search_params']['page_items_count']),
        'page_items_count': response_data['ajx_search_params']['page_items_count'],
        'sort_type': response_data['ajx_search_params']['sort_type']
      });
      wpbc_ajx_booking_define_ui_hooks(); // Redefine Hooks, because we show new DOM elements
    } else {
      wpbc_ajx_booking__actual_listing__hide();
      jQuery(wpbc_ajx_booking_listing.get_other_param('listing_container')).html('<div class="wpbc-settings-notice0 notice-warning0" style="text-align:center;margin-left:-50px;">' + '<strong>' + 'No results found for current filter options...' + '</strong>' + //'<strong>' + 'No results found...' + '</strong>' +
      '</div>');
    } // Update new booking count


    if (undefined !== response_data['ajx_new_bookings_count']) {
      var ajx_new_bookings_count = parseInt(response_data['ajx_new_bookings_count']);

      if (ajx_new_bookings_count > 0) {
        jQuery('.wpbc_badge_count').show();
      }

      jQuery('.bk-update-count').html(ajx_new_bookings_count);
    }

    wpbc_booking_listing_reload_button__spin_pause();
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
 *   Views  ----------------------------------------------------------------------------------------------------- */

/**
 * Show Listing Table 		and define gMail checkbox hooks
 *
 * @param json_items_arr		- JSON object with Items
 * @param json_search_params	- JSON object with Search
 */


function wpbc_ajx_booking_show_listing(json_items_arr, json_search_params, json_booking_resources) {
  wpbc_ajx_define_templates__resource_manipulation(json_items_arr, json_search_params, json_booking_resources); //console.log( 'json_items_arr' , json_items_arr, json_search_params );

  jQuery('.wpbc_ajx_under_toolbar_row').css("display", "flex"); //FixIn: 9.6.1.5

  var list_header_tpl = wp.template('wpbc_ajx_booking_list_header');
  var list_row_tpl = wp.template('wpbc_ajx_booking_list_row'); // Header

  jQuery(wpbc_ajx_booking_listing.get_other_param('listing_container')).html(list_header_tpl()); // Body

  jQuery(wpbc_ajx_booking_listing.get_other_param('listing_container')).append('<div class="wpbc_selectable_body"></div>'); // R o w s

  console.groupCollapsed('LISTING_ROWS'); // LISTING_ROWS

  _.each(json_items_arr, function (p_val, p_key, p_data) {
    if ('undefined' !== typeof json_search_params['keyword']) {
      // Parameter for marking keyword with different color in a list
      p_val['__search_request_keyword__'] = json_search_params['keyword'];
    } else {
      p_val['__search_request_keyword__'] = '';
    }

    p_val['booking_resources'] = json_booking_resources;
    jQuery(wpbc_ajx_booking_listing.get_other_param('listing_container') + ' .wpbc_selectable_body').append(list_row_tpl(p_val));
  });

  console.groupEnd(); // LISTING_ROWS

  wpbc_define_gmail_checkbox_selection(jQuery); // Redefine Hooks for clicking at Checkboxes
}
/**
 * Define template for changing booking resources &  update it each time,  when  listing updating, useful  for showing actual  booking resources.
 *
 * @param json_items_arr		- JSON object with Items
 * @param json_search_params	- JSON object with Search
 * @param json_booking_resources	- JSON object with Resources
 */


function wpbc_ajx_define_templates__resource_manipulation(json_items_arr, json_search_params, json_booking_resources) {
  // Change booking resource
  var change_booking_resource_tpl = wp.template('wpbc_ajx_change_booking_resource');
  jQuery('#wpbc_hidden_template__change_booking_resource').html(change_booking_resource_tpl({
    'ajx_search_params': json_search_params,
    'ajx_booking_resources': json_booking_resources
  })); // Duplicate booking resource

  var duplicate_booking_to_other_resource_tpl = wp.template('wpbc_ajx_duplicate_booking_to_other_resource');
  jQuery('#wpbc_hidden_template__duplicate_booking_to_other_resource').html(duplicate_booking_to_other_resource_tpl({
    'ajx_search_params': json_search_params,
    'ajx_booking_resources': json_booking_resources
  }));
}
/**
 * Show just message instead of listing and hide pagination
 */


function wpbc_ajx_booking_show_message(message) {
  wpbc_ajx_booking__actual_listing__hide();
  jQuery(wpbc_ajx_booking_listing.get_other_param('listing_container')).html('<div class="wpbc-settings-notice notice-warning" style="text-align:left">' + message + '</div>');
}
/**
 *   H o o k s  -  its Action/Times when need to re-Render Views  ----------------------------------------------- */

/**
 * Send Ajax Search Request after Updating search request parameters
 *
 * @param params_arr
 */


function wpbc_ajx_booking_send_search_request_with_params(params_arr) {
  // Define different Search  parameters for request
  _.each(params_arr, function (p_val, p_key, p_data) {
    //console.log( 'Request for: ', p_key, p_val );
    wpbc_ajx_booking_listing.search_set_param(p_key, p_val);
  }); // Send Ajax Request


  wpbc_ajx_booking_ajax_search_request();
}
/**
 * Search request for "Page Number"
 * @param page_number	int
 */


function wpbc_ajx_booking_pagination_click(page_number) {
  wpbc_ajx_booking_send_search_request_with_params({
    'page_num': page_number
  });
}
/**
 *   Keyword Searching  ----------------------------------------------------------------------------------------- */

/**
 * Search request for "Keyword", also set current page to  1
 *
 * @param element_id	-	HTML ID  of element,  where was entered keyword
 */


function wpbc_ajx_booking_send_search_request_for_keyword(element_id) {
  // We need to Reset page_num to 1 with each new search, because we can be at page #4,  but after  new search  we can  have totally  only  1 page
  wpbc_ajx_booking_send_search_request_with_params({
    'keyword': jQuery(element_id).val(),
    'page_num': 1
  });
}
/**
 * Send search request after few seconds (usually after 1,5 sec)
 * Closure function. Its useful,  for do  not send too many Ajax requests, when someone make fast typing.
 */


var wpbc_ajx_booking_searching_after_few_seconds = function () {
  var closed_timer = 0;
  return function (element_id, timer_delay) {
    // Get default value of "timer_delay",  if parameter was not passed into the function.
    timer_delay = typeof timer_delay !== 'undefined' ? timer_delay : 1500;
    clearTimeout(closed_timer); // Clear previous timer
    // Start new Timer

    closed_timer = setTimeout(wpbc_ajx_booking_send_search_request_for_keyword.bind(null, element_id), timer_delay);
  };
}();
/**
 *   Define Dynamic Hooks  (like pagination click, which renew each time with new listing showing)  ------------- */

/**
 * Define HTML ui Hooks: on KeyUp | Change | -> Sort Order & Number Items / Page
 * We are hcnaged it each  time, when showing new listing, because DOM elements chnaged
 */


function wpbc_ajx_booking_define_ui_hooks() {
  if ('function' === typeof wpbc_define_tippy_tooltips) {
    wpbc_define_tippy_tooltips('.wpbc_listing_container ');
  }

  wpbc_ajx_booking__ui_define__locale();
  wpbc_ajx_booking__ui_define__remark(); // Items Per Page

  jQuery('.wpbc_items_per_page').on('change', function (event) {
    wpbc_ajx_booking_send_search_request_with_params({
      'page_items_count': jQuery(this).val(),
      'page_num': 1
    });
  }); // Sorting

  jQuery('.wpbc_items_sort_type').on('change', function (event) {
    wpbc_ajx_booking_send_search_request_with_params({
      'sort_type': jQuery(this).val()
    });
  });
}
/**
 *   Show / Hide Listing  --------------------------------------------------------------------------------------- */

/**
 *  Show Listing Table 	- 	Sending Ajax Request	-	with parameters that  we early  defined in "wpbc_ajx_booking_listing" Obj.
 */


function wpbc_ajx_booking__actual_listing__show() {
  wpbc_ajx_booking_ajax_search_request(); // Send Ajax Request	-	with parameters that  we early  defined in "wpbc_ajx_booking_listing" Obj.
}
/**
 * Hide Listing Table ( and Pagination )
 */


function wpbc_ajx_booking__actual_listing__hide() {
  jQuery('.wpbc_ajx_under_toolbar_row').hide(); //FixIn: 9.6.1.5

  jQuery(wpbc_ajx_booking_listing.get_other_param('listing_container')).html('');
  jQuery(wpbc_ajx_booking_listing.get_other_param('pagination_container')).html('');
}
/**
 *   Support functions for Content Template data  --------------------------------------------------------------- */

/**
 * Highlight strings,
 * by inserting <span class="fieldvalue name fieldsearchvalue">...</span> html  elements into the string.
 * @param {string} booking_details 	- Source string
 * @param {string} booking_keyword	- Keyword to highlight
 * @returns {string}
 */


function wpbc_get_highlighted_search_keyword(booking_details, booking_keyword) {
  booking_keyword = booking_keyword.trim().toLowerCase();

  if (0 == booking_keyword.length) {
    return booking_details;
  } // Highlight substring withing HTML tags in "Content of booking fields data" -- e.g. starting from  >  and ending with <


  var keywordRegex = new RegExp("fieldvalue[^<>]*>([^<]*".concat(booking_keyword, "[^<]*)"), 'gim'); //let matches = [...booking_details.toLowerCase().matchAll( keywordRegex )];

  var matches = booking_details.toLowerCase().matchAll(keywordRegex);
  matches = Array.from(matches);
  var strings_arr = [];
  var pos_previous = 0;
  var search_pos_start;
  var search_pos_end;

  var _iterator = _createForOfIteratorHelper(matches),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var match = _step.value;
      search_pos_start = match.index + match[0].toLowerCase().indexOf('>', 0) + 1;
      strings_arr.push(booking_details.substr(pos_previous, search_pos_start - pos_previous));
      search_pos_end = booking_details.toLowerCase().indexOf('<', search_pos_start);
      strings_arr.push('<span class="fieldvalue name fieldsearchvalue">' + booking_details.substr(search_pos_start, search_pos_end - search_pos_start) + '</span>');
      pos_previous = search_pos_end;
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  strings_arr.push(booking_details.substr(pos_previous, booking_details.length - pos_previous));
  return strings_arr.join('');
}
/**
 * Convert special HTML characters   from:	 &amp; 	-> 	&
 *
 * @param text
 * @returns {*}
 */


function wpbc_decode_HTML_entities(text) {
  var textArea = document.createElement('textarea');
  textArea.innerHTML = text;
  return textArea.value;
}
/**
 * Convert TO special HTML characters   from:	 & 	-> 	&amp;
 *
 * @param text
 * @returns {*}
 */


function wpbc_encode_HTML_entities(text) {
  var textArea = document.createElement('textarea');
  textArea.innerText = text;
  return textArea.innerHTML;
}
/**
 *   Support Functions - Spin Icon in Buttons  ------------------------------------------------------------------ */

/**
 * Spin button in Filter toolbar  -  Start
 */


function wpbc_booking_listing_reload_button__spin_start() {
  jQuery('#wpbc_booking_listing_reload_button .menu_icon.wpbc_spin').removeClass('wpbc_animation_pause');
}
/**
 * Spin button in Filter toolbar  -  Pause
 */


function wpbc_booking_listing_reload_button__spin_pause() {
  jQuery('#wpbc_booking_listing_reload_button .menu_icon.wpbc_spin').addClass('wpbc_animation_pause');
}
/**
 * Spin button in Filter toolbar  -  is Spinning ?
 *
 * @returns {boolean}
 */


function wpbc_booking_listing_reload_button__is_spin() {
  if (jQuery('#wpbc_booking_listing_reload_button .menu_icon.wpbc_spin').hasClass('wpbc_animation_pause')) {
    return true;
  } else {
    return false;
  }
}
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluY2x1ZGVzL3BhZ2UtYm9va2luZ3MvX3NyYy9ib29raW5nc19fbGlzdGluZy5qcyJdLCJuYW1lcyI6WyJqUXVlcnkiLCJvbiIsImUiLCJlYWNoIiwiaW5kZXgiLCJ0ZF9lbCIsImdldCIsInVuZGVmaW5lZCIsIl90aXBweSIsImluc3RhbmNlIiwiaGlkZSIsIndwYmNfYWp4X2Jvb2tpbmdfbGlzdGluZyIsIm9iaiIsIiQiLCJwX3NlY3VyZSIsInNlY3VyaXR5X29iaiIsInVzZXJfaWQiLCJub25jZSIsImxvY2FsZSIsInNldF9zZWN1cmVfcGFyYW0iLCJwYXJhbV9rZXkiLCJwYXJhbV92YWwiLCJnZXRfc2VjdXJlX3BhcmFtIiwicF9saXN0aW5nIiwic2VhcmNoX3JlcXVlc3Rfb2JqIiwic29ydCIsInNvcnRfdHlwZSIsInBhZ2VfbnVtIiwicGFnZV9pdGVtc19jb3VudCIsImNyZWF0ZV9kYXRlIiwia2V5d29yZCIsInNvdXJjZSIsInNlYXJjaF9zZXRfYWxsX3BhcmFtcyIsInJlcXVlc3RfcGFyYW1fb2JqIiwic2VhcmNoX2dldF9hbGxfcGFyYW1zIiwic2VhcmNoX2dldF9wYXJhbSIsInNlYXJjaF9zZXRfcGFyYW0iLCJzZWFyY2hfc2V0X3BhcmFtc19hcnIiLCJwYXJhbXNfYXJyIiwiXyIsInBfdmFsIiwicF9rZXkiLCJwX2RhdGEiLCJwX290aGVyIiwib3RoZXJfb2JqIiwic2V0X290aGVyX3BhcmFtIiwiZ2V0X290aGVyX3BhcmFtIiwid3BiY19hanhfYm9va2luZ19hamF4X3NlYXJjaF9yZXF1ZXN0IiwiY29uc29sZSIsImdyb3VwQ29sbGFwc2VkIiwibG9nIiwid3BiY19ib29raW5nX2xpc3RpbmdfcmVsb2FkX2J1dHRvbl9fc3Bpbl9zdGFydCIsInBvc3QiLCJ3cGJjX3VybF9hamF4IiwiYWN0aW9uIiwid3BiY19hanhfdXNlcl9pZCIsIndwYmNfYWp4X2xvY2FsZSIsInNlYXJjaF9wYXJhbXMiLCJyZXNwb25zZV9kYXRhIiwidGV4dFN0YXR1cyIsImpxWEhSIiwiZ3JvdXBFbmQiLCJodG1sIiwibG9jYXRpb24iLCJyZWxvYWQiLCJ3cGJjX2FqeF9ib29raW5nX3Nob3dfbGlzdGluZyIsIndwYmNfcGFnaW5hdGlvbl9lY2hvIiwiTWF0aCIsImNlaWwiLCJ3cGJjX2FqeF9ib29raW5nX2RlZmluZV91aV9ob29rcyIsIndwYmNfYWp4X2Jvb2tpbmdfX2FjdHVhbF9saXN0aW5nX19oaWRlIiwiYWp4X25ld19ib29raW5nc19jb3VudCIsInBhcnNlSW50Iiwic2hvdyIsIndwYmNfYm9va2luZ19saXN0aW5nX3JlbG9hZF9idXR0b25fX3NwaW5fcGF1c2UiLCJmYWlsIiwiZXJyb3JUaHJvd24iLCJ3aW5kb3ciLCJlcnJvcl9tZXNzYWdlIiwicmVzcG9uc2VUZXh0IiwicmVwbGFjZSIsIndwYmNfYWp4X2Jvb2tpbmdfc2hvd19tZXNzYWdlIiwianNvbl9pdGVtc19hcnIiLCJqc29uX3NlYXJjaF9wYXJhbXMiLCJqc29uX2Jvb2tpbmdfcmVzb3VyY2VzIiwid3BiY19hanhfZGVmaW5lX3RlbXBsYXRlc19fcmVzb3VyY2VfbWFuaXB1bGF0aW9uIiwiY3NzIiwibGlzdF9oZWFkZXJfdHBsIiwid3AiLCJ0ZW1wbGF0ZSIsImxpc3Rfcm93X3RwbCIsImFwcGVuZCIsIndwYmNfZGVmaW5lX2dtYWlsX2NoZWNrYm94X3NlbGVjdGlvbiIsImNoYW5nZV9ib29raW5nX3Jlc291cmNlX3RwbCIsImR1cGxpY2F0ZV9ib29raW5nX3RvX290aGVyX3Jlc291cmNlX3RwbCIsIm1lc3NhZ2UiLCJ3cGJjX2FqeF9ib29raW5nX3NlbmRfc2VhcmNoX3JlcXVlc3Rfd2l0aF9wYXJhbXMiLCJ3cGJjX2FqeF9ib29raW5nX3BhZ2luYXRpb25fY2xpY2siLCJwYWdlX251bWJlciIsIndwYmNfYWp4X2Jvb2tpbmdfc2VuZF9zZWFyY2hfcmVxdWVzdF9mb3Jfa2V5d29yZCIsImVsZW1lbnRfaWQiLCJ2YWwiLCJ3cGJjX2FqeF9ib29raW5nX3NlYXJjaGluZ19hZnRlcl9mZXdfc2Vjb25kcyIsImNsb3NlZF90aW1lciIsInRpbWVyX2RlbGF5IiwiY2xlYXJUaW1lb3V0Iiwic2V0VGltZW91dCIsImJpbmQiLCJ3cGJjX2RlZmluZV90aXBweV90b29sdGlwcyIsIndwYmNfYWp4X2Jvb2tpbmdfX3VpX2RlZmluZV9fbG9jYWxlIiwid3BiY19hanhfYm9va2luZ19fdWlfZGVmaW5lX19yZW1hcmsiLCJldmVudCIsIndwYmNfYWp4X2Jvb2tpbmdfX2FjdHVhbF9saXN0aW5nX19zaG93Iiwid3BiY19nZXRfaGlnaGxpZ2h0ZWRfc2VhcmNoX2tleXdvcmQiLCJib29raW5nX2RldGFpbHMiLCJib29raW5nX2tleXdvcmQiLCJ0cmltIiwidG9Mb3dlckNhc2UiLCJsZW5ndGgiLCJrZXl3b3JkUmVnZXgiLCJSZWdFeHAiLCJtYXRjaGVzIiwibWF0Y2hBbGwiLCJBcnJheSIsImZyb20iLCJzdHJpbmdzX2FyciIsInBvc19wcmV2aW91cyIsInNlYXJjaF9wb3Nfc3RhcnQiLCJzZWFyY2hfcG9zX2VuZCIsIm1hdGNoIiwiaW5kZXhPZiIsInB1c2giLCJzdWJzdHIiLCJqb2luIiwid3BiY19kZWNvZGVfSFRNTF9lbnRpdGllcyIsInRleHQiLCJ0ZXh0QXJlYSIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImlubmVySFRNTCIsInZhbHVlIiwid3BiY19lbmNvZGVfSFRNTF9lbnRpdGllcyIsImlubmVyVGV4dCIsInJlbW92ZUNsYXNzIiwiYWRkQ2xhc3MiLCJ3cGJjX2Jvb2tpbmdfbGlzdGluZ19yZWxvYWRfYnV0dG9uX19pc19zcGluIiwiaGFzQ2xhc3MiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FBRUFBLE1BQU0sQ0FBQyxNQUFELENBQU4sQ0FBZUMsRUFBZixDQUFrQjtBQUNkLGVBQWEsbUJBQVNDLENBQVQsRUFBWTtBQUUzQkYsSUFBQUEsTUFBTSxDQUFFLGNBQUYsQ0FBTixDQUF5QkcsSUFBekIsQ0FBK0IsVUFBV0MsS0FBWCxFQUFrQjtBQUVoRCxVQUFJQyxLQUFLLEdBQUdMLE1B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bih7XHJcbiAgICAndG91Y2htb3ZlJzogZnVuY3Rpb24oZSkge1xyXG5cclxuXHRcdGpRdWVyeSggJy50aW1lc3BhcnRseScgKS5lYWNoKCBmdW5jdGlvbiAoIGluZGV4ICl7XHJcblxyXG5cdFx0XHR2YXIgdGRfZWwgPSBqUXVlcnkoIHRoaXMgKS5nZXQoIDAgKTtcclxuXHJcblx0XHRcdGlmICggKHVuZGVmaW5lZCAhPSB0ZF9lbC5fdGlwcHkpICl7XHJcblxyXG5cdFx0XHRcdHZhciBpbnN0YW5jZSA9IHRkX2VsLl90aXBweTtcclxuXHRcdFx0XHRpbnN0YW5jZS5oaWRlKCk7XHJcblx0XHRcdH1cclxuXHRcdH0gKTtcclxuXHR9XHJcbn0pO1xyXG5cclxuLyoqXHJcbiAqIFJlcXVlc3QgT2JqZWN0XHJcbiAqIEhlcmUgd2UgY2FuICBkZWZpbmUgU2VhcmNoIHBhcmFtZXRlcnMgYW5kIFVwZGF0ZSBpdCBsYXRlciwgIHdoZW4gIHNvbWUgcGFyYW1ldGVyIHdhcyBjaGFuZ2VkXHJcbiAqXHJcbiAqL1xyXG52YXIgd3BiY19hanhfYm9va2luZ19saXN0aW5nID0gKGZ1bmN0aW9uICggb2JqLCAkKSB7XHJcblxyXG5cdC8vIFNlY3VyZSBwYXJhbWV0ZXJzIGZvciBBamF4XHQtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHR2YXIgcF9zZWN1cmUgPSBvYmouc2VjdXJpdHlfb2JqID0gb2JqLnNlY3VyaXR5X29iaiB8fCB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHVzZXJfaWQ6IDAsXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdG5vbmNlICA6ICcnLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRsb2NhbGUgOiAnJ1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0ICB9O1xyXG5cclxuXHRvYmouc2V0X3NlY3VyZV9wYXJhbSA9IGZ1bmN0aW9uICggcGFyYW1fa2V5LCBwYXJhbV92YWwgKSB7XHJcblx0XHRwX3NlY3VyZVsgcGFyYW1fa2V5IF0gPSBwYXJhbV92YWw7XHJcblx0fTtcclxuXHJcblx0b2JqLmdldF9zZWN1cmVfcGFyYW0gPSBmdW5jdGlvbiAoIHBhcmFtX2tleSApIHtcclxuXHRcdHJldHVybiBwX3NlY3VyZVsgcGFyYW1fa2V5IF07XHJcblx0fTtcclxuXHJcblxyXG5cdC8vIExpc3RpbmcgU2VhcmNoIHBhcmFtZXRlcnNcdC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdHZhciBwX2xpc3RpbmcgPSBvYmouc2VhcmNoX3JlcXVlc3Rfb2JqID0gb2JqLnNlYXJjaF9yZXF1ZXN0X29iaiB8fCB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHNvcnQgICAgICAgICAgICA6IFwiYm9va2luZ19pZFwiLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRzb3J0X3R5cGUgICAgICAgOiBcIkRFU0NcIixcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0cGFnZV9udW0gICAgICAgIDogMSxcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0cGFnZV9pdGVtc19jb3VudDogMTAsXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNyZWF0ZV9kYXRlICAgICA6IFwiXCIsXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGtleXdvcmQgICAgICAgICA6IFwiXCIsXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHNvdXJjZSAgICAgICAgICA6IFwiXCJcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdH07XHJcblxyXG5cdG9iai5zZWFyY2hfc2V0X2FsbF9wYXJhbXMgPSBmdW5jdGlvbiAoIHJlcXVlc3RfcGFyYW1fb2JqICkge1xyXG5cdFx0cF9saXN0aW5nID0gcmVxdWVzdF9wYXJhbV9vYmo7XHJcblx0fTtcclxuXHJcblx0b2JqLnNlYXJjaF9nZXRfYWxsX3BhcmFtcyA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdHJldHVybiBwX2xpc3Rpbmc7XHJcblx0fTtcclxuXHJcblx0b2JqLnNlYXJjaF9nZXRfcGFyYW0gPSBmdW5jdGlvbiAoIHBhcmFtX2tleSApIHtcclxuXHRcdHJldHVybiBwX2xpc3RpbmdbIHBhcmFtX2tleSBdO1xyXG5cdH07XHJcblxyXG5cdG9iai5zZWFyY2hfc2V0X3BhcmFtID0gZnVuY3Rpb24gKCBwYXJhbV9rZXksIHBhcmFtX3ZhbCApIHtcclxuXHRcdC8vIGlmICggQXJyYXkuaXNBcnJheSggcGFyYW1fdmFsICkgKXtcclxuXHRcdC8vIFx0cGFyYW1fdmFsID0gSlNPTi5zdHJpbmdpZnkoIHBhcmFtX3ZhbCApO1xyXG5cdFx0Ly8gfVxyXG5cdFx0cF9saXN0aW5nWyBwYXJhbV9rZXkgXSA9IHBhcmFtX3ZhbDtcclxuXHR9O1xyXG5cclxuXHRvYmouc2VhcmNoX3NldF9wYXJhbXNfYXJyID0gZnVuY3Rpb24oIHBhcmFtc19hcnIgKXtcclxuXHRcdF8uZWFjaCggcGFyYW1zX2FyciwgZnVuY3Rpb24gKCBwX3ZhbCwgcF9rZXksIHBfZGF0YSApe1x0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vIERlZmluZSBkaWZmZXJlbnQgU2VhcmNoICBwYXJhbWV0ZXJzIGZvciByZXF1ZXN0XHJcblx0XHRcdHRoaXMuc2VhcmNoX3NldF9wYXJhbSggcF9rZXksIHBfdmFsICk7XHJcblx0XHR9ICk7XHJcblx0fVxyXG5cclxuXHJcblx0Ly8gT3RoZXIgcGFyYW1ldGVycyBcdFx0XHQtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHR2YXIgcF9vdGhlciA9IG9iai5vdGhlcl9vYmogPSBvYmoub3RoZXJfb2JqIHx8IHsgfTtcclxuXHJcblx0b2JqLnNldF9vdGhlcl9wYXJhbSA9IGZ1bmN0aW9uICggcGFyYW1fa2V5LCBwYXJhbV92YWwgKSB7XHJcblx0XHRwX290aGVyWyBwYXJhbV9rZXkgXSA9IHBhcmFtX3ZhbDtcclxuXHR9O1xyXG5cclxuXHRvYmouZ2V0X290aGVyX3BhcmFtID0gZnVuY3Rpb24gKCBwYXJhbV9rZXkgKSB7XHJcblx0XHRyZXR1cm4gcF9vdGhlclsgcGFyYW1fa2V5IF07XHJcblx0fTtcclxuXHJcblxyXG5cdHJldHVybiBvYmo7XHJcbn0oIHdwYmNfYWp4X2Jvb2tpbmdfbGlzdGluZyB8fCB7fSwgalF1ZXJ5ICkpO1xyXG5cclxuXHJcbi8qKlxyXG4gKiAgIEFqYXggIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xyXG5cclxuLyoqXHJcbiAqIFNlbmQgQWpheCBzZWFyY2ggcmVxdWVzdFxyXG4gKiBmb3Igc2VhcmNoaW5nIHNwZWNpZmljIEtleXdvcmQgYW5kIG90aGVyIHBhcmFtc1xyXG4gKi9cclxuZnVuY3Rpb24gd3BiY19hanhfYm9va2luZ19hamF4X3NlYXJjaF9yZXF1ZXN0KCl7XHJcblxyXG5jb25zb2xlLmdyb3VwQ29sbGFwc2VkKCdBSlhfQk9PS0lOR19MSVNUSU5HJyk7IGNvbnNvbGUubG9nKCAnID09IEJlZm9yZSBBamF4IFNlbmQgLSBzZWFyY2hfZ2V0X2FsbF9wYXJhbXMoKSA9PSAnICwgd3BiY19hanhfYm9va2luZ19saXN0aW5nLnNlYXJjaF9nZXRfYWxsX3BhcmFtcygpICk7XHJcblxyXG5cdHdwYmNfYm9va2luZ19saXN0aW5nX3JlbG9hZF9idXR0b25fX3NwaW5fc3RhcnQoKTtcclxuXHJcbi8qXHJcbi8vRml4SW46IGZvclZpZGVvXHJcbmlmICggISBpc190aGlzX2FjdGlvbiApe1xyXG5cdC8vd3BiY19hanhfYm9va2luZ19fYWN0dWFsX2xpc3RpbmdfX2hpZGUoKTtcclxuXHRqUXVlcnkoIHdwYmNfYWp4X2Jvb2tpbmdfbGlzdGluZy5nZXRfb3RoZXJfcGFyYW0oICdsaXN0aW5nX2NvbnRhaW5lcicgKSApLmh0bWwoXHJcblx0XHQnPGRpdiBzdHlsZT1cIndpZHRoOjEwMCU7dGV4dC1hbGlnbjogY2VudGVyO1wiIGlkPVwid3BiY19sb2FkaW5nX3NlY3Rpb25cIj48c3BhbiBjbGFzcz1cIndwYmNfaWNuX2F1dG9yZW5ldyB3cGJjX3NwaW5cIj48L3NwYW4+PC9kaXY+J1xyXG5cdFx0KyBqUXVlcnkoIHdwYmNfYWp4X2Jvb2tpbmdfbGlzdGluZy5nZXRfb3RoZXJfcGFyYW0oICdsaXN0aW5nX2NvbnRhaW5lcicgKSApLmh0bWwoKVxyXG5cdCk7XHJcblx0aWYgKCAnZnVuY3Rpb24nID09PSB0eXBlb2YgKGpRdWVyeSggJyN3cGJjX2xvYWRpbmdfc2VjdGlvbicgKS53cGJjX215X21vZGFsKSApe1x0XHRcdC8vRml4SW46IDkuMC4xLjVcclxuXHRcdGpRdWVyeSggJyN3cGJjX2xvYWRpbmdfc2VjdGlvbicgKS53cGJjX215X21vZGFsKCAnc2hvdycgKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0YWxlcnQoICdXYXJuaW5nISBCb29raW5nIENhbGVuZGFyLiBJdHMgc2VlbXMgdGhhdCAgeW91IGhhdmUgZGVhY3RpdmF0ZWQgbG9hZGluZyBvZiBCb290c3RyYXAgSlMgZmlsZXMgYXQgQm9va2luZyBTZXR0aW5ncyBHZW5lcmFsIHBhZ2UgaW4gQWR2YW5jZWQgc2VjdGlvbi4nIClcclxuXHR9XHJcbn1cclxuaXNfdGhpc19hY3Rpb24gPSBmYWxzZTtcclxuKi9cclxuXHQvLyBTdGFydCBBamF4XHJcblx0alF1ZXJ5LnBvc3QoIHdwYmNfdXJsX2FqYXgsXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0YWN0aW9uICAgICAgICAgIDogJ1dQQkNfQUpYX0JPT0tJTkdfTElTVElORycsXHJcblx0XHRcdFx0XHR3cGJjX2FqeF91c2VyX2lkOiB3cGJjX2FqeF9ib29raW5nX2xpc3RpbmcuZ2V0X3NlY3VyZV9wYXJhbSggJ3VzZXJfaWQnICksXHJcblx0XHRcdFx0XHRub25jZSAgICAgICAgICAgOiB3cGJjX2FqeF9ib29raW5nX2xpc3RpbmcuZ2V0X3NlY3VyZV9wYXJhbSggJ25vbmNlJyApLFxyXG5cdFx0XHRcdFx0d3BiY19hanhfbG9jYWxlIDogd3BiY19hanhfYm9va2luZ19saXN0aW5nLmdldF9zZWN1cmVfcGFyYW0oICdsb2NhbGUnICksXHJcblxyXG5cdFx0XHRcdFx0c2VhcmNoX3BhcmFtc1x0OiB3cGJjX2FqeF9ib29raW5nX2xpc3Rpbmcuc2VhcmNoX2dldF9hbGxfcGFyYW1zKClcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdC8qKlxyXG5cdFx0XHRcdCAqIFMgdSBjIGMgZSBzIHNcclxuXHRcdFx0XHQgKlxyXG5cdFx0XHRcdCAqIEBwYXJhbSByZXNwb25zZV9kYXRhXHRcdC1cdGl0cyBvYmplY3QgcmV0dXJuZWQgZnJvbSAgQWpheCAtIGNsYXNzLWxpdmUtc2VhcmNnLnBocFxyXG5cdFx0XHRcdCAqIEBwYXJhbSB0ZXh0U3RhdHVzXHRcdC1cdCdzdWNjZXNzJ1xyXG5cdFx0XHRcdCAqIEBwYXJhbSBqcVhIUlx0XHRcdFx0LVx0T2JqZWN0XHJcblx0XHRcdFx0ICovXHJcblx0XHRcdFx0ZnVuY3Rpb24gKCByZXNwb25zZV9kYXRhLCB0ZXh0U3RhdHVzLCBqcVhIUiApIHtcclxuLy9GaXhJbjogZm9yVmlkZW9cclxuLy9qUXVlcnkoICcjd3BiY19sb2FkaW5nX3NlY3Rpb24nICkud3BiY19teV9tb2RhbCggJ2hpZGUnICk7XHJcblxyXG5jb25zb2xlLmxvZyggJyA9PSBSZXNwb25zZSBXUEJDX0FKWF9CT09LSU5HX0xJU1RJTkcgPT0gJywgcmVzcG9uc2VfZGF0YSApOyBjb25zb2xlLmdyb3VwRW5kKCk7XHJcblx0XHRcdFx0XHQvLyBQcm9iYWJseSBFcnJvclxyXG5cdFx0XHRcdFx0aWYgKCAodHlwZW9mIHJlc3BvbnNlX2RhdGEgIT09ICdvYmplY3QnKSB8fCAocmVzcG9uc2VfZGF0YSA9PT0gbnVsbCkgKXtcclxuXHRcdFx0XHRcdFx0alF1ZXJ5KCAnLndwYmNfYWp4X3VuZGVyX3Rvb2xiYXJfcm93JyApLmhpZGUoKTtcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vRml4SW46IDkuNi4xLjVcclxuXHRcdFx0XHRcdFx0alF1ZXJ5KCB3cGJjX2FqeF9ib29raW5nX2xpc3RpbmcuZ2V0X290aGVyX3BhcmFtKCAnbGlzdGluZ19jb250YWluZXInICkgKS5odG1sKFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0JzxkaXYgY2xhc3M9XCJ3cGJjLXNldHRpbmdzLW5vdGljZSBub3RpY2Utd2FybmluZ1wiIHN0eWxlPVwidGV4dC1hbGlnbjpsZWZ0XCI+JyArXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJlc3BvbnNlX2RhdGEgK1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0JzwvZGl2PidcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0KTtcclxuXHRcdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdC8vIFJlbG9hZCBwYWdlLCBhZnRlciBmaWx0ZXIgdG9vbGJhciB3YXMgcmVzZXRlZFxyXG5cdFx0XHRcdFx0aWYgKCAgICAgICAoICAgICB1bmRlZmluZWQgIT0gcmVzcG9uc2VfZGF0YVsgJ2FqeF9jbGVhbmVkX3BhcmFtcycgXSlcclxuXHRcdFx0XHRcdFx0XHQmJiAoICdyZXNldF9kb25lJyA9PT0gcmVzcG9uc2VfZGF0YVsgJ2FqeF9jbGVhbmVkX3BhcmFtcycgXVsgJ3VpX3Jlc2V0JyBdKVxyXG5cdFx0XHRcdFx0KXtcclxuXHRcdFx0XHRcdFx0bG9jYXRpb24ucmVsb2FkKCk7XHJcblx0XHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHQvLyBTaG93IGxpc3RpbmdcclxuXHRcdFx0XHRcdGlmICggcmVzcG9uc2VfZGF0YVsgJ2FqeF9jb3VudCcgXSA+IDAgKXtcclxuXHJcblx0XHRcdFx0XHRcdHdwYmNfYWp4X2Jvb2tpbmdfc2hvd19saXN0aW5nKCByZXNwb25zZV9kYXRhWyAnYWp4X2l0ZW1zJyBdLCByZXNwb25zZV9kYXRhWyAnYWp4X3NlYXJjaF9wYXJhbXMnIF0sIHJlc3BvbnNlX2RhdGFbICdhanhfYm9va2luZ19yZXNvdXJjZXMnIF0gKTtcclxuXHJcblx0XHRcdFx0XHRcdHdwYmNfcGFnaW5hdGlvbl9lY2hvKFxyXG5cdFx0XHRcdFx0XHRcdHdwYmNfYWp4X2Jvb2tpbmdfbGlzdGluZy5nZXRfb3RoZXJfcGFyYW0oICdwYWdpbmF0aW9uX2NvbnRhaW5lcicgKSxcclxuXHRcdFx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdFx0XHQncGFnZV9hY3RpdmUnOiByZXNwb25zZV9kYXRhWyAnYWp4X3NlYXJjaF9wYXJhbXMnIF1bICdwYWdlX251bScgXSxcclxuXHRcdFx0XHRcdFx0XHRcdCdwYWdlc19jb3VudCc6IE1hdGguY2VpbCggcmVzcG9uc2VfZGF0YVsgJ2FqeF9jb3VudCcgXSAvIHJlc3BvbnNlX2RhdGFbICdhanhfc2VhcmNoX3BhcmFtcycgXVsgJ3BhZ2VfaXRlbXNfY291bnQnIF0gKSxcclxuXHJcblx0XHRcdFx0XHRcdFx0XHQncGFnZV9pdGVtc19jb3VudCc6IHJlc3BvbnNlX2RhdGFbICdhanhfc2VhcmNoX3BhcmFtcycgXVsgJ3BhZ2VfaXRlbXNfY291bnQnIF0sXHJcblx0XHRcdFx0XHRcdFx0XHQnc29ydF90eXBlJyAgICAgICA6IHJlc3BvbnNlX2RhdGFbICdhanhfc2VhcmNoX3BhcmFtcycgXVsgJ3NvcnRfdHlwZScgXVxyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0KTtcclxuXHRcdFx0XHRcdFx0d3BiY19hanhfYm9va2luZ19kZWZpbmVfdWlfaG9va3MoKTtcdFx0XHRcdFx0XHQvLyBSZWRlZmluZSBIb29rcywgYmVjYXVzZSB3ZSBzaG93IG5ldyBET00gZWxlbWVudHNcclxuXHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cclxuXHRcdFx0XHRcdFx0d3BiY19hanhfYm9va2luZ19fYWN0dWFsX2xpc3RpbmdfX2hpZGUoKTtcclxuXHRcdFx0XHRcdFx0alF1ZXJ5KCB3cGJjX2FqeF9ib29raW5nX2xpc3RpbmcuZ2V0X290aGVyX3BhcmFtKCAnbGlzdGluZ19jb250YWluZXInICkgKS5odG1sKFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0JzxkaXYgY2xhc3M9XCJ3cGJjLXNldHRpbmdzLW5vdGljZTAgbm90aWNlLXdhcm5pbmcwXCIgc3R5bGU9XCJ0ZXh0LWFsaWduOmNlbnRlcjttYXJnaW4tbGVmdDotNTBweDtcIj4nICtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0JzxzdHJvbmc+JyArICdObyByZXN1bHRzIGZvdW5kIGZvciBjdXJyZW50IGZpbHRlciBvcHRpb25zLi4uJyArICc8L3N0cm9uZz4nICtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Ly8nPHN0cm9uZz4nICsgJ05vIHJlc3VsdHMgZm91bmQuLi4nICsgJzwvc3Ryb25nPicgK1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0JzwvZGl2PidcclxuXHRcdFx0XHRcdFx0XHRcdFx0KTtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHQvLyBVcGRhdGUgbmV3IGJvb2tpbmcgY291bnRcclxuXHRcdFx0XHRcdGlmICggdW5kZWZpbmVkICE9PSByZXNwb25zZV9kYXRhWyAnYWp4X25ld19ib29raW5nc19jb3VudCcgXSApe1xyXG5cdFx0XHRcdFx0XHR2YXIgYWp4X25ld19ib29raW5nc19jb3VudCA9IHBhcnNlSW50KCByZXNwb25zZV9kYXRhWyAnYWp4X25ld19ib29raW5nc19jb3VudCcgXSApXHJcblx0XHRcdFx0XHRcdGlmIChhanhfbmV3X2Jvb2tpbmdzX2NvdW50PjApe1xyXG5cdFx0XHRcdFx0XHRcdGpRdWVyeSggJy53cGJjX2JhZGdlX2NvdW50JyApLnNob3coKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRqUXVlcnkoICcuYmstdXBkYXRlLWNvdW50JyApLmh0bWwoIGFqeF9uZXdfYm9va2luZ3NfY291bnQgKTtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHR3cGJjX2Jvb2tpbmdfbGlzdGluZ19yZWxvYWRfYnV0dG9uX19zcGluX3BhdXNlKCk7XHJcblxyXG5cdFx0XHRcdFx0alF1ZXJ5KCAnI2FqYXhfcmVzcG9uZCcgKS5odG1sKCByZXNwb25zZV9kYXRhICk7XHRcdC8vIEZvciBhYmlsaXR5IHRvIHNob3cgcmVzcG9uc2UsIGFkZCBzdWNoIERJViBlbGVtZW50IHRvIHBhZ2VcclxuXHRcdFx0XHR9XHJcblx0XHRcdCAgKS5mYWlsKCBmdW5jdGlvbiAoIGpxWEhSLCB0ZXh0U3RhdHVzLCBlcnJvclRocm93biApIHsgICAgaWYgKCB3aW5kb3cuY29uc29sZSAmJiB3aW5kb3cuY29uc29sZS5sb2cgKXsgY29uc29sZS5sb2coICdBamF4X0Vycm9yJywganFYSFIsIHRleHRTdGF0dXMsIGVycm9yVGhyb3duICk7IH1cclxuXHRcdFx0XHRcdGpRdWVyeSggJy53cGJjX2FqeF91bmRlcl90b29sYmFyX3JvdycgKS5oaWRlKCk7XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vRml4SW46IDkuNi4xLjVcclxuXHRcdFx0XHRcdHZhciBlcnJvcl9tZXNzYWdlID0gJzxzdHJvbmc+JyArICdFcnJvciEnICsgJzwvc3Ryb25nPiAnICsgZXJyb3JUaHJvd24gO1xyXG5cdFx0XHRcdFx0aWYgKCBqcVhIUi5yZXNwb25zZVRleHQgKXtcclxuXHRcdFx0XHRcdFx0ZXJyb3JfbWVzc2FnZSArPSBqcVhIUi5yZXNwb25zZVRleHQ7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRlcnJvcl9tZXNzYWdlID0gZXJyb3JfbWVzc2FnZS5yZXBsYWNlKCAvXFxuL2csIFwiPGJyIC8+XCIgKTtcclxuXHJcblx0XHRcdFx0XHR3cGJjX2FqeF9ib29raW5nX3Nob3dfbWVzc2FnZSggZXJyb3JfbWVzc2FnZSApO1xyXG5cdFx0XHQgIH0pXHJcblx0ICAgICAgICAgIC8vIC5kb25lKCAgIGZ1bmN0aW9uICggZGF0YSwgdGV4dFN0YXR1cywganFYSFIgKSB7ICAgaWYgKCB3aW5kb3cuY29uc29sZSAmJiB3aW5kb3cuY29uc29sZS5sb2cgKXsgY29uc29sZS5sb2coICdzZWNvbmQgc3VjY2VzcycsIGRhdGEsIHRleHRTdGF0dXMsIGpxWEhSICk7IH0gICAgfSlcclxuXHRcdFx0ICAvLyAuYWx3YXlzKCBmdW5jdGlvbiAoIGRhdGFfanFYSFIsIHRleHRTdGF0dXMsIGpxWEhSX2Vycm9yVGhyb3duICkgeyAgIGlmICggd2luZG93LmNvbnNvbGUgJiYgd2luZG93LmNvbnNvbGUubG9nICl7IGNvbnNvbGUubG9nKCAnYWx3YXlzIGZpbmlzaGVkJywgZGF0YV9qcVhIUiwgdGV4dFN0YXR1cywganFYSFJfZXJyb3JUaHJvd24gKTsgfSAgICAgfSlcclxuXHRcdFx0ICA7ICAvLyBFbmQgQWpheFxyXG59XHJcblxyXG5cclxuLyoqXHJcbiAqICAgVmlld3MgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXHJcblxyXG4vKipcclxuICogU2hvdyBMaXN0aW5nIFRhYmxlIFx0XHRhbmQgZGVmaW5lIGdNYWlsIGNoZWNrYm94IGhvb2tzXHJcbiAqXHJcbiAqIEBwYXJhbSBqc29uX2l0ZW1zX2Fyclx0XHQtIEpTT04gb2JqZWN0IHdpdGggSXRlbXNcclxuICogQHBhcmFtIGpzb25fc2VhcmNoX3BhcmFtc1x0LSBKU09OIG9iamVjdCB3aXRoIFNlYXJjaFxyXG4gKi9cclxuZnVuY3Rpb24gd3BiY19hanhfYm9va2luZ19zaG93X2xpc3RpbmcoIGpzb25faXRlbXNfYXJyLCBqc29uX3NlYXJjaF9wYXJhbXMsIGpzb25fYm9va2luZ19yZXNvdXJjZXMgKXtcclxuXHJcblx0d3BiY19hanhfZGVmaW5lX3RlbXBsYXRlc19fcmVzb3VyY2VfbWFuaXB1bGF0aW9uKCBqc29uX2l0ZW1zX2FyciwganNvbl9zZWFyY2hfcGFyYW1zLCBqc29uX2Jvb2tpbmdfcmVzb3VyY2VzICk7XHJcblxyXG4vL2NvbnNvbGUubG9nKCAnanNvbl9pdGVtc19hcnInICwganNvbl9pdGVtc19hcnIsIGpzb25fc2VhcmNoX3BhcmFtcyApO1xyXG5cdGpRdWVyeSggJy53cGJjX2FqeF91bmRlcl90b29sYmFyX3JvdycgKS5jc3MoIFwiZGlzcGxheVwiLCBcImZsZXhcIiApO1x0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Ly9GaXhJbjogOS42LjEuNVxyXG5cdHZhciBsaXN0X2hlYWRlcl90cGwgPSB3cC50ZW1wbGF0ZSggJ3dwYmNfYWp4X2Jvb2tpbmdfbGlzdF9oZWFkZXInICk7XHJcblx0dmFyIGxpc3Rfcm93X3RwbCAgICA9IHdwLnRlbXBsYXRlKCAnd3BiY19hanhfYm9va2luZ19saXN0X3JvdycgKTtcclxuXHJcblxyXG5cdC8vIEhlYWRlclxyXG5cdGpRdWVyeSggd3BiY19hanhfYm9va2luZ19saXN0aW5nLmdldF9vdGhlcl9wYXJhbSggJ2xpc3RpbmdfY29udGFpbmVyJyApICkuaHRtbCggbGlzdF9oZWFkZXJfdHBsKCkgKTtcclxuXHJcblx0Ly8gQm9keVxyXG5cdGpRdWVyeSggd3BiY19hanhfYm9va2luZ19saXN0aW5nLmdldF9vdGhlcl9wYXJhbSggJ2xpc3RpbmdfY29udGFpbmVyJyApICkuYXBwZW5kKCAnPGRpdiBjbGFzcz1cIndwYmNfc2VsZWN0YWJsZV9ib2R5XCI+PC9kaXY+JyApO1xyXG5cclxuXHQvLyBSIG8gdyBzXHJcbmNvbnNvbGUuZ3JvdXBDb2xsYXBzZWQoICdMSVNUSU5HX1JPV1MnICk7XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vIExJU1RJTkdfUk9XU1xyXG5cdF8uZWFjaCgganNvbl9pdGVtc19hcnIsIGZ1bmN0aW9uICggcF92YWwsIHBfa2V5LCBwX2RhdGEgKXtcclxuXHRcdGlmICggJ3VuZGVmaW5lZCcgIT09IHR5cGVvZiBqc29uX3NlYXJjaF9wYXJhbXNbICdrZXl3b3JkJyBdICl7XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvLyBQYXJhbWV0ZXIgZm9yIG1hcmtpbmcga2V5d29yZCB3aXRoIGRpZmZlcmVudCBjb2xvciBpbiBhIGxpc3RcclxuXHRcdFx0cF92YWxbICdfX3NlYXJjaF9yZXF1ZXN0X2tleXdvcmRfXycgXSA9IGpzb25fc2VhcmNoX3BhcmFtc1sgJ2tleXdvcmQnIF07XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRwX3ZhbFsgJ19fc2VhcmNoX3JlcXVlc3Rfa2V5d29yZF9fJyBdID0gJyc7XHJcblx0XHR9XHJcblx0XHRwX3ZhbFsgJ2Jvb2tpbmdfcmVzb3VyY2VzJyBdID0ganNvbl9ib29raW5nX3Jlc291cmNlcztcclxuXHRcdGpRdWVyeSggd3BiY19hanhfYm9va2luZ19saXN0aW5nLmdldF9vdGhlcl9wYXJhbSggJ2xpc3RpbmdfY29udGFpbmVyJyApICsgJyAud3BiY19zZWxlY3RhYmxlX2JvZHknICkuYXBwZW5kKCBsaXN0X3Jvd190cGwoIHBfdmFsICkgKTtcclxuXHR9ICk7XHJcbmNvbnNvbGUuZ3JvdXBFbmQoKTsgXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvLyBMSVNUSU5HX1JPV1NcclxuXHJcblx0d3BiY19kZWZpbmVfZ21haWxfY2hlY2tib3hfc2VsZWN0aW9uKCBqUXVlcnkgKTtcdFx0XHRcdFx0XHQvLyBSZWRlZmluZSBIb29rcyBmb3IgY2xpY2tpbmcgYXQgQ2hlY2tib3hlc1xyXG59XHJcblxyXG5cclxuXHQvKipcclxuXHQgKiBEZWZpbmUgdGVtcGxhdGUgZm9yIGNoYW5naW5nIGJvb2tpbmcgcmVzb3VyY2VzICYgIHVwZGF0ZSBpdCBlYWNoIHRpbWUsICB3aGVuICBsaXN0aW5nIHVwZGF0aW5nLCB1c2VmdWwgIGZvciBzaG93aW5nIGFjdHVhbCAgYm9va2luZyByZXNvdXJjZXMuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ganNvbl9pdGVtc19hcnJcdFx0LSBKU09OIG9iamVjdCB3aXRoIEl0ZW1zXHJcblx0ICogQHBhcmFtIGpzb25fc2VhcmNoX3BhcmFtc1x0LSBKU09OIG9iamVjdCB3aXRoIFNlYXJjaFxyXG5cdCAqIEBwYXJhbSBqc29uX2Jvb2tpbmdfcmVzb3VyY2VzXHQtIEpTT04gb2JqZWN0IHdpdGggUmVzb3VyY2VzXHJcblx0ICovXHJcblx0ZnVuY3Rpb24gd3BiY19hanhfZGVmaW5lX3RlbXBsYXRlc19fcmVzb3VyY2VfbWFuaXB1bGF0aW9uKCBqc29uX2l0ZW1zX2FyciwganNvbl9zZWFyY2hfcGFyYW1zLCBqc29uX2Jvb2tpbmdfcmVzb3VyY2VzICl7XHJcblxyXG5cdFx0Ly8gQ2hhbmdlIGJvb2tpbmcgcmVzb3VyY2VcclxuXHRcdHZhciBjaGFuZ2VfYm9va2luZ19yZXNvdXJjZV90cGwgPSB3cC50ZW1wbGF0ZSggJ3dwYmNfYWp4X2NoYW5nZV9ib29raW5nX3Jlc291cmNlJyApO1xyXG5cclxuXHRcdGpRdWVyeSggJyN3cGJjX2hpZGRlbl90ZW1wbGF0ZV9fY2hhbmdlX2Jvb2tpbmdfcmVzb3VyY2UnICkuaHRtbChcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjaGFuZ2VfYm9va2luZ19yZXNvdXJjZV90cGwoIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCdhanhfc2VhcmNoX3BhcmFtcycgICAgOiBqc29uX3NlYXJjaF9wYXJhbXMsXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQnYWp4X2Jvb2tpbmdfcmVzb3VyY2VzJzoganNvbl9ib29raW5nX3Jlc291cmNlc1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdH0gKVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0KTtcclxuXHJcblx0XHQvLyBEdXBsaWNhdGUgYm9va2luZyByZXNvdXJjZVxyXG5cdFx0dmFyIGR1cGxpY2F0ZV9ib29raW5nX3RvX290aGVyX3Jlc291cmNlX3RwbCA9IHdwLnRlbXBsYXRlKCAnd3BiY19hanhfZHVwbGljYXRlX2Jvb2tpbmdfdG9fb3RoZXJfcmVzb3VyY2UnICk7XHJcblxyXG5cdFx0alF1ZXJ5KCAnI3dwYmNfaGlkZGVuX3RlbXBsYXRlX19kdXBsaWNhdGVfYm9va2luZ190b19vdGhlcl9yZXNvdXJjZScgKS5odG1sKFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGR1cGxpY2F0ZV9ib29raW5nX3RvX290aGVyX3Jlc291cmNlX3RwbCgge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0J2FqeF9zZWFyY2hfcGFyYW1zJyAgICA6IGpzb25fc2VhcmNoX3BhcmFtcyxcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCdhanhfYm9va2luZ19yZXNvdXJjZXMnOiBqc29uX2Jvb2tpbmdfcmVzb3VyY2VzXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0fSApXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQpO1xyXG5cdH1cclxuXHJcblxyXG4vKipcclxuICogU2hvdyBqdXN0IG1lc3NhZ2UgaW5zdGVhZCBvZiBsaXN0aW5nIGFuZCBoaWRlIHBhZ2luYXRpb25cclxuICovXHJcbmZ1bmN0aW9uIHdwYmNfYWp4X2Jvb2tpbmdfc2hvd19tZXNzYWdlKCBtZXNzYWdlICl7XHJcblxyXG5cdHdwYmNfYWp4X2Jvb2tpbmdfX2FjdHVhbF9saXN0aW5nX19oaWRlKCk7XHJcblxyXG5cdGpRdWVyeSggd3BiY19hanhfYm9va2luZ19saXN0aW5nLmdldF9vdGhlcl9wYXJhbSggJ2xpc3RpbmdfY29udGFpbmVyJyApICkuaHRtbChcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0JzxkaXYgY2xhc3M9XCJ3cGJjLXNldHRpbmdzLW5vdGljZSBub3RpY2Utd2FybmluZ1wiIHN0eWxlPVwidGV4dC1hbGlnbjpsZWZ0XCI+JyArXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0bWVzc2FnZSArXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCc8L2Rpdj4nXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0KTtcclxufVxyXG5cclxuXHJcbi8qKlxyXG4gKiAgIEggbyBvIGsgcyAgLSAgaXRzIEFjdGlvbi9UaW1lcyB3aGVuIG5lZWQgdG8gcmUtUmVuZGVyIFZpZXdzICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xyXG5cclxuLyoqXHJcbiAqIFNlbmQgQWpheCBTZWFyY2ggUmVxdWVzdCBhZnRlciBVcGRhdGluZyBzZWFyY2ggcmVxdWVzdCBwYXJhbWV0ZXJzXHJcbiAqXHJcbiAqIEBwYXJhbSBwYXJhbXNfYXJyXHJcbiAqL1xyXG5mdW5jdGlvbiB3cGJjX2FqeF9ib29raW5nX3NlbmRfc2VhcmNoX3JlcXVlc3Rfd2l0aF9wYXJhbXMgKCBwYXJhbXNfYXJyICl7XHJcblxyXG5cdC8vIERlZmluZSBkaWZmZXJlbnQgU2VhcmNoICBwYXJhbWV0ZXJzIGZvciByZXF1ZXN0XHJcblx0Xy5lYWNoKCBwYXJhbXNfYXJyLCBmdW5jdGlvbiAoIHBfdmFsLCBwX2tleSwgcF9kYXRhICkge1xyXG5cdFx0Ly9jb25zb2xlLmxvZyggJ1JlcXVlc3QgZm9yOiAnLCBwX2tleSwgcF92YWwgKTtcclxuXHRcdHdwYmNfYWp4X2Jvb2tpbmdfbGlzdGluZy5zZWFyY2hfc2V0X3BhcmFtKCBwX2tleSwgcF92YWwgKTtcclxuXHR9KTtcclxuXHJcblx0Ly8gU2VuZCBBamF4IFJlcXVlc3RcclxuXHR3cGJjX2FqeF9ib29raW5nX2FqYXhfc2VhcmNoX3JlcXVlc3QoKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFNlYXJjaCByZXF1ZXN0IGZvciBcIlBhZ2UgTnVtYmVyXCJcclxuICogQHBhcmFtIHBhZ2VfbnVtYmVyXHRpbnRcclxuICovXHJcbmZ1bmN0aW9uIHdwYmNfYWp4X2Jvb2tpbmdfcGFnaW5hdGlvbl9jbGljayggcGFnZV9udW1iZXIgKXtcclxuXHJcblx0d3BiY19hanhfYm9va2luZ19zZW5kX3NlYXJjaF9yZXF1ZXN0X3dpdGhfcGFyYW1zKCB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0J3BhZ2VfbnVtJzogcGFnZV9udW1iZXJcclxuXHRcdFx0XHRcdFx0XHRcdFx0fSApO1xyXG59XHJcblxyXG5cclxuLyoqXHJcbiAqICAgS2V5d29yZCBTZWFyY2hpbmcgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXHJcblxyXG4vKipcclxuICogU2VhcmNoIHJlcXVlc3QgZm9yIFwiS2V5d29yZFwiLCBhbHNvIHNldCBjdXJyZW50IHBhZ2UgdG8gIDFcclxuICpcclxuICogQHBhcmFtIGVsZW1lbnRfaWRcdC1cdEhUTUwgSUQgIG9mIGVsZW1lbnQsICB3aGVyZSB3YXMgZW50ZXJlZCBrZXl3b3JkXHJcbiAqL1xyXG5mdW5jdGlvbiB3cGJjX2FqeF9ib29raW5nX3NlbmRfc2VhcmNoX3JlcXVlc3RfZm9yX2tleXdvcmQoIGVsZW1lbnRfaWQgKSB7XHJcblxyXG5cdC8vIFdlIG5lZWQgdG8gUmVzZXQgcGFnZV9udW0gdG8gMSB3aXRoIGVhY2ggbmV3IHNlYXJjaCwgYmVjYXVzZSB3ZSBjYW4gYmUgYXQgcGFnZSAjNCwgIGJ1dCBhZnRlciAgbmV3IHNlYXJjaCAgd2UgY2FuICBoYXZlIHRvdGFsbHkgIG9ubHkgIDEgcGFnZVxyXG5cdHdwYmNfYWp4X2Jvb2tpbmdfc2VuZF9zZWFyY2hfcmVxdWVzdF93aXRoX3BhcmFtcygge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0J2tleXdvcmQnICA6IGpRdWVyeSggZWxlbWVudF9pZCApLnZhbCgpLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0J3BhZ2VfbnVtJzogMVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdH0gKTtcclxufVxyXG5cclxuXHQvKipcclxuXHQgKiBTZW5kIHNlYXJjaCByZXF1ZXN0IGFmdGVyIGZldyBzZWNvbmRzICh1c3VhbGx5IGFmdGVyIDEsNSBzZWMpXHJcblx0ICogQ2xvc3VyZSBmdW5jdGlvbi4gSXRzIHVzZWZ1bCwgIGZvciBkbyAgbm90IHNlbmQgdG9vIG1hbnkgQWpheCByZXF1ZXN0cywgd2hlbiBzb21lb25lIG1ha2UgZmFzdCB0eXBpbmcuXHJcblx0ICovXHJcblx0dmFyIHdwYmNfYWp4X2Jvb2tpbmdfc2VhcmNoaW5nX2FmdGVyX2Zld19zZWNvbmRzID0gZnVuY3Rpb24gKCl7XHJcblxyXG5cdFx0dmFyIGNsb3NlZF90aW1lciA9IDA7XHJcblxyXG5cdFx0cmV0dXJuIGZ1bmN0aW9uICggZWxlbWVudF9pZCwgdGltZXJfZGVsYXkgKXtcclxuXHJcblx0XHRcdC8vIEdldCBkZWZhdWx0IHZhbHVlIG9mIFwidGltZXJfZGVsYXlcIiwgIGlmIHBhcmFtZXRlciB3YXMgbm90IHBhc3NlZCBpbnRvIHRoZSBmdW5jdGlvbi5cclxuXHRcdFx0dGltZXJfZGVsYXkgPSB0eXBlb2YgdGltZXJfZGVsYXkgIT09ICd1bmRlZmluZWQnID8gdGltZXJfZGVsYXkgOiAxNTAwO1xyXG5cclxuXHRcdFx0Y2xlYXJUaW1lb3V0KCBjbG9zZWRfdGltZXIgKTtcdFx0Ly8gQ2xlYXIgcHJldmlvdXMgdGltZXJcclxuXHJcblx0XHRcdC8vIFN0YXJ0IG5ldyBUaW1lclxyXG5cdFx0XHRjbG9zZWRfdGltZXIgPSBzZXRUaW1lb3V0KCB3cGJjX2FqeF9ib29raW5nX3NlbmRfc2VhcmNoX3JlcXVlc3RfZm9yX2tleXdvcmQuYmluZCggIG51bGwsIGVsZW1lbnRfaWQgKSwgdGltZXJfZGVsYXkgKTtcclxuXHRcdH1cclxuXHR9KCk7XHJcblxyXG5cclxuLyoqXHJcbiAqICAgRGVmaW5lIER5bmFtaWMgSG9va3MgIChsaWtlIHBhZ2luYXRpb24gY2xpY2ssIHdoaWNoIHJlbmV3IGVhY2ggdGltZSB3aXRoIG5ldyBsaXN0aW5nIHNob3dpbmcpICAtLS0tLS0tLS0tLS0tICovXHJcblxyXG4vKipcclxuICogRGVmaW5lIEhUTUwgdWkgSG9va3M6IG9uIEtleVVwIHwgQ2hhbmdlIHwgLT4gU29ydCBPcmRlciAmIE51bWJlciBJdGVtcyAvIFBhZ2VcclxuICogV2UgYXJlIGhjbmFnZWQgaXQgZWFjaCAgdGltZSwgd2hlbiBzaG93aW5nIG5ldyBsaXN0aW5nLCBiZWNhdXNlIERPTSBlbGVtZW50cyBjaG5hZ2VkXHJcbiAqL1xyXG5mdW5jdGlvbiB3cGJjX2FqeF9ib29raW5nX2RlZmluZV91aV9ob29rcygpe1xyXG5cclxuXHRpZiAoICdmdW5jdGlvbicgPT09IHR5cGVvZiggd3BiY19kZWZpbmVfdGlwcHlfdG9vbHRpcHMgKSApIHtcclxuXHRcdHdwYmNfZGVmaW5lX3RpcHB5X3Rvb2x0aXBzKCAnLndwYmNfbGlzdGluZ19jb250YWluZXIgJyApO1xyXG5cdH1cclxuXHJcblx0d3BiY19hanhfYm9va2luZ19fdWlfZGVmaW5lX19sb2NhbGUoKTtcclxuXHR3cGJjX2FqeF9ib29raW5nX191aV9kZWZpbmVfX3JlbWFyaygpO1xyXG5cclxuXHQvLyBJdGVtcyBQZXIgUGFnZVxyXG5cdGpRdWVyeSggJy53cGJjX2l0ZW1zX3Blcl9wYWdlJyApLm9uKCAnY2hhbmdlJywgZnVuY3Rpb24oIGV2ZW50ICl7XHJcblxyXG5cdFx0d3BiY19hanhfYm9va2luZ19zZW5kX3NlYXJjaF9yZXF1ZXN0X3dpdGhfcGFyYW1zKCB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQncGFnZV9pdGVtc19jb3VudCcgIDogalF1ZXJ5KCB0aGlzICkudmFsKCksXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQncGFnZV9udW0nOiAxXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0fSApO1xyXG5cdH0gKTtcclxuXHJcblx0Ly8gU29ydGluZ1xyXG5cdGpRdWVyeSggJy53cGJjX2l0ZW1zX3NvcnRfdHlwZScgKS5vbiggJ2NoYW5nZScsIGZ1bmN0aW9uKCBldmVudCApe1xyXG5cclxuXHRcdHdwYmNfYWp4X2Jvb2tpbmdfc2VuZF9zZWFyY2hfcmVxdWVzdF93aXRoX3BhcmFtcyggeydzb3J0X3R5cGUnOiBqUXVlcnkoIHRoaXMgKS52YWwoKX0gKTtcclxuXHR9ICk7XHJcbn1cclxuXHJcblxyXG4vKipcclxuICogICBTaG93IC8gSGlkZSBMaXN0aW5nICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cclxuXHJcbi8qKlxyXG4gKiAgU2hvdyBMaXN0aW5nIFRhYmxlIFx0LSBcdFNlbmRpbmcgQWpheCBSZXF1ZXN0XHQtXHR3aXRoIHBhcmFtZXRlcnMgdGhhdCAgd2UgZWFybHkgIGRlZmluZWQgaW4gXCJ3cGJjX2FqeF9ib29raW5nX2xpc3RpbmdcIiBPYmouXHJcbiAqL1xyXG5mdW5jdGlvbiB3cGJjX2FqeF9ib29raW5nX19hY3R1YWxfbGlzdGluZ19fc2hvdygpe1xyXG5cclxuXHR3cGJjX2FqeF9ib29raW5nX2FqYXhfc2VhcmNoX3JlcXVlc3QoKTtcdFx0XHQvLyBTZW5kIEFqYXggUmVxdWVzdFx0LVx0d2l0aCBwYXJhbWV0ZXJzIHRoYXQgIHdlIGVhcmx5ICBkZWZpbmVkIGluIFwid3BiY19hanhfYm9va2luZ19saXN0aW5nXCIgT2JqLlxyXG59XHJcblxyXG4vKipcclxuICogSGlkZSBMaXN0aW5nIFRhYmxlICggYW5kIFBhZ2luYXRpb24gKVxyXG4gKi9cclxuZnVuY3Rpb24gd3BiY19hanhfYm9va2luZ19fYWN0dWFsX2xpc3RpbmdfX2hpZGUoKXtcclxuXHRqUXVlcnkoICcud3BiY19hanhfdW5kZXJfdG9vbGJhcl9yb3cnICkuaGlkZSgpO1x0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vRml4SW46IDkuNi4xLjVcclxuXHRqUXVlcnkoIHdwYmNfYWp4X2Jvb2tpbmdfbGlzdGluZy5nZXRfb3RoZXJfcGFyYW0oICdsaXN0aW5nX2NvbnRhaW5lcicgKSAgICApLmh0bWwoICcnICk7XHJcblx0alF1ZXJ5KCB3cGJjX2FqeF9ib29raW5nX2xpc3RpbmcuZ2V0X290aGVyX3BhcmFtKCAncGFnaW5hdGlvbl9jb250YWluZXInICkgKS5odG1sKCAnJyApO1xyXG59XHJcblxyXG5cclxuLyoqXHJcbiAqICAgU3VwcG9ydCBmdW5jdGlvbnMgZm9yIENvbnRlbnQgVGVtcGxhdGUgZGF0YSAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXHJcblxyXG4vKipcclxuICogSGlnaGxpZ2h0IHN0cmluZ3MsXHJcbiAqIGJ5IGluc2VydGluZyA8c3BhbiBjbGFzcz1cImZpZWxkdmFsdWUgbmFtZSBmaWVsZHNlYXJjaHZhbHVlXCI+Li4uPC9zcGFuPiBodG1sICBlbGVtZW50cyBpbnRvIHRoZSBzdHJpbmcuXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBib29raW5nX2RldGFpbHMgXHQtIFNvdXJjZSBzdHJpbmdcclxuICogQHBhcmFtIHtzdHJpbmd9IGJvb2tpbmdfa2V5d29yZFx0LSBLZXl3b3JkIHRvIGhpZ2hsaWdodFxyXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gKi9cclxuZnVuY3Rpb24gd3BiY19nZXRfaGlnaGxpZ2h0ZWRfc2VhcmNoX2tleXdvcmQoIGJvb2tpbmdfZGV0YWlscywgYm9va2luZ19rZXl3b3JkICl7XHJcblxyXG5cdGJvb2tpbmdfa2V5d29yZCA9IGJvb2tpbmdfa2V5d29yZC50cmltKCkudG9Mb3dlckNhc2UoKTtcclxuXHRpZiAoIDAgPT0gYm9va2luZ19rZXl3b3JkLmxlbmd0aCApe1xyXG5cdFx0cmV0dXJuIGJvb2tpbmdfZGV0YWlscztcclxuXHR9XHJcblxyXG5cdC8vIEhpZ2hsaWdodCBzdWJzdHJpbmcgd2l0aGluZyBIVE1MIHRhZ3MgaW4gXCJDb250ZW50IG9mIGJvb2tpbmcgZmllbGRzIGRhdGFcIiAtLSBlLmcuIHN0YXJ0aW5nIGZyb20gID4gIGFuZCBlbmRpbmcgd2l0aCA8XHJcblx0bGV0IGtleXdvcmRSZWdleCA9IG5ldyBSZWdFeHAoIGBmaWVsZHZhbHVlW148Pl0qPihbXjxdKiR7Ym9va2luZ19rZXl3b3JkfVtePF0qKWAsICdnaW0nICk7XHJcblxyXG5cdC8vbGV0IG1hdGNoZXMgPSBbLi4uYm9va2luZ19kZXRhaWxzLnRvTG93ZXJDYXNlKCkubWF0Y2hBbGwoIGtleXdvcmRSZWdleCApXTtcclxuXHRsZXQgbWF0Y2hlcyA9IGJvb2tpbmdfZGV0YWlscy50b0xvd2VyQ2FzZSgpLm1hdGNoQWxsKCBrZXl3b3JkUmVnZXggKTtcclxuXHRcdG1hdGNoZXMgPSBBcnJheS5mcm9tKCBtYXRjaGVzICk7XHJcblxyXG5cdGxldCBzdHJpbmdzX2FyciA9IFtdO1xyXG5cdGxldCBwb3NfcHJldmlvdXMgPSAwO1xyXG5cdGxldCBzZWFyY2hfcG9zX3N0YXJ0O1xyXG5cdGxldCBzZWFyY2hfcG9zX2VuZDtcclxuXHJcblx0Zm9yICggY29uc3QgbWF0Y2ggb2YgbWF0Y2hlcyApe1xyXG5cclxuXHRcdHNlYXJjaF9wb3Nfc3RhcnQgPSBtYXRjaC5pbmRleCArIG1hdGNoWyAwIF0udG9Mb3dlckNhc2UoKS5pbmRleE9mKCAnPicsIDAgKSArIDEgO1xyXG5cclxuXHRcdHN0cmluZ3NfYXJyLnB1c2goIGJvb2tpbmdfZGV0YWlscy5zdWJzdHIoIHBvc19wcmV2aW91cywgKHNlYXJjaF9wb3Nfc3RhcnQgLSBwb3NfcHJldmlvdXMpICkgKTtcclxuXHJcblx0XHRzZWFyY2hfcG9zX2VuZCA9IGJvb2tpbmdfZGV0YWlscy50b0xvd2VyQ2FzZSgpLmluZGV4T2YoICc8Jywgc2VhcmNoX3Bvc19zdGFydCApO1xyXG5cclxuXHRcdHN0cmluZ3NfYXJyLnB1c2goICc8c3BhbiBjbGFzcz1cImZpZWxkdmFsdWUgbmFtZSBmaWVsZHNlYXJjaHZhbHVlXCI+JyArIGJvb2tpbmdfZGV0YWlscy5zdWJzdHIoIHNlYXJjaF9wb3Nfc3RhcnQsIChzZWFyY2hfcG9zX2VuZCAtIHNlYXJjaF9wb3Nfc3RhcnQpICkgKyAnPC9zcGFuPicgKTtcclxuXHJcblx0XHRwb3NfcHJldmlvdXMgPSBzZWFyY2hfcG9zX2VuZDtcclxuXHR9XHJcblxyXG5cdHN0cmluZ3NfYXJyLnB1c2goIGJvb2tpbmdfZGV0YWlscy5zdWJzdHIoIHBvc19wcmV2aW91cywgKGJvb2tpbmdfZGV0YWlscy5sZW5ndGggLSBwb3NfcHJldmlvdXMpICkgKTtcclxuXHJcblx0cmV0dXJuIHN0cmluZ3NfYXJyLmpvaW4oICcnICk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDb252ZXJ0IHNwZWNpYWwgSFRNTCBjaGFyYWN0ZXJzICAgZnJvbTpcdCAmYW1wOyBcdC0+IFx0JlxyXG4gKlxyXG4gKiBAcGFyYW0gdGV4dFxyXG4gKiBAcmV0dXJucyB7Kn1cclxuICovXHJcbmZ1bmN0aW9uIHdwYmNfZGVjb2RlX0hUTUxfZW50aXRpZXMoIHRleHQgKXtcclxuXHR2YXIgdGV4dEFyZWEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCAndGV4dGFyZWEnICk7XHJcblx0dGV4dEFyZWEuaW5uZXJIVE1MID0gdGV4dDtcclxuXHRyZXR1cm4gdGV4dEFyZWEudmFsdWU7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDb252ZXJ0IFRPIHNwZWNpYWwgSFRNTCBjaGFyYWN0ZXJzICAgZnJvbTpcdCAmIFx0LT4gXHQmYW1wO1xyXG4gKlxyXG4gKiBAcGFyYW0gdGV4dFxyXG4gKiBAcmV0dXJucyB7Kn1cclxuICovXHJcbmZ1bmN0aW9uIHdwYmNfZW5jb2RlX0hUTUxfZW50aXRpZXModGV4dCkge1xyXG4gIHZhciB0ZXh0QXJlYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RleHRhcmVhJyk7XHJcbiAgdGV4dEFyZWEuaW5uZXJUZXh0ID0gdGV4dDtcclxuICByZXR1cm4gdGV4dEFyZWEuaW5uZXJIVE1MO1xyXG59XHJcblxyXG5cclxuLyoqXHJcbiAqICAgU3VwcG9ydCBGdW5jdGlvbnMgLSBTcGluIEljb24gaW4gQnV0dG9ucyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXHJcblxyXG4vKipcclxuICogU3BpbiBidXR0b24gaW4gRmlsdGVyIHRvb2xiYXIgIC0gIFN0YXJ0XHJcbiAqL1xyXG5mdW5jdGlvbiB3cGJjX2Jvb2tpbmdfbGlzdGluZ19yZWxvYWRfYnV0dG9uX19zcGluX3N0YXJ0KCl7XHJcblx0alF1ZXJ5KCAnI3dwYmNfYm9va2luZ19saXN0aW5nX3JlbG9hZF9idXR0b24gLm1lbnVfaWNvbi53cGJjX3NwaW4nKS5yZW1vdmVDbGFzcyggJ3dwYmNfYW5pbWF0aW9uX3BhdXNlJyApO1xyXG59XHJcblxyXG4vKipcclxuICogU3BpbiBidXR0b24gaW4gRmlsdGVyIHRvb2xiYXIgIC0gIFBhdXNlXHJcbiAqL1xyXG5mdW5jdGlvbiB3cGJjX2Jvb2tpbmdfbGlzdGluZ19yZWxvYWRfYnV0dG9uX19zcGluX3BhdXNlKCl7XHJcblx0alF1ZXJ5KCAnI3dwYmNfYm9va2luZ19saXN0aW5nX3JlbG9hZF9idXR0b24gLm1lbnVfaWNvbi53cGJjX3NwaW4nICkuYWRkQ2xhc3MoICd3cGJjX2FuaW1hdGlvbl9wYXVzZScgKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFNwaW4gYnV0dG9uIGluIEZpbHRlciB0b29sYmFyICAtICBpcyBTcGlubmluZyA/XHJcbiAqXHJcbiAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gKi9cclxuZnVuY3Rpb24gd3BiY19ib29raW5nX2xpc3RpbmdfcmVsb2FkX2J1dHRvbl9faXNfc3Bpbigpe1xyXG4gICAgaWYgKCBqUXVlcnkoICcjd3BiY19ib29raW5nX2xpc3RpbmdfcmVsb2FkX2J1dHRvbiAubWVudV9pY29uLndwYmNfc3BpbicgKS5oYXNDbGFzcyggJ3dwYmNfYW5pbWF0aW9uX3BhdXNlJyApICl7XHJcblx0XHRyZXR1cm4gdHJ1ZTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH1cclxufSJdLCJmaWxlIjoiaW5jbHVkZXMvcGFnZS1ib29raW5ncy9fb3V0L2Jvb2tpbmdzX19saXN0aW5nLmpzIn0=
