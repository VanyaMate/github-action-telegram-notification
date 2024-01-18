import { getInput, setOutput, setFailed } from '@actions/core';
import { context } from '@actions/github';
import {
    SUCCESS,
    TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID,
} from './constants/inputs';
import { INotificator } from './notificator/notificator.interface';
import {
    TelegramNotification,
} from './notificator/implementations/telegram-notification';
import { IMessageGenerator } from './message-generator/message-generator.interface';
import {
    SimpleMessageGenerator,
} from './message-generator/implementations/simple-message-generator';


export async function run (): Promise<void> {
    try {
        // Data
        const success: string    = getInput(SUCCESS, { required: true });
        const date: string       = new Date().toLocaleString();
        const author: string     = context.actor;
        const repository: string = context.payload.repository.full_name;
        const branch: string     = context.workflow;
        const commit: string     = context.sha;

        // TG Data
        const tgBotToken: string = getInput(TELEGRAM_BOT_TOKEN, { required: true });
        const tgChatId: string   = getInput(TELEGRAM_CHAT_ID, { required: true });

        if (!tgBotToken) {
            throw 'Telegram bot token not installed';
        }

        if (!tgChatId) {
            throw 'Telegram chat id not installed';
        }

        const notification: INotificator          = new TelegramNotification(tgBotToken);
        const messageGenerator: IMessageGenerator = new SimpleMessageGenerator();

        await notification.notify(tgChatId, messageGenerator.generate({
            success: success === 'success', date, author, commit, branch, repository,
        }));

        setOutput('Notified', true);
    } catch (error) {
        if (error instanceof Error) setFailed(error.message);
    }
}