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

test('getWeather throws on fetch error (not AbortError)', async () => {
  jest.spyOn(global, 'fetch').mockImplementation(() => {
    throw new Error('Network error');
  });
  const service = new WeatherService();
  await expect(service.getWeather('Stockholm')).rejects.toThrow('Network error');
});

test('getWeather throws if response.json() throws', async () => {
  jest.spyOn(global, 'fetch').mockResolvedValue({
    ok: true,
    json: async () => { throw new Error('JSON parse error'); }
  });
  const service = new WeatherService();
  await expect(service.getWeather('Stockholm')).rejects.toThrow('JSON parse error');
});

test('getWeather encodes city parameter', async () => {
  const fetchMock = jest.spyOn(global, 'fetch').mockResolvedValue({
    ok: true,
    json: async () => ({ temperature: 10, condition: 'Cloudy' }),
  });
  const service = new WeatherService();
  await service.getWeather('Göteborg');
  expect(fetchMock).toHaveBeenCalledWith(
    expect.stringContaining('city=G%C3%B6teborg'),
    expect.any(Object)
  );
});

test('getWeather handles empty city', async () => {
  const fetchMock = jest.spyOn(global, 'fetch').mockResolvedValue({
    ok: true,
    json: async () => ({ temperature: 0, condition: 'Unknown' }),
  });
  const service = new WeatherService();
  await service.getWeather('');
  expect(fetchMock).toHaveBeenCalledWith(
    expect.stringContaining('city='),
    expect.any(Object)
  );
});

test('getWeather handles null city', async () => {
  const fetchMock = jest.spyOn(global, 'fetch').mockResolvedValue({
    ok: true,
    json: async () => ({ temperature: 0, condition: 'Unknown' }),
  });
  const service = new WeatherService();
  await service.getWeather(null);
  expect(fetchMock).toHaveBeenCalledWith(
    expect.stringContaining('city=null'),
    expect.any(Object)
  );
});

test('getWeather handles undefined city', async () => {
  const fetchMock = jest.spyOn(global, 'fetch').mockResolvedValue({
    ok: true,
    json: async () => ({ temperature: 0, condition: 'Unknown' }),
  });
  const service = new WeatherService();
  await service.getWeather(undefined);
  expect(fetchMock).toHaveBeenCalledWith(
    expect.stringContaining('city=undefined'),
    expect.any(Object)
  );
});

test('WeatherService class can be instantiated', () => {
  const service = new WeatherService();
  expect(service).toBeInstanceOf(WeatherService);
});