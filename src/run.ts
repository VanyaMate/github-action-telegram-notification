import { getInput, setOutput, setFailed, debug } from '@actions/core';
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
        const repository: string = context.payload.repository?.full_name ?? '';
        const branch: string     = context.workflow;
        const commit: string     = context.sha;

        debug('success ' + success.toString());
        debug('date ' + date.toString());
        debug('author ' + author.toString());
        debug('repository ' + repository.toString());
        debug('branch ' + branch.toString());
        debug('commit ' + commit.toString());

        console.log('success ' + success.toString());
        console.log('date ' + date.toString());
        console.log('author ' + author.toString());
        console.log('repository ' + repository.toString());
        console.log('branch ' + branch.toString());
        console.log('commit ' + commit.toString());

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
        const message: string                     = messageGenerator.generate({
            success: success === 'success', date, author, commit, branch, repository,
        }) ?? 'Empty message';

        debug('message ' + message);
        console.log('message ' + message);

        await notification.notify(tgChatId, message);

        setOutput('Notified', true);
    } catch (error) {
        if (error instanceof Error) setFailed(error.message);
    }
}