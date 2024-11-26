export interface BirthdayItemType {
    text: string;
    year: number;
    pages: { title: string; timestamp: string }[];
}

export interface BirthdayItemProps {
    birth: BirthdayItemType;
}

export interface BirthdayState {
    data: BirthdayItemType[];
    totalPages: number;
    currentPage: number;
    loading: boolean;
    error: string | null;
}

export interface ErrorModalProps {
    error: string | null;
    open: boolean;
    onRetry: () => void;
    onCancel: () => void;
}
