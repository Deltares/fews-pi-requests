export function duplicates(keys: string[]): string[] {
    const duplicates = new Set<string>()
    const seen = new Set<string>();
    for (const key of keys) {
        if (seen.has(key)) {
            duplicates.add(key)
        } else {
            seen.add(key)
        }
    }
    return Array.from(duplicates)
}