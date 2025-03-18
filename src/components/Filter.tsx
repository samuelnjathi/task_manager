import React from "react";
import { FilterProps } from "../types/definations";

const Filter: React.FC<FilterProps> = ({filter, setFilter}) => {
    return (
        <div className="flex justify-center items-center mt-5">
            <button onClick={() => setFilter("all")} className={`mr-2 cursor-pointer ${filter === "all" ? "font-bold" : ""}`}>All</button>
            <button onClick={() => setFilter("pending")} className={`mr-2 cursor-pointer ${filter === "pending" ? "font-bold" : ""}`}>Pending</button>
            <button onClick={() => setFilter("completed")} className={`mr-2 cursor-pointer ${filter === "completed" ? "font-bold" : ""}`}>completed</button>
        </div>
    )
}
export default React.memo(Filter)