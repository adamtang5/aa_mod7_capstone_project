// import gravatar from 'gravatar-api';
import "./Avatar.css";

const Avatar = ({ user }) => {
    // const gravatarOptions = {
    //     name: user.display_name,
    //     parameters: { 'size': '40' },
    // };
    // const avatar = gravatar.imageUrl(gravatarOptions);

    const bgColors = [
        "#E67025",
        "#E52F19",
        "#E60E9C",
        "#66140B",
        "#66302A",
        "#B32414",
        "#094899",
        "#991102",
        "#0265E6",
        "#2D9920",
        "#029399",
    ]

    const generateAvatar = (text, dimension, foregroundColor = 'white', backgroundColor = 'black') => {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext('2d');

        canvas.width = dimension;
        canvas.height = dimension;

        // Draw background
        context.fillStyle = backgroundColor;
        context.fillRect(0, 0, canvas.width, canvas.height);

        // Draw text
        context.font = "bold 100px Assistant";
        context.fillStyle = foregroundColor;
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillText(
            text,
            canvas.width / 2,
            canvas.height / 2
        );

        return canvas.toDataURL("image/png");
    };

    const toInitials = (name) => {
        return name && name.split(' ').map(s => s[0].toUpperCase()).join('');
    };

    // const getRandomInt = (max) => {
    //     return Math.floor(Math.random() * max);
    // };

    return (
        <a href={`/users/${user?.id}`}>
            <div className="avatar">
                {user?.avatar_url ? (
                    <img src={user?.avatar_url} alt={user?.display_name} />
                ) : (
                    <div>
                        <img
                            src={generateAvatar(
                                toInitials(user?.display_name),
                                200,
                                'white',
                                bgColors[user?.id % bgColors.length]
                            )} alt={user?.display_name} />
                    </div>
                )}
            </div>
            {/* {bgColors.map((color, idx) => (
                <div key={idx} className="avatar">
                    <img key={idx} src={generateAvatar(toInitials(user?.display_name), 200, 'white', color)} alt={user?.display_name} />
                </div>
            ))} */}
        </a>
    );
};

export default Avatar;
