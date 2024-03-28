const generatePasswordButton = document.querySelector("#generate-password")
const generatedPasswordElement = document.querySelector("#generated-password")

const openCloseGeneratorButton = document.querySelector("#open-generate-password")
const generatePasswordContainer = document.querySelector("#generate-options")

const lengthInput = document.querySelector("#length")
const lettersInput = document.querySelector("#letters")
const numbersInput = document.querySelector("#numbers")
const symbolsInput = document.querySelector("#symbols")
const copyPasswordButton = document.querySelector("#copy-password")

const getRandomLetterUpperCase = () => {
    return String.fromCharCode(Math.floor(Math.random() * (90 - 65 + 1)) + 65)
}

const getRandomLetterLowerCase = () => {
    return String.fromCharCode(Math.floor(Math.random() * (122 - 97 + 1)) + 97)
}

const getRandomNumber = () => {
    return Math.floor(Math.random() * 10).toString()
}

const getRandomSymbol = () => {
    const symbols = "(){}[]+=§-_*&¨¬¢$£#@!?°/"
    return symbols[Math.floor(Math.random() * symbols.length)]
}

const generatedPassword = (getRandomLetterLowerCase,  getRandomLetterUpperCase, getRandomNumber, getRandomSymbol) => {
    
    let password = ""
    const passwordLength = +lengthInput.value

    const generators = []

    if(lettersInput.checked){
        generators.push(getRandomLetterLowerCase, getRandomLetterUpperCase)
    }

    if(numbersInput.checked){
        generators.push(getRandomNumber)
    }

    if(symbolsInput.checked){
        generators.push(getRandomSymbol)
    }

    if(generators.length === 0){
        return
    }

    for(let i = 0; i < passwordLength; i = i + generators.length){
        generators.forEach(() => {
            
            const randomValue = generators[Math.floor(Math.random() * generators.length)]()

            password += randomValue
        })
    }

    password = password.slice(0, passwordLength)

    generatedPasswordElement.style.display = "block"
    generatedPasswordElement.querySelector("h4").innerText = password

    return password
}

generatePasswordButton.addEventListener("click", () =>  {
    console.log(generatedPassword(getRandomLetterLowerCase, getRandomLetterUpperCase, getRandomNumber, getRandomSymbol));
})

openCloseGeneratorButton.addEventListener("click", () => {
    generatePasswordContainer.classList.toggle("hide")
})

copyPasswordButton.addEventListener("click", (event) => {
    event.preventDefault()

    const password = generatedPasswordElement.querySelector("h4").innerText

    navigator.clipboard.writeText(password).then(() => {
        copyPasswordButton.innerText = "Password copied successfully"

        setTimeout(() => {
            copyPasswordButton.innerText = "Copy";
        }, 1000)
    })
})