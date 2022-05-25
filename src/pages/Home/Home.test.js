import {shallow} from "enzyme";
import {Home} from "@mui/icons-material";
import BannerHome from "../../components/molecule/BannerHome";
import CategoriaBox from "../../components/molecule/CategoriaBox";
import {BoxDescripcion} from "../../components/atom/BoxDescripcion";
let wrapperShallow;

describe("Header Test", () => {
    it("Renderiza Home", () => {
        wrapperShallow = shallow(
            <Home/>
        );
    });
    it("Renderiza BannerHome", () => {
        wrapperShallow.containsMatchingElement(<BannerHome />);
    });
    it("Renderiza CategoriaBox", () => {
        wrapperShallow.containsMatchingElement(<CategoriaBox />);
    })
    it("Renderiza BoxDescripcion", () => {
        wrapperShallow.containsMatchingElement(<BoxDescripcion />);
    })
});