import { performAction } from './performAction';
import { getImage } from './functionsApp';
import { getLocation } from './functionsApp';



test('performAction should be a function', () => {
  expect(typeof performAction).toBe("function");
});

test('getImage should be a function', () => {
  expect(typeof getImage).toBe("function");
});

test('getLocation should be a function', () => {
  expect(typeof getLocation).toBe("function");
});

// const request = require('supertest');
// const app = require('../../server/index')

// describe('Test the root path', () => {
//     test('It should response the GET method', (done) => {
//         request(app).get('/').then((response) => {
//             expect(response.statusCode).toBe(200);
//             done();
//         });
//     });
// });