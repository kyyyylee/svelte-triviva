<script lang="ts">
  import {
    questions,
    showQuestions,
    showResults,
    options,
    points,
    wrong,
    correct,
  } from "../../stores";

  //display one question at a time
  let currentQuestionIndex = 0;
  $: questionsLength = $questions.length;

  function showResultsPage() {
    showQuestions.set(false);
    showResults.set(true);
  }

  function nextQuestion() {
    showCorrect = false;
    submitMessage = "";
    if (currentQuestionIndex < questionsLength - 1) {
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
    if (selectedAnswer === $questions[currentQuestionIndex].correct_answer) {
      submitMessage = "Correct!";
      points.update((n) => n + 10);
      correct.update((n) => n + 1);
    } else {
      submitMessage = `Wrong! The correct answer is: ${$questions[currentQuestionIndex].correct_answer}`;
      wrong.update((n) => n + 1);
    }
    showCorrect = true;
    selectedAnswer = null;
  }
</script>

{#if $showQuestions === true}
  {#if questionsLength > 0}
    <div class="flex flex-col items-center">
      <h2 class="text-xl mb-3 text-center">
        {@html $questions[currentQuestionIndex].question}
      </h2>
      {#each $options[currentQuestionIndex] as option}
        <button
          class="w-96 btn m-2"
          class:btn-outline={selectedAnswer === option}
          class:btn-success={showCorrect &&
            $questions[currentQuestionIndex].correct_answer === option}
          on:click={() => selectAnswer(option)}
        >
          {@html option}
        </button>
      {/each}
      {#if showCorrect === false}
        <button
          disabled={selectedAnswer === null}
          on:click={submitAnswer}
          class="btn btn-outline btn-success mt-4"
          >Submit</button
        >
      {/if}
      <p class="my-4 {submitMessage === 'Correct!' ? 'text-success' : 'text-error'}">{submitMessage}</p>
      {#if submitMessage != ""}
        <button
          on:click={nextQuestion}
          class="btn btn-primary btn-outline mt-4"
          >Next Question</button
        >
      {/if}
    </div>
  {/if}
{/if}
