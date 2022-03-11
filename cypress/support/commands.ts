// https://github.com/clauderic/dnd-kit/blob/master/cypress/support/commands.ts

function getDocumentScroll() {
  if (document.scrollingElement) {
    const { scrollTop, scrollLeft } = document.scrollingElement;

    return {
      x: scrollTop,
      y: scrollLeft,
    };
  }

  return {
    x: 0,
    y: 0,
  };
}

Cypress.Commands.add(
  'mouseMoveBy',
  {
    prevSubject: 'element',
  },
  // @ts-expect-error
  (subject, x: number, y: number, options?: { delay: number }) => {
    cy.wrap(subject, { log: false })
      .then((subject) => {
        // @ts-expect-error
        const initialRect = subject.get(0).getBoundingClientRect();
        const windowScroll = getDocumentScroll();

        return [subject, initialRect, windowScroll] as const;
      })
      // @ts-expect-error
      .then(([subject, initialRect, initialWindowScroll]) => {
        cy.wrap(subject)
          .trigger('mousedown', { force: true })
          // eslint-disable-next-line testing-library/await-async-utils
          .wait(options?.delay || 0, { log: Boolean(options?.delay) })
          .trigger('mousemove', {
            force: true,
            clientX: Math.floor(
              initialRect.left + initialRect.width / 2 + x / 2,
            ),
            clientY: Math.floor(
              initialRect.top + initialRect.height / 2 + y / 2,
            ),
          })
          .trigger('mousemove', {
            force: true,
            clientX: Math.floor(initialRect.left + initialRect.width / 2 + x),
            clientY: Math.floor(initialRect.top + initialRect.height / 2 + y),
          })
          // eslint-disable-next-line testing-library/await-async-utils
          .wait(100)
          .trigger('mouseup', { force: true })
          .wait(250)
          .then((subject: any) => {
            const finalRect = subject.get(0).getBoundingClientRect();
            const windowScroll = getDocumentScroll();
            const windowScrollDelta = {
              x: windowScroll.x - initialWindowScroll.x,
              y: windowScroll.y - initialWindowScroll.y,
            };

            const delta = {
              x: Math.round(
                finalRect.left - initialRect.left - windowScrollDelta.x,
              ),
              y: Math.round(
                finalRect.top - initialRect.top - windowScrollDelta.y,
              ),
            };

            return [subject, { initialRect, finalRect, delta }] as const;
          });
      });
  },
);

Cypress.Commands.add('visitStory', (id) => {
  return cy.visit(`/iframe.html?id=${id}`, { log: false });
});
