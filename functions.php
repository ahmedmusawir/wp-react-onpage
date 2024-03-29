<?php

function add_cors_http_header()
{
 header("Access-Control-Allow-Origin: *");
 header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS, READ');
 header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token,authorization,XMLHttpRequest, user-agent, accept, x-requested-with');
 header("Access-Control-Allow-Credentials: true");

 if ('OPTIONS' == $_SERVER['REQUEST_METHOD']) {
  status_header(200);
  exit();
 }
}

add_action('init', 'add_cors_http_header');

// ENABLE WP APPLICATION PASSWORD ON HTTP -- NON SSL OR HTTPS
add_filter('wp_is_application_passwords_available', '__return_true');

/*========================================
// WOOCOM REST API - EXCLUDE CATETORY PARAM CREATION
========================================*/

function filter_woocommerce_rest_category_exclude($args, $request)
{
 $params = $request->get_query_params();
 if (isset($params['category_exclude'])) {
  $args['tax_query'] = array(
   array(
    'taxonomy' => 'product_cat',
    'terms'    => explode(',', $params['category_exclude']),
    'field'    => 'term_id',
    'operator' => 'NOT IN'
   )
  );
 }
 return $args;
};
add_filter("woocommerce_rest_product_object_query", 'filter_woocommerce_rest_category_exclude', 10, 2);

/*========================================
// WOOCOM REST API - EXCLUDE TAG PARAM CREATION
========================================*/

function filter_woocommerce_rest_tag_exclude($args, $request)
{
 $params = $request->get_query_params();
 if (isset($params['tag_exclude'])) {
  $args['tax_query'] = array(
   array(
    'taxonomy' => 'product_tag',
    'terms'    => explode(',', $params['tag_exclude']),
    'field'    => 'term_id',
    'operator' => 'NOT IN'
   )
  );
 }
 return $args;
};
add_filter("woocommerce_rest_product_object_query", 'filter_woocommerce_rest_tag_exclude', 10, 2);

/*========================================
=            PREPARE REST API            =
========================================*/

function prepare_rest($data, $post, $request)
{

 $_data = $data->data;

 $thumbnail_id  = get_post_thumbnail_id($post->ID);
 $thumbnail_img = wp_get_attachment_image_src($thumbnail_id, 'thumbnail');
 $medium_img    = wp_get_attachment_image_src($thumbnail_id, 'medium');
 $full_img      = wp_get_attachment_image_src($thumbnail_id, 'full');

 $_data['featured_thumb']  = $thumbnail_img[0];
 $_data['featured_medium'] = $medium_img[0];
 $_data['featured_full']   = $full_img[0];

 $data->data = $_data;

 return $data;
}

add_filter('rest_prepare_post', 'prepare_rest', 10, 3);

/*=====  End of PREPARE REST API  ======*/

// ADDING USER ROLES TO THE REST API
function get_user_roles($object, $field_name, $request)
{
 return get_userdata($object['id'])->roles;
}

add_action('rest_api_init', function () {
 register_rest_field('user', 'roles', array(
  'get_callback'    => 'get_user_roles',
  'update_callback' => null,
  'schema'          => array(
   'type' => 'array'
  )
 ));
});

/**
 * Theme Setup Functions
 */
require get_template_directory() . '/_functions/theme-setup.php';

/**
 * Widget Setup Functions
 */
require get_template_directory() . '/_functions/widget-setup.php';

/**
 * Enqueue scripts and styles.
 */
require get_template_directory() . '/_functions/scripts-setup.php';

/**
 * Implement the Custom Header feature.
 */
require get_template_directory() . '/inc/custom-header.php';

/**
 * Custom template tags for this theme.
 */
require get_template_directory() . '/inc/template-tags.php';

/**
 * Functions which enhance the theme by hooking into WordPress.
 */
require get_template_directory() . '/inc/template-functions.php';

/**
 * Customizer additions.
 */
require get_template_directory() . '/inc/customizer.php';

/*
 * Load Jetpack compatibility file.
 */
if (defined('JETPACK__VERSION')) {
 require get_template_directory() . '/inc/jetpack.php';
}

/*======================================
=            MOOSE INCLUDES            =
======================================*/

/**
 * Bootstrap 4 Nav Walker
 */
// require get_template_directory() . '/_functions/bootstrap-navwalker.php';
// require get_template_directory() . '/_functions/moose-navwalker.php';
/**
 * Helper Functions
 */
require get_template_directory() . '/_functions/helpers-setup.php';

/**
 *
 * React App Setup
 *
 */
// require get_template_directory() . '/_functions/react-setup.php';

/**
 *
 * Adding Breadcrums
 *
 */

// require get_template_directory() . '/_functions/breadcrum-function.php';

/**
 *
 * CUSTOMIZING THE LOGIN SCREEN
 *
 */

require get_template_directory() . '/_functions/wp-logon-screen.php';

/**
 * SELFLIST CUSTOM FUNCTIONS
 */
// TEST SECTION ... REMEMBER TO COMMENT OUT WHEN DONE

// require get_theme_file_path('/_functions/selflist/ajax/test-ajax.php');
// require get_theme_file_path('/_functions/selflist/selflist-create-categories.php');
// require get_theme_file_path('/_functions/selflist/ajax/test-flag-ajax.php');

// CUSTOM REST ROUTE FOR LISTING 1ST PROTOTYPE
// require get_theme_file_path('/_functions/selflist/selflist-search-route.php');

