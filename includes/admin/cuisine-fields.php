<?php

function up_cuisine_add_form_fields() {
    ?>
    <div class="form-field">
        <label><?php _e('More Info URL', 'udemy-plus');?></label>
        <input name="up_more_info_url" type="text">
        <p><?php _e('A URL a user can click to learn more information about this cuisine', 'udemy-plus');?></p>
    </div>

    <?php
}

function up_cuisine_edit_form_fields($term) {
    $url = get_term_meta($term->term_id, 'more_info_url', true);

    ?>
    <tr class="form-field">
        <th scope="row">
            <label><?php _e('More Info URL', 'udemy-plus');?></label>
        </th>
        <td>
            <input name="up_more_info_url" type="text" value="<?php echo esc_attr($url);?>">
            <p class="description"><?php _e('A URL a user can click to learn more information about this cuisine', 'udemy-plus');?></p>
        </td>
    </tr>
    <?php
}