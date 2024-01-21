// Define an object of categories and their corresponding quotes
let categories =  JSON.parse(localStorage.getItem("categories")) || 
{
  "Quran": [
    { text: "Allah is with the patient.", author: "Quran 2:153" },
    { text: "Indeed, Allah is with those who are mindful of Him and those who do good.", author: "Quran 16:128" },
  ],
  "Hadith": [
    { text: "The believer does not slander, curse, or speak in an obscene or foul manner.", author: "Prophet Muhammad (PBUH)" },
    { text: "Whoever is kind, Allah will be kind to him.", author: "Prophet Muhammad (PBUH)" },
  ],
};

let savedQuotes = JSON.parse(localStorage.getItem("savedQuotes")) || [];

// Function to add a new quote to the selected category
function addQuote() {
  let quoteInput = document.getElementById("new-quote").value;
  let quoteTitleInput = document.getElementById("new-quote-title").value;

  if (quoteInput.trim() === "" && quoteTitleInput.trim() === "") {
    alert("Please enter both the quote text and author.");
  } else if (quoteInput.trim() === "") {
    alert("Please enter the quote text.");
  } else if (quoteTitleInput.trim() === "") {
    alert("Please enter the author.");
  } else {
    // Get the selected category from the dropdown menu
    const categorySelect = document.getElementById("category");
    const category = categorySelect.options[categorySelect.selectedIndex].value;

    // Retrieve the quotes array for the selected category
    const quotes = categories[category];

    // Create a new quote object
    const newQuote = {
      text: quoteInput,
      author: quoteTitleInput,
    };

    // Add the new quote to the quotes array
    quotes.push(newQuote);

    // Clear the input fields
    document.getElementById("new-quote").value = "";
    document.getElementById("new-quote-title").value = "";

    // Save the updated categories object to local storage
    localStorage.setItem("categories", JSON.stringify(categories));

    // Display the updated quotes
    generateQuote();
  }
}
// Save the quotes to local storage
function saveQuotes() {
  // Get the current quote text and author
  const quoteTextElement = document.getElementById("quote-text").innerText;
  const quoteAuthorElement = document.getElementById("quote-author").innerText;

  // Check if the quote already exists in the savedQuotes array
  const isDuplicate = savedQuotes.some((quote) => {
    return quote.text === quoteTextElement && quote.author === quoteAuthorElement;
  });
  if (isDuplicate) {
    // Display an error message to the user
    alert("This quote is already saved!");
    return;
  }
  // Create a new object for the saved quote
  const savedQuote = {
    text: quoteTextElement,
    author: quoteAuthorElement,
  };
  // Add the saved quote to the array of saved quotes
  savedQuotes.push(savedQuote);

  // Save the updated saved quotes to local storage
  localStorage.setItem("savedQuotes", JSON.stringify(savedQuotes));

  // Display the saved quotes
  displaySavedQuotes();
}

// Function to delete a quote from the saved quotes
function deleteQuote(index) {
  // Remove the quote from the savedQuotes array at the specified index
  savedQuotes.splice(index, 1);

  // Save the updated saved quotes to local storage
  localStorage.setItem("savedQuotes", JSON.stringify(savedQuotes));

  // Display the saved quotes
  displaySavedQuotes();
}

// Bind the displaySavedQuotes function to the window load event
window.addEventListener("load", displaySavedQuotes);

// Function to generate a saved quote
function generateSavedQuote(quoteText, quoteAuthor) {
  // Set the saved quote text and author inside the respective <div> elements
  const quoteTextElement = document.getElementById("quote-text");
  const quoteAuthorElement = document.getElementById("quote-author");
  quoteTextElement.textContent = quoteText;
  quoteAuthorElement.textContent = quoteAuthor;

  // Scroll to the top of the page to display the generated quote
  window.scrollTo(0, 0);
}

