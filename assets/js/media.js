;jQuery(document).ready(function($) {
    var clear_gallery, clear_media, set_file_uploader, set_gallery_uploader, set_image_uploader;
    set_image_uploader = function(button, field) {
        var btnTitle, temp_frame, title, typeInput;
        title = 'Select an Image';
        btnTitle = 'Use Image';
        typeInput = 'image';
        temp_frame = wp.media({
            title: title,
            button: {
                text: btnTitle
            },
            library: {
                type: typeInput
            },
            multiple: false
        });
        temp_frame.on('select', function() {
            var attachment, url;
            attachment = temp_frame.state().get('selection').first().toJSON();
            url = '';
            if (attachment.sizes.thumbnail) {
                url = attachment.sizes.thumbnail.url;
            } else {
                url = attachment.sizes.full.url;
            }
            $(field).val(attachment.id);
            $(button).parent().next().html('<img src="' + url + '"/>');
        });
        wp.media.frames.image_frame = temp_frame;
        wp.media.frames.image_frame.open();
        return false;
    };
    set_file_uploader = function(button, field) {
        var btnTitle, temp_frame, title, typeInput;
        title = 'Select a File';
        btnTitle = 'Use File';
        typeInput = '';
        temp_frame = wp.media({
            title: title,
            button: {
                text: btnTitle
            },
            library: {
                type: typeInput
            },
            multiple: false
        });
        temp_frame.on('select', function() {
            var attachment, link;
            attachment = temp_frame.state().get('selection').first().toJSON();
            link = '<a target="_blank" href="' + attachment.url + '">' + attachment.url + '</a>';
            $(field).val(attachment.id);
            $(button).parent().next().html(link);
        });
        wp.media.frames.file_frame = temp_frame;
        wp.media.frames.file_frame.open();
        return false;
    };
    clear_media = function(button, field) {
        $(field).val('');
        $(button).parent().next().html('');
        return false;
    };
    set_gallery_uploader = function(button, list) {
        var btnTitle, temp_frame, title;
        title = 'Select Images';
        btnTitle = 'Use Images';
        temp_frame = wp.media({
            title: title,
            button: {
                text: btnTitle
            },
            library: {
                type: 'image'
            },
            multiple: 'toggle'
        });
        temp_frame.on('select', function() {
            var attachment, field, i, item, l, use_url;
            attachment = temp_frame.state().get('selection').toJSON();
            l = attachment.length;
            i = 0;
            while (i < l) {
                field = $(button).parent().prev().clone();
                use_url = '';
                if (attachment[i].sizes.thumbnail) {
                    use_url = attachment[i].sizes.thumbnail.url;
                } else {
                    use_url = attachment[i].sizes.full.url;
                }
                item = $('<li class="image-picker-placeholder"><a href="#remove" class="tr-icon-remove2" title="Remove Image"></a><img src="' + use_url + '"/></li>');
                $(item).append(field.val(attachment[i].id).attr('name', field.attr('name') + '[]'));
                $(list).append(item);
                $(list).find('a').on('click', function(e) {
                    e.preventDefault();
                    $(this).parent().remove();
                });
                i++;
            }
        });
        wp.media.frames.gallery_frame = temp_frame;
        wp.media.frames.gallery_frame.open();
        return false;
    };
    clear_gallery = function(button, field) {
        if (confirm('Remove all images?')) {
            $(field).html('');
        }
        return false;
    };
    $(document).on('click', '.image-picker-button', function() {
        var field;
        field = $(this).parent().prev();
        set_image_uploader($(this), field[0]);
    });
    $(document).on('click', '.file-picker-button', function() {
        var field;
        field = $(this).parent().prev();
        set_file_uploader($(this), field[0]);
    });
    $(document).on('click', '.image-picker-clear, .file-picker-clear', function() {
        var field;
        field = $(this).parent().prev();
        clear_media($(this), field[0]);
    });
    $(document).on('click', '.gallery-picker-button', function() {
        var list;
        list = $(this).parent().next();
        set_gallery_uploader($(this), list[0]);
    });
    $(document).on('click', '.gallery-picker-clear', function() {
        var list;
        list = $(this).parent().next();
        clear_gallery($(this), list[0]);
    });
    $('.tr-gallery-list a').on('click', function(e) {
        e.preventDefault();
        $(this).parent().remove();
    });
});