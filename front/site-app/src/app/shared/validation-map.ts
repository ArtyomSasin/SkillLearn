export function getMessageByError(error: string | null): string | null {
    if (error) {
        return messages.has(error) ? messages.get(error) ?? '' : null;
    }
    return null;
}

export function getControlByError(error: string | null): string | null {
    if (error) {
        return controls.has(error) ? controls.get(error) ?? '' : null;
    }
    return null;
}



const messages = new Map([
    ['auth/email-already-in-use', 'Пользователь с таким email уже существует'],
]);

const controls = new Map([
    ['auth/email-already-in-use', 'email'],
]);
