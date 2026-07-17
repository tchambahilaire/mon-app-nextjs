"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)
  const visiblePages = pages.filter((p) => {
    if (p === 1 || p === totalPages) return true
    if (Math.abs(p - currentPage) <= 1) return true
    return false
  })

  return (
    <div className="flex items-center justify-center gap-2 mt-6">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-lg border border-[#1f2a50] text-[#6a7aaa] hover:border-[#00f0ff] hover:text-[#00f0ff] transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {visiblePages.map((page, index) => {
        const prevPage = visiblePages[index - 1]
        if (prevPage && page - prevPage > 1) {
          return (
            <span key={`ellipsis-${page}`} className="px-2 text-[#6a7aaa]">
              …
            </span>
          )
        }
        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-4 py-2 rounded-lg border transition ${
              currentPage === page
                ? "border-[#00f0ff] text-[#00f0ff] bg-[#00f0ff]/10"
                : "border-[#1f2a50] text-[#6a7aaa] hover:border-[#00f0ff] hover:text-[#00f0ff]"
            }`}
          >
            {page}
          </button>
        )
      })}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg border border-[#1f2a50] text-[#6a7aaa] hover:border-[#00f0ff] hover:text-[#00f0ff] transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  )
}
