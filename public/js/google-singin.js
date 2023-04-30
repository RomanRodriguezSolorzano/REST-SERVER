let googleUser = {};
  let startApp = () =>{
    gapi.load( 'auth2', () => {
      // Retrieve the singleton for the GoogleAuth library and set up the client.
      auth2 = gapi.auth2.init({
        client_id: '702133085597-o4b2lhve9vfup5a0m1bj25uj7r542unk.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        // Request scopes in addition to 'profile' and 'email'
        //scope: 'additional_scope'
      });
      attachSignin(document.getElementById('SignIn'));
    });
  };

  function attachSignin(element) {    
    auth2.attachClickHandler(element, {},
        function(googleUser) {
            let profile = googleUser.getBasicProfile();
            console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
            console.log('Name: ' + profile.getName());
            console.log('Image URL: ' + profile.getImageUrl());
            console.log('Email: ' + profile.getEmail());
        }, function(error) {
          alert(JSON.stringify(error, undefined, 2));
        });
  }

startApp();

const signout = document.getElementById("SignOut");
signout.addEventListener('click', ()=>{    
    let auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then( ()=> {  
      console.log(auth2);
      console.log('User signed out.');
    }).catch(error =>{
        console.log(error);
    });
});

