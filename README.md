# Storenv

![Storenv Logo](public/logo.png)

Storenv is a secure environment variable storage and management solution built with Next.js 13, offering encrypted storage and easy access to your project configurations.

## Features

- **Secure Storage**: All environment variables are encrypted before being stored in the database
- **User Authentication**: Supports Google and GitHub authentication
- **Project Management**: Create, update, and delete environment configurations
- **Easy Access**: Copy individual variables or entire project configurations with one click
- **Responsive Design**: Works seamlessly across desktop and mobile devices

## Tech Stack

- **Framework**: Next.js 13 (App Router)
- **Authentication**: NextAuth.js
- **Database**: MongoDB with Mongoose
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **Encryption**: Crypto-js
- **Form Handling**: React Hook Form
- **Notifications**: React Hot Toast

## Getting Started

### Prerequisites

- Node.js 16.8 or later
- MongoDB database
- Google OAuth credentials
- GitHub OAuth credentials

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/storenv.git
```
2. Install dependencies:
```bash
npm install
```

3. Create a `.env.` file in the root directory:
```bash
MONGODB_URI=your_mongodb_uri
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GITHUB_ID=your_github_client_id
GITHUB_SECRET=your_github_client_secret
ENCRYPTION_KEY=your_encryption_key
```


4. Start the development server:
```bash
npm run dev
```

---

## Usage

1. **Authentication**: Sign in using Google or GitHub
2. **Create Project**: Click "Add New Project" to create a new environment configuration
3. **Add Variables**: Enter your environment variables with their corresponding values
4. **Manage Projects**: View, edit, or delete your projects from the dashboard
5. **Copy Values**: Use the copy buttons to copy individual variables or entire project configurations

## Security

- Environment variables are encrypted using AES-256 encryption
- Values are hidden by default and only shown when explicitly requested
- Authentication is required to access any stored data
- Each user can only access their own environment variables

## API Routes

### `POST /api/envs`
Creates a new environment configuration

### `GET /api/envs`
Retrieves all environment configurations for the authenticated user

### `PUT /api/envs/[id]`
Updates an existing environment configuration

### `DELETE /api/envs/[id]`
Deletes an environment configuration

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Next.js team for the amazing framework
- Vercel for hosting
- MongoDB for database services
- NextAuth.js for authentication