function displaySavedQuotes() {
  // Retrieve the saved quotes from local storage
  let savedQuotes = JSON.parse(localStorage.getItem("savedQuotes")) || [];

  // Get the container for saved quotes
  const savedQuotesContainer = document.getElementById("saved-quotes-container");

  // Clear the container
  savedQuotesContainer.innerHTML = "";

  // Iterate over the saved quotes array and create HTML elements for each quote
  savedQuotes.forEach((quote, index) => {
    console.log(quote);
    const quoteElement = document.createElement("div");
    quoteElement.className = "saved-quote";
    quoteElement.innerHTML = `
      <div class="saved-quote-text">${quote?.text.length > 20 ? `${quote?.text.slice(0, 20)}...` : quote?.text}</div>
      <div class="saved-quote-author">${quote?.author.length > 20 ? `${quote?.author.slice(0, 20)}...` : quote?.author}</div>
      <div class="saved-quote-delete"><i class="fas fa-trash-alt" data-index="${index}" onclick="deleteQuote(${index})"></i></div>
      <hr/>
    `;

    // Bind the generateSavedQuote function to the saved quote element
    bindGenerateSavedQuoteEvent(quoteElement, quote);

    savedQuotesContainer.appendChild(quoteElement);
  });
}

// Bind the generateSavedQuote function to the saved quote elements
function bindGenerateSavedQuoteEvent(quoteElement, quote) {
  const quoteText = quote.text;
  const quoteAuthor = quote.author;
  quoteElement.addEventListener("click", function() {
    generateSavedQuote(quoteText, quoteAuthor);
  });
}

// To generate a default quote
window.addEventListener("load", generateQuote);

// Function to generate a random quote from a selected category
function generateQuote() {
  // Get the selected category from the dropdown menu
  const categorySelect = document.getElementById("category");
  const category = categorySelect.options[categorySelect.selectedIndex].value;

  const quotes = categories[category];
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const selectedQuote = quotes[randomIndex];

  // Set the selected quote text and author inside the respective <div> elements
  const quoteTextElement = document.getElementById("quote-text");
  const quoteAuthorElement = document.getElementById("quote-author");
  quoteTextElement.innerText = selectedQuote.text;
  quoteAuthorElement.innerText = selectedQuote.author;
  
}
// Bind the addQuote function to the "Add Quote" button
const addQuoteButton = document.getElementById("add-quote-button");
if(addQuoteButton) addQuoteButton.addEventListener("click", addQuote);

// Bind the saveQuotes function to the "Save Quotes" button
const saveQuotesButton = document.getElementById("save-quotes-button");
if(saveQuotesButton) saveQuotesButton.addEventListener("click", saveQuotes);

// Display the saved quotes on page load
displaySavedQuotes();

function toggleSavedQuotes() {
  const savedQuotesContainer = document.querySelector(".saved-quotes");
  const showQuotesButton = document.querySelector("#show-quotes");

  if (savedQuotesContainer.style.display === "none") {
    savedQuotesContainer.style.display = "block";
    showQuotesButton.textContent = "Hide Saved Quotes";
  } else {
    savedQuotesContainer.style.display = "none";
    showQuotesButton.textContent = "Show Saved Quotes";
  }
}

function handleMediaQuery(mediaQuery) {
  const showQuotesButton = document.querySelector("#show-quotes");
  const savedQuotesContainer = document.querySelector(".saved-quotes");

  if (mediaQuery.matches) {
    savedQuotesContainer.style.display = "block";
    showQuotesButton.textContent = "Hide Saved Quotes";
  } else {
    savedQuotesContainer.style.display = "none";
    showQuotesButton.textContent = "Show Saved Quotes";
  }
}

const showQuotesButton = document.querySelector("#show-quotes");
showQuotesButton.addEventListener("resize", toggleSavedQuotes);

const mediaQuery = window.matchMedia("(min-width: 600px)");
handleMediaQuery(mediaQuery);

mediaQuery.addListener(handleMediaQuery);


