export function readArgumentsForJDKVersion(): string {
  if (process.argv.length > 2 && process.argv[2]) {
    const check = process.argv[2].trim();
    if (checkJDKVersionFromArgument(check)) {
      return check;
    } else {
      console.error('Incorrect version, check readme');
      process.exit(1);
    }
  } else {
    console.error('Enter Arguments correctly, check readme');
    process.exit(1);
  }
}

export function checkJDKVersionFromArgument(arg: string = ''): boolean {
  const checStr = arg.split('.').join('').trim();
  if (checStr === '') {
    return false;
  }
  const pointsRemovedStr = Number(checStr);
  if (typeof pointsRemovedStr === 'number' && !isNaN(pointsRemovedStr)) {
    //version is valid
    const numOfDots: number = arg.split('.').length - 1;
    if (numOfDots > 3) {
      //wrong number of dots
      return false;
    }
    return true;
  } else {
    return false;
  }
}
