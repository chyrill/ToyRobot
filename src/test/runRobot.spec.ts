import { RunRobot } from '..'
import { IRobotPosition } from '../interface/IRobotPosition'
import assert from 'assert'

describe('Toy Robot Test!', function() {
    it('Test 1', () => {
        const result : IRobotPosition | undefined = RunRobot('test1.txt')

        assert.deepEqual(result,{ x: 0, y: 1, direction: 'NORTH'})
    })

    it('Test 2', () => {
        const result : IRobotPosition | undefined = RunRobot('test2.txt')

        assert.deepEqual(result,{ x: 0, y: 0, direction: 'WEST'})
    })

    it('Test 3: should throw an error. Place should be first command.', () => {
        try {
            const result : IRobotPosition | undefined = RunRobot('test3.txt')

            assert.deepEqual(result,{ x: 1, y: 1, direction: 'WEST'})
        } catch(err) {
            console.log(err)
        }
        
    })

    it('Test 4: the robot should not fall off the table in y axis.', () => {
        try {
            const result : IRobotPosition | undefined = RunRobot('test4.txt')

            assert.deepEqual(result, { x: 0, y: 5, direction: 'NORTH' })
        } catch(err) {
            assert.ok(err)
        }
        
    })

    it('Test 5: the robot should not fall off the table in y axis (SOUTH).', () => {
        try {
            const result : IRobotPosition | undefined = RunRobot('test5.txt')

            assert.deepEqual(result, { x: 0, y: 0, direction: 'SOUTH' })
        } catch(err) {
            console.log(err)
        }
        
    })

    it('Test 6: the robot is still outside the table.', () => {
        try {
            const result : IRobotPosition | undefined = RunRobot('test6.txt')

            assert.deepEqual(result, { x: 0, y: 0, direction: 'NORTH' })
        } catch(err) {
            assert.ok(err)
        }
        
    })
})