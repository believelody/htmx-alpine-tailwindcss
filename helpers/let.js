export default function (options) {
    const data = {};
    let out = "";
    Object.entries(options.hash).forEach(([key, value]) => {
        data[key] = value;
        out += options.fn(data);
    });
    return out;
}