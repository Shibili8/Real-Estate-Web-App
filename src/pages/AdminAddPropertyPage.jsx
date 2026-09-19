import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Plus,
  Upload,
  Trash2,
  ArrowUp,
  ArrowDown,
  Star,
  Video,
  CheckCircle2,
  Image as ImageIcon,
  Building2,
  Home,
  MapPin,
  IndianRupee,
  Link as LinkIcon,
  AlertCircle,
  FileText,
} from 'lucide-react';
import { useProperties } from '../context/PropertyContext';
import {
  PROPERTY_TYPES,
  LISTING_TYPES,
  ALL_AMENITIES,
  POPULAR_CITIES,
} from '../types/property';
import { generateSlug, formatPrice } from '../utils/formatters';

export default function AdminAddPropertyPage() {
  const navigate = useNavigate();
  const { addProperty } = useProperties();

  // Basic Details
  const [title, setTitle] = useState('');
  const [type, setType] = useState('Apartment');
  const [listingType, setListingType] = useState('Buy');
  const [price, setPrice] = useState('');
  const [city, setCity] = useState('Calicut');
  const [locality, setLocality] = useState('');
  const [state, setState] = useState('Kerala');

  // Specs
  const [bedrooms, setBedrooms] = useState('3');
  const [bathrooms, setBathrooms] = useState('2');
  const [area, setArea] = useState('1800');
  const [parking, setParking] = useState('1');
  const [furnishing, setFurnishing] = useState('Fully Furnished');

  // Description & Amenities
  const [description, setDescription] = useState('');
  const [selectedAmenities, setSelectedAmenities] = useState([
    'Covered Car Parking',
    '24/7 Power Backup',
    'CCTV Security',
  ]);

  // Photos state: [{ url, category, caption, isCover, id }]
  const [photos, setPhotos] = useState([
    {
      id: 'photo-1',
      url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      category: 'Exterior',
      caption: 'Front exterior architectural view',
      isCover: true,
    },
    {
      id: 'photo-2',
      url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
      category: 'Living Room',
      caption: 'Spacious living room with natural light',
      isCover: false,
    },
  ]);
  const [urlInput, setUrlInput] = useState('');

  // Video state
  const [hasVideo, setHasVideo] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const [videoTitle, setVideoTitle] = useState('Architectural Video Walkthrough');
  const [videoType, setVideoType] = useState('walkthrough');

  // Form Validation & Status
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Add photo via direct URL
  const handleAddPhotoUrl = () => {
    if (!urlInput.trim()) return;
    const newPhoto = {
      id: `photo-${Date.now()}`,
      url: urlInput.trim(),
      category: 'General',
      caption: '',
      isCover: photos.length === 0,
    };
    setPhotos((prev) => [...prev, newPhoto]);
    setUrlInput('');
  };

  // Add photo via file upload (Local preview)
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    const newPhotos = files.map((file, i) => ({
      id: `photo-file-${Date.now()}-${i}`,
      url: URL.createObjectURL(file),
      category: 'Interior',
      caption: file.name.replace(/\.[^/.]+$/, ''),
      isCover: photos.length === 0 && i === 0,
    }));

    setPhotos((prev) => [...prev, ...newPhotos]);
    e.target.value = '';
  };

  // Set cover photo
  const handleSetCover = (index) => {
    setPhotos((prev) =>
      prev.map((photo, i) => ({
        ...photo,
        isCover: i === index,
      }))
    );
  };

  // Delete photo
  const handleDeletePhoto = (index) => {
    setPhotos((prev) => {
      const updated = prev.filter((_, i) => i !== index);
      // Ensure at least one cover remains if list not empty
      if (updated.length > 0 && !updated.some((p) => p.isCover)) {
        updated[0].isCover = true;
      }
      return updated;
    });
  };

  // Reorder photos: move photo up/down
  const handleMovePhoto = (index, direction) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= photos.length) return;

    setPhotos((prev) => {
      const next = [...prev];
      const temp = next[index];
      next[index] = next[targetIndex];
      next[targetIndex] = temp;
      return next;
    });
  };

  // Update photo caption or category
  const handleUpdatePhotoField = (index, field, value) => {
    setPhotos((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  // Toggle amenities
  const handleToggleAmenity = (amenity) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity]
    );
  };

  // Form Validation
  const validate = () => {
    const newErrors = {};

    if (!title.trim()) newErrors.title = 'Title is required';
    if (!price || isNaN(Number(price)) || Number(price) <= 0) {
      newErrors.price = 'Please enter a valid numeric price';
    }
    if (!city.trim()) newErrors.city = 'City is required';
    if (!locality.trim()) newErrors.locality = 'Locality is required';
    if (!description.trim() || description.trim().length < 20) {
      newErrors.description = 'Description must be at least 20 characters';
    }
    if (photos.length === 0) {
      newErrors.photos = 'Please add at least one property photo';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);

    const generatedId = `PROP-${Math.floor(1000 + Math.random() * 9000)}`;
    const slug = generateSlug(title, city);

    const videosList = [];
    if (hasVideo && videoUrl.trim()) {
      videosList.push({
        type: videoType,
        url: videoUrl.trim(),
        thumbnail: photos.find((p) => p.isCover)?.url || photos[0]?.url,
        title: videoTitle.trim() || 'Property Video Walkthrough',
      });
    }

    const newProperty = {
      id: generatedId,
      slug,
      title: title.trim(),
      type,
      listingType,
      status: 'Available',
      price: Number(price),
      priceDisplay: formatPrice(price, listingType),
      location: {
        city: city.trim(),
        locality: locality.trim(),
        state: state.trim(),
      },
      specs: {
        bedrooms: type === 'Land' ? 0 : Number(bedrooms),
        bathrooms: type === 'Land' ? 0 : Number(bathrooms),
        area: Number(area) || 1500,
        parking: type === 'Land' ? 0 : Number(parking),
        furnishing,
      },
      description: description.trim(),
      amenities: selectedAmenities,
      photos,
      videos: videosList,
      createdAt: new Date().toISOString().split('T')[0],
      featured: false,
    };

    // Save to Context & LocalStorage
    addProperty(newProperty);

    setSuccess(true);
    setIsSubmitting(false);

    // Redirect to newly created property detail page
    setTimeout(() => {
      navigate(`/property/${slug}`);
    }, 1200);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Page Header */}
      <div className="mb-8">
        <span className="text-xs font-bold text-brand-700 uppercase tracking-wider">
          Admin Portal
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
          Add New Property Listing
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Fill in details, upload multiple images, select cover photo, reorder gallery, and attach video tours.
        </p>
      </div>

      {success ? (
        <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-10 text-center animate-in zoom-in-95">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-emerald-900 mb-2">
            Property Listed Successfully!
          </h2>
          <p className="text-sm text-emerald-700 max-w-md mx-auto">
            Your property has been saved and is now live in the directory. Redirecting you to the property detail view...
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-8" noValidate>
          {/* Section 1: Basic Information */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-5">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
              <Home className="w-5 h-5 text-brand-600" />
              <span>Basic Information</span>
            </h2>

            {/* Title */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Property Title <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Ultra Luxury 4 BHK Oceanfront Villa"
                className={`w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:bg-white transition-all ${
                  errors.title
                    ? 'border-rose-300 focus:ring-rose-500'
                    : 'border-slate-200 focus:ring-brand-500'
                }`}
              />
              {errors.title && (
                <p className="text-xs text-rose-600 mt-1">{errors.title}</p>
              )}
            </div>

            {/* Type & Listing Type */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Property Type
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white"
                >
                  {PROPERTY_TYPES.filter((t) => t !== 'All').map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Listing Type
                </label>
                <select
                  value={listingType}
                  onChange={(e) => setListingType(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white"
                >
                  <option value="Buy">Buy (For Sale)</option>
                  <option value="Rent">Rent (Monthly Lease)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Price (in ₹) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder={listingType === 'Rent' ? 'e.g. 45000' : 'e.g. 12500000'}
                  className={`w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:bg-white transition-all ${
                    errors.price
                      ? 'border-rose-300 focus:ring-rose-500'
                      : 'border-slate-200 focus:ring-brand-500'
                  }`}
                />
                {errors.price && (
                  <p className="text-xs text-rose-600 mt-1">{errors.price}</p>
                )}
              </div>
            </div>
          </div>

          {/* Section 2: Location */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-5">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
              <MapPin className="w-5 h-5 text-brand-600" />
              <span>Location Details</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  City <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="e.g. Calicut"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Locality / Landmark <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={locality}
                  onChange={(e) => setLocality(e.target.value)}
                  placeholder="e.g. PT Usha Road"
                  className={`w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:bg-white ${
                    errors.locality
                      ? 'border-rose-300 focus:ring-rose-500'
                      : 'border-slate-200 focus:ring-brand-500'
                  }`}
                />
                {errors.locality && (
                  <p className="text-xs text-rose-600 mt-1">{errors.locality}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  State
                </label>
                <input
                  type="text"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  placeholder="e.g. Kerala"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Specs (If not Land) */}
          {type !== 'Land' && (
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-5">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
                <Building2 className="w-5 h-5 text-brand-600" />
                <span>Property Specifications</span>
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Bedrooms
                  </label>
                  <input
                    type="number"
                    value={bedrooms}
                    onChange={(e) => setBedrooms(e.target.value)}
                    min={1}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Bathrooms
                  </label>
                  <input
                    type="number"
                    value={bathrooms}
                    onChange={(e) => setBathrooms(e.target.value)}
                    min={1}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Area (sq.ft)
                  </label>
                  <input
                    type="number"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    min={100}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Parking Slots
                  </label>
                  <input
                    type="number"
                    value={parking}
                    onChange={(e) => setParking(e.target.value)}
                    min={0}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Furnishing
                  </label>
                  <select
                    value={furnishing}
                    onChange={(e) => setFurnishing(e.target.value)}
                    className="w-full px-2 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  >
                    <option value="Fully Furnished">Fully Furnished</option>
                    <option value="Semi-Furnished">Semi-Furnished</option>
                    <option value="Unfurnished">Unfurnished</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Section 4: Multi-Image Upload & Gallery Manager */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
                <ImageIcon className="w-5 h-5 text-brand-600" />
                <span>Photo Gallery & Cover Image</span>
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Upload files from your device or paste web image URLs. Select which image acts as the cover, reorder photos, or remove items.
              </p>
            </div>

            {/* Input Options: File Upload & URL Input */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* File Upload Zone */}
              <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center hover:border-brand-400 transition-colors bg-slate-50">
                <Upload className="w-8 h-8 text-brand-600 mx-auto mb-2" />
                <label className="cursor-pointer block">
                  <span className="text-sm font-bold text-brand-700 hover:text-brand-800">
                    Upload photos from device
                  </span>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
                <p className="text-[11px] text-slate-400 mt-1">
                  Supports PNG, JPG, WebP (Multi-select enabled)
                </p>
              </div>

              {/* Direct Image URL input */}
              <div className="border border-slate-200 rounded-2xl p-5 bg-slate-50 flex flex-col justify-between">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Or Add Image via Web URL
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      value={urlInput}
                      onChange={(e) => setUrlInput(e.target.value)}
                      placeholder="https://images.unsplash.com/..."
                      className="flex-1 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                    <button
                      type="button"
                      onClick={handleAddPhotoUrl}
                      className="px-3.5 py-2 rounded-xl bg-brand-700 text-white font-bold text-xs hover:bg-brand-800 transition-colors shadow-xs"
                    >
                      Add
                    </button>
                  </div>
                </div>
                <p className="text-[11px] text-slate-400 mt-2">
                  Tip: Use Unsplash or CDN image links for high-definition previews.
                </p>
              </div>
            </div>

            {errors.photos && (
              <p className="text-xs text-rose-600 font-medium">{errors.photos}</p>
            )}

            {/* Photos Management Grid */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-slate-700 block">
                Gallery Photos ({photos.length})
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {photos.map((photo, index) => (
                  <div
                    key={photo.id || index}
                    className={`relative rounded-2xl border p-3 flex gap-3 transition-all ${
                      photo.isCover
                        ? 'border-brand-500 bg-brand-50/40 ring-2 ring-brand-400'
                        : 'border-slate-200 bg-white'
                    }`}
                  >
                    {/* Thumbnail */}
                    <div className="relative w-28 h-24 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
                      <img
                        src={photo.url}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                      {photo.isCover && (
                        <span className="absolute top-1 left-1 bg-amber-500 text-slate-900 text-[10px] font-bold px-1.5 py-0.5 rounded shadow-sm flex items-center gap-0.5">
                          <Star className="w-2.5 h-2.5 fill-current" />
                          Cover
                        </span>
                      )}
                    </div>

                    {/* Meta & Actions */}
                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between gap-1">
                          <select
                            value={photo.category}
                            onChange={(e) =>
                              handleUpdatePhotoField(
                                index,
                                'category',
                                e.target.value
                              )
                            }
                            className="text-xs font-semibold bg-slate-100 px-2 py-1 rounded-lg text-slate-700 focus:outline-none"
                          >
                            <option value="Exterior">Exterior</option>
                            <option value="Living Room">Living Room</option>
                            <option value="Bedroom">Bedroom</option>
                            <option value="Kitchen">Kitchen</option>
                            <option value="Bathroom">Bathroom</option>
                            <option value="Balcony">Balcony</option>
                            <option value="Plot Overview">Plot Overview</option>
                          </select>

                          {/* Cover toggle */}
                          {!photo.isCover && (
                            <button
                              type="button"
                              onClick={() => handleSetCover(index)}
                              className="text-[11px] text-brand-700 hover:text-brand-900 font-semibold underline"
                            >
                              Make Cover
                            </button>
                          )}
                        </div>

                        <input
                          type="text"
                          value={photo.caption}
                          onChange={(e) =>
                            handleUpdatePhotoField(
                              index,
                              'caption',
                              e.target.value
                            )
                          }
                          placeholder="Photo caption (e.g. Master suite balcony)"
                          className="w-full text-xs px-2 py-1 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400"
                        />
                      </div>

                      {/* Reorder & Delete controls */}
                      <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            disabled={index === 0}
                            onClick={() => handleMovePhoto(index, -1)}
                            className="p-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-600 disabled:opacity-30"
                            title="Move left/up"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            disabled={index === photos.length - 1}
                            onClick={() => handleMovePhoto(index, 1)}
                            className="p-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-600 disabled:opacity-30"
                            title="Move right/down"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleDeletePhoto(index)}
                          className="p-1 rounded text-rose-600 hover:bg-rose-50"
                          title="Delete photo"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Section 5: Video Tour (Optional) */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Video className="w-5 h-5 text-rose-600" />
                <span>Virtual Video Walkthrough</span>
              </h2>
              <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasVideo}
                  onChange={(e) => setHasVideo(e.target.checked)}
                  className="rounded text-brand-700 focus:ring-brand-500 w-4 h-4 cursor-pointer"
                />
                <span>Include Video Tour</span>
              </label>
            </div>

            {hasVideo && (
              <div className="space-y-4 pt-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    YouTube URL or Embed Link
                  </label>
                  <input
                    type="url"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">
                    Accepts youtube.com/watch?v=..., youtu.be/... or embed links.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Video Tour Title
                    </label>
                    <input
                      type="text"
                      value={videoTitle}
                      onChange={(e) => setVideoTitle(e.target.value)}
                      placeholder="e.g. Full Architectural Video Tour"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Video Type
                    </label>
                    <select
                      value={videoType}
                      onChange={(e) => setVideoType(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800"
                    >
                      <option value="walkthrough">Walkthrough Tour</option>
                      <option value="drone">Aerial Drone View</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Section 6: Description & Amenities */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
              <FileText className="w-5 h-5 text-brand-600" />
              <span>Description & Amenities</span>
            </h2>

            {/* Description */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Full Description <span className="text-rose-500">*</span>
              </label>
              <textarea
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe key highlights, architectural nuances, neighborhood advantages, and builder specifications..."
                className={`w-full p-4 bg-slate-50 border rounded-2xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:bg-white transition-all ${
                  errors.description
                    ? 'border-rose-300 focus:ring-rose-500'
                    : 'border-slate-200 focus:ring-brand-500'
                }`}
              />
              {errors.description && (
                <p className="text-xs text-rose-600 mt-1">{errors.description}</p>
              )}
            </div>

            {/* Amenities Checkboxes */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-3">
                Select Available Amenities ({selectedAmenities.length} selected)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-56 overflow-y-auto p-1">
                {ALL_AMENITIES.map((amenity) => {
                  const checked = selectedAmenities.includes(amenity);
                  return (
                    <button
                      key={amenity}
                      type="button"
                      onClick={() => handleToggleAmenity(amenity)}
                      className={`text-left px-3 py-2 rounded-xl text-xs font-medium border transition-all flex items-center gap-2 ${
                        checked
                          ? 'bg-brand-50 border-brand-300 text-brand-900 font-bold'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <span
                        className={`w-3.5 h-3.5 rounded border flex items-center justify-center text-[10px] ${
                          checked
                            ? 'bg-brand-700 border-brand-700 text-white'
                            : 'border-slate-300 bg-white'
                        }`}
                      >
                        {checked && '✓'}
                      </span>
                      <span className="truncate">{amenity}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-3 rounded-xl border border-slate-200 font-bold text-sm text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-brand-700 hover:bg-brand-800 disabled:bg-slate-300 text-white font-bold text-sm shadow-md transition-all active:scale-[0.98]"
            >
              <Plus className="w-4 h-4" />
              <span>{isSubmitting ? 'Publishing Property...' : 'Publish Property Listing'}</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
