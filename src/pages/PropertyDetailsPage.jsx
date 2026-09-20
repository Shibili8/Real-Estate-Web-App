import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  MapPin,
  Bed,
  Bath,
  Maximize2,
  Car,
  Home,
  Calendar,
  Share2,
  Phone,
  MessageSquare,
  ShieldCheck,
  ChevronRight,
  Check,
  Sparkles,
  ArrowLeft,
  Camera,
  Video as VideoIcon,
  Wifi,
  Waves,
  TreePine,
  Zap,
  Building,
  Heart,
} from 'lucide-react';
import { useProperties } from '../context/PropertyContext';
import { useWishlist } from '../context/WishlistContext';
import { formatPrice, formatArea, formatDate } from '../utils/formatters';
import { ListingTypeBadge, StatusBadge, VideoBadge } from '../components/common/Badge';
import Lightbox from '../components/property/Lightbox';
import VideoPlayer from '../components/property/VideoPlayer';
import EnquiryForm from '../components/property/EnquiryForm';
import StickyContactBar from '../components/property/StickyContactBar';
import PropertyCard from '../components/property/PropertyCard';

// Amenity Icon Resolver
function getAmenityIcon(name) {
  const lower = name.toLowerCase();
  if (lower.includes('pool')) return <Waves className="w-4 h-4 text-cyan-600" />;
  if (lower.includes('garden') || lower.includes('orchard')) return <TreePine className="w-4 h-4 text-emerald-600" />;
  if (lower.includes('wi-fi') || lower.includes('internet')) return <Wifi className="w-4 h-4 text-blue-600" />;
  if (lower.includes('power') || lower.includes('solar') || lower.includes('ev')) return <Zap className="w-4 h-4 text-amber-500" />;
  if (lower.includes('parking') || lower.includes('car')) return <Car className="w-4 h-4 text-indigo-600" />;
  if (lower.includes('security') || lower.includes('cctv')) return <ShieldCheck className="w-4 h-4 text-slate-700" />;
  if (lower.includes('elevator') || lower.includes('lift')) return <Building className="w-4 h-4 text-purple-600" />;
  return <Check className="w-4 h-4 text-brand-600" />;
}

