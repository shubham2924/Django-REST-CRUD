const postsList = document.querySelector(".posts-list");
let output = '';
const url = "http://localhost:8000/api/todos/";

fetch(url)
    .then(res => res.json())
    .then(data => {
        data.forEach(post =>{
            output += `
            <div class="col-md-4">
            <div class="mt-4  card text-white bg-secondary mb-3" >

                <div class="card-body">
                  <h5 class="card-title">${post.title}</h5>
                  <p class="card-text">${post.description}</p>
                </div>
                <div class="d-grid gap-2 d-md-block">
                    <button type="button" class="ms-3 mb-2 btn btn-primary">Edit</button>
                    <button type="button" class="mb-2 ms-2 btn btn-danger">Delete</button>
                  </div>
                <div class=" card-footer">
                    <small class=" text-white blockquote-footer">Created on ${post.datetime}</small>
                  </div>
              </div>
              </div>
            `;
        });
        postsList.innerHTML = output;
    })