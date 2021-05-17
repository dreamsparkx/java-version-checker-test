import jdkController from './controllers/jdkController';

async function run() {
  jdkController
    .checkJDKData()
    .then((result: boolean) => {
      if (result) {
        process.exit(0);
      } else {
        process.exit(1);
      }
    })
    .catch(() => {
      process.exit(1);
    });
}

run();
