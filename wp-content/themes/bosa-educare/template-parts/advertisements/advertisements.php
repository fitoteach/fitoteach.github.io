<?php
$blogAdvertoneID = get_theme_mod( 'blog_advertisement_one','');
$blogDiscountoneLabel = get_theme_mod( 'blog_advert_one_label', '');
$blogAdverttwoID = get_theme_mod( 'blog_advertisement_two','');       
$blogDiscounttwoLabel = get_theme_mod( 'blog_advert_two_label', '');
$blogAdvertthreeID = get_theme_mod( 'blog_advertisement_three','');
$blogDiscountthreeLabel = get_theme_mod( 'blog_advert_three_label', '');

$Advert_array = array();
$has_Advert = false;
$has_label = false;
if( !empty( $blogAdvertoneID ) || !empty( $blogDiscountoneLabel ) ){
	$blog_advertisement_one  = wp_get_attachment_image_src( $blogAdvertoneID,'bosa-420-300');
 	if ( is_array(  $blog_advertisement_one ) ){
 		$has_Advert = true;
 		$has_label = true;
   	 	$blog_advertisements_one = $blog_advertisement_one[0];
   	 	$Advert_array['image_one'] = array(
			'ID' => $blog_advertisements_one,
			'discount_label' => $blogDiscountoneLabel,
		);	
  	}
}
if( !empty( $blogAdverttwoID  ) || !empty( $blogDiscounttwoLabel ) ){
	$blog_advertisement_two = wp_get_attachment_image_src( $blogAdverttwoID,'bosa-420-300');
	if ( is_array(  $blog_advertisement_two ) ){
		$has_Advert = true;
		$has_label = true;	
        $blog_advertisements_two = $blog_advertisement_two[0];
        $Advert_array['image_two'] = array(
			'ID' => $blog_advertisements_two,
			'discount_label' => $blogDiscounttwoLabel,
		);	
  	}
}
if( !empty( $blogAdvertthreeID ) || !empty( $blogDiscountthreeLabel )){	
	$blog_advertisement_three = wp_get_attachment_image_src( $blogAdvertthreeID,'bosa-420-300');
	if ( is_array(  $blog_advertisement_three ) ){
		$has_Advert = true;
		$has_label = true;
      	$blog_advertisements_three = $blog_advertisement_three[0];
      	$Advert_array['image_three'] = array(
			'ID' => $blog_advertisements_three,
			'discount_label' => $blogDiscountthreeLabel,
		);	
  	}
}

if( !get_theme_mod( 'disable_advertisement_section', true ) && $has_Advert && $has_label ){ ?>
	<section class="section-advertisement-area">
		<div class="content-wrap">
			<div class="row justify-content-center">
				<?php foreach( $Advert_array as $each_Advert ){ ?>
					<div class="col-sm-6 col-md-4">
						<article class="advertisement-content-wrap">
							<figure class= "featured-image">
								<?php
									if( !empty( $each_Advert['discount_label'] ) ) { ?>
										<span class="overlay-txt">
											<?php
												echo esc_html( $each_Advert['discount_label'] );
											?>
										</span>
									<?php } ?>
								<img src="<?php echo esc_url( $each_Advert['ID'] ); ?>">
							</figure>
						</article>
					</div>
				<?php } ?>
			</div>	
		</div>
	</section>
<?php } ?>