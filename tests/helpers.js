function createJsonResponder() {
  const calls = [];
  function json(payload, status = 200) {
    const result = { payload, status };
    calls.push(result);
    return result;
  }
  return { calls, json };
}

class MemoryKV {
  constructor(seed) {
    this.store = new Map();
    if (!seed) return;
    for (const [key, value] of Object.entries(seed)) {
      this.store.set(key, JSON.stringify(value));
    }
  }

  async get(key, type) {
    const raw = this.store.get(key);
    if (raw == null) return null;
    if (type === 'json') return JSON.parse(raw);
    return raw;
  }

  async put(key, value) {
    this.store.set(key, value);
  }

  has(key) {
    return this.store.has(key);
  }
}

module.exports = {
  createJsonResponder,
  MemoryKV,
};
