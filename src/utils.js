import queryString from 'query-string';

/**
 * Returns url query from react location object
 * @param {String} query - query string
 * @param {Object} loc - React router location props 'props.location'
 * @returns {String} - query string
 */
export const getUrlQuery = (query, loc) => queryString.parse(loc.search)[query];

/**
 * Returns largest file in an array of torrent files
 * @param {Array} files 
 * @returns {Object}
 */
export const getLargestFileIndex = files => {
  let largestSize = 0;
  let largestIndex = 0;

  for (let i = 0; i < files.length; i++) {
    if (files[i].length >= largestSize) {
      largestSize = files[i].length
      largestIndex = i
    }
  }

  return largestIndex;
}

/**
 * Converts float to file size with extension
 * @param {Float} num 
 * @returns {String}
 */
export const getBytesUnit = num => {
  if (isNaN(num)) {
      return;
  }

  num = parseInt(num);

  let exponent;
  let unit;
  let units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];;
  let base = 1000;
  var neg = num < 0;

  if (neg) {
    num = -num;
  }

  if (num < 1) {
    unit = units[0];
    return (neg ? '-' : '') + num + ' ' + unit;
  }

  exponent = Math.min(Math.floor(Math.log(num) / Math.log(base)), units.length - 1);
  num = (num / Math.pow(base, exponent)).toFixed(2) * 1;
  unit = units[exponent];

  return (neg ? '-' : '') + num + ' ' + unit;
};
