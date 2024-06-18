<?php
if ( get_header_image() ) : ?>
	<a href="<?php echo esc_url( home_url( '/' ) ); ?>" id="custom-header" rel="home">
		<img src="<?php esc_url(header_image()); ?>" width="<?php echo esc_attr( get_custom_header()->width ); ?>" height="<?php echo esc_attr( get_custom_header()->height ); ?>" alt="<?php echo esc_attr(get_bloginfo( 'title' )); ?>">
	</a>	
<?php endif;
$hs_preloader   = get_theme_mod('hs_preloader'); 
if($hs_preloader == '1'){
  ?>
  <div id="preloader" class="preloader">
    <div class="loader">
      <div></div>
      <div></div>
    </div>
  </div>
<?php } ?>
  <!--===// Start: Main Header
  	=================================-->
  	<header id="main-header" class="main-header">
      <!--===// Start: Navigation Wrapper
      	=================================-->
      	<div class="navigation-wrapper">
        <!--===// Start: Main Desktop Navigation
        	=================================-->
        	<div class="main-navigation-area d-none d-lg-block">
        		<div class="main-navigation <?php echo esc_attr(kundoo_sticky_menu()); ?>">
        			<div class="container">
        				<div class="row">
        					<div class="col-2 my-auto">
        						<div class="logo">
        							<?php 
        							if(has_custom_logo())
        							{	
        								the_custom_logo();
        							}
        							else { 
        								?>
        								<a href="<?php echo esc_url( home_url( '/' ) ); ?>">
        									<h4 class="site-title">
        										<?php 
        										echo esc_html(bloginfo('name'));
        										?>
        									</h4>
        								</a>	
        								<?php 						
        							}
        							?>
        							<?php
        							$kundoo_site_desc = get_bloginfo( 'description');
        							if ($kundoo_site_desc) : ?>
        								<p class="site-description"><?php echo esc_html($kundoo_site_desc); ?></p>
        							<?php endif; ?>
        						</div>
        					</div>
        					<div class="col-10 my-auto">
        						<nav class="navbar-area">
        							<div class="main-navbar">
        								<?php 
        								wp_nav_menu( 
        									array(  
        										'theme_location' => 'primary_menu',
        										'container'   => '',
        										'menu_class'  => 'main-menu',
        										'fallback_cb' => 'WP_Bootstrap_Navwalker::fallback',
        										'walker'      => new WP_Bootstrap_Navwalker()
        									) 
        								);
        								?>                            
        							</div>
        							<div class="main-menu-right">
        								<ul class="menu-right-list">
                          <?php
                          $hs_nav_search       = get_theme_mod( 'hs_nav_search','1'); 
                          if($hs_nav_search == '1') { ?>
                           <li class="search-button">
                            <button type="button" id="header-search-toggle" class="header-search-toggle" aria-expanded="false" aria-label="Search Popup"><i class="fa fa-search"></i></button>
                         <!--===// Start: Header Search PopUp
                          =================================-->
                          <div class="header-search-popup">
                            <div class="header-search-flex">
                              <?php get_search_form(); ?>
                              <button type="button" id="header-search-close" class="close-style header-search-close" aria-label="Search Popup Close"></button>
                            </div>
                          </div>
                        <!--===// End: Header Search PopUp
                         =================================-->
                       </li>
                     <?php } ?>
                     <?php
                     $hide_show_hdr_btn     = get_theme_mod('hide_show_hdr_btn','1');
                     $hdr_btn_icon          = get_theme_mod('hdr_btn_icon','fa-check');
                     $hdr_btn_lbl           = get_theme_mod('hdr_btn_lbl','Get Started');
                     $hdr_btn_url           = get_theme_mod('hdr_btn_url','');
                     $hdr_btn_open_new_tab  = get_theme_mod('hdr_btn_open_new_tab','');
                     if($hide_show_hdr_btn == '1') : ?>
                      <li class="button-area">
                        <a href="<?php echo esc_url( $hdr_btn_url ); ?>" <?php if($hdr_btn_open_new_tab == '1'): echo "target='_blank'"; endif;?> class="btn btn-primary btn-like-icon theme-btn">
                          <span class="bticn">
                            <i class="fa <?php echo esc_attr($hdr_btn_icon); ?>"></i>
                          </span> <?php echo esc_html($hdr_btn_lbl); ?> </a>
                        </li>
                      <?php endif; ?>
                    </ul>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
        <!--===// End:  Main Desktop Navigation
        	=================================-->
        <!--===// Start: Main Mobile Navigation
        	=================================-->
        	<div class="main-mobile-nav <?php echo esc_attr(kundoo_sticky_menu()); ?>">
        		<div class="container">
        			<div class="row">
        				<div class="col-12">
        					<div class="main-mobile-menu">
        						<div class="mobile-logo">
        							<div class="logo">
        								<?php 
        								if(has_custom_logo())
        								{	
        									the_custom_logo();
        								}
        								else { 
        									?>
        									<a href="<?php echo esc_url( home_url( '/' ) ); ?>">
        										<h4 class="site-title">
        											<?php 
        											echo esc_html(bloginfo('name'));
        											?>
        										</h4>
        									</a>	
        									<?php 						
        								}
        								?>
        								<?php
        								$kundoo_site_desc = get_bloginfo( 'description');
        								if ($kundoo_site_desc) : ?>
        									<p class="site-description"><?php echo esc_html($kundoo_site_desc); ?></p>
        								<?php endif; ?>
        							</div>
        						</div>
        						<div class="menu-collapse-wrap">
        							<div class="hamburger-menu">
        								<button type="button" class="menu-collapsed" aria-label="Menu Collaped">
        									<div class="top-bun"></div>
        									<div class="meat"></div>
        									<div class="bottom-bun"></div>
        								</button>
        							</div>
        						</div>
        						<div class="main-mobile-wrapper">
        							<div id="mobile-menu-build" class="main-mobile-build">
        								<button type="button" class="header-close-menu close-style" aria-label="Header Close Menu"></button>
        							</div>
        							<div class="main-mobile-overlay" tabindex="-1"></div>
        						</div>
        						<div class="header-above-btn">
        							<button type="button" class="header-above-collapse" aria-label="Header Above Collapse">
        								<span></span>
        							</button>
        						</div>
        						<div class="header-above-wrapper">
        							<div id="header-above-bar" class="header-above-bar"></div>
        						</div>
        					</div>
        				</div>
        			</div>
        		</div>
        	</div>
        <!--===// End: Main Mobile Navigation
        	=================================-->
        </div>
      <!--===// End: Navigation Wrapper
      	=================================-->
      </header>
    <!-- End: Main Header
        =================================-->