import React, { ReactNode, useState } from "react";
import Counter from "@/Checkbox/Counter";
import { Spell, spells } from "@/Spells/Spells";
import TableRow from "@/Table/TableRow";
import { FaSortAlphaDown, FaSortAlphaUp, FaSortNumericDown, FaSortNumericUp } from "react-icons/fa";

type Props = {
    children: (spell: Spell) => ReactNode;
    spells: Spell[];
    modifyAll: (modifier: number) => void;
}

const Table = ({ children, spells, modifyAll }: Props) => {
    const [sortBy, setSortBy] = useState<(keyof Spell) | undefined>("level");
    const [isAsc, setAsc] = useState<boolean>(true);

    function handleSort(col: keyof Spell) {
        if (sortBy === col) setAsc(prev => !prev)
        else setSortBy(col);
    }

    const sortedSpells = sortBy ? spells.toSorted((a, b) =>
        isAsc ? (a[sortBy] > b[sortBy] ? 1 : -1) : (a[sortBy] < b[sortBy] ? 1 : -1)
    ) : spells;

    return (
        <table>
            <thead>
            <tr className="[&>th]:px-2 [&>th]:border">
                <th><Counter onChange={modifyAll}/></th>
                <SortHeader setSortBy={handleSort} property={"level"} sortBy={sortBy} isAsc={isAsc}>Рівень</SortHeader>
                <SortHeader setSortBy={handleSort} property={"name"} sortBy={sortBy} isAsc={isAsc}>Назва</SortHeader>
                <SortHeader setSortBy={handleSort} property={"school"} sortBy={sortBy} isAsc={isAsc}>Школа</SortHeader>
                <th>Класи</th>
            </tr>
            </thead>
            <tbody>
            {sortedSpells.map(children)}
            </tbody>
        </table>
    );
};

type SHProps = {
    sortBy?: keyof Spell;
    isAsc: boolean;
    children: ReactNode;
    property: keyof Spell
    setSortBy: (k: keyof Spell) => void;
}

const SortHeader = ({ children, sortBy, property, setSortBy, isAsc }: SHProps) => {
    const SortIcon = sortBy && typeof spells[0][sortBy] === 'number'
        ? (isAsc ? FaSortNumericDown : FaSortNumericUp)
        : (isAsc ? FaSortAlphaDown : FaSortAlphaUp);

    return (
        <th onClick={() => setSortBy(property)} className="hover:bg-gray-200">
            {children}
            {sortBy === property && <SortIcon/>}
        </th>
    );
};

export default Table;