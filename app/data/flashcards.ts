export type FlashcardData = {
  question: string;
  answer: string;
  category: string;
  progressValue: number;
  progressMax?: number;
  mastered?: boolean;
};

export const flashcards = [
  {
    question: "What does HTML stand for?",
    answer: "HyperText Markup Language",
    category: "Web Development",
    progressValue: 0,
  },
  {
    question: "What is the difference between 'let' and 'const' in JavaScript?",
    answer:
      "'let' allows you to reassign the variable, while 'const' creates a constant reference that cannot be reassigned. Both are block-scoped.",
    category: "JavaScript",
    progressValue: 2,
  },
  {
    question: "What does CSS stand for?",
    answer: "Cascading Style Sheets",
    category: "Web Development",
    progressValue: 0,
  },
  {
    question: "What is the capital of France?",
    answer: "Paris",
    category: "Geography",
    progressValue: 5,
    mastered: true,
  },
  {
    question: "What is a closure in JavaScript?",
    answer:
      "A closure is a function that has access to variables in its outer lexical scope, even after the outer function has returned.",
    category: "JavaScript",
    progressValue: 1,
  },
  {
    question: "What does DOM stand for?",
    answer: "Document Object Model",
    category: "Web Development",
    progressValue: 3,
  },
  {
    question: "What does DOM stand for?",
    answer: "Document Object Model",
    category: "Web Development",
    progressValue: 3,
  },
  {
    question: "What is the Pythagorean theorem?",
    answer: "In a right triangle, a² + b² = c², where c is the hypotenuse.",
    category: "Mathematics",
    progressValue: 5,
    mastered: true,
  },
  {
    question: "What is the difference between '==' and '===' in JavaScript?",
    answer:
      "'==' checks for value equality with type coercion, while '===' checks for both value and type equality.",
    category: "JavaScript",
    progressValue: 4,
  },
  {
    question: "What is Flexbox used for in CSS?",
    answer:
      "Flexbox is a CSS layout model that helps distribute space and align items in a container, making it easier to create responsive layouts.",
    category: "CSS",
    progressValue: 0,
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    answer: "William Shakespeare",
    category: "Literature",
    progressValue: 5,
    mastered: true,
  },
  {
    question: "What is the purpose of the 'async' keyword in JavaScript?",
    answer:
      "The 'async' keyword declares an asynchronous function that returns a Promise and allows the use of 'await' inside it.",
    category: "JavaScript",
    progressValue: 2,
  },
] satisfies FlashcardData[];
