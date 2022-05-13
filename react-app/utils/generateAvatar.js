export const bgColors = [
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
];

export const toInitials = (name) => {
    return name && name.split(' ').map(s => s[0].toUpperCase()).join('').slice(0, 2);
};

export const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
};

export const generateAvatarUrl = (text, foregroundColor = 'white', backgroundColor = 'black') => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext('2d');

    canvas.width = 200;
    canvas.height = 200;

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
