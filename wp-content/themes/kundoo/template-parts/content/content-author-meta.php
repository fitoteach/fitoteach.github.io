<?php
/**
 * Template part for displaying author Meta
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package Kundoo
 */

?>
<div class="blog-post author-details">
	<div class="media">
		<?php
		$kundoo_author_description = get_the_author_meta( 'description' );
		$kundoo_author_id          = get_the_author_meta( 'ID' );
		$kundoo_current_user_id    = is_user_logged_in() ? wp_get_current_user()->ID : false;
		?>
		<div class="auth-mata">
			<?php echo get_avatar( get_the_author_meta('ID'), 200); ?>
		</div>
		<div class="media-body author-meta-det">
			<h5><?php the_author_link(); ?><br><span class="media-link"><i class="text-primary fa fa-external-link"></i> <?php echo esc_html_e('visit:','kundoo');?> <a href="<?php echo get_the_author_meta( 'url' ); ?>"><?php echo get_the_author_meta( 'url' ); ?></a></span></h5>


			<?php
			if ( '' === $kundoo_author_description ) {
				if ( $kundoo_current_user_id && $kundoo_author_id === $kundoo_current_user_id ) {

							// Translators: %1$s: <a> tag. %2$s: </a>.
					printf( wp_kses_post( __( 'You haven&rsquo;t entered your Biographical Information yet. %1$sEdit your Profile%2$s now.', 'kundoo' ) ), '<br/><a href="' . esc_url( get_edit_user_link( $kundoo_current_user_id ) ) . '">', '</a>' );
				}
			} else {
				?>
				<p><?php echo wp_kses_post( $kundoo_author_description ); ?></p>
				<?php	
			}
			?>
			<a href="<?php echo esc_url( get_author_posts_url( get_the_author_meta( 'ID' ), get_the_author_meta( 'user_nicename' ) ) ); ?>" class="btn btn-white"><?php esc_html_e('View All Post','kundoo'); ?></a>
		</div>
	</div>
</div>