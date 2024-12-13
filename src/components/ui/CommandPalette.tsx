import { Fragment, useState, useEffect } from 'react'
import { Dialog, Combobox, Transition } from '@headlessui/react'
import { useRouter } from 'next/navigation'
import { useTheme } from '@/app/providers'

interface CommandItem {
  id: string
  name: string
  description?: string
  url?: string
  icon?: React.ReactNode
  action?: () => void
  category: 'navigation' | 'theme' | 'social' | 'action'
}

const commands: CommandItem[] = [
  // Navigation Commands
  {
    id: 'home',
    name: 'Home',
    url: '/',
    category: 'navigation',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    id: 'projects',
    name: 'Projects',
    url: '/projects',
    category: 'navigation',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    id: 'blog',
    name: 'Blog',
    url: '/blog',
    category: 'navigation',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15" />
      </svg>
    ),
  },
  {
    id: 'guestbook',
    name: 'Guestbook',
    url: '/guestbook',
    category: 'navigation',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
      </svg>
    ),
  },
  {
    id: 'contact',
    name: 'Contact',
    url: '/contact',
    category: 'navigation',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  // Theme Commands
  {
    id: 'toggle-theme',
    name: 'Toggle Theme',
    category: 'theme',
    description: 'Switch between light and dark mode',
    action: () => {}, // Will be set in the component
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
      </svg>
    ),
  },
  // Social Commands
  {
    id: 'github',
    name: 'GitHub',
    url: 'https://github.com/yourusername',
    category: 'social',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
      </svg>
    ),
  },
  {
    id: 'twitter',
    name: 'Twitter',
    url: 'https://twitter.com/yourusername',
    category: 'social',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
      </svg>
    ),
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/yourusername',
    category: 'social',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  // Action Commands
  {
    id: 'download-resume',
    name: 'Download Resume',
    category: 'action',
    description: 'Download my resume in PDF format',
    url: '/resume.pdf',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
]

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const router = useRouter()
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault()
        setIsOpen(!isOpen)
      }
    }
    window.addEventListener('keydown', handleKeydown)
    return () => window.removeEventListener('keydown', handleKeydown)
  }, [isOpen])

  // Update toggle theme action
  useEffect(() => {
    const themeCommand = commands.find((c) => c.id === 'toggle-theme')
    if (themeCommand) {
      themeCommand.action = toggleTheme
      themeCommand.description = `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`
    }
  }, [theme, toggleTheme])

  const filteredCommands = query === ''
    ? commands
    : commands.filter((command) =>
        command.name.toLowerCase().includes(query.toLowerCase()) ||
        command.description?.toLowerCase().includes(query.toLowerCase())
      )

  const handleSelect = (command: CommandItem) => {
    setIsOpen(false)
    if (command.action) {
      command.action()
    } else if (command.url) {
      if (command.url.startsWith('http')) {
        window.open(command.url, '_blank')
      } else {
        router.push(command.url)
      }
    }
  }

  const groupedCommands = filteredCommands.reduce((acc, command) => {
    if (!acc[command.category]) {
      acc[command.category] = []
    }
    acc[command.category].push(command)
    return acc
  }, {} as Record<string, CommandItem[]>)

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        onClose={setIsOpen}
        className="fixed inset-0 z-50 overflow-y-auto p-4 pt-[25vh]"
      >
        <Transition.Child
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-gray-500/75 dark:bg-gray-900/75 transition-opacity" />
        </Transition.Child>

        <Transition.Child
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Combobox
            onChange={handleSelect}
            as="div"
            className="relative max-w-xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-2xl ring-1 ring-black/5 divide-y divide-gray-100 dark:divide-gray-700 overflow-hidden"
          >
            <div className="flex items-center px-4">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <Combobox.Input
                onChange={(event) => setQuery(event.target.value)}
                className="w-full bg-transparent border-0 px-4 py-4 text-sm text-gray-800 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-0"
                placeholder="Search commands..."
              />
              <kbd className="hidden sm:inline-block px-2 py-1 text-xs font-semibold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 rounded">
                esc
              </kbd>
            </div>

            <Combobox.Options static className="max-h-96 overflow-y-auto py-4 text-sm">
              {Object.entries(groupedCommands).map(([category, items]) => (
                <div key={category} className="px-4 py-2">
                  <h2 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                    {category}
                  </h2>
                  {items.map((command) => (
                    <Combobox.Option key={command.id} value={command}>
                      {({ active }) => (
                        <div
                          className={`px-4 py-2 space-x-1 rounded-md ${
                            active
                              ? 'bg-primary-500 text-white'
                              : 'text-gray-800 dark:text-gray-200'
                          }`}
                        >
                          <div className="flex items-center">
                            {command.icon}
                            <span className="ml-3">{command.name}</span>
                          </div>
                          {command.description && (
                            <p
                              className={`ml-8 text-sm ${
                                active
                                  ? 'text-primary-100'
                                  : 'text-gray-500 dark:text-gray-400'
                              }`}
                            >
                              {command.description}
                            </p>
                          )}
                        </div>
                      )}
                    </Combobox.Option>
                  ))}
                </div>
              ))}
            </Combobox.Options>
          </Combobox>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  )
}
