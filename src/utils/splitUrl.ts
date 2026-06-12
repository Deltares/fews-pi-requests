import { duplicates } from './duplicates.js'
import type { QueryParamsStrategy } from './filterToParams.js'

function mostFrequentParameter(url: URL): string {
    const duplicateEntries = duplicates(Array.from(url.searchParams.keys()))
    const keys = Array.from(duplicateEntries.keys())
    let max = 0
    let split = keys[0]
    for (const [key, value] of duplicateEntries) {
        if ( value > max) {
            max = value
            split = key
        }
    }
    return split
}


export function mostValuesParameter(url: URL): string {
    let max = 0
    let split = ''
    for (const [key, value] of url.searchParams.entries()) {
        const count = value.split(',').length
        if (count > max) {
            max = count
            split = key
        }
    }
    return split
}

export function splitUrl(url: URL, maxLength = 2000, parameter?: string, queryParamsStrategy: QueryParamsStrategy = 'repeat-params'): URL[] {
    if ( url.toString().length <= maxLength ) return [url]
    const baseUrl = new URL(url.toString())
    if (queryParamsStrategy === 'comma-separated-values') {
        const split = parameter ?? mostValuesParameter(url)
        baseUrl.searchParams.delete(split)
        const serializedValue = url.searchParams.get(split) ?? ''
        const values = serializedValue.split(',')
        const urls: URL[] = []
        let chunk: string[] = []

        for (const value of values) {
            const nextChunk = [...chunk, value]
            const nextUrl = new URL(baseUrl.toString())
            nextUrl.searchParams.set(split, nextChunk.join(','))

            if (nextUrl.toString().length > maxLength) {
                if (chunk.length === 0) {
                    throw new Error(`Cannot split url by query parameter '${split}' to be shorter than ${maxLength} <= ${nextUrl.toString()}.`)
                }
                const currentUrl = new URL(baseUrl.toString())
                currentUrl.searchParams.set(split, chunk.join(','))
                urls.push(currentUrl)
                chunk = [value]

                const singleUrl = new URL(baseUrl.toString())
                singleUrl.searchParams.set(split, value)
                if (singleUrl.toString().length > maxLength) {
                    throw new Error(`Cannot split url by query parameter '${split}' to be shorter than ${maxLength} <= ${singleUrl.toString()}.`)
                }
                continue
            }
            chunk = nextChunk
        }

        const finalUrl = new URL(baseUrl.toString())
        finalUrl.searchParams.set(split, chunk.join(','))
        urls.push(finalUrl)
        return urls
    }

    const split = parameter ?? mostFrequentParameter(url)
    baseUrl.searchParams.delete(split)
    const urls: URL[] = []
    let newUrl = new URL(baseUrl.toString())
    for (const value of url.searchParams.getAll(split) ) {
        if ( newUrl.toString().length + split.length + value.length + 2 > maxLength ) {
            urls.push(new URL(newUrl.toString()))
            newUrl = new URL(baseUrl.toString())
        }
        newUrl.searchParams.append(split, value)
        if ( newUrl.toString().length > maxLength ) {
            throw new Error(`Cannot split url by query parameter '${split}' to be shorter than ${maxLength} <= ${newUrl.toString()}.`)
        }
    }
    urls.push(newUrl)
    return urls
}