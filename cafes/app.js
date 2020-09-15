
/*------------
  VARIABLES
 ------------*/
const cafeList = document.querySelector('#cafe-list');
const addForm = document.querySelector('#add-cafe-form');


/*------------
  FUNCTIONS
 -----------*/
// Reading or Retrieving data from Firebase to display in UI
const renderCafe = doc => {
    let name = doc.data().name;
    let city = doc.data().city;
    let docID = doc.id;
    let list = `<li data-id="${docID}"><span>${name}</span><span>${city}</span><div>x</div></li>`;
    cafeList.innerHTML += list;
}

// Creating or Saving Data to Firebase - Firestore 
const createData =  e => {
    e.preventDefault();    
        db.collection('cafes').add({
            name: addForm.name.value,
            city: addForm.city.value
        });
    addForm.reset();
}

// Deleting or Removing Data from Firebase - Firestore 
const deleteData = e => {
    if(e.target.textContent === 'x') {
        e.stopPropagation();
        const id = e.target.parentElement.getAttribute('data-id');
        db.collection('cafes').doc(id).delete();
    }
}

// Adding and Deleting data showing in UI real-time
const realTimeData = snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        if(change.type === "added") {
            renderCafe(change.doc);
        } else if(change.type === "removed"){
            let listItem = cafeList.querySelector(`[data-id=${change.doc.id}]`);
            cafeList.removeChild(listItem);
        }
    });
}


/*----------------
  EVENT LISTENERS
-----------------*/
addForm.addEventListener('submit', createData);
cafeList.addEventListener('click', deleteData);
db.collection('cafes').orderBy('city').onSnapshot(realTimeData);


