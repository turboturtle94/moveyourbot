export default class PubSub {
    constructor() {
        this.subscribers = {}
    }

    publish(eventName, data) {
        if (!Array.isArray(this.subscribers[eventName]))
        {
            return
        }
        this.subscribers[eventName].forEach((callback) => {
            callback(data)
        })
    }

    subscribe(eventName, callback) {
        if (!Array.isArray(this.subscribers[eventName]))
        {
            this.subscribers[eventName] = []
        }
        this.subscribers[eventName].push(callback);
        const index = this.subscribers[eventName].length - 1

        return {
            unsubscribe() {
                this.subscribers[eventName].splice(index, 1)
            },
        }
    }
}