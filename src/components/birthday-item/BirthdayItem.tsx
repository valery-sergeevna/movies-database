import { FC, memo } from "react";
import { ListItem, ListItemText } from "@mui/material";
import { BirthdayItemProps } from "../../core/types";
import styles from "./birthday-item.module.css";
const BirthdayItem: FC<BirthdayItemProps> = ({ birth }) => {
    const { year, text, pages } = birth || {};
    return (
        <ListItem className={styles.item}>
            <ListItemText
                primary={`${year}: ${text}`}
                secondary={
                    pages.length > 0
                        ? pages.map((page, idx) => {
                              const { title, timestamp } = page || {};
                              return (
                                  <span key={idx} className={styles.itemPage}>
                                      <span className={styles.itemTitle}>
                                          {title}
                                      </span>{" "}
                                      ({new Date(timestamp).toLocaleString()})
                                  </span>
                              );
                          })
                        : "No pages available"
                }
            />
        </ListItem>
    );
};

const _BirthdayItem = memo(BirthdayItem);

export { _BirthdayItem as BirthdayItem };
