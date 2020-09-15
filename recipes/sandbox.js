/* VARIABLES
-------------*/
const recipeList = document.querySelector('ul');
const addForm = document.querySelector('form');

/* EVENT LISTENERS
------------------*/
addForm.addEventListener('submit', addRecipe);
// db.collection('pork-recipes').orderBy('Date').onSnapshot(readRecipes);
recipeList.addEventListener('click', delRecipe);


/* FUNCTIONS
-------------*/
function addRecipe(e) {
    const now = new Date();
    const newRecipe = {
        Title: addForm.recipe.value,
        Name: 'Brian Dizon',
        Date: firebase.firestore.Timestamp.fromDate(now)
    }
    e.preventDefault();
        db.collection('pork-recipes').add(newRecipe);
    addForm.reset();
}

function readRecipes(snapshot) {
    let changes = snapshot.docChanges();
    changes.forEach(change => {        
        // capture it in a variable first before using prototype methods (i.e. toDate())
        let dateTime = change.doc.data().Date;
        
        if(change.type == "added") {            
            let readHTML = `
                <li data-id="${change.doc.id}">
                    <div>${change.doc.data().Title}</div>
                    <div>Created on: ${dateTime.toDate().toDateString()}</div>
                    <button class="btn btn-danger btn-sm my-2" >Delete</button>
                </li>`;
            recipeList.innerHTML += readHTML;
        } else if(change.type == "removed") {
            let liToDelete = recipeList.querySelector(`[data-id=${change.doc.id}]`);
            recipeList.removeChild(liToDelete);
        }
    })
}

function delRecipe(e) {
    if(e.target.tagName == "BUTTON") {
        e.stopPropagation();
        let liToDelete = e.target.parentElement;
        db.collection('pork-recipes').doc(liToDelete.getAttribute('data-id')).delete();
    }
}

