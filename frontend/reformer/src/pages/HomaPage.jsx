import React from 'react'
import Slider from '../components/Slider/Slider'
import HeroSection from '../components/Slider/HeroSection'
import Programs from '../components/Programs/Programs'
import Schedule from '../components/Calendar/Schedule'
import RegistrationInfo from '../components/RegisterInformation/RegisterInformation'

const HomaPage = () => {
    return (
        <React.Fragment>
            <Slider />
            <HeroSection />
            <Programs />
            <Schedule />
            <RegistrationInfo />
        </React.Fragment>
    )
}

export default HomaPage