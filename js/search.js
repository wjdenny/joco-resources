const searchForm = document.querySelector("form[role='search']")

const resources = document.querySelectorAll("#resources article")
const data = [ ...resources ].map(e => ({
    key: e.dataset.key,
    title: e.querySelector("h5").dataset.resourceTitle
}))

const idx = lunr(function () {
    this.ref('key');
    this.field('title')

    data.forEach(function (resource) { this.add(resource) }, this)
})

searchForm.addEventListener("submit", e => { 
    const input = e.target.querySelector("input[type='search'");
    const cards = document.querySelectorAll(".resource-card");
    [...cards].forEach(card => card.classList.remove('search-match'));

    const result = idx.search(input.value);

    result.forEach(({ ref }) => {
        const card = document.querySelector(`article[data-key='${ref}']`);
        card.classList.add('search-match')
    })

    input.focus();
    input.select();
    
    e.preventDefault();
})