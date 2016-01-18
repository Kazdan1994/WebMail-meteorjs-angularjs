/**
 * Created by Arthur on 14/01/2016.
 */
Template.register.event({
    'submit #register': function (e, template) {
        e.preventDefault();

        var username = $('input[name="username"]').val();
        var email = $('input[name="email"]').val();
        var password = $('input[name="password"]').val();

        var user = {
            username: username,
            email: email,
            password: password
        };

        Accounts.createUser(user, function(err) { // Mais quelle est donc cette méthode mystère ?...
            if (err) {
                document.write('<p class="alert alert-danger">' + err.reason + '</p>')
            } else {
                Router.go('mails'); // Ceci est une redirection depuis un event/helper, elle est basée sur le nom de la route
            }
        });

        Accounts.validateNewUser(function(user) {
            // L'adresse email est-elle valide ?
            if (
                // Ne fonctionne pas pour tout, mais relativement précise
                /^[a-zA-Z][a-zA-Z0-9_-]+[a-zA-Z0-9]@([a-zA-Z][a-zA-Z0-9-]+\.)+[a-zA-Z]{2,3}$/
                    .test(user.emails[0].address)
            ) {
                return true;
            } else {
                throw new Meteor.Error(500, "Veuillez donner une adresse email valide");
            }
        });
    }
});