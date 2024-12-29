# ClearConsent

A modern patient consent management system for healthcare providers.

## Features

- Doctor onboarding and authentication
- Patient management dashboard
- Procedure management
- Secure consent form handling
- Modern, responsive UI built with Material-UI

## Tech Stack

- React 18
- TypeScript
- Material-UI (MUI)
- React Router v6
- Context API for state management

## Getting Started

### Prerequisites

- Node.js 16+ and npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/clearconsent.git
cd clearconsent/client
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will be available at `http://localhost:3000`.

## Development

### Testing Authentication

For development testing, you can use any email/password combination to log in. The system currently uses mock authentication that will create a test doctor account.

Example credentials:
- Email: test@example.com
- Password: password123

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App

## Project Structure

```
src/
  ├── components/        # React components
  │   ├── doctor/       # Doctor-specific components
  │   ├── home/         # Homepage components
  │   └── shared/       # Shared components
  ├── contexts/         # React contexts
  ├── theme/            # MUI theme configuration
  └── types/            # TypeScript type definitions
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
