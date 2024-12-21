var CustomEvent = /** @class */ (function () {
    function CustomEvent() {
        this.events = new Map();
    }
    // Emit an event
    CustomEvent.prototype.emit = function (eventId, data) {
        var listeners = this.events.get(eventId);
        if (listeners) {
            listeners.forEach(function (listener) { return listener(data); });
        }
    };
    // Subscribe to an event
    CustomEvent.prototype.on = function (eventId, callback) {
        var _this = this;
        if (!this.events.has(eventId)) {
            this.events.set(eventId, []);
        }
        this.events.get(eventId).push(callback);
        return function () { return _this.off(eventId, callback); }; // Return an unsubscribe function
    };
    // Unsubscribe from an event
    CustomEvent.prototype.off = function (eventId, callback) {
        var listeners = this.events.get(eventId);
        if (listeners) {
            this.events.set(eventId, listeners.filter(function (listener) { return listener !== callback; }));
        }
    };
    return CustomEvent;
}());
export var customEvent = new CustomEvent();
