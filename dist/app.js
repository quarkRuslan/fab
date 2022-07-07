"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const bot_handler_1 = require("./telegram-bot/bot-handler");
const http_request_1 = require("./core/http-request");
const token = process.env.TELEGRAF_TOKEN;
const httpRequest = new http_request_1.HttpRequest(axios_1.default);
const bot = new bot_handler_1.BotHandler(token, httpRequest);
bot.bootstrap();
