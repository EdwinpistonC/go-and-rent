import {mount, shallow} from "enzyme";
import Login from "./index";
import TextField from "components/atom/Textfield";

const FAKE_CORRECT_VALUES = {
    email: "huesped@gmail.com"
}

const updateInput = (wrapperShallow, input, newValue) => {
    console.log(input.debug());
    input.simulate('change', {
         currentTarget: {value: newValue}
    })
    return input;
}

let wrapperShallow;

describe("Login Test", () => {
    it("Renderiza Formulario", () => {
        wrapperShallow = shallow(<Login/>);
    });
    it("Render input email", () => {
        expect(
            wrapperShallow.containsMatchingElement(<TextField label="Email" />)
        ).toEqual(true);
    })
    it("Render input password", () => {
        expect(
            wrapperShallow.containsMatchingElement(<TextField label="Contraseña" />)
        ).toEqual(true);
    })
    it("Not Render fake input", () => {
        expect(
            wrapperShallow.containsMatchingElement(<TextField label="No existe" />)
        ).toEqual(false);
    })
    it("Click input email", () => {
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

    })
});