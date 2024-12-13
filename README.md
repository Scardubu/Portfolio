# Modern Portfolio

A modern, performant, and accessible portfolio built with Next.js 14, TypeScript, Tailwind CSS, and Three.js. This portfolio showcases interactive 3D visualizations, smooth animations, and a fully responsive design with dark mode support.

## ✨ Key Features

### 🎨 Design & Interactivity
- Interactive 3D skills visualization using Three.js
- Smooth page transitions and animations with Framer Motion
- Dark/Light theme with system preference sync
- Responsive design with mobile-first approach
- Touch gestures and mobile optimizations
- Custom animations and transitions

### 🚀 Performance
- Server-side rendering with Next.js 14
- Image optimization with next/image and sharp
- Code splitting and lazy loading
- Bundle size optimization
- Performance monitoring and metrics
- Lighthouse score optimization

### 📱 Mobile & PWA
- Progressive Web App (PWA) support
- Offline functionality
- Touch gestures support
- Pull-to-refresh functionality
- Mobile navigation
- App-like experience

### 🔍 SEO & Accessibility
- SEO optimized with meta tags
- OpenGraph and Twitter cards
- Sitemap generation
- Robots.txt configuration
- WCAG 2.1 compliance
- Screen reader support
- Keyboard navigation

### 🛠️ Development
- TypeScript for type safety
- Tailwind CSS for styling
- Jest for unit testing
- Cypress for E2E testing
- Storybook for component documentation
- ESLint and Prettier for code quality

## 🚀 Getting Started

### Prerequisites

```bash
Node.js 18.x or later
npm or yarn
Git
```

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
```bash
# Create .env.local file
cp .env.example .env.local

# Add your environment variables
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your_verification_code
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

Visit [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

\`\`\`
portfolio/
├── .github/              # GitHub Actions workflows
├── .husky/              # Git hooks
├── .storybook/          # Storybook configuration
├── cypress/             # E2E tests
│   └── e2e/            # Test specs
├── public/              # Static assets
│   ├── icons/          # PWA icons
│   └── sw.js           # Service Worker
├── src/
│   ├── app/            # Next.js app directory
│   │   ├── layout.tsx  # Root layout
│   │   └── page.tsx    # Home page
│   ├── components/     # React components
│   │   ├── ui/        # UI components
│   │   └── sections/  # Page sections
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utility functions
│   └── styles/         # Global styles
├── cypress.config.ts    # Cypress configuration
├── jest.config.js      # Jest configuration
├── next.config.js      # Next.js configuration
├── tailwind.config.ts  # Tailwind configuration
└── tsconfig.json       # TypeScript configuration
\`\`\`

## 🛠️ Development

### Available Scripts

- \`npm run dev\`: Start development server
- \`npm run build\`: Build for production
- \`npm run start\`: Start production server
- \`npm run lint\`: Run ESLint
- \`npm run format\`: Format code with Prettier
- \`npm run type-check\`: Run TypeScript checks
- \`npm run test\`: Run Jest tests
- \`npm run test:coverage\`: Run tests with coverage
- \`npm run cypress\`: Open Cypress
- \`npm run e2e\`: Run E2E tests
- \`npm run storybook\`: Start Storybook
- \`npm run validate\`: Run all checks

### Testing

#### Unit Tests
```bash
# Run tests
npm run test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage
```

#### E2E Tests
```bash
# Open Cypress
npm run cypress

# Run E2E tests
npm run e2e

# Headless mode
npm run e2e:headless
```

### Component Documentation
```bash
# Start Storybook
npm run storybook

# Build static storybook
npm run build-storybook
```

## 🚀 Deployment

### Vercel Deployment

1. Push your code to GitHub
2. Import your repository in Vercel
3. Configure environment variables:
   - \`NEXT_PUBLIC_SITE_URL\`
   - \`NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION\`
4. Deploy

### Manual Deployment

1. Build the project:
```bash
npm run build
```

2. Start the production server:
```bash
npm run start
```

## 🔧 Customization

### Theme
- Edit \`tailwind.config.ts\` for theme customization
- Modify \`src/app/globals.css\` for global styles
- Update color schemes in components

### Content
- Update \`src/app/layout.tsx\` for metadata
- Modify components in \`src/components/sections\`
- Add new sections as needed

### Skills Visualization
- Edit \`src/components/SkillConstellation.tsx\`
- Update skills data
- Customize animations and interactions

## 📱 PWA Configuration

1. Icons:
   - Replace icons in \`public/icons\`
   - Update \`manifest.json\`

2. Service Worker:
   - Customize caching in \`public/sw.js\`
   - Update offline functionality

3. App Manifest:
   - Edit \`public/manifest.json\`
   - Update app information

## 🧪 Quality Assurance

### Code Quality
- ESLint for linting
- Prettier for formatting
- TypeScript for type checking
- Husky for pre-commit hooks

### Testing
- Jest for unit tests
- React Testing Library for component tests
- Cypress for E2E tests
- Storybook for visual testing

### Performance
- Lighthouse audits
- Web Vitals monitoring
- Bundle analysis
- Performance metrics

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Run tests and checks:
```bash
npm run validate
```
4. Commit your changes
5. Push to the branch
6. Open a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Next.js team for the framework
- Three.js for 3D graphics
- Framer Motion for animations
- Tailwind CSS for styling
- Vercel for hosting

## 📧 Contact

Your Name - [@yourusername](https://twitter.com/yourusername)

Project Link: [https://github.com/yourusername/portfolio](https://github.com/yourusername/portfolio)

## 💡 Support

Give a ⭐️ if this project helped you!
