/**
 * Formats a numeric price into Indian currency notation (₹ Lakhs / ₹ Cr / ₹/mo).
 *
 * @param {number} price - Raw price number
 * @param {string} listingType - "Buy" or "Rent"
 * @returns {string} Formatted price string
 */
export function formatPrice(price, listingType = 'Buy') {
  if (!price && price !== 0) return 'Price on Request';

  if (listingType === 'Rent') {
    return `₹${Number(price).toLocaleString('en-IN')}/mo`;
  }

  const num = Number(price);

  if (num >= 10000000) {
    const cr = num / 10000000;
    // Format to max 2 decimal places, removing trailing zeros
    return `₹${parseFloat(cr.toFixed(2))} Cr`;
  }

  if (num >= 100000) {
    const lakhs = num / 100000;
    return `₹${parseFloat(lakhs.toFixed(2))} Lakhs`;
  }

  return `₹${num.toLocaleString('en-IN')}`;
}

/**
 * Formats square footage area.
 *
 * @param {number} area - Area in sq.ft
 * @returns {string} e.g. "3,400 sq.ft"
 */
export function formatArea(area) {
  if (!area) return 'N/A';
  return `${Number(area).toLocaleString('en-IN')} sq.ft`;
}

/**
 * Formats a date string (YYYY-MM-DD) into readable text.
 *
 * @param {string} dateString
 * @returns {string} e.g. "Sep 1, 2026"
 */
export function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Generates a URL-friendly slug from title and city.
 *
 * @param {string} title
 * @param {string} city
 * @returns {string}
 */
export function generateSlug(title, city = '') {
  const combined = `${title} ${city}`.trim();
  return combined
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .substring(0, 80);
}
