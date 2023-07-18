let addToy = false;
const toyURL = "http://localhost:3000/toys"
const toyCollection = document.getElementById("toy-collection")

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  
  ///////fetch toy info from server///////
  fetch(toyURL)
  .then(response => {return response.json()})
  ///////iterates through toy array and returns each toy///////
  .then(object => {for (toy of object){
    renderNewToy(toy)
  }})
});

const updateToyLikes = (toy, newToyLikes) => {
  const patchRequest = {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify({
      likes: toy.likes
    })
  }
  fetch(toyURL + '/' + toy.id, patchRequest)
  .then(response => {return response.json()})
  .then(object => {newToyLikes.innerText = object.likes + " likes"})
}
const renderNewToy = (toy) => {
    ///////creates new card for each toy///////
    const newToyCard = document.createElement("div")
    newToyCard.classList.add("card")
    const newToyHeader = document.createElement("h2")
    newToyHeader.innerText = toy.name
    const newToyImage = document.createElement("img")
    newToyImage.src = toy.image
    newToyImage.classList.add("toy-avatar")
    const newToyLikes = document.createElement("p")
    newToyLikes.innerText = toy.likes + " likes"
    const newToyButton = document.createElement("button")
    newToyButton.classList.add("like-btn")
    newToyButton.setAttribute("id", toy.id)
    newToyButton.innerText = "Like ❤️"
    newToyButton.onclick = () => {
      toy.likes += 1
      updateToyLikes(toy, newToyLikes)
      //console.log(toy.likes)
    }
    ///////appends each item to the toy card///////
    newToyCard.appendChild(newToyHeader)
    newToyCard.appendChild(newToyImage)
    newToyCard.appendChild(newToyLikes)
    newToyCard.appendChild(newToyButton)
    //console.log(newToyCard)
    toyCollection.appendChild(newToyCard)
  }

  const newToyForm = document.getElementById("new-toy-form")
  
  newToyForm.onsubmit = (e) => {
    e.preventDefault()
    const toyNameInput = document.getElementById("new-toy-name")
    const toyImageInput = document.getElementById("new-toy-image")
    const postData = {
      name: toyNameInput.value,
      image: toyImageInput.value,
      likes: 0
    }
    //console.log(postData)
    const configObject = {
    method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify(postData),
  }
  fetch(toyURL, configObject)
  .then(response => {return response.json()})
  .then(object => {renderNewToy(object)})


//////////update toy likes///////////

} 