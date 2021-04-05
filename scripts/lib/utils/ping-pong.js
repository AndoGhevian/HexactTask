class PingPong {
    pong_res = async (data) => { }
    ping_res = async (data) => { }

    p_ping = new Promise(res =>
        this.ping_res = (data) => {
            this.ping_data.push(data)
            res(this.ping_data)
        }
    )

    ping_fullfiled = true
    ping_data = []

    constructor() {
        this.ping = this.ping.bind(this)
        this.pong = this.pong.bind(this)
    }

    async ping(data) {
        if (this.ping_fullfiled) {
            this.p_pong = new Promise(res =>
                this.pong_res = (data) => {
                    res(data)
                    this.ping_data = []
                    this.ping_fullfiled = true
                }
            )
            this.ping_fullfiled = false
        }
        this.ping_res(data)
        return this.p_pong
    }

    async pong(data) {
        this.pong_res(data)
        const ping_data = await this.p_ping

        this.p_ping = new Promise(res =>
            this.ping_res = (data) => {
                this.ping_data.push(data)
                res(this.ping_data)
            }
        )

        return ping_data
    }
}

module.exports = PingPong