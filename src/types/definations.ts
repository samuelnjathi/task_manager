export type Task = {
    id: string
    title: string;
    completed: boolean;
}
export interface TaskFormProps {
    onAddTask: (title: string) => void;
};

export interface TaskListProps {
    tasks: Task[];
    onDeleteTask: (id: string) => void;
    onToggleTask: (id: string) => void;
    onEditTask: (id: string, newTitle: string) => void;
}
export interface TaskItemProps {
    task: Task;
    onDeleteTask: (id: string) => void;
    onToggleTask: (id: string) => void;
    onEditTask: (id: string, newTitle: string) => void;
}
export interface FilterProps {
    filter: "all" | "pending" | "completed";
    setFilter: (filter: "all" | "pending" | "completed") => void;
}