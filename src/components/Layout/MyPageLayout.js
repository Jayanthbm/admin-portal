// src/components/MyPageLayout.js

import GridViewIcon from '@mui/icons-material/GridView';
import TableRowsIcon from '@mui/icons-material/TableRows';
import { Box, ToggleButton, ToggleButtonGroup, Tooltip } from '@mui/material';
import React from 'react';

import useView from '../../hooks/useView';
import AddButton from '../Button/AddButton';
import NoDataCard from '../Card/NoDataCard';
import CustomSkeleton from './CustomSkeleton';

const ViewSetting = ({ view, setView, showViewSetting }) => {
  return showViewSetting ? (
    <>
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
    </>
  ) : (
    <div></div>
  );
};

const ShowAddButton = ({ addButton, addButtonTitle, addButtonDisabled }) => {
  return (
    addButton && (
      <AddButton
        onClick={addButton}
        title={addButtonTitle}
        disabled={addButtonDisabled}
      />
    )
  );
};

const ShowNoDataCard = ({
  showNoDataCard,
  data,
  noPageTitle,
  noPageButton,
  noPageButtonTitle,
}) => {
  return (
    showNoDataCard &&
    data?.length === 0 && (
      <NoDataCard
        title={noPageTitle}
        onAdd={noPageButton}
        buttonTitle={noPageButtonTitle}
      />
    )
  );
};

const ShowSkeleton = ({ showSkeleton }) => {
  return showSkeleton && <CustomSkeleton />;
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
  const { view, setView } = useView();
  return (
    <>
      {isLoading ? (
        <ShowSkeleton showSkeleton={showSkeleton} />
      ) : (
        <>
          <ShowNoDataCard
            showNoDataCard={showNoDataCard}
            data={data}
            noPageTitle={noPageTitle}
            noPageButton={noPageButton}
            noPageButtonTitle={noPageButtonTitle}
          />
          {data && data.length > 0 && (
            <>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  mt: 2,
                  mb: 5,
                }}
              >
                <ViewSetting
                  view={view}
                  setView={setView}
                  showViewSetting={showViewSetting}
                />
                <ShowAddButton
                  addButton={addButton}
                  addButtonTitle={addButtonTitle}
                  addButtonDisabled={addButtonDisabled}
                />
              </Box>
              {children}
            </>
          )}
        </>
      )}
    </>
  );
};

export default MyPageLayout;
