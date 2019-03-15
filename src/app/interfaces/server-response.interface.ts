import { UserSettings } from './settings-interfaces/user-settings.interface';

export interface ServerResponse {
    message: string,
    data?: UserSettings | any
}