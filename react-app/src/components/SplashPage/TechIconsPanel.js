import TechCard from '../TechCard';
import techs from '../TechCard/techs.json';

const TechIconsPanel = () => {
    return (
        <div className="splash-section-container flex-column">
            <h2 className="headliner">Some technologies used in this project</h2>
            <div className="techs flex-row">
                {techs?.map(tech => (
                    <TechCard key={tech.name} tech={tech} />
                ))}
            </div>
        </div>
    )
};

export default TechIconsPanel;
