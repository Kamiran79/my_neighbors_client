import React from "react"
import "./Menus.css"
import { Link } from "react-router-dom"
import moment from 'moment';

// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => (
    <section className="post p-5 mb-5 border">
        <div className="d-flex flex-row justify-content-between">
            <h3 className="post__title">
                <Link to={`/menus/${props.menu.id}`}>
                    {props.menu.name}
                </Link>
            </h3>
            <small>Ready To Eat: {moment(props.menu.ready_eat).format('hh mm A')}</small>
        </div>
        <div className="d-flex flex-row justify-content-center">
            {/* <img className="mb-5 img-fluid" src="https://via.placeholder.com/400x200" /> */}
            <img className="mb-5 img-fluid" src={props.menu.foodImgUrl} />
        </div>
        <div className="d-flex flex-row justify-content-between align-items-center">
            <div className="">Chef: {props.menu.my_neighbor_user && props.menu.my_neighbor_user.user.first_name} {props.menu.my_neighbor_user && props.menu.my_neighbor_user.user.last_name}</div>
            <div className="d-flex flex-row justify-content-between align-items-center">
                <div className="border rounded-pill p-2"><small># Rating</small></div>
                <Link to={`/menus/edit/${props.menu.id}`}>
                    <div className="posticon"><i className="fas fa-cog fa-2x"></i></div>
                </Link>
                <div className="posticon"><i className="far fa-trash-alt fa-2x post__hover__delete" id={props.menu.id} onClick={e => {
                    props.setDeleteMenuId(props.menu.id)
                    props.deleteMenuModal.current.showModal()
                }}></i></div>
            </div>
        </div>
    </section>
)
