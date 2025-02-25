export function duplicates(keys: string[]): Map<string, number> {
    const duplicates = new Map<string, number>()
    keys.forEach(key => {
        const frequency = duplicates.get(key) ?? 0
        duplicates.set(key, frequency + 1)
    })
    return duplicates
}
