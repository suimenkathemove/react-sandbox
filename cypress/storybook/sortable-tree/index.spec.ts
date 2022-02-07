describe('SortableTree', () => {
  const indentationWidth = 24;
  const height = 40;

  const test = (num: number, magnification: { x: number; y: number }) => {
    const { x, y } = magnification;
    cy.visitStory('sortabletree--default')
      .contains(`${num}`)
      .parent()
      .children('button')
      .mouseMoveBy(indentationWidth * x, height * y);

    // eslint-disable-next-line testing-library/await-async-utils
    cy.wait(10000).screenshot({ overwrite: true });
  };

  describe('Same Depth', () => {
    describe('10 to 11', () => {
      it('-1', () => {
        test(10, { x: -1, y: 1 });
      });

      it('0', () => {
        test(10, { x: 0, y: 1 });
      });

      it('1', () => {
        test(10, { x: 1, y: 1 });
      });
    });

    describe('11 to 12', () => {
      it('-1', () => {
        test(11, { x: -1, y: 1 });
      });

      it('0', () => {
        test(11, { x: 0, y: 1 });
      });

      it('1', () => {
        test(11, { x: 1, y: 1 });
      });
    });

    describe('12 to 10', () => {
      it('-1', () => {
        test(12, { x: -1, y: -2 });
      });

      it('0', () => {
        test(12, { x: 0, y: -2 });
      });

      it('1', () => {
        test(12, { x: 1, y: -2 });
      });
    });
  });

  describe('Different Depth', () => {
    describe('4 to 10', () => {
      it('0', () => {
        test(4, { x: 0, y: 1 });
      });

      it('1', () => {
        test(4, { x: 1, y: 1 });
      });

      it('2', () => {
        test(4, { x: 2, y: 1 });
      });
    });

    describe('10 to 4', () => {
      it('-2', () => {
        test(10, { x: -2, y: -1 });
      });

      it('-1', () => {
        test(10, { x: -1, y: -1 });
      });

      it('0', () => {
        test(10, { x: 0, y: -1 });
      });
    });

    describe('12 to 5', () => {
      it('-2', () => {
        test(12, { x: -2, y: 1 });
      });

      it('-1', () => {
        test(12, { x: -1, y: 1 });
      });

      it('0', () => {
        test(12, { x: 0, y: 1 });
      });
    });

    describe('5 to 12', () => {
      it('0', () => {
        test(5, { x: 0, y: -1 });
      });

      it('1', () => {
        test(5, { x: 1, y: -1 });
      });

      it('2', () => {
        test(5, { x: 2, y: -1 });
      });
    });
  });
});
