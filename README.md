# ProfilePilot: AI-Powered Personal Portfolio

This is a dynamic, AI-enhanced personal portfolio for Vikash Kumar Singh, built with Next.js and deployed using Firebase Studio. It showcases professional experience, skills, and projects while incorporating intelligent features to engage visitors.

## Key Features

- **AI Chatbot**: An interactive chatbot, powered by Google's Gemini model via Genkit, that can answer visitor questions about Vikash's skills, experience, and projects.
- **AI Resume Generator**: A tool that takes a job description and automatically generates a resume tailored to that specific role, highlighting the most relevant aspects of Vikash's profile.
- **Dynamic Content**: Sections for professional experience, education, technical skills, and key projects.
- **Contact Form**: A fully functional contact form that uses Resend to deliver messages directly.
- **Responsive Design**: A modern, fully responsive UI built with Tailwind CSS and ShadCN UI components.
- **Light/Dark Mode**: Theme toggling for user preference.

## Tech Stack

- **Framework**: Next.js (App Router) & React
- **Styling**: Tailwind CSS & ShadCN UI
- **Generative AI**: Google Gemini & Genkit
- **Email**: Resend
- **Deployment**: Firebase Studio (App Hosting)

## Getting Started

To run this project locally, you will need to have Node.js and npm installed.

### 1. Install Dependencies

Clone the repository and install the required packages:

```bash
npm install
```

### 2. Set Up Environment Variables

Create a `.env` file in the root of the project and add your API keys. These are necessary for the AI features and the contact form to work.

```
# Google AI API Key for Genkit
GEMINI_API_KEY=YOUR_GEMINI_API_KEY

# Resend API Key for the contact form
RESEND_API_KEY=YOUR_RESEND_API_KEY
RESEND_RECIPIENT_EMAIL=your-email@example.com
```

### 3. Run the Development Server

Start the Next.js development server:

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

### 4. Run the Genkit AI Flows

To enable the AI features, you need to run the Genkit development server in a separate terminal:

```bash
npm run genkit:dev
```
