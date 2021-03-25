import React, { useState, useContext, useEffect, useRef } from "react"
import { Link, useHistory } from 'react-router-dom'
import moment from 'moment';
// vimport { orderContext } from "../orders/orderProvider"
// import { TagContext } from "../ingredients/TagProvider"
import { AuthContext } from '../auth/AuthProvider'
import { OrderContext } from './OrderProvider'
import "./Orders.css"

export const OrderTable = () => {
    const { getOrders, getChefOrderByCurrentUserId, orders, searchTerms, releaseOrder, partialyUpdateorder } = useContext(OrderContext)
    // const { tags, searchTags } = useContext(TagContext)
    const { isAdmin } = useContext(AuthContext)
    const history = useHistory();
    const deleteOrderModal = useRef();

    const [userId, setUserId] = useState(-1)
    const [zipCode, setZipCode] = useState('')
    const [filteredOrders, setFiltered] = useState([])
    const [orderToBeDeleted, setOrderToBeDeleted] = useState(0)

    const getUserId = () => {
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
                setUserId(res.user_id)
                setZipCode(res.zipcode)
            })
    }

    // const getUserZip = () => {
    //     const body = { "token": `${localStorage.getItem("my_neighbors_user_id")}` }
    //     return fetch("http://localhost:8000/get_current_user_zipcode", {
    //         method: "POST",
    //         headers: {
    //             "Authorization": `Token ${localStorage.getItem("my_neighbors_user_id")}`
    //         },
    //         body: JSON.stringify(body)
    //     })
    //         .then(res => res.json())
    //         .then(res => setZipCode(res.zipcode))
    // }

    // Initialization effect hook -> Go get orders data
    useEffect(() => {
        // getUserZip()
        isAdmin ?
        getChefOrderByCurrentUserId() : getOrders()
        // getUserId()

       
    }, [])

    useEffect(() => {
        orders.sort((a, b) => (a.reserved_date > b.reserved_date) ? -1 : 1)
        const matchingOrders = orders.filter(order => order.menu_order["name"].toLowerCase().includes(searchTerms.toLowerCase()))
        let validOrders = []
        isAdmin ? 
        (validOrders = matchingOrders.filter((order) => (Date.parse(order.reserved_date) < Date.now()))) :
        (validOrders = matchingOrders.filter((order) => (Date.parse(order.reserved_date) < Date.now())))
        // (validorders = matchingorders.filter((order) => (Date.parse(order.reserved_date) < Date.now()))) :
        // (validorders = matchingorders.filter((order) => (Date.parse(order.reserved_date) < Date.now()) && (order.status === true)))      
        setFiltered(validOrders)
    }, [searchTerms])

    // useEffect(() => {
    //     orders.sort((a, b) => (a.reserved_date > b.reserved_date) ? -1 : 1)
    //     const matchingTags = tags.filter(tag => tag.label.includes(searchTags))
    //     let valid
    // })

    useEffect(() => {
        if (orders) {
          orders.sort((a, b) => (a.reserved_date > b.reserved_date) ? -1 : 1)
          let validOrders = []
          isAdmin ?
          (validOrders = orders.filter((order) => (Date.parse(order.reserved_date) < Date.now()))) :
          (validOrders = orders.filter((order) => (Date.parse(order.reserved_date) < Date.now())))
          setFiltered(validOrders)          
        }
    }, [orders])

    const handleIsApprovedUpdate = e => {
        const orderId = parseInt(e.target.value)
        const partialObject = {"approved" : e.target.checked }    
        partialyUpdateorder(orderId, partialObject)        
    }

    return (
        <div>
            <dialog className="dialog dialog--deletePost" ref={deleteOrderModal}>
                <h4>Are you sure you want to delete this order?</h4>
                <div className="d-flex flex-row justify-content-around align-items-center w-100">
                    <button className="deletePost btn btn-outline-primary" onClick={() => {
                        releaseOrder(orderToBeDeleted)
                            .then(history.push("/orders"))
                            .then(deleteOrderModal.current.close())
                    }}>Ok</button>
                    <button className="btn btn-outline-primary" onClick={e => deleteOrderModal.current.close()}>Cancel</button>
                </div>
            </dialog>
            {
                isAdmin?
                <div className="d-flex flex-row justify-content-end">
                    <button className="d-flex flex-row justify-content-center align-items-center post__add btn btn-primary mr-5"
                        onClick={() => history.push("/orders/create")}
                    >
                        Add {zipCode}order
                        <i className="fas fa-plus ml-4 mr-2"></i>
                    </button>
                </div>
                :(<></>)         
            }

            <div className="posts post__table mt-5 mx-3 px-3">
                <table className="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">order</th>
                            <th scope="col">Name</th>
                            <th scope="col">Ready Eat</th>
                            <th scope="col">Ingredients</th>
                            <th scope="col">Price</th>
                            <th scope="col">Delivery</th>
                            <th scope="col">Pick Up</th>
                            <th scope="col">Dine In</th>
                            <th scope="col">Chef</th>
                            <th scope="col">QTY Available</th>
                            <th scope="col">Category</th>
                            {isAdmin ? (<th scope="col">Status</th>) : (<></>) }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filteredOrders.map(order => (
                                <tr key={order.id}>
                                    {((order.my_neighbor_user && order.my_neighbor_user.id) === userId) || (isAdmin) ? (
                                        <td className="p-0">
                                            <div className="d-flex flex-row justify-content-around h-100 align-items-center">
                                                <Link to={`orders/edit/${order.id}`} ><i className="fas fa-cog"></i></Link>
                                                <i className="far fa-trash-alt text-danger post__hover__delete"
                                                    onClick={() => {
                                                        setOrderToBeDeleted(order.id)
                                                        deleteOrderModal.current.showModal()
                                                    }}
                                                ></i>
                                            </div>
                                        </td>) : <td></td>}
                                    <td><Link to={`/orders/${order.id}`}><img className="mb-5 img-fluid w-100" src={order.foodImgUrl} /></Link></td>    
                                    <td><Link to={`/orders/${order.id}`}>{order.status}</Link></td>
                                    <td>{moment(order.reserved_date).format('hh mm A')}</td>
                                    <td>{order.ingredients && order.ingredients.map(tag => (
                                        <div key={tag.id}>{tag.label}</div>
                                    ))}</td>
                                    <td>${order.price}.00</td>
                                    <td><input type="checkbox" name="isDelivery" checked={order.confirmed} value={order.id} />{order.confirmed}</td>
                                    <td><input type="checkbox" name="isPick_up" checked={order.pick_up} value={order.id} />{order.pick_up}</td>
                                    <td><input type="checkbox" name="isDine_in" checked={order.dine_in} value={order.id} /> {order.dine_in}</td>
                                    <td>{order.my_neighbor_user && order.my_neighbor_user.user.first_name} {order.my_neighbor_user && order.my_neighbor_user.user.last_name}</td>
                                    <td>{order.how_many_left}</td>
                                    <td>{order.category && order.category.label}</td>

                                    {isAdmin ? (<td>
                                        <input type="checkbox" name="isApproved" checked={order.status} value={order.id} onChange={handleIsApprovedUpdate} />
                                        </td>) : (<></>) }
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
