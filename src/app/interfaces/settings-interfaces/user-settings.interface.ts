import { Alarm } from './alarm.interface';
import { DataCollection } from './data-collection.interface';
import { Report } from './report.interface';

export interface UserSettings {
    userEmailAddress: string,
    alarms: Alarm[],
    dataCollectionParams: DataCollection,
    reportParams: Report
} 