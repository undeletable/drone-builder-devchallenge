class StateMabagementEvent {
    constructor(eventId) {
        this.id = eventId;
    }

    target = document;

    getEventInstance(payload) {
        const eventArguments = [this.id];
        if (typeof payload !== "undefined") {
            eventArguments.push({
                detail: payload
            });
        }
        return new CustomEvent(...eventArguments);
    }

    dispatch(payload) {
        const eventInstance = this.getEventInstance(payload);
        this.target.dispatchEvent(eventInstance);
    }

    subscribe(handler) {
        if (typeof handler === "function") {
            this.target.addEventListener(this.id, (event) => {
                handler(event.detail);
            });
        }
    }

    // TODO implement unsubscribe()
}