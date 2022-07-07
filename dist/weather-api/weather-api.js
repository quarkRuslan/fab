"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeatherApi = void 0;
const weather_api_constants_1 = require("./weather-api.constants");
class WeatherApi {
    constructor(httpRequest) {
        this.httpRequest = httpRequest;
    }
    getForecast() {
        return __awaiter(this, void 0, void 0, function* () {
            const weatherForecast = yield this.requestForecast();
            const forecast = weatherForecast.data.forecast.forecastday[0];
            const message = this.getForecastMessage(this.getForecastDetails(forecast));
            return message;
        });
    }
    requestForecast() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.httpRequest.get(weather_api_constants_1.weatherAPI);
        });
    }
    getWindIcon(maxWindMeterPerSecond) {
        const speed = maxWindMeterPerSecond.toFixed(2);
        return maxWindMeterPerSecond >= 5 ? speed : `${speed} ${weather_api_constants_1.windIcons.hardWind}`;
    }
    getWeatherIconByChance(chance) {
        switch (true) {
            case (chance > 90): return weather_api_constants_1.weatherIcons.hardRaining;
            case (chance <= 90 && chance > 65): return weather_api_constants_1.weatherIcons.rain;
            case (chance <= 65 && chance > 50): return weather_api_constants_1.weatherIcons.cloudy;
            default:
                return weather_api_constants_1.weatherIcons.sunny;
        }
    }
    getFormattedDateByDelimiter(date, delimiter) {
        const dateItems = date.split('-').reverse();
        return dateItems.join(delimiter);
    }
    getForecastMessage(forecastDetails) {
        const { date, chanceOfRain, minTemp, maxTemp, maxWindMeterPerSecond } = forecastDetails;
        const messageList = [
            `Погода на ${this.getFormattedDateByDelimiter(date, '.')}`,
            `Температура: ${minTemp}°C – ${maxTemp}°C`,
            `${this.getWeatherIconByChance(chanceOfRain)}`,
            `Швидкість вітру: ${this.getWindIcon(maxWindMeterPerSecond)} м/c`
        ];
        return messageList.join('\n');
    }
    getForecastDetails(forecast) {
        const dayForecast = forecast.day;
        const { date } = forecast;
        const { mintemp_c, maxtemp_c, maxwind_kph } = dayForecast;
        const maxWindMeterPerSecond = (maxwind_kph * 1000) / 3600;
        const chanceOfRain = dayForecast.daily_chance_of_rain;
        return {
            date,
            minTemp: mintemp_c,
            maxTemp: maxtemp_c,
            chanceOfRain,
            maxWindMeterPerSecond
        };
    }
}
exports.WeatherApi = WeatherApi;
