import { useMemo } from 'react';

//MRT Imports
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
  MRT_GlobalFilterTextField,
  MRT_ToggleFiltersButton,
} from 'material-react-table';

//Material UI Imports
import {
  Box,
  Button,
  ListItemIcon,
  MenuItem,
  Typography,
  lighten,
} from '@mui/material';

//Icons Imports
import { AccountCircle, Send, Clear, Edit} from '@mui/icons-material';

//Mock Data
import { data } from './makeData2';

// export type Employee = {
//   firstName: string;
//   lastName: string;
//   email: string;
//   jobTitle: string;
//   salary: number;
//   startDate: string;
//   signatureCatchPhrase: string;
//   avatar: string;
// };

export type Employee = {
    firstName: string;
    lastName: string;
    email: string;
    jobTitle: string;
    startDate: string;
    relevantCourses: string[];
    coursesTaken: string[];
  };

const Example = () => {
const columns = useMemo<MRT_ColumnDef<Employee>[]>(
    () => [
        {
            id: 'employee', //id used to define `group` column
            header: 'Employee',
            columns: [
                {
                    accessorFn: (row) => `${row.firstName} ${row.lastName}`, //accessorFn used to join multiple data into a single cell
                    id: 'name', //id is still required when using accessorFn instead of accessorKey
                    header: 'Name',
                    size: 150,
                    Cell: ({ renderedCellValue, row }) => (
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                            }}
                        >
                            {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
                            <span>{renderedCellValue}</span>
                        </Box>
                    ),
                },
                // {
                //     accessorKey: 'email', //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
                //     enableClickToCopy: true,
                //     filterVariant: 'autocomplete',
                //     header: 'Email',
                //     size: 300,
                // },
            ],
        },
        // {
        //     id: 'id',
        //     header: 'Job Info',
        //     columns: [
        //         {
        //             accessorKey: 'jobTitle', //hey a simple column for once
        //             header: 'Job Title',
        //             size: 350,
        //         },
        //         {
        //             accessorFn: (row) => new Date(row.startDate), //convert to Date for sorting and filtering
        //             id: 'startDate',
        //             header: 'Start Date',
        //             filterVariant: 'date',
        //             filterFn: 'lessThan',
        //             sortingFn: 'datetime',
        //             Cell: ({ cell }) => cell.getValue<Date>()?.toLocaleDateString(), //render Date as a string
        //             Header: ({ column }) => <em>{column.columnDef.header}</em>, //custom header markup
        //             muiFilterTextFieldProps: {
        //                 sx: {
        //                     minWidth: '250px',
        //                 },
        //             },
        //         },
        //     ],
        // },
        {
            id: 'courses',
            header: 'Courses',
            columns: [
                {
                    accessorKey: 'relevantCourses', //hey a simple column for once
                    header: 'Relevant Courses',
                    size: 200,
                    filterFn: 'contains',
                    Cell: ({ cell }) => cell.getValue<string[]>().map(course => <div>{course}</div>),
                },
                {
                    accessorKey: 'coursesTaken', //hey a simple column for once
                    header: 'Courses Taken',
                    size: 200,
                    filterFn: 'contains',
                    Cell: ({ cell }) => cell.getValue<string[]>().map(course => <div>{course}</div>),
                },
            ],
        },
    ],
    [],
);

  const table = useMaterialReactTable({
    columns,
    data, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    enableColumnFilterModes: true,
    enableColumnOrdering: true,
    enableGrouping: true,
    enableColumnPinning: true,
    enableFacetedValues: true,
    enableRowActions: false,
    enableRowSelection: true,
    initialState: {
      showColumnFilters: true,
      showGlobalFilter: false,
      columnPinning: {
        left: ['mrt-row-select'],
        right: ['mrt-row-actions'],
      },
    },
    paginationDisplayMode: 'pages',
    positionToolbarAlertBanner: 'top',
    // muiSearchTextFieldProps: {
    //   size: 'small',
    //   variant: 'outlined',
    // },
    muiPaginationProps: {
      color: 'secondary',
      rowsPerPageOptions: [15, 30, 50],
      shape: 'rounded',
      variant: 'outlined',
    },
    // renderDetailPanel: ({ row }) => (
    //   <Box
    //     sx={{
    //       alignItems: 'center',
    //       display: 'flex',
    //       justifyContent: 'space-around',
    //       left: '30px',
    //       maxWidth: '1000px',
    //       position: 'sticky',
    //       width: '100%',
    //     }}
    //   >
    //     {/* <img
    //       alt="avatar"
    //       height={200}
    //       src={row.original.avatar}
    //       loading="lazy"
    //       style={{ borderRadius: '50%' }}
    //     />
    //     <Box sx={{ textAlign: 'center' }}>
    //       <Typography variant="h4">Signature Catch Phrase:</Typography>
    //       <Typography variant="h1">
    //         &quot;{row.original.signatureCatchPhrase}&quot;
    //       </Typography>
    //     </Box> */}
    //   </Box>
    // ),
    // renderRowActionMenuItems: ({ closeMenu }) => [
    //   <MenuItem
    //     key={0}
    //     onClick={() => {
    //       // View profile logic...
    //       closeMenu();
    //     }}
    //     sx={{ m: 0 }}
    //   >
    //     <ListItemIcon>
    //       <Edit />
    //     </ListItemIcon>
    //     Edit Employee
    //   </MenuItem>,
    //   <MenuItem
    //     key={1}
    //     onClick={() => {
    //       // Send email logic...
    //       closeMenu();
    //     }}
    //     sx={{ m: 0 }}
    //   >
    //     <ListItemIcon>
    //       <Clear />
    //     </ListItemIcon>
    //     POP!
    //   </MenuItem>,
    // ],
    // renderTopToolbar: ({ table }) => {
    //   const handleDeactivate = () => {
    //     table.getSelectedRowModel().flatRows.map((row) => {
    //       alert('deactivating ' + row.getValue('name'));
    //     });
    //   };

    //   const handleActivate = () => {
    //     table.getSelectedRowModel().flatRows.map((row) => {
    //       alert('activating ' + row.getValue('name'));
    //     });
    //   };

    //   const handleContact = () => {
    //     table.getSelectedRowModel().flatRows.map((row) => {
    //       alert('contact ' + row.getValue('name'));
    //     });
    //   };

    //   return (
    //     <Box
    //       sx={(theme) => ({
    //         backgroundColor: lighten(theme.palette.background.default, 0.05),
    //         display: 'flex',
    //         gap: '0.5rem',
    //         p: '8px',
    //         justifyContent: 'space-between',
    //       })}
    //     >
    //       <Box sx={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
    //         {/* import MRT sub-components */}
    //         <MRT_GlobalFilterTextField table={table} />
    //         <MRT_ToggleFiltersButton table={table} />
    //       </Box>
    //       <Box>
    //         <Box sx={{ display: 'flex', gap: '0.5rem' }}>
    //           <Button
    //             color="error"
    //             disabled={!table.getIsSomeRowsSelected()}
    //             onClick={handleDeactivate}
    //             variant="contained"
    //           >
    //             Deactivate
    //           </Button>
    //           <Button
    //             color="success"
    //             disabled={!table.getIsSomeRowsSelected()}
    //             onClick={handleActivate}
    //             variant="contained"
    //           >
    //             Activate
    //           </Button>
    //           <Button
    //             color="info"
    //             disabled={!table.getIsSomeRowsSelected()}
    //             onClick={handleContact}
    //             variant="contained"
    //           >
    //             Contact
    //           </Button>
    //         </Box>
    //       </Box>
    //     </Box>
    //   );
    // },
  });

  return <MaterialReactTable table={table} />;
};

//Date Picker Imports - these should just be in your Context Provider
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const ExampleWithLocalizationProvider = () => (
  //App.tsx or AppProviders file
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <Example />
  </LocalizationProvider>
);

export default ExampleWithLocalizationProvider;
