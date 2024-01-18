import { INotificator } from '../notificator.interface';
import * as request from 'request';


export class TelegramNotification implements INotificator {
    constructor (private readonly _botId: string) {
    }

    notify (chatId: string | number, text: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            request.post(this._getSendNotificationUrl(this._botId), {
                body: {
                    chat_id: chatId,
                    text   : text,
                },
                json: true,
            }, (error, response, body) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(true);
                }
            });
        });
    }

    private _getSendNotificationUrl (botId: string): string {
        return `https://api.telegram.org/bot${ botId }/sendMessage`;
    }
}