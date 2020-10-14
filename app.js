const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const Employee = require("./lib/Employee");

const questions = [{
        message: "What type of employee is this?",
        name: "type",
        type: "list",
        choices: ["Engineer", "Intern", "Manager"]
    },
    {
        message: "What is the employee's name?",
        name: "name",
        type: "text",
    },
    {
        message: "What is the employee's id number?",
        name: "id",
        type: "text",
    },
    {
        message: "What is the employee's email?",
        name: "email",
        type: "text",
    },
]
const another = {
    message: "Do you wish to add another employee?",
    name: "more",
    type: "confirm",
}
const engineerQ = {
    message: "What is the employee's GitHub username?",
    name: "specific",
    type: "text",
}
const internQ = {
    message: "What is the employee's school?",
    name: "specific",
    type: "text",
}
const managerQ = {
    message: "What is the employee's office number?",
    name: "specific",
    type: "text",
}

async function init() {
    const employees = [];
    let more = true;
    while (more) {
        let data = await inquirer.prompt(questions);
        let {specific} = data.type === "Engineer" ? await inquirer.prompt(engineerQ)
            : data.type === "Intern" ? await inquirer.prompt(internQ)
            : await inquirer.prompt(managerQ);
        if (data.type === "Engineer") employees.push(new Engineer(data.name, data.id, data.email, specific));
        else if (data.type === "Intern") employees.push(new Intern(data.name, data.id, data.email, specific));
        else if (data.type === "Manager") employees.push(new Manager(data.name, data.id, data.email, specific));
        let extra = await inquirer.prompt(another);
        if (!extra.more) more = false;
    }
    let html = render(employees);
    fs.writeFile(outputPath, html, () => console.log("Wrote to file."));

}
init();

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
