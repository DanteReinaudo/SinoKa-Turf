import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import {
    DataGrid
} from '@mui/x-data-grid';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';

function escapeRegExp(value) {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

function QuickSearchToolbar(props) {
    return (
        <Box
            sx={{
                p: 0.5,
                pb: 0,
                justifyContent: 'space-between',
                display: 'flex',
                alignItems: 'flex-start',
                flexWrap: 'wrap',
            }}
        >
            <div>
                <TextField
                    variant="standard"
                    value={props.value}
                    onChange={props.onChange}
                    placeholder={props.buscarPor}
                    InputProps={{
                        startAdornment: <SearchIcon fontSize="small" />,
                        endAdornment: (
                            <IconButton
                                title="Clear"
                                aria-label="Clear"
                                size="small"
                                style={{ visibility: props.value ? 'visible' : 'hidden' }}
                                onClick={props.clearSearch}
                            >
                                <ClearIcon fontSize="small" />
                            </IconButton>
                        ),
                    }}
                    sx={{
                        width: {
                            xs: 1,
                            sm: 'auto',
                        },
                        m: (theme) => theme.spacing(1, 0.5, 1.5),
                        '& .MuiSvgIcon-root': {
                            mr: 0.5,
                        },
                        '& .MuiInput-underline:before': {
                            borderBottom: 1,
                            borderColor: 'divider',
                        },
                    }}
                />
            </div>
        </Box>
    );
}

QuickSearchToolbar.propTypes = {
    clearSearch: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    buscarPor: PropTypes.string
};

export default function QuickFilteringGrid(props) {
    const [searchText, setSearchText] = React.useState('');
    const [rows, setRows] = React.useState(props.data);

    const requestSearch = (searchValue) => {
        setSearchText(searchValue);
        const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');
        const filteredRows = props?.data?.filter((row) => {
            return Object?.keys(row).some((field) => {
                return searchRegex.test(row[field]?.toString());
            });
        });
        setRows(filteredRows);
    };

    React.useEffect(() => {
        setRows(props.data);
    }, [props.data]);

    return (
        <Box sx={{ height: 400, width: 1 }}>
            <DataGrid
                components={{ Toolbar: QuickSearchToolbar }}
                rows={rows}
                columns={props.columns}
                componentsProps={{
                    toolbar: {
                        value: searchText,
                        onChange: (event) => requestSearch(event.target.value),
                        clearSearch: () => requestSearch(''),
                        buscarPor: props.buscarPor
                    },
                }}
                disableColumnMenu={true}
                disableSelectionOnClick={true}
                disableColumnSelector={true}
                hideFooter={true}
                autoHeight={true}
            />
        </Box>
    );
}
