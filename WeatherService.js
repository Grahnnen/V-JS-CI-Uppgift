/* eslint-env node */
class WeatherService {
  async getWeather(city) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3000);

    try {
      const response = await fetch(
        `https://api.example.com/weather?city=${encodeURIComponent(city)}`,
        { signal: controller.signal }
      );
      clearTimeout(timeout);
      if (!response.ok) throw new Error('API error');
      return await response.json();
    } catch (err) {
      if (err.name === 'AbortError') throw new Error('Request timed out');
      throw err;
    }
  }
}

module.exports = WeatherService;
