const searchBook = () => {
    const inputField = document.getElementById('input-box');
    const searchText = inputField.value;
    inputField.value = '';

    const totalFound = document.getElementById('found-number');
        totalFound.innerText = '';

    // spinner function call
    displaySpinner('block');

    if(searchText == ''){
        displayMassage('Invalid input, please give a valid book name!');
    }
    else{
        // load data from server
        const url = `https://openlibrary.org/search.json?q=${searchText}`;
        console.log(url);
        fetch(url)
        .then(res => res.json())
        .then(data => displayBooks(data))
        // .catch(() => displayMassage("Sorry! Something went wrong. Try again later."));
    }

} 

// display spinner
const displaySpinner = (value) =>{
    const spinnerField = document.getElementById('spinner-field').style.display = value;
}

// display error massage arrow function
const displayMassage = errorMsg =>{
        const container = document.getElementById('result-container');
        const totalFound = document.getElementById('found-number');
        totalFound.innerText = '';
        // clear innertext of div
        container.textContent = '';
        const msg = document.getElementById('error-msg');
        msg.innerText = errorMsg;
        console.log('error msg')
        let myAlert = document.querySelector('.toast');
        let bsAlert = new bootstrap.Toast(myAlert);
        bsAlert.show();
        displaySpinner('none');
}

// display search result arrow function
const displayBooks = books =>{
    console.log(books.docs);
    const container = document.getElementById('result-container');

    // total search found set
    const totalFound = document.getElementById('found-number');
    totalFound.innerText = `${books.numFound} search result found...`;

    // clear innertext of div
    container.textContent = '';

    books.docs.slice(0,20)?.forEach(book => {
       source =`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;

        // undifinied picture handle
       if(!book.cover_i){
           source = 'image/image-not-available.jpg';
       }

       const div = document.createElement('div');
       div.classList.add('col');
       div.innerHTML = `
            <div onclick = "loadBook('${book.author_key}')" class="card h-100 overflow-hidden" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                <div class="overflow-hidden ">
                    <img src = ${source} class="card-img-top image" alt="...">
                </div>
                <div class="card-body">
                    <h5 class="card-title">${book.title ? book.title : 'Book name not available'}</h5>
                    <p class="card-text text-muted">Author: ${book.author_name ? book.author_name[0] : 'Author info not available'} <br>
                    Publisher: ${book.publisher[0] ? book.publisher[0] : 'Publisher info not available'} <br>
                    ${book.first_publish_year ? book.first_publish_year : 'Publise year not available'}</p>
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

const displaySingleMeal = item => {
    const containerForMeal = document.getElementById('container-single-item');
    console.log(item);
    // clear inner content
    containerForMeal.textContent = '';
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
            <img src="https://covers.openlibrary.org/b/id/${item.cover_i}-M.jpg" class="card-img-top image1" alt="...">
            <button class="btn-close me-2 m-auto cross-btn p-2" data-bs-dismiss="modal"></button>
            <div class="card-body">
                <h5 class="card-title">${item.title}</h5>
                <p class="card-text text-muted">${item.author_name[0]}</p>
                <p class="card-text text-muted">${item.publisher[0]}</p>
                <p class="card-text text-muted">${item.publish_date}</p>
                <div class = "d-md-flex justify-content-md-end">
                    <a href="##" target="_blank" class="btn btn-warning">Read</a>
                </div>
            </div>
    `;
    containerForMeal.appendChild(div);
}