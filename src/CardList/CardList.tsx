'use client'
import React, { useEffect, useState } from "react";
import { Spell, spells } from "@/Spells/Spells";
import CardView from "@/Card/CardView";

type Props = {
    spells: Spell[]

}

const CardList = ({ spells }: Props) => {
    const [pagination, setPagination] = useState<{ spell: Spell, page: number }[]>([]);

    function appendPage(spell: Spell, left: number) {
        const page = Math.floor(left / 795);
        setPagination(prev => {
            return [...prev, { spell, page }]
        });
    }

    if (pagination.length > 0) {
        const arrayOfArrays:Spell[][] = [];
        pagination.forEach(p => {
            arrayOfArrays[p.page] || arrayOfArrays.push([])
            arrayOfArrays[p.page].push(p.spell)
        })
        return arrayOfArrays.map((page, i) =>
            <div key={i} className="flex flex-col flex-wrap w-[795px] h-[1124px] overflow-hidden">
                {page.map(s =>
                    <CardView key={s.nameEng} spell={s} />,
                )}
            </div>
        )
    }
    return (
        <main className="flex flex-col flex-wrap max-w-[795px] max-h-[1120px] overflow-hidden">
            {spells.sort((s1, s2) => s1.text.length - s2.text.length).map(s =>
                <CardView key={s.nameEng} spell={s} appendPage={appendPage} />,
            )}
        </main>
    )
};

export default CardList;