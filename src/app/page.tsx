'use client'

import dynamic from 'next/dynamic'
import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Experience } from '@/components/sections/Experience'
import { Skills } from '@/components/sections/Skills'
import { Projects } from '@/components/sections/Projects'
import { Contact } from '@/components/sections/Contact'
import { Footer } from '@/components/ui/Footer'

const DynamicSkillConstellation = dynamic(
  () => import('@/components/SkillConstellation'),
  { ssr: false }
)

export default function Home() {
  return (
    <>
      <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
        <Hero>
          <DynamicSkillConstellation />
        </Hero>
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
