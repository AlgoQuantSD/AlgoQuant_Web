
import { Auth } from "aws-amplify";

/*
Utility method to update a users email
*/
export const updateEmail = async(user,email) =>  {
    await Auth.updateUserAttributes(user, {
        email : email,
        })
    } 

/*
Utility method to update a users given name
*/
export const updateGivenName = async(user,given_name) =>  {

    return Auth.updateUserAttributes(user, {
        given_name : given_name,
        })   
}

/*
Utility method to update a users family name
*/
export const updateFamilyName = async(user,family_name) =>  {

    return Auth.updateUserAttributes(user, {
        family_name : family_name,
        })
}  

/*
Utility method to update a users phone number
*/
export const updatePhone = async(user,phone) =>  {
 
    return Auth.updateUserAttributes(user, {
        phone_number : phone,
        })
    } 

