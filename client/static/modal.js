const form = document.querySelector("form");
const listOnPage = document.querySelector('.container');
const API_URL = "http://localhost:3000/posts";

function listNewPost(postId){
    fetch(`http://localhost:3000/posts/${postId}`)
        .then(response => response.json())
        .then(post => {
                const div = document.createElement('div');
                div.classList.add("postContainer")
                const header = document.createElement('h3');
                header.textContent = post.title;
                const contents = document.createElement('p');
                contents.textContent = post.author;
                const date = document.createElement('p');
                date.textContent = post.content;
                div.appendChild(header);
                div.appendChild(contents);
                div.appendChild(date);
                const postDiv = document.getElementById("newPostDiv")
                postDiv.appendChild(div);
                form.style.display = "none";
            })
        .catch(error => {
            console.log(error)
        });

}
form.addEventListener("submit", async(event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const title = formData.get("title");
    const author = formData.get("author");
    const content = formData.get("body");
    const post = {
        title,
        author,
        content
    };
    const sentPost = await fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify({...post}),
        headers: {
            'content-type': 'application/json'
        },
    })
    const newPost = await sentPost.json();
    listNewPost(newPost.id)
});
