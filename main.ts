#!/usr/bin/env node
import inquirer from "inquirer";

let balance = 10000;
let message = `Your current balance is: ${balance}`;
let pinCode = 12345;

console.log(message);

const answer = await inquirer.prompt([
  { message: "Enter your pin number", type: "number", name: "pinCode" },
]);

if (answer.pinCode === pinCode) {
  console.log("Correct pin code!!!");
  let operationAnswer = await inquirer.prompt([
    {
      message: "Please select option?",
      type: "list",
      name: "operation",
      choices: ["Withdraw", "Balance Check", "FastCash"],
    },
  ]);
  if (operationAnswer.operation === "Withdraw") {
    let withdrawAnswer = await inquirer.prompt([
      {
        message: "Enter amount: ",
        type: "number",
        name: "amount",
      },
    ]);
    if (withdrawAnswer.amount < 500) {
      console.log(
        "Minimum withdrawal amount is 500. Please enter a valid amount."
      );
    } else if (withdrawAnswer.amount > balance) {
      console.log("Insufficient funds. Please enter a valid amount.");
    } else {
      balance -= withdrawAnswer.amount;
      console.log(`Your remaining balance is: ${balance}`);
    }
  } else if (operationAnswer.operation === "Balance Check") {
    console.log(balance);
  } else if (operationAnswer.operation === "FastCash") {
    let fastCashAnswer = await inquirer.prompt([
      {
        message: "Please select the withdrawal amount.",
        type: "list",
        name: "amount",
        choices: [1000, 5000, 10000, 20000],
      },
    ]);
    if (fastCashAnswer.amount < 500) {
      console.log(
        "Minimum withdrawal amount is 500. Please select a valid amount."
      );
    } else if (fastCashAnswer.amount > balance) {
      console.log("Insufficient funds. Please select a lower amount.");
    } else {
      balance -= fastCashAnswer.amount;
      console.log(`Your remaining balance is: ${balance}`);
    }
  }
} else {
  console.log("Please enter a valid pin");
}
