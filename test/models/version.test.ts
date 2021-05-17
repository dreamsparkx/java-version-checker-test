import versionModel from '../../src/models/version';

describe('Check Version Model', () => {
  const testCases = [
    {
      versions: [
        {
          jdk_version: [11, 0, 9, 0],
          url: 'https://azul.com'
        }
      ],
      currentJDKVersion: '8.0.0.1',
      expected: 1
    },
    {
      versions: [
        {
          jdk_version: [11, 0, 9, 0],
          url: 'https://azul.com'
        }
      ],
      currentJDKVersion: '8.0.0',
      expected: 1
    },
    {
      versions: [
        {
          jdk_version: [8, 0, 0, 0],
          url: 'https://azul.com'
        }
      ],
      currentJDKVersion: '8.0.0',
      expected: 0
    },
    {
      versions: [
        {
          jdk_version: [7, 0, 0, 0],
          url: 'https://azul.com'
        }
      ],
      currentJDKVersion: '8.0.0',
      expected: 0
    },
    {
      versions: [
        {
          jdk_version: [7, 0, 0, 0],
          url: 'https://azul.com'
        }
      ],
      currentJDKVersion: undefined,
      expected: 0
    }
  ];
  testCases.forEach((test: any, index: number) => {
    it(`Check getRequiredVersions for versions ${index} and the current version is ${test.currentJDKVersion}`, () => {
      expect(
        versionModel.getRequiredVersions(test.versions, test.currentJDKVersion)
          .length
      ).toBe(test.expected);
    });
  });
});
