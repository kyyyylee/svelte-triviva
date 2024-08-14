<script lang="ts">
  import Header from "./lib/components/Header.svelte";
  import DifficultySelector from "./lib/components/DifficultySelector.svelte";
  import Questions from "./lib/components/Questions.svelte";
  import Results from "./lib/components/Results.svelte";
  import Footer from "./lib/components/Footer.svelte";
</script>

<main class="">
  <!--header-->
  <Header />

  <!--difficulty selector with props sent-->
  <DifficultySelector />

  <!--show questions-->
  <Questions />

  <!--results page after game-->
  <Results />

  <!--footer to show scores while in game-->
  <Footer />
</main>
