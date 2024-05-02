import { GithubOutlined } from "@ant-design/icons";

export default function Footer() {
    return (
        <div
            style={{ background: "black" }}
            className="text-primary-text font-poppins flex flex-col items-center justify-center pb-4 pt-3 w-screen gap-y-2 text-lg"
        >
            <a href = "https://github.com/saadpocalypse/Cinephidle" target="_blank">
                <GithubOutlined className="hover:text-primary-innertext hover:cursor-pointer"/>
            </a>
            
        </div>
    );
}
