import filterVariations from "./filterVariations.json"

export interface Variations {
    schools: string[],
    classes: string[],
    levels: number[]
}
export const allVariations: Variations = filterVariations