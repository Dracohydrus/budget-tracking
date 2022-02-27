export const isValidPassword = (password, passwordCompare) => {
    passwordCompare = passwordCompare ?? password;
    if (password.length < 7) return { success: false, error: "Password must exceed 7 characters" };
    if (password !== passwordCompare) return { success: false, error: "Passwords do not match" }
    return {
        success: true,
        error: ""
    }
}