import React from "react";
import { slide as Menu } from "react-burger-menu";
import styles from "../styles/SideMenu.module.css";

class SideMenu extends React.Component {
    render() {
        const { page } = this.props;

        var baseStyles = {
            bmBurgerButton: {
                position: "fixed",
                width: "25px",
                height: "20px",
                left: "20px",
                top: "52px",
            },
            bmBurgerBars: {
                borderRadius: "100px",
                height: "2px",
                transition: "0.2s linear all",
            },
            bmBurgerBarsHover: {
                background: "#a90000",
            },
            bmCrossButton: {
                height: "24px",
                width: "24px",
                color: "blue",
            },
            bmCross: {
                background: "#ff6188",
            },
            bmMenuWrap: {
                position: "fixed",
                height: "100%",
            },
            bmMenu: {
                background: "#030016",
                padding: "2.5em 1.5em 0",
                fontFamily: "Poppins",
                fontSize: "1.15em",
            },
            bmMorphShape: {
                fill: "#373a47",
            },
            bmItemList: {
                padding: "0.8em",
            },
            bmOverlay: {
                background: "rgba(0, 0, 0, 0.3)",
            },
            bmItem: {
                marginBottom: "20px",
            },
        };

        switch (page) {
            case "home":
                baseStyles.bmBurgerBars.background = "#ffffff";
                break;
            default:
                break;
        }

        return (
            <Menu styles={baseStyles}>
                <a
                    href="/"
                    style={{ width: "fit-content" }}
                    className={
                        page === "home" ? styles.activeItem : styles.item
                    }
                >
                    Classic
                </a>
            </Menu>
        );
    }
}

export default SideMenu;
