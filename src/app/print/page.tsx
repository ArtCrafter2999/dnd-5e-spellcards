import CardList from "@/CardList/CardList";
import { spells } from "@/Spells/Spells";

type Params = {
    spells: string
    same?: boolean
}

export default function Home({ searchParams: { spells: spellsJson = "{}", same = false } }: SearchParams<Params>) {
    const obj = JSON.parse(spellsJson) as { [i: number]: number }
    const array = []
    for (const key in obj) {
        for (let i = 0; i < obj[key]; i++) {
            array.push(spells[key])
        }
    }
    return <CardList spells={array} />
}
