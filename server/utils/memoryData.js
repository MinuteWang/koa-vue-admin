class memoryData {
  constructor() {
    this.data = new Map();
    setInterval(() => {
      this.data.keys().forEach(key => {
        const value = this.data.get(key);
        if (this.isExpired(value)) {
          this.data.delete(key);
        }
      });
    }, 5 * 60 * 1000);
  }

  create(key, data, options = { expired: 7200 }) {
    if (!data && !key) return false;
    this.data.set(key, {
      data,
      createdDate: Date.now(),
      expired: options.expired * 1000
    });
  }

  get(key) {
    if (!key) return undefined;
    const value = this.data.get(key);
    if (value && !this.isExpired(value)) {
      return value.data;
    }
    return undefined;
  }

  delete(key) {
    this.data.delete(key);
  }

  isExpired(data) {
    return Date.now() - data.createdDate > data.expired;
  }
}

module.exports = new memoryData();
