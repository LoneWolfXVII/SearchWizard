import MaterialInput from "../../components/material-input";
import React from "react";

const Signin = () => {
  return (
    <div className="flex justify-center w-full min-h-screen text-gray-900 bg-gray-100">
      <div className="flex justify-center flex-1 w-full m-0 bg-white shadow sm:rounded-lg">
        <div className="p-6 lg:w-1/2 xl:w-5/12 sm:p-12">
          <div className="flex flex-col items-center mt-12">
            <h1 className="text-2xl font-extrabold xl:text-3xl">Let's get started</h1>

            <div className="flex-1 w-full mt-8">
              <div className="flex flex-col items-center">
                <button className="flex items-center justify-center w-full max-w-xs py-3 font-bold text-gray-800 transition-all duration-300 ease-in-out border shadow-sm focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline rounded-[15rem]">
                  <div className="p-2 bg-white rounded-full">
                    <svg className="w-4" viewBox="0 0 533.5 544.3">
                      <path
                        d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                        fill="#4285f4"
                      />
                      <path
                        d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                        fill="#34a853"
                      />
                      <path d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z" fill="#fbbc04" />
                      <path
                        d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                        fill="#ea4335"
                      />
                    </svg>
                  </div>
                  <span className="ml-4">Continue with google</span>
                </button>
              </div>
              <div className="my-12 text-center border-b">
                <div className="inline-block px-2 text-sm font-medium leading-none tracking-wide text-gray-600 transform translate-y-1/2 bg-white">
                  Or sign up with e-mail
                </div>
              </div>{" "}
              <div className="max-w-xs mx-auto">
                <MaterialInput />
                <br />
                <MaterialInput />

                <button className="flex items-center justify-center w-full py-4 mt-5 font-semibold tracking-wide text-gray-100 transition-all duration-300 ease-in-out bg-blue-500 rounded-lg hover:bg-blue-700 focus:shadow-outline focus:outline-none">
                  <span className="ml-3">Continue</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 hidden text-center bg-indigo-100 lg:flex">
          <div
            className="relative flex items-center justify-center w-full h-full bg-center bg-no-repeat bg-cover"
            style={{
              backgroundImage: "url('/signin.svg')",
            }}
          >
            <h2 className="absolute z-10 text-xl font-bold text-white top-10 left-10">Iframe.ai</h2>
            <h4 className="absolute z-10 text-3xl font-bold text-white">AI that excels in understanding your business dynamics!</h4>
            <img src="/signinOverlap.svg" className="bg-cover " />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
