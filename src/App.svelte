<script lang="ts">
  import svelteLogo from "./assets/svelte.svg";
  import viteLogo from "/vite.svg";
  let showQuestions = false;
  let showResults = false;
  let points = 0;
  let wrong = 0;
  let correct = 0;

  //difficulty levels
  let difficulties = ["easy", "hard"];
  let selectedDifficulty = "";
  //$: console.log(selectedDifficulty);
  function selectDifficulty(level: string) {
    selectedDifficulty = level;
  }

  //categories
  let categories = ["General", "Science & Nature", "Television", "Vehicles", "Video Games", "Math", "Mythology", "Celebrities", "Animals", "Books", "Music", "Computers"];
  let selectedCategory = "";
  //$: console.log(selectedCategory);
  function selectCategory(category: string) {
    selectedCategory = category;
  }

  //convert category to number for api call
  function getCategoryNumber(category: string) {
    switch (category) {
      case "General":
        return 9;
      case "Science & Nature":
        return 17;
      case "Television":
        return 14;
      case "Vehicles":
        return 28;
      case "Video Games":
        return 15;
      case "Math":
        return 19;
      case "Mythology":
        return 20;
      case "Celebrities":
        return 26;
      case "Animals":
        return 27;
      case "Books":
        return 10;
      case "Music":
        return 12;
      case "Computers":
        return 18;
      default:
        return 9;
    }
  }

  //fetch trivia questions
  let questions = [];
  function startGame() {
    let categoryNumber = getCategoryNumber(selectedCategory);
    fetch(
      `https://opentdb.com/api.php?amount=5&category=${categoryNumber}&difficulty=${selectedDifficulty}&type=multiple`
    )
      .then((response) => response.json())
      .then((data) => {
        //console.log("API response:", data);
        questions = data.results;
        options = questions.map(getShuffledOptions);
        //console.log("Questions:", questions);
        //console.log("Options:", options);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    showQuestions = true;
  }

  //shuffle options
  let options = [];
  function getShuffledOptions(question) {
    //combine the correct answer with the incorrect answers
    let options = [question.correct_answer, ...question.incorrect_answers];
    //shuffle the array
    for (let i = options.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [options[i], options[j]] = [options[j], options[i]];
    }
    return options;
  }

  //display one question at a time
  let currentQuestionIndex = 0;

  function nextQuestion() {
    showCorrect = false;
    submitMessage = "";
    if (currentQuestionIndex < questions.length - 1) {
      currentQuestionIndex++;
    } else {
      showResultsPage();
    }
  }

  //select answer
  let selectedAnswer = null;

  function selectAnswer(option) {
    selectedAnswer = option;
    //console.log("Selected Answer:", selectedAnswer);
  }

  //submit answer
  let submitMessage = "";
  let showCorrect = false;
  function submitAnswer() {
    if (selectedAnswer === questions[currentQuestionIndex].correct_answer) {
      submitMessage = "Correct!";
      points += 10;
      correct++;
    } else {
      submitMessage = `Wrong! The correct answer is: ${questions[currentQuestionIndex].correct_answer}`;
      wrong++;
    }
    showCorrect = true;
    selectedAnswer = null;
  }

  //show results
  function showResultsPage() {
    showQuestions = false;
    showResults = true;
  }
</script>

<main class="max-w-2xl">
  <div class="flex justify-center">
    <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
      <img src={viteLogo} class="h-32 p-6" alt="Vite Logo" />
    </a>
    <a href="https://svelte.dev" target="_blank" rel="noreferrer">
      <img src={svelteLogo} class="h-32 p-6" alt="Svelte Logo" />
    </a>
  </div>
  <h1 class="text-2xl">Vite + Svelte Trivia App</h1>
  <p class="mb-4">Using <a href="https://opentdb.com/api_config.php" target="_blank" class="text-purple-500">Open Trivia API</a></p>

  <!-- only show selectors when not in game -->
  {#if showQuestions === false && showResults === false}
    <p class="max-w-lg mb-4">
      This trivia app is built with Vite and Svelte. Please Select a difficulty
      level below to begin.
    </p>
    <div class="text-white mt-8">
      <button
        on:click={() => selectDifficulty("easy")}
        class="px-4 py-2 bg-purple-500 rounded-md mx-4 hover:-translate-y-2 transition-all ease-in-out"
        >Easy</button
      >
      <button
        on:click={() => selectDifficulty("hard")}
        class="px-4 py-2 bg-red-500 rounded-md mx-4 hover:-translate-y-2 transition-all ease-in-out"
        >Hard</button
      >
    </div>

    <div class="my-4">
      {#if selectedDifficulty != ""}
        <p class="mb-2">Select a category</p>
        {#each categories as category}
          <button
            on:click={() => selectCategory(category)}
            class="text-white px-4 py-2 bg-blue-500 rounded-md mx-4 my-2 hover:-translate-y-2 transition-all ease-in-out"
            >{category}</button
          >
        {/each}
      {/if}
    </div>

    {#if selectedDifficulty != "" && selectedCategory != ""}
      <p>You selected: {selectedDifficulty} {selectedCategory.toLowerCase()}</p>
      <button
        on:click={startGame}
        class="p-6 mt-2 text-white bg-green-500 rounded-full">GO</button
      >
    {/if}
  {/if}
  <!-- only show selectors when not in game -->

  {#if showQuestions === true}
    {#if questions.length > 0}
      <div class="flex flex-col items-center">
        <h2 class="text-xl mb-3">
          {@html questions[currentQuestionIndex].question}
        </h2>
        {#each options[currentQuestionIndex] as option}
          <button
            class="w-96 text-black p-2 bg-gray-200 m-2 rounded-full hover:bg-purple-500"
            class:bg-purple-500={selectedAnswer === option}
            class:bg-gray-200={selectedAnswer != option}
            class:bg-green-400={showCorrect &&
              questions[currentQuestionIndex].correct_answer === option}
            class:bg-red-400={showCorrect &&
              questions[currentQuestionIndex].correct_answer != option}
            on:click={() => selectAnswer(option)}
          >
            {@html option}
          </button>
        {/each}
        {#if showCorrect === false}
        <button
          disabled={selectedAnswer === null}
          on:click={submitAnswer}
          class="px-4 py-7 mt-2 text-white bg-green-500 rounded-full"
          >Submit</button
        >
        {/if}
        <p class="my-2">{submitMessage}</p>
        {#if submitMessage != ""}
          <button
            on:click={nextQuestion}
            class="text-white px-4 py-2 bg-blue-500 rounded-md my-2 hover:-translate-y-2 transition-all ease-in-out"
            >Next Question</button
          >
        {/if}
      </div>
    {/if}
  {/if}

  {#if showResults === true}
    <h1 class="text-2xl mb-2">Results</h1>
    <p class="text-lg mb-4">
      You earned <span class="text-green-500">{points}</span> points by getting {correct}
      questions correct and {wrong} questions wrong.
    </p>
    <button
      on:click={() => window.location.reload()}
      class="px-4 py-2 bg-purple-500 rounded-md mx-4 hover:-translate-y-2 transition-all ease-in-out"
      >Play Again</button
    >
  {/if}

  {#if selectedDifficulty != "" && selectedCategory != "" && showQuestions === true}
    <footer class="border p-4 rounded-2xl mt-4 w-96 mx-auto">
      You are playing {selectedDifficulty}
      {selectedCategory.toLowerCase()} and you currently have:
      <p class="text-green-500 font-extrabold">{points} points</p>
      
      <p class="text-green-500 font-extrabold">{correct} correct answers</p>
      
      <p class="text-red-500 font-extrabold">{wrong} wrong answers</p>
      <button
      on:click={() => window.location.reload()}
      class="px-4 py-2 bg-blue-500 rounded-md mx-4 mt-4 text-white hover:-translate-y-2 transition-all ease-in-out"
      >Start Over</button
    >
    </footer>
   
    
  {/if}
</main>

<style global lang="postcss">
  @tailwind utilities;
  @tailwind components;
  @tailwind base;
</style>
