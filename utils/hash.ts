import * as crypto from 'crypto';

export const hashPwd = (p: string): string => {
    const hmac = crypto.createHmac(
        'sha512',
        'OIUAEHOHDSF)*@#$FjHDfkiHF(#$W@fuh0h88FhgdS)fSHUDF90 HFDS9SUDF ihDF0U*HSDF ',
    );
    hmac.update(p);
    return hmac.digest('hex');
};