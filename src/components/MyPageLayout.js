import React from "react";
import CustomSkeleton from "./CustomSkeleton";
import NoDataCard from "./NoDataCard";

const MyPageLayout = ({
  isLoading,
  children,
  data,
  showSkeleton = false,
  noPageTitle,
  noPageButtonTitle,
  noPageButton,
}) => {
  return (
    <>
      {isLoading && showSkeleton ? (
        <CustomSkeleton />
      ) : data?.length > 0 ? (
        children
      ) : (
        <NoDataCard
          title={noPageTitle}
          onAdd={noPageButton}
          buttonTitle={noPageButtonTitle}
        />
      )}
    </>
  );
};

export default MyPageLayout;
