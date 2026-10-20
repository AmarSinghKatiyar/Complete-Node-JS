// import React, { useState } from 'react'


// const Feed = () => {
//     const [post, setpost] = useState([
//         {
//             _id:'1',
//             image:"url",
//             caption:"beautiful image",
//         }
//     ])

//   return (
//     <section className='feed-sectuion'>
//         {
//             post.length>0?(
//                 post.map((p)=>
//         }
//     </section>
//   )
// }

// export default Feed




import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Feed = () => {

    useEffect(() => {
        axios.get("http://localhost:3000/posts")
        .then((res)=>{
            // console.log(res.data);
            setPost(res.data.post)
            
        }).catch((error)=>{
            console.error(error);
            
        })
    }, [])
    

    const [post, setPost] = useState([
        {
            _id: '1',
            image: 'https://ik.imagekit.io/krulfhtu7/image_JjuR4AEwp.jpg?updatedAt=1792434294777',
            caption: 'beautiful image',
        }
    ])

    return (
        <section className="feed-section">
            {
                post.length > 0 ? (
                    post.map((p) => (
                        <div className="post" key={p._id}>
                            <img src={p.image} alt={p.caption} />
                            <p>{p.caption}</p>
                        </div>
                    ))
                ) : (
                    <p>No posts available</p>
                )
            }
        </section>
    )
}

export default Feed
