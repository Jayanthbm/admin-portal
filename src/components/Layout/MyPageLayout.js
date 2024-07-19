// src/components/MyPageLayout.js

import GridViewIcon from '@mui/icons-material/GridView';
import TableRowsIcon from '@mui/icons-material/TableRows';
import { Box, ToggleButton, ToggleButtonGroup, Tooltip } from '@mui/material';
import React, { useContext } from 'react';

import ViewContext from '../../context/view.context';
import AddButton from '../Button/AddButton';
import NoDataCard from '../Card/NoDataCard';
import CustomSkeleton from './CustomSkeleton';

const ViewSetting = ({ view, setView }) => {
  return (
    <ToggleButtonGroup
      value={view}
      exclusive
      onChange={(e, value) => setView(value)}
      aria-label="view alignment"
    >
      <Tooltip title="Grid View">
        <ToggleButton value="card" aria-label="card layout" size="small">
          <GridViewIcon />
        </ToggleButton>
      </Tooltip>
      <Tooltip title="List View">
        <ToggleButton value="table" aria-label="table layout" size="small">
          <TableRowsIcon />
        </ToggleButton>
      </Tooltip>
    </ToggleButtonGroup>
  );
};
const MyPageLayout = ({
  isLoading,
  children,
  showNoDataCard = true,
  data,
  showSkeleton = false,
  noPageTitle,
  noPageButtonTitle,
  noPageButton,
  addButton,
  addButtonTitle,
  addButtonDisabled,
  showViewSetting,
}) => {
  const { view, setView } = useContext(ViewContext);
  return (
    <>
      {isLoading && showSkeleton && <CustomSkeleton />}
      <>
        {showNoDataCard && data?.length === 0 && !isLoading ? (
          <NoDataCard
            title={noPageTitle}
            onAdd={noPageButton}
            buttonTitle={noPageButtonTitle}
          />
        ) : (
          <>
            {!isLoading && (
              <>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mt: 2,
                    mb: 5,
                  }}
                >
                  {showViewSetting ? (
                    <ViewSetting view={view} setView={setView} />
                  ) : (
                    <div></div>
                  )}
                  {addButton && (
                    <AddButton
                      onClick={addButton}
                      title={addButtonTitle}
                      disabled={addButtonDisabled}
                    />
                  )}
                </Box>
                {children}
              </>
            )}
          </>
        )}
      </>
    </>
  );
};

export default MyPageLayout;
