import API from 'utils/api-test-jest';

export default () => {
  it('Testing Check User Valid', async () => {
    const response = await API.get('/login/check-user?cpf=4073324489')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    const json = JSON.parse(response.text);

    expect(Object.keys(json)).toContain('token');

    expect(typeof json.token).toContain('string');
  });

  it('Testing Check User Invalid', async () => {
    const response = await API.get('/login/check-user?cpf=04073324482')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(403);

    const json = JSON.parse(response.text);

    expect(Object.keys(json)).toContain('message');
  });
};
