"use client";

import { Link, Visit } from "@prisma/client";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";

interface LinkWithVisits extends Link {
  visits: Visit[];
}

interface LinksTableProps {
  links: LinkWithVisits[];
  origin: string;
}

export function LinksTable({ links, origin }: LinksTableProps) {
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };
  const handleOpen = (text: string) => {
    window.open(text, "_blank");
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "redirectionUrl",
        header: "Redirection URL",
        enableSorting: false, // has btn tags, no point sorting
        cell: (info: any) => (
          <div className="flex items-center gap-2">
            <span>{`${origin}/${info.row.original.slug}`}</span>
            <button
              onClick={() => handleCopy(`${origin}/${info.row.original.slug}`)}
              className="bg-primary-light hover:bg-accent-dark text-primary-dark font-bold py-1 px-2 rounded text-sm"
            >
              Copy
            </button>
            <button
              onClick={() => handleOpen(`${origin}/${info.row.original.slug}`)}
              className="bg-primary-light hover:bg-accent-dark text-primary-dark font-bold py-1 px-2 rounded text-sm"
            >
              Open
            </button>
          </div>
        ),
      },
      {
        accessorKey: "originalUrl",
        header: "Original URL",
        cell: (info: any) => info.getValue(),
      },
      {
        accessorKey: "createdAt",
        header: "Created At",
        cell: (info: any) => new Date(info.getValue()).toLocaleString(),
      },
      {
        accessorKey: "clicks",
        header: "Visit Count",
        cell: (info: any) => info.getValue(),
      },
      {
        accessorKey: "lastVisit",
        header: "Last Visit",
        enableSorting: true,
        cell: (info: any) =>
          info.row.original.visits.length > 0
            ? new Date(info.row.original.visits[0].timestamp).toLocaleString()
            : "N/A",
      },
    ],
    [origin]
  );

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });
  const [sorting, setSorting] = useState([]);

  const table = useReactTable({
    data: links,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    state: {
      pagination,
      sorting,
    },
  });

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-primary-dark border border-primary-light text-accent-light">
        <thead className="bg-accent-dark text-primary-dark">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="py-2 px-4 border-b border-accent-dark bg-accent-dark text-left"
                >
                  {header.isPlaceholder ? null : (
                    <div
                      {...{
                        className: header.column.getCanSort()
                          ? "cursor-pointer select-none flex items-center justify-between"
                          : "",
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {{
                        asc: " ▲",
                        desc: " ▼",
                      }[header.column.getIsSorted() as string] ?? null}
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="bg-primary-dark">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="py-2 px-4 border-b border-primary-light"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
          {table.getRowModel().rows.length <
            table.getState().pagination.pageSize &&
            Array.from(
              {
                length:
                  table.getState().pagination.pageSize -
                  table.getRowModel().rows.length,
              },
              (_, i) => (
                <tr key={`empty-${i}`}>
                  {columns.map((column: any) => (
                    <td
                      key={column.accessorKey}
                      className="py-2 px-4 border-b border-primary-light"
                    >
                      &nbsp;
                    </td>
                  ))}
                </tr>
              )
            )}
        </tbody>
      </table>
      <div className="flex justify-between items-center mt-4 text-accent-light">
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="bg-primary-light hover:bg-accent-dark text-primary-dark font-bold py-2 px-4 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page{" "}
          <strong>
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </strong>
        </span>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="bg-primary-light hover:bg-accent-dark text-primary-dark font-bold py-2 px-4 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
