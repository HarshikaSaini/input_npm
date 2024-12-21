type Listener = (data: any) => void;
declare class CustomEvent {
    private events;
    constructor();
    emit(eventId: string, data?: any): void;
    on(eventId: string, callback: Listener): () => void;
    off(eventId: string, callback: Listener): void;
}
export declare const customEvent: CustomEvent;
export {};
