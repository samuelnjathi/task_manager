import React, { useState } from 'react';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { TaskItemProps } from '../types/definations';
import ClearIcon from '@mui/icons-material/Clear';
import DoneIcon from '@mui/icons-material/Done';
import { Reorder, motion } from 'framer-motion';

const TaskCard: React.FC<TaskItemProps> = ({task, onDeleteTask, onToggleTask, onEditTask}) => {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [newTask, setNewTask] = useState({
        title: task.title,
        from: task.from || "",
        to: task.to || ""
    });
    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;  
        setNewTask((prev) => {
            return {
               ...prev,
               [name] : value 
            }
        });
    }
    const handleEdit = () => {
        if(!newTask.title.trim()) return;
        onEditTask(task.id, newTask);
        setIsEditing(false);
    }

    return (
        <Reorder.Item value={task} id={task.id} >
        <motion.li 
            layout
            key={task.id} 
            className="flex justify-between items-center p-2 border-b my-2 space-x-2"
            transition={{type: "spring", stiffness: 300, damping: 20}}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            {isEditing ? (
                <motion.div 
                autoFocus
                initial={{scale: 0.9}}
                animate={{scale: 1}} 
                transition={{ duration: 0.2}}
                >
                    <input 
                        name="from"
                        value={newTask.from}
                        onChange={handleEditChange}
                        className="border border-gray-500 rounded-md p-0.5 m-2"
                        aria-label="Time"
                        type="time" 
                    />
                    <input 
                        name="to"
                        value={newTask.to}
                        onChange={handleEditChange}
                        className="border border-gray-500 rounded-md p-0.5"
                        aria-label="Time" 
                        type="time"
                    />
                    <input type="text"
                        name="title"
                        value={newTask.title}
                        onChange={handleEditChange}
                        className="border border-gray-500 rounded-md p-1 mr-2"
                    />
                </motion.div>
                
            ) : (
                <div className="flex space-x-3 items-center">
                    <div className="flex text-sm space-x-1">
                        <p>{task.from}</p>
                        <p>-</p>
                        <p>{task.to}</p>
                    </div>
                    <span className={`cursor-pointer font-medium ${task.completed ? "line-through text-gray-500" : ""}`}
                    onClick={() => onToggleTask(task.id)}
                    >
                        {task.title}
                    </span>
                </div>
                
            )}     
        
            <div className="flex justify-end space-x-2">
                {isEditing ? (
                    <>
                    <DoneIcon onClick={handleEdit} className='text-green-500 cursor-pointer' />
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
        
