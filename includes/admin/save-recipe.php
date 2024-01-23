<?php

function up_save_post_recipe($postId) {
    if(defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }

    $rating = get_post_meta($postId, 'recipe_rating', true);
    $rating = empty($rating) ? 0 : floatval($rating);

    update_post_meta($postId, 'recipe_rating', $rating);
}