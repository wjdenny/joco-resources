document.addEventListener('DOMContentLoaded', function () {

    // Get the search terms from the URL
    const params = (new URLSearchParams(window.location.search)).get("search")
    const cards = [...document.querySelectorAll("#resource-cards .resource-card")]

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
        // search the index, and
        const matches = idx.search(params)
        .map(({ ref, score }) => { 
            const card = cards.find(el => el.dataset.key === ref);
            card.dataset.score = score
            return card
        })
        .sort(card => -card.dataset.score)

        const results = document.querySelector("#results");
        matches.forEach(card => results.appendChild(card))

        // set the search input to the terms
        const input = document.querySelector("form[role='search'] input[type='search']");
        input.value = params;
        input.focus();
        input.select();
    }

    // If there are no search terms, display everything.
    else {
        window.location.href = "/?search=*"
    }

});