import { DateString } from "@/types";
import { format, parse } from "date-fns";


export const formatDateString = (dateString: DateString): string => {
    // Parse with format "yyyyMMdd"
    const parsedDate = parse(dateString, "yyyyMMdd", new Date());

    // Format to "dd-MM-yyyy"
    const formatted = format(parsedDate, "dd/MM/yyyy");

    return formatted;
};