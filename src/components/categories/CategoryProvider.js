import React, { useState } from "react"

export const CategoryContext = React.createContext()


export const CategoryProvider = (props) => {
    const [categories, setCategories] = useState([])

    const getCategories = () => {
        return fetch("http://localhost:8000/categories", {
            headers:{
                "Authorization": `Token ${localStorage.getItem("my_neighbors_user_id")}`
            }            
        })
            .then(res => res.json())
            .then(setCategories)
    }

    const getCategoryById = (id) => new Promise((resolve, reject) => {
        fetch(`http://localhost:8000/categories/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("my_neighbors_user_id")}`
            }
        })
        .then((response) => resolve(response.json()))
        .catch((err) => reject(err));
      });

    const addCategory = newCategory => {
        return fetch("http://localhost:8000/categories", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("rare_token")}`
            },
            body: JSON.stringify(newCategory)
        })
            .then(getCategories)
    }

    const deleteCategory = (categoryId) => {
        return fetch(`http://localhost:8000/categories/${categoryId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("rare_token")}`
            }            
        })
            .then(getCategories)
    }

    const updateCategory = (categoryId, newCategory) => new Promise((resolve, reject) => {
        fetch(`http://localhost:8000/categories/${categoryId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("rare_token")}`
            },
            body: JSON.stringify(newCategory)
        })
        .then(() => resolve())
        .catch((err) => reject(err));   
    });

    return (
        <CategoryContext.Provider value={{
            categories, addCategory, getCategories, deleteCategory, getCategoryById, updateCategory
        }}>
            {props.children}
        </CategoryContext.Provider>
    )
}
