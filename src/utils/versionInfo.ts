
/**
 * Version information for the application
 * Update this file when making significant changes
 */

export const VERSION = {
  major: 1,
  minor: 0,
  patch: 0,
  label: 'beta',
  buildDate: new Date().toISOString(),
  get fullVersion() {
    return `${this.major}.${this.minor}.${this.patch}${this.label ? `-${this.label}` : ''}`;
  }
};

/**
 * Log version information to console for debugging
 */
export const logVersionInfo = () => {
  console.info(`ALEGI Version: ${VERSION.fullVersion}`);
  console.info(`Build date: ${VERSION.buildDate}`);
};

/**
 * Check if the current version is newer than the provided version
 * @param major Major version number
 * @param minor Minor version number
 * @param patch Patch version number
 */
export const isNewerVersion = (major: number, minor: number, patch: number): boolean => {
  if (VERSION.major > major) return true;
  if (VERSION.major < major) return false;
  
  if (VERSION.minor > minor) return true;
  if (VERSION.minor < minor) return false;
  
  return VERSION.patch > patch;
};
