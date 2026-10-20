import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const CreatePost = () => {

  const navigate = useNavigate()

  const formhandle = async(e)=>{
    e.preventDefault()

    const formdata = new FormData(e.target)

    axios.post("http://localhost:3000/create-post",formdata)
    .then((res)=>{
      alert("post created succesfully")
      e.target.reset()
      navigate("/feed")
    })
    .catch((error)=>{
      console.error(error);
      alert("Error creating post")
    })
  }

  return (
    <section>
        <h1>Create Post</h1>
        <form onSubmit={formhandle}>
            <input type="file" name='image' accept='image/*' />
            <input type="text" name='caption' required placeholder='Enter Caption'/>

            <button type='submit'>Submit</button>
        </form>
    </section>
  )
}

export default CreatePost