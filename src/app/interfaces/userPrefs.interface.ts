export interface userPrefs {
    email: string,
    reportFrequency: string, //TODO {'monthly', 'weekly'... etc.} 
    timeIntervals: string,
    alarms: string //TODO, how to manage each alarm separately , add new alarms, delete alarms?
} 