``import DS from 'ember-data';``
``import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';``


applicationAdapter = DS.JSONAPIAdapter.extend DataAdapterMixin, {
  namespace: 'api',
  authorizer: 'authorizer:solo'
}


``export default applicationAdapter;``
