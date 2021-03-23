import React, { useState } from "react"

export const TagContext = React.createContext()

export const TagProvider = (props) => {
  const [tags, setTags] = useState([])
  const [postTags, setPostTags] = useState([])
  const [searchTags, setSearchTags] = useState("")

  const getTags = () => {
    return fetch("http://localhost:8000/ingredients", {
      headers: {
          "Authorization": `Token ${localStorage.getItem("my_neighbors_user_id")}`
      }
  })
      .then(res => res.json())
      .then(setTags)
  }

  const createTag = tag => {
    return fetch("http://localhost:8000/ingredients", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${localStorage.getItem("my_neighbors_user_id")}`
      },
      body: JSON.stringify(tag)
    })
      .then(getTags)
  }

  const createPostTag = posttag => {
    return fetch("http://localhost:8000/menuingredients", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(posttag)
    })
      .then()
  }

  const updateTag = tag => {
    return fetch(`http://localhost:8000/ingredients/${tag.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${localStorage.getItem("my_neighbors_user_id")}`
      },
      body: JSON.stringify(tag)
    })
      .then(getTags)
  }

  const deleteTag = id => {
    return fetch(`http://localhost:8000/ingredients/${id}`, {
      method: "DELETE",
      headers: {
      "Authorization": `Token ${localStorage.getItem("my_neighbors_user_id")}`
      }
    })
      .then(getTags)
  }

  const deletePostTag = (id, postId) => {
    return fetch(`http://localhost:8000/menuingredients/${id}`, {
      method: "DELETE",
    })
      .then()
  }

  return (
    <TagContext.Provider value={{
      tags, postTags, setPostTags, getTags, createTag, deleteTag, updateTag, deletePostTag,
      createPostTag, searchTags, setSearchTags
    }}>
      {props.children}
    </TagContext.Provider>
  )


}
