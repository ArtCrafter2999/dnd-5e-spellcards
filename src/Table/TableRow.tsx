import React from "react";
import { Spell } from "@/Spells/Spells";
import Counter from "@/Checkbox/Counter";

type Props = {
    spell: Spell
    selected: { [i: number]: number }
    modify: (index: number, modifier: number) => void
}

const TableRow = ({ spell, selected, modify }: Props) => {
    return (
        <tr className="[&>td]:px-2 [&>td]:border">
            <td>
                <Counter
                    value={selected[spell.index] ?? 0}
                    onChange={value => modify(spell.index, value)}/>
            </td>
            <td className="text-center">{spell.level}</td>
            <td><a href={spell.url} target="_blank" rel="noopener noreferrer">{spell.name}</a></td>
            <td>{spell.school}</td>
            <td>{spell.classes.join(', ')}</td>
        </tr>
    );
};

export default TableRow;