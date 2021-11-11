import ListItem from "@mui/material/ListItem";
import Collapse from "@mui/material/Collapse";
import React, {useState} from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, {SelectChangeEvent} from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import {Divider} from "@mui/material";
import {IFilterImplProps} from "./Filters";

export default function TimeMonthFilter(props: IFilterImplProps) {
    const [dropDownMonth, setDropDownMonth] = useState(false);

    const handleStartMonthChange = (event: SelectChangeEvent<number>) => {
        const startMonth = event.target.value as number;
        if (startMonth && props.filterState.endMonth >= startMonth)
        {
            updateState("startMonth", startMonth);
            props.touchFilter("startMonth");
            props.touchFilter("endMonth"); // this so that default endMonth is also touched
        }
    }

    const handleEndMonthChange = (event: SelectChangeEvent<number>) => {
        const endMonth = event.target.value as number;
        if (endMonth && props.filterState.startMonth <= endMonth){
            updateState("endMonth", endMonth);
            props.touchFilter("endMonth");
            props.touchFilter("startMonth"); // this so that default startMonth is also touched
        }
    }

    function updateState<KeyStateType>(key: string, newState: KeyStateType) {
        props.setFilterState({...props.filterState, [key]: newState})
    }

    return (
        <div>
            <Divider/>
            <ListItem button key={"Sort by Month"} onClick={() => setDropDownMonth(!dropDownMonth)}>
                <ListItemText primary={"Sort by Month"}/>
                {dropDownMonth ? <ExpandLess/> : <ExpandMore/>}
            </ListItem>
            <Collapse in={dropDownMonth} timeout="auto" unmountOnExit>
            <ListItem key ={"Dropdown Month"} alignItems="center">
                    <FormControl sx={{margin: 2, minWidth: 90}} variant="standard" color="primary">
                        <InputLabel>Start Month</InputLabel>
                        <Select
                            labelId="start-month-select-label"
                            id="start-month-select"
                            value={props.filterState.startMonth}
                            label="Start Month"
                            onChange={handleStartMonthChange}
                        >
                            {months.map(month => (
                                <MenuItem value= {month.value} key={month.name}>
                                {month.name}
                                </MenuItem>
                            ))}
                        </Select>
                        </FormControl>
                        <FormControl sx={{margin: 2, minWidth: 90}} variant="standard" color="primary">
                        <InputLabel>End Month</InputLabel>
                        <Select
                            labelId="end-month-select-label"
                            id="end-month-select"
                            value={props.filterState.endMonth}
                            label="End Month"
                            onChange={handleEndMonthChange}
                            >
                            {months.map(month => (
                                <MenuItem value={month.value} key={month.name}>
                                    {month.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </ListItem>
            </Collapse>
        </div>
    );
}

const months: {
    name: string;
    value: number;
}[] = 
[
    {"name":"Jan",
    "value":0},
    {"name":"Feb",
    "value":1},
    {"name":"Mar",
    "value":2},
    {"name":"Apr",
    "value":3},
    {"name":"May",
    "value":4},
    {"name":"Jun",
    "value":5},
    {"name":"Jul",
    "value":6},
    {"name":"Aug",
    "value":7},
    {"name":"Sep",
    "value":8},
    {"name":"Oct",
    "value":9},
    {"name":"Nov",
    "value":10},
    {"name":"Dec",
    "value":11}
]