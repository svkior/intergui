/**
 * Created by svkior on 27/08/14.
 */

Template.firmwareItem.helpers({
    firmwareCls : function(){
        console.log(Session.get('firmwareProg'));
        if( Session.equals('firmwareProg', this._id)){
            return "firmware-programmed";
        } else
            return "firmware";
    },
    firmwareInDown: function(){
        if(Session.get('firmwareInDown') == this._id){
            return true;
        } else {
            return false;
        }
    },
    firmwareInProg: function(){
        if(Session.get('firmwareInProg') == this._id){
            return true;
        } else {
            return false;
        }
    }
});

Template.firmwareItem.events({
    'click .btn-prog': function(e){
        e.preventDefault();
        var idd = this._id;
        //console.log('Prog:', idd);
        Session.set('firmwareInProg', idd);
        Meteor.call('firmware_prog', idd, function(error, id){
            if(error){
                return alert(error.reason);
                Session.set('firmwareInProg', null);
            } else {
                Session.set('firmwareInProg', null);
                Session.set('firmwareProg', idd);
                //console.log(Session.get('firmwareProg'));
            }
        });
    },
    'click .btn-remove': function(e){
        e.preventDefault();
        //console.log('Erase');
        //console.log(this);
        Firmwares.remove(this._id);
    },
    'click .btn-down': function(e){
        e.preventDefault();
        var idd = this._id;
        Session.set('firmwareInDown', idd);
        Meteor.call('firmware_download', this._id, function(error, id){
            if(error){
                Session.set('firmwareInDown', undefined);
                return alert(error.reason);
            } else {
                Session.set('firmwareInDown', undefined);
            }
        })
    }
});
