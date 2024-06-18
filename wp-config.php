<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the website, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/documentation/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'fitoteach.github.io' );

/** Database username */
define( 'DB_USER', 'root' );

/** Database password */
define( 'DB_PASSWORD', '' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         '{K09.7EOq/6RYt|DMmblLSeaBhDnno%&d,/O1@`| YUp1ZXDIP$Q(ZujwoLZq}|p' );
define( 'SECURE_AUTH_KEY',  '{S_OL[a-#F(EFn4AhOt8|1?Ew8_kUB6:Iy m.e)(4ar5@rC)7RJ3v+|}[S/G;fRR' );
define( 'LOGGED_IN_KEY',    '*F{)|Y~fGJN.T?biAXarFti^/<9eF&4(eign^%a|e(pNYmy}(| (grM23pOQBLwr' );
define( 'NONCE_KEY',        '/pE=}XLtRXH]N(yiQhW^?aWn~$]J`J~KfuCq6F ZXzp18R$8Z)`0vcS$:HA6M&rG' );
define( 'AUTH_SALT',        '95m$N^!rY]:?tvj)#j`1VK5SB1XUR?,.*KwH~t55_6E;W]yX.B_#A]6c_,~+vQN%' );
define( 'SECURE_AUTH_SALT', 'Ji&B^V!PQRLA4-PX$XD~sJ>n:M,Pfxw|Nk.bkN*hT<=W8hI;,?1tC=uA(t{4f96D' );
define( 'LOGGED_IN_SALT',   'Ozq)#NwS?!yG~vdI9Em7>f3g4X.7Vw54+Erf_/:iXw5(h Ijf2bJ2U7mP*;PJ]}{' );
define( 'NONCE_SALT',       'v_m& %&yvW^Tf4sI$2klLxL^K!F^$Ksi#|CAOJso2_ESC6%InVwm:cVnlI^Mrd@H' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/documentation/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
