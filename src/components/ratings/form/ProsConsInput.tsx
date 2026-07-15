"use client";

import * as React from "react";
import {X} from "lucide-react";

import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";

import {cn} from "@/lib/utils";
import {useTranslations} from "next-intl";

interface Props {
  title: string;

  placeholder: string;

  value: string[];

  onChange: (items: string[]) => void;

  maxItems?: number;

  className?: string;
}

export default function ProsConsInput({
  title,
  placeholder,
  value,
  onChange,
  maxItems = 5,
  className,
}: Props) {
  const t = useTranslations('bookings');
  const [input, setInput] =
    React.useState("");

  function addItem() {
    const item = input.trim();

    if (!item) return;

    if (value.includes(item)) {
      return;
    }

    if (value.length >= maxItems) {
      return;
    }

    onChange([...value, item]);

    setInput("");
  }

  function removeItem(item: string) {
    onChange(
      value.filter((i) => i !== item),
    );
  }

  return (
    <div
      className={cn(
        "space-y-3",
        className,
      )}
    >
      <label className="text-sm font-medium">
        {title}
      </label>

      <div className="flex gap-2">
        <Input
          value={input}
          placeholder={placeholder}
          onChange={(e) =>
            setInput(e.target.value)
          }
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addItem();
            }
          }}
        />

        <Button
          type="button"
          onClick={addItem}
        >
          {t('add')}
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {value.map((item) => (
          <Badge
            key={item}
            variant="secondary"
            className="gap-1"
          >
            {item}

            <button
              type="button"
              onClick={() =>
                removeItem(item)
              }
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
      </div>

      <p className="text-xs text-muted-foreground">
        {value.length}/{maxItems}
      </p>
    </div>
  );
}