# Next.js Application Setup

## Prerequisites
Ensure you have the following installed on your system:
- **Node.js** (LTS version recommended)
- **npm** (comes with Node.js) or **yarn**
- **MySQL** database

## Steps to Install and Set Up the Application

### 1. Create a New Next.js Application
```bash
npx create-next-app@latest
```
1. Enter the name for your project (e.g., `my-next-app`).
2. Select your preferred options:
   - TypeScript: Yes/No (based on your preference)
   - ESLint: Yes/No
   - Tailwind CSS: Yes/No
   - App Router: Yes (recommended)
   - Turbopack: Yes/No (optional)

### 2. Navigate to Your Project Directory
```bash
cd my-next-app
```

### 3. Install Required Dependencies
#### Basic Dependencies
```bash
npm install axios mongoose bcryptjs jsonwebtoken next-auth react-query
```
If you encounter dependency issues, use:
```bash
npm install axios mongoose bcryptjs jsonwebtoken next-auth react-query --legacy-peer-deps
```

#### Redux Toolkit (Optional for State Management)
```bash
npm install @reduxjs/toolkit react-redux
```

### 4. Configure Your Application

#### a) **Set Up a MySQL Database**
1. Install and start MySQL.
2. Create a database (e.g., `my_next_app_db`):
   ```sql
   CREATE DATABASE my_next_app_db;
   ```
3. Note down the database credentials (host, user, password, database name).

#### b) **Create a `.env` File**
In the root of your project, create a `.env` file and add the following:
```env
DATABASE_URL=mysql://<user>:<password>@<host>:<port>/<database>
JWT_SECRET=your_jwt_secret_key
NEXTAUTH_SECRET=your_nextauth_secret
```
Replace `<user>`, `<password>`, `<host>`, `<port>`, and `<database>` with your MySQL credentials.

### 5. Set Up the Backend (API Routes)
1. Create a folder `src/app/api`.
2. Add backend logic (e.g., user authentication, CRUD operations) in this folder. Example:
   ```javascript
   // src/app/api/users/route.js
   import { connectToDatabase } from "../../../utils/mongodb";

   export async function GET(req) {
       const db = await connectToDatabase();
       const users = await db.collection('users').find({}).toArray();
       return new Response(JSON.stringify(users));
   }
   ```

### 6. Set Up Tailwind CSS (Optional)
If you selected Tailwind CSS during setup, ensure `tailwind.config.js` is configured correctly. Example:
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

### 7. Run the Development Server
```bash
npm run dev
```
- Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### 8. Build and Start the Production Server
1. Build the application:
   ```bash
   npm run build
   ```
2. Start the production server:
   ```bash
   npm start
   ```

### 9. Connect to the MySQL Database
Use `mongoose` for database operations:
1. Create a utility file for database connection:
   ```javascript
   // src/utils/mongodb.js
   import mongoose from 'mongoose';

   const connectToDatabase = async () => {
       if (mongoose.connection.readyState >= 1) return mongoose.connection.db;

       return mongoose.connect(process.env.DATABASE_URL, {
           useNewUrlParser: true,
           useUnifiedTopology: true,
       });
   };

   export { connectToDatabase };
   ```

2. Use this connection in your API routes.

### 10. Add Authentication with NextAuth
1. Set up NextAuth in your project:
   ```bash
   npm install next-auth
   ```
2. Create a file for authentication:
   ```javascript
   // src/app/api/auth/[...nextauth]/route.js
   import NextAuth from "next-auth";
   import CredentialsProvider from "next-auth/providers/credentials";

   export default NextAuth({
       providers: [
           CredentialsProvider({
               name: "Credentials",
               credentials: {
                   username: { label: "Username", type: "text" },
                   password: { label: "Password", type: "password" },
               },
               async authorize(credentials) {
                   // Add your logic here
                   const user = { id: 1, name: 'John Doe' };
                   return user;
               },
           }),
       ],
       secret: process.env.NEXTAUTH_SECRET,
   });
   ```

### 11. Deploy Your Application
1. Deploy to **Vercel** (recommended):
   ```bash
   npx vercel
   ```
   Follow the prompts to link your project.

2. Configure environment variables on Vercel.

3. Deploy and access your application online.

---

Your Next.js application is now ready!

