function removeAds() {

    // Get all 'span' elements on the page
    let spans = document.getElementsByTagName("span");

    for (let i = 0; i < spans.length; ++i) {

        // Check if they contain the text 'Promoted' ; 'Promoted'used by LinkedIn to indicate ads
        if (spans[i].innerHTML === "Promoted") {

            // Get the div that wraps around the ad
            let card = spans[i].closest(".feed-shared-update-v2");

            // In the event of class change, get the 6th parent instead
            if (card === null) {

                let j = 0;
                card = spans[i];
                while (j < 6) {
                    card = card.parentNode;
                    ++j;
                }
            }

            // Make ad disappear
            card.setAttribute("style", "display: none !important;");
        }
    }
}

removeAds();

// Remove ad as user scrolls
setInterval(function () {
    removeAds();
}, 100)