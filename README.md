# HavenEstate - Premium Real Estate Web Application

A modern, responsive real estate web portal built with **React 18**, **Vite**, **Tailwind CSS**, and **React Router v6**. Features URL-synced multi-parameter filters, high-definition photo galleries with full-screen lightboxes, video walkthroughs and aerial drone tours, verified property inquiries, a mobile sticky contact bar, and an Admin Property Creator with multi-image preview and reordering.

---

## 🚀 Key Features

### 1. Home Page (`/`)
- **Hero Search Widget**: Switch between **Buy** and **Rent**, search by city or locality, filter by property type, and execute instant searches that populate URL parameters.
- **Category Navigation**: Browse by *Apartments*, *Villas*, *Houses*, and *Land Plots* with live inventory counts.
- **Featured Showcase**: Handpicked premier listings with badges, formatted prices, and quick access to details.
- **Quick Links**: One-click searches for popular cities (Calicut, Kochi, Bangalore, Mumbai, Goa).

### 2. Property Listings, Search & Filters (`/properties`)
- **Multi-Parameter Filtering**:
  - **Location Search**: Live text matching against city, locality, state, and title.
  - **Listing Type**: Filter by *Buy*, *Rent*, or *All*.
  - **Property Type**: *Apartment*, *Villa*, *House*, *Land*.
  - **Price Range**: Flexible min and max numeric bounds with quick presets (< ₹50L, ₹50L–₹1Cr, ₹1Cr–₹3Cr, > ₹3Cr).
  - **Bedrooms (BHK)**: 1, 2, 3, or 4+ BHK.
- **Sorting Options**:
  - Newest First
  - Price: Low → High
  - Price: High → Low
- **Bi-Directional URL Synchronization**: All active filters and sorting are reflected in query parameters (e.g., `/properties?type=villa&city=calicut&min_price=5000000&sort=price_asc`). Refreshing or sharing the URL reproduces the exact results.
- **User Experience**:
  - Active filter badges with individual dismiss buttons.
  - "Clear all" filter reset button.
  - Dynamic result counter (e.g. *Showing 12 properties*).
  - Friendly empty state when no listings match.
  - Mobile slide-out filter drawer.
  - Shimmer skeletons during filter transitions.

### 3. Property Details Page (`/property/:slug`)
- **Media Hero**:
  - Expansive cover photo collage with photo and video badge counts (e.g., *📸 6 Photos*, *🎥 1 Video*).
  - Clicking opens the full-screen photo gallery.
- **Full-Screen Lightbox**:
  - Image counter (`3 / 6`), photo caption, and category tag (Exterior, Living Room, Kitchen, Bedroom, etc.).
  - Previous / Next buttons and bottom thumbnail strip.
  - **Touch swipe gestures** on mobile devices (left/right swipe).
  - Keyboard navigation (Left / Right arrow keys, `Esc` to close).
- **Video Showcase**:
  - Plays embedded YouTube and MP4 video tours.
  - **Sound autoplay is prevented** by default with a custom play overlay.
- **Specifications & Amenities**:
  - Formatted price in Indian notation (e.g. `₹85 Lakhs`, `₹1.25 Cr`, `₹65,000/mo`) and price per sq.ft.
  - Matrix cards for Bedrooms, Bathrooms, Super Area (sq.ft), Parking, and Furnishing status.
  - Amenities with contextual Lucide icons (Swimming Pool, Garden, Power Backup, CCTV, Elevators, Wi-Fi, EV Charging).
- **Direct Agent Actions**:
  - **Call Button**: Direct `tel:` link.
  - **WhatsApp Button**: Direct `https://wa.me/...` link with pre-filled message:
    `Hi, I'm interested in Property ID #PROP-1025. Please share more details.`
  - **Share Link**: One-click URL copying with confirmation toast.
- **Validated Enquiry Form**:
  - Fields: Full Name, 10-digit Phone Number, Email, Preferred Visit Date (cannot be in the past), Message.
  - Live client-side validation.
  - On valid submission: Displays a confirmation card and logs full submission data (including property ID) to `console.log`.
- **Similar Properties**: Up to 3 related properties of the same property type or city.
- **Mobile Sticky Bottom Bar**: Call | WhatsApp | Enquire (scrolls directly to the enquiry section).
- **Invalid Slug Handling**: Renders a dedicated 404 / Property Not Found state with a return button.

