import {
  checkJDKVersionFromArgument,
  readArgumentsForJDKVersion
} from '../../src/utils/readArguments';

describe('Check utils functions', () => {
  const jdkVersionTestCases = [
    {
      val: '1',
      expected: true
    },
    {
      val: '',
      expected: false
    },
    {
      val: '0',
      expected: true
    },
    {
      val: '11.0.0.0.1',
      expected: false
    },
    {
      val: '11.0.1',
      expected: true
    }
  ];
  const jdkArgumentTestCases: any = [
    {
      val: null,
      expected: undefined
    },
    {
      val: 'asdqwe',
      expected: undefined
    },
    {
      val: '1.0',
      expected: '1.0'
    }
  ];
  jdkVersionTestCases.forEach((test: any) => {
    it(`should check JDK version argument function with ${test.val} as val`, () => {
      expect(checkJDKVersionFromArgument(test.val)).toBe(test.expected);
    });
  });
  it('should check JDK version argument function with nothing as val', () => {
    expect(checkJDKVersionFromArgument()).toBe(false);
  });
  jest.spyOn(process, 'exit').mockImplementation(() => undefined as never);
  jest.spyOn(console, 'error').mockImplementation(() => undefined as never);
  jdkArgumentTestCases.forEach((test: any) => {
    it('should read JDK arguments', () => {
      process.argv[2] = test.val;
      expect(readArgumentsForJDKVersion()).toBe(test.expected);
    });
  });
});
