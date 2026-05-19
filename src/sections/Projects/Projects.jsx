import styles from './ProjectsStyles.module.css';

function Projects() {
  return (
    <section id="projects" className={styles.container}>
      <h1 className="sectionTitle">Projects</h1>
      <p style={{ marginTop: '0.5rem', color: '#hff8c00' }}>
        Under construction 🚧 — as I am out of town, this will be finished after 27th of this month.
      </p>
    </section>
  );
}

export default Projects;