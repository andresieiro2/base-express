import DB from 'database';

describe('Testing connecting database', () => {
  it('Testing Mongo Connection', async () => {
    const call = await DB.connect();

    expect(call).toEqual({
      connected: true,
    });
  });
});
