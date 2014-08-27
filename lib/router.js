/**
 * Created by svkior on 27/08/14.
 */
Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    waitOn: function() { return Meteor.subscribe('firmwares');}
});

Router.map(function(){
    this.route('firmwareList', {path: '/'})
});

var requireLogin = function(pause){
    if(!Session.get('mycurrentuser')){
        this.render('accessDenied');
        pause();
    }
};

Router.onBeforeAction('loading');
Router.onBeforeAction(requireLogin);
