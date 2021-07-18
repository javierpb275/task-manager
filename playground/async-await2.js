require('../src/db/mongoose');
const Task = require('../src/models/task');

/*
Task.findByIdAndDelete('60f212474d6a3222582d11f3').then(task => {
    console.log(task);
    return Task.countDocuments({completed: false});
}).then(result => {
    console.log(result);
}).catch(e => {
    console.log(e);
});
*/

const deleteTaskAndCountIncompletedTasks = async (id, completed) => {
    const task = await Task.findByIdAndDelete(id);
    const count = await Task.countDocuments({completed});
    return count;
}

deleteTaskAndCountIncompletedTasks('60f1fe398828762aec08b19a', false).then(count => {
    console.log(count);
}).catch(e => {
    console.log(e);
});