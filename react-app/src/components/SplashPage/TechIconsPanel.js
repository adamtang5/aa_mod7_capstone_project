import React, { useState } from 'react';
import TechCard from '../TechCard';
import techs from '../TechCard/techs.json';

const TechIconsPanel = () => {
    const [panelOpen, setPanelOpen] = useState(false);

    const togglePanel = e => {
        setPanelOpen(!panelOpen);
    }

    return (
        <>
            <div
                className="panel-toggle cursor-pointer"
                onClick={togglePanel}
            >{panelOpen ? '<' : '>'}</div>
            <div className="techs flex-row">
                {techs?.map(tech => (
                    <TechCard key={tech.name} tech={tech} />
                ))}
            </div>
        </>
    )
};

export default TechIconsPanel;
