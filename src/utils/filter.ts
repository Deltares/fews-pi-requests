function filterArgToStrings(key: string, value: any ): string[] {
    const result: string[] = []
    if (value instanceof Array) {
        for (const item of value) {
            result.push(`${key}=${encodeURIComponent(item)}`)
        }
    } else {
        result.push(`${key}=${encodeURIComponent(value)}`)
    }
    return result
}

export function filterToParams(filter: object ): string {
    const filterArgs: string[] = []
    for (const [parameter, values] of Object.entries(filter)) {
        if (values === undefined) continue
        if ( parameter === 'attribute') {
            for (const [key, value] of Object.entries(values)) {
                const strings = filterArgToStrings(`${parameter}(${key})`, value)
                filterArgs.push(...strings)
            }
        } else if ( parameter === 'qualifierIds') {
            for (const [key, value] of Object.entries(values)) {
                const strings = filterArgToStrings(`${parameter}=${key}`, value)
                filterArgs.push(...strings)
            }
        } else {
            const strings = filterArgToStrings(parameter, values)
            filterArgs.push(...strings)
        }
    }
    return filterArgs.length ? '?' + filterArgs.join('&') : ''
}