export type ApiResponse<T = any> = {
    status: boolean;
    statusCode: number;
    message: string;
    data?: T | null;
}