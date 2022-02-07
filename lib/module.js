class $cf838c15c8b009ba$export$2e2bcd8739ae039 {
    /**
     * 构造器
     * @param { string } url websocket地址
     * @param { { data: boolean, json: boolean } } [config] 配置项，data：直接获取message事件的data，json：将message事件的data转换为json对象
     */ constructor(url, config){
        this.url = url;
        this.config = config || {
            data: false,
            json: false
        };
        this.et = new EventTarget();
        this.openHandlers = [];
        this.closeHandlers = [];
        this.errorHandlers = [];
        this.messageHandlers = [];
        this.et.addEventListener('open', (e)=>{
            this.openHandlers.forEach((handler)=>handler(e)
            );
        });
        this.et.addEventListener('close', (e)=>{
            this.closeHandlers.forEach((handler)=>handler(e)
            );
        });
        this.et.addEventListener('error', (e)=>{
            this.errorHandlers.forEach((handler)=>handler(e)
            );
        });
        this.et.addEventListener('message', (e)=>{
            if (this.config.data) e = e.detail;
            if (this.config.json) e = JSON.parse(e);
            this.messageHandlers.forEach((handler)=>handler(e)
            );
        });
    }
    /**
     * 创建websocket连接
     */ createWS() {
        this.ws = new WebSocket(this.url);
        this.ws.addEventListener('open', ()=>{
            this.et.dispatchEvent(new Event('open'));
        });
        this.ws.addEventListener('message', (e)=>{
            this.et.dispatchEvent(new CustomEvent('message', {
                detail: e.data
            }));
        });
        this.ws.addEventListener('close', ()=>{
            this.et.dispatchEvent(new Event('close'));
        });
        this.ws.addEventListener('error', ()=>{
            this.et.dispatchEvent(new Event('error'));
        });
    }
    /**
     * 清除对应事件的所有处理器
     * @param { 'open' | 'close' | 'error' | 'message' } event 事件名
     */ clearHandlers(event) {
        this[event + 'Handlers'] = [];
    }
    /**
     * 向对应事件添加处理器
     * @param { 'open' | 'close' | 'error' | 'message' } event 事件名
     * @param { Function } handler 处理器
     */ on(event, handler) {
        for(let i = 0; i < this[event + 'Handlers'].length; i++){
            if (this[event + 'Handlers'][i] === handler) return;
        }
        this[event + 'Handlers'].push(handler);
    }
    /**
     * 解绑对应事件的处理器
     * @param { 'open' | 'close' | 'error' | 'message' } event 事件名 
     * @param { Function } handler 处理器
     */ off(event, handler) {
        for(let i = 0; i < this[event + 'Handlers'].length; i++)if (this[event + 'Handlers'][i] === handler) {
            this[event + 'Handlers'].splice(i, 1);
            return;
        }
    }
    /**
     * 向服务器发送一个字符串
     * @param { string } data 发送的字符串
     */ send(data) {
        if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
            this.createWS(this.url);
            let timer = setInterval(()=>{
                if (this.ws && this.ws.readyState === WebSocket.OPEN) {
                    clearInterval(timer);
                    this.ws.send(data);
                }
            }, 500);
        } else this.ws.send(data);
    }
    /**
     * 向服务器发送一个对象
     * @param { Object } obj 发送的对象
     */ sendObj(obj) {
        this.send(JSON.stringify(obj));
    }
}


export {$cf838c15c8b009ba$export$2e2bcd8739ae039 as default};
//# sourceMappingURL=module.js.map
