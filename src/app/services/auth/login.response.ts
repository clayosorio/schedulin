export interface LoginResponse{
    success: boolean;
    token: string;
    tokenRefresh?: string;
    message: string;
}
