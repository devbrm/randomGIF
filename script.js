
function fetchItems(gifyURL) {
  input.classList.add("bg")
  let imagesURL = []

  fetch(gifyURL)
  .then(blob => blob.json() )
  .then(data => {
    data.data.forEach( (x) => {
      imagesURL.push(x.images.original.url)
    } )
    createImages(imagesURL)
  })
  .then(() => input.classList.remove("bg"))
  .catch( err => console.log(err))
}

function createImages(urls) {
  imageContainer.innerHTML = ``
  urls.forEach( url => {
    const image = document.createElement("img")
    const div = document.createElement("div")
    image.src = url
    div.appendChild(image)
    imageContainer.appendChild(div)
  } )
  return
}

function setURL() {
  
  let regex = new RegExp(/[^_\W]+/ig)
  let word = input.value.match(regex)[0]
  input.value = word
  let url = `https://api.giphy.com/v1/gifs/search?api_key=2gfW31dhsPscd6K1Ny1w5c6KLOxOSRvP&q=${word}&limit=${range.valueAsNumber}&offset=0&rating=g&lang=en`
  fetchItems(url)

}

function changeRange() {
  rangeDisplay.textContent = range.valueAsNumber
}

function debounce(func, time) {
  let t;
  return function() {
    if(t) clearTimeout(t)
    t = setTimeout( () => {
      func()
    }, time )
  }
}

const imageContainer = document.querySelector(".imagesContainer")
const input = document.querySelector(`.inputContainer [type="text"]`)
const range = document.querySelector(`.inputContainer [type="range"]`)
const rangeDisplay = document.querySelector(".inputContainer .count")
let fetchedURL = ""


input.addEventListener( "input", debounce(setURL, 500) )
range.addEventListener("input", changeRange)
