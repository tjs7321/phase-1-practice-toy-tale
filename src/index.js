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

  ///////create newToyCard///////
  // const newToyCard = document.createElement("div")
  // newToyCard.class = "card"
  // const newToyHeader = document.createElement("h2")
  // newToyHeader.innerText = "toyName"
  // const newToyImage = document.createElement("img")
  // newToyImage.src = "https://www.cnet.com/a/img/resize/0165e20206047e2ebe322821b4fea5fdff7f3061/hub/2014/12/01/89601d70-ca65-4dc7-adfe-f6dbd46d05ba/hobbit-lotr-5-armies-gandalf-hat.jpg?auto=webp&fit=crop&height=675&width=1200"
  // newToyImage.class = "toy-avatar"
  // const newToyLikes = document.createElement("p")
  // newToyLikes.innerText = "Likes"
  // const newToyButton = document.createElement("button")
  // newToyButton.class = "like-btn"
  // newToyButton.id = "[toy_id]"
  // newToyButton.innerText = "Like ❤️"
  ///////append elements of newToyCard to div///////

  // newToyCard.appendChild(newToyHeader)
  // newToyCard.appendChild(newToyImage)
  // newToyCard.appendChild(newToyLikes)
  // newToyCard.appendChild(newToyButton)

  //console.log(newToyCard)

  ///////fetch toy info from server///////
  fetch(toyURL)
    .then(response => {return response.json()})
    .then(object => {for (toy of object){
      //console.log(toy)
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
      newToyButton.id = "[toy_id]"
      newToyButton.innerText = "Like ❤️"
      newToyCard.appendChild(newToyHeader)
      newToyCard.appendChild(newToyImage)
      newToyCard.appendChild(newToyLikes)
      newToyCard.appendChild(newToyButton)
      console.log(newToyCard)
      toyCollection.appendChild(newToyCard)
    }})
});