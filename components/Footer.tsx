import Link from "next/link"

export default function Footer() {
  return (
    <div className="w-full text-center py-4 mt-auto border-t border-[#1f2a4a]">
      <p className="text-[#475569] text-sm font-['Courier_New',monospace]">
        Développé par{' '}
        <Link 
          href="/developpe-par" 
          className="text-[#00f0ff] hover:text-[#b47aff] transition-colors duration-300 hover:shadow-[0_0_20px_#00f0ff33]"
        >
          Mon Général
        </Link>
        {' '}© 2026
      </p>
      <p className="text-[#3a4a6a] text-xs mt-1 font-['Courier_New',monospace]">
        ✦ Next.js 16 · Prisma · Neon · Full Stack ✦
      </p>
    </div>
  )
}
