"use client"

import React, {useState} from 'react'
import Image from "next/image";
import PageSection from './PageSection';
import SubNavBar from "./SamePageNavigation/SubNavBar";
import BikeContent from './BikeContent';
import bikeDataJson from "../../public/JSONs/bikes.json";
import { BikeData } from '../types/bike';
import ParallaxSection from './ParallaxSection';
import { motion } from 'motion/react';

interface BikeSectionProps {
    bike: string
}

/**
 * @documentation
 * The Bike page is made up of these sections 
 * Each section is for each bike
 * Typically contains: bike name, image, small nav bar, and information
 */
const BikeSection = ({bike} : BikeSectionProps) => {
    const bikeData = bikeDataJson as BikeData;
    let sections = ["Overview"];
    
    if (bikeData[bike].gallery.length > 0) {
        sections.push("Gallery")
    } 

    // track the active section
    const [activeSection, setActiveSection] = useState(sections[0]);

    return (
        <>
            <div className="py-8 bg-black" style={{
                borderBottom: "2px solid #5e5b5b", // Top border
                width: "95%",
                margin: "0 auto",
                textAlign: "center",}}>
            </div>

            <div className="py-4 bg-black"></div>

            <PageSection colourWay="dark">
                <motion.section 
                    className="relative text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="relative z-10">
                        <h1 className="text-5xl text-center font-bold">{bike.toUpperCase()}</h1>
                    </div>
                </motion.section>

                <motion.div 
                    className="relative w-full h-96 flex-shrink-0 overflow-hidden"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <ParallaxSection speed={0.3}>
                        <Image
                            src={bikeData[bike].image}
                            alt={`Image of ${bike}`}
                            fill
                            className="object-cover transition-transform duration-700 hover:scale-110"
                            priority={bike === Object.keys(bikeData)[0]}
                        />
                    </ParallaxSection>
                </motion.div>

                {/* Navigates "Overview" and "Gallery" for each Bike on the page */}
                <SubNavBar 
                    sections={sections}
                    activeSection={activeSection}
                    setActiveSection={setActiveSection}>
                </SubNavBar>

                {/* Insert BikeContent component here */}
                <BikeContent
                    activeTab={activeSection}
                    bikeData={bikeData}
                    bike={bike}>
                </BikeContent>
            </PageSection>
        </>
    );
}

export default BikeSection;


