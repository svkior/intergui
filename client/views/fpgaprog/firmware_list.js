/**
 * Created by svkior on 27/08/14.
 */

Template.firmwareList.helpers({
    firmwares: function(){
        return Firmwares.find();
    }
});
