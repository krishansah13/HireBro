import Image from "next/image";
import Link from "next/link";
import Profile from "./Profile";
import Search from "./Search";

export default function Header() {
    return (
        <header>
            <div className="flex justify-between"> 
                {/* logo */}
                <div className="">
                    <Image src="" alt="logo" />
                </div>
                {/*Navigation*/}
                <div>
                    <Link href="/jobs">Find Jobs</Link>
                </div>
                {/* Profile Options */}
                <div>
                    <Profile />
                </div>
            </div>
            <h1>
                Find Your Dream Job Here
            </h1>
            <Search/>
        </header>
    )
}