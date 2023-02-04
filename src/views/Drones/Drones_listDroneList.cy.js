import React from 'react'
import DroneList from './Drones_list'

describe('<DroneList />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<DroneList />)
  })
})