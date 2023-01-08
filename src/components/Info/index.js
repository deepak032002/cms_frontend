import React from "react";
import { Link } from "react-router-dom";

const Info = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold">Points to be noted:</h1>
      <ul className="list-decimal px-3 mx-2 mt-4">
        <li>
          After successful online payment, Job Application Form cannot be edited
          under any circumstances
        </li>
        <li>Valid Email ID</li>
        <li>Active Mobile Number</li>
        <li>Color Photo in JPEG format (As per specified size)</li>
        <li>
          If you have applied online and also have made successsful online
          payment for Rs 500/-, then there is no need to submit printout of Job
          Application Form at Head Office!
        </li>
        <li>
          Applicants once submitted the application form online, are required to
          bring all the self attested photocopies of the testimonials mentioned
          below only at the time of INTERVIEW.
        </li>
      </ul>

      <ul className="list-disc px-5 mx-4 mt-4">
        <li>- Highschool Pass certificate & Highschool marksheet</li>
        <li>- Intermediate Pass certificate & Intermediate marksheet</li>
        <li>- Graduation (marksheet obtained in each semester/year), degree</li>
        <li>
          - Post Graduation (marksheet obtained in each semester/year), degree
        </li>
        <li>
          - Professional qualification like diploma (marksheet obtained in each
          semester/year), degree
        </li>
        <li>- B Ed. (marksheet obtained in each semester/year), degree</li>
        <li>
          - Any other additional qualification (marksheet obtained in each
          semester/year), degree
        </li>
        <li>- PAN Card</li>
        <li>- Aadhar Card (both sides)</li>
        <li>
          - Enclose a write-up of 300 to 500 words in English in your own
          handwriting based on the ideology of CMS, namely 'Vasudhaiv Kutumbkam'
          (JAI JAGAT), oneness of God, oneness of religion and oneness of
          mankind, addressing all the three realities of life of a child i.e.,
          material, human and divine that make a child both good and smart, a
          gift of God to mankind, a pride of the human race and a potential
          light of the world. Applications without hand written article will be
          rejected automatically.
        </li>
      </ul>

      <h3 className="text-xl font-semibold">FORM FILLING</h3>

      <ul>
        <li>
          *During the form filling process the applicant can make the entries
          and save the information.
        </li>
        <li>
          *If the applicant is unable to fill the form in one sitting or somehow
          the process is interrupted there is no need to register again.
        </li>
        <li>
          *They can login using the credentials defined & continue the process.
        </li>
        <li>
          *Applicants are advised to check all the data they have entered before
          submitting the application fee. If there is some error they can edit
          these or start the entire process again.
        </li>
        <li>
          *Once they have submitted the application fee the data submitted in
          the registration page cannot be edited under any circumstances
        </li>
        <li>
          *The detail of the reference checks have to be functional & valid. No
          response from the reference may be deemed as subject to disqualify
        </li>
        <li>
          *Applicants can preview all the entries made at every point. If there
          is some error they can edit these before submitting the form.
        </li>
      </ul>

      <div className="flex items-center justify-center gap-4 my-6">
        <input type="checkbox" name="check" id="check" />
        <label htmlFor="check">I Agree</label>
      </div>

      <Link
        to="/vacancy"
        className="bg-blue-500 px-4 py-1 hover:bg-blue-500 my-3 block mx-auto w-fit rounded-md text-white"
      >
        Proceed
      </Link>
    </div>
  );
};

export default Info;
