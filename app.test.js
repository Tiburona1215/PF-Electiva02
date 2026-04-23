const request = require('supertest');
const app = require('./app');

describe('Aplicación DevOps Final', () => {
  test('GET / responde 200 con contenido HTML', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain('Hola');
    expect(res.text).toContain('Mundo');
  });

  test('GET /health responde con status ok y uptime', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
    expect(typeof res.body.uptime).toBe('number');
    expect(res.body.version).toBe('1.0.0');
  });

  test('GET /info responde con información del sistema', async () => {
    const res = await request(app).get('/info');
    expect(res.statusCode).toBe(200);
    expect(res.body.app).toBe('devops-final-app');
    expect(res.body.node).toContain('v');
  });

  test('GET /ruta-inexistente responde 404', async () => {
    const res = await request(app).get('/ruta-que-no-existe');
    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBeDefined();
  });
});