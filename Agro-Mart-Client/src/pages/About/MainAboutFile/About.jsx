import { useContext } from "react";
import AboutAgro from "../AboutsSections/AboutAgro";
import ImageText from "../AboutsSections/ImageText";
import Logos from "../AboutsSections/Logos";
import { ThemeContext } from "../../../provider/ThemeProvider";


const About = () => {
    const {theme} = useContext(ThemeContext);
    return (
        <div>
            <ImageText></ImageText>
            <AboutAgro></AboutAgro>

            <div className={theme === "dark" ? "hidden" : ""}>
              <Logos />
            </div>

        </div>
    );
};

export default About;