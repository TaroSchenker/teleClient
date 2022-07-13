
const addTelegram = document.forms['telegram-form']
const getPostsButton = document.querySelector('.getPosts')


getPostsButton.addEventListener('click', async () => {
    console.log('hi')
    const data =  await getPosts()
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

    // const today = new Date();
    // const d = new Date()
    // const hours = String(d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds());
    // const dd = String(today.getDate()).padStart(2, '0');
    // const mm = String(today.getMonth() + 1).padStart(2, '0');
    // const yyyy = today.getFullYear();
    // const newToday = hours + " " + yyyy + '-' + mm + '-' + dd;
const newToday = createDateString()
console.log('new today', newToday)
makePost(newToday, title, sendersName, story)

function createDateString(){
    const today = new Date();
    const d = new Date()
    const hours = String(d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds());
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    const newToday = hours + " " + yyyy + '-' + mm + '-' + dd;
    return newToday
}


    // fetch("https://496d0a30-44f8-4822-bcef-5aa90b1bd2ba.mock.pstmn.io", {
    //     method: 'POST',
    //     headers: {
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //         // "id": 13,
    //         "title": `"${newToday}"`,
    //         "name": `${sendersName}`,
    //         "story": `${story}`,
    //         "date": `${newToday}`,
    //     }),
    // }).then(res => res.json())
    //     .then(res => {
    //         console.log(res)
    //         renderPost(res)
    //     })
        
})




const renderPost =  (posts) => {

    posts.forEach(post => {
        const tweetContainer = document.getElementById('tweet-container')
        const tweet = document.createElement('div')
        const titleDate = document.createElement('div')
        const title = document.createElement('h5')
        const date = document.createElement('p')
        const name = document.createElement('h6')
        const story = document.createElement('h6')

        //add classes
        tweet.classList.add("tweet-individual", "mt-3", "alert", "alert-success")
        titleDate.classList.add("d-flex")
        date.classList.add("px-3")
        
    
        title.innerText = post.title
        date.innerText = post.date
        name.innerText = post.name
        story.innerText = post.story
    
        titleDate.append(title, date)
        tweet.append(titleDate, name, story)
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
  