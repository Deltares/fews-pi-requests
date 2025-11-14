type EncodeURIComponentArgs = Parameters<typeof encodeURIComponent>

/**
 * Converts a filter object into a URL query parameter string.
 * 
 * Handles special cases for different parameter types:
 * - `attribute` and `properties`: Converted to parameterized format (e.g., `attribute(key)=value`)
 * - `qualifierIds`: When passed as an object, formats as `qualifierIds=key=value`
 * - `bbox`: Concatenates array values with commas
 * - Other parameters: Standard key-value encoding
 * 
 * @param filter - An object containing filter parameters and their values
 * @returns A URL query string starting with '?' if parameters exist, otherwise an empty string
 * 
 * @example
 * ```typescript
 * filterToParams({ locationIds: ['A', 'B'], attribute: { color: 'red' } })
 * // Returns: "?locationIds=A&locationIds=B&attribute(color)=red"
 * ```
 */
function filterArgToStrings(key: string, value: EncodeURIComponentArgs[0] | EncodeURIComponentArgs[0][] ): string[] {
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
        if ( parameter === 'attribute' || parameter === 'properties') {
            const prefixMap = {
                'attribute': 'attribute',
                'properties': 'property'
            }
            const prefix = prefixMap[parameter]
            for (const [key, value] of Object.entries(values)) {
                const strings = filterArgToStrings(`${prefix}(${key})`, `${value}`)
                filterArgs.push(...strings)
            }
        } else if (
          parameter === "qualifierIds" &&
          typeof values === "object" &&
          !Array.isArray(values)
        ) {
            for (const [key, value] of Object.entries(values)) {
                const strings = filterArgToStrings(`${parameter}`,`${key}=` + value)
                filterArgs.push(...strings)
            }
        } else if (parameter === 'bbox') {
            if (!(values instanceof Array) || values.length !== 4) {
                throw new Error('bbox parameter must be an array of four numbers')
            }
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

