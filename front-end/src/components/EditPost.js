import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import { axiosWithAuth } from '../utils/axiosWithAuth'

const EditPost = (props) => {
const [post, setPost] = useState(
    {
    post_title: '',
    post_text: ''
    }
)
const {id} = useParams()
const userId = localStorage.getItem('userId')
useEffect(() => {
axiosWithAuth()
.get(`/users/${userId}/posts/${id}`)
.then(res => {
    setPost({post_title: res.data.response[0].post_title, post_text: res.data.response[0].post_text})
})
}, [id])
const saveEdit = e => {
    const userId = localStorage.getItem('userId')

    e.preventDefault()
    axiosWithAuth()
    .put(`/users/${userId}/posts/${id}`, post)
    .then(res => {
       props.history.push('/UserDash')
    })
}
const handleChange = e => {
    e.persist()
    setPost({
        ...post, 
        [e.target.name]: e.target.value
    })
}
return(
<form >
                <label>Title:</label>
                <input
                    name='post_title'
                    type='text'
                    placeholder='Title'
                    value={post.post_title}
                    onChange={handleChange}

                />
                <br/>
                <label>Body:</label>
                <input
                    name='post_text'
                    type='textarea'
                    placeholder='Text'
                    value={post.post_text}
                    onChange={handleChange}
                />
                <br/>
                <button onClick={saveEdit}>Save Edit</button>
            </form>
)}
export default EditPost;