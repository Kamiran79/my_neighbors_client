import React, { useContext, useState, useEffect, useRef } from "react"
import { CategoryContext } from "./CategoryProvider"
import "./Categories.css"
import Category from "./Category"


export const CategoryList = (props) => {
  const { categories, getCategories, createCategory, updateCategory, deleteCategory } = useContext(CategoryContext)
  const [ newCategory, setNewCategory ] = useState("")
  const [ editedCategory, setEditCategory ] = useState("")
  const [ isEditing, setIsEditing ] = useState(false)
  const [ editCategoryId, setEditCategoryId ] = useState(0)
  const [ deletedCategoryId, setDeletedCategoryId ] = useState(0)
  const editCategoryModal = useRef()
  const deleteCategoryModal = useRef()

  const handleInput = (e) => {
    if (isEditing) {
      updateCategory({ id: editCategoryId, label: editedCategory })
        .then(editCategoryModal.current.close())
        .then(setEditCategory(""))
        .then(setIsEditing(false))
    } else {
      createCategory({ label: newCategory })
        .then(setNewCategory(""))
    }
  }

  const editACategory = (e) => {
    setEditCategory(e.target.dataset.categoryname)
    setEditCategoryId(e.target.id)
    setIsEditing(true)
    editCategoryModal.current.showModal()
  }

  const deleteACategory = (e) => {
    deleteCategory(deletedCategoryId)
      .then(deleteCategoryModal.current.close())
      .then(setDeletedCategoryId(0))
  }

  useEffect(() => {
    getCategories()
  }, [])

  return (
    <div className="d-flex flex-row justify-content-around">
      <dialog className="dialog dialog--editCategory" ref={editCategoryModal}>
        <div className="d-flex flex-column justify-content-around align-items-center">
          <h4>Edit this category</h4>
          <input className="editCategoryInput form-control" type="text" placeholder="Add text" value={editedCategory} onChange={e => {
            setEditCategory(e.target.value)
          }}></input>
          <div className="d-flex flex-row justify-content-around align-items-center w-100">
            <button className="createCategory btn btn-outline-primary" onClick={handleInput}>Ok</button>
            <button className="btn btn-outline-primary" onClick={e => editCategoryModal.current.close()}>Cancel</button>
          </div>
        </div>
      </dialog>
      <dialog className="dialog dialog--deleteCategory" ref={deleteCategoryModal}>
        <h4>Are you sure you want to delete this category?</h4>
        <div className="d-flex flex-row justify-content-around align-items-center w-100">
          <button className="deleteCategory btn btn-outline-primary" onClick={deleteACategory}>Ok</button>
          <button className="btn btn-outline-primary" onClick={e => deleteCategoryModal.current.close()}>Cancel</button>
        </div>
      </dialog>
      <div className="allCategories">
        {
          categories.map(category => <Category key={category.id} category={category} deleteCategoryModal={deleteCategoryModal} setDeletedCategoryId={setDeletedCategoryId} editACategory={editACategory} />)
        }
      </div>
      <div> 
          <div className="addCategoryForm d-flex flex-column justify-content-around align-items-center">
            <h2>Create a new category</h2>
            <input className="categoryInput" type="text" placeholder="Add text" value={newCategory} onChange={e => {
              setNewCategory(e.target.value)
            }}></input>
            <button className="createCategory" onClick={handleInput}>Create</button>
          </div>
        </div>
    </div>
  )
}
