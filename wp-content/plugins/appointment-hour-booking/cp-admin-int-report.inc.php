<?php

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

global $wpdb;

$this->item = intval($_GET["cal"]);

$current_user = wp_get_current_user();
$current_user_access = current_user_can('manage_options');

if ( !is_admin() || (!$current_user_access && !@in_array($current_user->ID, unserialize($this->get_option("cp_user_access","")))))
{
    echo 'Direct access not allowed.';
    exit;
}


if ( !is_admin() )
{
    echo 'Direct access not allowed.';
    exit;
}



if ($this->item != 0)
    $myform = $wpdb->get_results( $wpdb->prepare('SELECT * FROM '.$wpdb->prefix.$this->table_items .' WHERE id=%d', $this->item) ); // phpcs:ignore WordPress.DB.PreparedSQL.NotPrepared


$current_page = intval( (empty($_GET["p"])?0:$_GET["p"]));
if (!$current_page) $current_page = 1;
$records_per_page = 50;

$date_start = '';
$date_end = '';

$rawfrom = (isset($_GET["dfrom"]) ? sanitize_text_field($_GET["dfrom"]) : '');
$rawto = (isset($_GET["dto"]) ? sanitize_text_field(@$_GET["dto"]) : '');
if ($this->get_option('date_format', 'mm/dd/yy') == 'dd/mm/yy')
{
    $rawfrom = str_replace('/','.',$rawfrom);
    $rawto = str_replace('/','.',$rawto);
}

$cond = '';
if (!empty($_GET["search"])) $cond .= " AND (data like '%".esc_sql(sanitize_text_field($_GET["search"]))."%' OR posted_data LIKE '%".esc_sql(sanitize_text_field($_GET["search"]))."%')";
if ($rawfrom != '')
{
    $date_start = date("Y-m-d",strtotime($rawfrom));
    $cond .= " AND (`time` >= '".esc_sql( $date_start )."')";
}
if ($rawto != '')
{
    $date_end = date("Y-m-d",strtotime($rawto));
    $cond .= " AND (`time` <= '".esc_sql($date_end)." 23:59:59')";
}
if ($this->item != 0) $cond .= " AND formid=".intval($this->item);

$events = $wpdb->get_results( "SELECT ipaddr,time,notifyto,posted_data FROM ".$wpdb->prefix.$this->table_messages." WHERE 1=1 ".$cond." ORDER BY `time` DESC" ); // phpcs:ignore WordPress.DB.PreparedSQL.NotPrepared

// general initialization
$fields = array();
$fields["date"] = array();
$fields["ip"] = array();
$fields["notifyto"] = array();
foreach ($events as $item)
{
    if (empty($fields["date"]["k".substr($item->time,0,10)])) $fields["date"]["k".substr($item->time,0,10)] = 0;
    if (empty($fields["time"]["k".substr($item->time,11,2)])) $fields["time"]["k".substr($item->time,11,2)] = 0;
    if (empty($fields["notifyto"]["k".$item->notifyto])) $fields["notifyto"]["k".$item->notifyto] = 0;
    if (empty($fields["ip"]["k".$item->ipaddr])) $fields["ip"]["k".$item->ipaddr] = 0;

    $fields["date"]["k".substr($item->time,0,10)]++;
    $fields["time"]["k".substr($item->time,11,2)]++;
    $fields["notifyto"]["k".$item->notifyto]++;
    $fields["ip"]["k".$item->ipaddr]++;
    $params = unserialize($item->posted_data);
    foreach ($params as $param => $value)
        if (!is_array($value) && strlen($value) < 100)
        {
            if (empty($fields[$param]["k".$value])) $fields[$param]["k".$value] = 0;
            $fields[$param]["k".$value]++;
        }
}


