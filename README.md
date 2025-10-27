# user-data
#  User Data App

This is a responsive, modular web application that displays user profiles, allows editing via a Bootstrap modal, and updates data using a REST API. It was built as part of a course assignment and follows best practices in structure, styling, and error handling.

---

## Folder Structure

---

## Features

- Displays user cards with name, age, gender, and avatar
- Edit functionality via Bootstrap modal
- Live updates to user cards after editing
- Loading spinner during async operations
- Success alert after saving changes
- Responsive design for mobile and desktop
- Error handling for failed API calls
- Modular code with reusable utility functions
- No page refreshes during user edits

---

##  API Integration

The app is designed to fetch and update user data from:
https://easy-simple-users-rest-api.onrender.com/api/users




However, this API is hosted on Render's free tier, which may go to sleep after periods of inactivity. If the API is unavailable, the app will not display live data.


if you have the authority to the data , use it for data .
the api is protected and requires a token in this case,
just add the token in the script file before running the page in browser
    like this
    
'''javascript 
const response = await fetch(url, {
  headers: {
    "Authorization": "Bearer YOUR_TOKEN_HERE"
  }
})

---

##  Mock Data Mode

To ensure functionality during API downtime, the app includes a mock data fallback. This allows the interface and editing features to be tested even when the server is asleep.

To switch to mock data, replace the `loadData()` function in `script.js` with:

```javascript
const loadData = async () => {
  const users = [
    {
      id: "1",
      name: "John Doe",
      age: 30,
      gender: "male",
      avatar_url: "https://i.pravatar.cc/300?img=1"
    },
    {
      id: "2",
      name: "Jane Smith",
      age: 25,
      gender: "female",
      avatar_url: "https://i.pravatar.cc/300?img=2"
    },
    {
      id: "3",
      name: "Bob Johnson",
      age: 35,
      gender: "male",
      avatar_url: "https://i.pravatar.cc/300?img=3"
    }
  ]
  displayUsers(users)
  addEventListeners()
}
