import { useState, useEffect, useRef } from 'react';
import {useLocation} from 'react-router-dom'
import { FaSmile } from 'react-icons/fa';
import { Button } from '@heroui/react';
import { BsImageFill } from 'react-icons/bs';
import EmojiPicker from 'emoji-picker-react';
import { addPost, editPost } from '../services/postServices';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function CreatePost({ post = null, getAllPosts, mode = "post", setmode = null }) {
  const queryClient = useQueryClient();
  const location = useLocation()

  const [postContent, setPostContent] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const maxCharacters = 280;


  const mutation = useMutation({
    mutationFn: async (formData) => {
      if (mode === "post") {
        return await addPost(formData);
      } else {
        return await editPost(formData, post._id);
      }
    },
    onSuccess: async (data) => {
      if (data.message === "success") {
        if(location.pathname === "/"){
            queryClient.invalidateQueries({ queryKey: ["posts"] });
            console.log("i ran 1")
        }
        else{
            queryClient.invalidateQueries({ queryKey: ["myPosts"] });
            console.log("i ran 2")
        }
        setPostContent('');
        handleRemoveImage();
        setError('');

        if (mode === "edit") setmode("post");
      }
    }
  });

  useEffect(() => {
    if (mode === "edit" && post) {
      if (post.image) {
        setImage(null);
        setImagePreview(post.image);
      }
      if (post.body) {
        setPostContent(post.body.replace(/[\r\n\s]+$/, ""));
      }
    }
  }, []);

  function handleRemoveImage() {
    setImage(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  }

  async function processImage(file) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        const img = new Image();
        
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          
          let width = img.width;
          let height = img.height;
          const maxSize = 1920;
          
          if (width > maxSize || height > maxSize) {
            if (width > height) {
              height = (height / width) * maxSize;
              width = maxSize;
            } else {
              width = (width / height) * maxSize;
              height = maxSize;
            }
          }
          
          canvas.width = width;
          canvas.height = height;
          
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, 0, width, height);
          
          ctx.drawImage(img, 0, 0, width, height);
          
          canvas.toBlob((blob) => {
            const newFileName = file.name.replace(/\.[^/.]+$/, '') + '.jpg';
            const convertedFile = new File([blob], newFileName, {
              type: 'image/jpeg',
              lastModified: Date.now()
            });
            resolve(convertedFile);
          }, 'image/jpeg', 0.99); // 
        };
        
        img.onerror = () => {
          resolve(file);
        };
        
        img.src = e.target.result;
      };
      
      reader.onerror = () => {
        resolve(file);
      };
      
      reader.readAsDataURL(file);
    });
  }

  async function handleImageUpload(e) {
    if (e.target.files.length !== 0) {
      const file = e.target.files[0];
      
      try {
        const processedFile = await processImage(file);
        setImage(processedFile);
        setImagePreview(URL.createObjectURL(processedFile));
      } catch (error) {
        console.error('Error processing image:', error);
        setError('Failed to process image. Please try another image.');
      }
    }
  }

  function handleEmojiClick(emojiObject) {
    setPostContent((prev) => prev + emojiObject.emoji);
    setShowEmojiPicker(false);
  }

  function handlePost(e) {

    if (postContent.trim() === '' && !image) {
      setError('Please add some content or an image');
      return;
    }
    if (postContent.length > maxCharacters) {
      setError('Character limit exceeded');
      return;
    }

    const formData = new FormData();
    if (postContent.trim() !== "") formData.append("body", postContent);
    if (image) formData.append("image", image);

    mutation.mutate(formData);
  }

  return (
    <div className="my-12 bg-gradient-to-r from-blue-400 to-pink-400 w-11/12 sm:w-3/4  md:w-116 lg:w-4/12 2xl:w-122 shadow-lg dark:shadow-gray-800 pt-1 p-0 mx-auto rounded-xl">
      <div className="w-full bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 mx-auto rounded-lg overflow-hidden">
        <div className="p-8">

          <textarea
            autoFocus
            className="appearance-none resize-none h-24 bg-gray-100 dark:bg-gray-900 rounded border-none w-full leading-normal mr-3 pt-2.5 px-3 focus:outline-none"
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
              <img src={imagePreview} alt="Selected" className="w-full object-cover rounded-lg" />
            </div>
          )}

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <div className="flex items-center space-x-4 mb-4">
            <label className="flex items-center space-x-2 cursor-pointer text-gray-500 hover:text-blue-500">
              <BsImageFill />
              <span className="text-sm">Add Image</span>
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
              className="flex items-center space-x-2 cursor-pointer text-gray-500 hover:text-yellow-400"
            >
              <FaSmile />
              <span className="text-sm">Emoji</span>
            </button>
          </div>

          {showEmojiPicker && (
            <div className="mb-4 dark:bg-dark">
              <EmojiPicker
                theme={localStorage.getItem('mode')}
                onEmojiClick={handleEmojiClick}
              />
            </div>
          )}

          <Button
            isLoading={mutation.isPending} 
            onPress={handlePost}
            className="flex justify-center gap-2 bg-gradient-to-r mx-auto w-full text-md from-blue-500 to-pink-500 text-white font-bold rounded-lg hover:bg-blue-600 transition duration-300"
          >
            {mode === "edit" ? "Edit" : "Post"}
          </Button>

        </div>
      </div>
    </div>
  );
}
