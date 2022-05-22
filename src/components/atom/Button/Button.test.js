import {shallow} from "enzyme";
import {queryHelpers, render, screen} from '@testing-library/react'
import {Button} from "./index";

/*
https://testing-library.com/docs/queries/about/#example
https://enzymejs.github.io/enzyme/docs/api/ReactWrapper/exists.html
https://www.ordermygear.com/greenfield/testing-ui-components-part-1-atoms-molecules/
https://assist-software.net/blog/how-write-tests-using-jest-and-enzyme-react-js-testing-utilities-used-facebook-and-airbnb
https://dev.to/duxtech/workspace-recomendado-para-testing-en-react-17-jest-enzyme-4ih9
https://www.toptal.com/react/tdd-react-unit-testing-enzyme-jest
https://syntaxfix.com/question/1282/simulate-a-button-click-in-jest
 */
describe("The components are rendered", () => {
    it("renders Button component without crashing", () => {
        shallow(<Button/>);
    });
});

// describe("<SearchButton />", () => {
//     test("it should render button with other name", async () => {
//         render(<SearchButton name="Here it is" />)
//         const input = screen.getByText('Here it is');
//     });
// });

/**
 * Creates a snapshot with the button and customcolor on green
 */
// describe("SearchButton theme green", () => {
//     test("it should render button with other theme", async () => {
//         const jsxHeader = render(<SearchButton customcolor="green" />)
//         expect(jsxHeader).toMatchSnapshot();
//     });
// });