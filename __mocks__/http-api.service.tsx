export const mockGetApi = jest.fn();
const mock = jest.fn().mockImplementation(() => {
  return {getData: mockGetApi};
});

export default mock;