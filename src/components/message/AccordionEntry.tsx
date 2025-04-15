"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface Entry {
  index: number;
  message: string;
}

interface AccordionEntryProps  {
  entries: Entry[];
};

export default function AccordionEntry({ entries }: AccordionEntryProps) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {entries.map((entry) => (
        <AccordionItem key={entry.index} value={`item-${entry.index}`}>
          <AccordionTrigger>Entry #{entry.index}</AccordionTrigger>
          <AccordionContent>{entry.message}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}