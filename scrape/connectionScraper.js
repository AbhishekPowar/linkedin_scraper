/*
 * This is a JavaScript Scratchpad.
 *
 * Enter some JavaScript, then Right Click or choose from the Execute Menu:
 * 1. Run to evaluate the selected text (Ctrl+R),
 * 2. Inspect to bring up an Object Inspector on the result (Ctrl+I), or,
 * 3. Display to insert the result in a comment after the selection. (Ctrl+L)
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
} 

async function run(){
  count  =10
  while (count>0){
    count-=1
    console.log(count)
    await sleep(2000)
    await  window.scrollTo(0,document.body.scrollHeight)
  }

}

function getLinks(){
  alldivContainingLinks  = document.querySelectorAll('.mn-connection-card__details')
console.log(alldivContainingLinks)
allLinks = Array.from(alldivContainingLinks).map(userDiv => userDiv.querySelector('a').href)
 
}


