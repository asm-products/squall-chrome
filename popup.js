document.addEventListener('DOMContentLoaded', function() {

    var logInButton = document.getElementById('log-in'),
        logOutButton = document.getElementById('log-out');

    function switchLoginState() {
        chrome.storage.local.get('authenticated', function(items) {
            if (items.authenticated) {
                logInButton.style.display = 'none';
                logOutButton.style.display = 'block';
            } else {
                logInButton.style.display = 'block';
                logOutButton.style.display = 'none';
            }
        });
    }

    switchLoginState();

    logInButton.onclick = function() {
        chrome.storage.local.set({
            authenticated: true
        });
        switchLoginState();
    };

    logOutButton.onclick = function() {
        chrome.storage.local.set({
            authenticated: false
        }, function(){
            switchLoginState();
        });
    };
});
