###*
# Booyah!
#
# The easy mode template parser.
#
# User: Kevin Dees
# Date: 9/6/13
# Time: 10:37 AM
###

class @Booyah
  templateTagKeys: []
  templateTagValues: []
  templateArray: []
  templateString: ''

  constructor: ->
    @templateTagKeys = []
    @templateTagValues = []
    @templateArray = []
    @templateString = ''
  ready: ->
    @templateString = @templateArray.join('')
    @replaceTags()
    @templateString
  addTag: (key, value) ->
    @templateTagKeys.push key
    @templateTagValues.push value
    this
  addTemplate: (string) ->
    @templateArray.push string
    this
  replaceTags: () ->
    tagCount = @templateTagKeys.length
    i = 0
    while tagCount > i
      replaceTag = @templateTagKeys[i]
      withThisValue = @templateTagValues[i]
      @templateString = @templateString.replace(new RegExp(replaceTag), withThisValue)
      i++
    return