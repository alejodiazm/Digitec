import dns from "dns";
import { promisify } from "util";

const resolveMx = promisify(dns.resolveMx);

export async function validateEmailMx(email: string): Promise<boolean> {
    try {
        const domain = email.split("@")[1];
        if (!domain) return false;

        const addresses = await resolveMx(domain);
        return addresses && addresses.length > 0;
    } catch (error) {
        // If domain has no MX records (or other DNS error), it's invalid for receiving email
        return false;
    }
}
