import Ember from 'ember';

const { inject: { service }, RSVP } = Ember;

export default Ember.Service.extend({
  session: service('session'),
  store: service(),

  loadCurrentUser() {
    return new RSVP.Promise((resolve, reject) => {
      const accountId = this.get('session.data.authenticated.id');
      if (!Ember.isEmpty(accountId)) {
        const store = this.get('store');
        return store.find('user', accountId).then(
          (account) => {
            this.set('user', account);
            resolve();
          },
          (err) => {
            alert("Request error: " + err);
            reject();
          });
      } else {
        resolve();
      }
    });
  }
});
