"use client"

export default function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-[#00f0ff] focus:text-[#080a1a] focus:p-4 focus:rounded-lg focus:font-bold"
    >
      Passer au contenu principal
    </a>
  )
}
