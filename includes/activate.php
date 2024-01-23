<?php

function up_activate_plugin() {
    if (version_compare(get_bloginfo('version'), '5.9', '<')) {
        wp_die(__('You must update WordPress to use this plugin', 'udemy-plus'));
    }

    up_register_post_type();
    flush_rewrite_rules();

    global $wpdb;
    $tableName = "{$wpdb->prefix}recipe_ratings";
    $charsetCollate = $wpdb->get_charset_collate();


    $sql = "CREATE TABLE {$tableName} (
        ID bigint unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
        post_id bigint unsigned NOT NULL,
        user_id bigint unsigned NOT NULL,
        rating decimal(3,2) unsigned NOT NULL
    ) ENGINE='InnoDB' {$charsetCollate}";

    require_once(ABSPATH . "/wp-admin/includes/upgrade.php");
    dbDelta($sql);

    $options = get_option('up_options');

    if(!$options) {
        add_option('up_options', [
            'og_title' => get_bloginfo('name'),
            'og_image' => '',
            'og_description' => get_bloginfo('description'),
            'enable_og' => 1
        ]);
    }
}
