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

function addSearchParam(url: URL, params: URLSearchParams, keys: string[], i: number): void {
    const key = keys[i]
    if (i === keys.length - 1) {
        for (const value of url.searchParams.getAll(key)) {
            params.append(key, value)
        }
    } else {
        for (const value of url.searchParams.getAll(key)) {
            params.append(key, value)
            addSearchParam(url, params, keys, i + 1)
        }
    }
}

export function splitUrl(url: URL): URL[] {
    const keys = duplicates(Array.from(url.searchParams.keys()))
    const baseUrl = new URL(url.toString())
    for (const key of keys) {
      baseUrl.searchParams.delete(key)
    }
    const urls = url.searchParams.getAll(keys[0]).map((value) => {
        const url = new URL(baseUrl.toString())
        url.searchParams.append(keys[0], value)
        addSearchParam(url, url.searchParams, keys, 1)
        console.log('params', url.toString())
        return url
    })
    return urls
}
