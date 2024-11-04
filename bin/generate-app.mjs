#! /usr/bin/env node

import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';

if (process.argv.length < 3) {
  console.log('you have to provide a name to your app.');
  console.log('For example : ');
  console.log('     npx create-my-boilerplate my-app');
  process.exit(1);
}

const projectName = process.argv[2];
const currentPath = process.cwd();
const projectPath = path.join(currentPath, projectName);
const GIT_REPO = 'https://github.com/raondata/react-boilerplate.git';
const BRANCH_LIST = ['main'];

if (projectName !== '.') {
  try {
    fs.mkdirSync(projectPath);
  } catch (error) {
    if (error.code === 'EEXIST') {
      console.log(projectName);
      console.log(
        `The file ${projectName} already exist in the current directory, please give it another name.`
      );
    } else {
      console.log(error);
    }
    process.exit(1);
  }
}

async function selectOptions() {
  const questions = [
    {
      type: 'list',
      name: 'project options',
      message: 'Choose an option: ',
      choices: [
        '1) [Atomic] Next.js + Emotion + Jest',
        '2) [Atomic] Next.js + TailwindCSS + Jest',
      ],
    },
  ];

  // const answer = await inquirer.prompt(questions);
  // return [answer[questions[0].name], answer[questions[0].name][0] - 1];
}

async function main() {
  try {
    // const [type, number] = await selectOptions();
    // console.log(`You selected : ${type}`);

    console.log('Downloading files...');
    execSync(
      `git clone --depth 1 -b ${BRANCH_LIST[0]} --single-branch ${GIT_REPO} ${projectPath}`
    );

    if (projectName !== '.') {
      process.chdir(projectPath);
    }

    console.log('Installing dependencies...');
    execSync('yarn install');

    console.log('Removing useless files');
    execSync('npx rimraf ./.git');

    console.log('The installation is done, this is ready to use !');
  } catch (error) {
    console.log(error);
  }
}
main();
