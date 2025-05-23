"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { act } from "react";

export default function Filter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();

  const activeFilter = searchParams.get("capacity") ?? "";

  function handleFilter(filter) {
    const params = new URLSearchParams(searchParams);
    params.set("capacity", filter);
    router.replace(`${pathName}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="border border-primary-800 flex">
      <Button
        filter={"all"}
        activeFilter={activeFilter}
        handleFilter={handleFilter}
      >
        All
      </Button>
      <Button
        filter={"small"}
        activeFilter={activeFilter}
        handleFilter={handleFilter}
      >
        1&mdash;3 Guests
      </Button>
      <Button
        filter={"medium"}
        activeFilter={activeFilter}
        handleFilter={handleFilter}
      >
        4&mdash;7 Guests
      </Button>
      <Button
        filter={"large"}
        activeFilter={activeFilter}
        handleFilter={handleFilter}
      >
        8&mdash;12 Guests
      </Button>
    </div>
  );
}

function Button({ filter, activeFilter, handleFilter, children }) {
  return (
    <button
      onClick={() => handleFilter(filter)}
      className={`px-5 py-2 hover:bg-primary-700 ${
        activeFilter === filter ? "bg-primary-700 text-primary-50" : ""
      }`}
    >
      {children}
    </button>
  );
}
