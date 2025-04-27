// src/utils/languageIcons.js
import {
    FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaPython, FaJava,
    FaPhp, FaGitAlt, FaRust, FaSwift, FaLinux, FaLaravel
  } from "react-icons/fa";
  import {
    SiCplusplus, SiCsharp, SiGo, SiTypescript, SiRuby, SiKotlin,
    SiPerl, SiScala, SiR, SiDart, SiVuedotjs
  } from "react-icons/si";
  import { DiC } from "react-icons/di";
  
  // En este objeto solo incluimos las referencias a los componentes, no JSX
  export const languageIcons = {
    HTML: FaHtml5,
    CSS: FaCss3Alt,
    JavaScript: FaJs,
    TypeScript: SiTypescript,
    React: FaReact,
    "Node.js": FaNodeJs,
    Python: FaPython,
    Java: FaJava,
    PHP: FaPhp,
    C: DiC,
    "C++": SiCplusplus,
    "C#": SiCsharp,
    Go: SiGo,
    Rust: FaRust,
    Swift: FaSwift,
    Ruby: SiRuby,
    Kotlin: SiKotlin,
    R: SiR,
    Dart: SiDart,
    Perl: SiPerl,
    Scala: SiScala,
    Git: FaGitAlt,
    Linux: FaLinux,
    Laravel: FaLaravel,
    Vue: SiVuedotjs
  };
  