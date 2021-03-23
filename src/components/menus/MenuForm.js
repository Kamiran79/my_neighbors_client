import React, { useContext, useState, useEffect, Fragment } from "react"
import { useHistory } from 'react-router-dom'
import { MenuContext } from "./MenuProvider"
import { CategoryContext } from "../categories/CategoryProvider"
import { TagContext } from "../ingredients/TagProvider"


export const MenuForm = (props) => {
    // Use the required context providers for data
    const { addMenu, menus, updateMenu, getMenus } = useContext(MenuContext)
    // const { profile, getProfile } = useContext(ProfileContext)

    // Tags data
    const { tags, getTags } = useContext(TagContext)

    // Categories data
    const { categories, getCategories } = useContext(CategoryContext)

    // Component state
    const [menu, setMenu] = useState({})
    const [newTags, setNewTags] = useState([])

    // History
    const history = useHistory();

    // Is there a a URL parameter??
    const editMode = props.match.params.hasOwnProperty("menuId")  // true or false

    const handleControlledInputChange = (event) => {
        /*
            When changing a state object or array, always create a new one
            and change state instead of modifying current one
        */
        const newMenu = Object.assign({}, menu)          // Create copy
        newMenu[event.target.name] = event.target.value    // Modify copy
        setMenu(newMenu)                                 // Set copy as new state
    }

    const handleTagUpdate = e => {
        const updatedTagArray = []
        newTags.forEach(loopTag => {
            const newTag = {
                id: loopTag.id,
                label: loopTag.label,
                isChecked: parseInt(e.target.value) === loopTag.id ?
                    e.target.checked
                        ? true : false
                    : loopTag.isChecked ? true : false
            }
            updatedTagArray.push(newTag)
        })
        setNewTags(updatedTagArray)
    }

    /*
        If there is a URL parameter, then the user has chosen to
        edit an post.
            1. Get the value of the URL parameter.
            2. Use that `id` to find the post.
            3. Update component state variable.
    */
    const getMenuInEditMode = () => {
        if (editMode) {
            const menuId = parseInt(props.match.params.menuId)
            const selectedMenu = menus.find(a => a.id === menuId) || {}
            selectedMenu.category
                ? selectedMenu.category_id = selectedMenu.category.id
                : selectedMenu.category_id = 0
            setMenu(selectedMenu)
        }
    }

    const createNewTags = () => {
        const tempTags = []
        tags && tags.map(tag => tempTags.push({ id: tag.id, label: tag.label, isChecked: menu.ingredients && menu.ingredients.find(t => t.id === tag.id) ? true : false }))
        setNewTags(tempTags)
    }

    // Get data from API when component initilizes
    useEffect(() => {
        getMenus();
        getTags();
        getCategories();
    }, [])

    // Once provider state is updated, determine the post (if edit)
    useEffect(() => {
        getMenuInEditMode()
    }, [menus])

    useEffect(() => {
        createNewTags()
    }, [menu, tags])


    const constructNewMenu = () => {
        const menuTagsArray = newTags.filter(pt => pt.isChecked === true).map(nt => nt.id)

        if (editMode) {
            // PUT
            updateMenu({
                id: menu.id,
                title: menu.title,
                content: menu.content,
                category_id: parseInt(menu.category_id),
                publication_date: menu.publication_date,
                author_id: menu.rareuser.id,
                image_url: menu.image_url,
                tags: menuTagsArray
            })
                .then(() => props.history.push(`/menus/${menu.id}`))
        } else {
            // POST
            addMenu({
                name: menu.name,
                content: menu.content,
                category: menu.category_id,
                price: 6,
                how_many_left: 7,
                foodImgUrl: menu.image_url,
                ingredients: menuTagsArray
            })
                .then((newlyCreatedMenu) => props.history.push(`/menus/${newlyCreatedMenu.id}`))
        }

    }

    return (
        <div className="container w-50">
            <form className="postForm">
                <h2 className="postForm__title">{editMode ? "Update Post" : "New Menu"}</h2>
                <fieldset>
                    <div className="form-group">
                        <input type="text" name="name" required autoFocus className="form-control w-75"
                            placeholder="Menu name"
                            defaultValue={menu.title}
                            onChange={handleControlledInputChange}
                        />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <input type="text" name="image_url" className="form-control w-75"
                            placeholder="Image URL"
                            defaultValue={menu.image_url}
                            onChange={handleControlledInputChange}>
                        </input>
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <textarea rows="7" type="text" name="content" required className="form-control"
                            placeholder="Article content"
                            value={menu.content}
                            onChange={handleControlledInputChange}>
                        </textarea>
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <select name="category_id" className="form-control w-50" value={menu.category_id || ((menu.category && menu.category.id) || "0")} onChange={handleControlledInputChange}>
                            <option value="0" disabled>Category Select</option>
                            {categories.map(category => (
                                <option key={category.id} value={category.id}>{category.label}</option>
                            ))}
                        </select>
                    </div>
                </fieldset>
                <fieldset>
                    <div className="d-flex flex-row flex-wrap form-check form-check-inline mb-3">
                        {
                            newTags.map(tag => (
                                <Fragment key={tag.id}>
                                    <input type="checkbox" name="tags" className="form-check-input" value={tag.id} checked={tag.isChecked} onChange={handleTagUpdate} />
                                    <label htmlFor="tagsToAdd" className="form-check-label">{tag.label}</label>
                                </Fragment>
                            ))
                        }
                    </div>
                </fieldset>

                <button type="submit"
                    onClick={evt => {
                        evt.preventDefault()
                        constructNewMenu()
                    }}
                    className="btn btn-primary">
                    {editMode ? "Update" : "Create"}
                </button>
                <button type="button" onClick={() => history.goBack()}
                    className="btn btn-secondary ml-5">Cancel</button>
            </form>
        </div>
    )
}
