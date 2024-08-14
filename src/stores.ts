import { writable } from 'svelte/store';

// Define a writable store for questions
export let questions = writable<Array<any>>([]);
export let showQuestions = writable<boolean>(false);
export let showResults = writable<boolean>(false);
export let selectedDifficulty = writable<string>("");
export let selectedCategory = writable<string>("");
export let options = writable<Array<any>>([]);
export let points = writable<number>(0);
export let wrong = writable<number>(0);
export let correct = writable<number>(0);