export default async promise => {
  try {
    let response;
    await new Promise(async resolve => {
      response = await promise;

      setTimeout(() => {
        resolve();
      }, 500);
    });

    return response;
  } catch (e) {
    setTimeout(() => {
      throw e;
    }, 500);
  }
};
