import React, { useContext, useEffect, useState, useRef } from "react"
import { useHistory } from 'react-router-dom'
import { MenuContext } from "./MenuProvider.js"
import { AuthContext } from '../auth/AuthProvider'
import moment from 'moment';
// import { PostReaction } from "../reactions/PostReaction"
// import { ReactionContext } from "../reactions/ReactionProvider"
// import { ReactionSelector } from "../reactions/ReactionSelector"
import "./Menus.css"

export const MenuDetails = (props) => {
    const { getMenuById, releaseMenu } = useContext(MenuContext)
    const { isAdmin } = useContext(AuthContext)
    // const { reactionsList, getReactions } = useContext(ReactionContext)
    const history = useHistory();
    const deleteMenuModal = useRef();

    const [menu, setMenu] = useState({})

    // const [reactionCounts, setReactionCounts] = useState([])
    // const [showReactionSelector, setShowReactionSelector] = useState(false)
    // const [currentUserPostReactions, setCurrentUserPostReactions] = useState([])

    useEffect(() => {
        const menuId = parseInt(props.match.params.menuId)
        getMenuById(menuId)
            .then(setMenu)
    }, [])

    useEffect(() => {
        // getReactions()
    }, [])

    // const getReactionCounts = (reactionsArray) => {
    //     var reactionCountsArray = [];
    //     var reactionCounts = {}

    //     // Initialize the reactionCounts array with the reaction and its respective count
    //     reactionsArray.forEach(reaction => {
    //         reactionCounts[reaction.reaction.id] = { ...reaction.reaction, "count": 0 }
    //     })

    //     // Loop over each reaction on the post and count the unique reactions
    //     reactionsArray.forEach(reaction => {
    //         reactionCounts[reaction.reaction.id].count += 1
    //         // reactionCounts[reaction.reaction.id].users.push(reaction.user.id)
    //     })

    //     Object.keys(reactionCounts).forEach(reaction => {
    //         reactionCountsArray.push(reactionCounts[reaction])
    //     })

    //     // Set the counts of the unique reactions
    //     setReactionCounts(reactionCountsArray)
    // }

    // useEffect(() => {
    //     post.reactions && getReactionCounts(post.reactions)
    // }, [post])

    // useEffect(() => {
    //     const body = { "token": `${localStorage.getItem("my_neighbors_user_id")}` }
    //     fetch("http://localhost:8000/get_current_user", {
    //         method: "POST",
    //         headers: {
    //             "Authorization": `Token ${localStorage.getItem("my_neighbors_user_id")}`
    //         },
    //         body: JSON.stringify(body)
    //     })
    //         .then(res => res.json())
    //         .then(res => {
    //             const userReactions = [];
    //             post.reactions && post.reactions.forEach(postReaction => {
    //                 if (postReaction.user.id === res.user_id) {
    //                     userReactions.push(postReaction.reaction.id)
    //                 }
    //             })
    //             setCurrentUserPostReactions(userReactions);
    //         })
    // }, [reactionCounts])

    return (
        <section className="post d-flex flex-row">
            {
                isAdmin?
                <dialog className="dialog dialog--deletePost" ref={deleteMenuModal}>
                    <h4>Are you sure you want to delete this menu?</h4>
                    <div className="d-flex flex-row justify-content-around align-items-center w-100">
                        <button className="deletePost btn btn-outline-primary" onClick={() => {
                            releaseMenu(menu.id)
                                .then(history.push("/menus"))
                        }}>Ok</button>
                        <button className="btn btn-outline-primary" onClick={e => deleteMenuModal.current.close()}>Cancel</button>
                    </div>
                </dialog>
                :''
            }

            <div className="post_details d-flex flex-column container mr-0">
                <h3 className="post__title text-center">{menu.name}</h3>
                <div className="d-flex flex-row justify-content-between">
                    {
                        isAdmin?
                        <div className="post__manage__buttons">
                            <i className="fas fa-trash-alt post__hover__delete" onClick={() => {
                                deleteMenuModal.current.showModal()
                            }}></i>
                            <i className="fas fa-cog post__hover" onClick={() => history.push(`/menus/edit/${menu.id}`)}></i>
                            <button className="btn btn-primary post__hover">Make an Order &nbsp;
                            <i className="fas fa-plus post__hover" onClick={() => history.push(`/orders/create/${menu.id}`)}></i>
                        </button>                             
                        </div>
                        : <button className="btn btn-primary post__hover" onClick={() => history.push(`/orders/create/${menu.id}`)}>Make an Order &nbsp;
                            <i className="fas fa-plus post__hover" ></i>
                        </button> 
                    }
                    <div>
                        <small>{menu.category && menu.category.label}</small>
                    </div>
                </div>
                <div className="text-center">
                    {/* <img className="mb-5 img-fluid w-100" src="https://via.placeholder.com/400x100" /> */}
                    <img className="mb-5 img-fluid w-100" src={menu.foodImgUrl} />
                </div>
                <div className="d-flex flex-row justify-content-between align-items-center">
                    <div>
                        <small >Ready Eat on {moment(menu.ready_eat).format('hh mm A')} </small>
                        <small className="d-block"> By {menu.my_neighbor_user && menu.my_neighbor_user.user.first_name} {menu.my_neighbor_user && menu.my_neighbor_user.user.last_name}</small>
                    </div>
                    <div>
                        {/* <button className="btn btn-outline-primary mt-0" onClick={() => history.push(`/menu/${menu.id}/comments`)}>View Comments</button> */}
                    </div>
                    <div className="d-flex flex-column">
                        {/* <div className="d-flex flex-column align-items-center border border-primary rounded px-3 h-100 reaction__container" onClick={() => { setShowReactionSelector(prev => !prev) }}>
                            <div className="d-flex flex-row">
                                {post.reactions && post.reactions.length > 0 ? (
                                    reactionCounts && reactionCounts.map(reaction => (
                                        <PostReaction key={reaction.id} reaction={reaction} />
                                    ))
                                ) : ('No Reactions Yet.')}</div>
                            <div>Click here to {showReactionSelector ? 'hide' : 'show'} reaction picker</div>
                        </div>
                        {showReactionSelector ? (
                            <div className="text-center">
                                <strong>Reaction Selector</strong>
                                <ReactionSelector
                                    reactionsList={reactionsList} currentUserPostReactions={currentUserPostReactions}
                                    setCurrentUserPostReactions={setCurrentUserPostReactions}
                                    getReactions={getReactions}
                                    getReactionCounts={getReactionCounts}
                                    getPostById={getPostById}
                                    setPost={setPost}
                                />
                            </div>
                        ) : ('')} */}
                    </div>
                </div>
                <div className="post__content">
                    {menu.content}
                </div>
            </div>
            <div className="mr-auto">
                <h6>Ingredients:</h6>
                {menu.ingredients && menu.ingredients.map(tag => (
                    <div key={tag.id} className="d-flex align-items-center border border-primary rounded px-5 mb-3">{tag.label}</div>
                ))}
            </div>
        </section>
    )
}
