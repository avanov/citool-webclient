import Ember from 'ember';

const { service } = Ember.inject;

export default Ember.Component.extend({
  session: service('session'),
  ajax: service(),
  serverAuthenticationEndpoint: '/api/o/login/be/{provider}',

  actions: {
    initiateLoginFlow(provider) {
      const serverAuthenticationEndpoint = this.get('serverAuthenticationEndpoint').replace('{provider}', provider);
      return this.get('ajax').post(serverAuthenticationEndpoint).then(
        (response) => {},
        (xhr) => console.log('An error has occurred during login initiation.')
      );
    }
  }
});
