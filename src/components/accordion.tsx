'use client';

import { ChevronDown } from 'lucide-react';
import React, { memo, useCallback, useState } from 'react';

type AccordionItemProps = {
  title: string;
  content: string;
  isOpen: boolean;
  onClick: () => void;
};

const AccordionItem = memo(
  ({ title, content, isOpen, onClick }: AccordionItemProps) => (
    <div>
      <button
        className="flex w-full items-center justify-between py-4 hover:text-amber-400 focus:outline-none"
        onClick={onClick}
        aria-expanded={isOpen}
      >
        <span className="text-lg font-medium">{title}</span>
        <ChevronDown
          className={`size-5 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-200 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="pb-4">{content}</p>
      </div>
    </div>
  )
);

AccordionItem.displayName = 'AccordionItem';

type AccordionProps = {
  items: { title: string; content: string }[];
  defaultOpen?: number;
};

export const Accordion = ({ items, defaultOpen = -1 }: AccordionProps) => {
  const [openIndex, setOpenIndex] = useState<number>(defaultOpen);

  const handleClick = useCallback((index: number) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? -1 : index));
  }, []);

  return (
    <div className="divide-y divide-gray-200">
      {items.map((item, index) => (
        <AccordionItem
          key={`${item.title}-${index}`}
          title={item.title}
          content={item.content}
          isOpen={openIndex === index}
          onClick={() => handleClick(index)}
        />
      ))}
    </div>
  );
};
