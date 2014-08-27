/**
 * Created by svkior on 27/08/14.
 */
Template.accessDenied.events({
    'submit form': function(e){
        e.preventDefault();
        Session.set('mycurrentuser', $(e.target).find('[name=author]').val() );
    }
});