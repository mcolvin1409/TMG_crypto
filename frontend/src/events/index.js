import { getCooling, getHealth, getStatus } from "@/api";

const topicToEndPoint = new Map([
  ["alarms", getStatus],
  ["cooling", getCooling],
  ["health", getHealth],
]);

class EventsManager {
  #topics;
  #timer;
  #boundPoll;

  constructor() {
    this.#topics = new Map();
    this.#timer = -1;
    this.#boundPoll = this.#poll.bind(this);

    // This should only be called from Vue Router
    // Route View components. Ensures a speedier
    // acquisition of data.
    Object.defineProperty(this, "reloadEvents", {
      enumerable: false,
      value: () => {
        clearTimeout(this.#timer);
        this.#poll();
      },
    });
  }

  async #poll() {
    /**
     * Convert topics to promises where each
     * promise calls the end point associated
     * with its topic name. See topicToEndPoint map.
     *
     * Once all topic endPoints have responded,
     * map the result back to its topic. Finally,
     * publish the results to their respective
     * topic subscribers.
     */
    const promises = await Promise.all(
      Array.from(this.#topics.keys(), (topic) => {
        const endPoint = topicToEndPoint.get(topic);

        if (endPoint) {
          return endPoint().then(
            (data) => ({ topic, data }),
            () => null
          );
        }
      })
    );

    for (const result of promises) {
      if (result !== null) {
        const { topic, data } = result;
        this.publish(topic, data);
      }
    }

    // If there is still at least one subscriber,
    // schedule a timer to run the poller again.
    if (this.#topics.size > 0) {
      this.#timer = setTimeout(this.#boundPoll, 3000);
    } else {
      clearTimeout(this.#timer);
      this.#timer = -1;
    }
  }

  subscribe(topic, listener) {
    if (typeof listener !== "function") {
      throw new Error("Callback needs to be a function.");
    }

    const _self = this,
      queue = this.#topics.get(topic) ?? [],
      index = queue.push(listener) - 1;

    this.#topics.set(topic, queue);

    if (this.#timer === -1) {
      this.#poll();
    }

    return {
      remove() {
        queue.splice(index, 1);

        if (queue.length <= 0) {
          _self.#topics.delete(topic);
        }
      },
    };
  }

  publish(topic, data) {
    const queue = this.#topics.get(topic);

    if (!queue) {
      return;
    }

    queue.forEach((listener) => {
      listener(data ?? null);
    });
  }
}

const publisher = new EventsManager();
Object.freeze(publisher);

export { publisher as default };
