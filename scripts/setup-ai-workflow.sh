#!/bin/bash

# AI Workflow Setup Script for Angular Development
# This script sets up the AI-enhanced development workflow for your Angular project

set -e

echo "🚀 Setting up AI-Enhanced Angular Development Workflow"
echo "=================================================="

# Create necessary directories
echo "📁 Creating directory structure..."
mkdir -p docs/angular-rules
mkdir -p docs/ai-workflow

# Download official Angular Rules File
echo "📥 Downloading official Angular Rules File..."
if command -v curl &> /dev/null; then
    curl -o docs/angular-rules/angular-20.mdc https://angular.dev/assets/context/angular-20.mdc
    echo "✅ Angular Rules File downloaded successfully"
else
    echo "⚠️  curl not found. Please manually download the Angular Rules File from:"
    echo "   https://angular.dev/assets/context/angular-20.mdc"
    echo "   and save it as: docs/angular-rules/angular-20.mdc"
fi

# Context7 Integration
echo "🔗 Setting up Context7 Angular Components integration..."
echo "📝 Note: Visit https://context7.com/angular/components to add their rules"
echo "   The context7-components.mdc file has been created as a placeholder"
echo "   You can populate it with Context7's specific Angular component rules"

# Create .cursorrules if it doesn't exist
if [ ! -f .cursorrules ]; then
    echo "📝 Creating .cursorrules file..."
    cat > .cursorrules << 'EOF'
# Cursor AI Configuration for Angular Development

## Project Context
- **Framework**: Angular 18.1.2
- **TypeScript**: 5.4.5
- **Project**: at-accelerator (TV Show Management Application)
- **Architecture**: Standalone components, reactive forms, RxJS state management

## AI Assistance Configuration

### Context Files Priority
1. `docs/llms.txt` - Core guidelines for quick reference
2. `docs/llms-full.txt` - Comprehensive patterns for complex scenarios
3. `docs/angular-rules/angular-20.mdc` - Official Angular rules
4. `docs/angular-rules/context7-components.mdc` - Context7 Angular Components rules
5. `docs/angular-rules/typescript-best-practices.mdc` - TypeScript guidelines
6. `docs/angular-rules/accessibility-standards.mdc` - Accessibility compliance
7. `docs/angular-rules/performance-guidelines.mdc` - Performance optimization

### Code Generation Preferences
- **Components**: Always use standalone components with OnPush change detection
- **Services**: Injectable with proper DI and error handling
- **Forms**: Reactive forms with strong typing
- **State Management**: RxJS with proper subscription cleanup
- **Testing**: Comprehensive unit tests with TestBed
- **Documentation**: JSDoc comments for public APIs

### Angular-Specific Patterns
- Use `app-` prefix for component selectors
- Implement proper lifecycle hooks (OnInit, OnDestroy)
- Use trackBy functions in *ngFor loops
- Prefer async pipe over manual subscriptions
- Implement proper error boundaries
- Use Angular CDK for accessible components

### TypeScript Best Practices
- Strict TypeScript configuration
- Prefer interfaces over types for object shapes
- Use utility types appropriately
- Avoid `any` type - use `unknown` when needed
- Implement proper generic constraints
- Use barrel exports for clean imports

### Performance Guidelines
- OnPush change detection strategy
- Proper subscription management with takeUntil
- Lazy loading for modules and components
- Bundle optimization with tree shaking
- Virtual scrolling for large lists
- Debouncing for user inputs

### Accessibility Standards
- WCAG 2.1 AA compliance
- Semantic HTML elements
- Proper ARIA attributes
- Keyboard navigation support
- Color contrast ratios (4.5:1 minimum)
- Screen reader compatibility

This configuration ensures consistent, high-quality Angular development with AI assistance while maintaining performance, accessibility, and maintainability standards.
EOF
    echo "✅ .cursorrules file created"
else
    echo "ℹ️  .cursorrules file already exists"
fi

# Create .cursorignore if it doesn't exist
if [ ! -f .cursorignore ]; then
    echo "📝 Creating .cursorignore file..."
    cat > .cursorignore << 'EOF'
# Cursor AI Context Exclusions

# Dependencies
node_modules/
package-lock.json

# Build outputs
dist/
.angular/
build/

# IDE and editor files
.vscode/
.idea/
*.swp
*.swo
*~

# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# Logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
lerna-debug.log*

# Coverage directory used by tools like istanbul
coverage/
*.lcov
.nyc_output/

# Angular specific
.angular/cache/

# Large binary files
*.zip
*.tar.gz
*.rar
*.7z

