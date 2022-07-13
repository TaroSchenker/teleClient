document.addEventListener("DOMContentLoaded", () => {
    getPosts()
})

const addTelegram = document.forms['telegram-form']
// const getPostsButton = document.querySelector('.getPosts')
const postForm = document.querySelector('#postForm')
console.log(postForm)

// getPostsButton.addEventListener('click', async () => {
//     console.log('hi')
//     const data =  await getPosts()
// })

postForm.addEventListener('click', async () => {
    const data =  await getPosts()
    document.getElementById("telegram-form").reset();
    location.reload();
return false;
    //    clearPosts('#tweet-container') 
})

async function getPosts() {
 
    const response = await fetch('http://localhost:3000/posts')
        const data = await response.json()
        console.log(data)
        renderPost(data)
}

function makePost(newToday, title, sendersName, story){
    fetch("http://localhost:3000/posts", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "title": `"${title}"`,
            "name": `${sendersName}`,
            "story": `${story}`,
            "date": `${newToday}`,
        }),
    }).then(res => res.json())
        .then(res => {
            console.log(res)
            renderPost(res)
        })
}

//submit post. post response contains all the posts
addTelegram.addEventListener('submit', (e) => {
    console.log('form submit')
    e.preventDefault()
    const title = addTelegram.querySelector('#title').value
    const sendersName = addTelegram.querySelector('#name').value
    const story = addTelegram.querySelector('#story').value
    console.log(title, sendersName, story)

    const newToday = createDateString()
    console.log('new today', newToday)
    makePost(newToday, title, sendersName, story)
})

function createDateString(){
    const today = new Date();
    const d = new Date()
    const hours = String(d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds());
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
 
    const newToday = /*hours + " " */ yyyy + '-' + mm + '-' + dd;
    return newToday
}



const renderPost =  (posts) => {
  
    posts.reverse().forEach(post => {
        const tweetContainer = document.getElementById('tweet-container')
        const tweet = document.createElement('div') //card
        const titleDate = document.createElement('div') // card header
        const title = document.createElement('h5')
        const date = document.createElement('p') 
        const name = document.createElement('h6')// card title
        const story = document.createElement('h6')//card-text

        //add classes
        tweet.classList.add("tweet-individual", "card", "my-3")
        titleDate.classList.add("d-flex","card-header", "pt-4")
        date.classList.add("mx-5")
        name.classList.add("blockquote-footer", "mt-1")
        story.classList.add("card-text", "my-3")
        
    
        title.innerText = post.title
        date.innerText = post.date
        name.innerText = post.name
        story.innerText = post.story
    
        titleDate.append(title, date)
        tweet.append(titleDate, story, name)
        tweetContainer.appendChild(tweet)
   
      
    
    })
    
}

//function will clear the child elements from the parent passed in.
function clearPosts(ParentElement) {
    const itemsToRemove = document.querySelector(`${ParentElement}`);
    while (itemsToRemove.firstChild) {
      itemsToRemove.removeChild(itemsToRemove.lastChild);
    }
  }
  