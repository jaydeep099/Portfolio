import React from "react";
import CampusConnect from "../assets/projects/campusconnect.png";
import NotesManagement from "../assets/projects/NotesManagement.png";
import WhackaMoleMarioVersion from "../assets/projects/WhackaMoleMarioVersion.png";

const Project = () => {
  const projects = [
    {
      id: 1,
      src: CampusConnect,
      href: "https://github.com/jaydeep099/CampusConnect",
    },
    {
      id: 2,
      src: NotesManagement,
      href: "https://github.com/jaydeep099/Notes_Management"
    },
    {
      id: 3,
      src: WhackaMoleMarioVersion,
      href:"https://github.com/jaydeep099/Whack-a-Mole-Mario-Version"
    },
  ];
  return (
    <div
      name="projects"
      className="bg-gradient-to-b from-black to-gray-800 w-full text-white md:h-screen"
    >
      <div className="max-w-screen-lg p-4 mx-auto flex flex-col justify-center w-full h-full">
        <div className="pb-8">
          <p className="text-4xl font-bold inline border-b-4 border-gray-500">
            Project
          </p>
          <p className="py-6">Check out some of my work right here</p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 px-12 sm:px-0">
          {projects.map(({ id, src , href }) => (
            <div key={id} className="shadow-md shadow-gray-600 rounded-lg">
              <img
                src={src}
                alt=""
                className="rounded-md duration-200 hover:scale-105"
              />
              <div className="flex items-center justify-center">
                <button className="w-1/2 px-6 py-3 m-4 duration-200 hover:scale-105">
                  Demo
                </button>
                <button>
                  <a
                    href={href}
                    className="w-1/2 px-6 py-3 m-4 duration-200 hover:scale-105"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Code
                  </a>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Project;
