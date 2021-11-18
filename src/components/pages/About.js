import React, {useContext} from 'react';
import TopNav from "../layout/TopNav";
import {ThemeContext} from "../../context/theme-context";

function About(props) {
    const {background,foreground} = useContext(ThemeContext);
    return (
        <div>
            <TopNav/>
            <h3 className='p-5' style={{ background: background, color: foreground }}>About Page</h3>
        </div>
    );
}

export default About;