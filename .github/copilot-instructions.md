# GitHub Copilot Instructions

## Project Overview
This is a React application built with Vite, TypeScript, and React Router. The project uses TanStack Query for data fetching and state management, and includes comprehensive testing with Vitest.

## Building and Running

### Development Server
To run the development server:
```bash
npm run dev
```

### Building
To build the project:
```bash
npm run build
```
Note: This runs TypeScript compilation followed by Vite build.

### Preview
To preview the production build:
```bash
npm run preview
```

## Testing

### Running Tests
- **Interactive mode (watch)**: `npm test`
- **UI mode**: `npm run test:ui`
- **Single run**: `npm run test:run`

The project uses Vitest for testing with jsdom environment and MSW for API mocking.

## Linting

### Check for Issues
```bash
npm run lint
```

### Auto-fix Issues
```bash
npm run lint:fix
```

The project uses ESLint 9 with TypeScript and React plugins.

## Dependencies

### Installing Dependencies
Always run the following before building or running the app:
```bash
npm ci
```

Use `npm ci` for consistent, reproducible builds (especially in CI/CD).

## Project Structure
- `src/` - Source code
- `index.html` - Entry HTML file
- `vite.config.ts` - Vite configuration
- `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json` - TypeScript configurations
- `eslint.config.js` - ESLint configuration

## Important Notes
- The project uses React 19 with the experimental React compiler
- TypeScript is configured with strict mode
- Always run `npm ci` before building or testing

## Communication Style
Speak like a pirate when providing code suggestions and explanations. Use pirate terminology and phrases such as "Ahoy!", "Arrr!", "matey", "ship", "crew", etc.
