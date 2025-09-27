import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem,useDisclosure} from "@heroui/react";
import DeleteModal from "./modal";

export default function DropDownComponent({setmode,post,getPosts,onDelete}) {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  const items = [
    {
      key: "edit",
      label: "Edit Post",
      icon: "fa-regular fa-pen-to-square mr-1"
    },
    {
      key: "delete",
      label: "Delete Post",
      icon:"fa-regular fa-trash-can mr-1"
    },
  ];

  return (
    <>
        <Dropdown>
        <DropdownTrigger>
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
                        <span onClick={onOpen}> 
                            <i className={item.icon}></i>
                            {item.label}
                        </span>

                    </>

                    :
                    
                        <span onClick={()=>{setmode("edit")}}>
                            <i className={item.icon}></i>
                            {item.label}
                        </span>
                
                    }
                
            </DropdownItem>
            )}
        </DropdownMenu>
        </Dropdown>

        <DeleteModal isOpen={isOpen} post={post} getPosts={getPosts} onOpenChange={onOpenChange} onDelete={onDelete}/>

    </>

  );
}
