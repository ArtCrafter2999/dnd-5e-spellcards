import React, { ReactNode } from "react";
import { allVariations, Variations } from "@/Filter/Variations";
import cn from "classnames";
import { PiSelectionInverseFill } from "react-icons/pi";

type Props = {
    filter: Variations
    setFilter: React.Dispatch<React.SetStateAction<Variations>>
    search: string
    setSearch: React.Dispatch<React.SetStateAction<string>>
}

const Filter = ({ filter, setFilter, search, setSearch }: Props) => {
    function handleCheck<K extends keyof Variations>(property: K, value: Variations[K][number]) {
        setFilter(prev => {
                if (!prev[property].includes(value as never))
                    return {
                        ...prev,
                        [property]: [...prev[property], value],
                    }
                else
                    return {
                        ...prev,
                        [property]: prev[property].filter(item => item !== value),
                    };
            },
        )
    }

    function handleInvert(property: keyof Variations) {
        const inverse = allVariations[property].filter(v => !filter[property].includes(v as never));
        setFilter(prev => ({
                ...prev,
                [property]: inverse,
            }),
        );
    }

    return (
        <div className="p-2">
            <input
                className="h-9 p-1 border-2 rounded w-full"
                type={"text"}
                value={search}
                onChange={e => setSearch(e.target.value)}
            />
            <FilterGroup name={"Клас"} filter={filter} property={"classes"} onCheck={handleCheck}
                         onInvert={handleInvert} />
            <FilterGroup name={"Рівень"} filter={filter} property={"levels"} onCheck={handleCheck}
                         onInvert={handleInvert} />
            <FilterGroup name={"Школа"} filter={filter} property={"schools"} onCheck={handleCheck}
                         onInvert={handleInvert} />
        </div>
    );
};

type ButtonProps = {
    children: ReactNode,
    check: () => void,
    isChecked: boolean
}

const FilterButton = ({ children, isChecked, check }: ButtonProps) => {
    return (
        <div
            onClick={check}
            className={cn(
                "p-2 px-4 bg-orange-100 rounded md:hover:bg-orange-400 border border-orange-400",
                isChecked && "bg-orange-300",
            )}>
            {children}
        </div>
    );
};


type GroupProps = {
    name: string,
    property: keyof Variations,
    filter: Variations,
    onCheck: <K extends keyof Variations>(property: K, value: Variations[K][number]) => void
    onInvert: (property: keyof Variations) => void
}

const FilterGroup = ({ name, property, filter, onInvert, onCheck }: GroupProps) => {
    return (
        <>
            <div className="flex justify-between items-center w-1/2 mt-3">
                <h1>{name}</h1>
                <PiSelectionInverseFill
                    className="cursor-pointer size-6 p-1 rounded bg-cyan-300 hover:bg-cyan-400"
                    onClick={() => onInvert(property)}
                />
            </div>
            <div className="flex flex-wrap">
                {allVariations[property].map(v =>
                    <FilterButton
                        key={v}
                        check={() => onCheck(property, v)}
                        isChecked={filter[property].includes(v as never)}
                    >
                        {v}
                    </FilterButton>,
                )}
            </div>
        </>
    )
}

export default Filter;