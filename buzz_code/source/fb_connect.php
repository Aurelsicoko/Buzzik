<script src="http://connect.facebook.net/fr_FR/all.js"></script>
<div id="fb-root"></div>

<script>
window.fbAsyncInit = function() {

    // init the FB JS SDK
    FB.init({
      appId      : '396094440518006',                    // App ID from the app dashboard
      channelUrl : 'http://www.web-infocom.fr/hetic',				 // Channel file for x-domain comms
      status     : true,                                 // Check Facebook Login status
      xfbml      : true                                  // Look for social plugins on the page
    });

    function login(){
		FB.login(function(response) {
		   if (response.authResponse) {
		     FB.api('/me', function(response) {
		     });
		   } else {
		   }
		});
	}

	function getLoginStatus(){
	    FB.getLoginStatus(function(response) {
	    	
		  if (response.status === 'connected') {
		    var uid = response.authResponse.userID;
		    var accessToken = response.authResponse.accessToken;
		  } else if (response.status === 'not_authorized') {
		  	login();
		  } else {
		    login();
		  }
		});
	}

}
</script>