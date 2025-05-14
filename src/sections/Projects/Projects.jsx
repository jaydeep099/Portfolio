import styles from './ProjectsStyles.module.css';
import CampusConnect from '../../assets/campusconnect.png';
import NotesManagement from '../../assets/NotesManagement.png';
import WhackaMoleMarioVersion from '../../assets/WhackaMoleMarioVersion.png';
import RideOn from '../../assets/RideOn.png';
import SensAI from '../../assets/SensAI.png';
import ProjectCard from '../../common/ProjectCard';

function Projects() {
  return (
    <section id="projects" className={styles.container}>
      <h1 className="sectionTitle">Projects</h1>
      <div className={styles.projectsContainer}>
        <ProjectCard
          src={SensAI}
          link="https://github.com/jaydeep099/SensAI"
          h3="SensAI"
          p="AI powered Career Assisstant"
        />
        <ProjectCard
          src={CampusConnect}
          link="https://github.com/jaydeep099/CampusConnect"
          h3="CampusConnect"
          p="Event Platform (Clubs Managing Event)"
        />
        <ProjectCard
          src={RideOn}
          link="https://github.com/jaydeep099/RideOn"
          h3="RideOn"
          p="Ride Sharing Platform"
        />
        <ProjectCard
          src={NotesManagement}
          link="https://github.com/jaydeep099/NotesSharing-app"
          h3="NotesSharing App"
          p="Notes Sharing Platform"
        />
        
        <ProjectCard
          src={WhackaMoleMarioVersion}
          link="https://github.com/jaydeep099/Whack-a-Mole-Mario-Version"
          h3="Whack-a-Mole-Mario-Version"
          p="Game App"
        />
      </div>
    </section>
  );
}

export default Projects;