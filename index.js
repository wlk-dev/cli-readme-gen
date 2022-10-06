// TODO: Include packages needed for this application
const inquirer = require("inquirer")
const fs = require("fs");
const md = require("./utils/mdfactory")

// TODO: Create an array of questions for user input
const questions = [
    {message : "Please enter you GitHub username : ", type : "input", name : "gitUser"},
    {message : "Please enter you email address : ", type : "input", name : "gitUser"},
    {message : "Please enter a project title : ", type : "input", name : "title"},
    {message : "Please select a LICENSE for your project : ", type : "list", choices : ["MIT", "GPLv3", "GPL"], name : "license"},
    {message : "Project description : ", type : "input", name : "desc"},
    {message : "Project installation steps : ", type : "input", name : "install"},
    {message : "Project usage information : ", type : "input", name : "usageInfo"},
    {message : "Project contribution guidelines : ", type : "input", name : "guideLines"},
    {message : "Project testing instructions : ", type : "input", name : "testing"},
];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, (err) => {
        err ? console.error(err) : console.log("Finished...")
    })
}

// TODO: Create a function to initialize app
function init() {
    inquirer.prompt([...questions])
    .then(
        (data) => {
            console.log(data)
            md.factory.new(data.title)
                .addComp("Description", data.desc)
                .addComp("Installation", `\`${data.install}\``)
                .addComp("Usage", data.usageInfo)
                .addComp("License", md.builder.mkLicenseBadge(data.license))
                .addComp("Contribution Guidelines", data.guideLines)
                .addComp("Testing Instructions", data.testing)
                .addComp("Questions", md.builder.mkHyperLink(data.gitUser, `https://github.com/${data.gitUser}`))
                .appendContent("Questions")
            
                writeToFile("README.md", md.factory.build())

        }
    )
}

// Function call to initialize app
init();