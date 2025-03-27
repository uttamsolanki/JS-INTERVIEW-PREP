class EventEmitter {
  constructor() {
    this.events = new Map();
  }

  subscribe(eventName, callback) {
    if (!callback) {
      return;
    }

    if (!this.events.has(eventName)) {
      this.events.set(eventName, []);
    }
    const listeners = this.events.get(eventName);
    const index = listeners.push(callback);
    return {
      unsubscribe: () => {
        listeners.splice(index, 1);
      },
    };
  }

  emit(eventName, args = []) {
    if (!this.events.has(eventName)) {
      return [];
    }

    const listeners = this.events.get(eventName);
    return listeners.map((listener) => listener.apply(undefined, args));
  }
}

const emitter = new EventEmitter();
emitter.emit("firstEvent"); // [], no callback are subscribed yet
emitter.subscribe("firstEvent", function cb1() {
  return 5;
});
emitter.subscribe("firstEvent", function cb2() {
  return 6;
});
console.log(emitter.emit("firstEvent")); // [5, 6], returns the output of cb1 and cb2
