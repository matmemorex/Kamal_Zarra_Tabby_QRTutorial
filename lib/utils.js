/**
 * Normalize Malaysian phone number to international format
 * @param {string} input - Phone number input
 * @returns {string} Normalized phone number (e.g., 60123456789)
 */
export function normalizePhone(input) {
  // Remove spaces, dashes, and other non-digit characters except +
  let phone = input.replace(/[-\s()]/g, '');
  
  // Remove leading 0 if present
  if (phone.startsWith('0')) {
    phone = phone.substring(1);
  }
  
  // Add country code if not present
  if (!phone.startsWith('60')) {
    phone = '60' + phone;
  }
  
  // Validate length (60 + 9-10 digits = 11-12 total)
  if (phone.length < 11 || phone.length > 12) {
    throw new Error('Invalid phone number format');
  }
  
  return phone;
}

/**
 * Format phone number for display
 * @param {string} phone - Normalized phone number
 * @returns {string} Formatted phone number
 */
export function formatPhone(phone) {
  if (!phone) return '';
  // Remove country code for display
  const local = phone.startsWith('60') ? phone.substring(2) : phone;
  // Format as 012-3456789
  if (local.length === 9) {
    return `${local.substring(0, 3)}-${local.substring(3)}`;
  }
  return local;
}

/**
 * Validate phone number format
 * @param {string} phone - Phone number to validate
 * @returns {boolean} True if valid
 */
export function validatePhone(phone) {
  const cleaned = phone.replace(/[-\s()]/g, '');
  // Malaysian mobile: 01X-XXXXXXX (9-10 digits after removing 0)
  const regex = /^0?1[0-9]{8,9}$/;
  return regex.test(cleaned);
}

/**
 * Format date for display
 * @param {Date|string} date - Date to format
 * @returns {string} Formatted date
 */
export function formatDate(date) {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleDateString('ms-MY', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

/**
 * Format number with commas
 * @param {number} num - Number to format
 * @returns {string} Formatted number
 */
export function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

