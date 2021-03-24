import React, { useState } from "react"

export const CategoryContext = React.createContext()

export const CategoryProvider = (props) => {
  const [categories, setCategories] = useState([])

  const getCategories = () => {
    return fetch('http://localhost:8000/categories', {
      headers: {
        "Authorization": `Token ${localStorage.getItem("my_neighbors_user_id")}`
      }
    })
      .then(res => res.json())
      .then(setCategories)
  }

  const getPostByCategoryId = (categoryId) => {
    return fetch(`http://localhost:8000/posts?category=${categoryId}`, {
      headers: {
        "Authorization": `Token ${localStorage.getItem("my_neighbors_user_id")}`
      }
    })
      .then(res => res.json())
  }

  const createCategory = category => {
    return fetch('http://localhost:8000/categories', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Token ${localStorage.getItem("my_neighbors_user_id")}`
      },
      body: JSON.stringify(category)
    })
      .then(getCategories)
  }

  const updateCategory = category => {
    return fetch(`http://localhost:8000/categories/${category.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Token ${localStorage.getItem("my_neighbors_user_id")}`
      },
      body: JSON.stringify(category)
    })
      .then(getCategories)
  }

  const deleteCategory = id => {
    return fetch(`http://localhost:8000/categories/${id}`, {
      method: 'DELETE',
      headers: {
        "Authorization": `Token ${localStorage.getItem("my_neighbors_user_id")}`
      }
    })
      .then(getCategories)
  }

  return (
    <CategoryContext.Provider value={{
      categories, getCategories, createCategory, updateCategory, deleteCategory,
      getPostByCategoryId
    }}>
      {props.children}
    </CategoryContext.Provider>
  )
}
