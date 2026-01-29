/* eslint-env jest, node */
/* global global */

// Se till att fetch finns (för Node <18)
if (!global.fetch) {
  global.fetch = require('node-fetch');
}

const WeatherService = require('./WeatherService');

beforeEach(() => {
  jest.spyOn(global, 'fetch').mockClear();
});

afterEach(() => {
  jest.restoreAllMocks();
});

test('getWeather returns data', async () => {
  jest.spyOn(global, 'fetch').mockResolvedValue({
    ok: true,
    json: async () => ({ temperature: 20, condition: 'Sunny' }),
  });

  const service = new WeatherService();
  const weather = await service.getWeather('Stockholm');
  expect(weather.temperature).toBe(20);
  expect(weather.condition).toBe('Sunny');
});

test('getWeather handles API error', async () => {
  jest.spyOn(global, 'fetch').mockResolvedValue({ ok: false });
  const service = new WeatherService();
  await expect(service.getWeather('Stockholm')).rejects.toThrow('API error');
});

test(
  'getWeather handles timeout',
  async () => {
    jest.spyOn(global, 'fetch').mockImplementation(() => {
      const error = new Error('Aborted');
      error.name = 'AbortError';
      return Promise.reject(error);
    });
    const service = new WeatherService();
    await expect(service.getWeather('Stockholm')).rejects.toThrow('Request timed out');
  },
  6000 // test timeout i ms
);