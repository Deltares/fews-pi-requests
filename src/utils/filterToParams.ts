export type QueryParamsStrategy = 'repeat-params' | 'comma-separated-values'

type EncodeURIComponentArgs = Parameters<typeof encodeURIComponent>

/**
 * Converts a filter object into a URL query parameter string.
 * 
 * Handles special cases for different parameter types:
 * - `attribute` and `properties`: Converted to parameterized format (e.g., `attribute(key)=value`)
 * - `qualifierIds`: When passed as an object, formats as `qualifierIds=key=value`
 * - `bbox`: Concatenates array values with commas
 * - Other parameters: Standard key-value encoding. Arrays are either repeated
 *   (`param=a&param=b`) or comma-joined (`param=a%2Cb`) depending on `queryParamsStrategy`.
 * 
 * @param filter - An object containing filter parameters and their values
 * @param queryParamsStrategy - Controls how array values are serialized (default: 'repeat-params')
 * @returns A URL query string starting with '?' if parameters exist, otherwise an empty string
 * 
 * @example
 * ```typescript
 * filterToParams({ locationIds: ['A', 'B'], attribute: { color: 'red' } })
 * // Returns: "?locationIds=A&locationIds=B&attribute(color)=red"
 * ```
 */
function filterArgToStrings(key: string, value: EncodeURIComponentArgs[0] | EncodeURIComponentArgs[0][], queryParamsStrategy: QueryParamsStrategy = 'repeat-params'): string[] {
    const result: string[] = []
    if (Array.isArray(value)) {
        if (queryParamsStrategy === 'comma-separated-values') {
            result.push(`${encodeURIComponent(key)}=${encodeURIComponent(value.join(','))}`)
        } else {
            for (const item of value) {
                result.push(`${encodeURIComponent(key)}=${encodeURIComponent(item)}`)
            }
        }
    } else {
        result.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    }
    return result
}

export function filterToParams(filter: object, queryParamsStrategy: QueryParamsStrategy = 'repeat-params'): string {
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
            if (!(Array.isArray(values)) || values.length !== 4) {
                throw new Error('bbox parameter must be an array of four numbers')
            }
            const value = `${encodeURIComponent(values[0])},${encodeURIComponent(values[1])},${encodeURIComponent(values[2])},${encodeURIComponent(values[3])}`
            const strings = filterArgToStrings(parameter, value)
            filterArgs.push(...strings)
        } else {
            const strings = filterArgToStrings(parameter, values, queryParamsStrategy)
            filterArgs.push(...strings)
        }
    }
    return filterArgs.length ? '?' + filterArgs.join('&') : ''
}

