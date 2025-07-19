"use client";

import { Link, Visit } from "@prisma/client";

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
  };
  const handleOpen = (text: string) => {
    window.open(text, "_blank");
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-primary-dark border border-primary-light text-accent-light">
        <thead className="bg-accent-dark text-primary-dark">
          <tr>
            <th className="py-2 px-4 border-b border-accent-dark bg-accent-dark text-left">
              Redirection URL
            </th>
            <th className="py-2 px-4 border-b border-accent-dark bg-accent-dark text-left">
              Original URL
            </th>
            <th className="py-2 px-4 border-b border-accent-dark bg-accent-dark text-left">
              Created At
            </th>
            <th className="py-2 px-4 border-b border-accent-dark bg-accent-dark text-left">
              Visit Count
            </th>
            <th className="py-2 px-4 border-b border-accent-dark bg-accent-dark text-left">
              Last Visit
            </th>
          </tr>
        </thead>
        <tbody className="bg-primary-dark">
          {links.map((link) => (
            <tr key={link.id}>
              <td className="py-2 px-4 border-b border-primary-light">
                <div className="flex items-center gap-2">
                  <span>{`${origin}/${link.slug}`}</span>
                  <button
                    onClick={() => handleCopy(`${origin}/${link.slug}`)}
                    className="bg-primary-light hover:bg-accent-dark text-primary-dark font-bold py-1 px-2 rounded text-sm"
                  >
                    Copy
                  </button>
                  <button
                    onClick={() => handleOpen(`${origin}/${link.slug}`)}
                    className="bg-primary-light hover:bg-accent-dark text-primary-dark font-bold py-1 px-2 rounded text-sm"
                  >
                    Open
                  </button>
                </div>
              </td>
              <td className="py-2 px-4 border-b border-primary-light">
                {link.originalUrl}
              </td>
              <td className="py-2 px-4 border-b border-primary-light">
                {new Date(link.createdAt).toLocaleString()}
              </td>
              <td className="py-2 px-4 border-b border-primary-light">
                {link.clicks}
              </td>
              <td className="py-2 px-4 border-b border-primary-light">
                {link.visits.length > 0
                  ? new Date(link.visits[0].timestamp).toLocaleString()
                  : "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
