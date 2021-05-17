export interface Version {
  id: number;
  url: string;
  name: string;
  zulu_version: number[];
  jdk_version: number[];
  java_version: number[];
  openjdk_build_number: number[];
}

function getRequiredVersions(
  versions: Version[],
  currentJDKVersion: string = '8.0.0.0'
): string[] {
  const result: string[] = [];
  const splittedCurrentVersion: string[] = currentJDKVersion.split('.');
  if (splittedCurrentVersion.length !== 4) {
    const tempLength: number = 4 - splittedCurrentVersion.length;
    for (let j = 0; j < tempLength; j++) {
      splittedCurrentVersion.push('0');
    }
  }
  for (let i = versions.length - 1; i >= 0; i--) {
    const objJDKVersion: string = versions[i].jdk_version.join('.');
    let versionPassed = true;
    versions[i].jdk_version.every((temp: number, tempIndex: number) => {
      if (Number(temp) === (Number(splittedCurrentVersion[tempIndex]) || 0)) {
        //same version
        versionPassed = true;
        return true;
      } else if (
        Number(temp) > (Number(splittedCurrentVersion[tempIndex]) || 0)
      ) {
        //new version
        versionPassed = true;
        return false;
      } else if (
        Number(temp) < (Number(splittedCurrentVersion[tempIndex]) || 0)
      ) {
        versionPassed = false;
        return false;
      }
    });
    if (versionPassed) {
      if (!(objJDKVersion.trim() === splittedCurrentVersion.join('.').trim())) {
        //same version as current, so skip
        result.push(`${objJDKVersion}, ${versions[i].url}`);
      }
    }
  }
  return result;
}

export default {
  getRequiredVersions
};
