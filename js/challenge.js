const count = document.getElementById('counter');
let counter = parseInt(count.textContent,10);
let intervalId;
const commentForm = document.querySelector('form');
const liker = document.getElementById('heart');

document.addEventListener('DOMContentLoaded', () => {  
    
    intervalId = setInterval(() => {        
        counter++
        count.textContent = counter;
    }, (1000));

    increment();
    decrement();
    pause();

    commentForm.addEventListener('submit', (e) => {
        e.preventDefault(); 
        postComment(e.target["comment-input"].value);
        commentForm.reset();
    });

    liker.addEventListener('click',likeCounter);
})

function increment(){
    const increaseCount = document.getElementById('plus'); 
    increaseCount.addEventListener('click', () => {
        return counter++;
    })    
}

function decrement(){
    const decreaseCount = document.getElementById('minus');
    decreaseCount.addEventListener('click', () => {
        return counter--;
    })
}

function pause(){
    const pauseBtn = document.getElementById('pause');
    //Fetch nodelist of all buttons except button with id pause
    const disabledBtns = document.querySelectorAll('button:not(#pause)'); 
    
    pauseBtn.addEventListener('click', () => {
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = null; // Set intervalId to null to indicate paused state
            pauseBtn.textContent ='resume';

            disabledBtns.forEach(btn => btn.disabled = true);
        } else {
            // Resume functionality: restart interval from paused counter value
            intervalId = setInterval(() => {
                counter++;
                count.textContent = counter;
            }, 1000);
            pauseBtn.textContent ='pause';
            disabledBtns.forEach(btn => btn.disabled = false);
        }
    })
}

function postComment(comment){           
        const p = document.createElement('p');
        p.textContent = `${comment} `;
        document.querySelector('#list').appendChild(p);     
}

function likeCounter(){
    
    const container = document.querySelector('.likes');
    const currentNumber = count.textContent;
    // Check if the current number already exists in the likes list
    let existingLikeItem = Array.from(container.children).find(li => li.dataset.number === currentNumber);

    if (existingLikeItem) {
        // If it exists, increment the like count
        let currentLikes = parseInt(existingLikeItem.dataset.likes, 10);
        currentLikes++;
        existingLikeItem.dataset.likes = currentLikes;
        existingLikeItem.textContent = `Number ${currentNumber} has ${currentLikes} likes`;
    } else {
        // If it doesn't exist, create a new list item
        const li = document.createElement('li');
        li.dataset.number = currentNumber;
        li.dataset.likes = 1;
        li.textContent = `Number ${currentNumber} has 1 like`;
        container.appendChild(li);
    }
}