export type ApiResponse<T = unknown> = {
    status: boolean;
    statusCode: number;
    message: string;
    data?: T | null;
}