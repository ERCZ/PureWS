class WS {
    constructor(url, config = { data: false, json: false }) {
        this.ws = null;
        this.openHandlers = [];
        this.closeHandlers = [];
        this.errorHandlers = [];
        this.messageHandlers = [];
        this.url = url;
        this.config = config;
        this.et = new EventTarget();
        this.et.addEventListener('open', (e) => {
            this.openHandlers.forEach(handler => handler(e));
        });
        this.et.addEventListener('close', (e) => {
            this.closeHandlers.forEach(handler => handler(e));
        });
        this.et.addEventListener('error', (e) => {
            this.errorHandlers.forEach(handler => handler(e));
        });
        this.et.addEventListener('message', (e) => {
            let data = e;
            if (this.config.data)
                data = e.detail;
            if (this.config.data && this.config.json)
                data = JSON.parse(data);
            this.messageHandlers.forEach(handler => handler(data));
        });
    }
    createWS() {
        this.ws = new WebSocket(this.url);
        this.ws.addEventListener('open', () => {
            this.et.dispatchEvent(new Event('open'));
        });
        this.ws.addEventListener('message', (e) => {
            this.et.dispatchEvent(new CustomEvent('message', { detail: e.data }));
        });
        this.ws.addEventListener('close', () => {
            this.et.dispatchEvent(new Event('close'));
        });
        this.ws.addEventListener('error', () => {
            this.et.dispatchEvent(new Event('error'));
        });
    }
    clearHandlers(event) {
        switch (event) {
            case 'open':
                this.openHandlers = [];
                break;
            case 'close':
                this.closeHandlers = [];
                break;
            case 'error':
                this.errorHandlers = [];
                break;
            case 'message':
                this.messageHandlers = [];
                break;
        }
    }
    on(event, handler) {
        switch (event) {
            case 'open':
                this.openHandlers.includes(handler) || this.openHandlers.push(handler);
                break;
            case 'close':
                this.closeHandlers.includes(handler) || this.closeHandlers.push(handler);
                break;
            case 'error':
                this.errorHandlers.includes(handler) || this.errorHandlers.push(handler);
                break;
            case 'message':
                this.messageHandlers.includes(handler) || this.messageHandlers.push(handler);
                break;
        }
    }
    off(event, handler) {
        const removeItem = (arr, item) => {
            const index = arr.indexOf(item);
            if (index !== -1)
                arr.splice(index, 1);
        };
        switch (event) {
            case 'open':
                removeItem(this.openHandlers, handler);
                break;
            case 'close':
                removeItem(this.closeHandlers, handler);
                break;
            case 'error':
                removeItem(this.errorHandlers, handler);
                break;
            case 'message':
                removeItem(this.messageHandlers, handler);
                break;
        }
    }
    send(data) {
        if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
            this.createWS();
            let timer = setInterval(() => {
                if (this.ws && this.ws.readyState === WebSocket.OPEN) {
                    clearInterval(timer);
                    this.ws.send(data);
                }
            }, 500);
        }
        else {
            this.ws.send(data);
        }
    }
    sendObj(obj) {
        this.send(JSON.stringify(obj));
    }
}

export { WS as default };
//# sourceMappingURL=index.esm.js.map
