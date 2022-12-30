import data from '../routes/index.json' assert {type: 'json'};

export default ctx => {
    return data.routes;
}