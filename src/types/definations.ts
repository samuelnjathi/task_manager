export type Task = {
    id: string
    title: string;
    from: string;
    to: string;
    completed: boolean;
}

export interface TaskFormProps {
    onAddTask: (task: { title: string; from: string; to: string }) => void;
};

export interface TaskListProps {
    tasks: Task[];
    onDeleteTask: (id: string) => void;
    onToggleTask: (id: string) => void;
    onEditTask: (id: string, newTask: {title: string; from: string; to: string}) => void;
}
export interface TaskItemProps {
    task: Task;
    onDeleteTask: (id: string) => void;
    onToggleTask: (id: string) => void;
    onEditTask: (id: string, newTask: {title: string; from: string; to: string}) => void;
}
export interface FilterProps {
    filter: "all" | "pending" | "completed";
    setFilter: (filter: "all" | "pending" | "completed") => void;
}