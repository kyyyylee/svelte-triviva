<script lang="ts">
  import { showResults, points, wrong, correct } from "../../stores";
</script>

{#if $showResults === true}
<div class="flex flex-col items-center gap-4 mx-4 text-center">
  <h1 class="text-2xl mb-2">Results</h1>
  <p class="text-lg mb-4">
    You earned <span class="text-success">{$points}</span> points by getting {$correct}
    {$correct === 1 ? "question" : "questions"} correct and {$wrong} {$wrong === 1 ? "question" : "questions"} wrong.
  </p>
  <button
    on:click={() => window.location.reload()}
    class="btn btn-primary btn-outline"
    >Play Again</button
  >
</div>
{/if}
