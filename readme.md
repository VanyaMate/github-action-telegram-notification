# VM Telegram notificator

Simple github-action for notification in telegram

## Inputs

### `success`

**Required** Action status. Default `error`

### `tg_bot_token`

**Required** Telegram bot auth-token

### `tg_chat_id`

**Required** Telegram chat id

## Outputs

### `Notified`

Notified status

## Example usage

```yaml
  - uses: VanyaMate/github-action-telegram-notification@v0
    with:
      success: ${{ job.status }}
      tg_bot_token: ${{ secrets.TG_TOKEN_BOT }}
      tg_chat_id: ${{ secrets.TG_CHAT_ID }}
```