"use strict";
/**
 * Encode HTML text to safe HTML entities
 *
 * Replace all characters in the given range (unicode 00A0 - 9999, as well as ampersand, greater & less than)
 * with their html entity equivalents, which is simply &#nnn; where nnn is the unicode value we get from charCodeAt
 *
 * @param rawStr
 * @returns {*}
 */

function wpbc_get_safe_html_text(rawStr) {
  var encodedStr = rawStr.replace(/[\u00A0-\u9999<>\&]/g, function (i) {
    return '&#' + i.charCodeAt(0) + ';';
  });
  return encodedStr;
}
/**
 * Change Value and Title of dropdown after clicking on Apply button
 *
 * @param params	Example: { 'dropdown_id': 'wh_booking_date', 'dropdown_radio_name': 'ui_wh_booking_date_radio' }
 */


function wpbc_ui_dropdown_apply_click(params) {
  // Get input values of all elements in LI section,  where RADIO was selected
  var filter_ui_dates_arr = jQuery('input[name="' + params['dropdown_radio_name'] + '"]:checked').parents('li').find(':input').map(function () {
    return wpbc_get_safe_html_text(jQuery(this).val());
  }).get();

  if (0 !== filter_ui_dates_arr.length) {
    // Continue only if radio button  was selected, and we are having value
    // Get titles of all elements in LI section,  where RADIO was selected
    var filter_ui_titles_arr = jQuery('input[name="' + params['dropdown_radio_name'] + '"]:checked').parents('li').find(':input').map(function () {
      if ('text' == jQuery(this).prop('type')) {
        return jQuery(this).val();
      }

      if ('selectbox-one' == jQuery(this).prop('type') || 'select-one' == jQuery(this).prop('type')) {
        return jQuery(this).find(':selected').text();
      }

      if ('radio' == jQuery(this).prop('type') || 'checkbox' == jQuery(this).prop('type')) {
        var input_selected = jQuery(this).filter(':checked').next('.wpbc_ui_control_label').html();

        if (undefined == input_selected) {
          input_selected = jQuery(this).filter(':checked').prev('.wpbc_ui_control_label').html();
        }

        return undefined !== input_selected ? input_selected : '';
      }

      return jQuery(this).val();
    }).get(); // Update Value to  dropdown input hidden elements. Such  value stringify.

    jQuery('#' + params['dropdown_id']).val(JSON.stringify(filter_ui_dates_arr)); // Generate change action,  for ability to  send Ajax request

    jQuery('#' + params['dropdown_id']).trigger('change'); // Get Label of selected Radio button

    var filter_ui_dates_title = jQuery('input[name="' + params['dropdown_radio_name'] + '"]:checked').next('.wpbc_ui_control_label').html() + ': '; // Remove selected value of radio button from beginning, we will use Label title instead

    filter_ui_titles_arr.shift(); // Update Title in dropdown

    var encoded_html_text = wpbc_get_safe_html_text(filter_ui_dates_title + filter_ui_titles_arr.join(' - '));
    jQuery('#' + params['dropdown_id'] + '_selector .wpbc_selected_in_dropdown').html(encoded_html_text);
  }

  jQuery('#' + params['dropdown_id'] + '_container').hide();
}
/**
 * Close dropdown after clicking on Close button
 *
 * @param dropdown_id	ID of dropdown
 */


function wpbc_ui_dropdown_close_click(dropdown_id) {
  jQuery('#' + dropdown_id + '_container').hide();
}
/**
 * Simple option click on dropdown
 *
 * @param params	Example: { 'dropdown_id': 'wh_booking_date', 'is_this_simple_list': true, 'value': '5', '_this': this }
 */


