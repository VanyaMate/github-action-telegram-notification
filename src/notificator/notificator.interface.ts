export interface INotificator {
    notify (chatId: number | string, text: string): Promise<boolean>;
}