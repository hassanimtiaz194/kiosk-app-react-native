import SocketIOClient from 'socket.io-client';

let instance = null;
let socketUrl = null;
let invokeListeners = null;

export class SocketClient {
    connectedSocket = null;

    asyncEvents = [];

    disconnectedCallbacks = {};

    reconnectedCallbacks = {};

    constructor() {
        if (instance) {
            return instance;
        }
        if (!socketUrl) {
            throw new Error('Socket Not Initialized');
        }
        instance = this;
    }

    static init(wsUrl, startListeners) {
        console.log(wsUrl);
        socketUrl = wsUrl;
        invokeListeners = startListeners;
    }

    notifyDisconnected = () => {
        Object.keys(this.disconnectedCallbacks).forEach(key => {
            const cb = this.disconnectedCallbacks[key];
            console.log('Has Callback');
            if (cb) {
                cb();
            }
        });
    };

    notifyReconnected = () => {
        Object.keys(this.reconnectedCallbacks).forEach(key => {
            const cb = this.reconnectedCallbacks[key];
            if (cb) {
                cb();
            }
        });
    };

    connect = (userId, type) => {
        this.connectedSocket = SocketIOClient(socketUrl, {
            query: { userId, type },
            transports: ['websocket'],
        });
        // this.attachEventListeners(); 
        // invokeListeners(this.connectedSocket);
    };

    attachEventListeners() {
        this.connectedSocket.on('connect_error', error => {
            console.warn('Connect Error');
            console.log('On Error Message', error.message);
            this.notifyDisconnected();
        });
        this.connectedSocket.on('connect_timeout', () => {
            console.warn('Socket connection timeout');
        });
        this.connectedSocket.on('reconnect_attempt', () => {
            console.log('Socket Reconnect Attempt');
        });
        this.connectedSocket.on('reconnect', () => {
            console.log('Socket Reconnected Successfully');
            this.notifyReconnected();
        });
        this.connectedSocket.on('reconnecting', () => {
            console.log('Socket Reconnecting..');
        });
        this.connectedSocket.on('reconnect_error', error => {
            console.warn('Socket Reconnect Attempt failed');
            console.warn(error);
        });
        this.connectedSocket.on('reconnect_failed', () => {
            console.warn('Socket Reconnection failed at all. Not trying to reconnect now.');
        });
        this.connectedSocket.on('connect', () => {
            console.log('Socket connected successfully');
            this.asyncEvents.forEach(event => {
                this.connectedSocket.emit(event.target, event.payload);
            });
            this.asyncEvents = [];
        });
    }

    disconnect = () => {
        if (this.connectedSocket) {
            this.connectedSocket.disconnect();
        }
    };

    getConnectedSocket = () => {
        if (!this.connectedSocket) {
            throw new Error("Socket isn't connected");
        }
        return this.connectedSocket;
    };

    static getInstance() {
        return new SocketClient();
    }
}
