document.getElementById('spinner').style.display = 'none'
const loadCatagor = () => {
    const url = ' https://openapi.programming-hero.com/api/news/categories'
    fetch(url)
        .then(res => res.json())
        .then(data => displayCtagory(data.data.news_category))
}
const displayCtagory = items => {
    // console.log(items)
    const catagoryContainer = document.getElementById('catagory-container')
    items.forEach(item => {
        //  console.log(item.category_name)
        const catagoryDiv = document.createElement('div')
        catagoryDiv.innerHTML = `
        <button href="#"  class="btn btn-outline-success border border-0 fs-4 ms-3" onclick="loadNewsDeatils('${item.category_id}')">${item.category_name}</button>
        `;
        catagoryContainer.appendChild(catagoryDiv)

    });

}
const loadNewsDeatils = category_id => {

    document.getElementById('spinner').style.display = 'block'
    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayNews(data.data))
}

const displayNews = newsinfo => {
    console.log(newsinfo)
    document.getElementById('spinner').style.display = 'none'
    const textField = document.getElementById('text-field')
    if (newsinfo.length != 0) {
        textField.value = `${newsinfo.length} Number of news 
        `;

    }
    else {
        textField.value = 'There is No news'

    }
    const newsContainer = document.getElementById('news-container')

    newsContainer.innerHTML = "";
    newsinfo.forEach(news => {
        //console.log(news)
        const { title, details, total_view, image_url, author, category_id, _id } = news;
        const { name, published_date, img } = author;
        console.log(total_view)
        // Array.sort(total_view)
        const newsDiv = document.createElement('div')
        newsDiv.innerHTML = `
        <div class="col-md-12 col-sm-12 my-4 rounded rounded-2 shadow-lg">
        <div class="d-lg-flex d-md-flex">
        <div>
        <img src="${image_url}" class="img-fluid rounded-start h-100 m-sm-100" alt="...">
        </div>
        <div class="col-md-8 col-sm-12 ms-2 flex-md-row ">
        <div class="card-body">
            <h5 class="card-title mt-3 p-3"> ${title}</h5>
            <p class="card-text p-3">${details.slice(0, 300) === true ? details.slice(0, 300) : details.slice(0, 301) + " ..."}</p>
            <div class="d-flex justify-content-around align-items-center mt-5 mb-2">
                <div class="d-flex "><img src="${img}" class="design" alt="...">
                <p class="p-2">${name ? name : 'no name found'}</p> 
                </div>
                <div ><i class="fa-solid fa-eye"></i> ${total_view}</div>
                <div class="me-4"><button class="btn btn-outline-primary"  onclick="loadModal('${_id}')" data-bs-toggle="modal" data-bs-target="#exampleModal">details</button></div>
            </div>
        </div>
    </div>
    </div>
    </div>
        `;
        newsContainer.appendChild(newsDiv);

    })

}
const loadModal = (authorId) => {
    // console.log(authorId)
    const url = ` https://openapi.programming-hero.com/api/news/${authorId}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayModal(data.data))
}
const displayModal = authors => {
    const modalBody = document.getElementById('modal-body')
    authors.forEach(authorData => {
        const { details, author } = authorData;
        const { name, img } = author;
        // modalBody.classList.add('card')
        modalBody.innerHTML = `
            <img src="${img}" class="card-img-top modal-design" alt="...">
            <div class="card-body">
                <h5 class="card-title">${name ? name : 'no name found'}</h5>
                <p class="card-text">${details.slice(0, 100)}</p>
            </div>
        `;
    })
}

loadCatagor();