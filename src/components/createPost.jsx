import { useState, useEffect, useRef } from 'react';
import { FaSmile } from 'react-icons/fa';
import { Button } from '@heroui/react';
import { BsImageFill } from 'react-icons/bs';
import EmojiPicker from 'emoji-picker-react';
import {addPost, editPost} from '../services/postServices';

export default function CreatePost({post=null,getAllPosts,mode="post",setmode=null}) {
  const [postContent, setPostContent] = useState('');
  const [image, setImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false)
  const fileInputRef = useRef(null);  
  const maxCharacters = 280;


  useEffect(() => {

    if (postContent.length > maxCharacters) {
      setError('Character limit exceeded');
    } else {
      setError('');
    }
  }, [postContent]);

  useEffect(() => {
    if(mode=="edit"){
      
        if(post.image){
          setImage(null);
          setImagePreview(post.image);
        }

        if(post.body){
          setPostContent(post.body.replace(/[\r\n\s]+$/, ""))

        }
      }
    
  }, [])
  

  function handleRemoveImage() {
    setImage(null)
    setImagePreview(null)
    fileInputRef.current.value = '';
    }
  
  function handleImageUpload (e) {
    if (e.target.files.length != 0) {
        setImage(e.target.files[0])
        const imageURL = URL.createObjectURL(e.target.files[0])
        setImagePreview(imageURL);
    }
    }


 function handleEmojiClick (emojiObject){
    setPostContent((prev) => prev + emojiObject.emoji);
    setShowEmojiPicker(false);
  }

 async function handlePost (e) {
    e.preventDefault();

    if (postContent.trim() == '' && !image) {
      setError('Please add some content or an image to your post');
      return;
    }
    if (postContent.length > maxCharacters) {
      setError('Character limit exceeded');
      return;
    }

    const formData = new FormData();
    if(postContent.trim()!=""){
        formData.append("body",postContent);
    }
    if(image!=null){
        formData.append("image",image);
    }

    setIsSubmitting(true)
    let res = null;
    if(mode =="post"){
        res = await addPost(formData);
    }
    else{
        res = await editPost(formData,post._id);
    }
    

    console.log(res);

    if(res.message =="success"){
        await getAllPosts();
        setIsSubmitting(false)
        setPostContent('');
        setError('');
        handleRemoveImage()
        if(mode=="edit"){
            setmode("post")

        }

    }
    
  }

  return (
    <div className="my-12 bg-gradient-to-r from-blue-400 to-pink-400 w-11/12 sm:w-3/4 md:w-5/12 2xl:w-4/12  shadow-lg dark:shadow-gray-800 pt-1 p-0 mx-auto rounded-xl">
      <div className="w-full bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 mx-auto rounded-lg overflow-hidden">
        <div className="p-8">
          <textarea
            autoFocus
            className="appearance-none  resize-none h-24 bg-gray-100 dark:bg-gray-900 rounded border-none w-full leading-normal mr-3 pt-2.5 px-3  focus:outline-none"
            rows="4"
            placeholder="What's on your mind?"
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
          />
          <p className="text-sm text-gray-500 mt-1 mb-3">
            {postContent.length}/{maxCharacters} characters
          </p>

          {imagePreview && (
            <div className="mb-4">
              <img
                src={imagePreview}
                alt="Selected content"
                className="w-full  object-cover rounded-lg"
              />
            </div>
          )}

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <div className="flex items-center space-x-4 mb-4">
            <label className="flex items-center space-x-2 cursor-pointer">
              <BsImageFill className="text-gray-500 hover:text-blue-500" />
              <span className="text-sm text-gray-500 hover:text-blue-500">Add Image</span>
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                onChange={handleImageUpload}
                accept="image/*"
              />
            </label>
            <button
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="flex items-center space-x-2 text-gray-500 hover:text-yellow-400"
            >
              <FaSmile />
              <span className="text-sm">Emoji</span>
            </button>
          </div>

          {showEmojiPicker && (
            <div className="mb-4 dark:bg-dark">
              <EmojiPicker theme={localStorage.getItem('mode')} onEmojiClick={handleEmojiClick} />
            </div>
          )}

          <Button
            isLoading={isSubmitting}
            onClick={handlePost}
            className="flex justify-center gap-2 bg-gradient-to-r mx-auto w-full text-md from-blue-500 to-pink-500 text-white font-bold rounded-lg hover:bg-blue-600 transition duration-300"
          >
             {mode =="edit" ? "Edit" : "Post"}
          </Button>
        </div>
      </div>
    </div>
  );
}
