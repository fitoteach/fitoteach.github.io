<?php
$page_one 	= get_theme_mod( 'blog_events_page_one', '' );
$page_two 	= get_theme_mod( 'blog_events_page_two', '' );
$page_three = get_theme_mod( 'blog_events_page_three', '' );
$page_four  = get_theme_mod( 'blog_events_page_four', '' );
$page_five  = get_theme_mod('blog_events_page_five', '');

$page_array = array();
$has_array = false;
$has_page = false;
if( !empty( $page_one ) ){
	$has_page = true;	
}
if( !empty( $page_two ) ){
	$has_page = true;
	$has_array = true;
	$page_array['page_two'] = array(
		'ID' => $page_two,
	);
}
if( !empty( $page_three ) ){
	$has_page = true;
	$has_array = true;
	$page_array['page_three'] = array(
		'ID' => $page_three,
	);
}
if( !empty( $page_four ) ){
	$has_page = true;
	$has_array = true;
	$page_array['page_four'] = array(
		'ID' => $page_four,
	);
}
if( !empty( $page_five ) ){
	$has_page = true;
	$has_array = true;
	$page_array['page_five'] = array(
		'ID' => $page_five,
	);
}

if( !get_theme_mod( 'disable_events_section', true ) && $has_page ){ ?>
	<section class="section-event-area">
		<?php if( !empty( $page_one ) ){ ?>
			<div class="section-title-wrap text-center">
				<h2 class="section-title">
					<a href="<?php echo esc_url( get_permalink( $page_one ) ); ?>">
						<?php echo esc_html( get_the_title( $page_one ) ); ?>
					</a>
				</h2>
				<p>
					<?php 
					$excerpt = get_the_excerpt( $page_one );
					$result  = wp_trim_words( $excerpt, 10, '' );
					echo esc_html( $result );?>	
				</p>
			</div>
		<?php }
		if ( $has_array ){ ?>
			<div class="row">
				<?php foreach( $page_array as $each_page ){ ?>
					<div class="col-lg-6">
						<article class="event-iconbox">
							<div class="event-icon">
								<i class="fa-regular fa-clock"></i>
							</div>
							<div class="entry-content">
								<h3 class="entry-title">
									<a href="<?php echo esc_url( get_permalink( $each_page[ 'ID' ] ) ); ?>">
										<?php echo esc_html( get_the_title( $each_page[ 'ID' ] ) ); ?>
									</a>
								</h3>
								<div class="entry-text">
									<?php 
									$excerpt = get_the_excerpt( $each_page[ 'ID' ] );
									$result  = wp_trim_words( $excerpt, 10, '' );
									echo esc_html( $result );
									?>
								</div>
							</div>
						</article>
					</div>
				<?php } ?>
			</div>
		<?php } ?>
	</section>	
<?php } ?>