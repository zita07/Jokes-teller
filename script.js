// Declaring variables
const audioElement = document.getElementById("jokeAudio");
const jokeButton = document.getElementById("tellJokeButton");
const repeatJokeButton = document.getElementById("repeatLastJoke");
const textJoke = document.getElementById("textJoke");
let cachedJoke;

// main functions
// Get Jokes from Joke API
async function getAJoke() {
  let joke;
  const apiUrl =
    "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit";
  try {
    let response = await fetch(apiUrl);
    let data = await response.json();
    joke = processJoke(data);
    cachedJoke = joke;
    textJoke.textContent = joke;
  } catch (error) {
    console.log("Error when fetching a joke: ", error);
  }

  return joke;
}
// Passing Joke to VoiceRSS API
function tellAJoke(joke) {
  VoiceRSS.speech({
    key: "0f9ebd9f75a94b97a80e1d7afe910716",
    src: joke,
    hl: "en-us",
    v: "Amy",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
}

// Utillity functions
function processJoke(joke) {
  if (joke.type === "single") {
    return joke.joke;
  } else {
    return `${joke.setup} ... ${joke.delivery}`;
  }

  return "No joke returned, something happened when processing the joke";
}

// Event Listeners
jokeButton.addEventListener("click", async () => {
  jokeButton.disabled = true;
  repeatJokeButton.disabled = true;

  tellAJoke(await getAJoke());
});
repeatJokeButton.addEventListener("click", () => {
  jokeButton.disabled = true;
  repeatJokeButton.disabled = true;

  tellAJoke(cachedJoke);
});
audioElement.addEventListener("ended", () => {
  jokeButton.disabled = false;
  repeatJokeButton.disabled = false;
});
textJoke.textContent = "Click 'Tell me a joke'";
