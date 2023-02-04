import { cyan } from "@mui/material/colors"

describe('template spec', () => {
  it('passes', () => {
cy.login("deemmf0@gmail.com","Dd123123@")
cy.get("#index1").click()

cy.get("#btnadd").click()

  })
})