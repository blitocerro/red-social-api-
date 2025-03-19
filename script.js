const urlBase = "https://jsonplaceholder.typicode.com/posts";
let posts = [];

function getData() {
  fetch(urlBase)
    .then(res => res.json())
    .then(data => {
      posts = data;
      renderPostList();
    })
    .catch((error) => console.error("Error al llamar a la API:", error));
}

function renderPostList() {
  const postList = document.getElementById('postList');	
  postList.innerHTML = '';

  posts.forEach(post => {
    const listItem = document.createElement('li');
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
          <textarea id="editBody-${post.id}" required></textarea>
          <button onclick="updatePost(${post.id})">Actualizar</button>
      </div>
    `;

    postList.appendChild(listItem);
  });
}
