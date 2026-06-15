type EncodeURIComponentArgs = Parameters<typeof encodeURIComponent>

/**
 * Converts a filter object into a URL query parameter string.
 *
 * Handles special cases for different parameter types:
 * - `attribute` and `properties`: Converted to parameterized format (e.g., `attribute(key)=value`)
 * - `qualifierIds`: When passed as an object, formats as `qualifierIds=key=value`
 * - `bbox`: Concatenates array values with commas
 * - Other parameters: Standard key-value encoding. Arrays are either repeated
 *   (`param=a&param=b`) or comma-joined (`param=a%2Cb`) depending on `explodeQueryParameters`.
 *
 * @param filter - An object containing filter parameters and their values
 * @param explodeQueryParameters - Controls how array values are serialized
 * @returns A URL query string starting with '?' if parameters exist, otherwise an empty string
 *
 * @example
 * ```typescript
 * filterToParams({ locationIds: ['A', 'B'], attribute: { color: 'red' } })
 * // Returns: "?locationIds=A&locationIds=B&attribute(color)=red"
 * ```
 */
function filterArgToStrings(key: string, value: EncodeURIComponentArgs[0] | EncodeURIComponentArgs[0][], explodeQueryParameters: boolean): string[] {
    const result: string[] = []
    if (Array.isArray(value)) {
        if (explodeQueryParameters) {
            for (const item of value) {
                result.push(`${encodeURIComponent(key)}=${encodeURIComponent(item)}`)
            }
        } else {
            result.push(`${encodeURIComponent(key)}=${encodeURIComponent(value.join(','))}`)
        }
    } else {
        result.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    }
    return result
}

function isAttributeOrProperties(parameter: string): parameter is 'attribute' | 'properties' {
    return parameter === 'attribute' || parameter === 'properties'
}

function appendAttributeOrProperties(
    filterArgs: string[],
    parameter: 'attribute' | 'properties',
    values: unknown
): void {
    const prefixMap = {
        attribute: 'attribute',
        properties: 'property'
    } as const
    const prefix = prefixMap[parameter]
    for (const [key, value] of Object.entries(values as object)) {
        const strings = filterArgToStrings(`${prefix}(${key})`, `${value}`, true)
        filterArgs.push(...strings)
    }
}

function isQualifierIdsObject(parameter: string, values: unknown): boolean {
    return parameter === 'qualifierIds' && typeof values === 'object' && !Array.isArray(values)
}

function appendQualifierIds(filterArgs: string[], values: object): void {
    for (const [key, value] of Object.entries(values)) {
        const strings = filterArgToStrings('qualifierIds', `${key}=${value}`, true)
        filterArgs.push(...strings)
    }
}

function appendBbox(filterArgs: string[], values: unknown): void {
    if (!(Array.isArray(values)) || values.length !== 4) {
        throw new Error('bbox parameter must be an array of four numbers')
    }
    const value = `${encodeURIComponent(values[0])},${encodeURIComponent(values[1])},${encodeURIComponent(values[2])},${encodeURIComponent(values[3])}`
    const strings = filterArgToStrings('bbox', value, true)
    filterArgs.push(...strings)
}

export function filterToParams(filter: object, explodeQueryParameters = true): string {
    const filterArgs: string[] = []
    for (const [parameter, values] of Object.entries(filter)) {
        if (values === undefined) continue

        if (isAttributeOrProperties(parameter)) {
            appendAttributeOrProperties(filterArgs, parameter, values)
            continue
        }

        if (isQualifierIdsObject(parameter, values)) {
            appendQualifierIds(filterArgs, values as object)
            continue
        }

        if (parameter === 'bbox') {
            appendBbox(filterArgs, values)
            continue
        }

        const strings = filterArgToStrings(parameter, values as EncodeURIComponentArgs[0] | EncodeURIComponentArgs[0][], explodeQueryParameters)
        filterArgs.push(...strings)
    }
    return filterArgs.length ? '?' + filterArgs.join('&') : ''
}

