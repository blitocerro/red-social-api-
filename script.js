const urlBase = "https://jsonplaceholder.typicode.com/posts";
let posts = [];

function getData() {
  fetch(urlBase)
    .then((res) => res.json())
    .then((data) => {
      posts = data;
      renderPostList();
    })
    .catch((error) => console.error("Error al llamar a la API:", error));
}

function renderPostList() {
  const postList = document.getElementById("postList");
  postList.innerHTML = "";

  posts.forEach((post) => {
    const listItem = document.createElement("li");
    listItem.classList.add("postItem");

    listItem.innerHTML = `
      <strong>${post.title}</strong>
      <p>${post.body}</p>
      <button onclick="editPost(${post.id})">Editar</button>
      <button onclick="deletePost(${post.id})">Eliminar</button>

      <div id="editForm-${post.id}" class="editForm" style="display: none;"> 
          <label for="editTitle-${post.id}">Título:</label>
          <input type="text" id="editTitle-${post.id}" value="${post.title}" required> 
          <label for="editBody-${post.id}">Comentario:</label>
          <textarea id="editBody-${post.id}" required>${post.body}</textarea>
          <button onclick="updatePost(${post.id})">Actualizar</button>
      </div>
    `;

    postList.appendChild(listItem);
  });
}

function postData() {
  const postTitleInput = document.getElementById("postTitle");
  const postBodyInput = document.getElementById("postBody");
  const postTitle = postTitleInput.value;
  const postBody = postBodyInput.value;

  if (postTitle.trim() == "" || postBody.trim() == "") {
    alert("Los campos son requeridos");
    return;
  }
  fetch(urlBase, {
    method: "POST",
    body: JSON.stringify({
      title: postTitle,
      body: postBody,
      userId: 1,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      posts.push(data);
      renderPostList();
      postTitleInput.value = "";
      postBodyInput.value = "";
    })
    .catch((error) => console.error("Error al crear posteo", error));
}

function editPost(id) {
  const editForm = document.getElementById(`editForm-${id}`);
  editForm.style.display = editForm.style.display == "none" ? "block" : "none";
}

function updatePost(id) {
  const editTtitle = document.getElementById(`editTitle-${id}`).value;
  const editBody = document.getElementById(`editBody-${id}`).value;

  fetch(`${urlBase}/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      id: id,
      title: editTtitle,
      body: editBody,
      userId: 1,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
  .then(res => res.json())
  .then(data => {
    const index = posts.findIndex(post => post.id === data.id)
    if(index != -1) {
      posts[index] = data
    }
    else {
      alert('Hubo un error al actualizar la informacion del posteo')
    }
    renderPostList()
  })
  .catch(error => console.error('Hubo un error al actualizar el post', error))
}

function deletePost(id) {
  fetch(`${urlBase}/${id}`,{
    method: 'DELETE'
  })
  .then(res => {
    if(res.ok){
      posts = posts.filter(post => post.id != id)
      renderPostList()
    } else {
      alert('Hubo un error a la hora de eliminar el posteo')
    }
  })
  .catch(error => console.error('Error:', error))
}