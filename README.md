# Shop_Premium E‑Commerce Application

A sophisticated e‑commerce web application that offers a premium shopping experience. Built with [Next.js](https://nextjs.org/) (App Router) and TypeScript, this application leverages Tailwind CSS for styling, Zustand for state management with persistence, and Firebase for authentication. It consumes the [Fake Store API](https://fakestoreapi.com/) to display products, manage a shopping cart, and perform a multi‑step checkout.

---

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
  - [Running the Development Server](#running-the-development-server)
  - [Building for Production](#building-for-production)
- [Authentication Setup](#authentication-setup)
- [Tailwind CSS & Theming](#tailwind-css--theming)
- [State Management](#state-management)

---

## Features

- **Server-Side Rendering & App Router**  
  Fully SSR and ISR-enabled application built with Next.js App Router.

- **Product Browsing**  
  Displays a grid of products fetched from [Fake Store API](https://fakestoreapi.com/products). Supports sorting and filtering through a responsive UI.

- **Shopping Cart & Checkout**  
  Utilize a persistent shopping cart that survives browser refreshes. Features include:

  - Add-to-cart functionality with persistent state (via Zustand)
  - A dedicated cart page
  - A multi‑step checkout wizard with form validation and optimistic order placement

- **User Authentication**  
  Email and password-based sign‑up and login via Firebase Authentication.

  - User sessions persist across page refreshes.
  - Logout functionality clears the cart and redirects users.

- **Theming (Dark/Light Mode)**  
  Manual dark/light mode toggle that respects system preferences on initial load and persists user choice.

- **Global State Management with Zustand**  
  The shopping cart and orders are stored in a global state (via Zustand) with localStorage persistence.

---

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/khyati-03/shop_premium.git
   cd shop_premium

   ```

2. **Install dependencies:**
    npm install
        # or
    yarn install

3. **Configure Environment Variables:**
    NEXT_PUBLIC_FB_API_KEY=YOUR_FIREBASE_API_KEY
    NEXT_PUBLIC_FB_AUTH_DOMAIN=YOUR_FIREBASE_AUTH_DOMAIN
    NEXT_PUBLIC_FB_PROJECT_ID=YOUR_FIREBASE_PROJECT_ID
    NEXT_PUBLIC_FB_STORAGE_BUCKET=YOUR_FIREBASE_STORAGE_BUCKET
    NEXT_PUBLIC_FB_MESSAGING_SENDER_ID=YOUR_FIREBASE_MESSAGING_SENDER_ID
    NEXT_PUBLIC_FB_APP_ID=YOUR_FIREBASE_APP_ID

# (Optional) For Firebase Admin SDK - if using server-side auth token verification:
    FB_ADMIN_CLIENT_EMAIL=YOUR_FIREBASE_ADMIN_CLIENT_EMAIL
    FB_ADMIN_PRIVATE_KEY="YOUR_FIREBASE_ADMIN_PRIVATE_KEY"
    FB_ADMIN_PROJECT_ID=YOUR_FIREBASE_PROJECT_ID

4. **Running the Development Server**
    npm run dev
        # or
    yarn dev
