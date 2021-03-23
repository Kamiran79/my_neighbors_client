import React from "react"
import "./tag.css"

export default (props) => (
  <div className="tags">
    <div className="tagname">{props.postTag.name}</div>
    <div className="tagicon"><i className="far fa-trash-alt" id={props.postTag.id} data-postid={props.postTag.postId} onClick={props.deleteAPostTag}></i></div>
  </div>
)
