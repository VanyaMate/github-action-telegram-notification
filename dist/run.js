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
exports.run = void 0;
const core_1 = require("@actions/core");
const github_1 = require("@actions/github");
const inputs_1 = require("./constants/inputs");
const telegram_notification_1 = require("./notificator/implementations/telegram-notification");
const simple_message_generator_1 = require("./message-generator/implementations/simple-message-generator");
function run() {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Data
            const success = (0, core_1.getInput)(inputs_1.SUCCESS, { required: true });
            const date = new Date().toLocaleString();
            const author = github_1.context.actor;
            const repository = (_b = (_a = github_1.context.payload.repository) === null || _a === void 0 ? void 0 : _a.full_name) !== null && _b !== void 0 ? _b : '';
            const branch = github_1.context.workflow;
            const commit = github_1.context.sha;
            // TG Data
            const tgBotToken = (0, core_1.getInput)(inputs_1.TELEGRAM_BOT_TOKEN, { required: true });
            const tgChatId = (0, core_1.getInput)(inputs_1.TELEGRAM_CHAT_ID, { required: true });
            if (!tgBotToken) {
                throw 'Telegram bot token not installed';
            }
            if (!tgChatId) {
                throw 'Telegram chat id not installed';
            }
            const notification = new telegram_notification_1.TelegramNotification(tgBotToken);
            const messageGenerator = new simple_message_generator_1.SimpleMessageGenerator();
            yield notification.notify(tgChatId, messageGenerator.generate({
                success: success === 'success', date, author, commit, branch, repository,
            }));
            (0, core_1.setOutput)('Notified', true);
        }
        catch (error) {
            if (error instanceof Error)
                (0, core_1.setFailed)(error.message);
        }
    });
}
exports.run = run;
