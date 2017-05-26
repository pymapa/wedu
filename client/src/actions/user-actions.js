export const updateUsername = (name) => {
    console.log("updateUsername " + name);
    return {
        type: 'UPDATE_USERNAME',
        payload: name
    }
}