(function() {
  var Attributes, Calendar, Contact, Draft, Event, File, Message, Namespace, RestfulModel, RestfulModelCollection, Tag, Thread, _,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  RestfulModel = require('./restful-model');

  RestfulModelCollection = require('./restful-model-collection');

  Thread = require('./thread');

  Contact = require('./contact');

  Message = require('./message');

  Draft = require('./draft');

  File = require('./file');

  Calendar = require('./calendar');

  Event = require('./event');

  Tag = require('./tag');

  Attributes = require('./attributes');

  _ = require('underscore');

  module.exports = Namespace = (function(superClass) {
    extend(Namespace, superClass);

    Namespace.collectionName = 'n';

    Namespace.attributes = _.extend({}, RestfulModel.attributes, {
      'name': Attributes.String({
        modelKey: 'name'
      }),
      'provider': Attributes.String({
        modelKey: 'provider'
      }),
      'emailAddress': Attributes.String({
        queryable: true,
        modelKey: 'emailAddress',
        jsonKey: 'email_address'
      })
    });

    function Namespace() {
      Namespace.__super__.constructor.apply(this, arguments);
      this.threads = new RestfulModelCollection(Thread, this.connection, this.id);
      this.contacts = new RestfulModelCollection(Contact, this.connection, this.id);
      this.messages = new RestfulModelCollection(Message, this.connection, this.id);
      this.drafts = new RestfulModelCollection(Draft, this.connection, this.id);
      this.files = new RestfulModelCollection(File, this.connection, this.id);
      this.calendars = new RestfulModelCollection(Calendar, this.connection, this.id);
      this.events = new RestfulModelCollection(Event, this.connection, this.id);
      this.tags = new RestfulModelCollection(Tag, this.connection, this.id);
      this;
    }

    Namespace.prototype.me = function() {
      Contact = require('./contact');
      return new Contact({
        namespaceId: this.id,
        name: this.name,
        email: this.emailAddress
      });
    };

    return Namespace;

  })(RestfulModel);

}).call(this);
