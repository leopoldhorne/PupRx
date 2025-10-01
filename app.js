// https://dog.ceo/dog-api/breeds-list

// https://dog.ceo/api/breed/{insert breed here}/images/

//https://dog.ceo/api/breed/hound/images


const forms = document.querySelectorAll("form")

forms.forEach((form) => {
    form.addEventListener("submit", function(e){
        e.preventDefault()
        console.log("PREVENTED")
    })
})

let canMove = true;

const header = document.querySelector("header");
const body = document.querySelector("body")
const mainSearchInput = document.querySelector("#header-search") 


const navSearch = document.querySelector(".nav__search")
const navSearchInput = document.querySelector("#nav-search")
function toggleSearch() {
    navSearch.classList.toggle("open")
    navSearchInput.disabled = false

    if (navSearch.classList.contains("open")) {
        navSearchInput.placeholder = "Search here"
    }
    else {
        navSearchInput.placeholder = ""
    }
}


function moveHeader() {
    if (canMove === true) {
        header.style = "height: 500px !important;"
        setTimeout(() => {
            body.style = "overflow: auto;"
        }, 2000)
        canMove = false
    }
}

async function renderImages() {
    let searchResults = document.querySelector(".search__results")
    searchResults.innerHTML = `<i class="fa-solid fa-paw spinner"></i>`
    let mainPara = document.querySelector("#showing")
    try {

    
    let renderSearchInput = ""
    
    if (!!mainSearchInput.value && navSearchInput.value === "") {
        renderSearchInput = mainSearchInput
    } else if (!!navSearchInput.value && mainSearchInput.value === "") {
        renderSearchInput = navSearchInput
    }
    else {
        mainSearchInput.value = ""
        navSearchInput.value = ""
        throw new Error()
    }

    const names = ["Buddy", "Luna", "Charlie", "Daisy", "Max", "Bella", "Rocky", "Milo", "Coco", "Zoe"]
    const locations = ["New York", "London", "Tokyo", "Paris", "Los Angeles", "Chicago", "Toronto", "Dubai", "Shanghai", "Sydney"]
    const prices = [15, 25, 40, 50, 60, 75, 90, 100, 120, 150]


    let searchValue = renderSearchInput.value.trim().toLowerCase().replace(" ", "-")
    let response = await fetch(`https://dog.ceo/api/breed/${searchValue}/images`)
    let json = await response.json()
    let images = await json.message
    
    

    let imagesHTML = images.slice(0, 6).map((image) => {
        return `<div class="result">
                <div class="result__image__wrapper">
                    <img src="${image}" alt="" class="result__image"/>
                    <div class="result__image__info">
                        <span class="result__image__name"><i class="fa-solid fa-signature"></i> ${names[Math.floor(Math.random()*10)]}</span>
                        <span class="result__image__location"><i class="fa-solid fa-location-dot"></i> ${locations[Math.floor(Math.random()*10)]}</span>
                    </div>
                </div>
              <span class="result__price">Price: $${prices[Math.floor(Math.random()*10)]}</span>
              <button class="result__buy">Buy Now</button>
            </div>`
    }).join("");

    searchResults.innerHTML = imagesHTML
    mainPara.innerHTML = renderSearchInput.value
    }
    catch {
        mainPara.innerHTML = "Error"
        searchResults.innerHTML = `            <div class="error">
                <p class="error__title"><i class="fa-solid fa-xmark"></i>ERROR<i class="fa-solid fa-xmark"></i></p>
                <p class="error__para"><b>Okay so we have a couple of possible reasons:</b> <br/><br/>1. The spelling may be wrong (forgive us), <br/>2. we don't have that breed yet (come back some time in the future), <br/>3. or you tried to search in both search bars at the same time (please forgive us again, our engineer is still learning).<br/><br/><b><b>Regardless please try again!</b> and see some of our favorites below:<br/><br/>Maltese, Akita, Blorzoi, Terrier</p>
            </div>`
        
    }

}





//            `<div class="result">
//                <div class="result__image__wrapper">
//                    <img src="assets/testing.jpg" alt="" class="result__image"/>
//                    <div class="result__image__info">
//                        <span class="result__image__name">Name: Cindy</span>
//                        <span class="result__image__location">From: New York</span>
//                   </div>
//                </div>
//              <span class="result__price">Price: $5</span>
//              <button class="result__buy">Buy Now</button>
//            </div>`