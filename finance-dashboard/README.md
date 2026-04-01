# Finance Dashboard

A modern, interactive financial dashboard built with React and Tailwind.

## Live Demo
Coming soon.

## Submission Links
- Repository: Add your GitHub repository link here.
- Deployment: Add your Vercel/Netlify live link here.

## Features
- Dashboard Overview: Quick summary cards for total balance, total income, and total expenses.
- Transactions Management: Filterable transactions table with sorting, search, and formatted values.
- Role-Based UI: Viewer/Admin mode with role-aware controls.
- Data Visualization: Interactive charts for balance trend and category-wise spending.
- Insights: Smart financial observations based on transaction behavior.
- Modern UI: Glassmorphism-inspired design, subtle animations, and responsive layout.

## Requirement Coverage
- Dashboard Overview: Implemented with summary cards and chart visualizations.
- Transactions Section: Includes date, amount, category, type, filtering, sorting, and search.
- Role-Based UI: Viewer/Admin switch with Admin-only add transaction flow.
- Insights Section: Highest spending category, monthly comparison, and spending observation.
- State Management: Managed with React state for transactions, filters, role, and UI mode.
- UI/UX Expectations: Responsive design, readable hierarchy, and graceful empty states.

## Tech Stack
- React (Vite)
- Tailwind CSS
- Recharts

## Screenshots
Screenshots will be added here.

Suggested additions:
- Dashboard overview screen
- Transactions section (filter + table)
- Charts section
- Insights section
- Light and dark mode previews

## Project Structure
```text
finance-dashboard/
├─ public/
├─ src/
│  ├─ components/
│  │  ├─ AddTransaction.jsx
│  │  ├─ Charts.jsx
│  │  ├─ DashboardCards.jsx
│  │  ├─ Insights.jsx
│  │  ├─ RoleSwitcher.jsx
│  │  └─ Transactions.jsx
│  ├─ data/
│  │  └─ mockData.js
│  ├─ App.jsx
│  ├─ index.css
│  └─ main.jsx
├─ index.html
├─ package.json
├─ tailwind.config.js
├─ postcss.config.js
└─ README.md
```

## How to Run
1. Install dependencies:
```bash
npm install
```
2. Start development server:
```bash
npm run dev
```

## Learning Highlights
- State management with React hooks (`useState`) for transactions, filters, roles, and UI mode.
- Data transformation for summaries, chart datasets, and insight generation.
- UI/UX design practices including responsiveness, consistency, and accessibility basics.
- Component-based architecture for scalable and maintainable frontend development.

## Future Improvements
- Integrate backend APIs and persistent database storage.
- Add authentication and authorization (secure role handling).
- Support real-time financial updates and live analytics.

## Assumptions
- This project is frontend-only and uses mock/local data for demonstration.
- Role behavior is simulated in the UI (`viewer` and `admin`) without backend authorization.
- Financial calculations (summary, charts, insights) are based on currently available in-app transaction data.
- Local persistence is handled via browser `localStorage`.

## Known Limitations
- No backend/database integration yet (data is browser-local).
- No real authentication or protected role enforcement.
- Chart bundle size is relatively large due to Recharts (acceptable for this assignment).
- Insights are intentionally simple and rule-based, not predictive analytics.

---
If you like this project, feel free to fork it and build your own enhanced version.
