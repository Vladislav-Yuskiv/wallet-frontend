import { success } from '@pnotify/core';

export default function authSuccessNotification(message, userName) {
  return success({
    title: userName && `Greetings, ${userName}`,
    text: `${message}`,
    animation: 'fade',
    delay: 3000
  });
}
