declare class PingPong<Pong = any, Ping extends any[] = any[]> {
    constructor();
    /**
     * **Ping** some data, and wait for **pong**, returns promise which will resolve with ponged data.
     * 
     * NOTE: Only the first ponged data will be resolved in the promise in case of multiple synchronouse pongs.
     */
    ping(data: any): Promise<Pong>
    /**
     * **Pong** data to **pingers**, retrun promise which will resolve with all pinged data in array, if exists,
     * or will wait until someone **ping**
     * 
     * NOTE: To listen for subsequent **pings** you need to send **pre-pong**. It's same as a listener.
     */
    pong(data: any): Promise<Ping>
}

export = PingPong