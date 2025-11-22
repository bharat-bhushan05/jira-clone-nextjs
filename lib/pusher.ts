import Pusher from 'pusher'

export const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID || '',
  key: process.env.PUSHER_KEY || '',
  secret: process.env.PUSHER_SECRET || '',
  cluster: process.env.PUSHER_CLUSTER || '',
  useTLS: true,
})

export function trigger(channel: string, event: string, payload: any) {
  try {
    return pusher.trigger(channel, event, payload)
  } catch (e) {
    console.error('Pusher trigger error', e)
  }
}
