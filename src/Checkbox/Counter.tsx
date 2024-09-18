import React from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { Variations } from "@/Filter/Variations";

type Props = {
    value?: number
    onChange: (v: number) => void;
}

const Counter = ({ value, onChange }: Props) => {
    function handlePlus() {
        onChange(+1);
    }
    function handleMinus() {
        onChange(-1);
    }
    return (
        <div className="flex [&>*]:size-6 [&>*]:rounded items-center">
            <FaMinus onClick={handleMinus} className="flex-1 bg-violet-300 p-2" />
            <div className="flex-1 flex justify-center items-center px-1 text-lg">
                {value}
            </div>
            <FaPlus onClick={handlePlus} className="flex-1 bg-cyan-300 p-2" />
        </div>
    )
};

export default Counter;