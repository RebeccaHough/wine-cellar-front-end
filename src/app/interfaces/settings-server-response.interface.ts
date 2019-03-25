import { UserSettings } from './settings-interfaces/user-settings.interface';

export interface SettingsServerResponse {
    message: string,
    data?: UserSettings
}