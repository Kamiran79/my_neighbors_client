import React from "react"
import "./tag.css"

export default (props) => (
  <div className="tags">
    <div className="tagicon"><i className="fas fa-cog" id={props.tag.id} data-tagname={props.tag.label} onClick={props.editATag} ></i></div>
    <div className="tagicon"><i className="far fa-trash-alt" id={props.tag.id} onClick={e => {
        props.setDeletedTagId(props.tag.id)
        props.deleteTagDialog.current.showModal() 
      }
    }></i></div>
    <div className="tagname">{props.tag.label}</div>
  </div>
)
