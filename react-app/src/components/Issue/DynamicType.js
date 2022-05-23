import { useDispatch, useSelector } from 'react-redux';
import { editIssue } from '../../store/issue';
import Select from 'react-select';

const DynamicType = ({ issue }) => {
    const dispatch = useDispatch();
    const stateTypes = useSelector(state => state.types);
    const allTypes = useSelector(state => Object.values(state.types));

    // Options for Select component
    const currentTypeId = issue?.type_id;
    const currentTypeOptions = {
        value: issue?.type_id,
        label: stateTypes[currentTypeId]?.type,
    };

    let typeOptions = [];
    allTypes.forEach(type => {
        typeOptions.push({
            value: type.id,
            label: type.type,
        });
    });

    const handleTypeChange = async (value) => {
        const newIssue = {
            id: issue.id,
            title: issue.title,     // data required
            type_id: value.value,
            // updated_at: Date.now(),
        };

        const data = await dispatch(editIssue(newIssue));

        if (!(data && Array.isArray(data))) {
            // console.log(data);
            return;
        }
    }

    return (
        <Select
            options={typeOptions}
            name='type-id'
            id='type-id-input'
            onChange={handleTypeChange}
            defaultValue={currentTypeOptions}
        />
    )
};

export default DynamicType;
