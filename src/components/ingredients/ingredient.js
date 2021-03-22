import React from "react"

export default (props) => (
  <option value={props.ingredient.id}>{props.ingredient.label}</option>
)
