import { mount, render, shallow } from "enzyme";
import LoginModal from "./index";
import { BrowserRouter } from "react-router-dom";
import ModalBasico from "../../atom/Modal";
import { screen } from "@testing-library/react";

const FAKE_CORRECT_VALUES = {
  email: "huesped@gmail.com",
};

const updateInput = (wrapperShallow, input, newValue) => {
  input.simulate("change", {
    currentTarget: { value: newValue },
  });
  return input;
};

let wrapperShallow;

describe("Login Test", () => {
  it("Renderiza modal", () => {
    wrapperShallow = shallow(<ModalBasico />);
  });
  it("Render input email", async () => {
    //https://bobbyhadz.com/blog/react-testing-library-find-by-classname
    const openMock = jest.fn();
    const closeMock = jest.fn();
    let view = render(
      <ModalBasico abrirModal={openMock} onCloseModal={closeMock} />
    );
    const backDrop = await screen.findAllByText(/MuiBackdrop-root/i);
    //fireEvent.click(container.children())
    /*expect(
            wrapperShallow.containsMatchingElement(<ModalBasico />)
        ).toEqual(true);*/
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
