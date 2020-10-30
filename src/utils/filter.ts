function filterArgToStrings(key: string, value: any): string[] {
    const result: string[] = []
    if (value.constructor === Array) {
        for (const item of value) {
            result.push(`${key}=${encodeURIComponent(item)}`)
        }
    } else {
        result.push(`${key}=${encodeURIComponent(value)}`)
    }
    return result
}

export function filterToParams(filter: Record < string, any > ): string {
    const filterArgs: any[] = []
    for (const [key, value] of Object.entries(filter)) {
        if (value === undefined) continue
        const strings = filterArgToStrings(key, value)
        filterArgs.push(...strings)
    }
    return filterArgs.length ? '?' + filterArgs.join('&') : ''
}