import './langs.js'
import './samples/main.js'
import './translate/main.js'
import './mailchimpSubscribe.js'
import './uploadCode.js'

export const grecaptchaSiteKey = '6LcMNoUeAAAAAKCDfuNh0u9r1ZqgpjyZ0s2cTTn2'
export const grecaptchaSecretKey = '6LcMNoUeAAAAAGLn6u86pAQt5BreUHQwFA4EYYyg'
const scoreLimit = 6.0
export const showSampleOutput = false

export async function verifyReCaptchaV3(token) {
    let isHuman = false
    try {
        const res = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${grecaptchaSecretKey}&response=${token}`)
        console.log(res.data)
        isHuman =  res.data.success
    } catch (e) {
        console.log(e.response)
    }
}