
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
export const updateGivenName = async(user,givenName) =>  {

    return Auth.updateUserAttributes(user, {
        given_name : givenName,
        })   
}

/*
Utility method to update a users family name
*/
export const updateFamilyName = async(user,familyName) =>  {

    return Auth.updateUserAttributes(user, {
        family_name : familyName,
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

