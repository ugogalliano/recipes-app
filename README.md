# 🍽️ Recipe Finder App

A modern React application for searching, viewing, and saving your favorite recipes =D!
Built using **Vite**, **React Router**, **Tailwind CSS**, and **Jest** for testing.

## 📦 Tech Stack

- **Bundler:** [Vite](https://vitejs.dev/)
- **Javascript Library** [React](https://reactjs.org/)
- **Routing:** [React Router DOM](https://reactrouter.com/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
- **Testing:** [Jest](https://jestjs.io/) + [React Testing Library](https://testing-library.com/)
- **State Management:** React Context API + LocalStorage

---

## 📁 Pages Overview

### 🏠 Homepage

- Recipe search input with debounce.
- Search by **ingredient** or **keyword**.
- Dynamic recipe listing.
- Contextual banners for loading, no results, or error states.

### 📄 Recipe Detail Page

- Displays full details of a selected recipe.

### ⭐ Favorites Page

- Displays the list of favorited recipes.
- Favorites are persisted using **localStorage**.
- Recipes can be added or removed from favorites.

---

## ⚙️ State Management

- **Favorites Context**: Implemented with the built-in React Context API.
- **Persistence**: Synced with `localStorage` to keep favorites between sessions.

---

## 🌐 API Calls

- Recipes are fetched from [TheMealDB API](https://www.themealdb.com/).
- No third-party data-fetching libraries were used (like SWR or Tanstack Query).
- All fetching logic is abstracted into **custom hooks** (e.g. `useSearchRecipes || useRecipe`) to avoid repetition and improve readability.

---

## 🧪 Testing

- Framework: **Jest** + **React Testing Library**
- Test coverage includes:
  - Input typing and debounced search behavior.
  - Conditional rendering of banners based on application state.
  - Recipe list rendering.

Build:

```bash
npm run build
```

Start:

```bash
npm run start
```

Run Test:

```bash
npm run jest:run
```
