import React from "react";
import TaskCard from "./TaskCard";
import { TaskListProps } from "../types/definations";
import { motion, AnimatePresence } from "framer-motion";
import { Reorder } from "framer-motion";

const TaskList: React.FC<TaskListProps> = ({tasks, onDeleteTask, onToggleTask, onEditTask}) => {
return (
    <ul className="mt-10">
        <AnimatePresence>
            <Reorder.Group axis="y" values={tasks} onReorder={() => {}} className="mt-3">
            {tasks.map((task) => (
            <motion.li
                key={task.id}
                initial={{opacity: 0, x: -50}}
                animate={{opacity: 1, x: 0}}
                exit={{opacity: 0, x:50}}
                transition={{duration: 0.3}}
            >
                <TaskCard task={task} key={task.id} onDeleteTask={onDeleteTask} onEditTask={onEditTask} onToggleTask={onToggleTask} />
            </motion.li>
            ))}
            </Reorder.Group>
        </AnimatePresence>
        
    </ul>
)

}

export default React.memo(TaskList)