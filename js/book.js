const searchBook = () => {
    const inputField = document.getElementById('input-box');
    const searchText = inputField.value;
    inputField.value = '';

    const totalFound = document.getElementById('found-number');
        totalFound.innerText = '';

    // spinner toggle on
    displaySpinner('block');

    // error msg toggle off
    displayToast('none');

    if(searchText === ''){
        displayMassage('Invalid input, please give a valid book name!');
    }
    else{
        // load data from server
        const url = `https://openlibrary.org/search.json?q=${searchText}`;
        fetch(url)
        .then(res => res.json())
        .then(data => displayBooks(data))
        .catch(() => displayMassage("Sorry! Something went wrong. Try again later."));
    }

} 

// display spinner
const displaySpinner = (value) =>{
    document.getElementById('spinner-field').style.display = value;
}
// display toast
const displayToast = (value) =>{
    document.getElementById('toast-msg-box').style.display = value;
}

// display error massage arrow function
const displayMassage = errorMsg =>{
        displayToast('block');
        const container = document.getElementById('result-container');
        const totalFound = document.getElementById('found-number');
        totalFound.innerText = '';
        // clear innertext of div
        container.textContent = '';
        const msg = document.getElementById('error-msg');
        msg.innerText = errorMsg;
        let myAlert = document.querySelector('.toast');
        let bsAlert = new bootstrap.Toast(myAlert);
        bsAlert.show();
        displaySpinner('none');
}

// display search result arrow function
const displayBooks = books =>{
    const container = document.getElementById('result-container');

    // total search found set
    const number = books.numFound;
    const booksNumber = books.docs.slice(0,20);
    const totalFound = document.getElementById('found-number');
    if(number <= 0){
        totalFound.innerText = `No result found, try something different...`;
    }
    else{
        totalFound.innerText = `${number} search result found...
        ${booksNumber.length} result showing...`;
    }
    

    // clear innertext of div
    container.textContent = '';

    booksNumber?.forEach(book => {
       source =`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;

        // undifinied picture handle
       if(!book.cover_i){
           source = 'image/image-not-available.jpg';
       }

       const div = document.createElement('div');
       div.classList.add('col');
       div.innerHTML = `
            <div onclick = "loadBook('${book.author_key}')" class="card h-100 overflow-hidden" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                <div class="overflow-hidden w-50 mx-auto my-4">
                    <img src = ${source} class="card-img-top image" alt="...">
                </div>
                <div class="card-body text-center">
                    <h5 class="card-title">${book.title ? book.title : 'N/A'}</h5>
                    <p class="card-text"><span class="text-danger fst-italic">${book.author_name ? book.author_name[0] : 'N/A'} </span> <br>
                    Publisher : ${book.publisher[0] ? book.publisher[0] : 'N/A'} <br>
                    1st Published : <span class="fw-bold text-secondary">${book.first_publish_year ? book.first_publish_year : 'N/A'}</span></p>
                </div>
            </div>
       `;
       container.appendChild(div);
    })
    displaySpinner('none');
}



const loadBook = id =>{
    const url = `https://openlibrary.org/search.json?q=${id}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displaySingleMeal(data.docs[0]))
    .catch(() => displayMassage("Sorry! Something went wrong. Try again later."));
}

const displaySingleMeal = book => {
    const containerForMeal = document.getElementById('container-single-item');
    // clear inner content
    containerForMeal.textContent = '';

    // set image url
    source =`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;

    // undifinied picture handle
    if(!book.cover_i){
        source = 'image/image-not-available.jpg';
    }
    
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
            <img src=${source} class="card-img-top image1" alt="...">
            <button class="btn-close me-2 m-auto cross-btn p-2" data-bs-dismiss="modal"></button>
            <div class="card-body">
                <h5 class="card-title">${book.title ? book.title : 'Book name not available'}</h5>
                <p class="card-text text-muted">${book.author_name ? book.author_name[0] : 'Author info not available'}</p>
                <p class="card-text text-muted">${book.publisher ? book.publisher[0] : 'Publisher info not available'} </p>
                <p class="card-text text-muted">${book.first_publish_year ? book.first_publish_year : 'Publise year not available'}</p>
                <div class = "d-md-flex justify-content-md-end">
                    <a href="##" target="_blank" class="btn btn-warning">Read Details</a>
                </div>
            </div>
    `;
    containerForMeal.appendChild(div);
}