// line graphs
$hourly_messages = '';
$max_hourly_messages = 200;
for ($i=0;$i<=23;$i++)
    if (isset($fields['time']['k'.($i<10?'0':'').$i]))
    {
        $hourly_messages .= $fields['time']['k'.($i<10?'0':'').$i].($i<23?',':'');
        if ($max_hourly_messages < intval($fields['time']['k'.($i<10?'0':'').$i]))
            $max_hourly_messages = intval($fields['time']['k'.($i<10?'0':'').$i]);
    }
    else
        $hourly_messages .='0'.($i<23?',':'');

if ($date_start == '')
{
    $kkeys = array_keys($fields["date"]);
    if (count($kkeys))
        $date_start = substr(min($kkeys),1);
    else
        $date_start = date("Y-m-d");
}

if ($date_end == '')
{
    $kkeys = array_keys($fields["date"]);
    if (count($kkeys))
        $date_end = substr(max($kkeys),1);
    else
        $date_end = date("Y-m-d");
}

$daily_messages = '';
$max_daily_messages = 200;
$date = $date_start;
while ($date <= $date_end)
{
    if (isset($fields['date']['k'.$date]))
    {
        $daily_messages .= ','.$fields['date']['k'.$date];
        if ($max_daily_messages < intval($fields['date']['k'.$date]))
            $max_daily_messages = intval($fields['date']['k'.$date]);
    }
    else
        $daily_messages .=',0';
    $date = date("Y-m-d",strtotime($date." +1 day"));
}
$daily_messages = substr($daily_messages,1);

if (!isset($_GET["field"]))
    $field_filter = 'time';
else
    $field_filter = sanitize_key($_GET["field"]);

$color_array = array('ffb3ba','ffdfba','ffffba', 'baffc9', 'bae1ff', 'a8e6cf', 'dcedc1', 'ffd3b6', 'ffaaa5', 'ff8b94', 'eea990', 'adcbe3', 'e2f4c7');


if ($this->item)
{
    $form = json_decode($this->cleanJSON($this->get_option('form_structure', CP_APPBOOK_DEFAULT_form_structure)));
    $form = $form[0];
}
else
    $form = array();

?>

<h1>Stats - <?php echo esc_html($this->get_option("form_name")); ?></h1>

<div class="ahb-buttons-container">
	<a href="<?php print esc_attr(admin_url('admin.php?page='.$this->menu_parameter));?>" class="ahb-return-link">&larr;<?php _e('Return to the calendars list','appointment-hour-booking'); ?></a>
	<div class="clear"></div>
</div>


<div class="ahb-section-container">
	<div class="ahb-section">
       <form action="admin.php" method="get">
        <input type="hidden" name="page" value="<?php echo esc_attr($this->menu_parameter); ?>" />
        <input type="hidden" name="cal" value="<?php echo intval($this->item); ?>" />
        <input type="hidden" name="report" value="1" />
        <input type="hidden" name="field" value="<?php echo esc_attr($field_filter); ?>" />
		<nobr><label><?php _e('Search for','appointment-hour-booking'); ?>:</label> <input type="text" name="search" value="<?php echo esc_attr( (!empty($_GET["search"])?sanitize_text_field($_GET["search"]):'')); ?>">&nbsp;&nbsp;</nobr>
		<nobr><label><?php _e('From','appointment-hour-booking'); ?>:</label> <input autocomplete="off" type="text" id="dfrom" name="dfrom" value="<?php echo esc_attr((!empty($_GET["dfrom"])?sanitize_text_field($_GET["dfrom"]):'')); ?>" >&nbsp;&nbsp;</nobr>
		<nobr><label><?php _e('To','appointment-hour-booking'); ?>:</label> <input autocomplete="off" type="text" id="dto" name="dto" value="<?php echo esc_attr((!empty($_GET["dto"])?sanitize_text_field($_GET["dto"]):'')); ?>" >&nbsp;&nbsp;</nobr>
		<nobr><label><?php _e('Item','appointment-hour-booking'); ?>:</label> <select id="cal" name="cal">
          <?php if ($current_user_access) { ?> <option value="0">[<?php _e('All Items','appointment-hour-booking'); ?>]</option><?php } ?>
   <?php
    $myrows = $wpdb->get_results( "SELECT * FROM ".$wpdb->prefix.$this->table_items );  // phpcs:ignore WordPress.DB.PreparedSQL.NotPrepared
    foreach ($myrows as $item)
    {
        $this->setId($item->id);
        $options = unserialize($this->get_option('cp_user_access', serialize(array()))); 
        if (!is_array($options))
             $options = array();        
        if ($current_user_access || @in_array($current_user->ID, $options))
            echo '<option value="'.$item->id.'"'.(intval($item->id)==intval($this->item)?" selected":"").'>'.$item->form_name.'</option>';
    }
   ?>   
    </select></nobr>
		<nobr>
			<input type="submit" name="<?php echo esc_attr($this->prefix); ?>_csv1" value="<?php _e('Export to CSV','appointment-hour-booking'); ?>" class="button" style="float:right;margin-left:10px;">
			<input type="submit" name="ds" value="<?php _e('Filter','appointment-hour-booking'); ?>" class="button-primary button" style="float:right;">
		</nobr>
       </form>
       <div style="clear:both"></div>
	</div>
