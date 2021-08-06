const postsList = document.querySelector(".posts-list");
let output = '';
const url = "http://localhost:8000/api/todos/";
const addPostForm = document.querySelector(".add-post-form")
const titleValue = document.getElementById('title-value');
const bodyValue = document.getElementById('body-value');
const btnSubmit = document.querySelector('.btn')
const renderPosts = (posts) =>{
  posts.forEach(post =>{
    output += `
    <div class="col-md-4">
    <div class="mt-4  card text-white bg-secondary mb-3"  >

        <div class="card-body" >
          <h6>${post.id}</h6>
          <h5 class="card-title">${post.title}</h5>
          <p class="card-text">${post.description}</p>
        </div>
        <div class="d-grid gap-2 d-md-block" data-id=${post.id} data-title=${post.title} data-desc=${post.description}>
            <button type="button" class="ms-3 mb-2 btn btn-primary" id="edit-post">Edit</button>
            <button type="button" class="mb-2 ms-3 btn btn-danger" id="delete-post">Delete</button>
          </div>
        <div class=" card-footer">
            <small class=" text-white blockquote-footer">Created on ${post.datetime}</small>
          </div>
      </div>
      </div>
    `;
});
postsList.innerHTML = output;
}
fetch(url)
    .then(res => res.json())
    .then(data => {
      console.log("logging data")
      console.log(data)
      renderPosts(data)})

postsList.addEventListener('click',(event)=>{
  // console.log(e.target.id);
  event.preventDefault();
  let deleteButtonIsPressed = event.target.id == "delete-post";
  let editButtonIsPressed = event.target.id == "edit-post";
  let id = event.target.parentElement.dataset.id;
  let title = event.target.parentElement.dataset.title;
  let desc = event.target.parentElement.dataset.desc;

  //delete post logic
  if(deleteButtonIsPressed){
    fetch(`${url}${id}/`,
    {method : 'DELETE',}
    )
    .then(res => res.json())
    .then(console.log("pressing delete"))
    
    .then(()=> location.reload())
    console.log(id);
  }
  //edit post logic
  if(editButtonIsPressed){
    //const parent = event.target.parentElement;
    const titleContent =  document.querySelectorAll('.card-title');
    console.log(title);
    console.log(desc);
    titleValue.value = title;
    bodyValue.value = desc;
  }
  btnSubmit.addEventListener('click',(event)=>{
    event.preventDefault()
    fetch(`${url}${id}/`,{
      method:'PATCH',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({
        title:titleValue.value,
        body:bodyValue.value,
      })
    })
    .then(res=>res.json())
    .then(()=>location.reload())
  })
}) 
    
//add new post
addPostForm.addEventListener('submit',(event) =>{
  //e.prventDefault();
  event.preventDefault();
  //console.log("submitted");

  fetch(url,{
    method: 'POST',
    headers :{
      'Content-Type':'application/json'
    },
    body: JSON.stringify({
      title: titleValue.value,
      body : bodyValue.value
    })
  })
  .then(res => res.json())
  .then(data => {
    const dataArr = [];
    dataArr.push(data);
    renderPosts(dataArr);
  })
  .catch((error) => {
    console.error('Error:', error);
  });

  titleValue.value='';
  bodyValue.value='';


})