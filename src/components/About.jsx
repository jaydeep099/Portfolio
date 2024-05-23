import React from "react";

const About = () => {
  return (
    <div
      name="about"
      className="w-full h-screen bg-gradient-to-b from-gray-800 to-black text-white"
    >
      <div className="max-w-screen-lg p-4 mx-auto flex flex-col justify-center w-full h-full">
        <div className="pb-8">
          <p className="text-4xl font-bold inline border-b-4 border-gray-500">
            About
          </p>
        </div>
        <p className="text-xl mt-20">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sit soluta
          perspiciatis voluptates modi tempore corporis dolorum nisi, esse,
          autem veritatis dolorem quae odit tempora saepe tenetur sint doloribus
          quasi ut commodi, totam facere! Nihil, deleniti illum officia eaque
          eligendi quas consectetur dolores reiciendis distinctio est libero
          ullam? Veniam, officiis quibusdam?
        </p>
        <br />

        <p className="text-xl">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
          asperiores similique aperiam dolore, sit alias dolorum assumenda nam
          error debitis est facere quidem ea quos ducimus ipsum eaque! Nisi
          dicta incidunt odio mollitia, iste quidem, animi facilis magnam,
          nostrum adipisci eveniet. Labore, adipisci minima repudiandae quasi
          deleniti atque fuga quod.
        </p>
      </div>
    </div>
  );
};

export default About;
