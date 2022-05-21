import { useDispatch, useSelector } from "react-redux";
import { createStatusChange } from "../../store/statusChange";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const DynamicStatus = ({ issue }) => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const stateStatuses = useSelector(state => state.statuses);

    // Options for Select component
    const currentStatusId = issue?.current_status?.status_id;
    const currentStatusOptions = {
        value: currentStatusId,
        label: stateStatuses[currentStatusId]?.status,
    };

    let statusOptions = [];
    stateStatuses[currentStatusId]?.next?.forEach(status => {
        statusOptions.push({
            value: status.id,
            label: status.status,
        });
    });

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
            console.log(data);
        }
    };

    return (
        <Select
            // styles={customStyles}
            theme={customTheme}
            options={statusOptions}
            name='status-id'
            id='status-id-input'
            onChange={handleStatusChange}
            defaultValue={currentStatusOptions}
        />
    )
};

export default DynamicStatus;
