"use client";

import { useState } from "react";

import { Calendar } from "@/components/ui/calendar";
import { DatePickerDemo } from "@/components/ui/datePicker";

export default function Page() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    // <Calendar
    //   mode="single"
    //   selected={date}
    //   onSelect={setDate}
    //   className="rounded-md border shadow"
    // />
    <DatePickerDemo />
  );
}
