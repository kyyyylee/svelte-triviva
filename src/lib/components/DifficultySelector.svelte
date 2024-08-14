<script lang="ts">
  //import values from store
  //because multiple components are using the same variables, they need to be in a seperate stores.ts file so that they cal all use them
  import {
    questions,
    showQuestions,
    showResults,
    selectedDifficulty,
    selectedCategory,
    options,
  } from "../../stores";
  //we need to use the get method so that we can access the data in the variables and apply functions/methods to them- like map!
  import { get } from "svelte/store";

  function selectDifficulty(difficulty: string) {
    //instead of using = we use the .set
    selectedDifficulty.set(difficulty);
  }

  //categories
  let categories = [
    "General",
    "Science & Nature",
    "Television",
    "Vehicles",
    "Video Games",
    "Math",
    "Mythology",
    "Celebrities",
    "Animals",
    "Books",
    "Music",
    "Computers",
  ];

  function selectCategory(category: string) {
    selectedCategory.set(category);
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
  function startGame() {
    //here is the get
    let category = get(selectedCategory);
    let difficulty = get(selectedDifficulty);
    let categoryNumber = getCategoryNumber(category);
    fetch(
      `https://opentdb.com/api.php?amount=5&category=${categoryNumber}&difficulty=${difficulty}&type=multiple`
    )
      .then((response) => response.json())
      .then((data) => {
        questions.set(data.results);

        //use the get function from svelte/store to access the current value of the store
        const updatedOptions = get(questions).map(getShuffledOptions);
        options.set(updatedOptions);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    showQuestions.set(true);
  }

  //shuffle options
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
</script>

<!-- only show selectors when not in game -->
{#if $showQuestions === false && $showResults === false}
  <div class="flex flex-col gap-4 items-center">
    <h1 class="text-2xl text-accent">Lets Play!</h1>
    <p>Please Select a difficulty level below to begin.</p>
  </div>
  <div class="mt-8 flex justify-center gap-8 mb-16">
    <button on:click={() => selectDifficulty("easy")} class="btn { $selectedDifficulty === 'easy' ? 'btn-outline' : '' }">Easy</button>
    <button on:click={() => selectDifficulty("hard")} class="btn { $selectedDifficulty === 'hard' ? 'btn-outline' : '' }">Hard</button>
  </div>

  {#if $selectedDifficulty != ""}
    <p class="text-center">Select a category</p>
    <div class="mt-8 flex flex-wrap gap-4 justify-center mx-1">
      {#each categories as category}
        <button on:click={() => selectCategory(category)} class="btn { $selectedCategory === category ? 'btn-outline' : '' }"
          >{category}</button
        >
      {/each}
    </div>
  {/if}

  {#if $selectedDifficulty != "" && $selectedCategory != ""}
    <div class="flex flex-col items-center my-12 gap-4">
      <p>
        You selected: {$selectedDifficulty}
        {$selectedCategory.toLowerCase()}
      </p>
      <button
        on:click={startGame}
        class="btn btn-outline btn-success">GO</button
      >
    </div>
  {/if}
{/if}
<!-- only show selectors when not in game -->