// SELFLIST CUSTOM POST TYPE 1ST PROTOTYPE
// require get_theme_file_path('/_functions/selflist/selflist-listing-cpt.php');

// SELFLIST CUSTOM USER ROLES & PERMISSIONS
// require get_theme_file_path('/_functions/selflist/selflist-user-roles.php');

// SELFLIST CUSTOM USER LOGIN LOGOUT RELATED FUNCTIONS (ADMIN BAR, LOGIN/LOGOUT BTN, REDIRECTION ETC.)
require get_theme_file_path('/_functions/selflist/selflist-user-logins.php');

// SELFLIST SUB CATEGORIES LISTING FUNCTION
require get_theme_file_path('/_functions/selflist/selflist-get-category-list.php');

//Getting Main Categories with Sub Cats to JSON - selflist-get-subcats-json.php IS A DEPENDENCY
require get_theme_file_path('/_functions/selflist/selflist-get-category-json.php');
//Getting Sub Categories
require get_theme_file_path('/_functions/selflist/selflist-get-subcats-json.php');

// SELFLIST SUB CATEGORIES LISTING FUNCTION
require get_theme_file_path('/_functions/selflist/selflist-post-acf-to-rest.php');
// SELFLIST SET CUSTOM POST TITLE WITH ID
// require get_theme_file_path('/_functions/selflist/selflist-post-title.php');

// SELFTLIST CREATE CATEGORIES
require get_theme_file_path('/_functions/selflist/ajax/main-cat-insert-ajax.php');
require get_theme_file_path('/_functions/selflist/ajax/primo-cat-insert-ajax.php');
require get_theme_file_path('/_functions/selflist/ajax/secondo-cat-insert-ajax.php');
require get_theme_file_path('/_functions/selflist/ajax/terzo-cat-insert-ajax.php');
require get_theme_file_path('/_functions/selflist/ajax/list-preview-ajax.php');
require get_theme_file_path('/_functions/selflist/ajax/list-payment-and-publish-ajax.php');
// SELFLIST CUSTOM TAXONOMY & CATEGORIES
require get_theme_file_path('/_functions/selflist/taxonomy/selflist-create-taxonomy.php');
require get_theme_file_path('/_functions/selflist/taxonomy/selflist-cat-list-w-links.php');
require get_theme_file_path('/_functions/selflist/taxonomy/selflist-cat-list-wo-links.php');
// SELFLIST WITH WOOCOM
require get_theme_file_path('/_functions/selflist/woocom/style-checkout-w-bootstrap.php');
require get_theme_file_path('/_functions/selflist/woocom/add-points-to-member.php');
require get_theme_file_path('/_functions/selflist/woocom/general-helpers.php');
// SELFLIST WITH GRAVITY FORMS
require get_theme_file_path('/_functions/selflist/gravity/add-signup-customer-points.php');
require get_theme_file_path('/_functions/selflist/gravity/hmu-multi-email-send.php');

// THIS UPDATES THE CATEGORY JSON FILE MANUALLY
// require get_theme_file_path('/_functions/selflist/taxonomy/selflist-auto-update-cat-json.php');

// DISPLAY STATES & CITIES IN CATEGORY.PHP PAGE TOP MENU
require get_theme_file_path('/_functions/selflist/city_state/get_city_state.php');
require get_theme_file_path('/_functions/selflist/rest/city-state-to-rest.php');
require get_theme_file_path('/_functions/selflist/ajax/city-state-filter-ajax.php');
require get_theme_file_path('/_functions/selflist/ajax/city-insert-ajax.php');
// MAIN LIST INSERT: HAD TO BE RE-WRITTEN DUE TO TAX_INPUT NOT WORKING. USING PHP NOW INSTEAD OF REST
require get_theme_file_path('/_functions/selflist/ajax/list-insert-ajax.php');
// DELSIT AJAX
require get_theme_file_path('/_functions/selflist/ajax/delist-status-update-ajax.php');
require get_theme_file_path('/_functions/selflist/ajax/relist-data-update-ajax.php');
require get_theme_file_path('/_functions/selflist/ajax/delete-list-permanently-ajax.php');
// MEMBER PROFILE DATA INSERT AJAX
require get_theme_file_path('/_functions/selflist/ajax/profile-data-insert-ajax.php');
// FLAG RELATED
require get_theme_file_path('/_functions/selflist/cpt/flag-post-type.php');
require get_theme_file_path('/_functions/selflist/ajax/list-flag-ajax.php');
require get_theme_file_path('/_functions/selflist/ajax/test-wp-ajax-function.php');

// FILTERS FOR ACF TO REST PLUGIN ... DON'T NEED THAT PLUGIN
// Enable the option show in rest
// add_filter( 'acf/rest_api/field_settings/show_in_rest', '__return_true' );

// Enable the option edit in rest
// add_filter( 'acf/rest_api/field_settings/edit_in_rest', '__return_true' );

// require get_theme_file_path('/_classes/Moose_Test.php');
// require get_theme_file_path('/_classes/Utils.php');
// require get_theme_file_path('/_functions/autoloader/class-autoloader.php ');

/*
 * LOADING CLASSES
 */

// require get_theme_file_path('/_classes/Test_Oop_Wp.php');
// require get_theme_file_path('/_classes/Utils.php');

// require get_theme_file_path('/_functions/autoloader/class-autoloader.php');

/*
 * COMPOSER CLASS LOADS
 */

require __DIR__ . '\vendor\autoload.php';