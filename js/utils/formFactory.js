const labelFactory = (text, htmlFor) => {
  const label = document.createElement("label")
  label.innerText = text
  label.setAttribute("for", htmlFor)
  label.classList.add("form-label")
  return label
}

const inputFactory = (type, id, value) => {
  const input = document.createElement("input")
  input.setAttribute("type", type)
  input.setAttribute("id", id)
  input.setAttribute("value", value)
  input.classList.add("form-control", "mb-3")
  return input
}

export const formFactory = (user) => {
  const form = document.createElement("form")

  form.appendChild(labelFactory("Name", "userName"))
  form.appendChild(inputFactory("text", "userName", user.name))

  form.appendChild(labelFactory("Age", "userAge"))
  form.appendChild(inputFactory("number", "userAge", user.age))

  form.appendChild(labelFactory("Image", "userImage"))
  form.appendChild(inputFactory("text", "userImage", user.avatar_url))

  form.appendChild(labelFactory("Gender", "userGender"))
  form.appendChild(inputFactory("text", "userGender", user.gender))

  return form
}