</div>


<div class="ahb-statssection-container" style="background:#f6f6f6;float:left;width:48%;">
	<div class="ahb-statssection-header">
		<h3><?php _e('Submissions per day','appointment-hour-booking'); ?></h3>
	</div>
	<div class="ahb-statssection">
        <div class="canvas" id="cardiocontainer1" style="margin-left:10px;position:relative;">
         <canvas id="cardio1"  width="300" height="<?php echo esc_html($max_daily_messages); ?>" questions='[{"color":"#008ec2","values":[<?php echo esc_html($daily_messages); ?>]}]'></canvas>
        </div>
        <div style="padding-right:5px;padding-left:5px;color:#888888;">* <?php _e('Submissions per day in the selected date range.','appointment-hour-booking'); ?><br />&nbsp;&nbsp; <?php _e('Days from','appointment-hour-booking'); ?> <?php echo esc_html($date_start); ?> to <?php echo esc_html($date_end); ?>.</div>
        <div class="clear"></div>
	</div>
</div>

<div class="ahb-statssection-container" style="background:#f6f6f6;float:right;width:48%;">
	<div class="ahb-statssection-header">
		<h3><?php _e('Submissions per hour','appointment-hour-booking'); ?></h3>
	</div>
	<div class="ahb-statssection" >
		<div class="canvas" id="cardiocontainer2" style="margin-left:10px;position:relative;">
         <canvas id="cardio2"  width="312" height="<?php echo esc_html($max_hourly_messages); ?>" questions='[{"color":"#008ec2","values":[<?php echo esc_html($hourly_messages); ?>]}]'></canvas>
        </div>
        <div style="padding-right:5px;padding-left:5px;color:#888888;">* <?php _e('Total submissions per hour in the selected date range.','appointment-hour-booking'); ?><br />&nbsp;&nbsp; <?php _e('Hours from 0 to 23','appointment-hour-booking'); ?>.</div>
        <div class="clear"></div>
	</div>
</div>
<div class="clear"></div>

<br />

