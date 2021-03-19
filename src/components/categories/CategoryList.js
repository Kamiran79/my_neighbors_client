import React, { useContext, useEffect } from "react"
import { CategoryContext } from "./CategoryProvider"
import { Link } from "react-router-dom"
import "./Categories.css"

export const CategoryList = props => {
    const { categories, getCategories } = useContext(CategoryContext)

    useEffect(() => {
        getCategories()
    }, [])

    return (
        <div style={{ margin: "0rem 3rem"}}>
            <h1>Categories</h1>

            <button onClick={() => props.history.push("/createCategory")}>
                Add Category
            </button>


            <article className="categories">
                {
                    categories.map(category => {
                        return <section className="categories" key={category.id}>
                            <Link to={`/categories/${category.id}`}>
                                <h3>{category.label}</h3>
                            </Link>
                        </section>
                    })
                }
            </article>
        </div>
    )
}
