import React, { useState } from "react"

export const MenuContext = React.createContext()

export const MenuProvider = (props) => {
    const [menus, setMenus] = useState([])
    const [searchTerms, setTerms] = useState("")


    const getMenus = () => {
        return fetch(`http://localhost:8000/menus`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("my_neighbors_user_id")}`            }
        })
            .then(res => res.json())
            .then(setMenus)
    }

    const getMenusZipCode = (zipCode) => {
        return fetch(`http://localhost:8000/menus?zipCode=${parseInt(zipCode)}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("my_neighbors_user_id")}`            }
        })
            .then(res => res.json())
            .then(setMenus)
    }

    const getMenusByCurrentUserId = () => {
        const body = { "token": `${localStorage.getItem("my_neighbors_user_id")}` }
        return fetch("http://localhost:8000/get_current_user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("my_neighbors_user_id")}`
            },
            body: JSON.stringify(body)
        })
            .then(res => res.json())
            .then(res => {
                fetch(`http://localhost:8000/menus?user_id=${res.user_id}`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Token ${localStorage.getItem("my_neighbors_user_id")}`
                    }
                })
                    .then(res => res.json())
                    .then(res => setMenus(res.menus))
            })
    }

    const getMenusByUserId = (userId) => {
        return fetch(`http://localhost:8000/users/${userId}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("my_neighbors_user_id")}`
            }
        })
            .then(res => res.json())
            .then(res => setMenus(res.menus))
    }

    // const getPostById = (id) => {
    //     return fetch(`http://localhost:8088/posts/${id}?_expand=location&_expand=customer`)
    //         .then(res => res.json())
    // }

    const getMenuById = (id) => {
        return fetch(`http://localhost:8000/menus/${id}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("my_neighbors_user_id")}`
            }
        })
            .then(res => res.json())
    }

    const addMenu = menu => {
        return fetch("http://localhost:8000/menus", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("my_neighbors_user_id")}`
            },
            body: JSON.stringify(menu)
        })
            .then(res => res.json())
    }

    const updateMenu = menu => {
        return fetch(`http://localhost:8000/menus/${menu.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("my_neighbors_user_id")}`
            },
            body: JSON.stringify(menu)
        })
            .then(getMenus)
    }

    const releaseMenu = (menuId) => {
        return fetch(`http://localhost:8000/menus/${menuId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Token ${localStorage.getItem("my_neighbors_user_id")}`
            },
        })
            .then(getMenus)
    }

    const partialyUpdateMenu = (menuId, partialBody) => {
        return fetch(`http://localhost:8000/menus/${menuId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("my_neighbors_user_id")}`
            },
            body: JSON.stringify(partialBody)
        })
            .then(getMenus)
    }

    return (
        <MenuContext.Provider value={{
            menus, addMenu, getMenus, getMenuById, getMenusByUserId,
            searchTerms, setTerms, releaseMenu, updateMenu,
            getMenusByCurrentUserId, partialyUpdateMenu, getMenusZipCode
        }}>
            {props.children}
        </MenuContext.Provider>
    )
}
