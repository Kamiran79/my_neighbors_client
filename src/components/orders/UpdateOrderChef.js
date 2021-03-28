import React, { useContext, useEffect, useState, useRef } from "react"
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
// import { Link } from "react-router-dom"
// import { MenuContext } from "../menus/MenuProvider.js"
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../auth/AuthProvider.js'
import { OrderContext } from './OrderProvider.js'
import moment from 'moment';


export const OrderUpdateChef = (props) => {
    // const reserved_date = useRef()
    // const how_many = useRef()
    // const delivery_date = useRef()
    const status = useRef()
    const total_cost = useRef()
    const order_type = useRef()
    const isConfirmed = useRef()
    const isDelivered_chef = useRef()
    const note = useRef()
    const isDelivered_user = useRef()

    // const { getMenuById, releaseMenu } = useContext(MenuContext)
    const { getOrderById, updateOrder } = useContext(OrderContext)
    const { isAdmin, getUserById } = useContext(AuthContext)
    const history = useHistory();
    // const [menu, setMenu] = useState([])
    // const [totalCost, setTotalCost] = useState('0')
    const [order, setOrder] = useState({})
    // const [chef, setChef] = useState({})
    // const delivery_date = new Date()
    
    useEffect(() => {
      const orderId = parseInt(props.match.params.orderId)
      getOrderById(orderId)
        .then(setOrder)
      // if (order.chef_order && order.chef_order.user) {
      //   getMenuById(order.chef_order.user)
      //   .then(setChef)
      // }
      
    }, [])

    const handleTimeUpdate = (date) => {
      // e.preventDefault()
      // const newEvent = {};
      // console.log(event.value)
      const newOrder = {
        id: order.id,
        url: order.url,
        reserved_date: order.reserved_date,
        note: order.note,
        user_order: order.user_order,
        menu_order: order.menu_order,
        chef_order: order.chef_order,
        delivery_date: date,
        total_cost: order.total_cost,
        status: order.status,
        order_type: order.order_type,
        how_many: order.how_many,
        isConfirmed: order.isConfirmed,
        isDelivered_user: order.isDelivered_user,
        isDelivered_chef: order.isDelivered_chef
      } 
      setOrder(newOrder)      
      // console.log(e.target.id)
      // setTotalCost(parseInt(how_many.current.value) * menu.price)
    };
    
    const handleTagUpdate = e => {
      // const updatedTagArray = []
      console.log('clicked handle checked')
      console.log(e.target.value)
      const newOrder = {
        id: order.id,
        url: order.url,
        reserved_date: order.reserved_date,
        note: order.note,
        user_order: order.user_order,
        menu_order: order.menu_order,
        chef_order: order.chef_order,
        delivery_date: e.target.value === "order--delivery_date"? e.target.value: order.delivery_date, //order--isDelivery_date
        total_cost: order.total_cost,
        status: order.status,
        order_type: order.order_type,
        how_many: order.how_many,
        isConfirmed: e.target.value === "order--isConfirmed"? e.target.checked: order.isConfirmed,
        isDelivered_user: order.isDelivered_user,
        isDelivered_chef: e.target.value === "order--isDelivered_chef"? e.target.checked: order.isDelivered_chef
      } 
      setOrder(newOrder)
    }    


    const handleRegister = (e) => {
        e.preventDefault()
        console.log(order.delivery_date)

            const submitOrder = {
               id: order.id,
                // "reserved_date": reserved_date.current.value,
                // "how_many": how_many.current.value,
                // "status": "Order Submitted",
                // "total_cost": total_cost.current.value,
                // "note": note.current.value,
                // isDelivered_user: isDelivered_user.current.checked,
                delivery_date: order.delivery_date,
                isDelivered_chef: isDelivered_chef.current.checked,
                isConfirmed: isConfirmed.current.checked,
                status: status.current.value,
                // "isDelivered_chef": false,
                // "order_type": order_type.current.value,
                // "menu_order": menu.id,
            }
            updateOrder(submitOrder)
            .then(() => props.history.push(`/orders/${order.id}`))
         
        // else {
        //     isDelivered_chef.current.showModal()
        // }
    }

    return (
        <main className="container-md vh-100">
            <dialog className="dialog dialog--order_type" ref={isDelivered_user}>
                <div>order_types do not match</div>
                    <button className="button--close" onClick={e => isDelivered_user.current.close()}>Close</button>
            </dialog>
            <header className="mt-5 text-center">
                <h1>Order:Details</h1>
            </header>
            <form className="form--login" onSubmit={handleRegister}>
              <div className="d-flex flex-row justify-content-center align-items-center mt-5">
              <div className="d-flex flex-column w-100 text-center mr-5">
                      <img className="mb-3 img-fluid" src={order.menu_order && order.menu_order.foodImgUrl} />
                      <label name={order.menu_order && order.menu_order.name} className="form-control mb-3"  >
                        {order.menu_order && order.menu_order.name}
                      </label>
                      <label className="form-control mb-3" placeholder={order.how_many}
                         >{order && order.how_many}
                      </label>
                      <label ref={total_cost} name="total_cost" type="text" id="register--total_cost" className="form-control mb-3 text-left" placeholder="total_cost">
                          <i class="fas fa-file-invoice-dollar"></i> &nbsp;${order && order.total_cost}.00
                      </label>
                      <select className="form-control mb-3" id="order_type" ref={order_type} name="order_type" >
                        <option selected disabled>{order.order_type}</option>
                      </select> 
                      <div className="d-flex flex-row">
                          <label className="d-flex flex-column">Order delivered - User confirmation
                            <input ref={isDelivered_user} name="isDelivered_user" type="checkbox" id="order--isDelivered_user" className="d-flex flex-column form-control mb-3" 
                            checked={order.isDelivered_user}/>
                          </label>
                      </div>                            
                      <textarea ref={note} name="note" type="text" id="register--note" className="form-control mb-5" placeholder={order.note} rows="4" />
                  </div>
                  <div className="d-flex flex-column w-100 text-center">
                        <label className="form-control mb-3 text-left" placeholder="">
                        <i class="fas fa-user-circle"></i> &nbsp;{order.chef_order && order.chef_order.user && order.chef_order.user.first_name} {order.chef_order && order.chef_order.user && order.chef_order.user.last_name}
                        </label>
                        <label name="address" className="form-control mb-3 text-left" placeholder="address"  >
                          <i class="fas fa-location-arrow"></i> {order.chef_order && order.chef_order["address"]}
                        </label>
                        <label name="address" className="form-control mb-3 text-left" placeholder="address"  >
                          <i class="fas fa-sign"></i> {order && order.chef_order && order.chef_order["city"]},
                          {order.chef_order && order.chef_order["state"]} {order.chef_order && order.chef_order["zipCode"]}
                        </label>
                        <label name="address" className="form-control mb-3 text-left" placeholder="address"  >
                        <i class="fas fa-phone-square-alt"></i> {order.chef_order && order.chef_order["telephone"]}
                        </label>                                              
                        <div className="d-flex flex-row">
                          <label className="d-flex flex-column">Is confirmed
                            <input name="isConfirmed" type="checkbox" id="register--isConfirmed" checked={order.isConfirmed}
                            className="d-flex flex-column form-control mb-3" ref={isConfirmed} value="order--isConfirmed"
                            onChange={handleTagUpdate}/>
                          </label>
                        </div>
                        {/* <label className="form-control mb-3" placeholder="Password" required>
                              <i class="far fa-hourglass"></i>                                
                        </label> */}
                        {order.delivery_date?
                                <DatePicker
                                    className="form-control mb-3" 
                                    id="order--delivery_date"
                                    value={order.delivery_date}

                                    onChange={handleTimeUpdate}
                                    showTimeSelect
                                    dateFormat="MM/dd/yyyy  EE hh:mm a"
                                    />
                                :
                                <DatePicker
                                    className="form-control mb-3" 
                                    id="order--delivery_date"
                                    value="Order Complete Date & Time"
                                    onChange={handleTimeUpdate}
                                    showTimeSelect
                                    
                                    dateFormat="MM/dd/yyyy  EE hh:mm a"/>                          
                                                      
                        }                          
                        {/* {
                          order.delivery_date?
                            <label className="form-control mb-3" placeholder="Password" required>
                              <i class="far fa-hourglass"></i> 
                              <DatePicker 
                                value="order--delivery_date"
                                selected={order.delivery_date}
                                showTimeSelect/>
                            </label>
                          :
                            <label className="form-control mb-3" placeholder="Password" required>
                              <i class="far fa-hourglass"></i> Order Complete Date & Time
                            </label>                                                    
                        }                           */}
                        <select id="status" className="form-control mb-3" ref={status} name="status" >
                          <option selected disabled>{order && order.status}</option>
                          <option value="Cooking">Cooking</option>
                          <option value="Ready for Pickup">Ready for Pickup</option>
                          <option value="Complete">Complete</option>
                        </select>
                        <div className="d-flex flex-row">
                          <label className="d-flex flex-column">Order delivered - Chef confirmation
                          <input ref={isDelivered_chef} name="isDelivered_chef" type="checkbox" id="order--isDelivered_chef" value="order--isDelivered_chef"
                            className="d-flex flex-column form-control mb-3" onChange={handleTagUpdate} checked={order.isDelivered_chef}/>
                            {/* <input name="isDelivered_chef" type="checkbox" id="order--isDelivered_chef" className="d-flex flex-column form-control mb-3" ref={isDelivered_chef}
                            checked={order.isDelivered_chef}/> */}
                          </label>
                        </div>                                             
                  </div>
              </div>
              <div className="d-flex justify-content-center">
                  <button className="btn btn-outline-primary w-50" type="submit">Submit your order</button>
              </div>
              </form>
        </main>
    )
}
/*


*/
