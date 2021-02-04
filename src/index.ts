import { IRobotPosition } from "./interface/IRobotPosition";
import { readFileSync } from 'fs'

const robotPosition : IRobotPosition = {
    x: 0,
    y: 0,
    direction: 'NORTH'
}

let initialStep = true

// place robot
const PlaceRobot = (x: number, y: number, direction: string) => {
   if((x <= 5 && x >= 0) && (y <= 5 && y >= 0)) {
       initialStep = false
       robotPosition.x = x
       robotPosition.y = y
       robotPosition.direction = direction
   } else if((x > 5 || x < 0) || (y > 5 || y < 0)) {
        return
   }
}

const isValidPosition = (value: number) => {
    if(value > 5 || value < 0) return false
    else return true
}

// move robot 
const MoveRobot = () => {
    switch(robotPosition.direction) {
        case 'NORTH':
            if(isValidPosition(robotPosition.y + 1))
                robotPosition.y = robotPosition.y + 1
            break
        case 'SOUTH':
            if(isValidPosition(robotPosition.y - 1))
                robotPosition.y = robotPosition.y - 1
            break
        case 'WEST':
            if(isValidPosition(robotPosition.x - 1))
                robotPosition.x = robotPosition.x - 1
            break
        case 'EAST':
            if(isValidPosition(robotPosition.x + 1))
                robotPosition.x = robotPosition.x + 1
            break
    }
}

// rotate robot
const RotateRobot = (direction: string) => {
   
    switch (robotPosition.direction) {
        case 'NORTH':
            if(direction === 'LEFT') 
                robotPosition.direction = 'WEST'
            else if(direction === 'RIGHT') 
                robotPosition.direction = 'EAST'
            break
        case 'SOUTH':
            if(direction === 'LEFT') 
                robotPosition.direction = 'EAST'
            else if(direction === 'RIGHT') 
                robotPosition.direction = 'WEST'
            break
        case 'WEST':
            if(direction === 'LEFT') 
                robotPosition.direction = 'SOUTH'
            else if(direction === 'RIGHT') 
                robotPosition.direction = 'NORTH'
            break
        case 'EAST':
            if(direction === 'LEFT') 
                robotPosition.direction = 'NORTH'
            else if(direction === 'RIGHT') 
                robotPosition.direction = 'SOUTH'
            break
    }
}

// <--- this will run each step
const RunStep = (step: string)  => {
    const commandStepArray = step.split(' ')

    const command = commandStepArray[0]
    if(initialStep && command !== 'PLACE') {
        console.log('disregard command')
    }
    else {
        switch(command) {
            case 'PLACE':
                let args = commandStepArray[1].split(',')
                PlaceRobot(parseInt(args[0]), parseInt(args[1]), args[2])
                break;
            case 'REPORT':
                console.log(robotPosition)
                break;
            case 'MOVE':
                MoveRobot()
                break;
            default:
                RotateRobot(command)
                break;
        }
    }   
}


const initializeRobot = () => {
    robotPosition.x = 0
    robotPosition.y = 0
    robotPosition.direction = 'NORTH'
}



// < ---- main program
export const RunRobot = (filename: string) : IRobotPosition | undefined => {
    try {

        initializeRobot()
        initialStep = true 

        const filepath = './test-files/' + filename
        
        const commandString: string = readFileSync(filepath, 'utf-8') // <---- string of commands

        const steps = commandString.split('\n') // <---- split steps

        for(let step of steps)  {
            RunStep(step)
        }

        return robotPosition
    } catch(err) {
        throw new Error(err.message)
    }
}