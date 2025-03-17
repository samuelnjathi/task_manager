import React, { useState } from "react";
import { TaskFormProps } from "../types/definations";
import AddIcon from '@mui/icons-material/Add';

const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
    const [title, setTitle] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;
        onAddTask(title);
        setTitle("");
    }
    return (
        <div className="flex justify-center items-center mt-10 bg-white">
            <form onSubmit={handleSubmit}>
                <input type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="h-7 w-full border rounded-md p-4"
                        placeholder="Enter Task ..."
                        required
                />
                <button type="submit"
                        className="mt-2 bg-green-500 text-white cursor-pointer rounded-full hover:bg-blue-600 p-1">
                        <AddIcon />
                </button>
            </form>
        </div>
    )
}
export default React.memo(TaskForm);