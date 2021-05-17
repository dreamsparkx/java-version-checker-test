import jdkController from '../../src/controllers/jdkController';
import * as argumentUtil from '../../src/utils/readArguments';
import * as miscellaneous from '../../src/utils/miscellaneous';
import * as azulAPIs from '../../src/utils/callAzulAPI';

describe('Test cases for JDK Controller', () => {
  beforeEach(() => {
    jest
      .spyOn(argumentUtil, 'readArgumentsForJDKVersion')
      .mockImplementation(() => '8.0.0');
    jest
      .spyOn(miscellaneous, 'getOSPlatform')
      .mockImplementation(() => 'darwin');
    jest.spyOn(console, 'log').mockImplementation();
  });
  const jdkTestCases = [
    {
      data: [
        {
          url: 'https://azul.com',
          jdk_version: [8, 0, 0, 0]
        }
      ],
      status: 200,
      statusText: 'SUCCESS',
      expected: true
    },
    {
      data: [
        {
          url: 'https://azul.com',
          jdk_version: [8, 0, 0, 0]
        }
      ],
      status: 400,
      statusText: 'FAILURE',
      expected: false
    },
    {
      data: [
        {
          url: 'https://azul.com',
          jdk_version: [8, 0, 0, 0]
        },
        {
          url: 'https://azul.com',
          jdk_version: [11, 0, 0, 0]
        }
      ],
      status: 200,
      statusText: 'SUCCESS',
      expected: true
    }
  ];
  jdkTestCases.forEach((test: any, testIndex: number) => {
    it('jdk controler for ' + testIndex, async () => {
      jest.spyOn(azulAPIs, 'callAzulAPI').mockImplementation(() =>
        Promise.resolve({
          data: test.data,
          status: test.status,
          statusText: test.statusText,
          headers: [],
          config: {}
        })
      );
      const result = await jdkController.checkJDKData();
      expect(result).toBe(test.expected);
    });
  });
});
