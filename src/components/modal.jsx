import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  
} from "@heroui/react";

import { useState } from "react";
import { deletePost } from "../services/postServices";

export default function DeleteModal({isOpen,onOpenChange,post,getPosts,onDelete}) {

 const [loading, setloading] = useState(false)
 const [modelStatus, setModelStatus] = useState(null)

 async function deletePostHandler(){
    setloading(true)
    const data = await deletePost(post._id);
    if(data.message=="success"){
        if(onDelete) {
            onDelete();
            
        } else {
            await getPosts();
            setloading(false);
            setModelStatus(true);}


    }
 }
  return (
        <>
        {modelStatus ?? 
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent className="text-gray-700 dark:text-gray-300">
            {(onClose) => (
                <>
                <ModalHeader className="flex flex-col gap-1">Confirmation</ModalHeader>
                <ModalBody>
                    <p>
                    Are you sure do you want to delete the post ?
                    </p>
                </ModalBody>
                <ModalFooter>
                    <Button color="default" variant="bordered" onPress={onClose}>
                    Close
                    </Button>
                    <Button isLoading={loading} color="danger"  onPress={deletePostHandler}>
                    Delete
                    </Button>
                </ModalFooter>
                </>
            )}
            </ModalContent>
        </Modal>}
        </>
        
  );
}
