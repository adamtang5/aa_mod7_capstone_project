const StatusCard = ({ status }) => {
    return (
        <div className={`status-text status-id-${status?.id}`}>
            {status?.status.toUpperCase()}
        </div>
    )
};

export default StatusCard;
