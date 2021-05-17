import os from 'os';

export function getOSPlatform(): NodeJS.Platform {
  return os.platform();
}
