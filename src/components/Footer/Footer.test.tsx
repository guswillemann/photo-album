import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Footer from '.';

const footerLinkClass = /\bsecondaryColor\b/;
const footerShowClass = /\bshow\b/;

describe('Component: <Footer />', () => {
  beforeEach(() => {
    render(<Footer />);
  })

  it('should be a footer element', () => {
    const footer = screen.getByTestId('footerContainer');

    expect(footer.tagName).toBe('FOOTER');
  })

  it('should be collapsed by default, and be able to toggle it', () => {
    const footer = screen.getByTestId('footerContainer');
    const toggleCollapseBtn = screen.getByTestId('toggleCollapseBtn');

    expect(footer.className).not.toMatch(footerShowClass);

    userEvent.click(toggleCollapseBtn);
    
    expect(footer.className).toMatch(footerShowClass);
    
    userEvent.click(toggleCollapseBtn);
    
    expect(footer.className).not.toMatch(footerShowClass);
  })

  it('should render the Leadster link', () => {
    const leadster = screen.getByText('Leadster');
    
    expect(leadster.parentElement?.textContent).toBe('Leadster Front-End Activity');
    expect(leadster.getAttribute('href')).toBe('https://leadster.com.br/');
    expect(leadster.className).toMatch(footerLinkClass);
  })    
  
  it('should render the Pexels links', () => {
    const pexels = screen.getByText('Pexels');
    
    expect(pexels.parentElement?.textContent).toBe('Photos provided by Pexels');
    expect(pexels.getAttribute('href')).toBe('https://www.pexels.com/');
    expect(pexels.className).toMatch(footerLinkClass);
  })
  
  it('should render the author links', () => {
    const linksHref = [
      'http://gustavowillemann.com/',
      'https://github.com/guswillemann',
      'https://www.linkedin.com/in/gustavo-willemann/'
    ];
    
    const gusWillemann = screen.getByText('Created by Gustavo Willemann');
    const links = gusWillemann.nextElementSibling?.children;

    expect(links?.length).toBe(3);

    if (links) {
      Array.from(links).forEach((link, i) => {
        expect(link.getAttribute('href')).toBe(linksHref[i]);
      });
    }
  })
})