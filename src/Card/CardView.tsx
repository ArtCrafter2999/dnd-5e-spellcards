"use client"
import { Spell } from "@/Spells/Spells";
import React, { ReactNode, useEffect, useLayoutEffect, useRef, useState } from "react";
import cn from "classnames";

type Props = {
    spell: Spell
    appendPage?: (spell: Spell, left: number) => void
}

const CardView = ({ spell, appendPage }: Props) => {
    const [isBig, setBig] = useState<boolean>(false);
    const ref = useRef<HTMLDivElement>(null);
    useLayoutEffect(() => {
        if(ref.current) {
            appendPage?.(spell, ref.current?.offsetLeft)
            if(ref.current.clientHeight > 1124){
                setBig(true)
            }
        }
    }, []);
    return (
        <div ref={ref} style={isBig? {width: "24rem"}: undefined} className="h-fit w-64 px-4 pt-1 shrink-0 border-black border m-1 rounded relative">
            <div className="flex">
                <Field className="flex-1 text-start p-0 border-none">
                    <p className="text-xs text-black/50">[{spell.nameEng}]</p>
                </Field>
                <Field className="flex-1 text-end p-0 border-none">
                    <p className="text-xs text-black/50">{spell.school}</p>
                </Field>
            </div>
            <div className="flex">
                <Field className="flex-1 text-center p-2 relative">
                    <h1 className="text-sm h-full">{spell.name}</h1>

                </Field>
                <Field className="w-10 text-center">
                    <h1 className="text-lg font-semibold">{spell.level}</h1>
                </Field>
            </div>
            <Field className="flex-1 text-center">
                <h2 className="text-sm">{spell.castTime}{spell.ritual? " (Рітуал)": ""}</h2>
            </Field>
            <div className="flex mt-1">
                <Field className="flex-1 text-center">
                    <h2 className="text-sm">{spell.duration}</h2>
                </Field>
                <Field className="text-center">
                    <h2 className="text-sm">{spell.range}</h2>
                </Field>
            </div>

            <Field className="text-center mt-1">
                <h3 className="text-xs">{spell.components}</h3>
            </Field>
            <Field className="my-3">
                <div className="text-xs [&>p]:mb-2"
                    dangerouslySetInnerHTML={{__html: spell.text}}/>
            </Field>
        </div>
    );
};

type FieldProps = {
    children: ReactNode
    className?: string;
}

const Field = ({ children, className }: FieldProps) => {
    return (
        <div className={cn("p-1 border border-black rounded m-0.5", className)}>
            {children}
        </div>
    );
};
export default CardView;