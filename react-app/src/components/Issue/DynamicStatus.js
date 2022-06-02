import { useDispatch, useSelector } from "react-redux";
import { createStatusChange } from "../../store/statusChange";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const DynamicStatus = ({ issue }) => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const stateStatuses = useSelector(state => state.statuses);

    if (!issue) return null;

    // Options for Select component
    let currentStatusId = issue?.current_status?.status_id;
    const currentStatusOptions = {
        value: currentStatusId,
        label: stateStatuses[currentStatusId]?.status,
    };

    let statusOptions = [];
    stateStatuses[currentStatusId]?.next?.forEach(status => {
        let bgColor;
        let bgColorHover;
        let color;
        let colorHover;

        if (status.id % 8 <= 1) {
            // bgColor = "rgb(223, 225, 230)";
            bgColor = "#DFE1E6";
            // bgColorHover = "rgb(192, 199, 207)";
            bgColorHover = "#C0C7CF";
            // color = "rgb(62, 83, 108)";
            color = "#3E536C";
            // colorHover = "rgb(16, 44, 75)";
            colorHover = "#102C4B";
        } else if ((status.id <= 3) && (status.id >= 2)) {
            // bgColor = "rgb(220, 235, 254)";
            bgColor = "#DCEBFE";
            // bgColorHover = "rgb(0, 74, 162)";
            bgColorHover = "#004AA2";
            // color = "rgb(0, 74, 162)";
            color = "#004AA2";
            // colorHover = "rgb(220, 235, 254)";
            colorHover = "#DCEBFE";
        } else {
            // bgColor = "rgb(226, 252, 240)";
            bgColor = "#E2FCF0";
            // bgColorHover = "rgb(0, 102, 70)";
            bgColorHover = "#006646";
            // color = "rgb(0, 102, 70)";
            color = "#006646";
            // colorHover = "rgb(226, 252, 240)";
            colorHover = "#E2FCF0";
        }

        statusOptions.push({
            value: status.id,
            label: status.status,
            bgColor,
            bgColorHover,
            color,
            colorHover,
        });
    });

    console.log(statusOptions);

    const customStyles = {
        option: (provided, state) => ({
            ...provided,
            borderBottom: '1px dotted pink',
            color: state.isSelected ? 'red' : 'blue',
            padding: 20,
        }),
        control: () => ({
            width: 200,
        }),
        singleValue: (provided, state) => {
            const opacity = state.isDisabled ? 0.5 : 1;
            const transition = 'opacity 300ms';

            return { ...provided, opacity, transition };
        }
    };

    const customTheme = (theme) => ({
        ...theme,
        colors: {
            ...theme.colors,
            primary: 'green',
        }
    });

    const valueStyles = (styles, { data }) => ({
        ...styles,
        backgroundColor: data.bgColor,
        color: data.color,
    });

    const handleStatusChange = async (value) => {
        // console.log(value.value);

        const newStatusChange = {
            user_id: sessionUser.id,
            issue_id: issue.id,
            status_id: value.value,
            created_at: Date.now(),
        };

        const data = await dispatch(createStatusChange(newStatusChange));

        if (!(data && Array.isArray(data))) {
            // console.log(data);
            return;
        }
    };

    return (
        <Select
            styles={{ value: valueStyles }}
            // theme={customTheme}
            options={statusOptions}
            name='status-id'
            id='status-id-input'
            onChange={handleStatusChange}
            defaultValue={currentStatusOptions}
        />
    )
};

export default DynamicStatus;
