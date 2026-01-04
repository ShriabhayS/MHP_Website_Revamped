"use client";
import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import PageSection from "../components/PageSection";
import teamData from "../../public/JSONs/teams.json";
import { TeamMember, TeamData } from "../types/team";

export default function TeamPage() {
  const [currentTeamIndex, setCurrentTeamIndex] = useState(0);
  const [fadeClass, setFadeClass] = useState("animate-fadeIn");

  // Functions to handle next/prev team navigation
  const nextTeam = () => {
    setFadeClass("animate-fadeOut");
    setTimeout(() => {
      setCurrentTeamIndex(
        (prevIndex) => (prevIndex + 1) % teamData.sub_teams.length
      );
      setFadeClass("animate-fadeIn");
    }, 300); // Match the duration with the animation
  };

  const prevTeam = () => {
    setFadeClass("animate-fadeOut");
    setTimeout(() => {
      setCurrentTeamIndex((prevIndex) =>
        prevIndex === 0 ? teamData.sub_teams.length - 1 : prevIndex - 1
      );
      setFadeClass("animate-fadeIn");
    }, 300); // Match the duration with the animation
  };

  // Get the current team data
  const currentTeam = teamData.sub_teams[currentTeamIndex];

  // Helper function to determine the layout for the last row
  const getLastRowClasses = (members: string | any[], index: number) => {
    const membersPerRow = 3;
    const totalMembers = members.length;
    const isLastRow =
      index >= totalMembers - (totalMembers % membersPerRow || membersPerRow);

    if (!isLastRow) return "";

    const membersInLastRow = totalMembers % membersPerRow;

    if (membersInLastRow === 1 && index === totalMembers - 1) {
      return "lg:col-start-2 lg:col-end-3"; // Center the single member
    } else if (
      membersInLastRow === 2 &&
      (index === totalMembers - 2 || index === totalMembers - 1)
    ) {
      return index === totalMembers - 2
        ? "lg:col-start-1 lg:col-end-2"
        : "lg:col-start-3 lg:col-end-4"; // First and third column
    }
    return ""; // For rows with 3 members, default layout applies
  };



  const getLeadLayoutClasses = (teamLeads: TeamMember[], teamName: string) => {
    const isSpecialTeam = teamName === "Management Team" || teamName === "Auxiliary";
    
    if (teamLeads.length === 2 || isSpecialTeam) {
      return "grid grid-cols-1 md:grid-cols-2 gap-8";
    }
    
    if (teamLeads.length === 1) {
      return "flex justify-center";
    }
    
    return "flex flex-wrap justify-center gap-6";
  };

  return (
    <>
      <title>Teams | MHP</title>
      <PageSection colourWay="dark">
        <section className="relative text-center ">
          <div className="relative z-10">
            <h1 className="text-center text-5xl">Meet our Team</h1>
            {/* Battle Mountain Group Image */}
            <div className="w-dvh h-96 items-center overflow-hidden mx-auto">
              <Image
                src="/images/home_page/battle_mountain_group.jpg"
                width="800"
                height="300"
                objectFit="cover"
                alt="Battle Mountain Group"
                layout="responsive"
                className="top-1/2  transform -translate-y-1/3"
              />
            </div>

            <h2 className="mt-2 mx-20">
              We, at Monash Human Power are a diverse team of Monash University
              students, bringing together expertise from various engineering
              disciplines to design cutting-edge human-powered vehicles.
            </h2>
            <h3 className="mt-2 text-green">
              Learn more about our sub-teams below!
            </h3>
          </div>
        </section>
      </PageSection>

      {/* Sub-teams navigation */}
      <PageSection colourWay="dark">
        <div
          className="p-4"
          style={{
            borderTop: "2px solid #5e5b5b", // Top border
            width: "95%",
            margin: "0 auto",
            textAlign: "center",
          }}
        ></div>

        <section className="flex justify-center items-center bg-gray-900">
          <button
            onClick={prevTeam}
            className="z-10 p-4 bg-gray-300 rounded-full hover:bg-gray-400 text-4xl w-16 h-16 flex items-center justify-center"
          >
            &larr;
          </button>
          <h2 className="text-3xl font-bold mx-8 underline decoration-green">
            {currentTeam.name}
          </h2>
          <button
            onClick={nextTeam}
            className="z-10 p-4 bg-gray-300 rounded-full hover:bg-gray-400 text-4xl w-16 h-16 flex items-center justify-center"
          >
            &rarr;
          </button>
        </section>

        {/* Dynamic Team Section */}
        <section className="">
          <div className="flex flex-col lg:flex-row justify-center items-stretch lg:space-x-8 px-8">
            {/* Image */}
            <div className="w-full lg:w-1/2 md:w-1/2">
              <div className={`transition-opacity duration-300 ${fadeClass}`}>
                <Image
                  src={currentTeam.image} // Dynamically load the image from JSON
                  alt={currentTeam.name}
                  width={800}
                  height={650}
                  className="mx-auto rounded-lg object-cover xl:w-[500px] xl:h-[300px]"
                />
              </div>
            </div>

            {/* Description */}
            <div className="mt-2 mx-2 lg:mt-0 lg:w-1/2 md:w-1/2 flex items-center">
              <div className={`transition-opacity duration-300 ${fadeClass}`}>
                <p className="font-extralight text-center lg:text-justify">{currentTeam.description}</p>
              </div>
            </div>
          </div>
        </section>
        <div
          className="p-4"
          style={{
            borderBottom: "2px solid #5e5b5b",
            width: "95%",
            margin: "0 auto",
            textAlign: "center",
          }}
        ></div>
      </PageSection>

      {/* Team Leads and Members Section */}
      <PageSection colourWay="dark">
        <section
          className={`${fadeClass} relative bg-[url('/images/teams_page/teams_background.png')] bg-contain bg-center   bg-no-repeat`}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <div className="relative z-10">
            <h2 className="text-center text-4xl font-bold mb-2">
              Team Members
            </h2>
            <div className={`${getLeadLayoutClasses(currentTeam.Team_Leads, currentTeam.name)} px-8 mb-12`}>
              {currentTeam.Team_Leads?.map((lead, index) => (
                <motion.div
                  key={index}
                  className={`bg-gray-900 p-4 rounded-lg text-center transition-all duration-300 hover:bg-gray-800 hover:scale-105 ${
                    currentTeam.Team_Leads.length === 3 && index === 2
                      ? "lg:col-start-1 lg:col-end-3"
                      : currentTeam.name === "Management Team" ? "lg:col-start-1 lg:col-end-3" : ""
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(172, 246, 1, 0.2)" }}
                >
                  <div className="relative overflow-hidden rounded-md">
                    <Image
                      src={lead.image}
                      alt={lead.name}
                      width={200}
                      height={200}
                      className="mx-auto rounded-md object-cover w-[220px] h-[150px] transition-transform duration-300 hover:scale-110"
                    />
                  </div>
                  <h4 className="text-xl font-bold mt-4 text-green">
                    {lead.name}
                  </h4>
                  <p>{lead.role}</p>
                </motion.div>
              ))}
            </div>
            {/* Team Members Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 px-8">
              {currentTeam.members?.map((member, index) => (
                <motion.div
                  key={index}
                  className={`bg-gray-900 rounded-lg text-center p-4 transition-all duration-300 hover:bg-gray-800 hover:scale-105 ${getLastRowClasses(
                    currentTeam.members,
                    index
                  )}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(172, 246, 1, 0.15)" }}
                >
                  <div className="relative overflow-hidden rounded-md">
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={200}
                      height={200}
                      className="mx-auto rounded-md object-cover w-[220px] h-[150px] transition-transform duration-300 hover:scale-110"
                    />
                  </div>
                  <h4 className="text-lg font-bold mt-4 text-green">
                    {member.name}
                  </h4>
                  <p>{member.role}</p>
                </motion.div>
              ))}
            </div>{" "}
          </div>
        </section>
      </PageSection>
    </>
  );
}
