const redis = require("redis");

const redisPassword = process.env.REDIS_PASSWORD;
const redisHost = process.env.REDIS_HOST;
const redisPort = process.env.REDIS_PORT;

// const client = redis.createClient();
const client = redis.createClient({
  socket: {
    host: redisHost,
    port: redisPort,
  },
  password: redisPassword,
});

(async () => {
  client.connect();
  client.on("connect", () => {
    // eslint-disable-next-line no-console
    console.log("connect redis...");
  });
})();

module.exports = client;

// npm install -g redis-cli
// rdcli -h redis-11663.c73.us-east-1-2.ec2.cloud.redislabs.com -a hJPbgIrXyrGnt2E81AdEDO33JDncZxJY -p 11663
