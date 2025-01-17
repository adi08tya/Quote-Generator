
const quoteContainer = document.getElementById('quote-cont')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')
const loader = document.getElementById('loader')

let apiQuotes = []; 
// show loading
function loading(){
   loader.hidden=false;
   quoteContainer.hidden=true;
}
//hide loading
function complete(){
    quoteContainer.hidden=false;
    loader.hidden=true;

}
// show New Quotes
function newQuote(){
    loading();
    const quoteArray = apiQuotes.quotes;
    // Pick a random quote fron quotearray
    const quote = quoteArray[Math.floor(Math.random()*quoteArray.length)];
    if(!quote.author) quoteText.textContent = "Unknown";
    else authorText.textContent = quote.author; 
    if(quote.quote.length>100) quoteText.classList.add('long-quote');
    else quoteText.classList.remove('long-quote');
    quoteText.textContent = quote.quote;
    complete();
    //
}
// Get quotes from API
async function getQuotes() {
     loading();
     const apiUrl ='https://dummyjson.com/quotes?limit=0&skip=10';
     try{
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        // console.log(apiQuotes.quotes);
        newQuote();
        
     }catch(error){
         
     }
}

// tweet quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent}-${authorText.textContent}`;
    window.open(twitterUrl,'_blank')
}

// event listeners
newQuoteBtn.addEventListener('click',newQuote);
twitterBtn.addEventListener('click',tweetQuote);
// on load
getQuotes();
