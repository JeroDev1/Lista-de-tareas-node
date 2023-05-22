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
  return new Promise((resolve) => {
    tasks.push({
      description,
      done: false
    });
    console.log(`La tarea "${description}" se ha añadido.`);
    resolve(); // Resuelve la promesa para continuar el flujo
  });
}

function removeTask(index) {
  return new Promise((resolve) => {
    const task = tasks[index];
    tasks.splice(index, 1);
    console.log(`La tarea "${task.description}" se ha eliminado.`);
    resolve(); // Resuelve la promesa para continuar el flujo
  });
}

function completeTask(index) {
  return new Promise((resolve) => {
    const task = tasks[index];
    task.done = true;
    console.log(`La tarea "${task.description}" se ha completado.`);
    resolve(); // Resuelve la promesa para continuar el flujo
  });
}

async function askForTask() {
  return new Promise((resolve) => {
    rl.question('Añadir tarea: ', async (description) => {
      await addTask(description); // Espera a que se resuelva la promesa
      printTasks();
      resolve(); // Resuelve la promesa para continuar el flujo
    });
  });
}

async function askForIndexToRemove() {
  return new Promise((resolve) => {
    rl.question('Índice de la tarea a eliminar: ', async (index) => {
      await removeTask(index - 1); // Espera a que se resuelva la promesa
      printTasks();
      resolve(); // Resuelve la promesa para continuar el flujo
    });
  });
}

async function askForIndexToComplete() {
  return new Promise((resolve) => {
    rl.question('Índice de la tarea a completar: ', async (index) => {
      await completeTask(index - 1); // Espera a que se resuelva la promesa
      printTasks();
      resolve(); // Resuelve la promesa para continuar el flujo
    });
  });
}

async function askForAction() {
  return new Promise((resolve) => {
    rl.question(`
¿Qué acción deseas realizar?
  1. Añadir tarea
  2. Eliminar tarea
  3. Completar tarea
  4. Salir

`, async (answer) => {
      switch (answer) {
        case '1':
          await askForTask(); // Espera a que se resuelva la promesa
          resolve(); // Resuelve la promesa para continuar el flujo
          break;
        case '2':
          await askForIndexToRemove(); // Espera a que se resuelva la promesa
          resolve(); // Resuelve la promesa para continuar el flujo
          break;
        case '3':
          await askForIndexToComplete(); // Espera a que se resuelva la promesa
          resolve(); // Resuelve la promesa para continuar el flujo
          break;
        case '4':
          rl.close();
          resolve(); // Resuelve la promesa para continuar el flujo
          break;
        default:
          console.log('Opción no válida.');
          await askForAction(); // Espera a que se resuelva la promesa
          resolve(); // Resuelve la promesa para continuar el flujo
      }
    });
  });
}

async function main() {
  console.log('Bienvenido a la lista de tareas.');
  while (true) {
    await askForAction(); // Espera a que se resuelva la promesa
  }
}

main();