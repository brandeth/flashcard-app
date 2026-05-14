"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "./Button";
import { Input } from "./Input";
import { TextArea } from "./TextArea";
import { Toast } from "./Toast";

export function CreateCardForm() {
  const [isToastVisible, setIsToastVisible] = useState(false);

  function handleCreateCard() {
    setIsToastVisible(true);
  }

  return (
    <div className="relative">
      {isToastVisible ? (
        <div className="absolute right-3 top-3 z-10 sm:right-[-36px]">
          <Toast onClose={() => setIsToastVisible(false)}>
            Card created successfully.
          </Toast>
        </div>
      ) : null}

      <form className="flex min-h-[452px] w-full flex-col rounded-[32px] border-brand-neutral-900 border-t border-r-4 border-b-4 border-l bg-brand-neutral-0 p-8 text-brand-neutral-900">
        <div className="flex flex-1 flex-col gap-4">
          <Input
            label="Question"
            name="question"
            placeholder="e.g., What is the capital of France?"
          />
          <TextArea label="Answer" name="answer" placeholder="e.g., Paris" />
          <Input label="Category" name="category" placeholder="e.g., Geography" />
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
          onClick={handleCreateCard}
          type="button"
        >
          Create Card
        </Button>
      </form>
    </div>
  );
}
