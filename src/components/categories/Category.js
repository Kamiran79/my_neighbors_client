
import React from "react"
import { Link } from "react-router-dom"
import "./Categories.css"

// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => (
  <div className="categories">
    <div className="categoryicon"><i className="fas fa-cog fa-2x" id={props.category.id} data-categoryname={props.category.label} onClick={props.editACategory}></i></div>
    <div className="categoryicon"><i className="far fa-trash-alt fa-2x" id={props.category.id} onClick={e => {
      props.setDeletedCategoryId(props.category.id)
      props.deleteCategoryModal.current.showModal() 
    }
    }></i></div>
    <div className="category__table">
      <table className="table table-bordered">
        <tbody>
          <tr>
            <td><Link to={`/categories/${props.category.id}`}>{props.category.label}</Link></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
)
