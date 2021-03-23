import React, { useContext, useEffect } from "react"
import { TagContext } from "./TagProvider"
import PostTag from "./PostTag"
import ListTags from "./ListTags"

export const PostTagList = (props) => {
  const { tags, getTags, postTags, deletePostTag, createPostTag } = useContext(TagContext)

  const deleteAPostTag = (e) => {
    e.preventDefault()
    deletePostTag(e.target.id, e.target.dataset.postid)
  }

  const addAPostTag = (e) => {
    e.preventDefault()
    const newPostTag = {
      "tag_id": e.target.value,
      "post_id": props.postId
    }
    if (e.target.value !== "ignore") {
      createPostTag(newPostTag)
    }
  }

  useEffect(() => {
    getTags()
  }, [])

  return (
    <React.Fragment>
      <select onChange={addAPostTag}>
        <option value="ignore">Add a tag to post</option>
        {
          tags.map(tag => <ListTags key={tag.id} tag={tag} addAPostTag={addAPostTag} />)
        }
      </select>
      <div className="postTags">
        {
          postTags.map(postTag => <PostTag key={postTag.id} postTag={postTag} deleteAPostTag={deleteAPostTag} />)
        }
      </div>
    </React.Fragment>
  )
}
