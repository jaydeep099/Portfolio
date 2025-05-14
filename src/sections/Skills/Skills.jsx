import styles from "./SkillsStyles.module.css";
import checkMarkIconDark from "../../assets/checkmark-dark.svg";
import checkMarkIconLight from "../../assets/checkmark-light.svg";
import SkillList from "../../common/SkillList";
import { useTheme } from "../../common/ThemeContext";

function Skills() {
  const { theme } = useTheme();
  const checkMarkIcon =
    theme === "light" ? checkMarkIconLight : checkMarkIconDark;

  return (
    <section id="skills" className={styles.container}>
      <h1 className="sectionTitle">Skills</h1>
      <div className={styles.skillList}>
        <SkillList src={checkMarkIcon} skill="Java" />
        <SkillList src={checkMarkIcon} skill="C++" />
        <SkillList src={checkMarkIcon} skill="MySql" />
        <SkillList src={checkMarkIcon} skill="JavaScript" />
        <SkillList src={checkMarkIcon} skill="TypeScript" />
        <SkillList src={checkMarkIcon} skill="HTML" />
        
      </div>
      <hr />
      <div className={styles.skillList}>
      <SkillList src={checkMarkIcon} skill="SpringBoot" />
        <SkillList src={checkMarkIcon} skill="ReactJs" />
        <SkillList src={checkMarkIcon} skill="Nextjs" />
        <SkillList src={checkMarkIcon} skill="TailwindCss" />
        
      </div>
      <hr />
      <div className={styles.skillList}>
        <SkillList src={checkMarkIcon} skill="Postman" />
        <SkillList src={checkMarkIcon} skill="Github" />
        <SkillList src={checkMarkIcon} skill="Git" />
      </div>
    </section>
  );
}

export default Skills;
