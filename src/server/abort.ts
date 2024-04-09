class AxiosAbort {

  aborts: Record<string, () => void> = {};

  add(url: string, cancel: () => void) {
    this.aborts[url] = cancel;
  }

  remove(url: string) {
    if (this.aborts[url]) {
      delete this.aborts[url];
    }
  }

  abort(url: string) {
    if (typeof this.aborts[url] === 'function') {
      this.aborts[url]();
      delete this.aborts[url];
    }
  }

  abortAll() {
    for (let url in this.aborts) {
      this.abort(url);
    }
  }
}

export const server = new AxiosAbort();
