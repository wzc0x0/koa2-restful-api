/**
 * @author wzc0x0@gmail.com
 * @description About CROS setup
 */

module.exports = async(ctx, next) => {
    if (ctx.method === "OPTIONS") {
        ctx.status = 200;
        ctx.body = "OPTIONS OK!";
    }
    ctx.set("Access-Control-Allow-Origin", ctx.header.origin);
    ctx.set(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authentication"
    );
    ctx.set("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
    ctx.set("Access-Control-Allow-Credentials", true); // 允许带上 cookie
    await next();
};