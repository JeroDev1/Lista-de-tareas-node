const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let tasks = [];

function printTasks() {
  console.log('TAREAS:');
  tasks.forEach((task, index) => {
    console.log(`${index + 1}. [${task.done ? 'X' : ' '}] ${task.description}`);
  });
}

function addTask(description) {
  tasks.push({
    description,
    done: false
  });
  console.log(`La tarea "${description}" se ha añadido.`);
}

function removeTask(index) {
  const task = tasks[index];
  tasks.splice(index, 1);
  console.log(`La tarea "${task.description}" se ha eliminado.`);
}

function completeTask(index) {
  const task = tasks[index];
  task.done = true;
  console.log(`La tarea "${task.description}" se ha completado.`);
}

function askForTask() {
  rl.question('Añadir tarea: ', (description) => {
    addTask(description);
    printTasks();
    askForAction();
  });
}

function askForIndexToRemove() {
  rl.question('Índice de la tarea a eliminar: ', (index) => {
    removeTask(index - 1);
    printTasks();
    askForAction();
  });
}

function askForIndexToComplete() {
  rl.question('Índice de la tarea a completar: ', (index) => {
    completeTask(index - 1);
    printTasks();
    askForAction();
  });
}

function askForAction() {
  rl.question(`
¿Qué acción deseas realizar?
  1. Añadir tarea
  2. Eliminar tarea
  3. Completar tarea
  4. Salir

`, (answer) => {
    switch (answer) {
      case '1':
        askForTask();
        break;
      case '2':
        askForIndexToRemove();
        break;
      case '3':
        askForIndexToComplete();
        break;
      case '4':
        rl.close();
        break;
      default:
        console.log('Opción no válida.');
        askForAction();
    }
  });
}

console.log('Bienvenido a la lista de tareas.');
askForAction();