import { memo } from "react";
import { BirthdayList } from "../components";

const HomePage = () => {
    return <BirthdayList />;
};

const _HomePage = memo(HomePage);

export { _HomePage as HomePage };
