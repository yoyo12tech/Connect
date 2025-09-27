import { useState } from "react";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem} from "@heroui/react";
import { deleteComment,getPostComments } from "../services/commentService";

export default function DropDownComponent({setCommentMode,postId,post,comment,setComments, setCommentCount}) {
  const [loading, setloading] = useState(false)

  async function delComment(e){

    e.preventDefault();
    e.stopPropagation(); 
    setloading(true);

    const response = await deleteComment(comment._id);

    if(response.message == "success"){
        let res = await getPostComments(postId);
        if(res.message=="success"){
          setComments(res.comments);
          setCommentCount(prev=>prev - 1);
          setloading(false);
        }
    }
  }
  const items = [
    {
      key: "edit",
      label: "Edit Comment",
      icon: "fa-regular fa-pen-to-square mr-1"
    },
    {
      key: "delete",
      label: "Delete Comment",
      icon:"fa-regular fa-trash-can mr-1"
    },
  ];

  if(post.user._id != comment.commentCreator._id){
    items.pop();
  }

  return (
    <>
        <Dropdown>
        <DropdownTrigger  className="h-2">
            <span className="text-3xl cursor-pointer">…</span>
        </DropdownTrigger>
        <DropdownMenu aria-label="Dynamic Actions" items={items}>
            {(item) => (
            <DropdownItem
                key={item.key}
                className={item.key === "delete" ? "text-danger" : "text-gray-700 dark:text-gray-300"}
                color={item.key === "delete" ? "danger" : "default"}
            >
                {item.key=="delete"? 
                    <>
                        {post.user._id == comment.commentCreator._id && <span onClick={delComment}> 
                            {loading ? <span className="loading mr-1 loading-infinity loading-sm"></span> : <i className={item.icon}></i>}
                            {item.label}
                        </span>}

                    </>

                    :
                    
                        <span onClick={()=>{setCommentMode("edit")}}>
                            <i className={item.icon}></i>
                            {item.label}
                        </span>
                
                    }
                
            </DropdownItem>
            )}
        </DropdownMenu>
        </Dropdown>


    </>

  );
}
