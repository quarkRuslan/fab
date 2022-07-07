"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bot_handler_1 = require("./telegram-bot/bot-handler");
const http_request_1 = require("./core/http-request");
const axios_1 = __importDefault(require("axios"));
const express_1 = __importDefault(require("express"));
const token = '5454746683:AAF0d3Jy_KSvD-9T698EroO7YV-hS8_88hY';
const expressApp = (0, express_1.default)();
const port = process.env.PORT || 3000;
expressApp.get('/', (req, res) => {
    res.send('Hello World!');
});
expressApp.listen(port, () => {
    console.log(`<<< --- Application is started and listening on port ${port} --->>>`);
});
const httpRequest = new http_request_1.HttpRequest(axios_1.default);
const bot = new bot_handler_1.BotHandler(token, httpRequest);
bot.bootstrap();
