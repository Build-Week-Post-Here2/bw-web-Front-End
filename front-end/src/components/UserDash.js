import React, { useState, useEffect } from 'react'
import { axiosWithAuth } from '../utils/axiosWithAuth'
import styled from 'styled-components'
import {useHistory} from 'react-router-dom'
import EditPost from './EditPost'
import Popup from 'reactjs-popup'

// styled components
const Body = styled.input `
width: 55%;
height: 10vh;
border-radius: 5px;
margin-bottom: 1%;
background-color: #737373ff;
`
const Title = styled.input `
width: 55%;
border-radius: 5px;
margin-bottom: 1%;
background-color: #737373ff;
`
const Analyze = styled.button `
width: 40%;
height: 5vh;
border-radius: 5px;
margin-bottom: 1%;
background-color: #ff0054ff;
color: #ffffffff;
`
const SavedTopicsContainer = styled.div `
width: 80%;
margin: 2% 10%;
background-color: #1a1a1aff;
border-radius: 10px;
`
const Button = styled.button `
background-color: #ff0054ff;
color: #ffffffff;
border-radius: 5px;
margin: 1%;
`
const Flex = styled.div `
display: flex;
margin: 5% 20% 5% 20%;
`
const Form = styled.form `
width: 80%;
background-color: #252525ff;
border-radius: 10px;
`
const TopicCard = styled.div `
background-color: #252525ff;
color: #737373ff;
border-radius: 10px;
margin: 2%;
padding: 2%
`
const Heading = styled.h2 `
color: #ff0054ff;
`
const PostHeading = styled.h3 `
color: #ff5400ff;
`
const Label = styled.label `
color: #ff5400ff;
`

//initial state
const initialState = {
    title: '',
    body: ''
}

export const UserDash = () => {
    const [saved, setSaved] = useState()
    const [suggestion, setSuggestion] = useState()
    const [updatePost, setUpdatePost] = useState(initialState)
    const history = useHistory()


    const handleChange = e => {
        e.persist()
        setUpdatePost({
            ...updatePost, 
            [e.target.name]: e.target.value
        })
    }
    useEffect(() => {
        getPosts()
    }, [])
    const getPosts = () => {
        const userId = localStorage.getItem('userId')
        axiosWithAuth()
            .get(`/users/${userId}/posts`)
            .then(res => {
                setSaved(res.data.results)
               
            })
            .catch(err => {
                console.log('uh-oh! Spaghetti-o', err)
            })
    }
    const formSubmit = e => {
        e.preventDefault()
        axiosWithAuth()
        .post('https://post-here2.herokuapp.com/predict', updatePost)
        .then(res => {
            console.log(res.data.prediction)
            setSuggestion(res.data.prediction)
        })

    }

    const deleteButton = (e, postId) => {
        const userId = localStorage.getItem('userId')
        e.preventDefault()
        axiosWithAuth()
        .delete(`/users/${userId}/posts/${postId}`)
        .then(res => {
            getPosts()
        })
        .catch(error => console.log(error))
    }

    const editButton = (e, postId) => {
    history.push(`/editPost/${postId}`)
    }
    return (
        <div>
            <Flex>
            <Form >
                <Label>Title:</Label>
                <Title
                    name='title'
                    type='text'
                    placeholder='Title'
                    value={updatePost.title}
                    onChange={handleChange}

                />
                <br/>
                <Label>Body:</Label>
                <Body
                    name='body'
                    type='textarea'
                    placeholder='Body'
                    value={updatePost.body}
                    onChange={handleChange}
                />
                <br/>
                <Analyze onClick={formSubmit}>Analyze</Analyze>
            </Form>

            
                <Heading>Where to Post</Heading>
                <p>{suggestion}</p>
            </Flex>
            <SavedTopicsContainer>
                <Heading>Saved Topics</Heading>
                {saved && saved.map(save => {
                    return (
                        <TopicCard>
                        <PostHeading>{save.post_title}</PostHeading>
                        <p>{save.post_text}</p>
                        <Button onClick={e => deleteButton(e, save.id)}>Delete</Button>
                        <Button onClick={e => editButton(e, save.id)}>Edit</Button>
                           
                        </TopicCard>
                    )
                })}
            </SavedTopicsContainer>

        </div>
    )
}