function wpbc_ui_dropdown_simple_click(params) {
  jQuery('#' + params['dropdown_id'] + '_selector .wpbc_selected_in_dropdown').html(jQuery(params['_this']).html());
  jQuery('#' + params['dropdown_id']).val(JSON.stringify([params['value']]));
  jQuery('#' + params['dropdown_id'] + '_container li input[type=checkbox],' + '#' + params['dropdown_id'] + '_container li input[type=radio]').prop('checked', false);
  jQuery('#' + params['dropdown_id']).trigger('change');

  if (!params['is_this_simple_list']) {
    jQuery('#' + params['dropdown_id'] + '_container').hide();
  }
}
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluY2x1ZGVzL190b29sYmFyX3VpL19zcmMvdG9vbGJhcl91aS5qcyJdLCJuYW1lcyI6WyJ3cGJjX2dldF9zYWZlX2h0bWxfdGV4dCIsInJhd1N0ciIsImVuY29kZWRTdHIiLCJyZXBsYWNlIiwiaSIsImNoYXJDb2RlQXQiLCJ3cGJjX3VpX2Ryb3Bkb3duX2FwcGx5X2NsaWNrIiwicGFyYW1zIiwiZmlsdGVyX3VpX2RhdGVzX2FyciIsImpRdWVyeSIsInBhcmVudHMiLCJmaW5kIiwibWFwIiwidmFsIiwiZ2V0IiwibGVuZ3RoIiwiZmlsdGVyX3VpX3RpdGxlc19hcnIiLCJwcm9wIiwidGV4dCIsImlucHV0X3NlbGVjdGVkIiwiZmlsdGVyIiwibmV4dCIsImh0bWwiLCJ1bmRlZmluZWQiLCJwcmV2IiwiSlNPTiIsInN0cmluZ2lmeSIsInRyaWdnZXIiLCJmaWx0ZXJfdWlfZGF0ZXNfdGl0bGUiLCJzaGlmdCIsImVuY29kZWRfaHRtbF90ZXh0Iiwiam9pbiIsImhpZGUiLCJ3cGJjX3VpX2Ryb3Bkb3duX2Nsb3NlX2NsaWNrIiwiZHJvcGRvd25faWQiLCJ3cGJjX3VpX2Ryb3Bkb3duX3NpbXBsZV9jbGljayJdLCJtYXBwaW5ncyI6IkFBQUE7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0EsU0FBU0EsdUJBQVQsQ0FBa0NDLE1BQWxDLEVBQTBDO0FBRXpDLE1BQUlDLFVBQVUsR0FBR0QsTUFBTSxDQUFDRSxPQUFQLENBQWdCLHNCQUFoQixFQUF3QyxVQUFXQyxDQUFYLEVBQWM7QUFDdEUsV0FBTyxPQUFPQSxDQUFDLENBQUNDLFVBQUYsQ0FBYyxDQUFkLENBQVAsR0FBMkIsR0FBbEM7QUFDQSxHQUZnQixDQUFqQjtBQUlBLFNBQU9ILFVBQVA7QUFDQTtBQUdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBLFNBQVNJLDRCQUFULENBQXVDQyxNQUF2QyxFQUErQztBQUU5QztBQUNBLE1BQUlDLG1CQUFtQixHQUFHQyxN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QUVBLE1BQUssQ0FBRXBCLE1BQU0sQ0FBRSxxQkFBRixDQUFiLEVBQXdDO0FBQ3ZDRSxJQUFBQSxNQUFNLENBQUUsTUFBTUYsTUFBTSxDQUFFLGFBQUYsQ0FBWixHQUFnQyxZQUFsQyxDQUFOLENBQXVEeUIsSUFBdkQ7QUFDQTtBQUNEIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG5cclxuLyoqXHJcbiAqIEVuY29kZSBIVE1MIHRleHQgdG8gc2FmZSBIVE1MIGVudGl0aWVzXHJcbiAqXHJcbiAqIFJlcGxhY2UgYWxsIGNoYXJhY3RlcnMgaW4gdGhlIGdpdmVuIHJhbmdlICh1bmljb2RlIDAwQTAgLSA5OTk5LCBhcyB3ZWxsIGFzIGFtcGVyc2FuZCwgZ3JlYXRlciAmIGxlc3MgdGhhbilcclxuICogd2l0aCB0aGVpciBodG1sIGVudGl0eSBlcXVpdmFsZW50cywgd2hpY2ggaXMgc2ltcGx5ICYjbm5uOyB3aGVyZSBubm4gaXMgdGhlIHVuaWNvZGUgdmFsdWUgd2UgZ2V0IGZyb20gY2hhckNvZGVBdFxyXG4gKlxyXG4gKiBAcGFyYW0gcmF3U3RyXHJcbiAqIEByZXR1cm5zIHsqfVxyXG4gKi9cclxuZnVuY3Rpb24gd3BiY19nZXRfc2FmZV9odG1sX3RleHQoIHJhd1N0ciApe1xyXG5cclxuXHR2YXIgZW5jb2RlZFN0ciA9IHJhd1N0ci5yZXBsYWNlKCAvW1xcdTAwQTAtXFx1OTk5OTw+XFwmXS9nLCBmdW5jdGlvbiAoIGkgKXtcclxuXHRcdHJldHVybiAnJiMnICsgaS5jaGFyQ29kZUF0KCAwICkgKyAnOyc7XHJcblx0fSApO1xyXG5cclxuXHRyZXR1cm4gZW5jb2RlZFN0cjtcclxufVxyXG5cclxuXHJcbi8qKlxyXG4gKiBDaGFuZ2UgVmFsdWUgYW5kIFRpdGxlIG9mIGRyb3Bkb3duIGFmdGVyIGNsaWNraW5nIG9uIEFwcGx5IGJ1dHRvblxyXG4gKlxyXG4gKiBAcGFyYW0gcGFyYW1zXHRFeGFtcGxlOiB7ICdkcm9wZG93bl9pZCc6ICd3aF9ib29raW5nX2RhdGUnLCAnZHJvcGRvd25fcmFkaW9fbmFtZSc6ICd1aV93aF9ib29raW5nX2RhdGVfcmFkaW8nIH1cclxuICovXHJcbmZ1bmN0aW9uIHdwYmNfdWlfZHJvcGRvd25fYXBwbHlfY2xpY2soIHBhcmFtcyApe1xyXG5cclxuXHQvLyBHZXQgaW5wdXQgdmFsdWVzIG9mIGFsbCBlbGVtZW50cyBpbiBMSSBzZWN0aW9uLCAgd2hlcmUgUkFESU8gd2FzIHNlbGVjdGVkXHJcblx0dmFyIGZpbHRlcl91aV9kYXRlc19hcnIgPSBqUXVlcnkoICdpbnB1dFtuYW1lPVwiJyArIHBhcmFtc1sgJ2Ryb3Bkb3duX3JhZGlvX25hbWUnIF0gKyAnXCJdOmNoZWNrZWQnIClcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHQucGFyZW50cyggJ2xpJyApLmZpbmQoICc6aW5wdXQnIClcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHQubWFwKCBmdW5jdGlvbiAoKXtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiB3cGJjX2dldF9zYWZlX2h0bWxfdGV4dCggalF1ZXJ5KCB0aGlzICkudmFsKCkgKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR9ICkuZ2V0KCk7XHJcblxyXG5cdGlmICggMCAhPT0gZmlsdGVyX3VpX2RhdGVzX2Fyci5sZW5ndGggKXsgIC8vIENvbnRpbnVlIG9ubHkgaWYgcmFkaW8gYnV0dG9uICB3YXMgc2VsZWN0ZWQsIGFuZCB3ZSBhcmUgaGF2aW5nIHZhbHVlXHJcblxyXG5cdFx0Ly8gR2V0IHRpdGxlcyBvZiBhbGwgZWxlbWVudHMgaW4gTEkgc2VjdGlvbiwgIHdoZXJlIFJBRElPIHdhcyBzZWxlY3RlZFxyXG5cdFx0dmFyIGZpbHRlcl91aV90aXRsZXNfYXJyID0galF1ZXJ5KCAnaW5wdXRbbmFtZT1cIicgKyBwYXJhbXNbICdkcm9wZG93bl9yYWRpb19uYW1lJyBdICsgJ1wiXTpjaGVja2VkJyApXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0ICBcdC5wYXJlbnRzKCAnbGknICkuZmluZCggJzppbnB1dCcgKVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Lm1hcCggZnVuY3Rpb24gKCl7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGlmICggJ3RleHQnID09IGpRdWVyeSggdGhpcyApLnByb3AoICd0eXBlJyApICl7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIGpRdWVyeSggdGhpcyApLnZhbCgpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGlmICggKCAnc2VsZWN0Ym94LW9uZScgPT0galF1ZXJ5KCB0aGlzICkucHJvcCggJ3R5cGUnICkgKSB8fCAoICdzZWxlY3Qtb25lJyA9PSBqUXVlcnkoIHRoaXMgKS5wcm9wKCAndHlwZScgKSApICl7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIGpRdWVyeSggdGhpcyApLmZpbmQoICc6c2VsZWN0ZWQnICkudGV4dCgpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGlmIChcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCggJ3JhZGlvJyA9PSBqUXVlcnkoIHRoaXMgKS5wcm9wKCAndHlwZScgKSApXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0IHx8ICggJ2NoZWNrYm94JyA9PSBqUXVlcnkoIHRoaXMgKS5wcm9wKCAndHlwZScgKSApXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCl7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0dmFyIGlucHV0X3NlbGVjdGVkID0galF1ZXJ5KCB0aGlzICkuZmlsdGVyKCc6Y2hlY2tlZCcpLm5leHQoICcud3BiY191aV9jb250cm9sX2xhYmVsJyApLmh0bWwoKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAoIHVuZGVmaW5lZCA9PSBpbnB1dF9zZWxlY3RlZCApIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGlucHV0X3NlbGVjdGVkID0galF1ZXJ5KCB0aGlzICkuZmlsdGVyKCc6Y2hlY2tlZCcpLnByZXYoICcud3BiY191aV9jb250cm9sX2xhYmVsJyApLmh0bWwoKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuICggdW5kZWZpbmVkICE9PSBpbnB1dF9zZWxlY3RlZCApID8gaW5wdXRfc2VsZWN0ZWQgOiAnJztcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIGpRdWVyeSggdGhpcyApLnZhbCgpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0fSApLmdldCgpO1xyXG5cclxuXHRcdC8vIFVwZGF0ZSBWYWx1ZSB0byAgZHJvcGRvd24gaW5wdXQgaGlkZGVuIGVsZW1lbnRzLiBTdWNoICB2YWx1ZSBzdHJpbmdpZnkuXHJcblx0XHRqUXVlcnkoICcjJyArIHBhcmFtc1sgJ2Ryb3Bkb3duX2lkJyBdICkudmFsKCBKU09OLnN0cmluZ2lmeSggZmlsdGVyX3VpX2RhdGVzX2FyciApICk7XHJcblxyXG5cdFx0Ly8gR2VuZXJhdGUgY2hhbmdlIGFjdGlvbiwgIGZvciBhYmlsaXR5IHRvICBzZW5kIEFqYXggcmVxdWVzdFxyXG5cdFx0alF1ZXJ5KCAnIycgKyBwYXJhbXNbICdkcm9wZG93bl9pZCcgXSApLnRyaWdnZXIoICdjaGFuZ2UnICk7XHJcblxyXG5cdFx0Ly8gR2V0IExhYmVsIG9mIHNlbGVjdGVkIFJhZGlvIGJ1dHRvblxyXG5cdFx0dmFyIGZpbHRlcl91aV9kYXRlc190aXRsZSA9IGpRdWVyeSggJ2lucHV0W25hbWU9XCInICsgcGFyYW1zWyAnZHJvcGRvd25fcmFkaW9fbmFtZScgXSArICdcIl06Y2hlY2tlZCcgKS5uZXh0KCAnLndwYmNfdWlfY29udHJvbF9sYWJlbCcgKS5odG1sKCkgKyAnOiAnO1xyXG5cclxuXHRcdC8vIFJlbW92ZSBzZWxlY3RlZCB2YWx1ZSBvZiByYWRpbyBidXR0b24gZnJvbSBiZWdpbm5pbmcsIHdlIHdpbGwgdXNlIExhYmVsIHRpdGxlIGluc3RlYWRcclxuXHRcdGZpbHRlcl91aV90aXRsZXNfYXJyLnNoaWZ0KCk7XHJcblxyXG5cdFx0Ly8gVXBkYXRlIFRpdGxlIGluIGRyb3Bkb3duXHJcblx0XHR2YXIgZW5jb2RlZF9odG1sX3RleHQgPSB3cGJjX2dldF9zYWZlX2h0bWxfdGV4dCggZmlsdGVyX3VpX2RhdGVzX3RpdGxlICsgZmlsdGVyX3VpX3RpdGxlc19hcnIuam9pbiggJyAtICcgKSApO1xyXG5cdFx0alF1ZXJ5KCAnIycgKyBwYXJhbXNbICdkcm9wZG93bl9pZCcgXSArICdfc2VsZWN0b3IgLndwYmNfc2VsZWN0ZWRfaW5fZHJvcGRvd24nICkuaHRtbCggZW5jb2RlZF9odG1sX3RleHQgKTtcclxuXHR9XHJcblxyXG5cdGpRdWVyeSggJyMnICsgcGFyYW1zWyAnZHJvcGRvd25faWQnIF0gKyAnX2NvbnRhaW5lcicgKS5oaWRlKCk7XHJcbn1cclxuXHJcblxyXG4vKipcclxuICogQ2xvc2UgZHJvcGRvd24gYWZ0ZXIgY2xpY2tpbmcgb24gQ2xvc2UgYnV0dG9uXHJcbiAqXHJcbiAqIEBwYXJhbSBkcm9wZG93bl9pZFx0SUQgb2YgZHJvcGRvd25cclxuICovXHJcbmZ1bmN0aW9uIHdwYmNfdWlfZHJvcGRvd25fY2xvc2VfY2xpY2soIGRyb3Bkb3duX2lkICl7XHJcblxyXG5cdGpRdWVyeSggJyMnICsgZHJvcGRvd25faWQgKyAnX2NvbnRhaW5lcicgKS5oaWRlKCk7XHJcbn1cclxuXHJcblxyXG4vKipcclxuICogU2ltcGxlIG9wdGlvbiBjbGljayBvbiBkcm9wZG93blxyXG4gKlxyXG4gKiBAcGFyYW0gcGFyYW1zXHRFeGFtcGxlOiB7ICdkcm9wZG93bl9pZCc6ICd3aF9ib29raW5nX2RhdGUnLCAnaXNfdGhpc19zaW1wbGVfbGlzdCc6IHRydWUsICd2YWx1ZSc6ICc1JywgJ190aGlzJzogdGhpcyB9XHJcbiAqL1xyXG5mdW5jdGlvbiB3cGJjX3VpX2Ryb3Bkb3duX3NpbXBsZV9jbGljayggcGFyYW1zICl7XHJcblxyXG5cdGpRdWVyeSggJyMnICsgcGFyYW1zWyAnZHJvcGRvd25faWQnIF0gKyAnX3NlbGVjdG9yIC53cGJjX3NlbGVjdGVkX2luX2Ryb3Bkb3duJyApLmh0bWwoIGpRdWVyeSggcGFyYW1zWyAnX3RoaXMnIF0gKS5odG1sKCkgKTtcclxuXHJcblx0alF1ZXJ5KCAnIycgKyBwYXJhbXNbICdkcm9wZG93bl9pZCcgXSApLnZhbCggSlNPTi5zdHJpbmdpZnkoIFtwYXJhbXNbICd2YWx1ZScgXV0gKSApO1xyXG5cclxuXHRqUXVlcnkoICcjJyArIHBhcmFtc1sgJ2Ryb3Bkb3duX2lkJyBdICsgJ19jb250YWluZXIgbGkgaW5wdXRbdHlwZT1jaGVja2JveF0sJ1xyXG5cdFx0ICArICcjJyArIHBhcmFtc1sgJ2Ryb3Bkb3duX2lkJyBdICsgJ19jb250YWluZXIgbGkgaW5wdXRbdHlwZT1yYWRpb10nICkucHJvcCggJ2NoZWNrZWQnLCBmYWxzZSApO1xyXG5cclxuXHRqUXVlcnkoICcjJyArIHBhcmFtc1sgJ2Ryb3Bkb3duX2lkJyBdICkudHJpZ2dlciggJ2NoYW5nZScgKTtcclxuXHJcblx0aWYgKCAhIHBhcmFtc1sgJ2lzX3RoaXNfc2ltcGxlX2xpc3QnIF0gKXtcclxuXHRcdGpRdWVyeSggJyMnICsgcGFyYW1zWyAnZHJvcGRvd25faWQnIF0gKyAnX2NvbnRhaW5lcicgKS5oaWRlKCk7XHJcblx0fVxyXG59Il0sImZpbGUiOiJpbmNsdWRlcy9fdG9vbGJhcl91aS9fb3V0L3Rvb2xiYXJfdWkuanMifQ==
