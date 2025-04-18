import React, { useCallback, useEffect, useMemo, useState } from "react";
import TaskForm from "./TaskForm";
import { Task } from "../types/definations";
import { v4 as uuidv4 } from "uuid";
import Filter from "./Filter";
import TaskList from "./TaskList";
import { Reorder } from "framer-motion";

const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

 const TaskManager: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>(() => {
        try {
            const tasks = localStorage.getItem("tasks");
            return tasks ? JSON.parse(tasks) : [];
        } catch (error) {
            console.error("Error reading tasks from local storage", error);
            return [];
        }
    });
    const [filter, setFilter] = useState<"all" | "pending" | "completed">("all");

    useEffect(() => {
        try {
            localStorage.setItem('tasks', JSON.stringify(tasks)) 
        } catch (error) {
            console.error("Error writing tasks to local storage")
        }
    }, [tasks])

    const addTask = useCallback(({ title, from, to }: { title: string; from: string; to: string }) => {
        setTasks((prev) =>  [...prev, {id: uuidv4(), title, from, to, completed: false}]);
    }, []);

    const toggleTask = useCallback((id: string) => {
        setTasks((prev) => 
            prev.map((task) => 
                task.id === id ? {...task, completed: !task.completed } : task
            )
        )
    }, []);

    const editTask = useCallback((id: string, newTask: { title: string; from: string; to: string }) => {
        setTasks((prev) =>
            prev.map((task) => 
                task.id === id ? {...task, ...newTask } : task))
    }, [])

    const deleteTask = useCallback((id: string) => {
        setTasks((prev) => prev.filter((task) => task.id !== id));
    }, []);

    const filteredTasks = useMemo(() => {
        if (filter === "completed") return tasks.filter((task) => task.completed);
        if (filter === "pending") return tasks.filter((task) => !task.completed);
        return tasks;
    }, [tasks, filter])

return (
    <div className="flex flex-col max-w-md mx-auto p-4 bg-white bg-opacity-50 shadow-2xl rounded-lg my-12">
        <h2 className="text-xl font-bold mb-4 text-center">{weekday[new Date().getDay()]}'s  Schedule</h2>
        <TaskForm onAddTask={addTask}  />
        <Filter filter={filter} setFilter={setFilter} />
        <Reorder.Group axis="y" values={tasks} onReorder={setTasks}>
            <TaskList tasks={filteredTasks} onDeleteTask={deleteTask} onToggleTask={toggleTask} onEditTask={editTask}/>
        </Reorder.Group>
        
       
    </div>
)
}
export default React.memo(TaskManager)