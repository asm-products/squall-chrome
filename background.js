function twitterOnClick(info, tab) {
    console.log('Tweet text: ' + info.selectionText);
}

function imgurOnClick(info, tab) {
    console.log('Upload to Imgur text: ' + info.selectionText);
}

function openOptionsPage(){
    chrome.tabs.create({url: "options.html"});
}


function switchMenus(authenticated){
    if(authenticated){
        // Show context menus
        chrome.contextMenus.removeAll();
        chrome.contextMenus.create({
            title: 'Tweet',
            contexts: ['selection'],
            onclick: twitterOnClick
        });

        chrome.contextMenus.create({
            title: 'Upload to Imgur',
            contexts: ['selection'],
            onclick: imgurOnClick
        });
    }else{
        // Show 'Log in to us Textshots' context menu in case user is not
        // authenticated
        chrome.contextMenus.removeAll();
        chrome.contextMenus.create({
            title: 'Log in to use Textshots',
            contexts: ['selection'],
            onclick: openOptionsPage
        });
    }
}

// initial state
chrome.storage.local.get('authenticated',function(items){
    switchMenus(items.authenticated);
});


// check changes of user auth status
chrome.storage.onChanged.addListener(function(changes) {
    switchMenus(changes.authenticated.newValue);
});


// track install/update and open options in new tab
chrome.runtime.onInstalled.addListener(function(details){
    if(details.reason == "install"){
        openOptionsPage();
    }else if(details.reason == "update"){
        chrome.storage.local.get('authenticated', function(items) {
            if(!items.authenticated){
                openOptionsPage();
            }
        });
    }
});
