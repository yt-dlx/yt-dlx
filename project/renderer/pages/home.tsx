import react from "react";
import Link from "next/link";
import Image from "next/image";
import { SiBun } from "react-icons/si";
import { FaYarn } from "react-icons/fa";
import { SiPnpm } from "react-icons/si";
import { HiFire } from "react-icons/hi";
import { GoNumber } from "react-icons/go";
import NavPackage from "./components/nav";
import FootPackage from "./components/foot";
import { TbBrandNpm } from "react-icons/tb";
import { FaLightbulb } from "react-icons/fa";
import { MdAudioFile } from "react-icons/md";
import { FaFileVideo } from "react-icons/fa6";
import VerPackage from "./components/version";
import { TbWorldSearch } from "react-icons/tb";
import { TbDiamondFilled } from "react-icons/tb";
import { SiFirefoxbrowser } from "react-icons/si";
import { SiGradleplaypublisher } from "react-icons/si";
import { AiFillCodeSandboxCircle } from "react-icons/ai";

export default function HomePage() {
  const [Added, setAdd] = react.useState<any>();
  react.useEffect(() => {
    window.ipc.on("add", (response: string) => setAdd(response));
  }, []);
  // window.ipc.send("add", { num1, num2 })

  return <react.Fragment></react.Fragment>;
}
