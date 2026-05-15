"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import { Button } from "./Button";
import { Input } from "./Input";
import { TextArea } from "./TextArea";

export type CreateCardFormValues = {
  answer: string;
  category: string;
  question: string;
};

type CreateCardFormProps = {
  onCreateCard: (values: CreateCardFormValues) => void;
};

type CreateCardFormErrors = Partial<Record<keyof CreateCardFormValues, string>>;

export function CreateCardForm({ onCreateCard }: CreateCardFormProps) {
  const [errors, setErrors] = useState<CreateCardFormErrors>({});

  function handleCreateCard(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const values = {
      answer: String(formData.get("answer") ?? "").trim(),
      category: String(formData.get("category") ?? "").trim(),
      question: String(formData.get("question") ?? "").trim(),
    };
    const nextErrors: CreateCardFormErrors = {};

    if (!values.question) {
      nextErrors.question = "Please enter a question.";
    }

    if (!values.answer) {
      nextErrors.answer = "Please enter an answer.";
    }

    if (!values.category) {
      nextErrors.category = "Please enter a category.";
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    onCreateCard(values);
    form.reset();
  }

  return (
    <div>
      <form
        className="flex min-h-[452px] w-full flex-col rounded-[32px] border-brand-neutral-900 border-t border-r-4 border-b-4 border-l bg-brand-neutral-0 p-8 text-brand-neutral-900"
        noValidate
        onSubmit={handleCreateCard}
      >
        <div className="flex flex-1 flex-col gap-4">
          <Input
            label="Question"
            name="question"
            onChange={() => {
              setErrors((currentErrors) => ({
                ...currentErrors,
                question: undefined,
              }));
            }}
            placeholder="e.g., What is the capital of France?"
            validationMessage={errors.question}
          />
          <TextArea
            label="Answer"
            name="answer"
            onChange={() => {
              setErrors((currentErrors) => ({
                ...currentErrors,
                answer: undefined,
              }));
            }}
            placeholder="e.g., Paris"
            validationMessage={errors.answer}
          />
          <Input
            label="Category"
            name="category"
            onChange={() => {
              setErrors((currentErrors) => ({
                ...currentErrors,
                category: undefined,
              }));
            }}
            placeholder="e.g., Geography"
            validationMessage={errors.category}
          />
        </div>

        <Button
          className="mt-5 min-h-10 self-start px-4 py-2"
          iconLeft={
            <Image
              src="/assets/plus.svg"
              alt=""
              aria-hidden="true"
              width={16}
              height={16}
              className="size-4"
            />
          }
          type="submit"
        >
          Create Card
        </Button>
      </form>
    </div>
  );
}
