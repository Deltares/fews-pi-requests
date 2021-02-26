import { duplicates } from './array'

export function requestJson<T>(url: URL): Promise<T> {
    const xhr = new XMLHttpRequest()
    const promise = new Promise((resolve, reject) => {
        xhr.open('GET', url.href)

        xhr.onload = function (this: XMLHttpRequest): any {
            if (this.status >= 200 && this.status < 300) {
                const json = JSON.parse(this.responseText)
                resolve(json)
            } else {
                reject(new Error(this.statusText))
            }
        }
        xhr.onerror = function (this: XMLHttpRequest): any {
            reject(new Error(this.statusText))
        }
        xhr.send()
    })
    return promise as Promise<T>
}

export function splitUrl(url: URL, maxLength = 2000, byKey?: string): URL[] {
    if ( url.toString().length <= maxLength ) return [url]
    const duplicateEntries = duplicates(Array.from(url.searchParams.keys()))
    const keys = Array.from(duplicateEntries.keys())
    const baseUrl = new URL(url.toString())
    // delete duplicate keys from url
    let split = byKey
    if ( split === undefined) {
        let max = 0
        split = keys[0]
        for (const [key, value] of duplicateEntries) {
            if ( value > max) {
                max = value
                split = key
            }
        }
    }
    baseUrl.searchParams.delete(split)
    const urls: URL[] = []
    let newUrl = new URL(baseUrl.toString())
    for (const value of url.searchParams.getAll(split) ) {
        if ( newUrl.toString().length + split.length + value.length + 2 > maxLength ) {
            urls.push(new URL(newUrl.toString()))
            newUrl = new URL(baseUrl.toString())
        }
        newUrl.searchParams.append(split, value)
    }
    urls.push(newUrl)
    return urls
}