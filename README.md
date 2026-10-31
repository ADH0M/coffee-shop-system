
Coffee Shop Management System

<div align="center">

### A Complete Next.js Dashboard for Coffee Shop Inventory & Beverage Management

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-4169E1?style=for-the-badge&logo=postgresql)

</div>

---

## 🎯 What We Built

A **full-stack coffee shop management system** that handles two critical business operations:

1. **Retail Products Management** — Track raw materials (coffee beans, tea, spices) sold by kilogram
2. **Ready-Made Beverages Management** — Manage prepared drinks (coffee, tea, anise) sold by cup

The system provides complete CRUD operations with a professional Arabic RTL interface.

---

## ✅ What's Implemented

### Core Features

#### 📦 Retail Products Module
- ✅ **Product Listing** — Display all products in a sortable table
- ✅ **Add Product** — Dynamic form with validation
- ✅ **Delete Product** — With confirmation dialog
- ✅ **Product Fields**:
  - Name (VARCHAR 100)
  - Category (Coffee, Tea, Spices)
  - Price per kilogram (DECIMAL 10,2)
  - Stock in kilograms (DECIMAL 10,2)
  - Producer reference (foreign key)
  - Auto-generated timestamps

#### ☕ Beverages Module
- ✅ **Beverage Listing** — Display all beverages with full details
- ✅ **Add Beverage** — Advanced form with multiple options
- ✅ **Delete Beverage** — With confirmation dialog
- ✅ **Beverage Fields**:
  - Name (VARCHAR 100)
  - Drink type (Coffee, Tea, Anise, Milk Tea)
  - Roast level (Light, Medium, Dark) — Optional
  - Is Mahuj (boolean) — Yemeni spiced coffee
  - Price (DECIMAL 10,2)
  - Description (VARCHAR 200) — Optional
  - Auto-generated timestamps

### Technical Implementation

#### Frontend Architecture
- **Component-Based Design** — Modular, reusable components
- **TypeScript Types** — Full type safety for all data structures
- **State Management** — React hooks (useState, useEffect)
- **API Integration** — Fetch API for all CRUD operations
- **Form Handling** — Controlled components with validation
- **Responsive Layout** — Mobile-first design approach
- **RTL Support** — Complete Arabic interface with proper text direction

#### Backend Architecture
- **Next.js API Routes** — RESTful endpoints for all operations
- **Database Connection** — PostgreSQL with connection pooling
- **Query Optimization** — Efficient SQL queries with proper indexing
- **Error Handling** — Comprehensive error management
- **Data Validation** — Server-side validation for all inputs

---

## 🏗️ Project Structure

```
├── app/
│   ├── api/
│   │   ├── retail-products/
│   │   │   ├── route.ts              # GET all products, POST new product
│   │   │   └── [id]/
│   │   │       └── route.ts          # DELETE specific product
│   │   └── beverages/
│   │       ├── route.ts              # GET all beverages, POST new beverage
│   │       └── [id]/
│   │           └── route.ts          # DELETE specific beverage
│   │
│   ├── page.tsx                      # Main dashboard page
│   └── layout.tsx                    # Root layout with metadata
│
├── components/
│   ├── CafeDashboard.tsx             # Main dashboard with tab navigation
│   ├── RetailProductsManager.tsx     # Retail products CRUD interface
│   └── BeveragesManager.tsx          # Beverages CRUD interface
│
├── types/
│   ├── product.ts                    # TypeScript interfaces for products
│   └── beverage.ts                   # TypeScript interfaces for beverages
│
├── public/                           # Static assets
├── tailwind.config.js                # Tailwind configuration
├── tsconfig.json                     # TypeScript configuration
└── package.json                      # Dependencies and scripts
```

---
## 🔧 API Endpoints

### Retail Products
| Method | Endpoint | Description |
|:---|:---|:---|
| `GET` | `/api/retail-products` | Fetch all products |
| `POST` | `/api/retail-products` | Create new product |
| `DELETE` | `/api/retail-products/[id]` | Delete specific product |

### Beverages
| Method | Endpoint | Description |
|:---|:---|:---|
| `GET` | `/api/beverages` | Fetch all beverages |
| `POST` | `/api/beverages` | Create new beverage |
| `DELETE` | `/api/beverages/[id]` | Delete specific beverage |

---

## 🚀 Challenges & Solutions

### Challenge 1: Dual Module Architecture
**Problem**: Needed to manage two distinct product types with different fields and business logic.

**Solution**: 
- Created separate components for each module
- Implemented dedicated TypeScript interfaces
- Built independent API routes for each entity
- Used tab-based navigation for seamless switching

### Challenge 2: Type Safety Across Stack
**Problem**: Ensuring data consistency between database, API, and frontend.

**Solution**:
- Defined strict TypeScript interfaces matching database schema
- Created shared types for form data and API responses
- Implemented runtime validation in API routes
- Used proper type casting for database operations

### Challenge 3: Arabic RTL Interface
**Problem**: Building a complete Arabic interface with proper text direction and formatting.

**Solution**:
- Added `dir="rtl"` attribute to all containers
- Used Arabic locale for date formatting (`ar-SA`)
- Implemented proper currency formatting (YER)
- Ensured all UI elements respect RTL layout

### Challenge 4: Form State Management
**Problem**: Managing complex form states with multiple fields and validation.

**Solution**:
- Used controlled components with useState
- Implemented form reset after successful submission
- Added proper validation for required fields
- Handled optional fields (null values) correctly

### Challenge 5: Database Connection Management
**Problem**: Efficient database connection handling in serverless environment.

**Solution**:
- Implemented connection pooling with `pg.Pool`
- Stored connection string in environment variables
- Added proper error handling for connection failures
- Optimized queries with proper indexing

---

## 📦 Dependencies

```json
{
  "dependencies": {
    "next": "14.x",
    "react": "18.x",
    "react-dom": "18.x",
    "pg": "8.x",
    "typescript": "5.x"
  },
  "devDependencies": {
    "@types/node": "20.x",
    "@types/react": "18.x",
    "@types/pg": "8.x",
    "tailwindcss": "3.x",
    "autoprefixer": "10.x",
    "postcss": "8.x"
  }
}
```

---

## 🛠️ Setup & Installation

### Prerequisites
- Node.js 18+ 
- PostgreSQL 15+
- npm or yarn

### Installation Steps

```bash
# Clone the repository
git clone https://github.com/your-username/nizam-qahwa.git
cd nizam-qahwa

# Install dependencies
npm install

# Set up environment variables
# Create .env.local file with:
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"

# Run database migrations (if needed)
# psql -U username -d dbname -f schema.sql

# Start development server
npm run dev
```

Visit `http://localhost:3000` to see the application.

---

## 📝 Available Scripts

| Command | Description |
|:---|:---|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build production-optimized version |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint for code quality |

---

## 🎯 Key Technical Decisions

### Why Next.js 14?
- **App Router** for modern routing patterns
- **API Routes** for backend logic in same project
- **Server Components** for better performance
- **Built-in optimizations** for images and fonts

### Why TypeScript?
- **Type safety** prevents runtime errors
- **Better IDE support** with autocomplete
- **Self-documenting code** with interfaces
- **Easier refactoring** with type checking

### Why PostgreSQL?
- **Relational data** fits product-inventory model
- **Foreign key constraints** ensure data integrity
- **DECIMAL types** for precise price calculations
- **TIMESTAMP defaults** for automatic date tracking

### Why Tailwind CSS?
- **Utility-first approach** for rapid development
- **Consistent design system** out of the box
- **Dark mode support** built-in
- **Responsive utilities** for mobile-first design



