const catalog = document.getElementById("catalog");
const catalogArray = document.getElementsByClassName("catalog-item");
const catalogItem = `<div class="catalog-item">catalog item</div>`
const block = `
<div class="block">
<div class="top">
<div class="left-side">
<p class="upper-text">negr</p>
<p class="lower-text">negr</p>
</div>
<img src="./images/favicon.ico" alt="no image">
</div>
<div class="pricing">
<div class="percent">-10%</div>
<div class="yellow">10000 sum</div>
<div class="white">
<div id="old-price">1000</div>
</div>
</div>
</div>
`
const blocks = document.getElementById("blocks");

fetch("https://api.makromarket.uz/api/category-list/")
.then(response => {
    if(!response.ok) {
        throw new Error("not ok");
    }
    return response.json();
})
.then(data => {
    console.log(data);
    catalog.innerHTML += catalogItem;
    catalog.children[0].innerText = "Все";
    for (let i = 0; i < data.length; i++) {
        catalog.innerHTML += catalogItem;
        catalog.children[i+1].innerText = data[i].title;
    }
    catalog.children[0].classList.add('active');
    
    for (const item of catalogArray) {
        repeatActive(catalogArray, item);
    }
    
    function repeatActive (array, item) {
        item.addEventListener('click', () => {
            for (let i = 0; i < array.length; i++) {
                array[i].classList.remove('active');
            }
            item.classList.add('active');
        })
    }
})

let id = "big-block"

fetch("https://api.makromarket.uz/api/product-list/?limit=20")
.then(response => {
    if(!response.ok) {
        throw new Error("not ok");
    }
    return response.json();
})
.then(data => {
    console.log(data)
    for(let i = 0; i < 7; i++) {
        blocks.innerHTML += block;
        blocks.children[i].firstElementChild.firstElementChild.firstElementChild.innerText = data[i].title
        blocks.children[i].firstElementChild.firstElementChild.children[1].innerText = `актуально до ${data[i].endDate}`
        
    }
    blocks.firstElementChild.id = "big-block"
})