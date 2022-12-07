function filterArgToStrings(key: string, value: any ): string[] {
    const result: string[] = []
    if (value instanceof Array) {
        for (const item of value) {
            result.push(`${encodeURIComponent(key)}=${encodeURIComponent(item)}`)
        }
    } else {
        result.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
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
                const strings = filterArgToStrings(`${parameter}`,`${key}=` + value)
                filterArgs.push(...strings)
            }
        } else if (parameter === 'bbox') {
            const value = `${encodeURIComponent(values[0])},${encodeURIComponent(values[1])},${encodeURIComponent(values[2])},${encodeURIComponent(values[3])}`
            const strings = filterArgToStrings(parameter, value)
            filterArgs.push(...strings)
        } else {
            const strings = filterArgToStrings(parameter, values)
            filterArgs.push(...strings)
        }
    }
    return filterArgs.length ? '?' + filterArgs.join('&') : ''
}