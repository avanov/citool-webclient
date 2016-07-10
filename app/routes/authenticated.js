import Ember from 'ember';

const { service } = Ember.inject;

export default Ember.Route.extend({
  session: service(),

  activate() {
    // All arguments passed to .authenticate() except the first one are passed to the corresponding authenticator
    this.get('session').authenticate('authenticator:solo').catch((reason) => {
      console.log(reason.error);
      this.set('errorMessage', reason.error);
      this.transitionTo('index');
    });
  }
});
