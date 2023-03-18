// selecting elements 
const quoteContainer = document.querySelector('#quote-container');
const quoteText = document.querySelector('#quote-text');
const quoteAuthor = document.querySelector('#quote-author');
const newQuoteBtn = document.querySelector('#new-quote-btn');
const twitterBtn = document.querySelector('#twitter-btn');
const loader = document.querySelector('#loader');
// Loading Spinner Shown
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}
// Remove Loading Spinner
function complete() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}
// get quotes form api
let apiQuotes = [];
async function getQuotes() {
  loading();
  try {
    const apiUrl = 'https://type.fit/api/quotes';
    const fetchRes = await fetch(apiUrl);
    apiQuotes = await fetchRes.json();
    newQuote();
  } catch(e) {
    console.error(e.message);
  }
}
// show new quote
function newQuote() {
  loading();
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

  if(!quote.author){
    quoteAuthor.textContent = 'Unknown';
  }else{
    quoteAuthor.textContent = quote.author;
  }

  if(quote.text.length >= 100){
    quoteText.classList.add('long-quote');
  }else{
    quoteText.classList.remove('long-quote');
  }

  quoteText.textContent = quote.text;
  complete();
}
// tweet quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} By ${quoteAuthor.textContent}`;
  window.open(twitterUrl, '_blank');
}
// Event Listeners
twitterBtn.addEventListener('click', () => tweetQuote());
newQuoteBtn.addEventListener('click', () => newQuote());
// on load
getQuotes();