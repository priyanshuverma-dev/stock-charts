"use client";

import Link from "next/link";
import React from "react";

type Stock = {
  name: string;
};

const fetchlist = async () => {
  const res = await fetch("http://localhost:8080/list");

  const data: Stock[] = await res.json();
  if (res.ok) {
    return data;
  } else {
    return [];
  }
};

export default async function StockSwitch() {
  const stocks = await fetchlist();

  return (
    <div>
      <ul>
        {stocks.map((stock) => (
          <li>
            <Link
              href={`?symbol=${stock.name}`}
              className="text-blue-500 font-semibold hover:underline"
            >
              {stock.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
