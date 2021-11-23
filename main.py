charPos = 2
score = 0
speed = 1
gameOver = False
level = 1
levelScores = (20, 40, 60)

def shoot():
    global gameOver, level
    positions = []
    for rand in range(level):
        newNum = randint(0, 4)
        if newNum not in positions:
            positions.append(newNum)
        else:
            while True:
                reTry = randint(0, 4)
                if reTry not in positions:
                    positions.append(reTry)
                    break

    for i in range(6):
        if  i != 5:
            for pos1 in positions:
                led.toggle(pos1, i)
                led.toggle(pos1, i - 1)
            pause(500 / speed)
        else:    
            if charPos in positions:
                print("Game Over")
                basic.clear_screen()
                gameOver = True
                break
            else:

                for pos3 in positions:
                    led.unplot(pos3, 4)


def on_button_pressed_a():
    global charPos
    if charPos > 0:
            led.unplot(charPos, 4)
            charPos = charPos - 1
            led.plot(charPos, 4)

def on_button_pressed_b():
    global charPos
    if charPos < 4:
            led.unplot(charPos, 4)
            charPos = charPos + 1
            led.plot(charPos, 4)
    

led.plot(charPos, 4)

while True:
    if gameOver == False:
        if score != 81:
            input.on_button_pressed(Button.A, on_button_pressed_a)
            input.on_button_pressed(Button.B, on_button_pressed_b)
            shoot()
            speed = speed + 0.1
            score = score + 1
            
            if score in levelScores:
                level = level + 1
                speed = 1
                print("next level")
        else:
            basic.show_string("You win!")
            break
    else:
        break

while True:
    basic.show_number(score - 1)

    

