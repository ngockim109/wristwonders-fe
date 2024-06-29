import dayjs from "dayjs";

export const formatDateTime = (
  dateTimeString: string,
  formatString = "DD-MM-YYYY HH:mm:ss",
) => {
  try {
    const formattedDate = dayjs(dateTimeString).format(formatString);
    return formattedDate;
  } catch (error) {
    console.error("Error formatting date:", error);
    return "";
  }
};
export const formatDate = (
  dateTimeString: string,
  formatString = "DD-MM-YYYY",
) => {
  try {
    const formattedDate = dayjs(dateTimeString).format(formatString);
    return formattedDate;
  } catch (error) {
    console.error("Error formatting date:", error);
    return "";
  }
};
