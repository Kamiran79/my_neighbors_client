import React, { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { CategoryContext } from "./CategoryProvider"
import "./Categories.css"


export const CategoryDetails = (props) => {
    const { deleteCategory, getCategoryById } = useContext(CategoryContext)

    const [categories, setCategory] = useState([])

    useEffect(() => {
        const categoryId = parseInt(props.match.params.categoryId)
        getCategoryById(categoryId)
            .then(setCategory)
    }, [])


    return (
        <section className="category">
            <h3 className="category__name">{categories.label}</h3>

            <button onClick={() => window.confirm('Are you sure?') &&
            deleteCategory(categories.id).then(() => props.history.push("/categories"))
            }>Delete</button>

            <button onClick={() => {
                props.history.push(`/categories/edit/${categories.id}`)
            }}>Edit</button>

            <h3>Posts</h3>
            {
                categories.posts&&
                    categories.posts.map(post => {
                        return <section key={`post--${post.id}`} className="category-posts">
                            <div className="card">
                                <div className="card-body">
                                <Link to={`/posts/${post.id}`}><h3 className="card-title">{post.title}</h3></Link>
                                <p className="card-text">{post.content}</p>
                                <p className="card-text" style={{ fontSize: ".9em" }}></p>
                                </div>
                            </div>
                        </section>
                    })
            }

        </section>
    )
}
