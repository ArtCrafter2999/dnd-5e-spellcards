import allSpells from "./allSpells.json"

export interface Spell {
    index: number
    name: string;
    nameEng: string;
    school: string;
    level: number;
    classes: string[];
    castTime: string;
    range: string;
    ritual: boolean
    components: string;
    duration: string;
    text: string;
    url: string;
}

export const spells: Spell[] = allSpells.map((s,index) => ({...s, index}))