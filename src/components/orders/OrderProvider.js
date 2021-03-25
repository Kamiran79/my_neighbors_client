import React, { useState } from "react"

export const OrderContext = React.createContext()

export const OrderProvider = (props) => {
    const [orders, setOrders] = useState([])
    const [searchTerms, setTerms] = useState("")


    const getOrders = () => {
        return fetch(`http://localhost:8000/orders`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("my_neighbors_user_id")}`            }
        })
            .then(res => res.json())
            .then(setOrders)
    }

    // const getordersZipCode = (zipCode) => {
    //     return fetch(`http://localhost:8000/orders?zipCode=${parseInt(zipCode)}`, {
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Authorization": `Token ${localStorage.getItem("my_neighbors_user_id")}`            }
    //     })
    //         .then(res => res.json())
    //         .then(setorders)
    // }

    const getChefOrderByCurrentUserId = () => {
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
                fetch(`http://localhost:8000/orders?chef_order=${res.user_id}`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Token ${localStorage.getItem("my_neighbors_user_id")}`
                    }
                })
                    .then(res => res.json())
                    .then(res => setOrders(res))
            })
    }

    // const getordersByUserId = (userId) => {
    //     return fetch(`http://localhost:8000/users/${userId}`, {
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Authorization": `Token ${localStorage.getItem("my_neighbors_user_id")}`
    //         }
    //     })
    //         .then(res => res.json())
    //         .then(res => setorders(res.orders))
    // }

    // const getPostById = (id) => {
    //     return fetch(`http://localhost:8088/posts/${id}?_expand=location&_expand=customer`)
    //         .then(res => res.json())
    // }

    const getOrderById = (id) => {
        return fetch(`http://localhost:8000/orders/${id}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("my_neighbors_user_id")}`
            }
        })
            .then(res => res.json())
    }

    const addOrder = order => {
        return fetch("http://localhost:8000/orders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("my_neighbors_user_id")}`
            },
            body: JSON.stringify(order)
        })
            .then(res => res.json())
    }

    const updateOrder = order => {
        return fetch(`http://localhost:8000/orders/${order.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("my_neighbors_user_id")}`
            },
            body: JSON.stringify(order)
        })
            .then(getOrders)
    }

    const releaseOrder = (orderId) => {
        return fetch(`http://localhost:8000/orders/${orderId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Token ${localStorage.getItem("my_neighbors_user_id")}`
            },
        })
            .then(getOrders)
    }

    // const partialyUpdateorder = (orderId, partialBody) => {
    //     return fetch(`http://localhost:8000/orders/${orderId}`, {
    //         method: "PATCH",
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Authorization": `Token ${localStorage.getItem("my_neighbors_user_id")}`
    //         },
    //         body: JSON.stringify(partialBody)
    //     })
    //         .then(getorders)
    // }

    return (
        <OrderContext.Provider value={{
            orders, addOrder, getOrders, getOrderById,
            searchTerms, setTerms, releaseOrder, updateOrder,
            getChefOrderByCurrentUserId
        }}>
            {props.children}
        </OrderContext.Provider>
    )
}
