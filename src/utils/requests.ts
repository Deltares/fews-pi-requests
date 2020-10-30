export function requestJson(url: URL) {
    const xhr = new XMLHttpRequest()
    const promise = new Promise((resolve, reject) => {
        xhr.open('GET', url.href)

        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                const json = JSON.parse(this.responseText)
                resolve(json)
            } else {
                reject(new Error(this.statusText))
            }
        }
        xhr.onerror = function () {
            reject(new Error(this.statusText))
        }
        xhr.send()
    })
    return promise
}