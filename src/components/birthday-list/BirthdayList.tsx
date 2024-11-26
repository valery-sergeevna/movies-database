import React, { memo, useEffect, useState } from "react";
import { Box, Button, CircularProgress, Pagination } from "@mui/material";
import { connect } from "react-redux";
import {
    fetchBirthsData,
    selectBirthdays,
    selectCurrentPage,
    selectError,
    selectLoading,
    selectTotalPages,
    setCurrentPage,
} from "../../core/slices";
import { BirthdayItemType } from "../../core/types";
import styles from "./birthday-list.module.css";
import { BirthdayItem } from "../birthday-item";
import { RootState } from "../../core/store";
import { ErrorModal } from "../error-modal";

interface BirthdayListProps {
    data: BirthdayItemType[];
    loading: boolean;
    error: string | null;
    currentPage: number;
    totalPages: number;
    fetchBirthsData: (currentPage: number) => void;
    setCurrentPage: (page: number) => void;
}

const BirthdayList: React.FC<BirthdayListProps> = ({
    data,
    loading,
    error,
    currentPage,
    totalPages,
    fetchBirthsData,
    setCurrentPage,
}) => {
    const [openErrorModal, setOpenErrorModal] = useState(false);
    const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page);
    };
    const handleRetry = () => {
        fetchBirthsData(currentPage);
        setOpenErrorModal(false);
    };
    const handleCancel = () => {
        setOpenErrorModal(false);
    };
    useEffect(() => {
        if (error) {
            setOpenErrorModal(true);
        }
    }, [error]);
    return (
        <div data-testid='birthday-list'>
            <ErrorModal
                error={error}
                open={openErrorModal}
                onRetry={handleRetry}
                onCancel={handleCancel}
            />
            <Box className={styles.container}>
                <Button
                    variant='contained'
                    color='primary'
                    className={styles.button}
                    onClick={() => fetchBirthsData(currentPage)}
                    disabled={loading}
                >
                    {loading ? (
                        <CircularProgress size={24} color='inherit' />
                    ) : (
                        "Load Birthdays"
                    )}
                </Button>
                {data && data.length > 0 && (
                    <Box>
                        {data
                            .slice((currentPage - 1) * 10, currentPage * 10)
                            .map((birth, index) => (
                                <BirthdayItem key={index} birth={birth} />
                            ))}
                        <Box className={styles.pagination}>
                            <Pagination
                                count={totalPages}
                                page={currentPage}
                                onChange={handlePageChange}
                                color='primary'
                                variant='outlined'
                                shape='rounded'
                            />
                        </Box>
                    </Box>
                )}
            </Box>
        </div>
    );
};

const mapStateToProps = (state: RootState) => ({
    data: selectBirthdays(state),
    loading: selectLoading(state),
    error: selectError(state),
    currentPage: selectCurrentPage(state),
    totalPages: selectTotalPages(state),
});

const mapDispatchToProps = {
    fetchBirthsData,
    setCurrentPage,
};

const _BirthdayList = memo(
    connect(mapStateToProps, mapDispatchToProps)(BirthdayList),
);

export { _BirthdayList as BirthdayList };
