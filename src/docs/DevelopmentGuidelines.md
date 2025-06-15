
# ALEGI Development Guidelines

## Architecture & Organization

### Component Structure
- **Components**: All UI components should be placed in the `src/components` directory
- **Pages**: Page components should be placed in the `src/pages` directory
- **Contexts**: Context providers should be placed in the `src/contexts` directory
- **Hooks**: Custom hooks should be placed in the `src/hooks` directory
- **Utils**: Utility functions should be placed in the `src/utils` directory

### Naming Conventions
- Use PascalCase for component files (e.g., `Button.tsx`)
- Use camelCase for utility files (e.g., `formatDate.ts`)
- Use kebab-case for asset files (e.g., `hero-image.png`)

### Component Guidelines
- Create small, focused components (< 200 lines)
- Follow single responsibility principle
- Use TypeScript interfaces for props
- Document complex components with comments

## Performance Optimization

### Code-Splitting
- Use React.lazy() for route-based code splitting
- Import heavy components or libraries only when needed

### Asset Optimization
- Use responsive images with appropriate sizes
- Optimize SVGs and remove unnecessary metadata
- Use WebP format when possible for images

### Rendering Optimization
- Use React.memo() for components that re-render often with the same props
- Use useCallback() and useMemo() for expensive operations
- Avoid unnecessary re-renders in lists by using stable keys

## State Management
- Use React Context for global state that doesn't change often
- Consider useReducer for complex state logic
- Keep state as local as possible

## Styling
- Follow Tailwind CSS best practices
- Create reusable utility classes for common patterns
- Use CSS variables for theming and consistent values

## Adding New Features
1. Create a new branch in your local environment
2. Implement the feature with appropriate tests
3. Submit a pull request with a detailed description
4. Ensure all tests pass before merging

## Updating Existing Features
1. Document the change and its rationale
2. Make minimal changes to achieve the objective
3. Test thoroughly to ensure no regressions
4. Update related documentation

## Prompt Management
- Store prompts in a dedicated directory with clear naming
- Version prompts with date or version number
- Document prompt parameters and expected outputs
- Include examples of successful responses

## Change Management
- Document all changes in CHANGELOG.md
- Use semantic versioning (MAJOR.MINOR.PATCH)
- Include migration guides for breaking changes
