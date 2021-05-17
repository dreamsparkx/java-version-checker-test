import * as readArguments from '../utils/readArguments';
import * as azulAPIs from '../utils/callAzulAPI';
import * as miscellaneous from '../utils/miscellaneous';
import versionModel from '../models/version';
import osVersions from '../utils/constants';

async function checkJDKData(): Promise<boolean> {
  const jdkVersion = readArguments.readArgumentsForJDKVersion();
  try {
    const osPlatform: string = miscellaneous.getOSPlatform();
    const apiResult = await azulAPIs
      .callAzulAPI(osVersions[osPlatform])
      .catch((err) => {
        throw new Error(err);
      });
    if (apiResult.status === 200) {
      const result = versionModel.getRequiredVersions(
        apiResult.data,
        jdkVersion
      );
      if (result.length === 0) {
        //  no new versions found
        console.log('You have the latest version installed. Happy Coding.');
      } else {
        console.log('You can update your JDK to following versions:');
        result.forEach((versionWithURL: string) => {
          console.log(versionWithURL);
        });
      }
      return true;
    } else {
      console.error('Cant receive right result, try again later');
      return false;
    }
  } catch (err) {
    console.error(err);
    return false;
  }
}

export default {
  checkJDKData
};
