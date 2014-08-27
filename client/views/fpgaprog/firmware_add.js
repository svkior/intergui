/**
 * Created by svkior on 27/08/14.
 */

Template.firmwareAdd.helpers({
    getAuthor: function(){
        return Session.get('mycurrentuser');
    }
});

Template.firmwareAdd.events({
    'submit form': function(e){
        e.preventDefault();
        var firmware = {
            author: $(e.target).find('[name=author]').val(),
            url: 'http://localhost:3000/superproshivha1.bit',
            fwname: 'top_arm_from_hell.bit',
            description: $(e.target).find('[name=description]').val()
        };
        $(e.target).find('[name=description]').val('');
        Firmwares.insert(firmware);
    }
});