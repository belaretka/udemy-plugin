import {registerBlockType} from '@wordpress/blocks';
import {RichText, useBlockProps, InspectorControls} from '@wordpress/block-editor';
import {__} from '@wordpress/i18n';
import {PanelBody, ToggleControl} from '@wordpress/components';
import block from './block.json';
import icons from '../../icons.js';
import './main.css';

registerBlockType(block.name, {
    icon: icons.primary,
    edit({attributes, setAttributes}) {
        const {content, showCategory} = attributes;
        const blockProps = useBlockProps();

        return (
            <>
                <InspectorControls>
                    <PanelBody title={__('General', 'udemy-plus')}>
                        <ToggleControl
                            label={__('Show Category', 'udemy-plus')}
                            checked={showCategory}
                            onChange={ newVal => setAttributes({showCategory: newVal})}
                            help={
                                showCategory ?
                                    __('Category shown', 'udemy-plus') :
                                    __('Custom Content shown', 'udemy-plus')
                            }
                        />
                    </PanelBody>
                </InspectorControls>
                <div {...blockProps}>
                    <div className="inner-page-header">
                        {
                            showCategory ?
                                <h1>{__('Category: Some', 'udemy-plus')}</h1> :
                                <RichText
                                    tagName="h1"
                                    placeholder={__('Header', 'udemy-plus')}
                                    value={content}
                                    onChange={content => setAttributes({content})}
                                />
                        }
                    </div>
                </div>
            </>
        );
    }
});