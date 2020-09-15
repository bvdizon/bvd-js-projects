/* VARIABLES
==============*/
const tableRow = document.querySelector('#tasks');
const activityOptions = document.querySelector('#activities');
const agentOptions = document.querySelector('#agents');
const addNewTaskForm = document.querySelector('#addNewTask');


/* EVENT LISTENERS
==================*/
addNewTaskForm.addEventListener('submit', addNewTask);
tableRow.addEventListener('click', delInFirebase);

db.collection('tasks').orderBy('date').onSnapshot(realTimeData);
db.collection('activities').orderBy('activity').get().then(getListOfActivities);
db.collection('agents').orderBy('agent').get().then(getListOfAgents);


/* FUNCTIONS
==============*/
function addNewTask(e) {
    e.preventDefault();
        const dateNow = new Date();
        let newTask = {
            date: dateNow,
            activity: addNewTaskForm.activities.value,
            owner: addNewTaskForm.agents.value,
            notes: addNewTaskForm.activityNotes.value
        };

        if(newTask.activity == "" || newTask.owner == "" || newTask.notes == "") {
            alert('Missing info on some field(s). Please add and re-submit.')
        } else {
            db.collection('tasks').add(newTask);
            addNewTaskForm.reset();
        }        
}

function delInFirebase(e) {
    e.stopPropagation();
    if(e.target.tagName == "BUTTON" && confirm("Are you sure you want to delete this task?")) {
        let docID = e.target.parentElement.parentElement.getAttribute('data-id');
        db.collection('tasks').doc(docID).delete();
    }
}

function realTimeData(snapshot) {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        if(change.type === "added") {
            let date = change.doc.data().date;
            let activity = change.doc.data().activity;
            let notes = change.doc.data().notes;
            let owner = change.doc.data().owner;

            let tasks = `
                <tr data-id="${change.doc.id}">
                    <td>${date.toDate().toDateString()}</td>
                    <td>${activity}</td>
                    <td>${notes}</td>
                    <td>${owner}</td>
                    <td><button class="btn btn-danger delTask">Delete</button></td>
                </tr>
            `;

            tableRow.insertAdjacentHTML('afterbegin', tasks);

        } else if (change.type === "removed") {
            let taskRemoved = tasks.querySelector(`[data-id=${change.doc.id}]`);
            taskRemoved.remove();
        }
    });
}

function getListOfActivities(snapshot) {
    snapshot.docs.forEach(doc => {
        let activityHTML = `<option value="${doc.data().activity}">${doc.data().activity}</option>`;
        activityOptions.innerHTML += activityHTML;
    });
}

function getListOfAgents(snapshot) {
    snapshot.docs.forEach(doc => {
        let agentHTML = `<option value="${doc.data().agent}">${doc.data().agent}</option>`;
        agentOptions.innerHTML += agentHTML;
    });
}

function inputError(message = 'Check input information, then click "Add Task".') {
    const alertInput = `
        <div class="alert alert-warning text-center" role="alert">
            ${message}
        </div>`;
        document.querySelector('#addForm').innerHTML += alertInput;
}