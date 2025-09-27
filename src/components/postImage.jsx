import React from 'react'

export default function postImage({post}) {
  return (
    <>
        {post.image && <img
        className="w-full object-cover rounded-lg mb-4" //should i leave it like this or make h-60(same with create post)
        src={post.image}
        alt=""
        />
        }
    </>
   
  )
}
