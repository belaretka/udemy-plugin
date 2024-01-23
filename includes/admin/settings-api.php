<?php
function up_settings_api()
{
    register_setting('up_options_group', 'up_options');

    add_settings_section(
        'up_options_section',
        __('udemy PLus Settings', 'udemy-plus'),
        'up_options_section_cb',
        'up-options-page'
    );
    add_settings_field(
        'og_title_input',
        __('Open Graph Title', 'udemy-plus'),
        'og_title_input_cb',
        'up-options-page',
        'up_options_section'
    );
    add_settings_field(
        'og_image_input',
        __('Open Graph Image', 'udemy-plus'),
        'og_image_input_cb',
        'up-options-page',
        'up_options_section'
    );
    add_settings_field(
        'og_description_input',
        __('Open Graph Description', 'udemy-plus'),
        'og_description_input_cb',
        'up-options-page',
        'up_options_section'
    );
    add_settings_field(
        'og_enable_input',
        __('Open Graph Enable', 'udemy-plus'),
        'og_enable_input_cb',
        'up-options-page',
        'up_options_section'
    );

}

function up_options_section_cb()
{
    ?><p>An alternative form for updating options with the settings API.</p><?php
}

function og_title_input_cb()
{
    $options = get_option('up_options');
    ?><input class="regular-text" name="up_options[og_title]" value="<?= esc_attr($options['og_title']) ?>" /><?php
}

function og_description_input_cb()
{
    $options = get_option('up_options');
    ?>
    <textarea class="large-text"
              name="up_options[og_description]"><?= esc_html($options['og_description']) ?></textarea>
    <?php
}

function og_image_input_cb()
{
    $options = get_option('up_options');
    ?>
    <input type="hidden" name="up_options[og_image]" id="up_og_image"
           value="<?= esc_attr($options['og_image']); ?>">
    <img src="<?= esc_attr($options['og_image']); ?>"
         id="og-img-preview">
    <a href="#" class="button-primary"
       id="og-img-btn">
        Select Image
    </a>
    <?php
}

function og_enable_input_cb() {
    $options = get_option('up_options');
    ?>
    <label for="up_enable_og">
        <input name="up_options[enable_og]" type="checkbox" id="up_enable_og"
               value="1" <?php checked('1', $options['enable_og']); ?> />
        <span>Enable</span>
    </label>
    <?php
}