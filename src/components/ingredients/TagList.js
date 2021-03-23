import React, { useContext, useState, useEffect, useRef } from "react"
import { TagContext } from "./TagProvider"
import Tag from "./tag"

export const TagList = (props) => {
  const editTagDialog = useRef()
  const deleteTagDialog = useRef()
  const { tags, getTags, createTag, updateTag, deleteTag } = useContext(TagContext)
  const [newTag, setNewTag] = useState("")
  const [editedTag, setEditTag] = useState("")
  const [isEditing, setIsEditing] = useState(false)
  const [editTagId, setEditTagId] = useState(0)
  const [deletedTagId, setDeletedTagId] = useState(0) 

  const handleInput = (e) => {
      if (isEditing) {
        updateTag({ id: editTagId, label: editedTag })
        .then(editTagDialog.current.close())
        .then(setEditTag(""))
        .then(setIsEditing(false))
      } else {
        createTag({ label: newTag })
        .then(setNewTag(""))
      }
  }

  const editATag = (e) => {
    setEditTag(e.target.dataset.tagname)
    setEditTagId(e.target.id)
    setIsEditing(true)
    editTagDialog.current.showModal()
  }

  const deleteATag = (e) => {
    deleteTag(deletedTagId)
    .then(deleteTagDialog.current.close())
    .then(setDeletedTagId(0))
  }

  useEffect(() => {
    getTags()
  }, [])

  return (
      <div className="d-flex flex-row justify-content-around">
        <dialog className="dialog dialog--editTag" ref={editTagDialog}>
              <div className="d-flex flex-column justify-content-around align-items-center">
                <h4>Edit this tag</h4>
                <input className="editTagInput form-control mb-5" type="text" placeholder="Add text" value={editedTag} onChange={e => {
                  setEditTag(e.target.value)
                }}></input>
                <div className="d-flex flex-row justify-content-around align-items-center w-100">
                  <button className="createTag btn btn-outline-primary" onClick={handleInput}>Ok</button>
                  <button className="btn btn-outline-primary" onClick={e => editTagDialog.current.close()}>Close</button>
                </div>
              </div>
            </dialog>
            <dialog className="dialog dialog--deleteTag text-center" ref={deleteTagDialog}>
                <h4>Are you sure you want to delete this tag?</h4>
                <div className="d-flex flex-row justify-content-around align-items-center w-100">
                  <button className="deleteTag btn btn-outline-primary" onClick={deleteATag}>Ok</button>
                  <button className="btn btn-outline-primary" onClick={e => deleteTagDialog.current.close()}>Close</button>
                </div>
            </dialog>
        <div className="allTags">
          {
            tags.map(tag => <Tag key={tag.id} tag={tag} deleteTagDialog={deleteTagDialog} setDeletedTagId={setDeletedTagId} editATag={editATag} />)
          }
        </div>
        <div> 
          <div className="addTagForm d-flex flex-column justify-content-around align-items-center">
            <h2>Create a new tag</h2>
            <input className="tagInput" type="text" placeholder="Add text" value={newTag} onChange={e => {
              setNewTag(e.target.value)
            }}></input>
            <button className="createTag" onClick={handleInput}>Create</button>
          </div>
        </div>
      </div>
  )
}
