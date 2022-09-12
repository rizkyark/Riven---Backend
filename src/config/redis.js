const redis = require("redis");

const redisPassword = "hJPbgIrXyrGnt2E81AdEDO33JDncZxJY";
const redisHost = "redis-11663.c73.us-east-1-2.ec2.cloud.redislabs.com";
const redisPort = "11663";

const client = redis.createClient({
  url: `redis://:${redisPassword}@${redisHost}:${redisPort}`,
});

(async () => {
  client.connect();
  client.on("connect", () => {
    // eslint-disable-next-line no-console
    console.log("connect redis...");
  });
})();
