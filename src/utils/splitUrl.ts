import { duplicates } from './duplicates'

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

export function splitUrl(url: URL, maxLength = 2000, parameter?: string): URL[] {
    if ( url.toString().length <= maxLength ) return [url]
    const baseUrl = new URL(url.toString())
    const split = parameter !== undefined ? parameter : mostFrequentParameter(url)
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