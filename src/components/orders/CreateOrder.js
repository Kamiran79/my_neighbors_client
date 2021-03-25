import React, { useContext, useEffect, useState, useRef } from "react"
import { Link } from "react-router-dom"
import { MenuContext } from "../menus/MenuProvider.js"
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../auth/AuthProvider'
import moment from 'moment';

export const CreateOrder = (props) => {
    const reserved_date = useRef()
    const how_many = useRef()
    const status = useRef()
    const total_cost = useRef()
    const order_type = useRef()
    const isConfirmed = useRef()
    const isDelivered_chef = useRef()
    const note = useRef()
    const isDelivered_user = useRef()

    const { getMenuById, releaseMenu } = useContext(MenuContext)
    const { isAdmin } = useContext(AuthContext)
    const history = useHistory();
    const [menu, setMenu] = useState([])
    const [totalCost, setTotalCost] = useState('0')
    
    useEffect(() => {
      const menuId = parseInt(props.match.params.menuId)
      getMenuById(menuId)
        .then(setMenu)
      
    })

    const handleTotalCost = (e) => {
      e.preventDefault()
      setTotalCost(parseInt(how_many.current.value) * menu.price)
    };
    

    const handleRegister = (e) => {
        e.preventDefault()

        if (order_type.current.value === isConfirmed.current.value) {
            const newUser = {
                "reserved_date": reserved_date.current.value,
                "how_many": how_many.current.value,
                "status": status.current.value,
                "total_cost": total_cost.current.value,
                "note": note.current.value,
                "isDelivered_user": isDelivered_user.current.value,
                "order_type": order_type.current.value,
            }

            return fetch("http://127.0.0.1:8000/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(newUser)
            })
                .then(res => res.json())
                .then(res => {
                    if ("token" in res) {
                        localStorage.setItem("rare_user_id", res.token)
                        props.history.push("/")
                    }
                })
        } else {
            isDelivered_chef.current.showModal()
        }
    }

    return (
        <main className="container-md vh-100">
            <dialog className="dialog dialog--order_type" ref={isDelivered_chef}>
                <div>order_types do not match</div>
                    <button className="button--close" onClick={e => isDelivered_chef.current.close()}>Close</button>
            </dialog>
            <header className="mt-5 text-center">
                <h1>Rare</h1>
            </header>
            <form className="form--login" onSubmit={handleRegister}>
                <div className="d-flex flex-row justify-content-center align-items-center mt-5">
                <div className="d-flex flex-column w-100 text-center mr-5">
                        <img className="mb-3 img-fluid" src={menu.foodImgUrl} />
                        <label name={menu.name} className="form-control mb-3"  >
                          {menu.name}
                        </label>
                        <input ref={how_many} name="how_many" type="text" id="order--how-many" className="form-control mb-3" placeholder="#QTY How Many" required autoFocus
                          onChange={handleTotalCost} />
                        <label ref={total_cost} name="total_cost" type="text" id="register--total_cost" className="form-control mb-3" placeholder="total_cost">
                            <i class="fas fa-file-invoice-dollar"></i>${totalCost}.00
                        </label>
                        <label ref={order_type} name="order_type" type="text" id="register--order_type" className="form-control mb-3" placeholder="order_type">
                          Order Type:
                        </label>
                        <select className="form-control mb-3" id="order_type" ref={order_type} name="order_type" required>
                          { menu.delivery?
                            <option value="delivery">delivery</option>
                            :(<></>)
                          }
                          { menu.dine_in?
                            <option value="Dine In">Dine In</option>
                            :(<></>)
                          }
                          { menu.pick_up?
                            <option value="Pickup">Pickup</option>
                            :(<></>)
                          }                          
                        </select> 
                        <textarea ref={note} name="note" type="text" id="register--note" className="form-control mb-5" placeholder="note" rows="4" required />
                    </div>
                    <div className="d-flex flex-column w-100 text-center">
                          <label className="form-control mb-3" placeholder="">
                          <i class="fas fa-user-circle"></i>{menu.my_neighbor_user.user["first_name"]} {menu.my_neighbor_user.user["last_name"]}
                          </label>
                          <input ref={isDelivered_chef} name="isDelivered_chef" type="text" id="register--profile-pic" className="form-control mb-3" placeholder="order received" required />
                          <input ref={isDelivered_chef} name="isDelivered_chef" type="text" id="register--profile-pic" className="form-control mb-3" placeholder="order received" required />
                          <input ref={isDelivered_chef} name="isDelivered_chef" type="text" id="register--profile-pic" className="form-control mb-3" placeholder="order received" required />
                          <div className="d-flex flex-row">
                            <label className="d-flex flex-column">Is confirmed
                              <input ref={order_type} name="order_type" type="checkbox" id="register--order_type" className="d-flex flex-column form-control mb-3" placeholder="order_type" required />
                            </label>
                          </div>                          
                        <label className="form-control mb-3" placeholder="Password" required>
                          <i class="far fa-hourglass"></i> Order Complete Date & Time
                          </label>
                          <select id="status" className="form-control mb-3" ref={status} name="status" required>
                            <option value="Cooking">Cooking</option>
                            <option value="Ready for Pickup">Ready for Pickup</option>
                            <option value="Complete">Complete</option>
                          </select>                           
                          <input ref={isDelivered_chef} name="isDelivered_chef" type="text" id="register--profile-pic" className="form-control mb-3" placeholder="order received" required />
                    </div>
                </div>
                <div className="d-flex justify-content-center">
                    <button className="btn btn-outline-primary w-50" type="submit">Register</button>
                </div>
            </form>
        </main>
    )
}
/*

                    <div className="d-flex flex-column w-30 text-center mr-5">
                        <img className="mb-3 img-fluid" src={menu.foodImgUrl} />
                        <label name={menu.name} className="form-control mb-3"  >
                          {menu.name}
                        </label>
                        <input ref={how_many} name="how_many" type="text" id="order--how-many" className="form-control mb-3" placeholder="#QTY How Many" required autoFocus
                        onChange={handleTotalCost} />
                        <label ref={total_cost} name="total_cost" type="text" id="register--total_cost" className="form-control mb-3" placeholder="total_cost">
                        <i class="fas fa-file-invoice-dollar"></i>${totalCost}.00
                          </label>
                          <label ref={order_type} name="order_type" type="text" id="register--order_type" className="form-control mb-3" placeholder="order_type">
                            </label>
                            <select className="form-control mb-3" id="order_type" ref={order_type} name="order_type" required>
                          { menu.delivery?
                            <option value="delivery">delivery</option>
                            :(<></>)
                          }
                          { menu.dine_in?
                            <option value="Dine In">Dine In</option>
                            :(<></>)
                          }
                          { menu.pick_up?
                            <option value="Pickup">Pickup</option>
                            :(<></>)
                          }                          
                        </select>                            
                        <input ref={reserved_date} name="reserved_date" type="text" id="register--first-name" className="form-control mb-5" placeholder="First Name" required autoFocus />
                        <textarea ref={note} name="note" type="text" id="register--note" className="form-control mb-5" placeholder="note" rows="4" required />
                    </div>
                    <div className="d-flex flex-column w-90 text-center  mr-5">
                        <div className="d-flex flex-row">
                          <label className="d-flex flex-column">Is confirmed
                            <input ref={order_type} name="order_type" type="checkbox" id="register--order_type" className="d-flex flex-column form-control mb-3" placeholder="order_type" required />
                          </label>
                        </div>
                        <input ref={isConfirmed} name="isConfirmed" type="order_type" id="register--verify-order_type" className="form-control mb-5" placeholder="Verify order_type" required />
                        <select id="status" ref={status} name="status" required>
                          <option value="Cooking">Cooking</option>
                          <option value="Ready for Pickup">Ready for Pickup</option>
                          <option value="Complete">Complete</option>
                        </select>
                        <input ref={isDelivered_user} name="isDelivered_user" type="text" id="register--profile-pic" className="form-control mb-5" placeholder="Profile Pic URL" required />
                        <textarea ref={note} name="note" type="text" id="register--note" className="form-control mb-5" placeholder="note" rows="4" required />
                    </div>
*/                    
