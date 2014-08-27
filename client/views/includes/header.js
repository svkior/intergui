Template.header.helpers({
    needSpinner: function(){
        if(Session.get('needSpinner')){
            return true;
        } else {
            return false;
        }
    }
});

Template.header.events({
    'click .scan-dav': function(){

        var param = {
           dirname: "http://cs.scircus.ru:81/test/distout/rtl/intercom/",
           pattern: "intercom_top_arm_kit"
        };
        Session.set('needSpinner', true);
        Meteor.call('scan4dav', param, function(error, id){
            if(error){
                return alert(error.reason);
            } else {
                Session.set('needSpinner', false);
                console.log('done');
            }
        });
        console.log('qwe');
    }
});