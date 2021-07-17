require('../src/db/mongoose');
const Task = require('../src/models/task');

Task.findByIdAndDelete('60f212474d6a3222582d11f3').then(task => {
    console.log(task);
    return Task.countDocuments({completed: false});
}).then(result => {
    console.log(result);
}).catch(e => {
    console.log(e);
});