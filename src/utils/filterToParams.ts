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
    if (Array.isArray(value)) {
        for (const item of value) {
            result.push(`${encodeURIComponent(key)}=${encodeURIComponent(item)}`)
        }
    } else {
        result.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    }
    return result
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function pushAttributeOrPropertiesArgs(
    parameter: 'attribute' | 'properties',
    values: unknown,
    filterArgs: string[]
): boolean {
    if (!isPlainObject(values)) return false

    const prefixMap = {
        attribute: 'attribute',
        properties: 'property'
    } as const
    const prefix = prefixMap[parameter]

    for (const [key, value] of Object.entries(values)) {
        filterArgs.push(...filterArgToStrings(`${prefix}(${key})`, `${value}`))
    }
    return true
}

function pushQualifierIdsArgs(values: unknown, filterArgs: string[]): boolean {
    if (!isPlainObject(values)) return false

    for (const [key, value] of Object.entries(values)) {
        filterArgs.push(...filterArgToStrings('qualifierIds', `${key}=${value}`))
    }
    return true
}

function pushBboxArgs(values: unknown, filterArgs: string[]): boolean {
    if (!Array.isArray(values) || values.length !== 4) {
        throw new Error('bbox parameter must be an array of four numbers')
    }

    const bboxValue = `${encodeURIComponent(values[0])},${encodeURIComponent(values[1])},${encodeURIComponent(values[2])},${encodeURIComponent(values[3])}`
    filterArgs.push(...filterArgToStrings('bbox', bboxValue))
    return true
}

type SpecialParameterHandler = (values: unknown, filterArgs: string[]) => boolean

const specialParameterHandlers: Record<string, SpecialParameterHandler> = {
    attribute: (values, filterArgs) => pushAttributeOrPropertiesArgs('attribute', values, filterArgs),
    properties: (values, filterArgs) => pushAttributeOrPropertiesArgs('properties', values, filterArgs),
    qualifierIds: pushQualifierIdsArgs,
    bbox: pushBboxArgs
}

export function filterToParams(filter: object ): string {
    const filterArgs: string[] = []
    for (const [parameter, values] of Object.entries(filter)) {
        if (values === undefined) continue

        const handler = specialParameterHandlers[parameter]
        if (handler?.(values, filterArgs)) continue

        filterArgs.push(...filterArgToStrings(parameter, values))
    }
    return filterArgs.length ? '?' + filterArgs.join('&') : ''
}

