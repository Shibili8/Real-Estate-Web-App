# HavenEstate - Premium Real Estate Web Application

[![Live Demo](https://img.shields.io/badge/Live_Demo-haven--estate--jade.vercel.app-0259a1?style=for-the-badge&logo=vercel)](https://haven-estate-jade.vercel.app/)

> 🌐 **Live Demo Website:** [https://haven-estate-jade.vercel.app/](https://haven-estate-jade.vercel.app/)

A modern, responsive real estate web portal built with **React 18**, **Vite**, **Tailwind CSS**, and **React Router v6**. Features URL-synced multi-parameter filters, high-definition photo galleries with full-screen lightboxes, video walkthroughs and aerial drone tours, verified property inquiries, a mobile sticky contact bar, interactive wishlist with LocalStorage persistence, and an Admin Property Creator with multi-image upload, reordering, and video tour support.

---

## 🚀 Key Features

### 1. Home Page (`/`)
- **Hero Search Widget**: Switch between **Buy** and **Rent**, search by city or locality, filter by property type, and execute instant searches that seamlessly populate URL parameters.
- **Quick Search Tags**: One-click searches for popular destinations and categories (Calicut, Kochi, Bangalore, Goa, Luxury Villas).
- **Category Navigation**: Browse by *Apartments*, *Villas*, *Houses*, and *Land Plots* with live inventory counts.
- **Featured Showcase**: Handpicked premier listings with status badges, formatted prices, and instant access to full details.
- **The Haven Advantage**: Core value propositions highlighting HD video walkthroughs, 100% verified titles, and zero-spam direct WhatsApp & phone connectivity.
- **Owner & Broker CTA**: Direct portal link for homeowners and agents to list properties free with multi-image galleries.

### 2. Property Listings, Search & Filters (`/properties`)
- **Multi-Parameter Filtering**:
  - **Location Search**: Live keyword matching across title, city, locality, and state.
  - **Listing Type**: Filter by *Buy*, *Rent*, or *All*.
  - **Property Type**: *Apartment*, *Villa*, *House*, *Land*.
  - **Price Range**: Flexible min and max numeric bounds with quick presets (< ₹50L, ₹50L–₹1Cr, ₹1Cr–₹3Cr, > ₹3Cr).
  - **Bedrooms (BHK)**: 1, 2, 3, or 4+ BHK.
- **High-Performance Filtering**: Instant, memoized computation using React `useMemo` for seamless real-time search without lag.
- **Sorting Options**:
  - Newest First
  - Price: Low → High
  - Price: High → Low
- **Bi-Directional URL Synchronization**: All active filters and sorting are reflected in query parameters (e.g., `/properties?type=Villa&city=Calicut&min_price=5000000&sort=price_asc`). Refreshing or sharing the URL reproduces the exact filtered results.
- **Responsive User Experience**:
  - Active filter badges with individual dismiss buttons.
  - "Clear all" filter reset button.
  - Dynamic result counter (e.g. *Showing 12 properties*).
  - Friendly empty state with reset suggestions when zero listings match.
  - Mobile slide-out filter drawer with active filter count badge.
  - Shimmer loading skeletons during filter transitions.

### 3. Media-Rich Property Details Page (`/property/:slug`)
- **Media Hero Collage**:
  - Expansive cover photo collage with photo and video badge counts (e.g., *📸 6 Photos*, *🎥 1 Video*).
  - One-click trigger to open the full-screen photo gallery.
- **Full-Screen Lightbox Gallery**:
  - Image counter (`3 / 6`), photo caption, and category tag (Exterior, Living Room, Kitchen, Bedroom, etc.).
  - Previous / Next buttons and bottom thumbnail filmstrip for quick navigation.
  - **Touch swipe gestures** on mobile devices (left/right swipe).
  - Full keyboard navigation (Left / Right arrow keys, `Esc` to close).
- **HD Video Showcase**:
  - Plays embedded YouTube videos and HTML5 MP4 video tours in a responsive 16:9 player.
  - **Sound autoplay is prevented** by default with a custom play overlay to avoid abrupt audio blast.
- **Specifications & Amenities**:
  - Formatted price in Indian notation (e.g. `₹85 Lakhs`, `₹1.25 Cr`, `₹65,000/mo`) and price per sq.ft.
  - Matrix cards for Bedrooms, Bathrooms, Super Area (sq.ft), Parking, and Furnishing status.
  - Amenities with contextual icons (Swimming Pool, Garden, Power Backup, CCTV, Elevators, High-Speed Wi-Fi, EV Charging Station, Clubhouse, Children's Play Area).
- **Direct Agent Actions**:
  - **Call Button**: Direct `tel:+919544525989` link.
  - **WhatsApp Button**: Direct `https://wa.me/919544525989` link with pre-filled message mentioning the property ID and title:
    `Hi, I'm interested in Property ID #PROP-1025. Please share more details.`
  - **Share Action**: Native Web Share API integration with automatic fallback to clipboard URL copying and toast confirmation.
- **Validated Site Visit Enquiry Form**:
  - Fields: Full Name, 10-digit Phone Number, Email, Preferred Visit Date (validated to disallow past dates), and Message.
  - Live client-side validation and friendly error messages.
  - On valid submission: Displays a confirmation card and logs full submission data (including property ID) to the console.
- **Similar Properties**: Recommends up to 3 related properties of the same property type or city.
- **Mobile Sticky Bottom Bar**: Persistent bottom bar on mobile viewports with quick Call, WhatsApp, and Enquire actions.
- **Invalid Slug Handling**: Dedicated 404 / Property Not Found state with a return button when an unknown slug is entered.

### 4. Wishlist & Bookmarking System (`/wishlist` & `/saved`)
- **Interactive Heart Toggle**: Floating heart button on all property cards and detail headers with micro-interaction pop animation.
- **Navbar Live Counter**: Shows real-time badge count of bookmarked homes (`Wishlist (X)`) on desktop and mobile navigation bars.
- **Dedicated Saved Page**: Full directory grid of bookmarked properties, quick category filters (All, Apartment, Villa, House, Land), and a "Clear Wishlist" action.
- **LocalStorage Persistence**: Saved properties remain preserved across browser tabs, reloads, and sessions.
- **Warm Empty State**: Illustrated empty state with direct CTA encouraging exploration when zero items are saved.

### 5. Admin "Add Property" Portal (`/admin/add-property`)
- **Multi-Image Uploader**:
  - Upload multiple local images from your device via `FileReader` with instant thumbnail previews.
  - Add images via web URLs (Unsplash / CDN).
  - Choose any image as the **Cover Image** with a single click.
  - **Reorder photos** (move up/down) and delete individual images.
  - Assign categories (*Exterior*, *Living Room*, *Bedroom*, *Kitchen*, etc.) and captions.
- **Video Tour Integration**: Attach YouTube URL or MP4 video link with custom title and tour type (*Walkthrough* or *Drone*).
- **Comprehensive Specification Inputs**: Property title, property type, buy/rent status, price, city, locality, bedrooms, bathrooms, area (sq.ft), parking spaces, and furnishing status.
- **Amenity Selector**: Interactive multi-checkbox selection across 12+ real estate amenities.
- **Dynamic Computations**: Automatic SEO-friendly slug generation, unique property ID assignment, and per-sq.ft price calculation.
- **State & LocalStorage Persistence**: Newly added properties persist in browser storage and appear instantly in listings, search filters, and home page showcase.

### 6. Responsive Layout & Common Components
- **Responsive Navbar**: Glassmorphism backdrop blur with desktop navigation, dynamic wishlist counter badge, and a primary "Post Property" CTA.
- **Mobile Navigation Drawer**: Slide-down menu on mobile screens with quick access to all pages and live wishlist count.
- **Comprehensive Footer**: Quick category links, popular city landing links, direct agent contact (+91 95445 25989, contact@havenestate.com), and legal policy links.

### 7. Formatting Utilities & Production Optimizations
- **Indian Currency Formatter (`formatPrice`)**: Standard Indian notation (₹ Lakhs, ₹ Crores, and ₹/month for rental listings).
- **Area Formatter (`formatArea`)**: Formatted representation with comma separators (e.g. `1,800 sq.ft`).
- **High-Performance Images**: Optimized Unsplash CDN imagery with `fetchPriority="high"` on critical hero banners.
- **SPA Client-Side Routing**: Configured with `vercel.json` rewrite rules to ensure clean deep URLs (`/properties`, `/wishlist`, `/property/:slug`, `/admin/add-property`) load and refresh seamlessly in production.

---

## 🛠️ Tech Stack

- **Frontend Framework**: React 18 (Functional Components, Custom Hooks, React Context API)
- **Build Tooling**: Vite 6 (Fast ESM HMR and optimized production bundling)
- **Routing**: React Router DOM v6 (`BrowserRouter`, `Routes`, `Route`, `useSearchParams`, `useParams`, `useNavigate`, `useLocation`)
- **Styling**: Tailwind CSS 3.4 (Utility-first styling, custom color palette, responsive breakpoints, backdrop blur)
- **Iconography**: Lucide React (Modern, clean UI iconography)
- **State Management**: React Context (`PropertyContext`, `WishlistContext`) with `localStorage` synchronization
- **Deployment**: Vercel with SPA routing rewrite configuration

---

## 📁 Project Structure

```
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vercel.json                 # Vercel SPA rewrite rule for client-side routing
├── vite.config.js
├── README.md
└── src/
    ├── main.jsx                # Application root entry point
    ├── App.jsx                 # Route definitions & global Context providers
    ├── index.css               # Tailwind CSS directives & global styling
    ├── data/
    │   └── properties.json     # Initial verified properties dataset with rich media
    ├── context/
    │   ├── PropertyContext.jsx # Global properties state, filtering data & addProperty action
    │   └── WishlistContext.jsx # Global bookmarking state with LocalStorage persistence
    ├── types/
    │   └── property.js         # Categories, filter constants, amenities list, popular cities
    ├── utils/
    │   ├── formatters.js       # Indian currency (Lakhs/Cr), area sq.ft, date & slug helpers
    │   └── urlFilters.js       # URL query param serialization & deserialization
    ├── components/
    │   ├── common/
    │   │   ├── Navbar.jsx      # Responsive navbar with wishlist counter & mobile drawer
    │   │   ├── Footer.jsx      # Comprehensive footer with quick links, contact info & legal
    │   │   ├── Badge.jsx       # Badges for Listing Type, Status, Video, Featured
    │   │   └── Skeleton.jsx    # Shimmer loading skeleton placeholders
    │   └── property/
    │       ├── PropertyCard.jsx# Card with cover photo, badges, price, specs & wishlist button
    │       ├── FilterSidebar.jsx # Filters for Location, Type, Buy/Rent, Price, Bedrooms
    │       ├── SortDropdown.jsx  # Sort options dropdown
    │       ├── Lightbox.jsx    # Full-screen image gallery with swipe & keyboard nav
    │       ├── VideoPlayer.jsx # YouTube & MP4 player without autoplay audio blast
    │       ├── EnquiryForm.jsx # Validated site visit booking form
    │       └── StickyContactBar.jsx # Mobile sticky bottom bar (Call, WhatsApp, Enquire)
    └── pages/
        ├── HomePage.jsx        # Hero search, categories, featured properties, value props
        ├── PropertiesPage.jsx  # Grid view, sidebar filters, sorting, URL sync, empty state
        ├── PropertyDetailsPage.jsx # Hero media, specs, amenities, video, enquiry, similar items
        ├── WishlistPage.jsx    # Saved properties directory, category tabs, clear all action
        ├── AdminAddPropertyPage.jsx # Multi-image upload, cover picker, reordering, video tour
        └── NotFoundPage.jsx    # Friendly 404 page with return navigation
```

---

## 💻 Getting Started Locally

### Prerequisites
- Node.js 18+ or 20+
- npm (or yarn / pnpm)

### Installation & Running

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Shibili8/Real-Estate-Web-App.git
   cd Real-Estate-Web-App
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:5173`.

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Preview production build:**
   ```bash
   npm run preview
   ```
