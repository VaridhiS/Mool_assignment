

describe('UI Testing', () => {

    it('Title check', ()=>{
        cy.visit("https://harman052.github.io/react-tutorial-solutions/")
        cy.title().should('eq', 'React App')
       
    })

    it("User should have the first start step defined", ()=>{
        cy.visit("https://harman052.github.io/react-tutorial-solutions/")
        cy.get(':nth-child(1) > .normal').should('be.visible')
        cy.get(':nth-child(1) > .normal').should('have.text', 'Go to game start (0, 0)')
    })

    it("User should be able to see the next player info before game begins", ()=>{
        cy.visit("https://harman052.github.io/react-tutorial-solutions/")
        cy.get('.game-info > div').should('have.text', 'Next player: X')
        //var nextPlayer=cy.get('.game-info > div').text
        //expect(nextPlayer=='Next player: O')
    })

    it('User should be able to click game squares', ()=>{
        cy.visit("https://harman052.github.io/react-tutorial-solutions/")
        //cy.wait(20000)
        //cy.get(':nth-child(3) > :nth-child(2)').should('be.clickable')
        if(cy.get(':nth-child(3) > :nth-child(2)').isClickable){
            cy.log("Tic tac toe can be played")
            cy.get(':nth-child(3) > :nth-child(2)').click()
            cy.get(':nth-child(3) > :nth-child(2)').should('have.text', 'X')
            cy.log('Button is working')
        }
        else{
            cy.log("Tic tac toe not working")
        }
    })

    it("Reset Button functionality", ()=>{
        cy.visit("https://harman052.github.io/react-tutorial-solutions/")
        //cy.wait(20000)
        while(cy.get(':nth-child(3) > :nth-child(2)').isClickable){
            cy.log("Tic tac toe can be played")
            cy.get(':nth-child(3) > :nth-child(2)').click()
            cy.get(':nth-child(3) > :nth-child(2)').should('have.text', 'X')
            cy.log('Button is working')
            while(cy.get('.reset > button').isClickable){
                cy.get('.reset > button').click()
            }
            cy.get(':nth-child(3) > :nth-child(2)').should('have.text', null)
        }
    })

    it('Moves are registered when clicks are made', ()=>{
        cy.visit("https://harman052.github.io/react-tutorial-solutions/")
        while(cy.get(':nth-child(3) > :nth-child(2)').isClickable){
            cy.log("Tic tac toe can be played")
            cy.get(':nth-child(3) > :nth-child(2)').click()
            cy.get(':nth-child(3) > :nth-child(2)').should('have.text', 'X')
            cy.log('Button is working')
            cy.get(':nth-child(2) > .normal').should('be.visible') //new move's button appearance
        }
          
    })

    it("User should be able to toggle", ()=>{
        cy.visit("https://harman052.github.io/react-tutorial-solutions/")
        while(cy.get(':nth-child(3) > :nth-child(2)').isClickable){
            cy.log("Tic tac toe can be played")
            cy.get(':nth-child(3) > :nth-child(2)').click()
            cy.get(':nth-child(3) > :nth-child(2)').should('have.text', 'X')
            cy.log('Button is working')
            var step1=cy.get(':nth-child(1) > .normal').text
            var step2=cy.get(':nth-child(2) > .normal').text
            cy.get('.game-info > :nth-child(2)').click()

            var step1T=cy.get(':nth-child(1) > .normal').text
            var step2T=cy.get(':nth-child(2) > .normal').text
            expect(step1==step2T && step2==step1T)
        }
    })

    it("Once user clicks on the square, the next player text should update", ()=>{
        cy.visit("https://harman052.github.io/react-tutorial-solutions/")
        //cy.wait(20000)
        //var nextPlayer=cy.get('.game-info > div').text
        //expect(nextPlayer=='Next player: O')
        cy.get('.game-info > div').should('have.text', 'Next player: X')
        while(cy.get(':nth-child(3) > :nth-child(2)').isClickable){
            cy.log("Tic tac toe can be played")
            cy.get(':nth-child(3) > :nth-child(2)').click()
            cy.get(':nth-child(3) > :nth-child(2)').should('have.text', 'X')
            cy.log('Button is working')
            cy.get(':nth-child(3) > :nth-child(2)').click()
            cy.get('.game-info > div').should('have.text', 'Next player: O')
            //expect(nextPlayer=='Next player: O')
        }
    })

    it("User should be informed that they won upon forming a pattern", ()=>{
        cy.visit("https://harman052.github.io/react-tutorial-solutions/")
        while(cy.get(':nth-child(3) > :nth-child(2)').isClickable){
            cy.log("Tic tac toe can be played")
            //code for winning streak-player O
            cy.get(':nth-child(3) > :nth-child(2)').click()
            cy.get(':nth-child(3) > :nth-child(2)').should('have.text', 'X')
            cy.get(':nth-child(3) > :nth-child(3)').click()
            cy.get(':nth-child(3) > :nth-child(3)').should('have.text', 'O')
            cy.get(':nth-child(1) > :nth-child(1) > :nth-child(2) > :nth-child(2)').click()
            cy.get(':nth-child(1) > :nth-child(1) > :nth-child(2) > :nth-child(2)').should('have.text', 'X')
            cy.get(':nth-child(1) > :nth-child(3) > :nth-child(1)').click() 
            cy.get(':nth-child(1) > :nth-child(3) > :nth-child(1)').should('have.text', 'O')
            cy.get('.game-board > :nth-child(1) > :nth-child(1) > :nth-child(1) > :nth-child(2)').click()
            cy.get('.game-board > :nth-child(1) > :nth-child(1) > :nth-child(1) > :nth-child(2)').should('have.text', 'X')
            //game finished, validating winner banner
            cy.get('h2').should('have.text', '"X" is winner!')
            //validating color from one of the blocks in patttern
            cy.get('.:nth-child(3) > :nth-child(2)').
            invoke('css', 'background-color').
            then((bgcolor) => {
                expect(rgbHex(bgcolor)).to.eq('8EFC63')
            })
        }

    })


    it("When the game ends in a draw, the tic tac toe should inform so with the option to try again", ()=>{
        cy.visit("https://harman052.github.io/react-tutorial-solutions/")
        while(cy.get(':nth-child(3) > :nth-child(2)').isClickable){
            cy.log("Tic tac toe can be played")
            //code for game draw
            cy.get(':nth-child(3) > :nth-child(2)').click()
            cy.get(':nth-child(3) > :nth-child(2)').should('have.text', 'X')
            cy.get(':nth-child(3) > :nth-child(3)').click()
            cy.get(':nth-child(3) > :nth-child(3)').should('have.text', 'O')
            cy.get(':nth-child(1) > :nth-child(1) > :nth-child(2) > :nth-child(2)').click()
            cy.get(':nth-child(1) > :nth-child(1) > :nth-child(2) > :nth-child(2)').should('have.text', 'X')
            cy.get(':nth-child(1) > :nth-child(3) > :nth-child(1)').click() 
            cy.get(':nth-child(1) > :nth-child(3) > :nth-child(1)').should('have.text', 'O')
            cy.get('.game-board > :nth-child(1) > :nth-child(1) > :nth-child(1) > :nth-child(2)').click()
            cy.get('.game-board > :nth-child(1) > :nth-child(1) > :nth-child(1) > :nth-child(2)').should('have.text', 'X')
            //game draw heading check
            cy.get('h2').should('have.text', 'Draw!')
            cy.get('.draw > button').should('be.visible')
        }
    })

    it("When user clicks on try again CTA after the game ending in a draw the game should reset", ()=>{
        cy.visit("https://harman052.github.io/react-tutorial-solutions/")
        while(cy.get(':nth-child(3) > :nth-child(2)').isClickable){
            cy.log("Tic tac toe can be played")
            //code for game draw
            cy.get(':nth-child(3) > :nth-child(2)').click()
            cy.get(':nth-child(3) > :nth-child(2)').should('have.text', 'X')
            cy.get(':nth-child(3) > :nth-child(3)').click()
            cy.get(':nth-child(3) > :nth-child(3)').should('have.text', 'O')
            cy.get(':nth-child(1) > :nth-child(1) > :nth-child(2) > :nth-child(2)').click()
            cy.get(':nth-child(1) > :nth-child(1) > :nth-child(2) > :nth-child(2)').should('have.text', 'X')
            cy.get(':nth-child(1) > :nth-child(3) > :nth-child(1)').click() 
            cy.get(':nth-child(1) > :nth-child(3) > :nth-child(1)').should('have.text', 'O')
            cy.get('.game-board > :nth-child(1) > :nth-child(1) > :nth-child(1) > :nth-child(3)').click()
            cy.get('.game-board > :nth-child(1) > :nth-child(1) > :nth-child(1) > :nth-child(3)').should('have.text', 'X')
            cy.get('.game-board > :nth-child(1) > :nth-child(1) > :nth-child(1) > :nth-child(2)').click()
            cy.get('.game-board > :nth-child(1) > :nth-child(1) > :nth-child(1) > :nth-child(2)').should('have.text', 'O')
            cy.get(':nth-child(1) > :nth-child(1) > :nth-child(2) > :nth-child(3)').click()
            cy.get(':nth-child(1) > :nth-child(1) > :nth-child(2) > :nth-child(3)').should('have.text', 'X')
            cy.get('.game-board > :nth-child(1) > :nth-child(1) > :nth-child(2) > :nth-child(1)').click()
            cy.get('.game-board > :nth-child(1) > :nth-child(1) > :nth-child(2) > :nth-child(1)').should('have.text', 'O')
            cy.get('.game-board > :nth-child(1) > :nth-child(1) > :nth-child(1) > :nth-child(1)').click()
            cy.get('.game-board > :nth-child(1) > :nth-child(1) > :nth-child(1) > :nth-child(1)').should('have.text', 'X')
            //game draw heading check
            cy.get('h2').should('have.text', 'Draw!')
            cy.get('.draw > button').should('be.visible')
            cy.get('.draw > button').click()
            //code to validate play again CTA functionality to be added
        }
        
    })
    it("When the game ends in a draw the option to reset should disappear", ()=>{
        cy.visit("https://harman052.github.io/react-tutorial-solutions/")
        while(cy.get(':nth-child(3) > :nth-child(2)').isClickable){
            cy.log("Tic tac toe can be played")
            //code for game draw
            cy.get(':nth-child(3) > :nth-child(2)').click()
            cy.get(':nth-child(3) > :nth-child(2)').should('have.text', 'X')
            cy.get(':nth-child(3) > :nth-child(3)').click()
            cy.get(':nth-child(3) > :nth-child(3)').should('have.text', 'O')
            cy.get(':nth-child(1) > :nth-child(1) > :nth-child(2) > :nth-child(2)').click()
            cy.get(':nth-child(1) > :nth-child(1) > :nth-child(2) > :nth-child(2)').should('have.text', 'X')
            cy.get(':nth-child(1) > :nth-child(3) > :nth-child(1)').click() 
            cy.get(':nth-child(1) > :nth-child(3) > :nth-child(1)').should('have.text', 'O')
            cy.get('.game-board > :nth-child(1) > :nth-child(1) > :nth-child(1) > :nth-child(3)').click()
            cy.get('.game-board > :nth-child(1) > :nth-child(1) > :nth-child(1) > :nth-child(3)').should('have.text', 'X')
            cy.get('.game-board > :nth-child(1) > :nth-child(1) > :nth-child(1) > :nth-child(2)').click()
            cy.get('.game-board > :nth-child(1) > :nth-child(1) > :nth-child(1) > :nth-child(2)').should('have.text', 'O')
            cy.get(':nth-child(1) > :nth-child(1) > :nth-child(2) > :nth-child(3)').click()
            cy.get(':nth-child(1) > :nth-child(1) > :nth-child(2) > :nth-child(3)').should('have.text', 'X')
            cy.get('.game-board > :nth-child(1) > :nth-child(1) > :nth-child(2) > :nth-child(1)').click()
            cy.get('.game-board > :nth-child(1) > :nth-child(1) > :nth-child(2) > :nth-child(1)').should('have.text', 'O')
            cy.get('.game-board > :nth-child(1) > :nth-child(1) > :nth-child(1) > :nth-child(1)').click()
            cy.get('.game-board > :nth-child(1) > :nth-child(1) > :nth-child(1) > :nth-child(1)').should('have.text', 'X')
            //game draw heading check
            cy.get('h2').should('have.text', 'Draw!')
            //buttons check
            cy.get('.draw > button').should('be.visible')
            cy.get('.reset > button').should('be.invisible')

        }
        
    })

    it("When the game ends in a win, there should a be a 'play again' CTA instead of a reset CTA", ()=>{
        cy.visit("https://harman052.github.io/react-tutorial-solutions/")
        while(cy.get(':nth-child(3) > :nth-child(2)').isClickable){
            cy.log("Tic tac toe can be played")
            //code for winning streak-player O
            cy.get(':nth-child(3) > :nth-child(2)').click()
            cy.get(':nth-child(3) > :nth-child(2)').should('have.text', 'X')
            cy.get(':nth-child(3) > :nth-child(3)').click()
            cy.get(':nth-child(3) > :nth-child(3)').should('have.text', 'O')
            cy.get(':nth-child(1) > :nth-child(1) > :nth-child(2) > :nth-child(2)').click()
            cy.get(':nth-child(1) > :nth-child(1) > :nth-child(2) > :nth-child(2)').should('have.text', 'X')
            cy.get(':nth-child(1) > :nth-child(3) > :nth-child(1)').click() 
            cy.get(':nth-child(1) > :nth-child(3) > :nth-child(1)').should('have.text', 'O')
            cy.get('.game-board > :nth-child(1) > :nth-child(1) > :nth-child(1) > :nth-child(2)').click()
            cy.get('.game-board > :nth-child(1) > :nth-child(1) > :nth-child(1) > :nth-child(2)').should('have.text', 'X')
            //game finished, validating winner banner
            cy.get('h2').should('have.text', '"O" is winner!')
            //validating color from one of the blocks in patttern
            cy.get('.:nth-child(3) > :nth-child(2)').
            invoke('css', 'background-color').
            then((bgcolor) => {
                expect(rgbHex(bgcolor)).to.eq('8EFC63')
            })
            cy.get('.reset > button').should('be.invisible')
            cy.get('.win > button').should('be.visible')
            cy.get('.win > button').click()
            //code to check reset functionality to be added
        }
        
    })

   
  })


  //notes
  //function to be replaced:
  // cy.get('locator').text().should('eq', 'val') to
  //cy.get('.product').should('have.text', Browserstack);
  // draw heading: cy.get('h2'), draw button: cy.get('.draw > button')