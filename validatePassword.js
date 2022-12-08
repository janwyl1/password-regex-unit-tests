
const validatePassword = (pwdStr) => {
    const strongPasswordRegex = /^(?!.*[A-Za-z\d@$!#%*?&]*([A-Za-z\d@$!#%*?&])\1{2,})(?=.*[a-z])(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!#%*?&]{10,}$/;

    return strongPasswordRegex.test(pwdStr)
}

export default validatePassword