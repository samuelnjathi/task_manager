import React, { useState } from "react";
import { TaskFormProps } from "../types/definations";


const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
    const [inputTask, setInputTask] = useState({
        title: "",
        from: "",
        to: ""
    });
    
    const handleChange = (e: React.FormEvent) => {
        const { name, value } = e.target as HTMLInputElement;
        setInputTask((prev) => {
            return {
                ...prev,
                [name]: value
        }});
    }
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAddTask(inputTask);
        setInputTask({
            title: "",
            from: "",
            to: ""
        });
    }
    return (
        
            
            <form className="flex flex-col  justify-center " onSubmit={handleSubmit}>
                <div className="flex space-x-3">
                    <input type="text"
                            name="title"
                            value={inputTask.title}
                            onChange={handleChange}
                            className="h-7 w-full border rounded-md p-4"
                            placeholder="Enter Task ..."
                            required
                    />
                   
                </div>
                <div className="grid grid-cols-2 gap-4 mt-2">
                    <div>
                    <label className=" block font-semibold" htmlFor="from">From</label>
                    <input 
                        name="from"
                        value={inputTask.from}
                        onChange={handleChange}
                        className="border px-2 py-1 rounded-md w-full" 
                        aria-label="Time" 
                        type="time" />
                    </div>
                    <div>
                    <label className="block font-semibold" htmlFor="To">To</label>
                    <input 
                        name="to"
                        value={inputTask.to}
                        onChange={handleChange}
                        className="border px-2 py-1 rounded-md w-full" 
                        aria-label="Time" 
                        type="time" />
                    </div>
                </div>
                <button type="submit"
                    className="bg-green-500 text-white cursor-pointer rounded-full hover:bg-green-600 p-1 mt-3">
                    Add Task 
                </button>
            </form>
   
    )
}
export default React.memo(TaskForm);