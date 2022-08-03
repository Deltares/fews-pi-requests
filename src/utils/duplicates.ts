export function duplicates(keys: string[]): Map<string, number> {
    const duplicates = new Map<string, number>()
    const seen = new Set<string>();
    for (const key of keys) {
        if (seen.has(key)) {
            let frequency = duplicates.get(key)
            if (frequency === undefined) frequency = 0 
            duplicates.set(key, frequency++ )
        } else {
            seen.add(key)
        }
    }
    return duplicates
}