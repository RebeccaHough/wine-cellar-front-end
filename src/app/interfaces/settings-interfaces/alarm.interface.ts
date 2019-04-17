import { Condition } from "./condition.interface";

export interface Alarm {
    name: string,
    condition: Condition,
    isSubscribedTo: boolean,
    checkFrequency: string
}