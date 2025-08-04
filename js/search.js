document.addEventListener('DOMContentLoaded', function () {

    // Get the search terms from the URL
    const params = (new URLSearchParams(window.location.search)).get("search")
    const cards = [...document.querySelectorAll(".resource-card")]

    // Build an index to search
    const data = cards.map(e => e.dataset)

    const idx = lunr(function () {
        this.ref('key');
        this.field('title');
        this.field('note');
        this.field('tags');

        this.k1(1.2);
        this.b(0);

        data.forEach(function (resource) { this.add(resource) }, this)
    })

    // If there are search terms, 
    if (params) {
        // get the terms from the window location
        const matches = idx.search(params).map(({ ref }) => ref)

        // go through each resource card
        cards.forEach(card => {
            // remove any existing search-match class
            card.classList.remove("search-match");

            // add the search-match class if it has one of the matching keys
            if (matches.includes(card.dataset.key)) {
                card.classList.add("search-match")
            }
        })

        // set the search input to the terms
        const input = document.querySelector("form[role='search'] input[type='search']");
        input.value = params;
        input.focus();
        input.select();
    }

    // If there are no search terms, display everything.
    else {
        cards.forEach(e => e.classList.remove("search-hidden"))
    }

});