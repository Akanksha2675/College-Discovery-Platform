# CollegeFind — College Discovery Platform

> **Find, compare, and discuss colleges — all in one place.**

Live demo: [college-discovery-platform-u82r.vercel.app](https://college-discovery-platform-u82r.vercel.app/)

---

## Overview

**CollegeFind** is a web application that helps students discover and evaluate top Indian colleges. It provides rich college profiles, side-by-side comparisons, and a community-driven Q&A forum — making the college selection process informed, interactive, and stress-free.

---

## Features

### 🔍 Explore Colleges
- Browse **8+ universities** across India (IITs, NITs, BITS, VIT, DTU, IIIT, and more)
- Filter by **location** (Maharashtra, Delhi, Tamil Nadu, Rajasthan, Telangana)
- Sort by **Top Rated**, **Fees: Low to High**, or **Fees: High to Low**
- Search by **program stream** — Engineering, Business, Medical, Computer Science, Law

### 🏫 College Detail Pages
Each college page includes:
- Star rating and location
- Annual fee and average placement package
- Courses offered (B.Tech, M.Tech, MBA, PhD)
- Top recruiters
- Overview / about section
- Linked Q&A threads from the community

### ⚖️ Compare Colleges
- Add any college to a comparison list via the **"Add to Compare"** button on detail pages
- Navigate to `/compare` to view colleges side by side

### 💬 Community Discussions
- Ask questions tied to a specific college
- Browse and filter questions by institution
- Reply to existing threads
- Real student experiences shared (e.g., hostel life, placements, departments)

---

## Pages

| Route | Description |
|---|---|
| `/` | Home — featured colleges, search, and filters |
| `/colleges/:id` | Individual college detail page |
| `/compare` | Side-by-side college comparison |
| `/discussions` | Community Q&A forum |

---

## Colleges Listed

| College | Location | Annual Fees | Avg Package | Rating |
|---|---|---|---|---|
| IIT Madras | Chennai, Tamil Nadu | ₹2.5L | ₹22.0L | ⭐ 4.9 |
| IIT Bombay | Mumbai, Maharashtra | ₹2.5L | ₹21.0L | ⭐ 4.8 |
| IIT Delhi | New Delhi, Delhi | ₹2.4L | ₹20.0L | ⭐ 4.7 |
| BITS Pilani | Pilani, Rajasthan | ₹5.2L | ₹18.0L | ⭐ 4.6 |
| NIT Trichy | Tiruchirappalli, Tamil Nadu | ₹1.5L | ₹12.0L | ⭐ 4.5 |
| IIIT Hyderabad | Hyderabad, Telangana | ₹3.2L | ₹16.0L | ⭐ 4.4 |
| DTU Delhi | New Delhi, Delhi | ₹1.7L | ₹11.0L | ⭐ 4.2 |
| VIT Vellore | Vellore, Tamil Nadu | ₹3.8L | ₹9.0L | ⭐ 4.1 |

---

## Tech Stack

- **Framework:** Next.js (React)
- **Deployment:** Vercel
- **Styling:** Tailwind CSS (inferred from class structure)
- **Routing:** Next.js App Router (`/colleges/[id]`, `/compare`, `/discussions`)

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/college-discovery-platform.git
cd college-discovery-platform

# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

### Deploy to Vercel

```bash
npx vercel
```

---

## Project Structure

```
college-discovery-platform/
├── app/
│   ├── page.tsx              # Home / Explore page
│   ├── colleges/
│   │   └── [id]/
│   │       └── page.tsx      # College detail page
│   ├── compare/
│   │   └── page.tsx          # Compare colleges page
│   └── discussions/
│       └── page.tsx          # Community Q&A page
├── components/               # Reusable UI components
├── public/                   # Static assets
└── README.md
```

---

## Contributing

Contributions are welcome! To get started:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add your feature'`
4. Push the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## License

© 2025 CollegeFind. All rights reserved.
