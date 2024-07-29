const Redis = require("ioredis");
const redis = new Redis();

class RedisServices {
    addOTP = async ({ key, value }) => {
        await redis.set(key, value, 'EX', 60);
    };

    getOTP = async ({ key }) => {
        const otp = await redis.get(key);
        return otp;
    };
}

module.exports = new RedisServices();
