const searchForm = document.querySelector("form[role='search']")

const resources = document.querySelectorAll("#resources article")
const data = [ ...resources ].map(e => e.dataset)

const idx = lunr(function () {
    this.ref('key');
    this.field('title');
    this.field('note');
    this.field('tags');

    this.k1(1.2);
    this.b(0);

    data.forEach(function (resource) { this.add(resource) }, this)
})

searchForm.addEventListener("submit", e => { 
    const input = e.target.querySelector("input[type='search'");
    const cards = document.querySelectorAll(".resource-card");
    [...cards].forEach(card => card.classList.remove('search-match'));

    const result = idx.search(input.value);

    console.log(result) 
    result.forEach(({ ref }) => {
        const card = document.querySelector(`article[data-key='${ref}']`);
        card.classList.add('search-match')
    })

    input.focus();
    input.select();

    e.preventDefault();
})