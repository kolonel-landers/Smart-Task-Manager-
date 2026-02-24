let tasks = []; // Tableau d'objets servant à ajouter les tâches
{
    id: 1, 
    title: "Apprendre JavaScript",
    completed: false
}

//ajouter une tâche au tableau
function addTask(title) {
    const newTask = {
        id: Date.now(), // Identifiant unique basé sur le timestamp
        title: title,
        completed: false
    };
    tasks.push(newTask); // ajouté unenouvelle tâche au tableau
    dispalyTasks(); // mettre l'affichage à jour
}



//Afficher les tâches
const tasklist = document.getElementById("taskList");

function displayTasks(){
    tasklist.innerHTML = ""; // .innerHTML = égale un contenu HTML
    
    tasks.forEach(task => {
        tasklist.innerHTML += 
        `<li>
        <span onClick="toggleTask(${task.id})" style=cursor:pointer>${task.title} - ${task.completed ? "Faire les courses" : "Envoyé un mail" }
        </span>
        <button onClick="deleteTask(${task.id})">supprimer</button>
        </li>`;
    });
}


//Relier le boutton ajouter à la fonction d'addTask
const addBTN = document.getElementByID("addBtn");
const taskInput = document.getElementById("taskInput");

addBtn.addEventListener("click", () => {
    const title = taskInput.value.trim(); 
    if (title) {
        addTasks(title);
        taskInput.value = ""; // vider l'input après l'ajout
}}
);


//Ajouté la fonction delete
function deleteTask(id){
    tasks = tasks.filter(task => task.id !== id);
    displayTasks();
}


//Ajouter la fonction toggle
function toggleTask(id){
    tasks = tasks.map(task => task.id === id);
    displayTasks();

}