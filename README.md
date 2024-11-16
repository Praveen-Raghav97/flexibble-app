# Project Sharing Platform

A **Project Sharing Platform** built using **Next.js** and **TypeScript** that enables users to showcase their projects, share resources, and collaborate with others. The platform includes advanced features such as authentication, CRUD operations for projects, a user profile page, and dedicated sections for learning development and hiring developers.

## 🚀 Features

- **Authentication**: 
  - Secure login with NextAuth.
  - Supports Google, LinkedIn, GitHub, and email/password authentication.
  
- **User Profiles**:
  - View and edit user profiles.
  - Display all user projects on their profile page.

- **Projects**:
  - Add, edit, and delete projects.
  - Include project links and code repositories.
  - Display projects in card format with detailed sections.

- **Learn Development Section**:
  - Share tutorials and resources for developers to learn new skills.

- **Hire Developers Section**:
  - Employers can find and hire developers directly from the platform.

- **Material UI Design**:
  - Clean and responsive UI using Material UI.

## 🛠️ Tech Stack

- **Frontend**: 
  - Next.js
  - TypeScript
  - Material UI

- **Backend**: 
  - MongoDB
  - Next.js API routes

- **Authentication**:
  - NextAuth

- **Additional Libraries**:
  - Axios (API requests)
  - Zustand or Redux (State Management)
  - Formik + Yup (Form validation)

## 📂 Project Structure

/project-sharing-platform ├── /components # Reusable components ├── /pages # Application pages │ ├── /api # API routes for server-side operations │ ├── /auth # Authentication-related pages │ ├── /projects # Project-related pages │ ├── /profile # User profile pages │ └── /learn # Learn development section ├── /styles # Global and component styles ├── /utils # Helper functions and utilities └── /public # Static assets

csharp
Copy code

## 🔑 Environment Variables

Create a `.env.local` file in the root directory and add the following:

NEXTAUTH_SECRET=<your-nextauth-secret> NEXTAUTH_URL=<your-site-url> GOOGLE_CLIENT_ID=<your-google-client-id> GOOGLE_CLIENT_SECRET=<your-google-client-secret> LINKEDIN_CLIENT_ID=<your-linkedin-client-id> LINKEDIN_CLIENT_SECRET=<your-linkedin-client-secret> GITHUB_CLIENT_ID=<your-github-client-id> GITHUB_CLIENT_SECRET=<your-github-client-secret> MONGODB_URI=<your-mongodb-connection-string>

bash
Copy code

## 🚀 Getting Started

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Praveen-Raghav97/flexibble-app.git
   cd project-sharing-platform
Install dependencies:

bash
Copy code
npm install
Run the development server:

bash
Copy code
npm run dev
Access the app: Open http://localhost:3000 in your browser.

🤝 Contributing
Contributions are welcome! Please create an issue or submit a pull request for any bugs or improvements.

📜 License
This project is licensed under the MIT License. See the LICENSE file for details.

📧 Contact
For any inquiries or support, feel free to contact me:

Email: rishavthakur9027@gmail.com
LinkedIn:(https://www.linkedin.com/in/praveen-raghav/)
Happy coding! 🎉

r
Copy code


This `README.md` file provides an organized structure that includes all features and instructions for your Project Sharing Platform. Let me know if you want any customizations!
