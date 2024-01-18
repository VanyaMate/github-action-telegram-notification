"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TelegramNotification = void 0;
var request = require("request");
var TelegramNotification = /** @class */ (function () {
    function TelegramNotification(_botId) {
        this._botId = _botId;
    }
    TelegramNotification.prototype.notify = function (chatId, text) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            request.post(_this._getSendNotificationUrl(_this._botId), {
                body: {
                    chat_id: chatId,
                    text: text,
                    parse_mode: 'Markdown',
                },
                json: true,
            }, function (error, response, body) {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(true);
                }
            });
        });
    };
    TelegramNotification.prototype._getSendNotificationUrl = function (botId) {
        return "https://api.telegram.org/bot".concat(botId, "/sendMessage");
    };
    return TelegramNotification;
}());
exports.TelegramNotification = TelegramNotification;
