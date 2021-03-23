import React, { useContext } from "react"
import { MenuContext } from "./MenuProvider"
import { TagContext } from "../ingredients/TagProvider"

export const MenuSearch = () => {
    const { setTerms } = useContext(MenuContext)
    const { setSearchTags } = useContext(TagContext)

    return (
        <>
            <div>Search for a menu</div>
            <input type="text" className="posts__search"
                onChange={
                    (changeEvent) => {
                        setTerms(changeEvent.target.value)
                        setSearchTags(changeEvent.target.value)
                    }
                }
                placeholder="Enter search string or ingredient here..." />
        </>
    )
}
