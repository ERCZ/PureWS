declare type WSEventType = 'message' | 'open' | 'close' | 'error';
declare type WSEventCallback = (event?: Event | string | unknown) => void;
interface WSConfig {
    data?: boolean;
    json?: boolean;
}
declare class WS {
    private url;
    private ws;
    private et;
    private config;
    private openHandlers;
    private closeHandlers;
    private errorHandlers;
    private messageHandlers;
    constructor(url: string, config?: WSConfig);
    private createWS;
    clearHandlers(event: WSEventType): void;
    on(event: WSEventType, handler: WSEventCallback): void;
    off(event: WSEventType, handler: WSEventCallback): void;
    send(data: string): void;
    sendObj(obj: unknown): void;
}

export { WSConfig, WSEventCallback, WSEventType, WS as default };
