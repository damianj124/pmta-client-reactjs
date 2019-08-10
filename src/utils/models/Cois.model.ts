export interface UploadedCois {
    id: number;
    image: string;
    file: string;
    processed_count: {
        cois_count: boolean;
        successed_cois_count:boolean;
    };
    status: 'pending' | 'success';
}
