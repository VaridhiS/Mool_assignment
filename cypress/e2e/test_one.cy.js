

describe('UI Testing', () => {

    it('Title check', ()=>{
        cy.visit("https://harman052.github.io/react-tutorial-solutions/")
        cy.title().should('eq', 'React App')
       
    })

    it("User should have the first start step defined", ()=>{
        cy.visit("https://harman052.github.io/react-tutorial-solutions/")
        var nextPlayer=cy.get('.game-info > div').text
        expect(nextPlayer=='Next player: X')
    })

    it("User should be able to see the next player info before game begins", ()=>{
        cy.visit("https://harman052.github.io/react-tutorial-solutions/")
        cy.get(':nth-child(1) > .normal').should('be.visible')
    })

    it('User should be able to click game squares', ()=>{
        cy.visit("https://harman052.github.io/react-tutorial-solutions/")
        //cy.wait(20000)
        //cy.get(':nth-child(3) > :nth-child(2)').should('be.clickable')
        if(cy.get(':nth-child(3) > :nth-child(2)').isClickable){
            cy.log("Tic tac toe can be played")
            cy.get(':nth-child(3) > :nth-child(2)').click()
            cy.get(':nth-child(3) > :nth-child(2)').text.should('eq', 'X')
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
            cy.get(':nth-child(3) > :nth-child(2)').text.
            should('eq', 'X')
            cy.log('Button is working')
            while(cy.get('.reset > button').isClickable){
                cy.get('.reset > button').click()
            }
            cy.get(':nth-child(3) > :nth-child(2)').text().
            should('eq', null)
        }
    })

    it('Moves are registered when clicks are made', ()=>{
        cy.visit("https://harman052.github.io/react-tutorial-solutions/")
        while(cy.get(':nth-child(3) > :nth-child(2)').isClickable){
            cy.log("Tic tac toe can be played")
        }
        cy.get(':nth-child(3) > :nth-child(2)').click()
        //cy.get(':nth-child(3) > :nth-child(2)').text.should('eq', 'X')
        cy.log('Button is working')
        cy.get(':nth-child(2) > .normal').should('be.visible') //new moves are registered in the button format
    })

    it("User should be able to toggle", ()=>{
        cy.visit("https://harman052.github.io/react-tutorial-solutions/")
        while(cy.get(':nth-child(3) > :nth-child(2)').isClickable){
            cy.log("Tic tac toe can be played")
        }
        cy.get(':nth-child(3) > :nth-child(2)').click()
        //cy.get(':nth-child(3) > :nth-child(2)').text.should('eq', 'X')
        cy.log('Button is working')
        cy.get('.game-info > :nth-child(2)').click()
    })

    
  })