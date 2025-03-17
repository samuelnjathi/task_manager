import React, { useState } from 'react';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { TaskItemProps } from '../types/definations';
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import { Reorder, motion } from 'framer-motion';

const TaskCard: React.FC<TaskItemProps> = ({task, onDeleteTask, onToggleTask, onEditTask}) => {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [newTitle, setNewTitle] = useState<string>(task.title);
    
    const handleEdit = () => {
        if(!newTitle.trim()) return;
        onEditTask(task.id, newTitle);
        setIsEditing(false);
    }

    return (
        <Reorder.Item value={task} id={task.id} >
        <motion.li 
            layout
            key={task.id} 
            className="flex justify-between items-center p-2 border-b my-2"
            transition={{type: "spring", stiffness: 300, damping: 20}}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            {isEditing ? (
                <motion.input type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="border border-gray-500 rounded-md p-1 mr-2"
                    autoFocus
                    initial={{scale: 0.9}}
                    animate={{scale: 1}} 
                    transition={{ duration: 0.2}}
                />
            ) : (
                <span className={`cursor-pointer ${task.completed ? "line-through text-gray-500" : ""}`}
                onClick={() => onToggleTask(task.id)}
                >
                    {task.title}
                </span>
            )}     
        
            <div className="flex justify-end space-x-2">
                {isEditing ? (
                    <>
                    <AddIcon onClick={handleEdit} className='text-green-500 cursor-pointer' />
                    <ClearIcon className="cursor-pointer text-gray-500" onClick={() => setIsEditing(false)} />
                    </>
                ): (
                    <ModeEditOutlinedIcon onClick={() => setIsEditing(true)} className='text-blue-500 cursor-pointer'/> 
                )}
                
                <DeleteOutlinedIcon
                    className='text-red-500 cursor-pointer' 
                    onClick={() => {onDeleteTask(task.id);}} 
                /> 
            </div>
        </motion.li>
        </Reorder.Item>  
    )
}
export default React.memo(TaskCard);
        