export default function PropertyDetailsPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { properties, getPropertyBySlug } = useProperties();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const property = getPropertyBySlug(slug);

  // Lightbox modal state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Handle 404 / Property Not Found state
  if (!property) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 rounded-3xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-6">
          <Home className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 mb-3">
          Property Not Found
        </h1>
        <p className="text-base text-slate-500 max-w-md mx-auto mb-8">
          The property you are looking for may have been leased, sold, or the URL might be incorrect.
        </p>
        <Link
          to="/properties"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-700 hover:bg-brand-800 text-white font-bold text-sm shadow-md transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Properties</span>
        </Link>
      </div>
    );
  }

  const {
    id,
    title,
    type,
    listingType,
    status,
    price,
    location,
    specs,
    description,
    amenities = [],
    photos = [],
    videos = [],
    createdAt,
  } = property;

  const isLand = type?.toLowerCase() === 'land';

  // Similar Properties: up to 3 of same type or city, excluding current
  const similarProperties = properties
    .filter(
      (p) =>
        p.id !== id &&
        (p.type?.toLowerCase() === type?.toLowerCase() ||
          p.location?.city?.toLowerCase() === location?.city?.toLowerCase())
    )
    .slice(0, 3);

  const openLightboxAt = (index) => {
    setPhotoIndex(index);
    setLightboxOpen(true);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleScrollToEnquiry = () => {
    const el = document.getElementById('enquiry-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hi, I'm interested in Property ID #${id}. Please share more details.`
  );

  return (
    <div className="bg-slate-50 min-h-screen pb-24 lg:pb-16">
      {/* Breadcrumb Navigation Bar */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-xs font-medium text-slate-500 overflow-x-auto whitespace-nowrap">
            <Link to="/" className="hover:text-brand-700 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <Link to="/properties" className="hover:text-brand-700 transition-colors">
              Properties
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <Link
              to={`/properties?type=${type}`}
              className="hover:text-brand-700 transition-colors"
            >
              {type}s
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-800 font-semibold truncate max-w-xs">
              {title}
            </span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {/* Media Hero Section: Large Cover + Thumbnail Collage */}
        <section className="mb-8">
          <div className="relative grid grid-cols-1 md:grid-cols-4 gap-3 rounded-3xl overflow-hidden bg-slate-900 shadow-lg">
            {/* Primary Cover Image (Left 3 cols on desktop) */}
            <div
              onClick={() => openLightboxAt(0)}
              className="md:col-span-3 aspect-[16/10] sm:aspect-[16/9] md:aspect-auto md:h-[480px] relative cursor-pointer group overflow-hidden"
            >
              <img
                src={photos[0]?.url || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80'}
                alt={photos[0]?.caption || title}
                fetchPriority="high"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

              {/* Badges on hero */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <ListingTypeBadge type={listingType} />
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-900/80 text-white backdrop-blur-md">
                  {type}
                </span>
              </div>

              {/* Photo & Video Counts Overlay Button */}
              <div className="absolute bottom-4 left-4 flex items-center gap-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    openLightboxAt(0);
                  }}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-900 text-white text-xs font-bold backdrop-blur-md shadow-md transition-transform active:scale-95"
                >
                  <Camera className="w-4 h-4" />
                  <span>{photos.length} Photos</span>
                </button>

                {videos.length > 0 && (
                  <a
                    href="#video-tour"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-rose-600/90 hover:bg-rose-600 text-white text-xs font-bold backdrop-blur-md shadow-md transition-transform active:scale-95"
                  >
                    <VideoIcon className="w-4 h-4" />
                    <span>{videos.length} {videos.length === 1 ? 'Video' : 'Videos'}</span>
                  </a>
                )}
              </div>
            </div>

            {/* Thumbnail Stack (Right col on desktop) */}
            <div className="hidden md:grid grid-rows-2 gap-3 h-[480px]">
              {photos.slice(1, 3).map((photo, idx) => (
                <div
                  key={idx}
                  onClick={() => openLightboxAt(idx + 1)}
                  className="relative cursor-pointer group overflow-hidden rounded-xl bg-slate-800"
                >
                  <img
                    src={photo.url}
                    alt={photo.caption || `Photo ${idx + 2}`}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />

                  {/* Show "+ More Photos" on the last thumbnail if more exist */}
                  {idx === 1 && photos.length > 3 && (
                    <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-xs flex flex-col items-center justify-center text-white font-bold transition-all group-hover:bg-slate-950/60">
                      <Camera className="w-6 h-6 mb-1 text-brand-300" />
                      <span className="text-sm">+{photos.length - 3} More</span>
                      <span className="text-[11px] font-normal text-slate-300">View Gallery</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Main Content Layout: Details + Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left 2 Columns: Specs, Description, Amenities, Video */}
          <div className="lg:col-span-2 space-y-8">
            {/* Title, Location & Price Card */}
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                      ID: #{id}
                    </span>
                    <span className="text-slate-300">•</span>
                    <StatusBadge status={status} />
                  </div>

                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                    {title}
                  </h1>

                  <div className="flex items-center gap-2 text-sm text-slate-500 font-medium mt-2">
                    <MapPin className="w-4 h-4 text-brand-600 flex-shrink-0" />
                    <span>
                      {location?.locality ? `${location.locality}, ` : ''}
                      {location?.city}, {location?.state}
                    </span>
                  </div>
                </div>

                {/* Price Display & Share Action */}
                <div className="flex flex-col sm:items-end flex-shrink-0">
                  <div className="text-3xl font-black text-slate-900 tracking-tight">
                    {formatPrice(price, listingType)}
                  </div>
                  {price && specs?.area && !isLand && (
                    <span className="text-xs text-slate-500 font-semibold mt-1">
                      ₹{Math.round(price / specs.area).toLocaleString('en-IN')}/sq.ft
                    </span>
                  )}

                  <div className="flex items-center gap-2 mt-4">
                    <button
                      type="button"
                      onClick={() => toggleWishlist(id)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        isInWishlist(id)
                          ? 'bg-rose-50 text-rose-600 border border-rose-200 shadow-xs'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                      title={isInWishlist(id) ? 'Remove from Wishlist' : 'Save to Wishlist'}
                    >
                      <Heart
                        className={`w-3.5 h-3.5 ${
                          isInWishlist(id) ? 'fill-rose-600 text-rose-600' : ''
                        }`}
                      />
                      <span>{isInWishlist(id) ? 'Saved' : 'Save to Wishlist'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleShare}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      <span>{copiedLink ? 'Link Copied!' : 'Share'}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Key Specs Matrix */}
              <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
                {!isLand ? (
                  <>
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                      <span className="text-xs font-medium text-slate-400 block mb-1">
                        Bedrooms
                      </span>
                      <div className="flex items-center gap-2 font-bold text-slate-900 text-lg">
                        <Bed className="w-5 h-5 text-brand-600" />
                        <span>{specs?.bedrooms || '-'} BHK</span>
                      </div>
                    </div>

                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                      <span className="text-xs font-medium text-slate-400 block mb-1">
                        Bathrooms
                      </span>
                      <div className="flex items-center gap-2 font-bold text-slate-900 text-lg">
                        <Bath className="w-5 h-5 text-brand-600" />
                        <span>{specs?.bathrooms || '-'} Baths</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 col-span-2">
                    <span className="text-xs font-medium text-slate-400 block mb-1">
                      Property Category
                    </span>
                    <div className="font-bold text-slate-900 text-lg">
                      Commercial / Residential Plot
                    </div>
                  </div>
                )}

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <span className="text-xs font-medium text-slate-400 block mb-1">
                    Super Area
                  </span>
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-lg">
                    <Maximize2 className="w-5 h-5 text-brand-600" />
                    <span>{specs?.area ? formatArea(specs.area) : '-'}</span>
                  </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <span className="text-xs font-medium text-slate-400 block mb-1">
                    Parking
                  </span>
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-lg">
                    <Car className="w-5 h-5 text-brand-600" />
                    <span>{specs?.parking ? `${specs.parking} Slots` : 'None'}</span>
                  </div>
                </div>
              </div>

              {specs?.furnishing && (
                <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                  <span className="font-semibold">Furnishing State:</span>
                  <span className="font-bold text-brand-700 bg-brand-50 px-2.5 py-1 rounded-md">
                    {specs.furnishing}
                  </span>
                </div>
              )}
            </div>

            {/* Full Property Description */}
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-4">
              <h2 className="text-xl font-extrabold text-slate-900">
                Property Overview & Description
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                {description}
              </p>
              <div className="pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-400">
                <Calendar className="w-4 h-4" />
                <span>Listed on {formatDate(createdAt)}</span>
              </div>
            </div>

            {/* Amenities Grid */}
            {amenities.length > 0 && (
              <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs">
                <h2 className="text-xl font-extrabold text-slate-900 mb-6">
                  Features & Amenities ({amenities.length})
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {amenities.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-sm font-semibold text-slate-800"
                    >
                      <div className="w-8 h-8 rounded-xl bg-white shadow-xs flex items-center justify-center flex-shrink-0">
                        {getAmenityIcon(item)}
                      </div>
                      <span className="truncate">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Video Walkthrough Section */}
            {videos.length > 0 && (
              <div id="video-tour" className="scroll-mt-24 space-y-4">
                <h2 className="text-xl font-extrabold text-slate-900">
                  Virtual Video Tours
                </h2>
                {videos.map((vid, i) => (
                  <VideoPlayer key={i} video={vid} />
                ))}
              </div>
            )}

            {/* Photo Gallery Grid */}
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900">
                    Photo Gallery ({photos.length})
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Click any photo to open full-screen lightbox
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => openLightboxAt(0)}
                  className="text-xs font-bold text-brand-700 hover:text-brand-800"
                >
                  View Fullscreen
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {photos.map((photo, index) => (
                  <div
                    key={index}
                    onClick={() => openLightboxAt(index)}
                    className="relative aspect-video rounded-2xl overflow-hidden bg-slate-100 cursor-pointer group shadow-xs hover:shadow-md transition-all"
                  >
                    <img
                      src={photo.url}
                      alt={photo.caption || `Photo ${index + 1}`}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {photo.category && (
                      <span className="absolute bottom-2 left-2 text-[10px] font-semibold text-white bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded-md">
                        {photo.category}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar: Contact Action Card + Enquiry Form */}
          <div className="space-y-6">
            {/* Quick Contact Action Box */}
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
              <span className="text-xs font-bold text-brand-700 tracking-wider uppercase">
                Connect Directly
              </span>
              <h3 className="text-lg font-extrabold text-slate-900">
                Interested in this Property?
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Call our senior property advisor directly or initiate a pre-filled chat on WhatsApp for quick inquiries.
              </p>

              <div className="space-y-2.5 pt-2">
                {/* Call Button */}
                <a
                  href="tel:+919876543210"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold text-sm transition-colors"
                >
                  <Phone className="w-4 h-4 text-brand-700" />
                  <span>Call +91 98765 43210</span>
                </a>

                {/* WhatsApp Button */}
                <a
                  href={`https://wa.me/919876543210?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition-colors shadow-sm"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Enquiry Form */}
            <EnquiryForm propertyId={id} propertyTitle={title} />
          </div>
        </div>

        {/* Similar Properties Section */}
        {similarProperties.length > 0 && (
          <section className="mt-16 pt-12 border-t border-slate-200">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
              <div>
                <span className="text-xs font-bold text-brand-700 tracking-wider uppercase">
                  Explore More Options
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                  Similar Properties You May Like
                </h2>
              </div>
              <Link
                to={`/properties?type=${type}`}
                className="text-sm font-semibold text-brand-700 hover:text-brand-800 flex items-center gap-1 mt-2 sm:mt-0"
              >
                <span>View more {type}s</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {similarProperties.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Lightbox Modal */}
      <Lightbox
        photos={photos}
        currentIndex={photoIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNext={() =>
          setPhotoIndex((prev) => (prev + 1) % photos.length)
        }
        onPrev={() =>
          setPhotoIndex((prev) => (prev - 1 + photos.length) % photos.length)
        }
        onSelectIndex={(idx) => setPhotoIndex(idx)}
      />

      {/* Mobile Sticky Contact Bar */}
      <StickyContactBar
        propertyId={id}
        phoneNumber="+919876543210"
        onEnquireClick={handleScrollToEnquiry}
      />
    </div>
  );
}
