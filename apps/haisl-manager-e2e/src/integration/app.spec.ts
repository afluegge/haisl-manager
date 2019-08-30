import { getGreeting } from '../support/app.po';

describe('haisl-manager', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    getGreeting().contains('Welcome to haisl-manager!');
  });
});
