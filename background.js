//Triggers when page is loaded
chrome.webNavigation.onCommitted.addListener(function (tab) {

    // Prevents script from running when other frames load
    if (tab.frameId == 0) {
        chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {

            let url = tabs[0].url;

            // Remove protocol definitions & subdomain from URL
            let parsedUrl = url.replace("https://", "")
                .replace("http://", "")
                .replace("www.", "")

            // Remove path and queries, leaving base domain
            let domain = parsedUrl.slice(0, parsedUrl.indexOf('/') == -1 ? parsedUrl.length : parsedUrl.indexOf('/'))
                .slice(0, parsedUrl.indexOf('?') == -1 ? parsedUrl.length : parsedUrl.indexOf('?'));

            try {
                if (domain.length < 1 || domain === null || domain === undefined) {
                    return;
                } else if (domain == "linkedin.com") {
                    runLinkedinScript();
                    return;
                }
            } catch (err) {
                throw err;
            }

        });
    }
});

function runLinkedinScript() {
    // Run script from file into webpage
    chrome.tabs.executeScript({
        file: 'linkedin.js'
    });
    return true;
}