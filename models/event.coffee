RestfulModel = require './restful-model'
Attributes = require './attributes'
_ = require 'underscore'

module.exports =
class Event extends RestfulModel

  @collectionName: 'events'

  @attributes: _.extend {}, RestfulModel.attributes,
    'title': Attributes.String
      modelKey: 'title'

    'description': Attributes.String
      modelKey: 'description'

    'location': Attributes.String
      modelKey: 'location'

    'when': Attributes.Object
      modelKey: 'when'

    'start': Attributes.Number
      modelKey: 'start'
      jsonKey: '_start'

    'end': Attributes.Number
      modelKey: 'end'
      jsonKey: '_end'

  fromJSON: (json) ->
    super(json)

    # For indexing and querying purposes, we flatten the start and end of the different
    # "when" formats into two timestamps we can use for range querying. Note that for
    # all-day events, we use first second of start date and last second of end date.
    @start = @when.start_time || new Date(@when.start_date).getTime()/1000.0 || @when.time
    @end = @when.end_time || new Date(@when.end_date).getTime()/1000.0+(60*60*24-1) || @when.time
    delete @when.object
    @
