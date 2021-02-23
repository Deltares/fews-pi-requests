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