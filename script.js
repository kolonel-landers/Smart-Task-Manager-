let tasks = []; // Tableau d'objets servant à ajouter les tâches
let filter = "all";

//ajouter une tâche au tableau
function addTask(title) {
    const newTask = {
        id: Date.now(), // Identifiant unique basé sur le timestamp
        title: title,
        completed: false
    };
    tasks.push(newTask); // ajouté unenouvelle tâche au tableau
    displayTasks(); // mettre l'affichage à jour
}



//Afficher les tâches
const tasklist = document.getElementById("taskList");

function displayTasks(){
    tasklist.innerHTML = ""; // .innerHTML = égale un contenu HTML

    // filtrer les tâches en fonction duu filtre sélectionner
    const filteredTasks = tasks.filter(task =>
        filter === "completed" ? task.completed :
        filter === "active" ? !task.completed : true

    );

    //si aucune tâche
    if (filteredTasks.length === 0) {
        tasklist.innerHTML = "<li>Aucune tâche</li>";
        return;
    }


    
    filteredTasks.forEach(task => {
        tasklist.innerHTML += 
        `<li>
        <span onClick="toggleTask(${task.id})" style="cursor: pointer;">${task.title} - ${task.completed ? "Terminée" : "Non terminée" }
        </span>
        <button onClick="deleteTask(${task.id})">supprimer</button>
        </li>`;
    });
}


//Relier le boutton ajouter à la fonction d'addTask
const addBtn = document.getElementById("addBtn");
const taskInput = document.getElementById("taskInput");

addBtn.addEventListener("click", () => {
    const title = taskInput.value.trim(); 
    if (title) {
        addTask(title);
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
    tasks = tasks.map(task => task.id === id ? {...task, completed: !task.completed}:task);
    displayTasks();

}



const allBtn = document.getElementById("allBtn");
const completedBtn = document.getElementById("completedBtn");
const activeBtn = document.getElementById("activeBtn");

allBtn.addEventListener("click",()=>{
    filter = "all";
    displayTasks();

});

completedBtn.addEventListener("click",()=>{
    filter = "completed";
    displayTasks();
});

activeBtn.addEventListener("click",()=>{
    filter = "active";
    displayTasks();
});


//les éléments javascript pour charger les tâches depuis l'API
const loadApiBtn = document.getElementById("loadApiBtn");
const loader = document.getElementById("loader");



//la fonction asynchrone pour charger les tâches depuis l'API
const loadTasksFromAPI = async () => {
    try {
        loader.textContent = "Chargement ..."; //Afficher le loader
        const response = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=5"); //Appel API
        const data = await response.json(); //Transformer la réponse en JSON
        
        //Transformé les données de l'API en format de tâche et les ajouter au tableau
        tasks = data.map(({id, title, completed}) => ({id, title, completed})
    );

        loader.textContent = ""; //Cacher le loader
        displayTasks(); //Rafaîchir l'afichage des tâches

    } catch (error) {
        console.log("Erreur :", error);
        loader.textContent = "Erreur lors du chargement";
    }
};

//Relier le boutton à la fonction API
    loadApiBtn.addEventListener("click", loadTasksFromAPI);

