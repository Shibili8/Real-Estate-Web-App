/**
 * Helpers to read and update filter query parameters in the URL
 */

export function parseFiltersFromParams(searchParams) {
  return {
    query: searchParams.get('q') || searchParams.get('city') || '',
    listingType: searchParams.get('listingType') || searchParams.get('buyRent') || 'All',
    type: searchParams.get('type') || 'All',
    minPrice: searchParams.get('min_price') || searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('max_price') || searchParams.get('maxPrice') || '',
    bedrooms: searchParams.get('bedrooms') || searchParams.get('beds') || 'all',
    sort: searchParams.get('sort') || 'newest',
  };
}

export function buildSearchParamsFromFilters(filters) {
  const params = new URLSearchParams();

  if (filters.query && filters.query.trim()) {
    params.set('city', filters.query.trim());
  }
  if (filters.listingType && filters.listingType !== 'All') {
    params.set('listingType', filters.listingType);
  }
  if (filters.type && filters.type !== 'All') {
    params.set('type', filters.type.toLowerCase());
  }
  if (filters.minPrice && !isNaN(Number(filters.minPrice)) && Number(filters.minPrice) > 0) {
    params.set('min_price', filters.minPrice);
  }
  if (filters.maxPrice && !isNaN(Number(filters.maxPrice)) && Number(filters.maxPrice) > 0) {
    params.set('max_price', filters.maxPrice);
  }
  if (filters.bedrooms && filters.bedrooms !== 'all') {
    params.set('bedrooms', filters.bedrooms);
  }
  if (filters.sort && filters.sort !== 'newest') {
    params.set('sort', filters.sort);
  }

  return params;
}
