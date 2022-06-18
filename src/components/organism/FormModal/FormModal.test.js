import { mount, render, shallow } from "enzyme";
import LoginModal from "./index";
import { BrowserRouter } from "react-router-dom";
import ModalBasico from "../../atom/Modal";
import { screen } from "@testing-library/react";
import Header from "../Header";

const FAKE_CORRECT_VALUES = {
  email: "huesped@gmail.com",
};

const updateInput = (wrapperShallow, input, newValue) => {
  // eslint-disable-next-line testing-library/no-debugging-utils
  console.log(input.debug());
  input.simulate("change", {
    currentTarget: { value: newValue },
  });
  return input;
};

let wrapperShallow;

describe("Login Test", () => {
  it("Renderiza modal", () => {
    wrapperShallow = shallow(<Header></Header>);
  });
  it("Render Btn Registro Anfitrion", async () => {
    //https://bobbyhadz.com/blog/react-testing-library-find-by-classname
    console.log(wrapperShallow.find("#registro-anfitrion"));
    // expect(wrapperShallow.find('#registro-anfitrion')).toBeInTheDOM();
  });
  /*it("Render input password", () => {
        expect(
            wrapperShallow.containsMatchingElement(<TextField label="Contraseña" />)
        ).toEqual(true);
    })
    it("Not Render fake input", () => {
        expect(
            wrapperShallow.containsMatchingElement(<TextField label="No existe" />)
        ).toEqual(false);
    })*/
  /*it("Click input email", () => {
        let mntWrapper = mount(<TextField label="Email" />);
        console.log(mntWrapper.find('input').debug());
        let input = mntWrapper.find('input');
        // input.simulate('change', {
        //     target: {value: "Pepe"}
        // });
        input.simulate('focus');
        input.simulate('change', { target: { value: 'Changed' } });
        console.log(input.props());
        expect(input.props().value).toEqual('Hello');

        //console.log(mntWrapper.find('input').props());
        //expect(input.props().value).toBe('Tyler')

    })*/
});