# Local configuration files
.env.local
.env.development.local
.env.test.local
.env.production.local
EOF
    echo "✅ .cursorignore file created"
else
    echo "ℹ️  .cursorignore file already exists"
fi

# Install additional dependencies for AI workflow
echo "📦 Installing additional dependencies for AI workflow..."
npm install --save-dev @angular/cdk @angular/cdk/a11y

# Create a README for the AI workflow
echo "📝 Creating AI workflow documentation..."
cat > docs/ai-workflow/README.md << 'EOF'
# AI-Enhanced Angular Development Workflow

## Overview

This project uses an AI-enhanced development workflow with Cursor IDE to improve code quality, productivity, and maintainability.

## Setup

The AI workflow has been configured with the following files:

### Core Configuration Files
- `.cursorrules` - Cursor AI configuration and preferences
- `.cursorignore` - Files excluded from AI context
- `docs/ai-workflow-guide.md` - Comprehensive workflow guide

### LLM Resource Files
- `docs/llms.txt` - Core guidelines for quick reference
- `docs/llms-full.txt` - Comprehensive patterns for complex scenarios

### Angular Rules Files
- `docs/angular-rules/angular-20.mdc` - Official Angular rules
- `docs/angular-rules/typescript-best-practices.mdc` - TypeScript guidelines
- `docs/angular-rules/accessibility-standards.mdc` - Accessibility compliance
- `docs/angular-rules/performance-guidelines.mdc` - Performance optimization

## Usage

### Getting Started
1. Open the project in Cursor IDE
2. The AI will automatically use the configured rules and guidelines
3. Ask the AI for help with:
   - Component generation
   - Service implementation
   - Form handling
   - Error handling
   - Performance optimization
   - Accessibility compliance

### Best Practices
- Always review AI-generated code before implementing
- Test thoroughly, especially accessibility features
- Keep the rules files updated as the project evolves
- Share successful patterns with the team

### Maintenance
- Update rules files monthly
- Review AI suggestions weekly
- Update Angular Rules File when Angular releases new versions
- Monitor performance and accessibility compliance

## Resources

- [AI Workflow Guide](ai-workflow-guide.md)
- [Angular Official Rules](https://angular.dev/assets/context/angular-20.mdc)
- [Cursor IDE Documentation](https://cursor.sh/docs)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

## Support

For questions about the AI workflow:
1. Check the comprehensive guide in `docs/ai-workflow-guide.md`
2. Review the specific rules files in `docs/angular-rules/`
3. Consult the team for project-specific patterns
EOF

echo "✅ AI workflow documentation created"

# Create a quick start guide
echo "📝 Creating quick start guide..."
cat > docs/ai-workflow/quick-start.md << 'EOF'
# Quick Start Guide - AI-Enhanced Angular Development

## First Steps

1. **Open in Cursor**: Open this project in Cursor IDE
2. **Verify Setup**: Check that `.cursorrules` and `.cursorignore` are present
3. **Test AI**: Try asking the AI to generate a component or service

## Common AI Prompts

### Generate a Component
```
Create a user profile component with form validation and accessibility features
```

### Generate a Service
```
Create a data service with error handling and caching
```

### Code Review
```
Review this component for performance, accessibility, and TypeScript best practices
```

### Debug Help
```
Help me debug this error and suggest improvements
```

## Key Features

- **Automatic Best Practices**: AI follows Angular and TypeScript best practices
- **Accessibility Compliance**: Built-in WCAG 2.1 AA compliance
- **Performance Optimization**: OnPush change detection and memory management
- **Type Safety**: Strict TypeScript usage with proper interfaces
- **Error Handling**: Comprehensive error handling patterns

## Tips

- Be specific in your prompts
- Ask for explanations when needed
- Review generated code before implementing
- Test accessibility features manually
- Monitor performance impact

## Next Steps

1. Read the comprehensive guide: `docs/ai-workflow-guide.md`
2. Explore the rules files in `docs/angular-rules/`
3. Start developing with AI assistance
4. Share successful patterns with the team
EOF

echo "✅ Quick start guide created"

echo ""
echo "🎉 AI Workflow Setup Complete!"
echo "=============================="
echo ""
echo "Your Angular project is now configured for AI-enhanced development."
echo ""
echo "Next steps:"
echo "1. Open the project in Cursor IDE"
echo "2. Read the quick start guide: docs/ai-workflow/quick-start.md"
echo "3. Try asking the AI to generate a component or service"
echo "4. Review the comprehensive guide: docs/ai-workflow-guide.md"
echo ""
echo "Happy coding with AI assistance! 🚀"
