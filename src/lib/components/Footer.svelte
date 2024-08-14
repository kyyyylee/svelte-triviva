<script lang="ts">
  import {
    showQuestions,
    selectedDifficulty,
    selectedCategory,
    points,
    wrong,
    correct,
  } from "../../stores";
  //we need to use the get method so that we can access the data in the variables and apply functions/methods to them- like map!
  import { get } from "svelte/store";

  const getCategory = get(selectedCategory);
</script>

{#if $selectedDifficulty != "" && $selectedCategory != "" && $showQuestions === true}
  <footer
    class="flex flex-col items-center border-t-2 my-8 p-4text-center"
  >
    <h3 class="text-md pt-4">
      You are playing {$selectedDifficulty}
      {getCategory.toLowerCase()} and you currently have:
    </h3>
    <div class="flex gap-4  items-center mt-2">
    <p class="text-success">{$points} points </p>
    &bull;
    <p class="text-success">
      {$correct} correct {$correct === 1 ? "answer" : "answers"}
    </p>
    &bull;
    <p class="text-error">
      {$wrong} wrong {$wrong === 1 ? "answer" : "answers"}
    </p>
</div>
    <button
      on:click={() => window.location.reload()}
      class="btn btn-accent btn-outline mt-4">Start Over</button
    >
  </footer>
{/if}
