document.addEventListener("DOMContentLoaded", function() {

//get the book names
//attach them to the list
//add event of click to bring up info page
//add like button
const bookList = document.getElementById("list")
const bookPanel = document.getElementById("show-panel")
const likesPanel = document.getElementById("likes")

const getBooks= ()=> {
    return fetch('http://localhost:3000/books')
    .then(resp=>resp.json())
    .then((data)=>{
        data.forEach((element) =>renderBooks(element))
    })
}
getBooks()

const renderBooks = (book) => {

    const bookLine = document.createElement("li");
    bookLine.innerText = book.title;
    bookList.appendChild(bookLine);

    bookLine.addEventListener("click", ()=>{
        clearList()
        renderPanel(book)
    })
}
function clearList() {
    while (likesPanel.firstChild) {
        likesPanel.removeChild(likesPanel.firstChild);
        if (document.querySelector("button")){
            document.querySelector("button").remove()}
    }
}
const renderPanel = (book) => {
    //img, title, subtitle, author, description, likes(ul)
    const imgPanel = document.getElementById("bookImg")
    const titlePanel = document.getElementById("title")
    const subPanel = document.getElementById("subtitle")
    const authorPanel = document.getElementById("author")
    const descPanel = document.getElementById("desc")
    const btn = document.createElement("button")
    btn.innerText = "Like!"
    bookPanel.appendChild(btn)

    btn.addEventListener("click", (e)=>{
        const newUser = {
            'username': "Dan"
        }
        if(btn.innerText === "Like!"){
            btn.innerText = "Unlike!"
        
            book.users.push(newUser)
            console.log(book.users)

            
        
            fetch(`http://localhost:3000/books/${book.id}`,{
                method: 'PATCH',
                headers: {
                    'Content-Type': "application/json",
                    
                },
                body: JSON.stringify({'users': `${book.users}`})
                
                
            })
            .then(resp=>resp.json())
            .then(()=>renderLikes(newUser))
        
        }else{ //unlike
            btn.innerText = "Like!"
                book.users.pop()
                console.log(book.users)
            fetch(`http://localhost:3000/books/${book.id}`,{
                method: 'PATCH',
                headers: {
                    'Content-Type': "application/json",
                    
                },
                body: JSON.stringify({'users': book.users}
                
                )
            })
            .then(resp=>resp.json())
            .then(()=>likesPanel.removeChild(likesPanel.lastChild))

        }


    })

    imgPanel.src = book.img_url
    titlePanel.innerText =  book.title
    subPanel.innerText = book.subtitle
    authorPanel.innerText = book.author
    descPanel.innerText = book.description
    book.users.forEach((user)=>{  
        renderLikes(user)
    })
   
}


function renderLikes(user){
        const userLine = document.createElement("li")
        userLine.innerText = user.username
        likesPanel.appendChild(userLine)
   
    
   }





















});