<div class="ahb-statssection-container" style="background:#f6f6f6;">
	<div class="ahb-statssection-header">
        <form action="admin.php" name="cfm_formrep" method="get">
         <input type="hidden" name="page" value="<?php echo esc_attr($this->menu_parameter); ?>" />
         <input type="hidden" name="cal" value="<?php echo intval($this->item); ?>" />
         <input type="hidden" name="report" value="1" />
         <input type="hidden" name="search" value="<?php echo esc_attr((!empty($_GET["search"])?sanitize_text_field($_GET["search"]):'')); ?>" />
         <input type="hidden" name="dfrom" value="<?php echo esc_attr((!empty($_GET["dfrom"])?sanitize_text_field($_GET["dfrom"]):'')); ?>" />
         <input type="hidden" name="dto" value="<?php echo esc_attr((!empty($_GET["dto"])?sanitize_text_field($_GET["dto"]):'')); ?>" />
		 <h3><?php _e('Select field for the report','appointment-hour-booking'); ?>: <select name="field" onchange="document.cfm_formrep.submit();">
              <?php
                   foreach ($fields as $item => $value)
                       echo '<option value="'.esc_attr($item).'"'.($field_filter==$item?' selected':'').'>'.esc_html($this->get_form_field_label($item,$form)).'</option>';
              ?>
         </select></h3>
        </form>
	</div>
	<div class="ahb-statssection">
        <div id="dex_printable_contents">

        <div style="width:100%;padding:0;background:white;border:1px solid #e6e6e6;">
         <div style="padding:10px;background:#ECECEC;color:#21759B;font-weight: bold;">
           <?php _e('Report of values for','appointment-hour-booking'); ?>: <em><?php echo esc_html($this->get_form_field_label($field_filter,$form)); ?></em>
         </div>

        <div style="padding:10px;">
        <?php
          if (isset($fields[$field_filter]))
              $arr = $fields[$field_filter];
          else
              $arr = array();
          if (!is_array($arr))
              $arr = array();
          arsort($arr, SORT_NUMERIC);
          $total = 0;
          /* $totalsize = 600; */
          foreach ($arr as $item => $value)
              $total += $value;
          /* $max = max($arr);
          $totalsize = round(600 / ($max/$total) ); */
          $count = 0;
          foreach ($arr as $item => $value)
          {
              echo esc_html($value).' times: '.esc_html((strlen($item)>50?substr($item,1,50).'...':substr($item,1)));
              echo '<div style="width:'.esc_attr(round($value/$total*100)).'%;border:1px solid white;margin-bottom:3px;font-size:9px;text-align:center;font-weight:bold;background-color:#'.esc_attr($color_array[$count]).'">'.esc_html(round($value/$total*100,2)).'%</div>';
              $count++;
              if ($count >= count($color_array)) $count = count($color_array)-1;
          }
        ?>
        </div>

         <div style="padding-right:5px;padding-left:5px;margin-bottom:20px;color:#888888;">&nbsp;&nbsp;* <?php _e('Number of times that appears each value. Percent in relation to the total of submissions.','appointment-hour-booking'); ?><br />&nbsp;&nbsp;&nbsp;&nbsp; <?php _e('Date range from','appointment-hour-booking'); ?> <?php echo esc_html($date_start); ?> <?php _e('to','appointment-hour-booking'); ?> <?php echo esc_html($date_end); ?>.</div>
        </div>

        <div style="clear:both"></div>
        </div>
	</div>
</div>



<div class="ahb-buttons-container">
	<input type="button" value="<?php _e('Print Stats','appointment-hour-booking'); ?>" onclick="do_dexapp_print();" class="button button-primary" />
	<a href="<?php print esc_attr(admin_url('admin.php?page='.$this->menu_parameter));?>" class="ahb-return-link">&larr;<?php _e('Return to the calendars list','appointment-hour-booking'); ?></a>
	<div class="clear"></div>
</div>

<script type="text/javascript">

 function do_dexapp_print()
 {
      w=window.open();
      w.document.write("<style>.cpnopr{display:none;};table{border:2px solid black;width:100%;}th{border-bottom:2px solid black;text-align:left}td{padding-left:10px;border-bottom:1px solid black;}</style>"+document.getElementById('dex_printable_contents').innerHTML);
      w.print();
      w.close();
 }

<?php

	 $dformatc = $this->get_option('date_format', 'mm/dd/yy');
	 if ($dformatc == 'd M, y') $dformatc = 'dd/mm/yy';

