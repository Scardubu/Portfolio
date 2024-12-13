describe('Basic Navigation', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should load the home page', () => {
    cy.get('main').should('be.visible')
  })

  it('should toggle theme', () => {
    cy.get('button[aria-label*="theme"]').click()
    cy.get('html').should('have.class', 'light')
    cy.get('button[aria-label*="theme"]').click()
    cy.get('html').should('have.class', 'dark')
  })

  it('should show mobile navigation on small screens', () => {
    cy.viewport('iphone-x')
    cy.get('nav').should('be.visible')
  })

  it('should handle offline mode', () => {
    cy.window().then((win) => {
      cy.stub(win.navigator, 'onLine').value(false)
      win.dispatchEvent(new Event('offline'))
    })
    cy.contains('You\'re offline').should('be.visible')
  })

  it('should show scroll progress', () => {
    cy.scrollTo('bottom')
    cy.get('[role="progressbar"]').should('exist')
  })

  it('should show scroll to top button after scrolling', () => {
    cy.scrollTo('bottom')
    cy.get('button[aria-label="Scroll to top"]').should('be.visible')
    cy.get('button[aria-label="Scroll to top"]').click()
    cy.window().its('scrollY').should('equal', 0)
  })
})
