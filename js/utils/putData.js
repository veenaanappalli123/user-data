export const putData = async (url, data) => {
  try {
    const response = await fetch(`${url}/${data.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    const result = await response.json()
    return result
  } catch (error) {
    console.error("Error updating user:", error)
    throw error
  }
}
