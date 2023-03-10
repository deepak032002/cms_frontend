import React from "react";
import { Link } from "react-router-dom";
import Header from "../header";

const Info = () => {
  return (
    <>
      <Header/>
      <div className="my-2 p-3 mx-2">
        <h1 className="text-2xl py-4 font-bold text-center">
          Welcome to CMS careers website and thank you for your interest in
          working with us
        </h1>
        <h2 className="text-xl font-semibold mt-4 mb-2">
          Pre-requisites for making an online application :
        </h2>
        <ul className="list-decimal px-3 mx-2 ">
          <li>A Valid Email ID</li>
          <li>Active Mobile Number</li>
          <li>Color Passport Size Photo</li>
        </ul>
        <h2 className="text-xl font-semibold mt-4 mb-2">Points to be noted :</h2>
        <ul className="list-decimal px-3 mx-2">
          <li>
            After making the payment online of Rs 600, the applicant will not
            have the option to make any changes to their application.
          </li>
          <li>
            If you have applied successfully and made the payment then there is
            no need to print and submit your application form at Quality
            Assurance Innovation Department.
          </li>
        </ul>

        <h2 className="text-xl font-semibold mt-4 mb-2">
          Instructions for filling the online application form :
        </h2>
        <ul className="list-decimal px-3 mx-2">
          <li>
            During the form filling process, the applicants should fill all the
            entries and keep saving the entries / information as they proceed.
          </li>
          <li>
            If the applicant is unable to fill the form in one sitting or
            somehow the process is interrupted, there is no need to re-register.
            The applicant can login using the same credentials and continue the
            process from wherever the applicant had left.
          </li>
          <li>
            You are advised to check all the data that you have entered before
            making the payment of the application fee of Rs 600. If there is
            some error, you can edit the same or restart the application
            process, but only before the online payment is made.
          </li>
          <li>
            Once you have submitted the application fees, the data submitted in
            the application form cannot be edited under any circumstances.{" "}
          </li>
          <li>
            The details of the reference checks (references cited by the
            applicant) have to be functional and valid. No response from the
            reference may be deemed as disqualification of the applicant.{" "}
          </li>
        </ul>

        <h2 className="text-xl font-semibold mt-4 mb-2">
          A typical recruitment process will involve :
        </h2>

        <ul className="list-decimal px-3 mx-2">
          <li>Apply online and pay the application fee.</li>
          <li>
            Upon receiving the application forms, only shortlisted applicants
            will be informed about the date, time and venue of the written test
            via an email / call or both.
          </li>
          <li>
            The written test shall be of a General English assessment (to test
            your proficiency in English) along with the test in the respective
            subject. It may vary depending upon the category.
          </li>
          <li>
            Consequent upon the performance of the applicant in the written
            test, only the shortlisted candidates will then be informed by email
            / call or both to appear for an in- person interview followed by a
            demo (only for those who qualify the interview). The date time and
            venue will be shared accordingly.
          </li>
          <li>
            Only finally selected candidate(s) will then be called for the
            verification of their testimonials and post the successful
            verification of their testimonials the candidate will be given an
            appointment letter.
          </li>
        </ul>

        {/* <div className="flex items-center justify-center gap-4 my-6">
        <input type="checkbox" name="check" id="check" />
        <label htmlFor="check">I Agree</label>
      </div> */}

        <Link
          to="/vacancy/new"
          className="bg-blue-600 text-white hover:bg-blue-700 my-3 block mx-auto w-fit rounded-md px-4 py-1 my-8"
        >
          Agree & Proceed
        </Link>
      </div>
    </>
  );
};

export default Info;
