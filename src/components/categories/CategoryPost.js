import React, { useState, useContext, useEffect, useRef } from "react"
import { CategoryContext } from "./CategoryProvider"
import { PostContext } from "../menus/MenuProvider"
// import MenuCard from "../menus/MenuCard"
import "./CategoryPost.css"
import MenuCard from "../menus/MenuCard"


export const CategoryPost = (props) => {
  const { categories, getMenuByCategoryId } = useContext(CategoryContext)
  const { releaseMenu } = useContext(PostContext)

  const deleteMenuModal = useRef()

  const [menus, setMenu] = useState([])
  const [deleteMenuId, setDeleteMenuId] = useState(0)

  const deleteAMenu = (e) => {
    releaseMenu(deleteMenuId)
      .then(setDeleteMenuId())
      .then(deleteMenuModal.current.close())
  }

  useEffect(() => {
    const categoryId = parseInt(props.match.params.categoryId)
    getMenuByCategoryId(categoryId)
      .then(setMenu)
  }, [])

  return (
    <section>
      <dialog className="dialog dialog--deletePost" ref={deleteMenuModal}>
        <h4>Are you sure you want to delete this post?</h4>
        <div className="d-flex flex-row justify-content-around align-items-center w-100">
          <button className="deletePost btn btn-outline-primary" onClick={deleteAMenu}>Ok</button>
          <button className="btn btn-outline-primary" onClick={e => deleteMenuModal.current.close()}>Cancel</button>
        </div>
      </dialog>
      <div className="categoryPostContainer">
        <div className="categoryPost__title" id={props.match.params.categoryId}>
          <h1>{categories.find(category => category.id === props.match.params.categoryId).label}</h1>
        </div>
        <div className="d-flex flex-row justify-content-end"></div>
        <div className="category__post post__list mt-5 mx-5 px-3">
          {
            menus.map(menu => <MenuCard key={menu.id} menu={menu} setDeleteMenuId={setDeleteMenuId} deleteMenuModal={deleteMenuModal} />)
          }
        </div>
      </div>
    </section>
  )
}
