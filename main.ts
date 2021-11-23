let charPos = 2
let score = 0
let speed = 1
let gameOver = false
let level = 1
let levelScores = [20, 40, 60]
function shoot() {
    let newNum: number;
    let reTry: number;
    
    let positions = []
    for (let rand = 0; rand < level; rand++) {
        newNum = randint(0, 4)
        if (positions.indexOf(newNum) < 0) {
            positions.push(newNum)
        } else {
            while (true) {
                reTry = randint(0, 4)
                if (positions.indexOf(reTry) < 0) {
                    positions.push(reTry)
                    break
                }
                
            }
        }
        
    }
    for (let i = 0; i < 6; i++) {
        if (i != 5) {
            for (let pos1 of positions) {
                led.toggle(pos1, i)
                led.toggle(pos1, i - 1)
            }
            pause(500 / speed)
        } else if (positions.indexOf(charPos) >= 0) {
            console.log("Game Over")
            basic.clearScreen()
            gameOver = true
            break
        } else {
            for (let pos3 of positions) {
                led.unplot(pos3, 4)
            }
        }
        
    }
}

led.plot(charPos, 4)
while (true) {
    if (gameOver == false) {
        if (score != 81) {
            input.onButtonPressed(Button.A, function on_button_pressed_a() {
                
                if (charPos > 0) {
                    led.unplot(charPos, 4)
                    charPos = charPos - 1
                    led.plot(charPos, 4)
                }
                
            })
            input.onButtonPressed(Button.B, function on_button_pressed_b() {
                
                if (charPos < 4) {
                    led.unplot(charPos, 4)
                    charPos = charPos + 1
                    led.plot(charPos, 4)
                }
                
            })
            shoot()
            speed = speed + 0.1
            score = score + 1
            if (levelScores.indexOf(score) >= 0) {
                level = level + 1
                speed = 1
                console.log("next level")
            }
            
        } else {
            basic.showString("You win!")
            break
        }
        
    } else {
        break
    }
    
}
while (true) {
    basic.showNumber(score - 1)
}
