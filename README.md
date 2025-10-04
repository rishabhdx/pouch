# Pouch - Privacy-First Bookmark Manager

A modern, privacy-first, open-source bookmark manager built with React, Next.js, and TypeScript. Pouch offers both a web application and browser extension for seamless bookmark management across all your devices.

## ✨ Features

### 🌐 Web Application

- **Modern Dashboard**: Clean, intuitive interface for managing bookmarks
- **Collection Management**: Organize bookmarks into custom collections
- **Advanced Search**: Powerful search functionality with filters
- **Tag System**: Tag-based organization for better categorization
- **Data Views**: Switch between table and grid views
- **Responsive Design**: Works seamlessly across all devices
- **Authentication**: Secure user authentication with social login support

### 🔧 Browser Extension

- **One-Click Saving**: Save bookmarks directly from any webpage
- **Metadata Extraction**: Automatically captures page metadata and Open Graph data
- **Collection Selection**: Choose collections while saving bookmarks
- **Tag Management**: Add tags during the bookmark saving process
- **Cross-Browser Support**: Compatible with Chrome and Firefox

### 🔒 Privacy & Security

- **Privacy-First**: Your data stays private and secure
- **Self-Hostable**: Deploy on your own infrastructure
- **Open Source**: Fully transparent codebase
- **Secure Authentication**: Built with better-auth for robust security

### 🛠 Technical Features

- **Modern Tech Stack**: Built with React, Next.js, TypeScript, and Tailwind CSS
- **Database**: PostgreSQL with Drizzle ORM
- **Component Library**: Custom UI components built on Radix UI
- **Monorepo Architecture**: Well-organized workspace structure
- **Type Safety**: Full TypeScript coverage

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm package manager
- PostgreSQL database

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/rishabhdx/pouch.git
   cd pouch
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env
   ```

   Fill in your environment variables:

   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/pouch"
   BETTER_AUTH_SECRET="your-secret-key"
   ```

4. **Set up the database**

   ```bash
   pnpm db:push
   ```

5. **Start the development servers**

   ```bash
   # Start all applications
   pnpm dev

   # Or start individually
   pnpm dev:web      # Web app (localhost:3000)
   pnpm dev:api      # API server (localhost:8080)
   pnpm dev:extension # Browser extension dev mode
   ```

### Building for Production

```bash
# Build all applications
pnpm build

# Build individually
pnpm build:web
pnpm build:api
pnpm build:extension
```

## 📁 Project Structure

```
├── apps/
│   ├── web/          # Next.js web application
│   ├── api/          # API server
│   └── extension/    # Browser extension
├── packages/
│   ├── ui/           # Shared UI components
│   ├── db/           # Database schema and utilities
│   ├── auth/         # Authentication utilities
│   ├── eslint-config/     # Shared ESLint configuration
│   └── typescript-config/ # Shared TypeScript configuration
```

## 🧩 Browser Extension Development

The browser extension is built with [WXT](https://wxt.dev/) and supports both Chrome and Firefox.

### Development

```bash
pnpm dev:extension
```

### Building

```bash
pnpm build:extension
```

### Loading in Browser

1. Build the extension
2. Open your browser's extension management page
3. Enable "Developer mode"
4. Click "Load unpacked" and select the `apps/extension/.output` directory

## 🗃️ Database

The project uses PostgreSQL with Drizzle ORM. Database schema is defined in `packages/db/src/schema.ts`.

### Available Scripts

```bash
pnpm db:generate    # Generate migrations
pnpm db:push        # Push schema to database
pnpm db:studio      # Open Drizzle Studio
```

## 🎨 UI Components

The UI is built with a custom component library based on Radix UI and styled with Tailwind CSS. Components are located in `packages/ui/src/components`.

### Adding Components

```bash
# Add shadcn/ui components
pnpm dlx shadcn@latest add button -c apps/web
```

### Using Components

```tsx
import { Button } from "@pouch/ui/components/button";
import { Card } from "@pouch/ui/components/card";
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
   - Follow the existing code style
   - Add tests if applicable
   - Update documentation as needed
4. **Commit your changes**
   ```bash
   git commit -m "Add amazing feature"
   ```
5. **Push to your branch**
   ```bash
   git push origin feature/amazing-feature
   ```
6. **Open a Pull Request**

### Development Guidelines

- **Code Style**: Follow the ESLint configuration
- **Type Safety**: Maintain full TypeScript coverage
- **Testing**: Add tests for new features
- **Documentation**: Update README and component docs
- **Commits**: Use conventional commit messages

### Local Development Setup

1. Ensure all dependencies are installed: `pnpm install`
2. Set up your database and environment variables
3. Run `pnpm dev` to start all development servers
4. Make your changes and test thoroughly
5. Run `pnpm build` to ensure everything builds correctly

## 📜 Scripts

| Script            | Description                   |
| ----------------- | ----------------------------- |
| `pnpm dev`        | Start all development servers |
| `pnpm build`      | Build all applications        |
| `pnpm lint`       | Run ESLint on all packages    |
| `pnpm type-check` | Run TypeScript type checking  |
| `pnpm db:push`    | Push database schema          |
| `pnpm db:studio`  | Open database studio          |

## 🔧 Tech Stack

- **Frontend**: React, Next.js, TypeScript, Tailwind CSS
- **Backend**: Node.js, better-auth
- **Database**: PostgreSQL, Drizzle ORM
- **Extension**: WXT, TanStack Router
- **UI**: Radix UI, Lucide Icons
- **Build**: Turbo, pnpm workspaces
- **Deployment**: Vercel-ready

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the amazing component library
- [Radix UI](https://www.radix-ui.com/) for accessible primitives
- [WXT](https://wxt.dev/) for browser extension development
- [Drizzle](https://orm.drizzle.team/) for the excellent ORM
- [better-auth](https://www.better-auth.com/) for authentication

## 📞 Support

If you have any questions or need help:

- Open an [issue](https://github.com/rishabhdx/pouch/issues)
- Start a [discussion](https://github.com/rishabhdx/pouch/discussions)
- Check the [documentation](https://github.com/rishabhdx/pouch/wiki)

---

**Star ⭐ this repository if you find it helpful!**
