import Ember from 'ember';
import BaseAuthenticator from 'ember-simple-auth/authenticators/base';


const { inject: { service } } = Ember;
const { RSVP: { Promise }, isEmpty, run, get, $ } = Ember;


export default BaseAuthenticator.extend({
  clientAuthenticationEndpoint: '/api/users/me',
  ajax: service(),

  authenticate() {
    return this._request_session();
  },

  restore(data) {
    console.log('Restoring session from available credentials.');
    return this._request_session();
  },

  _request_session() {
    const clientAuthenticationEndpoint = this.get('clientAuthenticationEndpoint');
    return new Promise((resolve, reject) => {
      return this.get('ajax').request(clientAuthenticationEndpoint).then(
        // A resolving promise will result in the session becoming authenticated.
        // Any data the promise resolves with will be saved in and accessible
        // via the session service's data.authenticated property
        (response) => {
          console.log('Successful session');
          run(null, resolve, response.data.attributes)
        },
        // A rejecting promise indicates that authentication failed and will result
        // in the session remaining unauthenticated.
        (xhr) => {
          console.log('Session error');
          run(null, reject, xhr.responseJSON || xhr.responseText)
        }
      );
    });
  }
});
