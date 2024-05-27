const block = `
<div class="block">
    <div class="top">
        <div class="left-side">
            <p class="upper-text">negr</p>
            <p class="lower-text">negr</p>
        </div>
        <div class="bottom">
            <img src="./images/favicon.ico" alt="no image" class="images">
            <div class="pricing">
                <div class="percent">-10%</div>
                <div class="yellow">10000 sum</div>
                <div class="white">
                    <div class="old-price">1000</div>
                </div>
            </div>
        </div>
    </div>
</div>
`
const bigBlock = `
<div class="block" id="big-block">
    <div class="top">
        <div class="left-side">
            <p class="upper-text">negr</p>
            <p class="lower-text">negr</p>
        </div>
        <img src="./images/favicon.ico" alt="no image">
    </div>
    <br>
    <div class="pricing" id="pricing-big">
        <div class="percent">-10%</div>
        <div class="yellow">10000 sum</div>
        <div class="white">
            <div id="old-price">1000</div>
        </div>
    </div>
</div>
`
const blocks = document.getElementById("blocks");
const catalog = document.getElementById("catalog");
const catalogArray = document.getElementsByClassName("catalog-item");
const catalogItem = `<div class="catalog-item">catalog item</div>`
const pageItem = `<li class="page active">1</li>`;
let n = 18
const next = document.getElementById('next')
const previous = document.getElementById('previous')

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

async function catalogFetch(parameter) {
    fetch(`https://api.makromarket.uz/api/${parameter}`)
    .then(response => {
        if(!response.ok) {
            throw new Error("not ok");
        }
        return response.json();
    })
    .then(data => {
        blocks.innerHTML = ""
        console.log(data)
        blocks.innerHTML += bigBlock;
        blocks.children[0].children[0].children[0].children[0].innerText = data[n-18].title
        blocks.children[0].children[0].children[0].children[1].innerText = `актуально до ${data[n-18].endDate}`
        blocks.children[0].children[0].lastElementChild.src = data[n-18].photo_medium
        // blocks.children[0].children[0].children[1].innerText = `актуально до ${data[i].endDate}`
        let a = 0
        for(let i = n - 18; i < n; i++) {
            if(i > data.length) {
                break;
            }
            blocks.innerHTML += block;
            blocks.children[a+1].firstElementChild.firstElementChild.firstElementChild.innerText = data[i+1].title
            blocks.children[a+1].firstElementChild.firstElementChild.children[1].innerText = `актуально до ${data[i+1].endDate}`
            blocks.children[a+1].children[0].children[1].children[0].src = data[i+1].photo_medium
            a++
        }
    })
}

next.onclick = () => {
    fetch('https://api.makromarket.uz/api/product-list/')
    .then(response => response.json())
    .then(data => {
        n+=18
        if (n < data.length) {
            catalogFetch("product-list/")
        } else if (n = data.length -1 ) {
            n += 1
        } else if (n > data.length) {
            n = n - (n - data.length) - 1
            catalogFetch("product-list/")

        }
        console.log(n)
    })
}
previous.onclick = () => {
    if (n > 18) {
        n-=18
        catalogFetch("product-list/")
    }
}


catalogFetch("product-list/");
