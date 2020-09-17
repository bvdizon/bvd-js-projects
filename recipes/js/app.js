const displayGrid = document.querySelector('#displayGrid');
let porkRecipes = db.collection('pork-recipes');


porkRecipes.get().then(snapshot => {
    snapshot.docs.forEach(doc => {
        let title = doc.data().Title;
        let description = doc.data().Description;
        let imageURL; 
        doc.data().ImageURL ? imageURL = `images/${doc.data().ImageURL}` : imageURL = "http://placehold.it/500x325";
        addHTML(title, description, imageURL);
    });
}); 

function addHTML(title, description, imageURL) {
    let html = `
    <div class="col-lg-4 col-md-6 mb-4">
      <div class="card h-100">
        <img class="card-img-top" src="${imageURL}" alt="">
        <div class="card-body">
          <h4 class="card-title">${title}</h4>
          <p class="card-text">${description}</p>
        </div>
        <div class="card-footer">
          <a href="#" class="btn btn-primary">Find Out More!</a>
        </div>
      </div>
    </div>`;
    displayGrid.insertAdjacentHTML('afterbegin', html);
};