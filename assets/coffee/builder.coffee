jQuery(document).ready ($) ->

  # plugin
  tr_builder_toggle = $('#tr_page_type_toggle')
  if tr_builder_toggle.length > 0
    # on load
    if $('#tr_page_builder_control').hasClass('builder-active')
      $('#builderStandardEditor').hide()
    else
      $('#tr_page_builder').hide()
    # on toggle
    $(tr_builder_toggle).on 'click', 'a', (e) ->
      e.preventDefault()
      that = $(this)
      other = $(that.siblings()[0])
      checkbox = $('#builderSelectRadio input')[1]
      that.addClass 'builder-active button-primary'
      other.removeClass 'builder-active button-primary'
      $(that.attr('href')).show()
      $(other.attr('href')).hide()
      if that.attr('id') == 'tr_page_builder_control'
        $(checkbox).attr 'checked', 'checked'
      else
        $(checkbox).removeAttr 'checked'
        $('#content-html').click()
        $('#content-tmce').click()
      return

  if $('.tr-components').length > 0

    initComponent = (data, fields) ->
      callbacks = TypeRocket.repeaterCallbacks
      ri = 0
      while callbacks.length > ri
        if typeof callbacks[ri] == 'function'
          callbacks[ri] data
        ri++
      if $.isFunction($.fn.sortable)
        $sortables = fields.find('.tr-gallery-list')
        $items_list = fields.find('.tr-items-list')
        $repeater_fields = fields.find('.tr-repeater-fields')
        if $sortables.length > 0
          $sortables.sortable()
        if $repeater_fields.length > 0
          $repeater_fields.sortable
            connectWith: '.tr-repeater-group'
            handle: '.repeater-controls'
        if $items_list.length > 0
          $items_list.sortable
            connectWith: '.item'
            handle: '.move'
      return


    $('.typerocket-container').on 'click', '.tr-builder-add-button', (e) ->
      e.preventDefault()
      select = $(this).next()

      overlay = $('<div>').addClass('tr-builder-select-overlay').on 'click', ->
        $(this).remove()
        $('.tr-builder-select').fadeOut()

      $('body').append overlay
      select.fadeIn()

    $('.typerocket-container').on 'click', '.tr-builder-component-control', (e) ->
      e.preventDefault()
      $(this).parent().children().removeClass 'active'
      id = $(this).addClass('active').parent().data 'id'
      index = $(this).index()
      frame = $('#frame-'+id)
      components = frame.children()
      components.removeClass 'active'
      component = components[index]
      $(component).addClass 'active'

    $('.typerocket-container').on 'click', '.tr-remove-builder-component', (e) ->
      e.preventDefault()
      if confirm('Remove component?')
        control = $(this).parent()
        control.parent().children().removeClass 'active'
        id = control.parent().data 'id'
        index = $(this).parent().index()
        frame = $('#frame-'+id)
        components = frame.children()
        component = components[index]
        $(component).remove()
        control.remove()

    $('.tr-components').sortable
      start: (e, ui) ->
        ui.item.startPos = ui.item.index()

      update: (e, ui) ->
        select = ui.item.parent()
        id = select.data 'id'
        frame = $('#frame-'+id)
        components = frame.children().detach()
        index = ui.item.index()
        old = ui.item.startPos
        builder = components.splice old, 1
        components.splice index, 0, builder[0]
        frame.append components


    $('.typerocket-container').on 'click', '.builder-select-option', (e) ->
      $that = $(this)
      $that.parent().fadeOut()
      $('.tr-builder-select-overlay').remove()
      if !$that.hasClass('disabled')
        mxid = $that.data('id')
        folder = $that.data('folder')
        group = $that.data('group')
        img = $that.data('thumbnail')
        $fields = $('#frame-' + mxid)
        $components = $('#components-' + mxid)
        $select = $('ul[data-mxid="' + mxid + '"]')
        type = $that.data('value')
        $that.addClass 'disabled'
        url = '/tr_builder_api/v1/' + group + '/' + type  + '/' + folder
        form_group = $select.data('group')
        $.ajax
          url: url
          method: 'POST'
          dataType: 'html'
          data: form_group: form_group
          success: (data) ->
            data = $(data)
            $active_fields = $fields.children('.active')
            $active_components = $components.children('.active')
            $fields.children().removeClass 'active'
            $components.children().removeClass 'active'

            if img
              img = '<img src="'+img+'" />'

            html = '<li class="active tr-builder-component-control">'+img+'<span class="tr-builder-component-title">'+$that.text()+'</span><span class="remove tr-remove-builder-component"></span>'
            if($active_components.length > 0 && $active_fields.length > 0 )
              data.insertAfter($active_fields).addClass 'active'
              $active_components.after html
            else
              data.prependTo($fields).addClass 'active'
              $components.prepend html

            initComponent data, $fields
            $that.removeClass 'disabled'
          error: (jqXHR) ->
            $that.val('Try again - Error ' + jqXHR.status).removeAttr 'disabled', 'disabled'
            return
      return
    return