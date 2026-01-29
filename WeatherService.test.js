/* eslint-env jest, node */
/* global global */

const WeatherService = require('./WeatherService');

beforeEach(() => {
  global.fetch = jest.fn();
});

afterEach(() => {
  jest.clearAllMocks();
});

test('getWeather returns data', async () => {
  fetch.mockResolvedValue({
    ok: true,
    json: async () => ({ temperature: 20, condition: 'Sunny' }),
  });

  const service = new WeatherService();
  const weather = await service.getWeather('Stockholm');
  expect(weather.temperature).toBe(20);
  expect(weather.condition).toBe('Sunny');
});

test('getWeather handles API error', async () => {
  fetch.mockResolvedValue({ ok: false });
  const service = new WeatherService();
  await expect(service.getWeather('Stockholm')).rejects.toThrow('API error');
});

test('getWeather handles timeout', async () => {
  fetch.mockImplementation(
    () => new Promise((resolve) => setTimeout(() => resolve({ ok: true, json: async () => ({}) }), 5000))
  );
  const service = new WeatherService();
  await expect(service.getWeather('Stockholm')).rejects.toThrow('Request timed out');
});
