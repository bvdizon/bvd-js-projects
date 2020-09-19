const displayGrid = document.querySelector('#displayGrid');
const addRecipeModal = document.querySelector('#addRecipeModal');
const addRecipeform = document.querySelector('#addRecipeform');
let porkRecipes = db.collection('pork-recipes');

porkRecipes.orderBy('Title').onSnapshot(snapshot => {
  let changes = snapshot.docChanges();
  changes.forEach(change => {
    if (change.type == "added") {
      // call to function to insert or add HTML to UI
      addHTML(change.doc);
    }
  })
});

function addHTML(doc) {
  let title = doc.data().Title;
  let description = doc.data().Description;
  let docID = doc.id;
  let date = doc.data().Date;
  let imageURL;
  doc.data().ImageURL ? imageURL = `images/${doc.data().ImageURL}` : imageURL = "http://placehold.it/500x325";

  let html = `    
      <div class="card h-100">
          <img class="card-img-top" src="${imageURL}" alt="Check out the recipe for ${title}.">
          <div class="card-body">
            <h4 class="card-title">${title}</h4>
            <p class="card-text">${description}</p>
            <p class="card-text">${date.toDate().toDateString()}</p>
          </div>
          <div class="card-footer">
            <a href="#" class="btn btn-danger delRecipe">Delete Recipe!</a>
          </div>
      </div>`;
  // creating div container
  let div = document.createElement('div');
  // adding classes
  div.className = "col-lg-4 col-md-6 mb-4";
  // adding specific attributes
  div.setAttribute('data-id', docID);
  // insert template lieterals to new element
  div.innerHTML = html;
  // appending to the parent element
  displayGrid.appendChild(div);
};


addRecipeform.addEventListener('submit', (e) => {
  // prevents browser default (page refresh) when submit 
  e.preventDefault();

  // getting the values from the input fields of the form
  let recipeTitle = addRecipeform.recipeTitle.value;
  let recipeDescription = addRecipeform.recipeDescription.value;
  let addDate = new Date();

  if (recipeTitle, recipeDescription) {
    porkRecipes.add({
      Title: recipeTitle,
      Description: recipeDescription,
      Date: addDate
    });

    let shownElements = document.querySelectorAll('.show');
    Array.from(shownElements).forEach(shown => shown.classList.remove('show'));
  };

  addRecipeform.reset();
});


displayGrid.addEventListener('click', e => {
  // check if element clicked is the Delete Recipe button, and alert to confirm
  if (e.target.classList.contains('delRecipe') && confirm('Are you sure you want to delete this recipe?')) {
    // getting the document ID of the image grid to delete

    let docID = e.target.parentElement.parentElement.parentElement.getAttribute('data-id');
    // deleting it from the firebase db, showing real-time data
    porkRecipes.doc(docID).delete();

    // removing the recipe from the UI
    e.target.parentElement.parentElement.parentElement.remove();
  }
});



/* Search / Filter
=======================*/
const search = document.getElementById('search');
const recipeTitles = document.querySelectorAll('.card-title');

search.addEventListener('keyup', e => {
  Array.from(displayGrid.children)
    .filter(recipe => !recipe.textContent.toLowerCase().includes(search.value.trim().toLowerCase()))
    .forEach(recipe => recipe.style.display = 'none');

  Array.from(displayGrid.children)
    .filter(recipe => recipe.textContent.toLocaleLowerCase().includes(search.value.trim().toLowerCase()))
    .forEach(recipe => recipe.style.display = 'block');

});