?>
 var $j = jQuery.noConflict();
 $j(function() {
 	$j("#dfrom").datepicker({
                    dateFormat: '<?php echo esc_js($dformatc); ?>'
                 });
 	$j("#dto").datepicker({
                    dateFormat: '<?php echo esc_js($dformatc); ?>'
                 });
 });

</script>


<script type='text/javascript' src='<?php echo esc_attr(plugins_url('js/excanvas.min.js', __FILE__)); ?>'></script>
<script type="text/javascript">
var $ = jQuery.noConflict();
$j(document).ready(function(){
		    /////////////////////////canvas//////////////////////////
		  {
                drawGraph($("#cardio1"), $("#cardiocontainer1"));
                drawGraph($("#cardio2"), $("#cardiocontainer2"));
                function drawGraph(canvas, canvasContainer)
                {
		            if( typeof(G_vmlCanvasManager) != 'undefined' ){ G_vmlCanvasManager.init(); G_vmlCanvasManager.initElement(canvas[0]); }
		            ctx = canvas[0].getContext("2d");
		            var data = jQuery.parseJSON(canvas.attr("questions"));
		            var height = canvas.attr("height");
		            var width = canvas.attr("width");
		            var maxquestions = 0,maxpos = 0,minpos = 0,interval = 5;

		            jQuery.each(data,function(index,v){
		                maxquestions = (maxquestions<v.values.length)?v.values.length:maxquestions;
		                postmp = 0;
		                jQuery.each(v.values,function(index1,v1){
		                    maxpos = (maxpos<v1)?v1:maxpos;
		                    minpos = (minpos>v1)?v1:minpos;
		                });

		            });
		            maxpos = maxpos;//Math.ceil(maxpos/interval)*interval;
		            minpos = 0; //Math.floor(minpos/interval)*interval;
		            interval = Math.ceil(maxpos / 10);
		            total = maxpos - minpos + interval;
		            h = Math.round(height/total);
		            var start = 10;
		            var radius = 2;
		            if (maxquestions>1)
		                w = Math.round((width-start-radius)/(maxquestions-1));
		            else
		                w =  width/2;

		            if(ctx)
		            {
		                for (i=0;i<total/interval;i++)
		                {
		                    if ((maxpos-i*interval) >= 0) canvasContainer.append('<div class="legend" style="position:absolute;left:-10px;top:'+(parseInt((i*interval+interval/2)*h-5))+'px">'+(maxpos-i*interval)+'</div>');
		                    ctx.beginPath();
                            ctx.moveTo(start,Math.round((i*interval+interval/2)*h) );
                            ctx.lineTo(width,Math.round((i*interval+interval/2)*h) );
							ctx.lineWidth=1;
                            ctx.strokeStyle='#d0d0d0';
                            ctx.stroke();
		                }
		                jQuery.each(data,function(index,v){
		                    ctx.beginPath();
		                    ctx.strokeStyle = v.color;
		                    ctx.fillStyle = v.color;

		                    //ctx.moveTo(start,Math.round((maxpos+interval/2)*h) );
		                    var i = 0,j = 0;
		                    jQuery.each(v.values,function(index1,v1){
		                        j=-v1;
		                        if (i!=0)
		                            ctx.lineTo(i*w+start,Math.round((maxpos+interval/2)*h+j*h));
		                        else
		                            ctx.moveTo(i*w+start,Math.round((maxpos+interval/2)*h+j*h));
		                        i++;
		                     });

		                     ctx.stroke();
		                     var i = 0,j = 0;
		                     jQuery.each(v.values,function(index1,v1){
		                         j=-v1;
		                         ctx.beginPath();
		                         ctx.arc(i*w+start,Math.round((maxpos+interval/2)*h+j*h), radius, 0, 2 * Math.PI, true);
		                         ctx.fill();
		                         i++;
		                     });
		                });
		            }
		        }
            }

		    ////////////////////////end canvas///////////////////////
});
</script>
