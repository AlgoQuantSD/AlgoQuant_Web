import {SaveSpinner} from "../reusable/LoadSpinner";

/*
Component displayed when the user saves their changes in the profile page
*/
const ProfileSaving = ({saving, errorMessages, successMessages}) => {
  
    // If the fields are in the process of saving
    if (saving) {
      return (
        <SaveSpinner/>
      )
    }
    // If the fields have been saved print out the results
    return  (
      <div>
      {
        // Print out text for each error message
        errorMessages.map((msg,idx) => <p key={idx} className="flex text-red font-semibold text-md">{msg}</p>)
      }
      {
        // Print out text for each sucessful field chane
        successMessages.map((msg,idx) => <p key={idx} className="flex text-green font-semibold text-md">{msg}</p>)
      }
      </div>
    )
}
  
export default ProfileSaving
