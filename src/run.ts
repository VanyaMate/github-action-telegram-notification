import { getInput, setOutput, setFailed, debug, isDebug } from '@actions/core';
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
        const author: string     = context.payload.commits[0].author.username;
        const repository: string = context.payload.repository?.full_name ?? '';
        const branch: string     = context.ref;
        const commitId: string   = context.sha;
        const action: string     = context.runId.toString();


        debug(JSON.stringify(context));
        debug('success ' + success.toString());
        debug('date ' + date.toString());
        debug('author ' + author.toString());
        debug('repository ' + repository.toString());
        debug('branch ' + branch.toString());
        debug('commitId ' + commitId.toString());
        debug('action ' + action);

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
                success         : success === 'success',
                date,
                commiterUserName: author,
                commitId        : commitId,
                branch,
                repositoryOwner : context.payload['repository'].owner.login,
                repositoryName  : context.payload['repository'].name,
                repositoryUrl   : context.payload['repository'].html_url,
                actionId        : action,
                compareUrl      : context.payload.compare,
                size            : 0,
                commitTitle     : context.payload.commits[0].message,
            }) ??
            'Empty message';

        debug('message ' + message);

        await notification.notify(tgChatId, message);

        setOutput('Notified', true);
    } catch (error) {
        if (error instanceof Error) setFailed(error.message);
    }
}