### 4. Admin "Add Property" Form (`/admin/add-property`)
- **Multi-Image Uploader**:
  - Upload multiple local images from your device with instant thumbnail previews.
  - Add images via web URLs (Unsplash / CDN).
  - Choose any image as the **Cover Image**.
  - **Reorder photos** (move up/down) and delete individual images.
  - Assign categories (*Exterior*, *Living Room*, *Bedroom*, *Kitchen*, etc.) and captions.
- **Video Tour Input**: Attach YouTube URL or MP4 link with custom title and type (*Walkthrough* or *Drone*).
- **State & LocalStorage Persistence**: Newly added properties persist in browser storage and appear instantly in listings and search filters.

---

## 🛠️ Tech Stack

- **React 18** (Functional components, custom hooks, React Context)
- **Vite 6** (Fast ESM development and production bundling)
- **React Router DOM v6** (`BrowserRouter`, `Routes`, `Route`, `useSearchParams`, `useParams`)
- **Tailwind CSS 3.4** (Utility-first styling, custom color palette, responsive breakpoints)
- **Lucide React** (Modern real estate iconography)

---

## 📁 Project Structure

```
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
├── README.md
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── data/
    │   └── properties.json         # 12+ rich properties with min 5 photos each & 5 videos
    ├── context/
    │   └── PropertyContext.jsx     # Global properties state + LocalStorage persistence
    ├── types/
    │   └── property.js             # Filter options, amenities list, popular cities
    ├── utils/
    │   ├── formatters.js           # Indian currency (Lakhs/Cr), area sq.ft, date & slug helpers
    │   └── urlFilters.js           # URL query param serialization & deserialization
    ├── components/
    │   ├── common/
    │   │   ├── Navbar.jsx          # Responsive navbar with desktop & mobile drawer
    │   │   ├── Footer.jsx          # Comprehensive footer with quick links & info
    │   │   ├── Badge.jsx           # Badges for Listing Type, Status, Video, Featured
    │   │   └── Skeleton.jsx        # Shimmer loading skeleton placeholders
    │   └── property/
    │       ├── PropertyCard.jsx    # Card with cover photo, badges, price, specs
    │       ├── FilterSidebar.jsx   # Filters for Location, Type, Buy/Rent, Price, Beds
    │       ├── SortDropdown.jsx    # Sort options dropdown
    │       ├── Lightbox.jsx        # Full-screen image gallery with swipe & keyboard nav
    │       ├── VideoPlayer.jsx     # YouTube & MP4 player without autoplay audio blast
    │       ├── EnquiryForm.jsx     # Validated site visit booking form
    │       └── StickyContactBar.jsx# Mobile sticky bottom bar (Call, WhatsApp, Enquire)
    └── pages/
        ├── HomePage.jsx            # Hero search, categories, featured properties, benefits
        ├── PropertiesPage.jsx      # Grid view, sidebar filters, sorting, URL sync, empty state
        ├── PropertyDetailsPage.jsx # Hero media, specs, amenities, video, enquiry, similar items
        ├── AdminAddPropertyPage.jsx# Multi-image upload, cover picker, reordering, video tour
        └── NotFoundPage.jsx        # Friendly 404 page
```

---

## 📜 Meaningful Git Commit History

The repository has been developed incrementally with atomic, descriptive commits:

1. `chore: initialize react vite project with tailwind css and react router`
2. `feat(data): add comprehensive 12-property dataset with images and videos`
3. `feat(components): create shared UI components, navbar, footer, and property card`
4. `feat(home): build home page with hero search bar and featured properties`
5. `feat(listings): implement properties page with filters, sorting, and url sync`
6. `feat(details): build property details page with lightbox gallery, video embed, enquiry form, and mobile sticky bar`
7. `feat(admin): add admin property creator with multi-image upload, reordering, and video support`
8. `docs: add comprehensive readme and push instructions`

---

## 💻 Getting Started Locally

### Prerequisites
- Node.js 18+ or 20+
- npm (or yarn / pnpm)

### Installation & Running

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:5173`.

3. **Build for production:**
   ```bash
   npm run build
   ```

4. **Preview production build:**
   ```bash
   npm run preview
   ```

---

## 📤 Pushing to Your Public GitHub Repository

To push this codebase and all its step-by-step commits to your GitHub repository:

1. Create a new repository on [GitHub](https://github.com/new) (e.g., `real-estate-web-app`). Do not initialize with README or license.
2. In your terminal in this project folder (`Real Estate Web App`), run:
   ```bash
   git remote add origin https://github.com/<YOUR-USERNAME>/<YOUR-REPO-NAME>.git
   git branch -M main
   git push -u origin main
   ```
3. All commits with their individual commit messages will now appear in your GitHub commit history!
