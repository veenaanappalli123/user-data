import { fetchData } from "./utils/fetchData.js"
import { putData } from "./utils/putData.js"
import { formFactory } from "./utils/formFactory.js"

const remoteUrl = "https://easy-simple-users-rest-api.onrender.com/api/users"
const usersContainer = document.getElementById("users-container")
const modalBody = document.querySelector(".modal-body")
const submitBtn = document.querySelector(".submit-btn")

let currentUser = null

const displayUsers = (users) => {
  usersContainer.innerHTML = ""

  users.forEach((user) => {
    const card = document.createElement("div")
    card.className = "user-card"

    card.innerHTML = `
      <img src="${user.avatar_url}" alt="${user.name}" />
      <div class="user-info">
        <p><strong>Name:</strong> ${user.name}</p>
        <p><strong>Age:</strong> ${user.age}</p>
        <p><strong>Gender:</strong> ${user.gender}</p>
      </div>
      <button class="btn btn-sm btn-primary edit-btn" data-id="${user.id}" data-bs-toggle="modal" data-bs-target="#exampleModal">Edit</button>
    `

    usersContainer.appendChild(card)
  })
}

const addEventListeners = () => {
  const editButtons = document.querySelectorAll(".edit-btn")

  editButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      const userId = button.getAttribute("data-id")
      const users = await fetchData(remoteUrl)
      currentUser = users.find((u) => u.id === userId)

      const form = formFactory(currentUser)
      modalBody.innerHTML = ""
      modalBody.appendChild(form)
    })
  })
}

submitBtn.addEventListener("click", async () => {
  const updatedUser = {
    id: currentUser.id,
    name: document.getElementById("userName").value,
    age: document.getElementById("userAge").value,
    avatar_url: document.getElementById("userImage").value,
    gender: document.getElementById("userGender").value,
  }

  modalBody.innerHTML = `
    <div class="d-flex justify-content-center align-items-center modal-spinner">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  `

  try {
    const response = await putData(remoteUrl, updatedUser)

    if (response) {
      modalBody.innerHTML = `
        <div class="d-flex justify-content-center align-items-center">
          <div class="text-center">
            <div class="fw-bold">${response.message}</div>
          </div>
        </div>
      `
      updateCard(updatedUser)
      addEventListeners()
    }
  } catch (error) {
    modalBody.innerHTML = `
      <div class="alert alert-danger" role="alert">
        Failed to update user. Please try again.
      </div>
    `
  }
})

const updateCard = (user) => {
  const cards = document.querySelectorAll(".user-card")

  cards.forEach((card) => {
    const button = card.querySelector(".edit-btn")
    if (button.getAttribute("data-id") === user.id) {
      card.querySelector("img").src = user.avatar_url
      card.querySelector(".user-info").innerHTML = `
        <p><strong>Name:</strong> ${user.name}</p>
        <p><strong>Age:</strong> ${user.age}</p>
        <p><strong>Gender:</strong> ${user.gender}</p>
      `
    }
  })
}
///////API CALL, 

const loadData = async () => {
  const users = await fetchData(remoteUrl)
  if (!users || !Array.isArray(users)) {
    console.error("No users returned from API")
    return
  }
  displayUsers(users)
  addEventListeners()
}

// Note: API may be asleep due to Render free-tier hosting.
// If no data appears, wait 30–60 seconds and refresh.
// it workes with mock dataaa thoughh ><

loadData()
