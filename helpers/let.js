export default function (ctx) {
    Object.entries(ctx.hash).forEach(([key, value]) => {
        ctx.data.root[key] = value;
    })
}