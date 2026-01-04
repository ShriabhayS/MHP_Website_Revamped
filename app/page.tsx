import { Metadata } from "next";
import PageSection from "./components/PageSection";
import Image from "next/image";
import ImageCarousel from "./components/ImageCarousel";
import SponsorshipCarousel from "./components/SponsorCarousel";
import sponsorData from "../public/JSONs/sponsors.json";
import Button from "./components/Buttons";
import ValuesSection from "./components/ValuesSection";
import ParallaxSection from "./components/ParallaxSection";

export const metadata: Metadata = {
  title: "Home",
  description: "Monash Human Power - Student-led engineering team designing and racing cutting-edge human-powered vehicles at Monash University.",
};

export default function Page() {
  const images = [
    "/images/home_page/battle_mountain_group.jpg",
    "/images/home_page/trike_race.jpg",
    "/images/home_page/o_week_group.jpg",
    "/images/home_page/mhp_group.jpg",
  ];
  const values = [
    {
      name: "Community",
      description: "We work collaboratively as a team to achieve shared goals",
    },
    {
      name: "Respect",
      description:
        "We value diverse perspectives and treat all team members with dignity",
    },
    {
      name: "Excellence",
      description:
        "We take pride in our work and continually strive to deliver our best",
    },
    {
      name: "Safety",
      description: "We uphold best practices in safety without compromise",
    },
    {
      name: "Innovation",
      description:
        "We encourage creativity and push the boundaries of what is thought possible",
    },
    {
      name: "Visibility",
      description:
        "We collaborate with the HPV community and promote STEM through outreach",
    },
  ];
  return (
    <>
      <div className="px-5">
        <PageSection colourWay="dark">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <h1 className="text-center sm:text-left text-2xl sm:text-4xl">
                MONASH HUMAN POWER
              </h1>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ParallaxSection speed={0.2}>
              <Image
                src="/images/home_page/v3.png"
                className="flex-grow h-full w-full object-scale-down"
                alt="Monash Human Power V3 bike"
                width={1316}
                height={426}
                priority
              />
            </ParallaxSection>
            <div className="text-center sm:text-right">
              <h2 className=" font-Aldrich text-center sm:text-right  underline decoration-green decoration-4">
                Our Story
              </h2>
              <p>
                {`We are a student-led engineering team based at Monash University in Melbourne, Australia.
                  Since 2015 we have been designing, manufacturing, and racing fully-faired 
                  human-powered vehicles (HPVs) to push the limits of engineering performance.`}
              </p>
              <Button
                hrefString="https://www.youtube.com/watch?v=psuRwd4hgEA&t=3s"
                text="Learn More"
                theme="dark"
                target="_blank"
              />
            </div>
          </div>
        </PageSection>

        <ImageCarousel images={images}></ImageCarousel>

        <PageSection colourWay="dark">
          <h2 className="font-Aldrich underline  decoration-green decoration-4">
            Our Mission
          </h2>
          <p className="my-2">
            We strive to set the standard for advanced, expertly
            engineered human-powered vehicles.
            <br />
            <br />
            Our team designs, manufactures, and races cutting-edge HPVs in
            premier competitions. Through hands-on design, rigorous testing, and
            high-stakes races, we provide students with real-world engineering
            experience while empowering our riders to perform at elite levels.
            We share our passion for engineering HPVs at our school outreach
            programs and proudly promote STEM and sustainability to inspire the
            next generation of engineers.
          </p>
          <Button
            hrefString="/bikes"
            text="Learn More"
            theme="dark"
            target=""
          />
        </PageSection>

        <PageSection colourWay="dark">
          <div
            className="py-2"
            style={{
              borderTop: "2px solid #5e5b5b", // Top border
              width: "100%",
              margin: "0 auto",
              textAlign: "center",
              paddingTop: "20px",
            }}
          >
            <h2 className="text-center font-Aldrich underline decoration-green decoration-4 ">
              Our Values
            </h2>

            <ValuesSection values={values} />
          </div>
        </PageSection>

        <PageSection colourWay="dark">
          <div
            className="py-2"
            style={{
              borderTop: "2px solid #5e5b5b", // Top border
              borderBottom: "2px solid #5e5b5b", // Bottom border
              width: "100%",
              margin: "0 auto",
              textAlign: "center",
              paddingTop: "20px",
              paddingBottom: "20px",
            }}
          >
            <h2 className="text-center font-Aldrich underline decoration-green decoration-4 ">
              Our Sponsors
            </h2>
            <div className="mt-4">
              <p>
                Thank you to our amazing sponsors for empowering Monash Human
                Power to push innovation and achieve new milestones. Your
                support makes our success possible!{" "}
              </p>
            </div>
            <SponsorshipCarousel items={sponsorData} />
          </div>
        </PageSection>
      </div>
    </>
  );
}
