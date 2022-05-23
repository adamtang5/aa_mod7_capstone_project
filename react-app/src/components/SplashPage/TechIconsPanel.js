import TechCard from '../TechCard';
import techs from '../TechCard/techs.json';

const TechIconsPanel = () => {
    return (
        <div className="fade-in flex-row">
            <h3 className="footer-text">Created With: </h3>
            <div className="techs flex-row">
                {techs?.map(tech => (
                    <TechCard key={tech.name} tech={tech} />
                ))}
            </div>
        </div>
    )
};

export default TechIconsPanel;
