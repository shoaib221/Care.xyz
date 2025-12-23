"use client";
import { useEffect, useState } from "react";

export default function DateTimeSelect( { time } ) {
    const [date, setDate] = useState({
        day: 
        month: 0,
        year: 0,
        hour: 0
    });

    useEffect( () => {

    }, [date] )

    // Generate options
    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const months = Array.from({ length: 12 }, (_, i) => i + 1);
    const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i);
    const hours = Array.from({ length: 24 }, (_, i) => i);
    const minutes = Array.from({ length: 60 }, (_, i) => i);

    return (
        <div className="flex flex-col gap-4 max-w-sm">

            {/* 📅 Date */}
            <div className="flex gap-2">
                <select
                    value={date.day}
                    onChange={(e) => setDate({ ...date, day: e.target.value })}
                >
                    <option value="">Day</option>
                    {days.map((d) => (
                        <option key={d} value={d}>{d}</option>
                    ))}
                </select>

                <select
                    value={date.month}
                    onChange={(e) => setDate({ ...date, month: e.target.value })}
                >
                    <option value="">Month</option>
                    {months.map((m) => (
                        <option key={m} value={m}>{m}</option>
                    ))}
                </select>

                <select
                    value={date.year}
                    onChange={(e) => setDate({ ...date, year: e.target.value })}
                >
                    <option value="">Year</option>
                    {years.map((y) => (
                        <option key={y} value={y}>{y}</option>
                    ))}
                </select>
            </div>

            {/* ⏰ Time */}
            <div className="flex gap-2">
                <select
                    value={time.hour}
                    onChange={(e) => setTime({ ...time, hour: e.target.value })}
                >
                    <option value="">Hour</option>
                    {hours.map((h) => (
                        <option key={h} value={h}>{String(h).padStart(2, "0")}</option>
                    ))}
                </select>

                {/* <select
                    value={time.minute}
                    onChange={(e) => setTime({ ...time, minute: e.target.value })}
                >
                    <option value="">Minute</option>
                    {minutes.map((m) => (
                        <option key={m} value={m}>{String(m).padStart(2, "0")}</option>
                    ))}
                </select> */}
            </div>

            {/* Preview */}
            <div className="text-sm text-gray-600">
                Selected: {date.day}/{date.month}/{date.year} – {time.hour}:{time.minute}
            </div>
        </div>
    );
}


export const DateTimeX = (  ) => {
    const [ time, setTime ] = useState( new Date() )


    const Tag = () => {

        return (
            <DateTimeSelect time={time} />
        )
    }


}
