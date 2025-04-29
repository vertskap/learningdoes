
export class listenEvents {
    add(element, event, callback, ...args) {
        element.addEventListener(event, (e) => {
            callback.call(this, e, ...args);
        }, options);
    }

    remove(element, event, options = {}) {
        element.removeEventListener(event, () => { });
    }
}