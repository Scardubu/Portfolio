import type { Preview } from '@storybook/react'
import { Providers } from '../src/app/providers'
import '../src/app/globals.css'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    nextjs: {
      appDirectory: true,
    },
  },
  decorators: [
    (Story) => (
      <Providers>
        <div className="p-4">
          <Story />
        </div>
      </Providers>
    ),
  ],
}

export default preview
