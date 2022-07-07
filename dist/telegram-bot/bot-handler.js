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
exports.BotHandler = void 0;
const telegraf_1 = require("telegraf");
const bot_handler_contants_1 = require("./bot-handler.contants");
const weather_api_1 = require("../weather-api");
class BotHandler {
    constructor(token, httpRequest) {
        this.bot = new telegraf_1.Telegraf(token);
        this.httpRequest = httpRequest;
    }
    startMessage(bot, menu) {
        bot.command('start', (ctx) => {
            ctx.telegram.sendMessage(ctx.message.chat.id, `Здрастуйте!`, menu);
        });
    }
    initMessagesHandler(bot, httpRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            bot.use((ctx, next) => {
                const { from, date } = ctx.message;
                const text = ctx.message.text || ' system notificaion ';
                console.log(`${(0, bot_handler_contants_1.formatDate)(new Date(date * 1000))}  From user: ${from.first_name}. Message: ${text}`);
                next();
            });
            bot.hears(bot_handler_contants_1.MenuActions.listen, (ctx) => {
                ctx.telegram.sendMessage(ctx.message.chat.id, (0, bot_handler_contants_1.getMusicItems)());
            });
            bot.hears(bot_handler_contants_1.MenuActions.whenFootball, (ctx) => {
                ctx.telegram.sendMessage(ctx.message.chat.id, bot_handler_contants_1.whenFootball);
            });
            bot.hears(bot_handler_contants_1.MenuActions.missedChildren, (ctx) => {
                ctx.telegram.sendPhoto(ctx.message.chat.id, { source: (0, bot_handler_contants_1.getPicturesItems)() });
            });
            bot.hears(bot_handler_contants_1.MenuActions.doTrainings, (ctx) => {
                ctx.telegram.sendMessage(ctx.message.chat.id, 'Ще не забалобенив! Скоро додам сюда щось :) ');
            });
            bot.hears(bot_handler_contants_1.MenuActions.motherSong, (ctx) => {
                ctx.telegram.sendMessage(ctx.message.chat.id, bot_handler_contants_1.motherSongURL);
            });
            bot.hears(bot_handler_contants_1.MenuActions.howAreYou, (ctx) => {
                ctx.telegram.sendMessage(ctx.message.chat.id, bot_handler_contants_1.howAreUAnswer);
            });
            bot.hears(bot_handler_contants_1.MenuActions.weatherTomorrow, (ctx) => __awaiter(this, void 0, void 0, function* () {
                const weatherApi = new weather_api_1.WeatherApi(httpRequest);
                const forecast = yield weatherApi.getForecast();
                ctx.telegram.sendMessage(ctx.message.chat.id, forecast);
            }));
            bot.hears(bot_handler_contants_1.MenuActions.whenFootballToday, (ctx) => {
                ctx.telegram.sendMessage(ctx.message.chat.id, bot_handler_contants_1.whenFootballToday);
            });
        });
    }
    initHandlers() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.initMessagesHandler(this.bot, this.httpRequest);
        });
    }
    bootstrap() {
        return __awaiter(this, void 0, void 0, function* () {
            this.startMessage(this.bot, bot_handler_contants_1.menu);
            yield this.initHandlers();
            yield this.bot.launch();
        });
    }
}
exports.BotHandler = BotHandler;
