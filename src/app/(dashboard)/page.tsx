'use client'
import React, { useState } from "react";
import Table from "@/Table/Table";
import { Spell, spells } from "@/Spells/Spells";
import TableRow from "@/Table/TableRow";
import { FaFilter, FaPrint } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { allVariations, Variations } from "@/Filter/Variations";
import Filter from "@/Filter/Filter";
import cn from "classnames";

const Page = (uriComponent: string | number | boolean) => {
    const [selectedSpells, setSelectedSpells] = useState<{[i: number]: number }>({ });
    const [filter, setFilter] = useState<Variations>(allVariations);
    const [search, setSearch] = useState<string>("");
    const [isFilterOpen, setFilterOpen] = useState<boolean>(false);


    function filterSpells(s: Spell) {
        return filter.classes.some(c => s.classes.includes(c)) &&
            filter.schools.includes(s.school) &&
            filter.levels.includes(s.level) &&
            (
                !search
                || s.name.toLowerCase().includes(search.toLowerCase())
                || s.nameEng.toLowerCase().includes(search.toLowerCase())
            )
    }

    const filteredSpells = spells.filter(filterSpells);

    const router = useRouter();

    function modifyOne(copy: {[i: number]:number}, index: number,  modifier: number) {
        if((copy[index] ?? 0) + modifier >= 0)
            copy[index] = (copy[index] ?? 0) + modifier;
        else
            delete copy[index]
    }

    function handleModify(index: number, modifier: number) {
        setSelectedSpells(prev => {
            const copy = {...prev}
            modifyOne(copy, index, modifier)
            return copy
        })
    }

    function modifyAll(modifier: number) {
        setSelectedSpells(prev => {
            const copy = { ...prev }
            filteredSpells.forEach(s =>
                modifyOne(copy, s.index, modifier)
            );
            return copy;
        })
    }

    function handlePrint() {
        window.open('/print?spells='+ encodeURIComponent(JSON.stringify(selectedSpells)), '_blank');
        // router.push("/print?spells=" + encodeURIComponent(JSON.stringify(selectedSpells)))
    }

    return (
        <div className="md:flex select-none">
            <div className="md:w-64">
                <section className={cn(
                    "md:w-64 md:h-screen md:fixed md:block",
                    isFilterOpen || "hidden"
                )}>
                    <Filter filter={filter} setFilter={setFilter} search={search} setSearch={setSearch} />
                </section>
            </div>
            <main>
                <div className="mx-2 md:ml-32 lg:mr-32">
                    <div className="flex justify-between mx-2 md:mx-0">
                        <div className="flex items-center">
                            <FaPrint
                                className="bg-green-500 hover:bg-green-700 text-white size-10 p-2 rounded border my-4"
                                onClick={handlePrint}
                            />
                            <span className="ml-2">{Object.values(selectedSpells).reduce((s, p) => s+p, 0)} Карток буде надруковано</span>
                        </div>
                        <FaFilter
                            className={cn(
                                "text-white size-10 p-2 rounded border border-orange-400 md:ml-32 my-4 md:hidden",
                                isFilterOpen ? "bg-orange-200" : "bg-orange-400",
                            )}
                            onClick={() => setFilterOpen(prev => !prev)}
                        />
                    </div>
                    <Table modifyAll={modifyAll} spells={filteredSpells}>
                        {
                            (s) =>
                                <TableRow
                                    modify={handleModify}
                                    selected={selectedSpells}
                                    key={s.index}
                                    spell={s} />
                        }
                    </Table>
                </div>
            </main>
        </div>
    );
};

export default Page;